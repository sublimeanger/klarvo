import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Plus, 
  X, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  useControlEvidence, 
  useLinkEvidence, 
  useUnlinkEvidence,
  ControlEvidenceLink 
} from "@/hooks/useControlEvidence";
import { useEvidenceFiles } from "@/hooks/useEvidence";
import { cn } from "@/lib/utils";

interface ControlEvidenceSectionProps {
  controlImplementationId: string;
  aiSystemId?: string;
  controlName?: string;
}

function EvidenceStatusBadge({ status, expiresAt }: { status: string; expiresAt?: string | null }) {
  const isExpiringSoon = expiresAt && new Date(expiresAt) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  if (status === "approved") {
    if (isExpiringSoon) {
      return (
        <Badge variant="outline" className="text-warning border-warning">
          <Clock className="h-3 w-3 mr-1" />
          Expiring soon
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-success border-success">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Approved
      </Badge>
    );
  }
  
  if (status === "expired") {
    return (
      <Badge variant="destructive">
        <AlertCircle className="h-3 w-3 mr-1" />
        Expired
      </Badge>
    );
  }
  
  return (
    <Badge variant="secondary">
      {status}
    </Badge>
  );
}

function LinkedEvidenceItem({ 
  link, 
  onUnlink 
}: { 
  link: ControlEvidenceLink; 
  onUnlink: () => void;
}) {
  const evidence = link.evidence_file;
  if (!evidence) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 sm:p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 shrink-0">
          <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium truncate">{evidence.name}</p>
          {evidence.description && (
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{evidence.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5 sm:gap-2 ml-0 sm:ml-2">
        <EvidenceStatusBadge status={evidence.status} expiresAt={evidence.expires_at} />
        <Link to="/evidence">
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive">
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[95vw] max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">Unlink evidence?</AlertDialogTitle>
              <AlertDialogDescription className="text-xs sm:text-sm">
                This will remove the link between "{evidence.name}" and this control. 
                The evidence file will not be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onUnlink} className="w-full sm:w-auto">Unlink</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function LinkEvidenceDialog({
  controlImplementationId,
  aiSystemId,
  linkedEvidenceIds,
  onClose,
}: {
  controlImplementationId: string;
  aiSystemId?: string;
  linkedEvidenceIds: string[];
  onClose: () => void;
}) {
  const { data: allEvidence = [], isLoading } = useEvidenceFiles(
    aiSystemId ? { ai_system_id: aiSystemId } : undefined
  );
  const linkEvidence = useLinkEvidence();

  // Filter out already linked evidence
  const availableEvidence = allEvidence.filter(
    (e) => !linkedEvidenceIds.includes(e.id)
  );

  const handleLink = async (evidenceId: string) => {
    await linkEvidence.mutateAsync({
      controlImplementationId,
      evidenceFileId: evidenceId,
    });
    onClose();
  };

  return (
    <DialogContent className="w-[95vw] max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-base sm:text-lg">Link Evidence</DialogTitle>
        <DialogDescription className="text-xs sm:text-sm">
          Select evidence to link to this control. Only approved evidence is shown.
        </DialogDescription>
      </DialogHeader>
      
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : availableEvidence.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <FileCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No available evidence to link</p>
          <p className="text-xs mt-1">
            {linkedEvidenceIds.length > 0 
              ? "All evidence is already linked to this control"
              : "Upload evidence in the Evidence section first"
            }
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link to="/evidence">Go to Evidence</Link>
          </Button>
        </div>
      ) : (
        <ScrollArea className="max-h-80">
          <div className="space-y-2 pr-4">
            {availableEvidence.map((evidence) => (
              <button
                key={evidence.id}
                onClick={() => handleLink(evidence.id)}
                disabled={linkEvidence.isPending}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg border text-left",
                  "hover:bg-muted/50 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{evidence.name}</p>
                  {evidence.evidence_type && (
                    <p className="text-xs text-muted-foreground capitalize">
                      {evidence.evidence_type.replace("_", " ")}
                    </p>
                  )}
                </div>
                <EvidenceStatusBadge 
                  status={evidence.status} 
                  expiresAt={evidence.expires_at} 
                />
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </DialogContent>
  );
}

export function ControlEvidenceSection({
  controlImplementationId,
  aiSystemId,
  controlName,
}: ControlEvidenceSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: linkedEvidence = [], isLoading } = useControlEvidence(controlImplementationId);
  const unlinkEvidence = useUnlinkEvidence();

  const linkedEvidenceIds = linkedEvidence.map((l) => l.evidence_file_id);

  const handleUnlink = (linkId: string) => {
    unlinkEvidence.mutate({
      linkId,
      controlImplementationId,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-14 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
          <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <span className="hidden xs:inline">Linked</span> Evidence
          {linkedEvidence.length > 0 && (
            <Badge variant="secondary" className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs">
              {linkedEvidence.length}
            </Badge>
          )}
        </h4>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs">
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">Link</span> Evidence
            </Button>
          </DialogTrigger>
          <LinkEvidenceDialog
            controlImplementationId={controlImplementationId}
            aiSystemId={aiSystemId}
            linkedEvidenceIds={linkedEvidenceIds}
            onClose={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>

      {linkedEvidence.length === 0 ? (
        <div className="text-center py-6 border rounded-lg border-dashed">
          <FileCheck className="h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No evidence linked</p>
          <p className="text-xs text-muted-foreground mt-1">
            Link evidence to demonstrate control implementation
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {linkedEvidence.map((link) => (
            <LinkedEvidenceItem
              key={link.id}
              link={link}
              onUnlink={() => handleUnlink(link.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
