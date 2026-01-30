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
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Literacy Training</h1>
          <p className="text-muted-foreground">
            Track staff training for EU AI Act Article 4 compliance
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Assign Training
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or training..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{totalRecords}</p>
              <p className="text-sm text-muted-foreground">Total Assigned</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <Clock className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{inProgressCount}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{expiredCount}</p>
              <p className="text-sm text-muted-foreground">Expired</p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Completion Rate</span>
            <span className="text-sm text-muted-foreground">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
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
        <div className="rounded-lg border bg-card">
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
      )}

      {/* Assign Training Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Training</DialogTitle>
            <DialogDescription>
              Assign AI literacy training to a team member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Staff Member *</Label>
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
              <Label>Training Type</Label>
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
              <Label>Training Name *</Label>
              <Input
                value={newTraining.training_name}
                onChange={(e) => setNewTraining({ ...newTraining, training_name: e.target.value })}
                placeholder="e.g., EU AI Act Fundamentals"
              />
            </div>

            <div className="space-y-2">
              <Label>Expiry Date</Label>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newTraining.user_id || !newTraining.training_name.trim() || createRecord.isPending}
            >
              {createRecord.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assign Training
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Training Record?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this training record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
