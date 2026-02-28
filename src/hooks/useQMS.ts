import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type DocStatus = 'draft' | 'in_review' | 'approved';

export interface QMSDocument {
  id: string;
  organization_id: string;
  doc_type: string;
  doc_category: string | null;
  title: string;
  doc_number: string | null;
  version: string;
  status: DocStatus;
  description: string | null;
  evidence_file_id: string | null;
  effective_date: string | null;
  review_date: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateQMSDocInput {
  organization_id: string;
  doc_type: string;
  title: string;
  doc_category?: string;
  doc_number?: string;
  version?: string;
  description?: string;
  evidence_file_id?: string;
  effective_date?: string;
  review_date?: string;
}

export interface UpdateQMSDocInput {
  id: string;
  title?: string;
  doc_type?: string;
  doc_category?: string;
  doc_number?: string;
  version?: string;
  status?: DocStatus;
  description?: string;
  evidence_file_id?: string;
  effective_date?: string;
  review_date?: string;
}

export function useQMSDocuments(organizationId?: string) {
  return useQuery({
    queryKey: ["qms-documents", organizationId],
    queryFn: async () => {
      let query = supabase
        .from("qms_documents")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (organizationId) {
        query = query.eq("organization_id", organizationId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as QMSDocument[];
    },
  });
}

export function useQMSDocument(docId?: string) {
  return useQuery({
    queryKey: ["qms-document", docId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qms_documents")
        .select("*")
        .eq("id", docId!)
        .single();
      
      if (error) throw error;
      return data as QMSDocument;
    },
    enabled: !!docId,
  });
}

export function useCreateQMSDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateQMSDocInput) => {
      const { data, error } = await supabase
        .from("qms_documents")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as QMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qms-documents"] });
      toast({
        title: "Document created",
        description: `${data.title} has been created.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating document",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateQMSDocument() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateQMSDocInput) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("qms_documents")
        .update(updates)
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();
      
      if (error) throw error;
      return data as QMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qms-documents"] });
      queryClient.invalidateQueries({ queryKey: ["qms-document", data.id] });
      toast({
        title: "Document updated",
        description: `${data.title} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating document",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useApproveQMSDocument() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, approvedBy }: { id: string; approvedBy: string }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("qms_documents")
        .update({
          status: 'approved' as DocStatus,
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();
      
      if (error) throw error;
      return data as QMSDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["qms-documents"] });
      queryClient.invalidateQueries({ queryKey: ["qms-document", data.id] });
      toast({
        title: "Document approved",
        description: `${data.title} has been approved.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error approving document",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteQMSDocument() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("qms_documents")
        .delete()
        .eq("id", id)
        .eq("organization_id", profile.organization_id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-documents"] });
      toast({
        title: "Document deleted",
        description: "QMS document has been deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting document",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// QMS document type options
export const QMS_DOC_TYPES = [
  { value: 'qms_policy', label: 'QMS Policy' },
  { value: 'procedure', label: 'Procedure' },
  { value: 'work_instruction', label: 'Work Instruction' },
  { value: 'form', label: 'Form/Template' },
  { value: 'record', label: 'Record' },
];

export const QMS_DOC_CATEGORIES = [
  { value: 'risk_management', label: 'Risk Management' },
  { value: 'design_control', label: 'Design Control' },
  { value: 'change_control', label: 'Change Control' },
  { value: 'document_control', label: 'Document Control' },
  { value: 'training', label: 'Training' },
  { value: 'internal_audit', label: 'Internal Audit' },
  { value: 'corrective_action', label: 'Corrective Action' },
  { value: 'management_review', label: 'Management Review' },
  { value: 'supplier_management', label: 'Supplier Management' },
  { value: 'post_market', label: 'Post-Market Monitoring' },
];
