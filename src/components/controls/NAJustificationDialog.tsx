import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NAJustificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  controlName: string;
  controlCode: string;
  onConfirm: (justification: string) => void;
  onCancel: () => void;
}

export function NAJustificationDialog({
  open,
  onOpenChange,
  controlName,
  controlCode,
  onConfirm,
  onCancel,
}: NAJustificationDialogProps) {
  const [justification, setJustification] = useState("");

  const handleConfirm = () => {
    if (justification.trim()) {
      onConfirm(justification.trim());
      setJustification("");
    }
  };

  const handleCancel = () => {
    setJustification("");
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Justification Required
          </DialogTitle>
          <DialogDescription>
            Control <strong>{controlCode}</strong> requires a justification when marked as Not Applicable.
            This will be included in your audit trail.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-sm font-medium">{controlName}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="na-justification">
              Why is this control not applicable? <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="na-justification"
              placeholder="Explain why this control does not apply to this AI system..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This justification may be reviewed by a Compliance Owner for approval.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!justification.trim()}
          >
            Confirm N/A
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
