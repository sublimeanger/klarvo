import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Task {
  id: string;
  organization_id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "done" | "blocked";
  due_date: string | null;
  completed_at: string | null;
  assigned_to: string | null;
  created_by: string | null;
  ai_system_id: string | null;
  vendor_id: string | null;
  task_type: string | null;
  created_at: string;
  updated_at: string;
  assignee?: { full_name: string | null } | null;
  ai_systems?: { name: string } | null;
  vendors?: { name: string } | null;
}

export function useTasks(filters?: { status?: string; ai_system_id?: string }) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      let query = supabase
        .from("tasks")
        .select(`
          *,
          assignee:profiles!tasks_assigned_to_fkey(full_name),
          ai_systems:ai_system_id(name),
          vendors:vendor_id(name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("due_date", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters?.ai_system_id) {
        query = query.eq("ai_system_id", filters.ai_system_id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Task[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useCreateTask() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      title: string;
      description?: string;
      priority?: Task["priority"];
      due_date?: string;
      assigned_to?: string;
      ai_system_id?: string;
      vendor_id?: string;
      task_type?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("tasks")
        .insert({
          organization_id: profile.organization_id,
          title: input.title,
          description: input.description || null,
          priority: input.priority || "medium",
          due_date: input.due_date || null,
          assigned_to: input.assigned_to || null,
          ai_system_id: input.ai_system_id || null,
          vendor_id: input.vendor_id || null,
          task_type: input.task_type || null,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("Task created");
    },
    onError: (error) => {
      toast.error("Failed to create task", { description: error.message });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      title?: string;
      description?: string;
      priority?: Task["priority"];
      status?: string;
      due_date?: string | null;
      assigned_to?: string | null;
      ai_system_id?: string | null;
      task_type?: string;
    }) => {
      const updateData: Record<string, unknown> = { ...updates };
      
      // Set completed_at when marking done
      if (updates.status === "done") {
        updateData.completed_at = new Date().toISOString();
      } else if (updates.status && updates.status !== "done") {
        updateData.completed_at = null;
      }

      const { data, error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("Task updated");
    },
    onError: (error) => {
      toast.error("Failed to update task", { description: error.message });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("Task deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete task", { description: error.message });
    },
  });
}
