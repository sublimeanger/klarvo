import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkAIFeatureAllowed, checkUserRole, createPrivacyErrorResponse } from "../_shared/ai-privacy.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_SYSTEM_PROMPT = `You are Klarvo AI, an expert assistant for the Klarvo EU AI Act Compliance Platform. Your role is to help users understand EU AI Act requirements, navigate the platform, and answer compliance questions.

## Your Knowledge Base

### EU AI Act Key Dates
- August 1, 2024: Entered into force
- February 2, 2025: Prohibited practices + AI literacy obligations apply
- August 2, 2025: Governance rules + GPAI obligations apply
- August 2, 2026: Most obligations apply
- August 2, 2027: Extended transition for some high-risk AI in regulated products (Annex I)

### Risk Classifications
1. **Prohibited (Unacceptable Risk)**: AI systems banned under Article 5
   - Harmful manipulation/deception
   - Exploitation of vulnerabilities
   - Social scoring
   - Criminal profiling without evidence
   - Untargeted facial recognition scraping
   - Workplace/education emotion inference
   - Biometric categorisation revealing protected characteristics
   - Real-time remote biometric ID in public spaces (law enforcement)

2. **High-Risk (Annex III)**: Subject to full compliance requirements
   - Biometrics
   - Critical infrastructure
   - Education & vocational training
   - Employment & worker management
   - Essential services (credit, insurance, benefits)
   - Law enforcement
   - Migration & border control
   - Justice & democratic processes
   - Safety components of regulated products

3. **Limited Risk**: Transparency obligations (Article 50)
   - Must inform users of AI interaction
   - Mark synthetic content as AI-generated
   - Disclose emotion recognition/biometric categorisation
   - Label deepfakes

4. **Minimal Risk**: No specific requirements (best practices apply)

### Deployer Obligations (Article 26 - Most SMEs)
- Use AI according to provider instructions
- Assign competent human oversight
- Ensure input data quality and relevance
- Monitor operation continuously
- Keep logs for at least 6 months
- Report risks and incidents to providers/authorities
- Inform workers when using workplace AI
- Conduct FRIA for certain high-risk deployments

### FRIA Requirements (Article 27)
Required for:
- Public authorities deploying high-risk AI
- Private entities providing public services
- Deployers of credit scoring, insurance, emergency dispatch AI

Must include:
- Process description
- Time period and frequency of use
- Categories of affected persons
- Specific risks to fundamental rights
- Human oversight measures
- Mitigation and governance arrangements

### AI Literacy (Article 4)
All providers and deployers must ensure sufficient AI literacy of staff operating AI systems, considering:
- Context of use
- Persons affected
- Required competence levels

### Klarvo Platform Features
1. **AI System Inventory**: Document all AI systems with guided wizard
2. **Classification Engine**: Determine risk levels automatically
3. **Control Library**: Map obligations to controls
4. **Evidence Vault**: Store and organize compliance documentation
5. **Policy Templates**: AI acceptable use, oversight plans, disclosures
6. **Training Tracking**: AI literacy program management
7. **Export Packs**: Audit-ready PDF and ZIP bundles
8. **FRIA Wizard**: Guided fundamental rights impact assessment
9. **Incident Management**: Log and respond to AI incidents
10. **Vendor Management**: Track AI vendor due diligence

## Response Guidelines

1. **Be concise but thorough**: Provide actionable answers
2. **Cite specific articles**: Reference EU AI Act articles when relevant (e.g., "Article 26 requires...")
3. **Be practical**: Focus on what SMEs actually need to do
4. **Recommend platform features**: Guide users to relevant Klarvo features
5. **Clarify scope**: Distinguish between deployer vs provider obligations
6. **Acknowledge uncertainty**: If something requires legal interpretation, say so
7. **Use markdown**: Format responses with headers, lists, tables when helpful
8. **Stay current**: Note that guidance may evolve as implementation progresses

Remember: You provide guidance, not legal advice. For complex interpretations, recommend consulting qualified counsel.`;

interface UserContext {
  systems: Array<{
    id: string;
    name: string;
    department: string | null;
    final_classification: string | null;
    lifecycle_status: string;
    fria_status: string | null;
    value_chain_role: string[] | null;
  }>;
  classifications: Array<{
    ai_system_id: string;
    risk_level: string;
    is_high_risk_candidate: boolean | null;
    has_transparency_obligations: boolean | null;
  }>;
  openTasks: number;
  pendingEvidence: number;
  incidentCount: number;
}

function buildContextualPrompt(userContext: UserContext | null): string {
  if (!userContext || userContext.systems.length === 0) {
    return BASE_SYSTEM_PROMPT;
  }

  const systemsSummary = userContext.systems.map(s => {
    const classification = userContext.classifications.find(c => c.ai_system_id === s.id);
    return `- **${s.name}**: ${classification?.risk_level || 'Not classified'} | ${s.lifecycle_status} | ${s.department || 'No department'} | FRIA: ${s.fria_status || 'Not started'}`;
  }).join('\n');

  const highRiskCount = userContext.classifications.filter(c => c.is_high_risk_candidate).length;
  const transparencyCount = userContext.classifications.filter(c => c.has_transparency_obligations).length;
  const unclassifiedCount = userContext.systems.filter(s => 
    !userContext.classifications.find(c => c.ai_system_id === s.id)
  ).length;

  const contextSection = `

## Your User's Current Compliance State

You have access to this user's actual AI system inventory and compliance status. Use this information to provide personalized, actionable guidance.

### Organization Summary
- **Total AI Systems**: ${userContext.systems.length}
- **High-Risk Candidates**: ${highRiskCount}
- **Transparency Obligations**: ${transparencyCount}
- **Unclassified Systems**: ${unclassifiedCount}
- **Open Tasks**: ${userContext.openTasks}
- **Pending Evidence**: ${userContext.pendingEvidence}
- **Open Incidents**: ${userContext.incidentCount}

### AI Systems Inventory
${systemsSummary}

### Personalization Guidelines
When the user asks questions like:
- "Which of my systems need FRIA?" → Check their high-risk systems and FRIA status
- "What should I prioritize?" → Consider their open tasks, unclassified systems, and approaching deadlines
- "Am I compliant?" → Analyze their classification status, controls, and evidence gaps
- "What's the status of [system name]?" → Reference the specific system from their inventory

Always provide specific, personalized answers based on their actual data when relevant.`;

  return BASE_SYSTEM_PROMPT + contextSection;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchUserContext(supabase: any, organizationId: string): Promise<UserContext | null> {
  try {
    // Fetch AI systems
    const { data: systems } = await supabase
      .from("ai_systems")
      .select("id, name, department, final_classification, lifecycle_status, fria_status, value_chain_role")
      .eq("organization_id", organizationId)
      .limit(50);

    if (!systems || systems.length === 0) {
      return null;
    }

    const systemIds = (systems as Array<{ id: string }>).map((s: { id: string }) => s.id);

    // Fetch classifications
    const { data: classifications } = await supabase
      .from("ai_system_classifications")
      .select("ai_system_id, risk_level, is_high_risk_candidate, has_transparency_obligations")
      .in("ai_system_id", systemIds);

    // Fetch open tasks count
    const { count: openTasks } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .neq("status", "done");

    // Fetch pending evidence count
    const { count: pendingEvidence } = await supabase
      .from("evidence_files")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .eq("status", "pending_review");

    // Fetch open incidents count
    const { count: incidentCount } = await supabase
      .from("incidents")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .in("status", ["open", "investigating"]);

    return {
      systems: systems as UserContext["systems"],
      classifications: (classifications || []) as UserContext["classifications"],
      openTasks: openTasks || 0,
      pendingEvidence: pendingEvidence || 0,
      incidentCount: incidentCount || 0,
    };
  } catch (error) {
    console.error("Failed to fetch user context:", error);
    return null;
  }
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
      'chat'
    );
    
    if (!privacyCheck.allowed) {
      return createPrivacyErrorResponse(privacyCheck, corsHeaders);
    }

    // Check user role
    const roleCheck = await checkUserRole(
      supabaseUrl,
      supabaseServiceKey,
      req.headers.get("authorization"),
      ["admin", "compliance_owner", "system_owner", "reviewer"]
    );
    if (!roleCheck.allowed) {
      return new Response(
        JSON.stringify({ error: roleCheck.errorMessage }),
        { status: roleCheck.errorStatus, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages, stream = true, includeContext = true } = await req.json();
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = BASE_SYSTEM_PROMPT;
    
    // If context is requested, try to fetch user's data
    if (includeContext) {
      const authHeader = req.headers.get("authorization");
      if (authHeader) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const token = authHeader.replace("Bearer ", "");
        const { data: { user } } = await supabase.auth.getUser(token);
        
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("organization_id")
            .eq("id", user.id)
            .single();
          
          if (profile?.organization_id) {
            const userContext = await fetchUserContext(supabase, profile.organization_id);
            systemPrompt = buildContextualPrompt(userContext);
          }
        }
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: stream,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    } else {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("AI Assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
