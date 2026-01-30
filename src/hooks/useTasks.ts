import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { logTaskEvent } from "@/lib/auditLogger";

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

export interface BulkTaskInput {
  title: string;
  description?: string;
  priority?: Task["priority"];
  due_date?: string;
  ai_system_id?: string;
  vendor_id?: string;
  task_type?: string;
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

export function useCreateBulkTasks() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tasks: BulkTaskInput[]) => {
      if (!profile?.organization_id) throw new Error("No organization");
      if (tasks.length === 0) return { created: 0 };

      // Get existing tasks with same task_type + ai_system_id to avoid duplicates
      const aiSystemIds = [...new Set(tasks.map(t => t.ai_system_id).filter(Boolean))];
      const taskTypes = [...new Set(tasks.map(t => t.task_type).filter(Boolean))];

      let existingTasks: { task_type: string | null; ai_system_id: string | null }[] = [];
      
      if (aiSystemIds.length > 0 && taskTypes.length > 0) {
        const { data: existing } = await supabase
          .from("tasks")
          .select("task_type, ai_system_id")
          .eq("organization_id", profile.organization_id)
          .in("task_type", taskTypes)
          .in("ai_system_id", aiSystemIds);
        
        existingTasks = existing || [];
      }

      // Filter out duplicates
      const tasksToInsert = tasks.filter(task => {
        if (!task.task_type || !task.ai_system_id) return true;
        return !existingTasks.some(
          existing => existing.task_type === task.task_type && existing.ai_system_id === task.ai_system_id
        );
      });

      if (tasksToInsert.length === 0) {
        return { created: 0, skipped: tasks.length };
      }

      const insertData = tasksToInsert.map(task => ({
        organization_id: profile.organization_id,
        title: task.title,
        description: task.description || null,
        priority: task.priority || "medium",
        due_date: task.due_date || null,
        ai_system_id: task.ai_system_id || null,
        vendor_id: task.vendor_id || null,
        task_type: task.task_type || null,
        created_by: user?.id,
        status: "todo",
      }));

      const { data, error } = await supabase
        .from("tasks")
        .insert(insertData)
        .select();

      if (error) throw error;
      return { created: data.length, skipped: tasks.length - tasksToInsert.length };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      if (result.created > 0) {
        toast.success(`${result.created} compliance tasks created`);
      }
    },
    onError: (error) => {
      toast.error("Failed to create tasks", { description: error.message });
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      // Log task completion
      if (variables.status === "done" && data) {
        logTaskEvent(
          data.organization_id,
          data.assigned_to || undefined,
          "task.completed",
          data.id,
          data.title,
          data.ai_system_id || undefined
        );
      }
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

/**
 * Bulk assign tasks to a team member
 */
export function useBulkAssignTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskIds,
      assignedTo,
    }: {
      taskIds: string[];
      assignedTo: string | null;
    }) => {
      if (taskIds.length === 0) return 0;

      const { error } = await supabase
        .from("tasks")
        .update({ assigned_to: assignedTo })
        .in("id", taskIds);

      if (error) throw error;
      return taskIds.length;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(`Assigned ${count} tasks`);
    },
    onError: (error) => {
      toast.error("Failed to assign tasks", { description: error.message });
    },
  });
}

/**
 * Bulk update task status
 */
export function useBulkUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskIds,
      status,
    }: {
      taskIds: string[];
      status: Task["status"];
    }) => {
      if (taskIds.length === 0) return 0;

      const updateData: Record<string, unknown> = { status };
      if (status === "done") {
        updateData.completed_at = new Date().toISOString();
      } else {
        updateData.completed_at = null;
      }

      const { error } = await supabase
        .from("tasks")
        .update(updateData)
        .in("id", taskIds);

      if (error) throw error;
      return taskIds.length;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success(`Updated ${count} tasks`);
    },
    onError: (error) => {
      toast.error("Failed to update tasks", { description: error.message });
    },
  });
}
