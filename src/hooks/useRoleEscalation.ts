import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type EscalationTrigger = 
  | "rebranding"
  | "substantial_modification"
  | "name_trademark_change"
  | "intended_purpose_change"
  | "software_update_substantial";

export interface EscalationCheck {
  isTriggered: boolean;
  triggers: EscalationTrigger[];
  severity: "none" | "warning" | "critical";
  articleReference: string;
  requiredActions: string[];
  explanation: string;
}

export interface RoleEscalationResult {
  aiSystemId: string;
  systemName: string;
  currentRole: string;
  escalatedRole: string | null;
  distributorCheck: EscalationCheck | null;
  importerCheck: EscalationCheck | null;
  overallStatus: "clear" | "review_needed" | "escalated";
  lastCheckedAt: string;
}

// Article 25 escalation triggers
const ARTICLE_25_TRIGGERS = {
  distributor: {
    rebranding: {
      description: "Placing AI system on the market under own name or trademark",
      severity: "critical" as const,
      articleRef: "Article 25(1)(a)",
    },
    substantial_modification: {
      description: "Making a substantial modification to a high-risk AI system",
      severity: "critical" as const,
      articleRef: "Article 25(1)(b)",
    },
    intended_purpose_change: {
      description: "Modifying the intended purpose of an AI system",
      severity: "critical" as const,
      articleRef: "Article 25(1)(c)",
    },
  },
  importer: {
    rebranding: {
      description: "Placing AI system on the market under own name or trademark",
      severity: "critical" as const,
      articleRef: "Article 25(1)(a)",
    },
    substantial_modification: {
      description: "Making a substantial modification to a high-risk AI system",
      severity: "critical" as const,
      articleRef: "Article 25(1)(b)",
    },
    intended_purpose_change: {
      description: "Modifying the intended purpose of an AI system",
      severity: "critical" as const,
      articleRef: "Article 25(1)(c)",
    },
  },
};

const PROVIDER_OBLIGATIONS = [
  "Ensure the AI system complies with requirements in Chapter III, Section 2",
  "Establish a quality management system (Article 17)",
  "Draw up technical documentation (Article 11)",
  "Undergo conformity assessment (Article 43)",
  "Affix CE marking (Article 48)",
  "Register in EU database (Article 49)",
  "Implement post-market monitoring (Article 72)",
];

export function useRoleEscalation(aiSystemId?: string) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["role-escalation", aiSystemId],
    queryFn: async (): Promise<RoleEscalationResult | null> => {
      if (!aiSystemId) return null;

      // Fetch AI system details
      const { data: system, error: systemError } = await supabase
        .from("ai_systems")
        .select("id, name, value_chain_role")
        .eq("id", aiSystemId)
        .single();

      if (systemError) throw systemError;
      if (!system) return null;

      // Fetch distributor verification
      const { data: distributorVerification } = await supabase
        .from("distributor_verifications")
        .select("*")
        .eq("ai_system_id", aiSystemId)
        .maybeSingle();

      // Fetch importer verification (for potential future escalation checks)
      const { data: importerVerification } = await supabase
        .from("importer_verifications")
        .select("*")
        .eq("ai_system_id", aiSystemId)
        .maybeSingle();

      // Check distributor escalation triggers
      let distributorCheck: EscalationCheck | null = null;
      if (distributorVerification) {
        const triggers: EscalationTrigger[] = [];
        
        if (distributorVerification.has_rebranded) {
          triggers.push("rebranding");
          triggers.push("name_trademark_change");
        }
        if (distributorVerification.has_modified) {
          triggers.push("substantial_modification");
        }

        const isTriggered = triggers.length > 0;
        distributorCheck = {
          isTriggered,
          triggers,
          severity: isTriggered ? "critical" : "none",
          articleReference: "Article 25 EU AI Act",
          requiredActions: isTriggered ? PROVIDER_OBLIGATIONS : [],
          explanation: isTriggered
            ? `This distributor has triggered Article 25 escalation due to: ${triggers.map(t => 
                ARTICLE_25_TRIGGERS.distributor[t as keyof typeof ARTICLE_25_TRIGGERS.distributor]?.description || t
              ).join("; ")}. The organization shall be considered a Provider and must comply with all provider obligations.`
            : "No escalation triggers detected. Distributor obligations under Article 24 apply.",
        };
      }

      // Currently importers don't have the same escalation fields, but we prepare the structure
      let importerCheck: EscalationCheck | null = null;
      if (importerVerification) {
        // Future: Add importer-specific escalation checks if needed
        importerCheck = {
          isTriggered: false,
          triggers: [],
          severity: "none",
          articleReference: "Article 23 EU AI Act",
          requiredActions: [],
          explanation: "Importer obligations under Article 23 apply.",
        };
      }

      // Determine overall status
      let overallStatus: "clear" | "review_needed" | "escalated" = "clear";
      if (distributorCheck?.isTriggered || importerCheck?.isTriggered) {
        overallStatus = "escalated";
      } else if (distributorVerification?.status === "non_compliant" || importerVerification?.status === "non_compliant") {
        overallStatus = "review_needed";
      }

      return {
        aiSystemId,
        systemName: system.name,
        currentRole: Array.isArray(system.value_chain_role) 
          ? system.value_chain_role.join(", ") 
          : system.value_chain_role || "Unknown",
        escalatedRole: (distributorCheck?.isTriggered || importerCheck?.isTriggered) ? "Provider" : null,
        distributorCheck,
        importerCheck,
        overallStatus,
        lastCheckedAt: new Date().toISOString(),
      };
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

// Hook to check all systems for escalation
export function useOrganizationEscalationStatus() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["organization-escalation-status", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return null;

      // Fetch all distributor verifications with escalation triggered
      const { data: escalatedDistributors, error } = await supabase
        .from("distributor_verifications")
        .select(`
          *,
          ai_system:ai_systems(id, name)
        `)
        .eq("organization_id", profile.organization_id)
        .eq("escalation_to_provider_triggered", true);

      if (error) throw error;

      return {
        escalatedCount: escalatedDistributors?.length || 0,
        escalatedSystems: escalatedDistributors?.map(d => ({
          id: d.ai_system_id,
          name: d.ai_system?.name || "Unknown",
          hasRebranded: d.has_rebranded,
          hasModified: d.has_modified,
          escalationNotes: d.escalation_notes,
        })) || [],
      };
    },
    enabled: !!profile?.organization_id,
  });
}
