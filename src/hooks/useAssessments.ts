import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ClassificationWithSystem {
  id: string;
  ai_system_id: string;
  risk_level: "prohibited" | "high_risk" | "limited_risk" | "minimal_risk" | "not_classified";
  confidence_level: string | null;
  classified_at: string | null;
  is_high_risk_candidate: boolean | null;
  has_transparency_obligations: boolean | null;
  has_prohibited_indicators: boolean | null;
  ai_system: {
    id: string;
    name: string;
    lifecycle_status: string;
  } | null;
  classified_by_profile: {
    full_name: string | null;
  } | null;
}

export interface FRIAWithSystem {
  id: string;
  ai_system_id: string;
  title: string;
  status: string;
  final_conclusion: string | null;
  created_at: string;
  completed_at: string | null;
  ai_system: {
    id: string;
    name: string;
  } | null;
  owner: {
    full_name: string | null;
  } | null;
}

export function useAllClassifications() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["all-classifications", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("ai_system_classifications")
        .select(`
          id,
          ai_system_id,
          risk_level,
          confidence_level,
          classified_at,
          is_high_risk_candidate,
          has_transparency_obligations,
          has_prohibited_indicators,
          ai_system:ai_systems(id, name, lifecycle_status),
          classified_by_profile:profiles!ai_system_classifications_classified_by_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("classified_at", { ascending: false });

      if (error) throw error;
      return data as ClassificationWithSystem[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useAllFRIAs() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["all-frias", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("fria_assessments")
        .select(`
          id,
          ai_system_id,
          title,
          status,
          final_conclusion,
          created_at,
          completed_at,
          ai_system:ai_systems(id, name),
          owner:profiles!fria_assessments_assessment_owner_id_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as FRIAWithSystem[];
    },
    enabled: !!profile?.organization_id,
  });
}
