import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkAIFeatureAllowed, checkUserRole, checkPlanEntitlement, getOrganizationId, createPrivacyErrorResponse } from "../_shared/ai-privacy.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// EU AI Act key deadlines
const DEADLINES = [
  { date: "2024-08-01", name: "EU AI Act entered into force", past: true },
  { date: "2025-02-02", name: "Prohibited practices + AI literacy obligations apply", past: true },
  { date: "2025-08-02", name: "Governance rules + GPAI obligations apply" },
  { date: "2026-08-02", name: "Most obligations apply (including high-risk systems)" },
  { date: "2027-08-02", name: "Extended transition for Annex I high-risk AI" },
];

const COPILOT_PROMPT = `You are an EU AI Act Compliance Copilot. Analyze the organization's compliance state and generate a prioritized weekly action digest.

Consider:
1. Upcoming EU AI Act deadlines and their impact on the organization's systems
2. Classification status and gaps
3. High-risk systems requiring immediate attention
4. Overdue tasks and evidence
5. FRIA requirements
6. Training and literacy gaps

Generate a concise, actionable digest with clear priorities.`;

interface ComplianceDigest {
  summary: string;
  overall_status: "on_track" | "attention_needed" | "at_risk" | "critical";
  deadline_alerts: Array<{
    deadline: string;
    deadline_date: string;
    days_remaining: number;
    affected_systems: number;
    action_required: string;
    priority: "critical" | "high" | "medium" | "low";
  }>;
  priority_actions: Array<{
    title: string;
    description: string;
    category: "classification" | "fria" | "controls" | "evidence" | "training" | "vendor" | "incident";
    urgency: "immediate" | "this_week" | "this_month";
    estimated_effort: string;
    systems_affected: string[];
  }>;
  compliance_metrics: {
    systems_classified: number;
    systems_total: number;
    high_risk_count: number;
    fria_required: number;
    fria_completed: number;
    controls_implemented_pct: number;
    evidence_complete_pct: number;
    training_complete_pct: number;
  };
  risk_highlights: string[];
  next_review_recommendation: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // Check AI privacy settings
    const privacyCheck = await checkAIFeatureAllowed(
      supabaseUrl,
      supabaseServiceKey,
      req.headers.get("authorization"),
      'copilot'
    );
    
    if (!privacyCheck.allowed) {
      return createPrivacyErrorResponse(privacyCheck, corsHeaders);
    }

    // Check user role
    const roleCheck = await checkUserRole(
      supabaseUrl,
      supabaseServiceKey,
      req.headers.get("authorization"),
      ["admin", "compliance_owner"]
    );
    if (!roleCheck.allowed) {
      return new Response(
        JSON.stringify({ error: roleCheck.errorMessage }),
        { status: roleCheck.errorStatus, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check plan entitlement
    const { organizationId: orgId } = await getOrganizationId(supabaseUrl, supabaseServiceKey, req.headers.get("authorization"));
    if (orgId) {
      const planCheck = await checkPlanEntitlement(supabaseUrl, supabaseServiceKey, orgId, 'ai_copilot');
      if (!planCheck.allowed) {
        return new Response(
          JSON.stringify({ error: planCheck.errorMessage, plan_restricted: true }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get organization ID from the privacy check helper
    const authHeader = req.headers.get("authorization")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user!.id)
      .single();

    const organizationId = profile!.organization_id;

    // Fetch comprehensive compliance data
    const [
      { data: systems },
      { data: classifications },
      { data: tasks },
      { data: evidenceFiles },
      { data: controlImplementations },
      { data: trainingAssignments },
      { data: incidents },
    ] = await Promise.all([
      supabase
        .from("ai_systems")
        .select("id, name, department, lifecycle_status, final_classification, fria_status, value_chain_role, wizard_completed_at")
        .eq("organization_id", organizationId),
      supabase
        .from("ai_system_classifications")
        .select("ai_system_id, risk_level, is_high_risk_candidate, has_transparency_obligations, reassessment_needed")
        .eq("organization_id", organizationId),
      supabase
        .from("tasks")
        .select("id, title, status, priority, due_date, ai_system_id")
        .eq("organization_id", organizationId)
        .neq("status", "done"),
      supabase
        .from("evidence_files")
        .select("id, status, ai_system_id")
        .eq("organization_id", organizationId),
      supabase
        .from("control_implementations")
        .select("id, status, ai_system_id")
        .eq("organization_id", organizationId),
      supabase
        .from("training_assignments")
        .select("id, status, user_id")
        .eq("organization_id", organizationId),
      supabase
        .from("incidents")
        .select("id, status, severity")
        .eq("organization_id", organizationId)
        .in("status", ["open", "investigating"]),
    ]);

    const now = new Date();
    const systemsArray = systems || [];
    const classificationsArray = classifications || [];
    const tasksArray = tasks || [];
    const evidenceArray = evidenceFiles || [];
    const controlsArray = controlImplementations || [];
    const trainingArray = trainingAssignments || [];
    const incidentsArray = incidents || [];

    // Calculate metrics
    const classifiedSystemIds = new Set(classificationsArray.map(c => c.ai_system_id));
    const highRiskSystems = classificationsArray.filter(c => c.is_high_risk_candidate);
    const friaRequired = systemsArray.filter(s => {
      const classification = classificationsArray.find(c => c.ai_system_id === s.id);
      return classification?.is_high_risk_candidate;
    });
    const friaCompleted = friaRequired.filter(s => s.fria_status === "completed");
    
    const implementedControls = controlsArray.filter(c => c.status === "implemented").length;
    const approvedEvidence = evidenceArray.filter(e => e.status === "approved").length;
    const completedTraining = trainingArray.filter(t => t.status === "completed").length;

    // Find overdue tasks
    const overdueTasks = tasksArray.filter(t => t.due_date && new Date(t.due_date) < now);
    
    // Find systems needing reassessment
    const reassessmentNeeded = classificationsArray.filter(c => c.reassessment_needed);

    // Build context for AI
    const complianceContext = {
      totalSystems: systemsArray.length,
      classifiedSystems: classifiedSystemIds.size,
      unclassifiedSystems: systemsArray.filter(s => !classifiedSystemIds.has(s.id)).map(s => s.name),
      highRiskCount: highRiskSystems.length,
      highRiskSystems: highRiskSystems.map(c => {
        const system = systemsArray.find(s => s.id === c.ai_system_id);
        return system?.name || "Unknown";
      }),
      friaRequired: friaRequired.length,
      friaCompleted: friaCompleted.length,
      friaGaps: friaRequired.filter(s => s.fria_status !== "completed").map(s => s.name),
      controlsTotal: controlsArray.length,
      controlsImplemented: implementedControls,
      evidenceTotal: evidenceArray.length,
      evidenceApproved: approvedEvidence,
      pendingEvidence: evidenceArray.filter(e => e.status === "pending_review").length,
      trainingTotal: trainingArray.length,
      trainingCompleted: completedTraining,
      overdueTasks: overdueTasks.map(t => ({ title: t.title, dueDate: t.due_date })),
      openIncidents: incidentsArray.length,
      criticalIncidents: incidentsArray.filter(i => i.severity === "critical").length,
      reassessmentNeeded: reassessmentNeeded.length,
      upcomingDeadlines: DEADLINES.filter(d => !d.past).map(d => ({
        ...d,
        daysRemaining: Math.ceil((new Date(d.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      })),
    };

    const userPrompt = `Generate a compliance digest for this organization:

${JSON.stringify(complianceContext, null, 2)}

Today's date: ${now.toISOString().split('T')[0]}

Create a prioritized weekly action plan with specific, actionable recommendations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: COPILOT_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_compliance_digest",
              description: "Generate a prioritized compliance digest",
              parameters: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "2-3 sentence executive summary of compliance status",
                  },
                  overall_status: {
                    type: "string",
                    enum: ["on_track", "attention_needed", "at_risk", "critical"],
                    description: "Overall compliance status",
                  },
                  deadline_alerts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        deadline: { type: "string", description: "Deadline name" },
                        deadline_date: { type: "string", description: "ISO date" },
                        days_remaining: { type: "number" },
                        affected_systems: { type: "number" },
                        action_required: { type: "string" },
                        priority: { type: "string", enum: ["critical", "high", "medium", "low"] },
                      },
                      required: ["deadline", "deadline_date", "days_remaining", "affected_systems", "action_required", "priority"],
                      additionalProperties: false,
                    },
                  },
                  priority_actions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        category: { type: "string", enum: ["classification", "fria", "controls", "evidence", "training", "vendor", "incident"] },
                        urgency: { type: "string", enum: ["immediate", "this_week", "this_month"] },
                        estimated_effort: { type: "string" },
                        systems_affected: { type: "array", items: { type: "string" } },
                      },
                      required: ["title", "description", "category", "urgency", "estimated_effort", "systems_affected"],
                      additionalProperties: false,
                    },
                  },
                  compliance_metrics: {
                    type: "object",
                    properties: {
                      systems_classified: { type: "number" },
                      systems_total: { type: "number" },
                      high_risk_count: { type: "number" },
                      fria_required: { type: "number" },
                      fria_completed: { type: "number" },
                      controls_implemented_pct: { type: "number" },
                      evidence_complete_pct: { type: "number" },
                      training_complete_pct: { type: "number" },
                    },
                    required: ["systems_classified", "systems_total", "high_risk_count", "fria_required", "fria_completed", "controls_implemented_pct", "evidence_complete_pct", "training_complete_pct"],
                    additionalProperties: false,
                  },
                  risk_highlights: {
                    type: "array",
                    items: { type: "string" },
                    description: "Top 3-5 risk highlights",
                  },
                  next_review_recommendation: {
                    type: "string",
                    description: "When to review next and what to focus on",
                  },
                },
                required: ["summary", "overall_status", "deadline_alerts", "priority_actions", "compliance_metrics", "risk_highlights", "next_review_recommendation"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_compliance_digest" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI Gateway error");
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("Failed to generate digest");
    }

    const digest: ComplianceDigest = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        success: true,
        digest,
        generated_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Compliance Copilot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
