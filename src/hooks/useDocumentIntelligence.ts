import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DocumentAnalysis {
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

export function useDocumentIntelligence() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeDocument = async (
    documentText: string,
    documentType?: string,
    aiSystemId?: string
  ): Promise<DocumentAnalysis | null> => {
    if (!documentText || documentText.length < 100) {
      toast.error("Document text must be at least 100 characters");
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Please sign in to use this feature");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/document-intelligence`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ documentText, documentType, aiSystemId }),
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
        throw new Error(errorData.error || "Failed to analyze document");
      }

      const result = await response.json();

      if (result.success && result.analysis) {
        setAnalysis(result.analysis);
        const gapCount = result.analysis.gaps?.length || 0;
        const clauseCount = result.analysis.key_clauses?.length || 0;
        toast.success(`Analysis complete: ${clauseCount} clauses found, ${gapCount} gaps identified`);
        return result.analysis;
      } else {
        throw new Error("Failed to analyze document");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    isAnalyzing,
    analysis,
    error,
    analyzeDocument,
    clearAnalysis,
  };
}
