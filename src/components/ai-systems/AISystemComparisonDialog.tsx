import { useState, useMemo } from "react";
import { pdf } from "@react-pdf/renderer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Cpu,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  FileCheck,
  ClipboardList,
  Building2,
  User,
  Calendar,
  Loader2,
  X,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAISystemComparison, type ComparisonSystemData } from "@/hooks/useAISystemComparison";
import { AISystem } from "@/hooks/useAISystems";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization } from "@/hooks/useOrganization";
import { ComparisonReportPDF } from "@/components/exports/ComparisonReportPDF";

interface AISystemComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  systems: AISystem[];
}

const riskLevelConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  prohibited: { label: "Prohibited", color: "bg-destructive text-destructive-foreground", icon: <ShieldX className="h-4 w-4" /> },
  high_risk: { label: "High Risk", color: "bg-warning text-warning-foreground", icon: <ShieldAlert className="h-4 w-4" /> },
  limited_risk: { label: "Limited Risk", color: "bg-primary text-primary-foreground", icon: <ShieldCheck className="h-4 w-4" /> },
  minimal_risk: { label: "Minimal Risk", color: "bg-success text-success-foreground", icon: <ShieldCheck className="h-4 w-4" /> },
  not_classified: { label: "Not Classified", color: "bg-muted text-muted-foreground", icon: <AlertTriangle className="h-4 w-4" /> },
};

const lifecycleStatusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
  pilot: { label: "Pilot", color: "bg-primary/20 text-primary" },
  live: { label: "Live", color: "bg-success/20 text-success" },
  retired: { label: "Retired", color: "bg-warning/20 text-warning" },
  archived: { label: "Archived", color: "bg-muted text-muted-foreground" },
};

function ComparisonColumn({ system }: { system: ComparisonSystemData }) {
  const riskConfig = riskLevelConfig[system.classification?.risk_level || "not_classified"];
  const statusConfig = lifecycleStatusConfig[system.lifecycle_status] || lifecycleStatusConfig.draft;

  const controlProgress = system.controlStats.total > 0
    ? Math.round((system.controlStats.implemented / system.controlStats.total) * 100)
    : 0;

  const evidenceProgress = system.evidenceStats.total > 0
    ? Math.round((system.evidenceStats.approved / system.evidenceStats.total) * 100)
    : 0;

  return (
    <div className="flex-1 min-w-[240px] sm:min-w-[280px] border-r last:border-r-0 p-3 sm:p-4 space-y-4 sm:space-y-5">
      {/* System Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-xs sm:text-sm truncate">{system.name}</h3>
        </div>
        <Badge className={statusConfig.color} variant="outline">
          {statusConfig.label}
        </Badge>
      </div>

      {/* Risk Classification */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Risk Classification
        </h4>
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${riskConfig.color}`}>
          {riskConfig.icon}
          {riskConfig.label}
        </div>
        {system.classification?.confidence_level && (
          <p className="text-xs text-muted-foreground">
            Confidence: {system.classification.confidence_level}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mt-1">
          {system.classification?.is_high_risk_candidate && (
            <Badge variant="outline" className="text-xs">High-Risk Candidate</Badge>
          )}
          {system.classification?.has_transparency_obligations && (
            <Badge variant="outline" className="text-xs">Transparency Required</Badge>
          )}
          {system.classification?.has_prohibited_indicators && (
            <Badge variant="destructive" className="text-xs">Prohibited Indicators</Badge>
          )}
        </div>
      </div>

      {/* Control Status */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <ClipboardList className="h-3.5 w-3.5" />
          Controls ({system.controlStats.total})
        </h4>
        <Progress value={controlProgress} className="h-2" />
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center">
            <p className="font-medium text-success">{system.controlStats.implemented}</p>
            <p className="text-muted-foreground">Done</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-warning">{system.controlStats.inProgress}</p>
            <p className="text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-muted-foreground">{system.controlStats.notStarted}</p>
            <p className="text-muted-foreground">Not Started</p>
          </div>
        </div>
      </div>

      {/* Evidence Status */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <FileCheck className="h-3.5 w-3.5" />
          Evidence ({system.evidenceStats.total})
        </h4>
        <Progress value={evidenceProgress} className="h-2" />
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="text-center">
            <p className="font-medium text-success">{system.evidenceStats.approved}</p>
            <p className="text-muted-foreground">Approved</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-warning">{system.evidenceStats.pending}</p>
            <p className="text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-2 pt-2 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          <span>{system.vendor?.name || system.department || "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{system.primary_owner?.full_name || "Unassigned"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(new Date(system.created_at), "MMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
}

export function AISystemComparisonDialog({
  open,
  onOpenChange,
  systems,
}: AISystemComparisonDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const { profile, user } = useAuth();
  const { data: organization } = useOrganization();

  const { data: comparisonData, isLoading } = useAISystemComparison(selectedIds);

  const toggleSystem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const handleExportPDF = async () => {
    if (!comparisonData || comparisonData.length === 0) return;

    setIsExporting(true);
    try {
      const generatedBy = profile?.full_name || user?.email || "Unknown";
      const doc = ComparisonReportPDF({
        systems: sortedComparisonData,
        organization: { name: organization?.name || "Organization" },
        generatedBy,
      });

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AI_System_Comparison_${format(new Date(), "yyyy-MM-dd")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Comparison report exported");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export comparison");
    } finally {
      setIsExporting(false);
    }
  };

  // Sort systems by risk level for quick comparison
  const sortedComparisonData = useMemo(() => {
    if (!comparisonData) return [];
    const riskOrder = ["prohibited", "high_risk", "limited_risk", "minimal_risk", "not_classified"];
    return [...comparisonData].sort((a, b) => {
      const aRisk = a.classification?.risk_level || "not_classified";
      const bRisk = b.classification?.risk_level || "not_classified";
      return riskOrder.indexOf(aRisk) - riskOrder.indexOf(bRisk);
    });
  }, [comparisonData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 w-[95vw] sm:w-auto">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="text-base sm:text-lg">Compare AI Systems</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Select up to 4 systems to compare risk levels, control status, and evidence coverage side-by-side.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[65vh] sm:h-[70vh]">
          {/* System Selection */}
          <div className="p-3 sm:p-4 border-b bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3">
              <p className="text-xs sm:text-sm font-medium">
                Select systems ({selectedIds.length}/4)
              </p>
              <div className="flex items-center gap-2">
                {selectedIds.length >= 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    disabled={isExporting || isLoading}
                  >
                    {isExporting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Export PDF
                  </Button>
                )}
                {selectedIds.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearSelection}>
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="h-24">
              <div className="flex flex-wrap gap-2">
                {systems.map((system) => (
                  <label
                    key={system.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                      selectedIds.includes(system.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    <Checkbox
                      checked={selectedIds.includes(system.id)}
                      onCheckedChange={() => toggleSystem(system.id)}
                      disabled={!selectedIds.includes(system.id) && selectedIds.length >= 4}
                    />
                    <span className="text-sm">{system.name}</span>
                    {selectedIds.includes(system.id) && (
                      <X
                        className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSystem(system.id);
                        }}
                      />
                    )}
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Comparison View */}
          <div className="flex-1 overflow-hidden">
            {selectedIds.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Cpu className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">No systems selected</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Select at least two AI systems above to compare their risk levels, controls, and evidence.
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="flex divide-x min-w-max">
                  {sortedComparisonData.map((system) => (
                    <ComparisonColumn key={system.id} system={system} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
