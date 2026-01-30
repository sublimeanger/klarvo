import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useClearReassessment } from "@/hooks/useReassessment";

interface ReassessmentAlertProps {
  classificationId: string;
  aiSystemId: string;
  reason: string | null;
  triggeredAt: string | null;
}

export function ReassessmentAlert({
  classificationId,
  aiSystemId,
  reason,
  triggeredAt,
}: ReassessmentAlertProps) {
  const clearReassessment = useClearReassessment();

  const handleDismiss = () => {
    clearReassessment.mutate({ classificationId });
  };

  return (
    <Alert variant="destructive" className="border-warning bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertTitle className="text-warning text-sm sm:text-base">Reassessment Recommended</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-xs sm:text-sm text-foreground/80">
          {reason || "Material changes detected that may affect classification."}
        </p>
        {triggeredAt && (
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            Triggered {new Date(triggeredAt).toLocaleDateString()}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3">
          <Button size="sm" asChild className="w-full sm:w-auto">
            <Link to={`/ai-systems/${aiSystemId}/classify`}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Re-classify Now
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDismiss}
            disabled={clearReassessment.isPending}
            className="w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
