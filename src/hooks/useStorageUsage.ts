import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface StorageUsage {
  totalBytes: number;
  totalGb: number;
  fileCount: number;
}

export function useStorageUsage() {
  const { profile } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["storage-usage", profile?.organization_id],
    queryFn: async (): Promise<StorageUsage> => {
      if (!profile?.organization_id) {
        return { totalBytes: 0, totalGb: 0, fileCount: 0 };
      }

      const { data, error } = await supabase
        .from("evidence_files")
        .select("file_size")
        .eq("organization_id", profile.organization_id);

      if (error) throw error;

      const totalBytes = (data || []).reduce((sum, file) => sum + (file.file_size || 0), 0);
      const totalGb = Number((totalBytes / (1024 * 1024 * 1024)).toFixed(2));

      return {
        totalBytes,
        totalGb,
        fileCount: data?.length || 0,
      };
    },
    enabled: !!profile?.organization_id,
  });

  return {
    storageUsage: data || { totalBytes: 0, totalGb: 0, fileCount: 0 },
    isLoading,
    error,
  };
}
