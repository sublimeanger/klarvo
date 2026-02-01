import { useState } from "react";
import { format } from "date-fns";
import { 
  History, 
  ChevronDown, 
  ChevronUp, 
  FileWarning,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useModificationHistory,
  getModificationTypeLabel,
  getModificationArticleRef,
  type ModificationRecord,
} from "@/hooks/useSubstantialModification";

interface ModificationHistoryPanelProps {
  aiSystemId: string;
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'complete':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'waived':
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-warning" />;
    case 'pending':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'complete':
      return <Badge variant="outline" className="text-success border-success">Complete</Badge>;
    case 'waived':
      return <Badge variant="secondary">Waived</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="text-warning border-warning">In Progress</Badge>;
    case 'pending':
      return <Badge variant="destructive">Pending</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function ModificationHistoryPanel({ aiSystemId }: ModificationHistoryPanelProps) {
  const { data: modifications, isLoading } = useModificationHistory(aiSystemId);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4 space-y-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!modifications || modifications.length === 0) {
    return null;
  }

  const pendingCount = modifications.filter(m => m.conformity_assessment_status === 'pending').length;
  const inProgressCount = modifications.filter(m => m.conformity_assessment_status === 'in_progress').length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-xl border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-3 sm:p-4 h-auto hover:bg-muted/50 active:bg-muted/50"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <History className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-xs sm:text-sm">Modification History (Article 25)</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {modifications.length} modification{modifications.length !== 1 ? 's' : ''} recorded
                  {pendingCount > 0 && ` • ${pendingCount} pending`}
                  {inProgressCount > 0 && ` • ${inProgressCount} in progress`}
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t divide-y">
            {modifications.map((mod) => (
              <ModificationRow key={mod.id} modification={mod} />
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function ModificationRow({ modification }: { modification: ModificationRecord }) {
  return (
    <div className="p-3 sm:p-4 space-y-2">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
          <FileWarning className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-medium text-xs sm:text-sm">
                {getModificationTypeLabel(modification.modification_type)}
              </span>
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {getModificationArticleRef(modification.modification_type)}
              </Badge>
              {getStatusBadge(modification.conformity_assessment_status)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {modification.description}
            </p>
            {modification.old_value && modification.new_value && (
              <div className="text-[10px] sm:text-xs text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 inline-block break-all">
                <span className="line-through">{modification.old_value}</span>
                {" → "}
                <span className="font-medium">{modification.new_value}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground pl-6 sm:pl-7">
        <span>
          Detected: {format(new Date(modification.detected_at), "PPp")}
        </span>
        {modification.reviewed_at && (
          <span>
            Reviewed: {format(new Date(modification.reviewed_at), "PPp")}
          </span>
        )}
      </div>

      {modification.waiver_reason && (
        <div className="pl-6 sm:pl-7 mt-2">
          <div className="text-[10px] sm:text-xs bg-muted rounded-lg p-2">
            <span className="font-medium">Waiver reason:</span>{" "}
            {modification.waiver_reason}
          </div>
        </div>
      )}
    </div>
  );
}
