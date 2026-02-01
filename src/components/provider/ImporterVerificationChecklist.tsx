import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, CheckCircle2, XCircle, Package, Building2 } from "lucide-react";
import { 
  useImporterVerification, 
  useCreateImporterVerification, 
  useUpdateImporterVerification,
  useCompleteImporterVerification,
  IMPORTER_CHECKLIST_LABELS,
  DEFAULT_IMPORTER_CHECKLIST,
  calculateImporterChecklistCompletion,
  type VerificationStatus
} from "@/hooks/useImporterVerification";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { Json } from "@/integrations/supabase/types";

interface ImporterVerificationChecklistProps {
  aiSystemId?: string;
  organizationId?: string;
}

const statusColors: Record<VerificationStatus, string> = {
  not_started: "bg-muted text-muted-foreground",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  compliant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  non_compliant: "bg-destructive text-destructive-foreground",
  blocked: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

const statusLabels: Record<VerificationStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  compliant: "Compliant",
  non_compliant: "Non-Compliant",
  blocked: "Blocked",
};

export function ImporterVerificationChecklist({ aiSystemId, organizationId }: ImporterVerificationChecklistProps) {
  const { toast } = useToast();

  const { data: verification, isLoading } = useImporterVerification(aiSystemId);
  const createVerification = useCreateImporterVerification();
  const updateVerification = useUpdateImporterVerification();
  const completeVerification = useCompleteImporterVerification();

  const [checklistData, setChecklistData] = useState<Record<string, boolean | null>>(DEFAULT_IMPORTER_CHECKLIST);
  const [providerName, setProviderName] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerContact, setProviderContact] = useState("");
  const [authorisedRepName, setAuthorisedRepName] = useState("");
  const [authorisedRepAddress, setAuthorisedRepAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (verification) {
      if (verification.verification_data && typeof verification.verification_data === 'object') {
        setChecklistData(verification.verification_data as Record<string, boolean | null>);
      }
      setProviderName(verification.provider_name || "");
      setProviderAddress(verification.provider_address || "");
      setProviderContact(verification.provider_contact || "");
      setAuthorisedRepName(verification.authorised_rep_name || "");
      setAuthorisedRepAddress(verification.authorised_rep_address || "");
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
      provider_name: providerName || undefined,
      provider_address: providerAddress || undefined,
      provider_contact: providerContact || undefined,
      authorised_rep_name: authorisedRepName || undefined,
      authorised_rep_address: authorisedRepAddress || undefined,
      notes: notes || undefined,
      status: 'in_progress',
    });
  };

  const handleComplete = (status: 'compliant' | 'non_compliant') => {
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

  const completionPercentage = calculateImporterChecklistCompletion(checklistData as unknown as Json);

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
          <CardTitle className="text-lg">Importer Verification</CardTitle>
          <CardDescription>
            Article 23 importer obligations checklist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
              <CardTitle className="text-lg">Importer Verification</CardTitle>
              <CardDescription>
                Article 23 importer obligations
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

      {/* Provider Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Provider Information
          </CardTitle>
          <CardDescription>
            Details of the third-country provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="provider_name">Provider Name</Label>
              <Input
                id="provider_name"
                placeholder="Name of the AI system provider"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider_contact">Provider Contact</Label>
              <Input
                id="provider_contact"
                placeholder="Email or phone"
                value={providerContact}
                onChange={(e) => setProviderContact(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider_address">Provider Address</Label>
            <Textarea
              id="provider_address"
              placeholder="Full address of the provider"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="auth_rep_name">Authorised Representative Name</Label>
              <Input
                id="auth_rep_name"
                placeholder="If applicable"
                value={authorisedRepName}
                onChange={(e) => setAuthorisedRepName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth_rep_address">Authorised Representative Address</Label>
              <Input
                id="auth_rep_address"
                placeholder="EU address"
                value={authorisedRepAddress}
                onChange={(e) => setAuthorisedRepAddress(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verification Checklist</CardTitle>
          <CardDescription>
            Verify each requirement before placing on market
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(IMPORTER_CHECKLIST_LABELS).map(([key, label]) => (
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
      </div>
    </div>
  );
}
