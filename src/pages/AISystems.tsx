import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Cpu,
  Building2,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowUpDown,
  Loader2,
  Trash2,
  GitCompare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useAISystems, useDeleteAISystem } from "@/hooks/useAISystems";
import { AISystemComparisonDialog } from "@/components/ai-systems/AISystemComparisonDialog";

const lifecycleStatusConfig: Record<string, { label: string; variant: "draft" | "pending" | "success" | "warning" }> = {
  draft: { label: "Draft", variant: "draft" },
  pilot: { label: "Pilot", variant: "pending" },
  live: { label: "Live", variant: "success" },
  retired: { label: "Retired", variant: "warning" },
  archived: { label: "Archived", variant: "draft" },
};

export default function AISystems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const { systems, isLoading } = useAISystems();
  const deleteSystem = useDeleteAISystem();
  
  const filteredSystems = systems.filter(system =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (system.vendors?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (system.department || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteSystem.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  // Calculate summary stats
  const totalSystems = systems.length;
  const liveSystems = systems.filter(s => s.lifecycle_status === "live" || s.lifecycle_status === "pilot").length;
  const draftSystems = systems.filter(s => s.lifecycle_status === "draft").length;
  const retiredSystems = systems.filter(s => s.lifecycle_status === "retired" || s.lifecycle_status === "archived").length;

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
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">AI Systems</h1>
          <p className="text-sm text-muted-foreground">
            Inventory and manage your AI systems
          </p>
        </div>
        <div className="flex items-center gap-2">
          {systems.length >= 2 && (
            <Button variant="outline" size="sm" onClick={() => setCompareOpen(true)} className="hidden sm:flex">
              <GitCompare className="mr-2 h-4 w-4" />
              Compare
            </Button>
          )}
          <Button asChild size="sm" className="flex-1 sm:flex-initial">
            <Link to="/ai-systems/new">
              <Plus className="mr-2 h-4 w-4" />
              Add AI System
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters - Scrollable on mobile */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Button variant="outline" size="sm" className="shrink-0 h-9">
          <Filter className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
        <Button variant="outline" size="sm" className="shrink-0 h-9">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Sort</span>
        </Button>
      </div>

      {/* Summary Cards - 2x2 grid on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{totalSystems}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-success/10 p-1.5 sm:p-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{liveSystems}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Live</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-warning/10 p-1.5 sm:p-2">
              <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{draftSystems}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Draft</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-muted p-1.5 sm:p-2">
              <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{retiredSystems}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Retired</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View / Desktop Table */}
      {filteredSystems.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-8 sm:p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            {searchQuery ? "No systems found" : "No AI systems yet"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
            {searchQuery 
              ? "Try adjusting your search terms" 
              : "Start by adding the AI systems your organization uses"
            }
          </p>
          {!searchQuery && (
            <Button asChild size="sm">
              <Link to="/ai-systems/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First AI System
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-3 sm:hidden">
            {filteredSystems.map((system) => (
              <Link
                key={system.id}
                to={`/ai-systems/${system.id}`}
                className="block rounded-xl border bg-card p-4 transition-all hover:shadow-md active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate">{system.name}</p>
                      <StatusBadge 
                        variant={lifecycleStatusConfig[system.lifecycle_status]?.variant || "draft"} 
                        className="shrink-0"
                      >
                        {lifecycleStatusConfig[system.lifecycle_status]?.label || system.lifecycle_status}
                      </StatusBadge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {system.vendors?.name || system.department || "No vendor"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Owner: {system.primary_owner?.full_name || "Unassigned"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>System Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {filteredSystems.map((system) => (
                <TableRow key={system.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link 
                      to={`/ai-systems/${system.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Cpu className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{system.name}</p>
                        {system.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                            {system.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {system.vendors ? (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {system.vendors.name}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {system.department || <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    <StatusBadge 
                      variant={lifecycleStatusConfig[system.lifecycle_status]?.variant || "draft"} 
                      dot
                    >
                      {lifecycleStatusConfig[system.lifecycle_status]?.label || system.lifecycle_status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {system.primary_owner?.full_name || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
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
                        <DropdownMenuItem asChild>
                          <Link to={`/ai-systems/${system.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/ai-systems/${system.id}/classify`}>Start Classification</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDeleteId(system.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete System
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete AI System?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the AI system
              and all associated data including classifications and evidence.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSystem.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Comparison Dialog */}
      <AISystemComparisonDialog
        open={compareOpen}
        onOpenChange={setCompareOpen}
        systems={systems}
      />
    </div>
  );
}
