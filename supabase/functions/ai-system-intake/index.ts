import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkAIFeatureAllowed, createPrivacyErrorResponse } from "../_shared/ai-privacy.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTRACTION_PROMPT = `You are an expert at analyzing AI system descriptions and extracting structured compliance data for the EU AI Act.

Given a natural language description of an AI system, extract as many relevant fields as possible for compliance documentation.

Be conservative - only extract information that is clearly stated or strongly implied. Use null for fields you cannot determine.

Focus on:
1. System identification (name, purpose, department)
2. Scope (affected groups, deployment regions, customer-facing)
3. Technical details (AI techniques, autonomy, adaptivity)
4. Risk indicators (employment use, essential services, biometrics, etc.)
5. Data handling (personal data, special categories, minors)
6. Human oversight (level of automation, override capability)`;

interface ExtractedData {
  name: string | null;
  description: string | null;
  summary: string | null;
  department: string | null;
  purpose_category: string | null;
  deployment_regions: string[] | null;
  eu_countries: string[] | null;
  affected_groups: string[] | null;
  internal_user_groups: string[] | null;
  is_customer_facing: boolean | null;
  has_workplace_impact: boolean | null;
  has_legal_effects: boolean | null;
  built_internally: string | null;
  acquisition_method: string[] | null;
  value_chain_role: string[] | null;
  infers_outputs: string | null;
  output_types: string[] | null;
  operates_autonomously: string | null;
  adapts_after_deployment: string | null;
  technical_approach: string[] | null;
  human_involvement: string | null;
  override_capability: string | null;
  processes_personal_data: string | null;
  special_category_data: string | null;
  involves_minors: string | null;
  data_sources: string[] | null;
  // Risk indicators
  highrisk_employment: string | null;
  highrisk_education: string | null;
  highrisk_essential_services: string | null;
  highrisk_biometric: string | null;
  highrisk_critical_infrastructure: string | null;
  // Transparency
  transparency_direct_interaction: string | null;
  transparency_synthetic_content: string | null;
  // Confidence and rationale
  extraction_confidence: number;
  extraction_notes: string;
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
      'intake'
    );
    
    if (!privacyCheck.allowed) {
      return createPrivacyErrorResponse(privacyCheck, corsHeaders);
    }

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { description } = await req.json();

    if (!description || typeof description !== "string" || description.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: "Please provide a description of at least 20 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userPrompt = `Analyze this AI system description and extract structured data for EU AI Act compliance:

"${description}"

Extract all relevant information you can determine from this description.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: EXTRACTION_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_ai_system_data",
              description: "Extract structured AI system data from natural language description",
              parameters: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Suggested name for the AI system",
                  },
                  description: {
                    type: "string",
                    description: "Cleaned up description of the system",
                  },
                  summary: {
                    type: "string",
                    description: "One-sentence summary of what the system does",
                  },
                  department: {
                    type: "string",
                    enum: ["HR", "Finance", "IT", "Legal", "Marketing", "Operations", "Sales", "Customer Support", "Product", "Engineering", "Other"],
                    description: "Most likely department that owns this system",
                  },
                  purpose_category: {
                    type: "string",
                    enum: ["HR", "Finance", "Customer support", "Marketing", "Security", "Operations", "Product feature", "Other"],
                    description: "Primary purpose category",
                  },
                  deployment_regions: {
                    type: "array",
                    items: { type: "string", enum: ["EU", "UK", "US", "Other"] },
                    description: "Where the system is deployed",
                  },
                  eu_countries: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific EU countries if mentioned",
                  },
                  affected_groups: {
                    type: "array",
                    items: { type: "string", enum: ["Customers", "Employees", "Job candidates", "Students", "Patients", "General public", "Other"] },
                    description: "Who is affected by the system's outputs",
                  },
                  internal_user_groups: {
                    type: "array",
                    items: { type: "string", enum: ["Employees", "HR", "Sales", "Support", "Ops", "Other"] },
                    description: "Who uses the system internally",
                  },
                  is_customer_facing: {
                    type: "boolean",
                    description: "Whether customers interact with the system directly",
                  },
                  has_workplace_impact: {
                    type: "boolean",
                    description: "Whether it affects workplace decisions or monitoring",
                  },
                  has_legal_effects: {
                    type: "boolean",
                    description: "Whether it influences decisions with legal or significant effects",
                  },
                  built_internally: {
                    type: "string",
                    enum: ["fully", "partially", "not_internal"],
                    description: "Whether built in-house",
                  },
                  acquisition_method: {
                    type: "array",
                    items: { type: "string", enum: ["SaaS tool", "API model", "Open-source model", "Contractor-built", "Other"] },
                    description: "How the system was obtained",
                  },
                  value_chain_role: {
                    type: "array",
                    items: { type: "string", enum: ["deployer", "provider", "importer", "distributor"] },
                    description: "Organization's role in the AI value chain",
                  },
                  infers_outputs: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Does it infer outputs from inputs?",
                  },
                  output_types: {
                    type: "array",
                    items: { type: "string", enum: ["Predictions", "Recommendations", "Decisions", "Classifications", "Generated content", "Scores", "Other"] },
                    description: "Types of outputs produced",
                  },
                  operates_autonomously: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Does it operate with autonomy?",
                  },
                  adapts_after_deployment: {
                    type: "string",
                    enum: ["yes", "no", "unknown"],
                    description: "Does it learn/adapt after deployment?",
                  },
                  technical_approach: {
                    type: "array",
                    items: { type: "string", enum: ["Machine learning", "Deep learning", "LLM", "Statistical model", "Rules/logic-based", "Optimization", "Unknown"] },
                    description: "Technical approaches used",
                  },
                  human_involvement: {
                    type: "string",
                    enum: ["human_in_the_loop", "human_on_the_loop", "human_out_of_the_loop"],
                    description: "Level of human involvement",
                  },
                  override_capability: {
                    type: "string",
                    description: "Who can override outputs",
                  },
                  processes_personal_data: {
                    type: "string",
                    enum: ["yes", "no", "unknown"],
                    description: "Does it process personal data?",
                  },
                  special_category_data: {
                    type: "string",
                    enum: ["yes", "no", "unknown"],
                    description: "Does it process special category data?",
                  },
                  involves_minors: {
                    type: "string",
                    enum: ["yes", "no", "unknown"],
                    description: "Does it involve minors?",
                  },
                  data_sources: {
                    type: "array",
                    items: { type: "string", enum: ["User provided", "Internal systems", "Third-party datasets", "Public web", "Other"] },
                    description: "Data sources",
                  },
                  highrisk_employment: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Used for employment decisions (recruiting, performance, etc.)?",
                  },
                  highrisk_education: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Used in education (admissions, grading)?",
                  },
                  highrisk_essential_services: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Used for essential services (credit, insurance, benefits)?",
                  },
                  highrisk_biometric: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Uses biometric identification?",
                  },
                  highrisk_critical_infrastructure: {
                    type: "string",
                    enum: ["yes", "no", "unsure"],
                    description: "Used in critical infrastructure?",
                  },
                  transparency_direct_interaction: {
                    type: "string",
                    enum: ["yes", "no"],
                    description: "Does it interact directly with people?",
                  },
                  transparency_synthetic_content: {
                    type: "string",
                    enum: ["yes", "no"],
                    description: "Does it generate synthetic content?",
                  },
                  extraction_confidence: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "Overall confidence in the extraction (0-1)",
                  },
                  extraction_notes: {
                    type: "string",
                    description: "Notes about what was inferred vs explicitly stated, and any ambiguities",
                  },
                },
                required: ["extraction_confidence", "extraction_notes"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_ai_system_data" } },
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
      throw new Error("Failed to extract data");
    }

    const extractedData: ExtractedData = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        success: true,
        data: extractedData,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI System Intake error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
