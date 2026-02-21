import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkAIFeatureAllowed, checkUserRole, checkPlanEntitlement, getOrganizationId, createPrivacyErrorResponse } from "../_shared/ai-privacy.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DOCUMENT_ANALYSIS_PROMPT = `You are an expert at analyzing vendor contracts, AI policies, and compliance documents for EU AI Act requirements.

Analyze the provided document text and extract:
1. Key contractual clauses related to AI governance
2. Data protection provisions
3. Liability and indemnification terms
4. AI-specific commitments (transparency, oversight, bias mitigation)
5. Compliance gaps and missing sections
6. Mapping to EU AI Act control requirements

Be thorough but practical. Focus on what matters for compliance.`;

interface DocumentAnalysis {
  document_type: string;
  summary: string;
  key_clauses: Array<{
    title: string;
    content: string;
    relevance: "high" | "medium" | "low";
    article_reference: string | null;
  }>;
  ai_provisions: {
    transparency_commitment: boolean;
    human_oversight_defined: boolean;
    bias_mitigation_mentioned: boolean;
    incident_reporting_process: boolean;
    data_governance_terms: boolean;
    model_documentation_available: boolean;
  };
  control_mappings: Array<{
    control_id: string;
    control_name: string;
    coverage: "full" | "partial" | "none";
    evidence_quote: string | null;
  }>;
  gaps: Array<{
    gap_type: string;
    description: string;
    severity: "critical" | "high" | "medium" | "low";
    recommendation: string;
  }>;
  risk_flags: string[];
  confidence_score: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // Check AI privacy settings - document intelligence has extra privacy check
    const privacyCheck = await checkAIFeatureAllowed(
      supabaseUrl,
      supabaseServiceKey,
      req.headers.get("authorization"),
      'document'
    );
    
    if (!privacyCheck.allowed) {
      return createPrivacyErrorResponse(privacyCheck, corsHeaders);
    }

    // Check user role
    const roleCheck = await checkUserRole(
      supabaseUrl,
      supabaseServiceKey,
      req.headers.get("authorization"),
      ["admin", "compliance_owner", "system_owner"]
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
      const planCheck = await checkPlanEntitlement(supabaseUrl, supabaseServiceKey, orgId, 'ai_document');
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

    const { documentText, documentType, aiSystemId } = await req.json();

    if (!documentText || documentText.length < 100) {
      return new Response(
        JSON.stringify({ error: "Document text must be at least 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Truncate very long documents
    const truncatedText = documentText.length > 30000 
      ? documentText.substring(0, 30000) + "\n\n[Document truncated for analysis...]"
      : documentText;

    const userPrompt = `Analyze this ${documentType || "document"} for EU AI Act compliance:

---
${truncatedText}
---

${aiSystemId ? `This document is related to an AI system being evaluated for compliance.` : ""}

Extract key clauses, AI provisions, control mappings, and identify any gaps.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: DOCUMENT_ANALYSIS_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_document",
              description: "Analyze a document for EU AI Act compliance requirements",
              parameters: {
                type: "object",
                properties: {
                  document_type: {
                    type: "string",
                    enum: ["vendor_contract", "dpa", "ai_policy", "security_whitepaper", "terms_of_service", "model_card", "other"],
                    description: "Type of document analyzed",
                  },
                  summary: {
                    type: "string",
                    description: "Brief summary of the document's compliance relevance (max 200 chars)",
                  },
                  key_clauses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Clause title or section" },
                        content: { type: "string", description: "Key content of the clause (max 200 chars)" },
                        relevance: { type: "string", enum: ["high", "medium", "low"] },
                        article_reference: { type: "string", description: "Relevant EU AI Act article if applicable" },
                      },
                      required: ["title", "content", "relevance"],
                      additionalProperties: false,
                    },
                    description: "Key clauses found in the document",
                  },
                  ai_provisions: {
                    type: "object",
                    properties: {
                      transparency_commitment: { type: "boolean", description: "Transparency commitments mentioned" },
                      human_oversight_defined: { type: "boolean", description: "Human oversight provisions exist" },
                      bias_mitigation_mentioned: { type: "boolean", description: "Bias/fairness provisions exist" },
                      incident_reporting_process: { type: "boolean", description: "Incident reporting defined" },
                      data_governance_terms: { type: "boolean", description: "Data governance terms included" },
                      model_documentation_available: { type: "boolean", description: "Model docs referenced/included" },
                    },
                    required: ["transparency_commitment", "human_oversight_defined", "bias_mitigation_mentioned", "incident_reporting_process", "data_governance_terms", "model_documentation_available"],
                    additionalProperties: false,
                  },
                  control_mappings: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        control_id: { type: "string", description: "Control ID (e.g., VEN-01, DEP-02)" },
                        control_name: { type: "string", description: "Control name" },
                        coverage: { type: "string", enum: ["full", "partial", "none"] },
                        evidence_quote: { type: "string", description: "Relevant quote from document" },
                      },
                      required: ["control_id", "control_name", "coverage"],
                      additionalProperties: false,
                    },
                    description: "How document maps to compliance controls",
                  },
                  gaps: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        gap_type: { type: "string", description: "Type of gap (e.g., Missing clause, Unclear terms)" },
                        description: { type: "string", description: "Description of the gap" },
                        severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
                        recommendation: { type: "string", description: "Recommended action" },
                      },
                      required: ["gap_type", "description", "severity", "recommendation"],
                      additionalProperties: false,
                    },
                    description: "Identified compliance gaps",
                  },
                  risk_flags: {
                    type: "array",
                    items: { type: "string" },
                    description: "Red flags or concerns identified",
                  },
                  confidence_score: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "Confidence in the analysis",
                  },
                },
                required: ["document_type", "summary", "key_clauses", "ai_provisions", "control_mappings", "gaps", "risk_flags", "confidence_score"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_document" } },
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
      throw new Error("Failed to analyze document");
    }

    const analysis: DocumentAnalysis = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        success: true,
        analysis,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Document Intelligence error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
