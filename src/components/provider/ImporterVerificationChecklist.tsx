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
      <Card className="rounded-xl">
        <CardContent className="py-6 sm:py-8 p-3 sm:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 sm:h-8 bg-muted rounded w-1/3" />
            <div className="h-24 sm:h-32 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!verification) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Importer Verification</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Article 23 importer obligations checklist
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="text-center py-6 sm:py-8">
            <Package className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground mb-4">No verification started.</p>
            <Button onClick={handleStart} className="h-11 w-full sm:w-auto">
              Start Verification
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Status Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Importer Verification</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Article 23 importer obligations
              </CardDescription>
            </div>
            <Badge className={statusColors[verification.status]}>
              {statusLabels[verification.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Checklist Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-1.5 sm:h-2" />
          </div>
          {verification.verified_at && (
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Verified on {format(new Date(verification.verified_at), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Provider Information */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0" />
            Provider Information
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Details of the third-country provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="provider_name" className="text-xs sm:text-sm">Provider Name</Label>
              <Input
                id="provider_name"
                placeholder="Name of the AI system provider"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="provider_contact" className="text-xs sm:text-sm">Provider Contact</Label>
              <Input
                id="provider_contact"
                placeholder="Email or phone"
                value={providerContact}
                onChange={(e) => setProviderContact(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="provider_address" className="text-xs sm:text-sm">Provider Address</Label>
            <Textarea
              id="provider_address"
              placeholder="Full address of the provider"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="auth_rep_name" className="text-xs sm:text-sm">Authorised Representative Name</Label>
              <Input
                id="auth_rep_name"
                placeholder="If applicable"
                value={authorisedRepName}
                onChange={(e) => setAuthorisedRepName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="auth_rep_address" className="text-xs sm:text-sm">Authorised Rep Address</Label>
              <Input
                id="auth_rep_address"
                placeholder="EU address"
                value={authorisedRepAddress}
                onChange={(e) => setAuthorisedRepAddress(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Checklist */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Verification Checklist</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Verify each requirement before placing on market
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0 sm:pt-0">
          {Object.entries(IMPORTER_CHECKLIST_LABELS).map(([key, label]) => (
            <div key={key} className="space-y-2 border-b pb-3 sm:pb-4 last:border-0">
              <Label className="text-xs sm:text-sm font-medium leading-relaxed">{label}</Label>
              <RadioGroup
                value={checklistData[key] === null ? "" : checklistData[key] ? "yes" : "no"}
                onValueChange={(value) => setChecklistItem(key, value === "yes")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 min-h-[44px]">
                  <RadioGroupItem value="yes" id={`${key}-yes`} />
                  <Label htmlFor={`${key}-yes`} className="flex items-center gap-1 text-xs sm:text-sm text-emerald-600 cursor-pointer">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2 min-h-[44px]">
                  <RadioGroupItem value="no" id={`${key}-no`} />
                  <Label htmlFor={`${key}-no`} className="flex items-center gap-1 text-xs sm:text-sm text-destructive cursor-pointer">
                    <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <Textarea
            placeholder="Additional notes or observations..."
            className="min-h-[80px] sm:min-h-[100px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <Button variant="outline" onClick={handleSave} className="h-11 w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleComplete('non_compliant')}
          disabled={verification.status === 'compliant' || verification.status === 'non_compliant'}
          className="h-11 w-full sm:w-auto"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Non-Compliant
        </Button>
        <Button
          onClick={() => handleComplete('compliant')}
          disabled={verification.status === 'compliant' || verification.status === 'non_compliant'}
          className="h-11 w-full sm:w-auto"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Compliant
        </Button>
      </div>
    </div>
  );
}
