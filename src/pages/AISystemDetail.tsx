import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  Cpu,
  Building2,
  User,
  Calendar,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldAlert,
  Eye,
  XCircle,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useAISystem, useUpdateAISystem, useDeleteAISystem } from "@/hooks/useAISystems";
import { useClassification } from "@/hooks/useClassification";
import { useVendors } from "@/hooks/useVendors";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import type { Database } from "@/integrations/supabase/types";

type LifecycleStatus = Database["public"]["Enums"]["lifecycle_status"];

const DEPARTMENTS = [
  "Customer Service",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT / Technology",
  "Legal",
  "Product",
  "Research & Development",
  "Other",
];

const lifecycleStatusConfig: Record<string, { label: string; variant: "draft" | "pending" | "success" | "warning"; icon: typeof Clock }> = {
  draft: { label: "Draft", variant: "draft", icon: Clock },
  pilot: { label: "Pilot", variant: "pending", icon: AlertTriangle },
  live: { label: "Live", variant: "success", icon: CheckCircle },
  retired: { label: "Retired", variant: "warning", icon: Clock },
  archived: { label: "Archived", variant: "draft", icon: Clock },
};

export default function AISystemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: system, isLoading, error } = useAISystem(id);
  const { data: classification } = useClassification(id);
  const { vendors } = useVendors();
  const { members } = useOrgMembers();
  const updateSystem = useUpdateAISystem();
  const deleteSystem = useDeleteAISystem();

  // Form state for editing
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    lifecycle_status: "draft" as LifecycleStatus,
    vendor_id: "",
    primary_owner_id: "",
    backup_owner_id: "",
    internal_reference_id: "",
  });

  // Initialize form when system loads
  const initializeForm = () => {
    if (system) {
      setFormData({
        name: system.name || "",
        description: system.description || "",
        department: system.department || "",
        lifecycle_status: system.lifecycle_status,
        vendor_id: system.vendor_id || "",
        primary_owner_id: system.primary_owner_id || "",
        backup_owner_id: system.backup_owner_id || "",
        internal_reference_id: system.internal_reference_id || "",
      });
    }
  };

  const handleEdit = () => {
    initializeForm();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!id) return;
    
    await updateSystem.mutateAsync({
      id,
      name: formData.name,
      description: formData.description || null,
      department: formData.department || null,
      lifecycle_status: formData.lifecycle_status,
      vendor_id: formData.vendor_id || null,
      primary_owner_id: formData.primary_owner_id || null,
      backup_owner_id: formData.backup_owner_id || null,
      internal_reference_id: formData.internal_reference_id || null,
    });
    
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteSystem.mutateAsync(id);
    navigate("/ai-systems");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !system) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/ai-systems")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to AI Systems
        </Button>
        <Card className="border-destructive">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">System Not Found</h2>
            <p className="text-muted-foreground">
              This AI system doesn't exist or you don't have access to it.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = lifecycleStatusConfig[system.lifecycle_status] || lifecycleStatusConfig.draft;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/ai-systems")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{system.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge variant={statusConfig.variant} dot>
                  {statusConfig.label}
                </StatusBadge>
                {system.internal_reference_id && (
                  <span className="text-sm text-muted-foreground">
                    ID: {system.internal_reference_id}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={updateSystem.isPending}>
                {updateSystem.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Core details about this AI system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label>System Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(v) => setFormData({ ...formData, department: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.lifecycle_status}
                        onValueChange={(v) => setFormData({ ...formData, lifecycle_status: v as LifecycleStatus })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pilot">Pilot</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Internal Reference ID</Label>
                    <Input
                      value={formData.internal_reference_id}
                      onChange={(e) => setFormData({ ...formData, internal_reference_id: e.target.value })}
                      placeholder="e.g., AI-001"
                    />
                  </div>
                </>
              ) : (
                <>
                  {system.description && (
                    <div>
                      <Label className="text-muted-foreground">Description</Label>
                      <p className="mt-1">{system.description}</p>
                    </div>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-muted-foreground">Department</Label>
                      <p className="mt-1">{system.department || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <div className="mt-1">
                        <StatusBadge variant={statusConfig.variant} dot>
                          {statusConfig.label}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Vendor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Vendor / Provider
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <Select
                    value={formData.vendor_id}
                    onValueChange={(v) => setFormData({ ...formData, vendor_id: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None / Internal</SelectItem>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : system.vendors ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{system.vendors.name}</p>
                    {system.vendors.website && (
                      <a
                        href={system.vendors.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center gap-1 hover:underline"
                      >
                        {system.vendors.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/vendors">View Vendor</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Built internally or vendor not specified</p>
              )}
            </CardContent>
          </Card>

          {/* Classification Status */}
          <Card className={classification?.risk_level && classification.risk_level !== "not_classified" ? "" : "border-dashed"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {classification?.risk_level === "prohibited" && <XCircle className="h-5 w-5 text-risk-prohibited" />}
                {classification?.risk_level === "high_risk" && <AlertTriangle className="h-5 w-5 text-risk-high" />}
                {classification?.risk_level === "limited_risk" && <Eye className="h-5 w-5 text-risk-limited" />}
                {classification?.risk_level === "minimal_risk" && <CheckCircle className="h-5 w-5 text-risk-minimal" />}
                {(!classification?.risk_level || classification.risk_level === "not_classified") && <Scale className="h-5 w-5 text-warning" />}
                Classification Status
              </CardTitle>
              <CardDescription>
                EU AI Act risk classification and obligations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {classification && classification.risk_level !== "not_classified" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <StatusBadge 
                        variant={
                          classification.risk_level === "prohibited" ? "prohibited" :
                          classification.risk_level === "high_risk" ? "high" :
                          classification.risk_level === "limited_risk" ? "limited" :
                          "minimal"
                        } 
                        dot
                      >
                        {classification.risk_level === "prohibited" ? "Prohibited" :
                         classification.risk_level === "high_risk" ? "High-Risk" :
                         classification.risk_level === "limited_risk" ? "Limited Risk" :
                         "Minimal Risk"}
                      </StatusBadge>
                      {classification.classified_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Classified on {format(new Date(classification.classified_at), "PP")}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/ai-systems/${id}/classify`}>Re-classify</Link>
                    </Button>
                  </div>
                  
                  {/* Summary indicators */}
                  <div className="grid gap-2 text-sm">
                    {classification.has_prohibited_indicators && (
                      <div className="flex items-center gap-2 text-risk-prohibited">
                        <ShieldAlert className="h-4 w-4" />
                        Prohibited practice indicators found
                      </div>
                    )}
                    {classification.is_high_risk_candidate && classification.high_risk_categories && (
                      <div className="flex items-center gap-2 text-risk-high">
                        <AlertTriangle className="h-4 w-4" />
                        High-risk: {classification.high_risk_categories.join(", ")}
                      </div>
                    )}
                    {classification.has_transparency_obligations && (
                      <div className="flex items-center gap-2 text-risk-limited">
                        <Eye className="h-4 w-4" />
                        Transparency obligations apply
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <StatusBadge variant="pending" dot>Not Classified</StatusBadge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Run the classification wizard to determine risk level and applicable obligations
                    </p>
                  </div>
                  <Button asChild>
                    <Link to={`/ai-systems/${id}/classify`}>Start Classification</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ownership */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Ownership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label>Primary Owner</Label>
                    <Select
                      value={formData.primary_owner_id}
                      onValueChange={(v) => setFormData({ ...formData, primary_owner_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.full_name || "Unnamed User"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Backup Owner</Label>
                    <Select
                      value={formData.backup_owner_id}
                      onValueChange={(v) => setFormData({ ...formData, backup_owner_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select backup" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.full_name || "Unnamed User"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-muted-foreground">Primary Owner</Label>
                    <p className="mt-1 font-medium">
                      {system.primary_owner?.full_name || "Unassigned"}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-muted-foreground">Backup Owner</Label>
                    <p className="mt-1">
                      {system.backup_owner?.full_name || "Not assigned"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="mt-1">
                  {format(new Date(system.created_at), "PPP")}
                </p>
              </div>
              <Separator />
              <div>
                <Label className="text-muted-foreground">Last Updated</Label>
                <p className="mt-1">
                  {format(new Date(system.updated_at), "PPP 'at' p")}
                </p>
              </div>
              {system.created_by_profile && (
                <>
                  <Separator />
                  <div>
                    <Label className="text-muted-foreground">Created By</Label>
                    <p className="mt-1">{system.created_by_profile.full_name}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{system.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this AI system
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
    </div>
  );
}
