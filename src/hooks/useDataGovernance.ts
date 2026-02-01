import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface Dataset {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  name: string;
  purpose: string;
  description: string | null;
  data_source: string | null;
  collection_method: string | null;
  collection_date_range: string | null;
  geographic_scope: string | null;
  licenses: Json;
  access_restrictions: string | null;
  retention_period: string | null;
  known_limitations: string | null;
  bias_checks_performed: Json;
  bias_mitigation_measures: string | null;
  data_quality_measures: string | null;
  record_count: number | null;
  feature_count: number | null;
  label_distribution: Json;
  evidence_file_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDatasetInput {
  ai_system_version_id: string;
  organization_id: string;
  name: string;
  purpose: string;
  description?: string;
  data_source?: string;
  collection_method?: string;
  collection_date_range?: string;
  geographic_scope?: string;
  licenses?: Json;
  access_restrictions?: string;
  retention_period?: string;
  known_limitations?: string;
  bias_checks_performed?: Json;
  bias_mitigation_measures?: string;
  data_quality_measures?: string;
  record_count?: number;
  feature_count?: number;
  label_distribution?: Json;
  evidence_file_id?: string;
}

export interface UpdateDatasetInput {
  id: string;
  name?: string;
  purpose?: string;
  description?: string;
  data_source?: string;
  collection_method?: string;
  collection_date_range?: string;
  geographic_scope?: string;
  licenses?: Json;
  access_restrictions?: string;
  retention_period?: string;
  known_limitations?: string;
  bias_checks_performed?: Json;
  bias_mitigation_measures?: string;
  data_quality_measures?: string;
  record_count?: number;
  feature_count?: number;
  label_distribution?: Json;
  evidence_file_id?: string;
}

export function useDatasets(versionId?: string) {
  return useQuery({
    queryKey: ["datasets", versionId],
    queryFn: async () => {
      let query = supabase
        .from("dataset_registry")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (versionId) {
        query = query.eq("ai_system_version_id", versionId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Dataset[];
    },
    enabled: !!versionId,
  });
}

export function useDataset(datasetId?: string) {
  return useQuery({
    queryKey: ["dataset", datasetId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dataset_registry")
        .select("*")
        .eq("id", datasetId!)
        .single();
      
      if (error) throw error;
      return data as Dataset;
    },
    enabled: !!datasetId,
  });
}

export function useCreateDataset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateDatasetInput) => {
      const { data, error } = await supabase
        .from("dataset_registry")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as Dataset;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["datasets", data.ai_system_version_id] });
      toast({
        title: "Dataset registered",
        description: `${data.name} has been added to the registry.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error registering dataset",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateDataset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateDatasetInput) => {
      const { data, error } = await supabase
        .from("dataset_registry")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Dataset;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["datasets", data.ai_system_version_id] });
      queryClient.invalidateQueries({ queryKey: ["dataset", data.id] });
      toast({
        title: "Dataset updated",
        description: `${data.name} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating dataset",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteDataset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, versionId }: { id: string; versionId: string }) => {
      const { error } = await supabase
        .from("dataset_registry")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { id, versionId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["datasets", data.versionId] });
      toast({
        title: "Dataset removed",
        description: "Dataset has been removed from the registry.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing dataset",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const DATASET_PURPOSE_OPTIONS = [
  { value: 'training', label: 'Training' },
  { value: 'validation', label: 'Validation' },
  { value: 'testing', label: 'Testing' },
  { value: 'fine_tuning', label: 'Fine-tuning' },
  { value: 'evaluation', label: 'Evaluation' },
];

export const COLLECTION_METHOD_OPTIONS = [
  { value: 'web_scraping', label: 'Web Scraping' },
  { value: 'api_collection', label: 'API Collection' },
  { value: 'manual_annotation', label: 'Manual Annotation' },
  { value: 'crowdsourcing', label: 'Crowdsourcing' },
  { value: 'sensor_data', label: 'Sensor/IoT Data' },
  { value: 'user_generated', label: 'User Generated' },
  { value: 'purchased', label: 'Purchased/Licensed' },
  { value: 'synthetic', label: 'Synthetic Generation' },
  { value: 'other', label: 'Other' },
];

export const BIAS_CHECK_OPTIONS = [
  { value: 'demographic_parity', label: 'Demographic Parity Analysis' },
  { value: 'equalized_odds', label: 'Equalized Odds Check' },
  { value: 'calibration', label: 'Calibration Analysis' },
  { value: 'representation', label: 'Representation Analysis' },
  { value: 'label_bias', label: 'Label Bias Check' },
  { value: 'sampling_bias', label: 'Sampling Bias Check' },
  { value: 'proxy_discrimination', label: 'Proxy Discrimination Check' },
  { value: 'intersectional', label: 'Intersectional Analysis' },
];
