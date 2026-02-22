import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ExtractedSystemData {
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
  highrisk_employment: string | null;
  highrisk_education: string | null;
  highrisk_essential_services: string | null;
  highrisk_biometric: string | null;
  highrisk_critical_infrastructure: string | null;
  transparency_direct_interaction: string | null;
  transparency_synthetic_content: string | null;
  extraction_confidence: number;
  extraction_notes: string;
}

export function useAISystemIntake() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedSystemData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractFromDescription = async (description: string): Promise<ExtractedSystemData | null> => {
    if (!description || description.trim().length < 20) {
      toast.error("Please provide a more detailed description (at least 20 characters)");
      return null;
    }

    setIsExtracting(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Please sign in to use this feature");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-system-intake`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ description }),
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
        throw new Error(errorData.error || "Failed to extract data");
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setExtractedData(result.data);
        toast.success(`Extracted ${Object.keys(result.data).filter(k => result.data[k] !== null).length} fields from description`);
        return result.data;
      } else {
        throw new Error("Failed to extract data");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsExtracting(false);
    }
  };

  const clearExtractedData = () => {
    setExtractedData(null);
    setError(null);
  };

  return {
    isExtracting,
    extractedData,
    error,
    extractFromDescription,
    clearExtractedData,
  };
}
