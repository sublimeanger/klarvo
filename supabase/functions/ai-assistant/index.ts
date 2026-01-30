import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Klarvo AI, an expert assistant for the Klarvo EU AI Act Compliance Platform. Your role is to help users understand EU AI Act requirements, navigate the platform, and answer compliance questions.

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

## Example Questions You Can Answer
- "What are my obligations as a deployer?"
- "Is my AI system high-risk?"
- "When do I need a FRIA?"
- "What is the February 2025 deadline about?"
- "How do I add an AI system in Klarvo?"
- "What evidence do I need for compliance?"
- "What training do my staff need?"
- "How do I export an evidence pack?"

Remember: You provide guidance, not legal advice. For complex interpretations, recommend consulting qualified counsel.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stream = true } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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
          { role: "system", content: SYSTEM_PROMPT },
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
