import { useState } from "react";
import { format } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Download,
  FileText,
  User,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  usePendingApprovals,
  useApproveEvidence,
  useRejectEvidence,
  useDownloadEvidence,
} from "@/hooks/useEvidence";
import { cn } from "@/lib/utils";

const EVIDENCE_TYPES: Record<string, string> = {
  vendor_doc: "Vendor Doc",
  policy: "Policy",
  training: "Training",
  risk_assessment: "Risk Assessment",
  monitoring: "Monitoring",
  incident: "Incident",
  transparency_notice: "Transparency",
  contract: "Contract",
  other: "Other",
};

export function ApprovalQueue() {
  const { data: pending = [], isLoading } = usePendingApprovals();
  const approveEvidence = useApproveEvidence();
  const rejectEvidence = useRejectEvidence();
  const downloadEvidence = useDownloadEvidence();

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    evidenceId: string | null;
    evidenceName: string;
  }>({ open: false, evidenceId: null, evidenceName: "" });
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async (id: string) => {
    await approveEvidence.mutateAsync({ id });
  };

  const handleRejectSubmit = async () => {
    if (!rejectDialog.evidenceId) return;
    await rejectEvidence.mutateAsync({
      id: rejectDialog.evidenceId,
      reason: rejectReason,
    });
    setRejectDialog({ open: false, evidenceId: null, evidenceName: "" });
    setRejectReason("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (pending.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            No evidence files are pending approval. New uploads will appear here for review.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" className="text-base px-3 py-1">
          {pending.length} pending
        </Badge>
      </div>

      <div className="grid gap-4">
        {pending.map((evidence) => (
          <Card key={evidence.id} className="overflow-hidden">
            <div className="flex">
              {/* File Info */}
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium truncate">{evidence.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                      {evidence.evidence_type && (
                        <Badge variant="outline" className="text-xs">
                          {EVIDENCE_TYPES[evidence.evidence_type] || evidence.evidence_type}
                        </Badge>
                      )}
                      {evidence.ai_systems?.name && (
                        <span className="text-primary">{evidence.ai_systems.name}</span>
                      )}
                      {evidence.vendors?.name && (
                        <span>{evidence.vendors.name}</span>
                      )}
                    </div>
                    {evidence.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {evidence.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {evidence.uploader?.full_name || "Unknown"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(evidence.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 p-4 bg-muted/30 border-l">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadEvidence.mutate(evidence.file_path)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="bg-success hover:bg-success/90"
                  onClick={() => handleApprove(evidence.id)}
                  disabled={approveEvidence.isPending}
                >
                  {approveEvidence.isPending ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  )}
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() =>
                    setRejectDialog({
                      open: true,
                      evidenceId: evidence.id,
                      evidenceName: evidence.name,
                    })
                  }
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Reject Dialog */}
      <Dialog
        open={rejectDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setRejectDialog({ open: false, evidenceId: null, evidenceName: "" });
            setRejectReason("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Reject Evidence
            </DialogTitle>
            <DialogDescription>
              Return "{rejectDialog.evidenceName}" to the uploader for revision
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for rejection (optional)</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain what needs to be fixed or updated..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialog({ open: false, evidenceId: null, evidenceName: "" })}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectSubmit}
              disabled={rejectEvidence.isPending}
            >
              {rejectEvidence.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Reject & Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
