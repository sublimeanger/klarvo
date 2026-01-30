import { useState } from "react";
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
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import {
  useAISystemControls,
  useApplicableControls,
  useInitializeControls,
  useUpdateControlStatus,
  type ControlImplementation,
} from "@/hooks/useControls";
import { useControlsEvidenceCounts } from "@/hooks/useControlEvidence";
import { ControlEvidenceSection } from "@/components/controls/ControlEvidenceSection";

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
  onStatusChange 
}: ControlCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const control = implementation.control;
  if (!control) return null;

  const statusConfig = STATUS_CONFIG[implementation.status] || STATUS_CONFIG.not_started;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="rounded-lg border bg-card">
      <div 
        className="flex items-start justify-between p-3 hover:bg-muted/30 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-1.5 rounded-md ${
            implementation.status === "implemented" ? "bg-success/10 text-success" :
            implementation.status === "in_progress" ? "bg-warning/10 text-warning" :
            "bg-muted text-muted-foreground"
          }`}>
            <StatusIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground">{control.code}</span>
              <span className="font-medium text-sm">{control.name}</span>
              {evidenceCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  <FileCheck className="h-3 w-3 mr-1" />
                  {evidenceCount}
                </Badge>
              )}
            </div>
            {control.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {control.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Select
            value={implementation.status}
            onValueChange={(value) => onStatusChange(implementation.id, value)}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="implemented">Implemented</SelectItem>
              <SelectItem value="not_applicable">N/A</SelectItem>
            </SelectContent>
          </Select>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t">
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
  onStatusChange 
}: { 
  category: string;
  controls: ControlImplementation[];
  aiSystemId: string;
  evidenceCounts: Record<string, number>;
  onStatusChange: (id: string, status: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  
  const implemented = controls.filter(c => c.status === "implemented").length;
  const total = controls.filter(c => c.status !== "not_applicable").length;
  const progress = total > 0 ? (implemented / total) * 100 : 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <div className="text-left">
            <p className="font-medium text-sm">{CATEGORY_LABELS[category] || category}</p>
            <p className="text-xs text-muted-foreground">
              {implemented}/{total} implemented
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-32">
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-muted-foreground w-10">
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
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AISystemControls({ 
  aiSystemId, 
  riskLevel, 
  hasVendor,
  isClassified 
}: AISystemControlsProps) {
  const { data: implementations, isLoading } = useAISystemControls(aiSystemId);
  const applicableControls = useApplicableControls(riskLevel, hasVendor);
  const initializeControls = useInitializeControls();
  const updateStatus = useUpdateControlStatus();
  
  // Fetch evidence counts for all controls
  const controlIds = implementations?.map((impl) => impl.id) || [];
  const { data: evidenceCounts = {} } = useControlsEvidenceCounts(controlIds);

  const handleInitialize = async () => {
    const controlIds = applicableControls.map((c) => c.id);
    await initializeControls.mutateAsync({ aiSystemId, controlIds });
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatus.mutate({ id, status });
  };

  // Group implementations by category
  const groupedControls = implementations?.reduce((acc, impl) => {
    const category = impl.control?.category || "OTHER";
    if (!acc[category]) acc[category] = [];
    acc[category].push(impl);
    return acc;
  }, {} as Record<string, ControlImplementation[]>);

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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Controls & Compliance
            </CardTitle>
            <CardDescription>
              Track implementation status for applicable controls
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
            <p className="text-xs text-muted-foreground">
              {totalImplemented}/{totalApplicable} implemented
            </p>
          </div>
        </div>
        <Progress value={overallProgress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(groupedControls || {}).map(([category, controls]) => (
          <CategorySection
            key={category}
            category={category}
            controls={controls}
            aiSystemId={aiSystemId}
            evidenceCounts={evidenceCounts}
            onStatusChange={handleStatusChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}
