import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Plus,
  Search,
  Building2,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  Mail,
  Calendar,
  Loader2,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useVendors, useCreateVendor, type VendorInsert } from "@/hooks/useVendors";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type DueDiligenceStatus = Database["public"]["Enums"]["due_diligence_status"];

const dueDiligenceConfig: Record<DueDiligenceStatus, { label: string; variant: "draft" | "pending" | "success" | "warning" }> = {
  not_started: { label: "Not Started", variant: "draft" },
  in_progress: { label: "In Progress", variant: "pending" },
  completed: { label: "Completed", variant: "success" },
  needs_review: { label: "Needs Review", variant: "warning" },
};

function useDeleteVendor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vendors").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor deleted");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete vendor", { description: error.message });
    },
  });
}

function useUpdateVendor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<VendorInsert>) => {
      const { data, error } = await supabase
        .from("vendors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update vendor", { description: error.message });
    },
  });
}

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newVendor, setNewVendor] = useState({
    name: "",
    website: "",
    contact_email: "",
    notes: "",
  });

  const { vendors, isLoading } = useVendors();
  const createVendor = useCreateVendor();
  const deleteVendor = useDeleteVendor();
  const updateVendor = useUpdateVendor();

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (vendor.website || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateVendor = async () => {
    if (!newVendor.name.trim()) {
      toast.error("Vendor name is required");
      return;
    }
    
    await createVendor.mutateAsync({
      name: newVendor.name,
      website: newVendor.website || null,
      contact_email: newVendor.contact_email || null,
      notes: newVendor.notes || null,
    });
    
    setNewVendor({ name: "", website: "", contact_email: "", notes: "" });
    setShowAddDialog(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteVendor.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (vendorId: string, status: DueDiligenceStatus) => {
    await updateVendor.mutateAsync({ id: vendorId, due_diligence_status: status });
  };

  // Calculate summary stats
  const totalVendors = vendors.length;
  const completedDueDiligence = vendors.filter(v => v.due_diligence_status === "completed").length;
  const pendingDueDiligence = vendors.filter(v => v.due_diligence_status === "in_progress" || v.due_diligence_status === "needs_review").length;

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
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Vendors</h1>
          <p className="text-sm text-muted-foreground">
            Manage AI system vendors and due diligence
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
              <DialogDescription>
                Add a new AI vendor to track due diligence
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Vendor Name *</Label>
                <Input
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  placeholder="e.g., OpenAI, Microsoft"
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={newVendor.website}
                  onChange={(e) => setNewVendor({ ...newVendor, website: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={newVendor.contact_email}
                  onChange={(e) => setNewVendor({ ...newVendor, contact_email: e.target.value })}
                  placeholder="contact@vendor.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={newVendor.notes}
                  onChange={(e) => setNewVendor({ ...newVendor, notes: e.target.value })}
                  placeholder="Any relevant notes..."
                />
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleCreateVendor} disabled={createVendor.isPending} className="w-full sm:w-auto">
                {createVendor.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Vendor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{totalVendors}</p>
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
              <p className="text-lg sm:text-2xl font-bold">{completedDueDiligence}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-warning/10 p-1.5 sm:p-2">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{pendingDueDiligence}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredVendors.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No vendors found" : "No vendors yet"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Add vendors that provide your AI systems to track due diligence"
              }
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Vendor
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="rounded-lg border bg-card p-3">
                <div className="flex items-start justify-between mb-2">
                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{vendor.name}</p>
                      {vendor.notes && (
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {vendor.notes}
                        </p>
                      )}
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/vendors/${vendor.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/vendors/${vendor.id}#edit`}>Edit Vendor</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(vendor.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center justify-between gap-2 pt-2 border-t">
                  <Select
                    value={vendor.due_diligence_status}
                    onValueChange={(v) => handleStatusChange(vendor.id, v as DueDiligenceStatus)}
                  >
                    <SelectTrigger className="w-[120px] h-7 text-xs">
                      <StatusBadge
                        variant={dueDiligenceConfig[vendor.due_diligence_status]?.variant || "draft"}
                        dot
                        className="text-xs"
                      >
                        {dueDiligenceConfig[vendor.due_diligence_status]?.label || vendor.due_diligence_status}
                      </StatusBadge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-2">
                    {vendor.website && (
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {vendor.contact_email && (
                      <a href={`mailto:${vendor.contact_email}`} className="text-primary p-1">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {vendor.contract_renewal_date && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(vendor.contract_renewal_date), "PP")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Due Diligence</TableHead>
                  <TableHead>Contract Renewal</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <Link
                        to={`/vendors/${vendor.id}`}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          {vendor.notes && (
                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                              {vendor.notes}
                            </p>
                          )}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {vendor.website ? (
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary flex items-center gap-1 hover:underline"
                        >
                          {vendor.website.replace(/^https?:\/\//, "").split("/")[0]}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {vendor.contact_email ? (
                        <a
                          href={`mailto:${vendor.contact_email}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="h-3 w-3" />
                          {vendor.contact_email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={vendor.due_diligence_status}
                        onValueChange={(v) => handleStatusChange(vendor.id, v as DueDiligenceStatus)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <StatusBadge
                            variant={dueDiligenceConfig[vendor.due_diligence_status]?.variant || "draft"}
                            dot
                          >
                            {dueDiligenceConfig[vendor.due_diligence_status]?.label || vendor.due_diligence_status}
                          </StatusBadge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="needs_review">Needs Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {vendor.contract_renewal_date ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(vendor.contract_renewal_date), "PP")}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
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
                            <Link to={`/vendors/${vendor.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/vendors/${vendor.id}#edit`}>Edit Vendor</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/vendors/${vendor.id}#documents`}>Upload Documents</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteId(vendor.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Vendor
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the vendor from your organization. AI systems linked to
              this vendor will have their vendor field cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteVendor.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
