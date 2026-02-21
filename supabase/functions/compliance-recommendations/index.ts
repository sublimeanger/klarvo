import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkUserRole } from "../_shared/ai-privacy.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RecommendationInput {
  ai_system_id?: string;
  scope: "system" | "organization";
  regenerate?: boolean;
}

interface GeneratedRecommendation {
  title: string;
  description: string;
  priority: number;
  action_type: "task" | "evidence" | "control" | "classification" | "fria" | "training" | "vendor";
  recommendation_type: "gap_remediation" | "control_suggestion" | "next_step" | "risk_mitigation";
  rationale: string;
  confidence: number;
  action_path?: string;
  action_payload?: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get auth token from request
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check user role
    const roleCheck = await checkUserRole(
      supabaseUrl,
      supabaseServiceKey,
      authHeader,
      ["admin", "compliance_owner"]
    );
    if (!roleCheck.allowed) {
      return new Response(
        JSON.stringify({ error: roleCheck.errorMessage }),
        { status: roleCheck.errorStatus, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user and get profile
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      return new Response(JSON.stringify({ error: "No organization found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const organizationId = profile.organization_id;
    const { ai_system_id, scope, regenerate = false }: RecommendationInput = await req.json();

    // Check for cached recommendations if not regenerating
    if (!regenerate) {
      const cacheQuery = supabase
        .from("compliance_recommendations")
        .select("*")
        .eq("organization_id", organizationId)
        .eq("is_dismissed", false)
        .gt("expires_at", new Date().toISOString())
        .order("priority", { ascending: true });

      if (ai_system_id && scope === "system") {
        cacheQuery.eq("ai_system_id", ai_system_id);
      } else if (scope === "organization") {
        cacheQuery.is("ai_system_id", null);
      }

      const { data: cachedRecommendations } = await cacheQuery.limit(10);

      if (cachedRecommendations && cachedRecommendations.length > 0) {
        return new Response(
          JSON.stringify({
            recommendations: cachedRecommendations,
            cached: true,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Fetch AI system data for analysis
    let systemsQuery = supabase
      .from("ai_systems")
      .select(`
        id,
        name,
        department,
        lifecycle_status,
        final_classification,
        value_chain_role,
        fria_status,
        vendor_id,
        transparency_status,
        incident_process_status,
        training_exists,
        oversight_model,
        monitoring_plan_status
      `)
      .eq("organization_id", organizationId);

    if (ai_system_id && scope === "system") {
      systemsQuery = systemsQuery.eq("id", ai_system_id);
    }

    const { data: systems, error: systemsError } = await systemsQuery;

    if (systemsError) {
      throw new Error(`Failed to fetch AI systems: ${systemsError.message}`);
    }

    if (!systems || systems.length === 0) {
      return new Response(
        JSON.stringify({ recommendations: [], cached: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch classifications for the systems
    const systemIds = systems.map((s) => s.id);
    const { data: classifications } = await supabase
      .from("ai_system_classifications")
      .select("ai_system_id, risk_level, is_high_risk_candidate, has_transparency_obligations, prohibited_screening_completed")
      .in("ai_system_id", systemIds);

    // Fetch control implementations
    const { data: controlImplementations } = await supabase
      .from("control_implementations")
      .select("ai_system_id, status, control_id")
      .in("ai_system_id", systemIds);

    // Fetch evidence files
    const { data: evidenceFiles } = await supabase
      .from("evidence_files")
      .select("ai_system_id, status")
      .in("ai_system_id", systemIds);

    // Fetch tasks
    const { data: tasks } = await supabase
      .from("tasks")
      .select("ai_system_id, status, priority, due_date")
      .in("ai_system_id", systemIds);

    // Build analysis context
    const systemAnalyses = systems.map((system) => {
      const classification = classifications?.find((c) => c.ai_system_id === system.id);
      const systemControls = controlImplementations?.filter((c) => c.ai_system_id === system.id) || [];
      const systemEvidence = evidenceFiles?.filter((e) => e.ai_system_id === system.id) || [];
      const systemTasks = tasks?.filter((t) => t.ai_system_id === system.id) || [];

      const controlStats = {
        total: systemControls.length,
        implemented: systemControls.filter((c) => c.status === "implemented").length,
        inProgress: systemControls.filter((c) => c.status === "in_progress").length,
        notStarted: systemControls.filter((c) => c.status === "not_started").length,
      };

      const evidenceStats = {
        total: systemEvidence.length,
        approved: systemEvidence.filter((e) => e.status === "approved").length,
        pending: systemEvidence.filter((e) => e.status === "pending_review").length,
      };

      const taskStats = {
        total: systemTasks.length,
        overdue: systemTasks.filter(
          (t) => t.status !== "done" && t.due_date && new Date(t.due_date) < new Date()
        ).length,
        highPriority: systemTasks.filter((t) => t.priority === "high" || t.priority === "urgent").length,
      };

      return {
        id: system.id,
        name: system.name,
        department: system.department,
        lifecycle_status: system.lifecycle_status,
        risk_level: classification?.risk_level || "not_classified",
        is_high_risk: classification?.is_high_risk_candidate || false,
        has_transparency_obligations: classification?.has_transparency_obligations || false,
        prohibited_screening_done: classification?.prohibited_screening_completed || false,
        fria_status: system.fria_status,
        transparency_status: system.transparency_status,
        incident_process: system.incident_process_status,
        training_exists: system.training_exists,
        oversight_model: system.oversight_model,
        monitoring_status: system.monitoring_plan_status,
        has_vendor: !!system.vendor_id,
        value_chain_role: system.value_chain_role,
        controls: controlStats,
        evidence: evidenceStats,
        tasks: taskStats,
      };
    });

    // Build the AI prompt
    const systemPrompt = `You are an EU AI Act compliance expert. Analyze the provided AI system data and generate prioritized compliance recommendations.

Focus on:
1. Critical gaps that could result in non-compliance
2. Missing controls for the identified risk level
3. Evidence gaps that need to be addressed
4. FRIA requirements for high-risk systems
5. Transparency obligations that haven't been fulfilled
6. Training and oversight gaps

Consider the EU AI Act deadlines:
- Prohibited practices ban: February 2, 2025
- GPAI model requirements: August 2, 2025
- High-risk AI system rules: August 2, 2026

Prioritize recommendations based on urgency and compliance risk.`;

    const userPrompt = scope === "system" 
      ? `Analyze this AI system and generate 3-5 prioritized recommendations:
${JSON.stringify(systemAnalyses[0], null, 2)}`
      : `Analyze these ${systemAnalyses.length} AI systems and generate 5-7 organization-wide recommendations:
${JSON.stringify(systemAnalyses, null, 2)}`;

    // Call Lovable AI Gateway with tool calling
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_recommendations",
              description: "Generate prioritized EU AI Act compliance recommendations based on the analysis",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: {
                          type: "string",
                          description: "Short, actionable recommendation title (max 60 chars)",
                        },
                        description: {
                          type: "string",
                          description: "Detailed explanation of why this is important and what to do (max 200 chars)",
                        },
                        priority: {
                          type: "integer",
                          minimum: 1,
                          maximum: 5,
                          description: "Priority level: 1=Critical, 2=High, 3=Medium, 4=Low, 5=Nice-to-have",
                        },
                        action_type: {
                          type: "string",
                          enum: ["task", "evidence", "control", "classification", "fria", "training", "vendor"],
                          description: "Type of action to take",
                        },
                        recommendation_type: {
                          type: "string",
                          enum: ["gap_remediation", "control_suggestion", "next_step", "risk_mitigation"],
                          description: "Category of recommendation",
                        },
                        rationale: {
                          type: "string",
                          description: "Brief explanation of the compliance reasoning",
                        },
                        confidence: {
                          type: "number",
                          minimum: 0,
                          maximum: 1,
                          description: "Confidence score for this recommendation",
                        },
                      },
                      required: ["title", "description", "priority", "action_type", "recommendation_type", "rationale", "confidence"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["recommendations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_recommendations" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      throw new Error("AI Gateway error");
    }

    const aiData = await aiResponse.json();
    
    // Extract recommendations from tool call
    let recommendations: GeneratedRecommendation[] = [];
    
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        recommendations = parsed.recommendations || [];
      } catch (parseError) {
        console.error("Failed to parse AI recommendations:", parseError);
        recommendations = [];
      }
    }

    // Map action types to paths
    const getActionPath = (actionType: string, systemId?: string): string => {
      switch (actionType) {
        case "classification":
          return systemId ? `/ai-systems/${systemId}` : "/ai-systems";
        case "fria":
          return systemId ? `/ai-systems/${systemId}/fria` : "/assessments";
        case "evidence":
          return systemId ? `/ai-systems/${systemId}` : "/evidence";
        case "control":
          return "/controls";
        case "training":
          return "/training";
        case "vendor":
          return "/vendors";
        case "task":
        default:
          return "/tasks";
      }
    };

    // Delete old recommendations before inserting new ones
    if (regenerate || recommendations.length > 0) {
      const deleteQuery = supabase
        .from("compliance_recommendations")
        .delete()
        .eq("organization_id", organizationId);

      if (ai_system_id && scope === "system") {
        deleteQuery.eq("ai_system_id", ai_system_id);
      } else if (scope === "organization") {
        deleteQuery.is("ai_system_id", null);
      }

      await deleteQuery;
    }

    // Insert new recommendations
    const recommendationsToInsert = recommendations.map((rec) => ({
      organization_id: organizationId,
      ai_system_id: scope === "system" ? ai_system_id : null,
      recommendation_type: rec.recommendation_type,
      priority: rec.priority,
      title: rec.title,
      description: rec.description,
      action_type: rec.action_type,
      action_path: getActionPath(rec.action_type, ai_system_id),
      action_payload: rec.action_payload || null,
      confidence_score: rec.confidence,
      is_dismissed: false,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }));

    if (recommendationsToInsert.length > 0) {
      const { data: insertedRecs, error: insertError } = await supabase
        .from("compliance_recommendations")
        .insert(recommendationsToInsert)
        .select();

      if (insertError) {
        console.error("Failed to insert recommendations:", insertError);
        // Return the generated recommendations even if caching fails
        return new Response(
          JSON.stringify({
            recommendations: recommendationsToInsert,
            cached: false,
            cacheError: true,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          recommendations: insertedRecs,
          cached: false,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ recommendations: [], cached: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Compliance recommendations error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
