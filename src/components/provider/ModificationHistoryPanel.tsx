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
      <div className="rounded-lg border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="font-medium text-sm">Modification History (Article 25)</p>
                <p className="text-xs text-muted-foreground">
                  {modifications.length} modification{modifications.length !== 1 ? 's' : ''} recorded
                  {pendingCount > 0 && ` • ${pendingCount} pending`}
                  {inProgressCount > 0 && ` • ${inProgressCount} in progress`}
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <FileWarning className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">
                {getModificationTypeLabel(modification.modification_type)}
              </span>
              <Badge variant="outline" className="text-xs">
                {getModificationArticleRef(modification.modification_type)}
              </Badge>
              {getStatusBadge(modification.conformity_assessment_status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {modification.description}
            </p>
            {modification.old_value && modification.new_value && (
              <div className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1 inline-block">
                <span className="line-through">{modification.old_value}</span>
                {" → "}
                <span className="font-medium">{modification.new_value}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground pl-7">
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
        <div className="pl-7 mt-2">
          <div className="text-xs bg-muted rounded p-2">
            <span className="font-medium">Waiver reason:</span>{" "}
            {modification.waiver_reason}
          </div>
        </div>
      )}
    </div>
  );
}
