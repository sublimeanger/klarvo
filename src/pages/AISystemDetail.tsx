import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
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
  Shield,
  Download,
  FileText,
  History,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAISystem, useUpdateAISystem, useDeleteAISystem } from "@/hooks/useAISystems";
import { useClassification } from "@/hooks/useClassification";
import { useFRIA } from "@/hooks/useFRIA";
import { AISystemControls } from "@/components/ai-systems/AISystemControls";
import { ReassessmentAlert } from "@/components/ai-systems/ReassessmentAlert";
import { GapChecklist } from "@/components/ai-systems/GapChecklist";
import { ClassificationHistoryPanel } from "@/components/ai-systems/ClassificationHistoryPanel";
import { SupplyChainTabs } from "@/components/ai-systems/SupplyChainTabs";
import { SubstantialModificationAlert } from "@/components/provider/SubstantialModificationAlert";
import { ModificationHistoryPanel } from "@/components/provider/ModificationHistoryPanel";
import { ActivityFeed } from "@/components/audit/ActivityFeed";
import { useVendors } from "@/hooks/useVendors";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import { detectMaterialChanges, useTriggerReassessment } from "@/hooks/useReassessment";
import { useEntityAuditLogs, useLogAction } from "@/hooks/useAuditLog";
import { useOrganization } from "@/hooks/useOrganization";
import { useAuth } from "@/contexts/AuthContext";
import { ClassificationMemoPDF } from "@/components/exports/ClassificationMemoPDF";
import { AISystemPDF } from "@/components/exports/AISystemPDF";
import { FRIAReportPDF } from "@/components/exports/FRIAReportPDF";
import { toast } from "sonner";
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
  const [isExporting, setIsExporting] = useState(false);

  const { data: system, isLoading, error } = useAISystem(id);
  const { data: classification } = useClassification(id);
  const { data: fria } = useFRIA(id);
  const { vendors } = useVendors();
  const { members } = useOrgMembers();
  const updateSystem = useUpdateAISystem();
  const deleteSystem = useDeleteAISystem();
  const triggerReassessment = useTriggerReassessment();
  const logAction = useLogAction();
  const { data: activityLogs = [], isLoading: isLoadingActivity } = useEntityAuditLogs("ai_system", id);
  const { data: organization } = useOrganization();
  const { profile, user } = useAuth();

  // Get reviewer name for the classification memo
  const getReviewerName = () => {
    if (!system?.signoff_reviewer_id) return undefined;
    const reviewer = members.find(m => m.id === system.signoff_reviewer_id);
    return reviewer?.full_name || undefined;
  };

  // Get FRIA owner and approver names
  const getFRIAOwnerName = () => {
    if (!fria?.assessment_owner_id) return undefined;
    const owner = members.find(m => m.id === fria.assessment_owner_id);
    return owner?.full_name || undefined;
  };

  const getFRIAApproverName = () => {
    if (!fria?.approved_by) return undefined;
    const approver = members.find(m => m.id === fria.approved_by);
    return approver?.full_name || undefined;
  };

  // Export Classification Memo PDF
  const handleExportMemo = async () => {
    if (!system || !organization) return;
    
    setIsExporting(true);
    try {
      const blob = await pdf(
        <ClassificationMemoPDF
          system={system as any}
          classification={classification as any}
          organization={{ name: organization.name }}
          generatedBy={profile?.full_name || user?.email || "Unknown"}
          reviewerName={getReviewerName()}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Classification_Memo.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Classification Memo exported successfully");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export Classification Memo");
    } finally {
      setIsExporting(false);
    }
  };

  // Export Evidence Pack PDF
  const handleExportEvidencePack = async () => {
    if (!system || !organization) return;
    
    setIsExporting(true);
    try {
      const blob = await pdf(
        <AISystemPDF
          system={{
            ...system,
            classification: classification as any,
          } as any}
          organization={{ name: organization.name }}
          generatedBy={profile?.full_name || user?.email || "Unknown"}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Evidence_Pack.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Evidence Pack exported successfully");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export Evidence Pack");
    } finally {
      setIsExporting(false);
    }
  };

  // Export FRIA Report PDF
  const handleExportFRIA = async () => {
    if (!system || !organization || !fria) return;
    
    setIsExporting(true);
    try {
      const blob = await pdf(
        <FRIAReportPDF
          fria={fria}
          systemName={system.name}
          organizationName={organization.name}
          ownerName={getFRIAOwnerName()}
          approverName={getFRIAApproverName()}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${system.name.replace(/[^a-z0-9]/gi, "_")}_FRIA_Report.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("FRIA Report exported successfully");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export FRIA Report");
    } finally {
      setIsExporting(false);
    }
  };

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
    if (!id || !system) return;
    
    // Detect material changes before saving
    const oldData = {
      vendor_id: system.vendor_id,
      lifecycle_status: system.lifecycle_status,
    };
    const newData = {
      vendor_id: formData.vendor_id || null,
      lifecycle_status: formData.lifecycle_status,
    };
    
    const materialChanges = detectMaterialChanges(oldData, newData);
    
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
    
    // If material changes detected and system is classified, trigger reassessment
    if (materialChanges.length > 0 && classification && classification.risk_level !== "not_classified") {
      const reasons = materialChanges.map(c => c.reason).join("; ");
      await triggerReassessment.mutateAsync({
        classificationId: classification.id,
        reason: reasons,
      });
    }
    
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
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/ai-systems")} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-semibold tracking-tight truncate">{system.name}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <StatusBadge variant={statusConfig.variant} dot>
                  {statusConfig.label}
                </StatusBadge>
                {system.internal_reference_id && (
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    ID: {system.internal_reference_id}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} size="sm">
                <X className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
              <Button onClick={handleSave} disabled={updateSystem.isPending} size="sm">
                {updateSystem.isPending ? (
                  <Loader2 className="mr-1 sm:mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1 sm:mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEdit} size="sm">
                <Edit2 className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteDialog(true)} size="sm">
                <Trash2 className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reassessment Alert */}
          {classification && (classification as any).reassessment_needed && (
            <ReassessmentAlert
              classificationId={classification.id}
              aiSystemId={id!}
              reason={(classification as any).reassessment_reason}
              triggeredAt={(classification as any).reassessment_triggered_at}
            />
          )}
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
                    value={formData.vendor_id || "__none__"}
                    onValueChange={(v) => setFormData({ ...formData, vendor_id: v === "__none__" ? "" : v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None / Internal</SelectItem>
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

          {/* FRIA Section - Only show for high-risk systems */}
          {classification?.is_high_risk_candidate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Fundamental Rights Impact Assessment
                </CardTitle>
                <CardDescription>
                  Article 27 requirement for high-risk AI systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fria ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{fria.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: {fria.status === "completed" ? "Completed" : fria.status === "in_progress" ? "In Progress" : "Draft"}
                        </p>
                      </div>
                      <StatusBadge
                        variant={fria.status === "completed" ? "success" : fria.status === "in_progress" ? "pending" : "draft"}
                        dot
                      >
                        {fria.status === "completed" ? "Completed" : fria.status === "in_progress" ? "In Progress" : "Draft"}
                      </StatusBadge>
                    </div>
                    {fria.final_conclusion && (
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          <span className="font-medium">Conclusion: </span>
                          {fria.final_conclusion === "approve" && "Approved for deployment"}
                          {fria.final_conclusion === "approve_with_mitigations" && "Approved with mitigations"}
                          {fria.final_conclusion === "do_not_deploy" && "Do not deploy"}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/ai-systems/${id}/fria`}>
                        {fria.status === "completed" ? "View FRIA" : "Continue FRIA"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        As a high-risk AI system, a FRIA is required before deployment.
                      </p>
                    </div>
                    <Button asChild>
                      <Link to={`/ai-systems/${id}/fria`}>Start FRIA</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Substantial Modification Alert - Article 25 */}
          <SubstantialModificationAlert 
            aiSystemId={id!} 
            showFullDetails 
          />

          {/* Modification History Panel - Article 25 */}
          <ModificationHistoryPanel aiSystemId={id!} />

          {/* Controls Section */}
          <AISystemControls
            aiSystemId={id!}
            riskLevel={classification?.risk_level}
            hasVendor={!!system.vendor_id}
            isClassified={!!classification && classification.risk_level !== "not_classified"}
          />

          {/* Gap Checklist */}
          <GapChecklist aiSystemId={id!} />

          {/* Supply Chain Tabs - conditional based on value chain role */}
          <SupplyChainTabs 
            aiSystemId={id!} 
            valueChainRole={system.value_chain_role}
          />
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
                      value={formData.primary_owner_id || "__none__"}
                      onValueChange={(v) => setFormData({ ...formData, primary_owner_id: v === "__none__" ? "" : v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">Unassigned</SelectItem>
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
                      value={formData.backup_owner_id || "__none__"}
                      onValueChange={(v) => setFormData({ ...formData, backup_owner_id: v === "__none__" ? "" : v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select backup" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
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

          {/* Classification History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Classification History
              </CardTitle>
              <CardDescription>
                Audit trail of all classification changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClassificationHistoryPanel aiSystemId={id!} />
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export
              </CardTitle>
              <CardDescription>
                Generate audit-ready documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleExportMemo}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Classification Memo
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleExportEvidencePack}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Evidence Pack (PDF)
              </Button>
              {fria && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleExportFRIA}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Scale className="mr-2 h-4 w-4" />
                  )}
                  FRIA Report (PDF)
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <ActivityFeed
            entries={activityLogs}
            isLoading={isLoadingActivity}
            title="Activity"
            description="Recent changes to this system"
            showEntity={false}
            maxHeight="300px"
            emptyMessage="No activity recorded yet"
          />
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
