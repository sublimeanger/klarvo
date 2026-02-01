import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CEMarkingRecord {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  marking_type: string;
  location_description: string | null;
  notified_body_id_displayed: boolean;
  notified_body_number: string | null;
  evidence_file_id: string | null;
  verified_by: string | null;
  verified_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCEMarkingInput {
  ai_system_version_id: string;
  organization_id: string;
  marking_type: string;
  location_description?: string;
  notified_body_id_displayed?: boolean;
  notified_body_number?: string;
  evidence_file_id?: string;
  notes?: string;
}

export interface UpdateCEMarkingInput {
  id: string;
  marking_type?: string;
  location_description?: string;
  notified_body_id_displayed?: boolean;
  notified_body_number?: string;
  evidence_file_id?: string;
  notes?: string;
}

export function useCEMarkingRecords(versionId?: string) {
  return useQuery({
    queryKey: ["ce-marking-records", versionId],
    queryFn: async () => {
      let query = supabase
        .from("ce_marking_records")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (versionId) {
        query = query.eq("ai_system_version_id", versionId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as CEMarkingRecord[];
    },
    enabled: !!versionId,
  });
}

export function useCreateCEMarking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateCEMarkingInput) => {
      const { data, error } = await supabase
        .from("ce_marking_records")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as CEMarkingRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ce-marking-records", data.ai_system_version_id] });
      toast({
        title: "CE marking recorded",
        description: "CE marking evidence has been added.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error recording CE marking",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCEMarking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateCEMarkingInput) => {
      const { data, error } = await supabase
        .from("ce_marking_records")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as CEMarkingRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ce-marking-records", data.ai_system_version_id] });
      toast({
        title: "CE marking updated",
        description: "CE marking record has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating CE marking",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useVerifyCEMarking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, verifiedBy }: { id: string; verifiedBy: string }) => {
      const { data, error } = await supabase
        .from("ce_marking_records")
        .update({
          verified_by: verifiedBy,
          verified_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as CEMarkingRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ce-marking-records", data.ai_system_version_id] });
      toast({
        title: "CE marking verified",
        description: "CE marking has been verified.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error verifying CE marking",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCEMarking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, versionId }: { id: string; versionId: string }) => {
      const { error } = await supabase
        .from("ce_marking_records")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { id, versionId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ce-marking-records", data.versionId] });
      toast({
        title: "CE marking removed",
        description: "CE marking record has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing CE marking",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const CE_MARKING_TYPES = [
  { value: 'digital', label: 'Digital (on interface/app)' },
  { value: 'physical', label: 'Physical (on hardware)' },
  { value: 'packaging', label: 'On Packaging' },
  { value: 'documentation', label: 'In Documentation' },
  { value: 'data_plate', label: 'On Data Plate/Label' },
];
