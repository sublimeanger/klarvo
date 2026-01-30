import { useState } from "react";
import { format } from "date-fns";
import {
  Plus,
  Search,
  AlertTriangle,
  MoreHorizontal,
  Trash2,
  Loader2,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  ShieldAlert,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useIncidents,
  useCreateIncident,
  useUpdateIncident,
  useDeleteIncident,
  SEVERITY_OPTIONS,
  STATUS_OPTIONS,
  AFFECTED_PARTIES_OPTIONS,
  type Incident,
} from "@/hooks/useIncidents";
import { useAISystems } from "@/hooks/useAISystems";

const severityConfig: Record<string, { variant: "draft" | "pending" | "warning" | "destructive" }> = {
  low: { variant: "draft" },
  medium: { variant: "pending" },
  high: { variant: "warning" },
  critical: { variant: "destructive" },
};

const statusConfig: Record<string, { variant: "draft" | "pending" | "success" | "warning" }> = {
  open: { variant: "destructive" as "warning" },
  investigating: { variant: "pending" },
  contained: { variant: "warning" },
  resolved: { variant: "success" },
  closed: { variant: "draft" },
};

export default function Incidents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewIncident, setViewIncident] = useState<Incident | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    ai_system_id: "",
    severity: "medium" as Incident["severity"],
    affected_parties: [] as string[],
    impact_description: "",
    occurred_at: "",
  });

  const { data: incidents = [], isLoading } = useIncidents({ status: statusFilter, severity: severityFilter });
  const { systems } = useAISystems();
  const createIncident = useCreateIncident();
  const updateIncident = useUpdateIncident();
  const deleteIncident = useDeleteIncident();

  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (incident.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newIncident.title.trim()) return;

    await createIncident.mutateAsync({
      title: newIncident.title,
      description: newIncident.description || undefined,
      ai_system_id: newIncident.ai_system_id || undefined,
      severity: newIncident.severity,
      affected_parties: newIncident.affected_parties.length > 0 ? newIncident.affected_parties : undefined,
      impact_description: newIncident.impact_description || undefined,
      occurred_at: newIncident.occurred_at || undefined,
    });

    setNewIncident({
      title: "",
      description: "",
      ai_system_id: "",
      severity: "medium",
      affected_parties: [],
      impact_description: "",
      occurred_at: "",
    });
    setShowAddDialog(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteIncident.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const toggleAffectedParty = (party: string) => {
    setNewIncident(prev => ({
      ...prev,
      affected_parties: prev.affected_parties.includes(party)
        ? prev.affected_parties.filter(p => p !== party)
        : [...prev.affected_parties, party]
    }));
  };

  // Stats
  const openCount = incidents.filter((i) => i.status === "open" || i.status === "investigating").length;
  const criticalCount = incidents.filter((i) => i.severity === "critical" && i.status !== "closed").length;
  const resolvedCount = incidents.filter((i) => i.status === "resolved" || i.status === "closed").length;

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
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage AI-related incidents
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="relative flex-1 min-w-[160px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[110px] sm:w-[150px] h-9 shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[100px] sm:w-[140px] h-9 shrink-0">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {SEVERITY_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{incidents.length}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-warning/10 p-1.5 sm:p-2">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{openCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Open</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-destructive/10 p-1.5 sm:p-2">
              <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{criticalCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Critical</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-success/10 p-1.5 sm:p-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{resolvedCount}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      {filteredIncidents.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || statusFilter !== "all" || severityFilter !== "all"
                ? "No incidents found"
                : "No incidents recorded"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery || statusFilter !== "all" || severityFilter !== "all"
                ? "Try adjusting your filters"
                : "Track AI-related incidents for compliance and continuous improvement"}
            </p>
            {!searchQuery && statusFilter === "all" && severityFilter === "all" && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Report First Incident
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge variant={severityConfig[incident.severity]?.variant || "draft"} className="text-[10px] px-1.5 py-0.5">
                        {SEVERITY_OPTIONS.find((s) => s.value === incident.severity)?.label}
                      </StatusBadge>
                      <StatusBadge variant={statusConfig[incident.status]?.variant || "draft"} dot className="text-[10px] px-1.5 py-0.5">
                        {STATUS_OPTIONS.find((s) => s.value === incident.status)?.label}
                      </StatusBadge>
                    </div>
                    <p className="font-medium text-sm truncate">{incident.title}</p>
                    {incident.ai_system?.name && (
                      <p className="text-xs text-primary truncate">{incident.ai_system.name}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {incident.detected_at
                        ? format(new Date(incident.detected_at), "PP")
                        : format(new Date(incident.created_at), "PP")}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setViewIncident(incident)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateIncident.mutate({ id: incident.id, status: "resolved" })
                        }
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(incident.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>AI System</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{incident.title}</p>
                        {incident.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                            {incident.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {incident.ai_system?.name || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge variant={severityConfig[incident.severity]?.variant || "draft"}>
                        {SEVERITY_OPTIONS.find((s) => s.value === incident.severity)?.label}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={incident.status}
                        onValueChange={(v) =>
                          updateIncident.mutate({ id: incident.id, status: v as Incident["status"] })
                        }
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <StatusBadge variant={statusConfig[incident.status]?.variant || "draft"} dot>
                            {STATUS_OPTIONS.find((s) => s.value === incident.status)?.label}
                          </StatusBadge>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {incident.detected_at
                        ? format(new Date(incident.detected_at), "PP")
                        : format(new Date(incident.created_at), "PP")}
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
                          <DropdownMenuItem onClick={() => setViewIncident(incident)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateIncident.mutate({ id: incident.id, status: "resolved" })
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteId(incident.id)}
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

      {/* Report Incident Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Report Incident</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Document an AI-related incident for tracking and response
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[55vh] overflow-y-auto">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Incident Title *</Label>
                <Input
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  placeholder="Brief description of the incident"
                />
              </div>
              <div className="space-y-2">
                <Label>Severity</Label>
                <Select
                  value={newIncident.severity}
                  onValueChange={(v) => setNewIncident({ ...newIncident, severity: v as Incident["severity"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newIncident.description}
                onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                placeholder="Detailed description of what happened"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Related AI System</Label>
                <Select
                  value={newIncident.ai_system_id}
                  onValueChange={(v) => setNewIncident({ ...newIncident, ai_system_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent>
                    {systems.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>When did it occur?</Label>
                <Input
                  type="datetime-local"
                  value={newIncident.occurred_at}
                  onChange={(e) => setNewIncident({ ...newIncident, occurred_at: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Affected Parties</Label>
              <div className="flex flex-wrap gap-2">
                {AFFECTED_PARTIES_OPTIONS.map((party) => (
                  <Button
                    key={party}
                    type="button"
                    variant={newIncident.affected_parties.includes(party) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAffectedParty(party)}
                  >
                    {party}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Impact Description</Label>
              <Textarea
                value={newIncident.impact_description}
                onChange={(e) => setNewIncident({ ...newIncident, impact_description: e.target.value })}
                placeholder="Describe the impact on affected parties"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newIncident.title.trim() || createIncident.isPending}
            >
              {createIncident.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Report Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Incident Dialog */}
      <Dialog open={!!viewIncident} onOpenChange={() => setViewIncident(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{viewIncident?.title}</DialogTitle>
          </DialogHeader>
          {viewIncident && (
            <div className="space-y-4 py-4">
              <div className="flex gap-4">
                <StatusBadge variant={severityConfig[viewIncident.severity]?.variant || "draft"}>
                  {SEVERITY_OPTIONS.find((s) => s.value === viewIncident.severity)?.label} Severity
                </StatusBadge>
                <StatusBadge variant={statusConfig[viewIncident.status]?.variant || "draft"} dot>
                  {STATUS_OPTIONS.find((s) => s.value === viewIncident.status)?.label}
                </StatusBadge>
              </div>

              {viewIncident.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1">{viewIncident.description}</p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">AI System</Label>
                  <p className="mt-1">{viewIncident.ai_system?.name || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Reported By</Label>
                  <p className="mt-1">{viewIncident.reporter?.full_name || "—"}</p>
                </div>
              </div>

              {viewIncident.affected_parties && viewIncident.affected_parties.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Affected Parties</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {viewIncident.affected_parties.map((p) => (
                      <span key={p} className="bg-muted px-2 py-1 rounded text-sm">{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {viewIncident.impact_description && (
                <div>
                  <Label className="text-muted-foreground">Impact</Label>
                  <p className="mt-1">{viewIncident.impact_description}</p>
                </div>
              )}

              {viewIncident.containment_actions && (
                <div>
                  <Label className="text-muted-foreground">Containment Actions</Label>
                  <p className="mt-1">{viewIncident.containment_actions}</p>
                </div>
              )}

              {viewIncident.resolution_notes && (
                <div>
                  <Label className="text-muted-foreground">Resolution Notes</Label>
                  <p className="mt-1">{viewIncident.resolution_notes}</p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3 pt-4 border-t">
                <div>
                  <Label className="text-muted-foreground">Occurred</Label>
                  <p className="mt-1 text-sm">
                    {viewIncident.occurred_at
                      ? format(new Date(viewIncident.occurred_at), "PPp")
                      : "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Detected</Label>
                  <p className="mt-1 text-sm">
                    {viewIncident.detected_at
                      ? format(new Date(viewIncident.detected_at), "PPp")
                      : "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Resolved</Label>
                  <p className="mt-1 text-sm">
                    {viewIncident.resolved_at
                      ? format(new Date(viewIncident.resolved_at), "PPp")
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewIncident(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Incident?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this incident record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteIncident.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
