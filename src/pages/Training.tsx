import { useState } from "react";
import { format } from "date-fns";
import {
  Plus,
  Search,
  GraduationCap,
  MoreHorizontal,
  Trash2,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useTrainingRecords,
  useCreateTrainingRecord,
  useUpdateTrainingStatus,
  useDeleteTrainingRecord,
  TRAINING_TYPES,
  type TrainingRecord,
} from "@/hooks/useTraining";
import { useOrgMembers } from "@/hooks/useOrgMembers";

const statusConfig: Record<string, { label: string; variant: "draft" | "pending" | "success" | "destructive" }> = {
  not_started: { label: "Not Started", variant: "draft" },
  in_progress: { label: "In Progress", variant: "pending" },
  completed: { label: "Completed", variant: "success" },
  expired: { label: "Expired", variant: "destructive" },
};

export default function Training() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newTraining, setNewTraining] = useState({
    user_id: "",
    training_type: "ai_basics",
    training_name: "",
    expires_at: "",
  });

  const { data: records = [], isLoading } = useTrainingRecords({ status: statusFilter });
  const { members } = useOrgMembers();
  const createRecord = useCreateTrainingRecord();
  const updateStatus = useUpdateTrainingStatus();
  const deleteRecord = useDeleteTrainingRecord();

  const filteredRecords = records.filter((record) =>
    (record.user?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.training_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newTraining.user_id || !newTraining.training_name.trim()) return;

    await createRecord.mutateAsync({
      user_id: newTraining.user_id,
      training_type: newTraining.training_type,
      training_name: newTraining.training_name,
      expires_at: newTraining.expires_at || undefined,
    });

    setNewTraining({ user_id: "", training_type: "ai_basics", training_name: "", expires_at: "" });
    setShowAddDialog(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteRecord.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  // Stats
  const totalRecords = records.length;
  const completedCount = records.filter((r) => r.status === "completed").length;
  const inProgressCount = records.filter((r) => r.status === "in_progress").length;
  const expiredCount = records.filter((r) => r.status === "expired").length;
  const completionRate = totalRecords > 0 ? Math.round((completedCount / totalRecords) * 100) : 0;

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
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">AI Literacy Training</h1>
          <p className="text-sm text-muted-foreground">
            Track staff training for Article 4 compliance
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Assign Training
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
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
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{totalRecords}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Assigned</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-success/10 p-1.5 sm:p-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{completedCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Completed</p>
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
            <div className="rounded-lg bg-destructive/10 p-1.5 sm:p-2">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{expiredCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Expired</p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Progress */}
      <Card className="rounded-xl">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium">Overall Completion Rate</span>
            <span className="text-xs sm:text-sm text-muted-foreground">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-1.5 sm:h-2" />
        </CardContent>
      </Card>

      {/* Training Records Table */}
      {filteredRecords.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || statusFilter !== "all" ? "No records found" : "No training assigned"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Assign AI literacy training to track staff competence"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Assign First Training
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{record.user?.full_name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground truncate">{record.training_name}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus.mutate({ id: record.id, status: "completed" })
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteId(record.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                        {TRAINING_TYPES.find((t) => t.value === record.training_type)?.label}
                      </span>
                      <StatusBadge variant={statusConfig[record.status]?.variant || "draft"} dot className="text-[10px] px-1.5 py-0.5">
                        {statusConfig[record.status]?.label}
                      </StatusBadge>
                    </div>
                    {record.completed_at && (
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Completed {format(new Date(record.completed_at), "PP")}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{record.user?.full_name || "Unknown"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.training_name}</TableCell>
                    <TableCell>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {TRAINING_TYPES.find((t) => t.value === record.training_type)?.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={record.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: record.id, status: v as TrainingRecord["status"] })
                        }
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <StatusBadge variant={statusConfig[record.status]?.variant || "draft"} dot>
                            {statusConfig[record.status]?.label}
                          </StatusBadge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {record.completed_at
                        ? format(new Date(record.completed_at), "PP")
                        : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus.mutate({ id: record.id, status: "completed" })
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteId(record.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Assign Training Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Assign Training</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Assign AI literacy training to a team member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Staff Member *</Label>
              <Select
                value={newTraining.user_id}
                onValueChange={(v) => setNewTraining({ ...newTraining, user_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.full_name || "Unnamed"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Training Type</Label>
              <Select
                value={newTraining.training_type}
                onValueChange={(v) => setNewTraining({ ...newTraining, training_type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRAINING_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div>
                        <div>{t.label}</div>
                        <div className="text-xs text-muted-foreground">{t.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Training Name *</Label>
              <Input
                value={newTraining.training_name}
                onChange={(e) => setNewTraining({ ...newTraining, training_name: e.target.value })}
                placeholder="e.g., EU AI Act Fundamentals"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Expiry Date</Label>
              <Input
                type="date"
                value={newTraining.expires_at}
                onChange={(e) => setNewTraining({ ...newTraining, expires_at: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for no expiration
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newTraining.user_id || !newTraining.training_name.trim() || createRecord.isPending}
              className="w-full sm:w-auto"
            >
              {createRecord.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assign Training
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">Delete Training Record?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              This will permanently delete this training record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteRecord.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
