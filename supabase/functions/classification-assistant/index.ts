import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CLASSIFICATION_PROMPT = `You are an EU AI Act classification expert. Based on the AI system information provided, determine the likely risk classification.

## Classification Criteria

### Prohibited (Article 5)
- Subliminal/manipulative/deceptive techniques causing harm
- Exploitation of vulnerabilities (age, disability)
- Social scoring
- Criminal profiling solely based on profiling
- Untargeted facial recognition scraping
- Workplace/education emotion inference
- Biometric categorization revealing protected characteristics
- Real-time remote biometric ID in public spaces (law enforcement)

### High-Risk (Annex III)
- Biometrics for identification/categorization
- Critical infrastructure (energy, transport, water, digital)
- Education (admissions, grading, behavior monitoring)
- Employment (recruiting, CV screening, performance, termination)
- Essential services (credit scoring, insurance, emergency dispatch)
- Law enforcement (risk assessment, lie detection, evidence analysis)
- Migration/border control (visa, residence permits)
- Justice/democratic processes (court support, elections)
- Safety component of regulated product (Annex I)

### Limited Risk (Article 50 - Transparency)
- Direct interaction with persons (chatbots, assistants)
- Synthetic content generation (text, image, audio, video)
- Emotion recognition or biometric categorization
- Deepfake generation

### Minimal Risk
- Everything else - no specific obligations

Be thorough in your analysis and explain your reasoning clearly.`;

interface ClassificationResult {
  suggested_classification: "prohibited" | "high_risk" | "limited_risk" | "minimal_risk";
  confidence_score: number;
  confidence_level: "high" | "medium" | "low";
  reasoning: string;
  key_factors: Array<{
    factor: string;
    impact: "increases_risk" | "decreases_risk" | "neutral";
    explanation: string;
  }>;
  article_references: string[];
  prohibited_indicators: Array<{
    indicator: string;
    present: boolean;
    notes: string;
  }>;
  high_risk_categories: Array<{
    category: string;
    applicable: boolean;
    notes: string;
  }>;
  transparency_obligations: Array<{
    obligation: string;
    applicable: boolean;
    notes: string;
  }>;
  ambiguities: string[];
  recommended_next_steps: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { systemData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!systemData) {
      return new Response(
        JSON.stringify({ error: "System data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userPrompt = `Analyze this AI system and provide a classification recommendation:

## System Information
${JSON.stringify(systemData, null, 2)}

Provide a detailed classification analysis with confidence score and reasoning.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: CLASSIFICATION_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_ai_system",
              description: "Classify an AI system according to EU AI Act risk categories",
              parameters: {
                type: "object",
                properties: {
                  suggested_classification: {
                    type: "string",
                    enum: ["prohibited", "high_risk", "limited_risk", "minimal_risk"],
                    description: "Suggested risk classification",
                  },
                  confidence_score: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "Confidence in classification (0-1)",
                  },
                  confidence_level: {
                    type: "string",
                    enum: ["high", "medium", "low"],
                    description: "Qualitative confidence level",
                  },
                  reasoning: {
                    type: "string",
                    description: "Detailed explanation of the classification reasoning (max 500 chars)",
                  },
                  key_factors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        factor: { type: "string", description: "Key factor considered" },
                        impact: { type: "string", enum: ["increases_risk", "decreases_risk", "neutral"] },
                        explanation: { type: "string", description: "How this factor affects classification" },
                      },
                      required: ["factor", "impact", "explanation"],
                      additionalProperties: false,
                    },
                    description: "Key factors that influenced the classification",
                  },
                  article_references: {
                    type: "array",
                    items: { type: "string" },
                    description: "Relevant EU AI Act articles (e.g., 'Article 5', 'Annex III.4')",
                  },
                  prohibited_indicators: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        indicator: { type: "string", description: "Prohibited practice indicator" },
                        present: { type: "boolean", description: "Whether this indicator is present" },
                        notes: { type: "string", description: "Additional notes" },
                      },
                      required: ["indicator", "present", "notes"],
                      additionalProperties: false,
                    },
                    description: "Article 5 prohibited practice screening",
                  },
                  high_risk_categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string", description: "Annex III category" },
                        applicable: { type: "boolean", description: "Whether this category applies" },
                        notes: { type: "string", description: "Additional notes" },
                      },
                      required: ["category", "applicable", "notes"],
                      additionalProperties: false,
                    },
                    description: "Annex III high-risk category screening",
                  },
                  transparency_obligations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        obligation: { type: "string", description: "Article 50 transparency obligation" },
                        applicable: { type: "boolean", description: "Whether this applies" },
                        notes: { type: "string", description: "Additional notes" },
                      },
                      required: ["obligation", "applicable", "notes"],
                      additionalProperties: false,
                    },
                    description: "Article 50 transparency obligations",
                  },
                  ambiguities: {
                    type: "array",
                    items: { type: "string" },
                    description: "Areas where classification is uncertain",
                  },
                  recommended_next_steps: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended actions based on the classification",
                  },
                },
                required: [
                  "suggested_classification",
                  "confidence_score",
                  "confidence_level",
                  "reasoning",
                  "key_factors",
                  "article_references",
                  "prohibited_indicators",
                  "high_risk_categories",
                  "transparency_obligations",
                  "ambiguities",
                  "recommended_next_steps"
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_ai_system" } },
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
      throw new Error("Failed to classify system");
    }

    const classification: ClassificationResult = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        success: true,
        classification,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Classification Assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
