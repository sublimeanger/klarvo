import { useState } from "react";
import { format } from "date-fns";
import {
  Plus,
  Search,
  FileText,
  MoreHorizontal,
  Trash2,
  Loader2,
  CheckCircle,
  Edit,
  Copy,
  Filter,
  History,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  usePolicies,
  useCreatePolicy,
  useUpdatePolicyWithVersion,
  useApprovePolicy,
  useDeletePolicy,
  POLICY_TYPES,
  type Policy,
} from "@/hooks/usePolicies";
import { PolicyVersionHistory } from "@/components/policies/PolicyVersionHistory";
import { PolicyTemplateLibrary } from "@/components/policies/PolicyTemplateLibrary";

const statusConfig: Record<string, { label: string; variant: "draft" | "pending" | "success" | "warning" }> = {
  draft: { label: "Draft", variant: "draft" },
  review: { label: "In Review", variant: "pending" },
  approved: { label: "Approved", variant: "success" },
  archived: { label: "Archived", variant: "warning" },
};

export default function Policies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    description: "",
    policy_type: "acceptable_use",
    content: "",
  });

  const [viewHistoryPolicy, setViewHistoryPolicy] = useState<Policy | null>(null);

  const { data: policies = [], isLoading } = usePolicies({ status: statusFilter, type: typeFilter });
  const createPolicy = useCreatePolicy();
  const updatePolicyWithVersion = useUpdatePolicyWithVersion();
  const approvePolicy = useApprovePolicy();
  const deletePolicy = useDeletePolicy();

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (policy.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newPolicy.name.trim()) return;

    await createPolicy.mutateAsync({
      name: newPolicy.name,
      description: newPolicy.description || undefined,
      policy_type: newPolicy.policy_type,
      content: newPolicy.content || undefined,
    });

    setNewPolicy({ name: "", description: "", policy_type: "acceptable_use", content: "" });
    setShowAddDialog(false);
  };

  const handleUpdate = async () => {
    if (!editPolicy) return;

    // Get original policy to compare
    const originalPolicy = policies.find(p => p.id === editPolicy.id);
    if (!originalPolicy) return;

    await updatePolicyWithVersion.mutateAsync({
      id: editPolicy.id,
      currentPolicy: originalPolicy,
      updates: {
        name: editPolicy.name,
        description: editPolicy.description || undefined,
        content: editPolicy.content || undefined,
        status: editPolicy.status,
      },
      changeSummary: "Manual edit",
    });

    setEditPolicy(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deletePolicy.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  // Stats
  const draftCount = policies.filter((p) => p.status === "draft").length;
  const reviewCount = policies.filter((p) => p.status === "review").length;
  const approvedCount = policies.filter((p) => p.status === "approved").length;

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
          <h1 className="text-2xl font-semibold tracking-tight">Policies & Templates</h1>
          <p className="text-muted-foreground">
            Manage AI governance policies and documentation templates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTemplateLibrary(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Template Library
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Policy
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {POLICY_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{draftCount}</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <Edit className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{reviewCount}</p>
              <p className="text-sm text-muted-foreground">In Review</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policies List */}
      {filteredPolicies.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "No policies found"
                : "No policies yet"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your filters"
                : "Create policies to document your AI governance practices"}
            </p>
            {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Policy
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{policy.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {POLICY_TYPES.find((t) => t.value === policy.policy_type)?.label}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setEditPolicy(policy)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {policy.status !== "approved" && (
                        <DropdownMenuItem onClick={() => approvePolicy.mutate(policy.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => setViewHistoryPolicy(policy)}>
                        <History className="mr-2 h-4 w-4" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(policy.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {policy.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {policy.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <StatusBadge variant={statusConfig[policy.status]?.variant || "draft"} dot>
                    {statusConfig[policy.status]?.label}
                  </StatusBadge>
                  <span className="text-xs text-muted-foreground">
                    v{policy.version} · {format(new Date(policy.updated_at), "PP")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Policy Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Policy</DialogTitle>
            <DialogDescription>
              Create a new policy or governance document
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Policy Name *</Label>
                <Input
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  placeholder="e.g., AI Acceptable Use Policy"
                />
              </div>
              <div className="space-y-2">
                <Label>Policy Type</Label>
                <Select
                  value={newPolicy.policy_type}
                  onValueChange={(v) => setNewPolicy({ ...newPolicy, policy_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POLICY_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newPolicy.description}
                onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                placeholder="Brief description of this policy"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={newPolicy.content}
                onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                placeholder="Policy content (Markdown supported)"
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newPolicy.name.trim() || createPolicy.isPending}
            >
              {createPolicy.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Policy Dialog */}
      <Dialog open={!!editPolicy} onOpenChange={() => setEditPolicy(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Policy</DialogTitle>
          </DialogHeader>
          {editPolicy && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Policy Name</Label>
                  <Input
                    value={editPolicy.name}
                    onChange={(e) => setEditPolicy({ ...editPolicy, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editPolicy.status}
                    onValueChange={(v) => setEditPolicy({ ...editPolicy, status: v as Policy["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={editPolicy.description || ""}
                  onChange={(e) => setEditPolicy({ ...editPolicy, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={editPolicy.content || ""}
                  onChange={(e) => setEditPolicy({ ...editPolicy, content: e.target.value })}
                  rows={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPolicy(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={updatePolicyWithVersion.isPending}>
              {updatePolicyWithVersion.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog open={!!viewHistoryPolicy} onOpenChange={() => setViewHistoryPolicy(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Version History
            </DialogTitle>
            <DialogDescription>
              {viewHistoryPolicy?.name} — View and restore previous versions
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4">
            {viewHistoryPolicy && <PolicyVersionHistory policy={viewHistoryPolicy} />}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Policy?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this policy document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePolicy.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Template Library */}
      <PolicyTemplateLibrary
        open={showTemplateLibrary}
        onOpenChange={setShowTemplateLibrary}
      />
    </div>
  );
}
