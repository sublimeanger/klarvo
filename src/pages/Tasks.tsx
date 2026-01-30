import { useState, useMemo } from "react";
import { format, isPast, isToday } from "date-fns";
import {
  Plus,
  Search,
  CheckSquare,
  MoreHorizontal,
  Trash2,
  Loader2,
  Calendar,
  User,
  AlertCircle,
  Clock,
  CheckCircle,
  Circle,
  Filter,
  Cpu,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useBulkAssignTasks, useBulkUpdateTaskStatus, type Task } from "@/hooks/useTasks";
import { useAISystems } from "@/hooks/useAISystems";
import { useOrgMembers } from "@/hooks/useOrgMembers";

const TASK_TYPES = [
  { value: "classification", label: "Classification" },
  { value: "evidence", label: "Evidence" },
  { value: "review", label: "Review" },
  { value: "training", label: "Training" },
  { value: "documentation", label: "Documentation" },
  { value: "monitoring", label: "Monitoring" },
  { value: "incident", label: "Incident" },
  { value: "other", label: "Other" },
];

const priorityConfig: Record<string, { label: string; variant: "draft" | "pending" | "warning" | "destructive" }> = {
  low: { label: "Low", variant: "draft" },
  medium: { label: "Medium", variant: "pending" },
  high: { label: "High", variant: "warning" },
  urgent: { label: "Urgent", variant: "destructive" },
};

const statusConfig: Record<string, { label: string; icon: typeof Circle }> = {
  todo: { label: "To Do", icon: Circle },
  in_progress: { label: "In Progress", icon: Clock },
  done: { label: "Done", icon: CheckCircle },
  blocked: { label: "Blocked", icon: AlertCircle },
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    due_date: "",
    assigned_to: "",
    ai_system_id: "",
    task_type: "",
  });

  const { data: tasks = [], isLoading } = useTasks({ status: statusFilter });
  const { systems } = useAISystems();
  const { members } = useOrgMembers();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const bulkAssign = useBulkAssignTasks();
  const bulkUpdateStatus = useBulkUpdateTaskStatus();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newTask.title.trim()) return;
    
    await createTask.mutateAsync({
      title: newTask.title,
      description: newTask.description || undefined,
      priority: newTask.priority,
      due_date: newTask.due_date || undefined,
      assigned_to: newTask.assigned_to || undefined,
      ai_system_id: newTask.ai_system_id || undefined,
      task_type: newTask.task_type || undefined,
    });

    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      due_date: "",
      assigned_to: "",
      ai_system_id: "",
      task_type: "",
    });
    setShowAddDialog(false);
  };

  const handleStatusToggle = async (task: Task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    await updateTask.mutateAsync({ id: task.id, status: newStatus });
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteTask.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  // Bulk operations
  const toggleSelectAll = () => {
    if (selectedTasks.size === filteredTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks.map((t) => t.id)));
    }
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const handleBulkAssign = async (assignedTo: string | null) => {
    await bulkAssign.mutateAsync({
      taskIds: Array.from(selectedTasks),
      assignedTo,
    });
    setSelectedTasks(new Set());
    setIsSelectionMode(false);
  };

  const handleBulkStatusChange = async (status: Task["status"]) => {
    await bulkUpdateStatus.mutateAsync({
      taskIds: Array.from(selectedTasks),
      status,
    });
    setSelectedTasks(new Set());
    setIsSelectionMode(false);
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedTasks(new Set());
  };

  // Stats
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const overdueCount = tasks.filter(
    (t) => t.due_date && isPast(new Date(t.due_date)) && t.status !== "done"
  ).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Track compliance actions and deadlines
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isSelectionMode ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsSelectionMode(true)} className="hidden sm:flex">
                <Users className="mr-2 h-4 w-4" />
                Bulk Edit
              </Button>
              <Button size="sm" onClick={() => setShowAddDialog(true)} className="flex-1 sm:flex-initial">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={exitSelectionMode}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {isSelectionMode && selectedTasks.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
          <span className="text-xs sm:text-sm font-medium">
            {selectedTasks.size} selected
          </span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          
          <Select onValueChange={(v) => handleBulkAssign(v === "unassigned" ? null : v)}>
            <SelectTrigger className="w-[140px] sm:w-[160px] h-8">
              <User className="mr-2 h-3 w-3" />
              <span className="text-xs">Assign...</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {members.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.full_name || "Unnamed"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleBulkStatusChange(v as Task["status"])}>
            <SelectTrigger className="w-[120px] sm:w-[140px] h-8">
              <CheckCircle className="mr-2 h-3 w-3" />
              <span className="text-xs">Status...</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {isSelectionMode && (
          <Checkbox
            checked={filteredTasks.length > 0 && selectedTasks.size === filteredTasks.length}
            onCheckedChange={toggleSelectAll}
            className="h-5 w-5 shrink-0"
          />
        )}
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[120px] sm:w-[150px] h-9 shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{todoCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">To Do</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-warning/10 p-1.5 sm:p-2">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{inProgressCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-success/10 p-1.5 sm:p-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{doneCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Done</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-destructive/10 p-1.5 sm:p-2">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{overdueCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task List or Empty State */}
      {filteredTasks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || statusFilter !== "all" ? "No tasks found" : "No tasks yet"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Create tasks to track compliance actions and deadlines"
              }
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Task
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => {
            const StatusIcon = statusConfig[task.status]?.icon || Circle;
            const isOverdue = task.due_date && isPast(new Date(task.due_date)) && task.status !== "done";
            const isDueToday = task.due_date && isToday(new Date(task.due_date));

            return (
              <div
                key={task.id}
                className={`flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors ${
                  task.status === "done" ? "opacity-60" : ""
                } ${selectedTasks.has(task.id) ? "ring-2 ring-primary" : ""}`}
              >
                {isSelectionMode ? (
                  <Checkbox
                    checked={selectedTasks.has(task.id)}
                    onCheckedChange={() => toggleTaskSelection(task.id)}
                    className="h-5 w-5"
                  />
                ) : (
                  <Checkbox
                    checked={task.status === "done"}
                    onCheckedChange={() => handleStatusToggle(task)}
                    className="h-5 w-5"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <p className={`font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-none ${task.status === "done" ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    <StatusBadge variant={priorityConfig[task.priority]?.variant || "draft"} className="text-xs shrink-0">
                      {priorityConfig[task.priority]?.label}
                    </StatusBadge>
                    {task.task_type && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 sm:px-2 py-0.5 rounded shrink-0 hidden sm:inline">
                        {TASK_TYPES.find((t) => t.value === task.task_type)?.label}
                      </span>
                    )}
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    {task.due_date && (
                      <span className={`flex items-center gap-1 ${isOverdue ? "text-destructive" : isDueToday ? "text-warning" : ""}`}>
                        <Calendar className="h-3 w-3" />
                        {isOverdue ? "Overdue: " : isDueToday ? "Due today" : ""}
                        {!isDueToday && format(new Date(task.due_date), "PP")}
                      </span>
                    )}
                    {task.assignee?.full_name && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignee.full_name}
                      </span>
                    )}
                    {task.ai_systems?.name && (
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        {task.ai_systems.name}
                      </span>
                    )}
                  </div>
                </div>

                <Select
                  value={task.status}
                  onValueChange={(v) => updateTask.mutate({ id: task.id, status: v as Task["status"] })}
                >
                  <SelectTrigger className="w-[100px] sm:w-[130px] h-8 shrink-0">
                    <StatusIcon className="mr-1.5 sm:mr-2 h-3 w-3" />
                    <span className="text-[10px] sm:text-xs">{statusConfig[task.status]?.label}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDeleteId(task.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Create a new compliance task
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Complete classification for ChatGPT"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Additional details..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(v) => setNewTask({ ...newTask, priority: v as Task["priority"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select
                  value={newTask.assigned_to}
                  onValueChange={(v) => setNewTask({ ...newTask, assigned_to: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.full_name || "Unnamed"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Task Type</Label>
                <Select
                  value={newTask.task_type}
                  onValueChange={(v) => setNewTask({ ...newTask, task_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link to AI System</Label>
              <Select
                value={newTask.ai_system_id}
                onValueChange={(v) => setNewTask({ ...newTask, ai_system_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {systems.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newTask.title.trim() || createTask.isPending}
            >
              {createTask.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTask.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
