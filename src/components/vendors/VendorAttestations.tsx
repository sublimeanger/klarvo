import { useState } from "react";
import {
  FileCheck,
  Plus,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useVendorAttestations,
  useCreateAttestation,
  useVerifyAttestation,
  useDeleteAttestation,
  ATTESTATION_TYPES,
} from "@/hooks/useVendorAttestations";

interface VendorAttestationsProps {
  vendorId: string;
  vendorName: string;
}

function getStatusBadge(status: string, validUntil: string | null) {
  const isExpired = validUntil && new Date(validUntil) < new Date();

  if (isExpired) {
    return { variant: "destructive" as const, label: "Expired", icon: AlertTriangle };
  }

  switch (status) {
    case "verified":
      return { variant: "success" as const, label: "Verified", icon: CheckCircle };
    case "pending":
      return { variant: "pending" as const, label: "Pending Review", icon: Clock };
    case "rejected":
      return { variant: "destructive" as const, label: "Rejected", icon: AlertTriangle };
    default:
      return { variant: "draft" as const, label: status, icon: Clock };
  }
}

function getTypeLabel(type: string) {
  return ATTESTATION_TYPES.find((t) => t.value === type)?.label || type;
}

export function VendorAttestations({ vendorId, vendorName }: VendorAttestationsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    attestation_type: "",
    title: "",
    description: "",
    document_url: "",
    valid_from: "",
    valid_until: "",
    notes: "",
  });

  const { data: attestations, isLoading } = useVendorAttestations(vendorId);
  const createAttestation = useCreateAttestation();
  const verifyAttestation = useVerifyAttestation();
  const deleteAttestation = useDeleteAttestation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attestation_type || !formData.title) return;

    await createAttestation.mutateAsync({
      vendor_id: vendorId,
      attestation_type: formData.attestation_type,
      title: formData.title,
      description: formData.description || undefined,
      document_url: formData.document_url || undefined,
      valid_from: formData.valid_from || undefined,
      valid_until: formData.valid_until || undefined,
      notes: formData.notes || undefined,
    });

    setFormData({
      attestation_type: "",
      title: "",
      description: "",
      document_url: "",
      valid_from: "",
      valid_until: "",
      notes: "",
    });
    setIsDialogOpen(false);
  };

  const stats = {
    total: attestations?.length || 0,
    verified: attestations?.filter((a) => a.status === "verified").length || 0,
    pending: attestations?.filter((a) => a.status === "pending").length || 0,
    expired: attestations?.filter(
      (a) => a.valid_until && new Date(a.valid_until) < new Date()
    ).length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Attestations & Documentation
            </CardTitle>
            <CardDescription>
              Track compliance statements, security certifications, and documentation from {vendorName}
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Attestation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add Attestation</DialogTitle>
                  <DialogDescription>
                    Record a compliance statement or documentation from this vendor
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.attestation_type}
                      onValueChange={(v) => setFormData({ ...formData, attestation_type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attestation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ATTESTATION_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., SOC 2 Type II Report 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the attestation"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Document URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.document_url}
                      onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="validFrom">Valid From</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={formData.valid_from}
                        onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={formData.valid_until}
                        onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Internal notes about this attestation"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formData.attestation_type || !formData.title || createAttestation.isPending}
                  >
                    {createAttestation.isPending ? "Adding..." : "Add Attestation"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-success/10">
            <p className="text-2xl font-bold text-success">{stats.verified}</p>
            <p className="text-xs text-muted-foreground">Verified</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10">
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <p className="text-2xl font-bold text-destructive">{stats.expired}</p>
            <p className="text-xs text-muted-foreground">Expired</p>
          </div>
        </div>

        {/* Attestation List */}
        {attestations && attestations.length > 0 ? (
          <div className="space-y-3">
            {attestations.map((attestation) => {
              const statusInfo = getStatusBadge(attestation.status, attestation.valid_until);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={attestation.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{attestation.title}</p>
                        <StatusBadge variant={statusInfo.variant} dot>
                          {statusInfo.label}
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {getTypeLabel(attestation.attestation_type)}
                      </p>
                      {attestation.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {attestation.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        {attestation.valid_from && (
                          <span>From: {new Date(attestation.valid_from).toLocaleDateString()}</span>
                        )}
                        {attestation.valid_until && (
                          <span>Until: {new Date(attestation.valid_until).toLocaleDateString()}</span>
                        )}
                        {attestation.verified_at && attestation.verifier && (
                          <span>
                            Verified by {attestation.verifier.full_name} on{" "}
                            {new Date(attestation.verified_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {attestation.document_url && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={attestation.document_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {attestation.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          verifyAttestation.mutate({ id: attestation.id, vendorId })
                        }
                        disabled={verifyAttestation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Attestation</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{attestation.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              deleteAttestation.mutate({ id: attestation.id, vendorId })
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium mb-1">No attestations yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start tracking compliance statements and security documentation from this vendor
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Attestation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
