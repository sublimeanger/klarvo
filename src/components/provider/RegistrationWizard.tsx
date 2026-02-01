import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Send, CheckCircle2, Globe, Building2, FileCheck } from "lucide-react";
import { 
  useEURegistration, 
  useCreateEURegistration, 
  useUpdateEURegistration,
  useSubmitEURegistration,
  useConfirmEURegistration,
  REGISTRATION_STATUS_LABELS,
  EU_MEMBER_STATES,
  DEFAULT_REGISTRATION_DATA,
  type RegistrationStatus
} from "@/hooks/useEURegistration";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface RegistrationWizardProps {
  versionId?: string;
  organizationId?: string;
}

const statusColors: Record<RegistrationStatus, string> = {
  not_started: "bg-muted text-muted-foreground",
  draft: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  submitted: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  registered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  updated: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

export function RegistrationWizard({ versionId, organizationId }: RegistrationWizardProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("provider");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const { data: registration, isLoading } = useEURegistration(versionId);
  const createRegistration = useCreateEURegistration();
  const updateRegistration = useUpdateEURegistration();
  const submitRegistration = useSubmitEURegistration();
  const confirmRegistration = useConfirmEURegistration();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: DEFAULT_REGISTRATION_DATA
  });

  // Update form when registration loads
  useEffect(() => {
    if (registration?.registration_data) {
      const data = registration.registration_data as typeof DEFAULT_REGISTRATION_DATA;
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as any, value);
      });
      if (Array.isArray(data.member_states_available)) {
        setSelectedStates(data.member_states_available);
      }
    }
  }, [registration, setValue]);

  const handleStart = () => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    createRegistration.mutate({
      ai_system_version_id: versionId,
      organization_id: organizationId,
    });
  };

  const onSave = (data: typeof DEFAULT_REGISTRATION_DATA) => {
    if (!registration) return;

    updateRegistration.mutate({
      id: registration.id,
      registration_data: {
        ...data,
        member_states_available: selectedStates,
      },
    });
  };

  const handleSubmitRegistration = () => {
    if (!registration) return;
    submitRegistration.mutate({ id: registration.id });
  };

  const handleConfirmRegistration = (reference: string) => {
    if (!registration) return;
    confirmRegistration.mutate({ id: registration.id, euDatabaseReference: reference });
  };

  const toggleMemberState = (state: string) => {
    setSelectedStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

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

  if (!registration) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">EU Database Registration</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Article 49 registration in the EU database
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="text-center py-6 sm:py-8">
            <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground mb-4">No registration started.</p>
            <Button onClick={handleStart} className="h-11 w-full sm:w-auto">
              Start Registration
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4 sm:space-y-6">
      {/* Status Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">EU Database Registration</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Annex VIII registration requirements
              </CardDescription>
            </div>
            <Badge className={statusColors[registration.registration_status]}>
              {REGISTRATION_STATUS_LABELS[registration.registration_status]}
            </Badge>
          </div>
        </CardHeader>
        {registration.eu_database_reference && (
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">EU Database Reference</span>
              </div>
              <p className="text-base sm:text-lg font-mono text-emerald-600 dark:text-emerald-400 break-all">
                {registration.eu_database_reference}
              </p>
              {registration.registered_at && (
                <p className="text-xs sm:text-sm text-emerald-500 mt-1">
                  Registered on {format(new Date(registration.registered_at), "MMMM d, yyyy")}
                </p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Registration Form Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto gap-1">
          <TabsTrigger value="provider" className="text-xs sm:text-sm py-2">Provider</TabsTrigger>
          <TabsTrigger value="system" className="text-xs sm:text-sm py-2">System</TabsTrigger>
          <TabsTrigger value="classification" className="text-xs sm:text-sm py-2">Class</TabsTrigger>
          <TabsTrigger value="conformity" className="text-xs sm:text-sm py-2">Conformity</TabsTrigger>
          <TabsTrigger value="availability" className="text-xs sm:text-sm py-2 col-span-3 sm:col-span-1">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="provider" className="space-y-3 sm:space-y-4">
          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Provider Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="provider_name" className="text-xs sm:text-sm">Provider Name *</Label>
                  <Input id="provider_name" {...register("provider_name")} className="h-10" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="provider_contact_email" className="text-xs sm:text-sm">Contact Email</Label>
                  <Input id="provider_contact_email" type="email" {...register("provider_contact_email")} className="h-10" />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="provider_address" className="text-xs sm:text-sm">Provider Address *</Label>
                <Textarea id="provider_address" {...register("provider_address")} className="min-h-[80px]" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="provider_contact_phone" className="text-xs sm:text-sm">Contact Phone</Label>
                <Input id="provider_contact_phone" {...register("provider_contact_phone")} className="h-10" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Authorised Representative (if applicable)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="authorised_rep_name" className="text-xs sm:text-sm">Representative Name</Label>
                <Input id="authorised_rep_name" {...register("authorised_rep_name")} className="h-10" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="authorised_rep_address" className="text-xs sm:text-sm">Representative Address</Label>
                <Textarea id="authorised_rep_address" {...register("authorised_rep_address")} className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ai_system_name">AI System Name *</Label>
                  <Input id="ai_system_name" {...register("ai_system_name")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai_system_unique_id">Unique Identifier</Label>
                  <Input id="ai_system_unique_id" {...register("ai_system_unique_id")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="intended_purpose">Intended Purpose *</Label>
                <Textarea 
                  id="intended_purpose" 
                  placeholder="Describe the intended purpose of the AI system..."
                  {...register("intended_purpose")} 
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Market Status</Label>
                  <Input id="status" placeholder="e.g., placed_on_market" {...register("status")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_placement_date">First Placement Date</Label>
                  <Input id="first_placement_date" type="date" {...register("first_placement_date")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_high_risk" 
                  checked={watch("is_high_risk")}
                  onCheckedChange={(checked) => setValue("is_high_risk", checked as boolean)}
                />
                <Label htmlFor="is_high_risk">This is a high-risk AI system</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="high_risk_category">High-Risk Category (if applicable)</Label>
                <Input 
                  id="high_risk_category" 
                  placeholder="e.g., Annex III point 4(a) - employment"
                  {...register("high_risk_category")} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conformity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Conformity Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="conformity_assessment_body">Conformity Assessment Body</Label>
                <Input 
                  id="conformity_assessment_body" 
                  placeholder="Name of notified body (if applicable)"
                  {...register("conformity_assessment_body")} 
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="certificate_number">Certificate Number</Label>
                  <Input id="certificate_number" {...register("certificate_number")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificate_expiry">Certificate Expiry</Label>
                  <Input id="certificate_expiry" type="date" {...register("certificate_expiry")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Member States Availability
              </CardTitle>
              <CardDescription>
                Select all EU Member States where the AI system is or will be made available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {EU_MEMBER_STATES.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox 
                      id={state}
                      checked={selectedStates.includes(state)}
                      onCheckedChange={() => toggleMemberState(state)}
                    />
                    <Label htmlFor={state} className="text-sm cursor-pointer">{state}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input id="website_url" type="url" {...register("website_url")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions_url">Instructions for Use URL</Label>
                <Input id="instructions_url" type="url" {...register("instructions_url")} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <Button type="submit" variant="outline" className="h-11 w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        {registration.registration_status === 'draft' && (
          <Button type="button" onClick={handleSubmitRegistration} className="h-11 w-full sm:w-auto">
            <Send className="h-4 w-4 mr-2" />
            Submit to EU Database
          </Button>
        )}
      </div>
    </form>
  );
}
