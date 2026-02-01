import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileWarning,
  Scale,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  usePendingModifications, 
  useUpdateModificationStatus,
  getModificationTypeLabel,
  getModificationArticleRef,
  type ModificationRecord,
} from "@/hooks/useSubstantialModification";
import { format } from "date-fns";

interface SubstantialModificationAlertProps {
  aiSystemId: string;
  showFullDetails?: boolean;
}

export function SubstantialModificationAlert({ 
  aiSystemId, 
  showFullDetails = false 
}: SubstantialModificationAlertProps) {
  const { data: modifications, isLoading } = usePendingModifications(aiSystemId);
  const updateStatus = useUpdateModificationStatus();
  
  const [selectedMod, setSelectedMod] = useState<ModificationRecord | null>(null);
  const [waiverReason, setWaiverReason] = useState("");
  const [showWaiverDialog, setShowWaiverDialog] = useState(false);

  if (isLoading || !modifications || modifications.length === 0) {
    return null;
  }

  const handleStartConformity = (mod: ModificationRecord) => {
    updateStatus.mutate({
      id: mod.id,
      status: "in_progress",
    });
  };

  const handleWaive = () => {
    if (!selectedMod) return;
    
    updateStatus.mutate({
      id: selectedMod.id,
      status: "waived",
      waiverReason,
    }, {
      onSuccess: () => {
        setShowWaiverDialog(false);
        setSelectedMod(null);
        setWaiverReason("");
      }
    });
  };

  const openWaiverDialog = (mod: ModificationRecord) => {
    setSelectedMod(mod);
    setShowWaiverDialog(true);
  };

  return (
    <>
      <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 rounded-xl">
        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
        <AlertTitle className="flex flex-wrap items-center gap-2">
          <span className="text-sm sm:text-base">Substantial Modification Detected</span>
          <Badge variant="destructive" className="text-xs">
            {modifications.length} pending
          </Badge>
        </AlertTitle>
        <AlertDescription className="mt-2 sm:mt-3 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm">
            Under <strong>Article 25</strong> of the EU AI Act, substantial modifications 
            may require a new conformity assessment before the system can continue to be 
            placed on the market.
          </p>

          {showFullDetails && (
            <div className="space-y-2 sm:space-y-3">
              {modifications.map((mod) => (
                <div 
                  key={mod.id} 
                  className="p-2.5 sm:p-3 rounded-xl border border-destructive/30 bg-background"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <FileWarning className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          {getModificationTypeLabel(mod.modification_type)}
                        </span>
                        <Badge variant="outline" className="text-[10px] sm:text-xs">
                          {getModificationArticleRef(mod.modification_type)}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {mod.description}
                      </p>
                      {mod.old_value && mod.new_value && (
                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 break-all">
                          <span className="line-through">{mod.old_value}</span>
                          {" → "}
                          <span className="font-medium">{mod.new_value}</span>
                        </div>
                      )}
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Detected: {format(new Date(mod.detected_at), "PPp")}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openWaiverDialog(mod)}
                        disabled={updateStatus.isPending}
                        className="h-9 flex-1 sm:flex-none text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Waive
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleStartConformity(mod)}
                        disabled={updateStatus.isPending}
                        className="h-9 flex-1 sm:flex-none text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showFullDetails && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2">
              <Button size="sm" variant="outline" asChild className="h-10 w-full sm:w-auto">
                <Link to={`/ai-systems/${aiSystemId}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="sm" asChild className="h-10 w-full sm:w-auto">
                <Link to="/provider-track/conformity">
                  Go to Conformity
                  <Scale className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          <div className="pt-2 border-t border-destructive/20">
            <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3 shrink-0" />
              Action required before continued market placement
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Waiver Dialog */}
      <Dialog open={showWaiverDialog} onOpenChange={setShowWaiverDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Waive Conformity Requirement</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Provide a justification for why this modification does not require 
              a new conformity assessment. This will be recorded for audit purposes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4 max-h-[60vh] overflow-y-auto">
            {selectedMod && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-muted">
                <p className="text-xs sm:text-sm font-medium">
                  {getModificationTypeLabel(selectedMod.modification_type)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {selectedMod.description}
                </p>
              </div>
            )}
            
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium">Justification</label>
              <Textarea
                value={waiverReason}
                onChange={(e) => setWaiverReason(e.target.value)}
                placeholder="Explain why this modification does not constitute a substantial modification..."
                className="min-h-[100px]"
              />
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Common valid reasons: pre-determined change within authorized scope, 
                cosmetic change only, no impact on intended purpose or risk profile.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowWaiverDialog(false)}
              className="h-11 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleWaive}
              disabled={!waiverReason.trim() || updateStatus.isPending}
              className="h-11 w-full sm:w-auto"
            >
              Confirm Waiver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Summary widget for dashboard
export function ModificationSummaryWidget() {
  const { data: modifications, isLoading } = usePendingModifications();

  if (isLoading || !modifications || modifications.length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive" className="border-destructive/50">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Substantial Modifications Pending</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm mb-3">
          {modifications.length} AI system{modifications.length > 1 ? 's have' : ' has'} pending 
          modifications that may require conformity review under Article 25.
        </p>
        <Button size="sm" asChild>
          <Link to="/provider-track/conformity">
            Review Modifications
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
