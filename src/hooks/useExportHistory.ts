import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ExportLog {
  id: string;
  export_type: string;
  file_name: string;
  file_size_bytes: number | null;
  created_at: string;
  user: { full_name: string | null } | null;
  ai_system: { name: string } | null;
}

interface ExportStats {
  totalExports: number;
  exportsThisMonth: number;
}

export function useExportHistory() {
  const { profile } = useAuth();

  const { data: exports, isLoading, error, refetch } = useQuery({
    queryKey: ["export-history", profile?.organization_id],
    queryFn: async (): Promise<ExportLog[]> => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("export_logs")
        .select(`
          id,
          export_type,
          file_name,
          file_size_bytes,
          created_at,
          user:profiles!export_logs_user_id_fkey(full_name),
          ai_system:ai_systems!export_logs_ai_system_id_fkey(name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return (data || []) as ExportLog[];
    },
    enabled: !!profile?.organization_id,
  });

  const { data: stats } = useQuery({
    queryKey: ["export-stats", profile?.organization_id],
    queryFn: async (): Promise<ExportStats> => {
      if (!profile?.organization_id) {
        return { totalExports: 0, exportsThisMonth: 0 };
      }

      // Get start of current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Total count
      const { count: totalExports } = await supabase
        .from("export_logs")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", profile.organization_id);

      // This month count
      const { count: exportsThisMonth } = await supabase
        .from("export_logs")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", profile.organization_id)
        .gte("created_at", startOfMonth);

      return {
        totalExports: totalExports || 0,
        exportsThisMonth: exportsThisMonth || 0,
      };
    },
    enabled: !!profile?.organization_id,
  });

  return {
    exports: exports || [],
    stats: stats || { totalExports: 0, exportsThisMonth: 0 },
    isLoading,
    error,
    refetch,
  };
}
