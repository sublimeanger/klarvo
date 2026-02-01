import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Save, CheckCircle2, XCircle, Truck, AlertTriangle } from "lucide-react";
import { 
  useDistributorVerification, 
  useCreateDistributorVerification, 
  useUpdateDistributorVerification,
  useCompleteDistributorVerification,
  DISTRIBUTOR_CHECKLIST_LABELS,
  DEFAULT_DISTRIBUTOR_CHECKLIST,
  calculateDistributorChecklistCompletion,
  type DistributorVerificationStatus
} from "@/hooks/useDistributorVerification";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { Json } from "@/integrations/supabase/types";

interface DistributorVerificationChecklistProps {
  aiSystemId?: string;
  organizationId?: string;
}

const statusColors: Record<DistributorVerificationStatus, string> = {
  not_started: "bg-muted text-muted-foreground",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  compliant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  non_compliant: "bg-destructive text-destructive-foreground",
  escalated: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

const statusLabels: Record<DistributorVerificationStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  compliant: "Compliant",
  non_compliant: "Non-Compliant",
  escalated: "Escalated (Provider Obligations Apply)",
};

export function DistributorVerificationChecklist({ aiSystemId, organizationId }: DistributorVerificationChecklistProps) {
  const { toast } = useToast();

  const { data: verification, isLoading } = useDistributorVerification(aiSystemId);
  const createVerification = useCreateDistributorVerification();
  const updateVerification = useUpdateDistributorVerification();
  const completeVerification = useCompleteDistributorVerification();

  const [checklistData, setChecklistData] = useState<Record<string, boolean | null>>(DEFAULT_DISTRIBUTOR_CHECKLIST);
  const [hasRebranded, setHasRebranded] = useState(false);
  const [hasModified, setHasModified] = useState(false);
  const [escalationNotes, setEscalationNotes] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (verification) {
      if (verification.verification_data && typeof verification.verification_data === 'object') {
        setChecklistData(verification.verification_data as Record<string, boolean | null>);
      }
      setHasRebranded(verification.has_rebranded || false);
      setHasModified(verification.has_modified || false);
      setEscalationNotes(verification.escalation_notes || "");
      setNotes(verification.notes || "");
    }
  }, [verification]);

  const handleStart = () => {
    if (!aiSystemId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system first.",
        variant: "destructive"
      });
      return;
    }

    createVerification.mutate({
      ai_system_id: aiSystemId,
      organization_id: organizationId,
    });
  };

  const handleSave = () => {
    if (!verification) return;

    updateVerification.mutate({
      id: verification.id,
      verification_data: checklistData as unknown as Json,
      has_rebranded: hasRebranded,
      has_modified: hasModified,
      escalation_notes: escalationNotes || undefined,
      notes: notes || undefined,
      status: 'in_progress',
    });
  };

  const handleComplete = (status: 'compliant' | 'non_compliant' | 'escalated') => {
    if (!verification) return;
    completeVerification.mutate({
      id: verification.id,
      verifiedBy: "current-user",
      status,
    });
  };

  const setChecklistItem = (key: string, value: boolean | null) => {
    setChecklistData(prev => ({ ...prev, [key]: value }));
  };

  const completionPercentage = calculateDistributorChecklistCompletion(checklistData as unknown as Json);
  const escalationTriggered = hasRebranded || hasModified;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!verification) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distributor Verification</CardTitle>
          <CardDescription>
            Article 24 distributor obligations checklist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No verification started.</p>
            <Button onClick={handleStart}>
              Start Verification
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Distributor Verification</CardTitle>
              <CardDescription>
                Article 24 distributor obligations
              </CardDescription>
            </div>
            <Badge className={statusColors[verification.status]}>
              {statusLabels[verification.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Checklist Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} />
          </div>
          {verification.verified_at && (
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-emerald-700 dark:text-emerald-300">
                  Verified on {format(new Date(verification.verified_at), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Escalation Warning */}
      {escalationTriggered && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Provider Obligations May Apply (Article 25)</AlertTitle>
          <AlertDescription>
            You have indicated that the AI system has been rebranded or modified. Under Article 25, 
            a distributor shall be considered a provider and subject to provider obligations where 
            they have modified the system, placed it on the market under their own name, or made 
            substantial modifications to the system.
          </AlertDescription>
        </Alert>
      )}

      {/* Modification & Rebranding Check */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Modification & Rebranding Check
          </CardTitle>
          <CardDescription>
            Critical: These affect your obligations under Article 25
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rebranded">Have you rebranded this AI system?</Label>
              <p className="text-sm text-muted-foreground">
                Placed it on the market under your own name/trademark
              </p>
            </div>
            <Switch
              id="rebranded"
              checked={hasRebranded}
              onCheckedChange={setHasRebranded}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="modified">Have you modified this AI system?</Label>
              <p className="text-sm text-muted-foreground">
                Made any changes to the system's functionality or purpose
              </p>
            </div>
            <Switch
              id="modified"
              checked={hasModified}
              onCheckedChange={setHasModified}
            />
          </div>
          {escalationTriggered && (
            <div className="space-y-2 pt-4">
              <Label htmlFor="escalation_notes">Escalation Notes</Label>
              <Textarea
                id="escalation_notes"
                placeholder="Describe the modifications or rebranding performed..."
                value={escalationNotes}
                onChange={(e) => setEscalationNotes(e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verification Checklist</CardTitle>
          <CardDescription>
            Verify each requirement before making available on market
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(DISTRIBUTOR_CHECKLIST_LABELS).map(([key, label]) => (
            <div key={key} className="space-y-2 border-b pb-4 last:border-0">
              <Label className="text-sm font-medium">{label}</Label>
              <RadioGroup
                value={checklistData[key] === null ? "" : checklistData[key] ? "yes" : "no"}
                onValueChange={(value) => setChecklistItem(key, value === "yes")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${key}-yes`} />
                  <Label htmlFor={`${key}-yes`} className="flex items-center gap-1 text-emerald-600 cursor-pointer">
                    <CheckCircle2 className="h-4 w-4" /> Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${key}-no`} />
                  <Label htmlFor={`${key}-no`} className="flex items-center gap-1 text-destructive cursor-pointer">
                    <XCircle className="h-4 w-4" /> No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Additional notes or observations..."
            className="min-h-[100px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Progress
        </Button>
        {escalationTriggered ? (
          <Button
            variant="destructive"
            onClick={() => handleComplete('escalated')}
            disabled={verification.status === 'escalated'}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Mark as Escalated
          </Button>
        ) : (
          <>
            <Button
              variant="destructive"
              onClick={() => handleComplete('non_compliant')}
              disabled={verification.status === 'compliant' || verification.status === 'non_compliant'}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Mark Non-Compliant
            </Button>
            <Button
              onClick={() => handleComplete('compliant')}
              disabled={verification.status === 'compliant' || verification.status === 'non_compliant'}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Compliant
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
