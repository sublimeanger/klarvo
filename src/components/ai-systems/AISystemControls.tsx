import { useState, useMemo } from "react";
import {
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Play,
  Loader2,
  FileCheck,
  CheckSquare,
  Square,
  X,
  BookOpen,
  ClipboardCheck,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAISystemControls,
  useApplicableControls,
  useInitializeControls,
  useUpdateControlStatus,
  useBulkUpdateControlStatus,
  type ControlImplementation,
} from "@/hooks/useControls";
import { useControlsEvidenceCounts } from "@/hooks/useControlEvidence";
import { ControlEvidenceSection } from "@/components/controls/ControlEvidenceSection";
import { NAJustificationDialog } from "@/components/controls/NAJustificationDialog";

interface AISystemControlsProps {
  aiSystemId: string;
  riskLevel: string | undefined;
  hasVendor: boolean;
  isClassified: boolean;
}

interface ControlCardProps {
  implementation: ControlImplementation;
  aiSystemId: string;
  evidenceCount: number;
  onStatusChange: (id: string, status: string) => void;
  isSelectionMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; variant: "draft" | "pending" | "success" | "warning"; icon: typeof Clock }> = {
  not_started: { label: "Not Started", variant: "draft", icon: Clock },
  in_progress: { label: "In Progress", variant: "pending", icon: Play },
  implemented: { label: "Implemented", variant: "success", icon: CheckCircle },
  not_applicable: { label: "N/A", variant: "draft", icon: AlertTriangle },
};

const CATEGORY_LABELS: Record<string, string> = {
  GOV: "Governance & Accountability",
  CLS: "Classification & Scoping",
  TRN: "Transparency & Disclosure",
  DEP: "High-Risk Deployer Obligations",
  LOG: "Record-Keeping & Logging",
  DATA: "Data Governance & Privacy",
  VEN: "Vendor & Supply Chain",
  LIT: "AI Literacy & Training",
  MON: "Monitoring & Incidents",
};

function ControlCard({ 
  implementation, 
  aiSystemId,
  evidenceCount,
  onStatusChange,
  isSelectionMode,
  isSelected,
  onToggleSelect,
}: ControlCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const control = implementation.control;
  if (!control) return null;

  const statusConfig = STATUS_CONFIG[implementation.status] || STATUS_CONFIG.not_started;
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`rounded-lg border bg-card ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <div 
        className="flex items-start justify-between p-2 sm:p-3 hover:bg-muted/30 transition-colors cursor-pointer"
        onClick={() => isSelectionMode ? onToggleSelect(implementation.id) : setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          {isSelectionMode && (
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggleSelect(implementation.id)}
                className="mt-1"
              />
            </div>
          )}
          <div className={`p-1 sm:p-1.5 rounded-md shrink-0 ${
            implementation.status === "implemented" ? "bg-success/10 text-success" :
            implementation.status === "in_progress" ? "bg-warning/10 text-warning" :
            "bg-muted text-muted-foreground"
          }`}>
            <StatusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">{control.code}</span>
              <span className="font-medium text-xs sm:text-sm leading-tight">{control.name}</span>
              {evidenceCount > 0 && (
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  <FileCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  {evidenceCount}
                </Badge>
              )}
            </div>
            {control.description && (
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 line-clamp-2">
                {control.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          {!isSelectionMode && (
            <Select
              value={implementation.status}
              onValueChange={(value) => onStatusChange(implementation.id, value)}
            >
              <SelectTrigger className="w-[100px] sm:w-[140px] h-7 sm:h-8 text-[10px] sm:text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="implemented">Implemented</SelectItem>
                <SelectItem value="not_applicable">N/A</SelectItem>
              </SelectContent>
            </Select>
          )}
          {!isSelectionMode && (
            isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            )
          )}
        </div>
      </div>
      {isExpanded && !isSelectionMode && (
        <div className="px-3 pb-3 pt-1 border-t space-y-3">
          {/* Acceptance Criteria Section */}
          {control.acceptance_criteria && (
            <div className="rounded-lg bg-muted/30 p-2.5 sm:p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <ClipboardCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] sm:text-xs font-medium text-primary">Acceptance Criteria</span>
                {control.article_reference && (
                  <Badge variant="outline" className="ml-auto text-[9px] sm:text-[10px]">
                    {control.article_reference}
                  </Badge>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                {control.acceptance_criteria}
              </p>
            </div>
          )}
          
          {/* Evidence Requirements (if no acceptance criteria but has evidence requirements) */}
          {!control.acceptance_criteria && control.evidence_requirements && (
            <div className="rounded-lg bg-muted/30 p-2.5 sm:p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] sm:text-xs font-medium">Evidence Required</span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                {control.evidence_requirements}
              </p>
            </div>
          )}

          {/* N/A Justification Display (if marked as N/A) */}
          {implementation.status === "not_applicable" && implementation.na_justification && (
            <div className="rounded-lg bg-warning/10 border border-warning/20 p-2.5 sm:p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span className="text-[10px] sm:text-xs font-medium text-warning">N/A Justification</span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                {implementation.na_justification}
              </p>
            </div>
          )}
          
          <ControlEvidenceSection
            controlImplementationId={implementation.id}
            aiSystemId={aiSystemId}
            controlName={control.name}
          />
        </div>
      )}
    </div>
  );
}

function CategorySection({ 
  category, 
  controls,
  aiSystemId,
  evidenceCounts,
  onStatusChange,
  isSelectionMode,
  selectedIds,
  onToggleSelect,
  onSelectAllInCategory,
}: { 
  category: string;
  controls: ControlImplementation[];
  aiSystemId: string;
  evidenceCounts: Record<string, number>;
  onStatusChange: (id: string, status: string) => void;
  isSelectionMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAllInCategory: (ids: string[], select: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  
  const implemented = controls.filter(c => c.status === "implemented").length;
  const total = controls.filter(c => c.status !== "not_applicable").length;
  const progress = total > 0 ? (implemented / total) * 100 : 0;
  
  const categoryControlIds = controls.map(c => c.id);
  const selectedInCategory = categoryControlIds.filter(id => selectedIds.has(id)).length;
  const allSelected = selectedInCategory === controls.length && controls.length > 0;
  const someSelected = selectedInCategory > 0 && selectedInCategory < controls.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {isSelectionMode && (
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={allSelected}
                ref={(el) => {
                  if (el) (el as unknown as HTMLInputElement).indeterminate = someSelected;
                }}
                onCheckedChange={(checked) => {
                  onSelectAllInCategory(categoryControlIds, checked === true);
                }}
              />
            </div>
          )}
          {isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
          )}
          <div className="text-left min-w-0">
            <p className="font-medium text-xs sm:text-sm truncate">{CATEGORY_LABELS[category] || category}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {implemented}/{total} implemented
              {isSelectionMode && selectedInCategory > 0 && (
                <span className="ml-1 sm:ml-2 text-primary">({selectedInCategory} selected)</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-20 sm:w-32 shrink-0">
          <Progress value={progress} className="h-1.5 sm:h-2" />
          <span className="text-[10px] sm:text-xs text-muted-foreground w-8 sm:w-10 text-right">
            {Math.round(progress)}%
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pl-4 pt-2">
        {controls.map((implementation) => (
          <ControlCard
            key={implementation.id}
            implementation={implementation}
            aiSystemId={aiSystemId}
            evidenceCount={evidenceCounts[implementation.id] || 0}
            onStatusChange={onStatusChange}
            isSelectionMode={isSelectionMode}
            isSelected={selectedIds.has(implementation.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function BulkActionToolbar({
  selectedCount,
  onBulkStatusChange,
  onClearSelection,
  isLoading,
}: {
  selectedCount: number;
  onBulkStatusChange: (status: string) => void;
  onClearSelection: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-primary/10 border border-primary/20 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-xs sm:text-sm font-medium">{selectedCount} selected</span>
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={onBulkStatusChange} disabled={isLoading}>
          <SelectTrigger className="w-[130px] sm:w-[160px] h-7 sm:h-8 text-[10px] sm:text-xs">
            <SelectValue placeholder="Set status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="implemented">Implemented</SelectItem>
            <SelectItem value="not_applicable">N/A</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearSelection}
          disabled={isLoading}
          className="h-7 sm:h-8 px-2 sm:px-3 text-xs"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
      </div>
    </div>
  );
}

export function AISystemControls({ 
  aiSystemId, 
  riskLevel, 
  hasVendor,
  isClassified 
}: AISystemControlsProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  
  // N/A justification dialog state
  const [naDialogOpen, setNaDialogOpen] = useState(false);
  const [pendingNaControl, setPendingNaControl] = useState<{
    id: string;
    name: string;
    code: string;
  } | null>(null);
  
  const { data: implementations, isLoading } = useAISystemControls(aiSystemId);
  const applicableControls = useApplicableControls(riskLevel, hasVendor);
  const initializeControls = useInitializeControls();
  const updateStatus = useUpdateControlStatus();
  const bulkUpdateStatus = useBulkUpdateControlStatus();
  
  // Fetch evidence counts for all controls
  const controlIds = implementations?.map((impl) => impl.id) || [];
  const { data: evidenceCounts = {} } = useControlsEvidenceCounts(controlIds);

  const handleInitialize = async () => {
    const controlIds = applicableControls.map((c) => c.id);
    await initializeControls.mutateAsync({ aiSystemId, controlIds });
  };

  const handleStatusChange = (id: string, status: string) => {
    // Check if setting to N/A and control requires justification
    if (status === "not_applicable") {
      const impl = implementations?.find(i => i.id === id);
      if (impl?.control?.na_requires_justification) {
        setPendingNaControl({
          id,
          name: impl.control.name,
          code: impl.control.code,
        });
        setNaDialogOpen(true);
        return;
      }
    }
    updateStatus.mutate({ id, status });
  };

  const handleNaConfirm = (justification: string) => {
    if (pendingNaControl) {
      updateStatus.mutate({ 
        id: pendingNaControl.id, 
        status: "not_applicable",
        na_justification: justification,
      });
    }
    setNaDialogOpen(false);
    setPendingNaControl(null);
  };

  const handleNaCancel = () => {
    setNaDialogOpen(false);
    setPendingNaControl(null);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // Exit selection mode if nothing selected
      if (next.size === 0) {
        setIsSelectionMode(false);
      } else if (!isSelectionMode) {
        setIsSelectionMode(true);
      }
      return next;
    });
  };

  const handleSelectAllInCategory = (ids: string[], select: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      ids.forEach(id => {
        if (select) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      if (next.size === 0) {
        setIsSelectionMode(false);
      } else if (!isSelectionMode) {
        setIsSelectionMode(true);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (!implementations) return;
    const allIds = implementations.map(i => i.id);
    setSelectedIds(new Set(allIds));
    setIsSelectionMode(true);
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
    setIsSelectionMode(false);
  };

  const handleBulkStatusChange = async (status: string) => {
    const ids = Array.from(selectedIds);
    await bulkUpdateStatus.mutateAsync({ ids, status });
    handleClearSelection();
  };

  // Group implementations by category
  const groupedControls = useMemo(() => {
    return implementations?.reduce((acc, impl) => {
      const category = impl.control?.category || "OTHER";
      if (!acc[category]) acc[category] = [];
      acc[category].push(impl);
      return acc;
    }, {} as Record<string, ControlImplementation[]>);
  }, [implementations]);

  // Calculate overall stats
  const totalImplemented = implementations?.filter(c => c.status === "implemented").length || 0;
  const totalApplicable = implementations?.filter(c => c.status !== "not_applicable").length || 0;
  const overallProgress = totalApplicable > 0 ? (totalImplemented / totalApplicable) * 100 : 0;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  // Not classified yet
  if (!isClassified) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Controls & Compliance
          </CardTitle>
          <CardDescription>
            Applicable controls will be determined after classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Complete the classification wizard first to see which controls apply to this AI system.
          </p>
        </CardContent>
      </Card>
    );
  }

  // No controls initialized yet
  if (!implementations || implementations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Controls & Compliance
          </CardTitle>
          <CardDescription>
            {applicableControls.length} controls apply based on classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Initialize controls to start tracking compliance status for this AI system.
            </p>
            <Button 
              onClick={handleInitialize}
              disabled={initializeControls.isPending}
            >
              {initializeControls.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Initialize {applicableControls.length} Controls
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              Controls & Compliance
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Track implementation status for applicable controls
            </CardDescription>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            {!isSelectionMode && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSelectAll}
                className="h-8 text-xs"
              >
                <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Bulk Edit
              </Button>
            )}
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold">{Math.round(overallProgress)}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {totalImplemented}/{totalApplicable} implemented
              </p>
            </div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-1.5 sm:h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {isSelectionMode && (
          <BulkActionToolbar
            selectedCount={selectedIds.size}
            onBulkStatusChange={handleBulkStatusChange}
            onClearSelection={handleClearSelection}
            isLoading={bulkUpdateStatus.isPending}
          />
        )}
        {Object.entries(groupedControls || {}).map(([category, controls]) => (
          <CategorySection
            key={category}
            category={category}
            controls={controls}
            aiSystemId={aiSystemId}
            evidenceCounts={evidenceCounts}
            onStatusChange={handleStatusChange}
            isSelectionMode={isSelectionMode}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAllInCategory={handleSelectAllInCategory}
          />
        ))}
      </CardContent>
      
      {/* N/A Justification Dialog */}
      <NAJustificationDialog
        open={naDialogOpen}
        onOpenChange={setNaDialogOpen}
        controlName={pendingNaControl?.name || ""}
        controlCode={pendingNaControl?.code || ""}
        onConfirm={handleNaConfirm}
        onCancel={handleNaCancel}
      />
    </Card>
  );
}
