import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ClassificationResult {
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

export function useClassificationAssistant() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const classifySystem = async (systemData: Record<string, unknown>): Promise<ClassificationResult | null> => {
    if (!systemData) {
      toast.error("System data is required");
      return null;
    }

    setIsClassifying(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/classification-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ systemData }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        if (response.status === 402) {
          throw new Error("AI credits exhausted.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to classify system");
      }

      const data = await response.json();

      if (data.success && data.classification) {
        setResult(data.classification);
        const confidence = Math.round(data.classification.confidence_score * 100);
        toast.success(`Classification complete: ${data.classification.suggested_classification.replace("_", " ")} (${confidence}% confidence)`);
        return data.classification;
      } else {
        throw new Error("Failed to classify system");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsClassifying(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    isClassifying,
    result,
    error,
    classifySystem,
    clearResult,
  };
}
