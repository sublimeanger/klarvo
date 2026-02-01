import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, FileCheck, Download, CheckCircle2 } from "lucide-react";
import { 
  useEUDeclaration, 
  useCreateEUDeclaration, 
  useSignEUDeclaration,
  useUpdateEUDeclaration,
  DEFAULT_CONFORMITY_STATEMENT
} from "@/hooks/useEUDeclaration";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface DeclarationFormProps {
  versionId?: string;
  organizationId?: string;
}

interface DeclarationFormData {
  ai_system_name: string;
  ai_system_type: string;
  traceable_reference: string;
  provider_name: string;
  provider_address: string;
  conformity_statement: string;
  harmonised_standards: string;
  common_specifications: string;
  notified_body_name: string;
  notified_body_number: string;
  notified_body_certificate: string;
  place_of_issue: string;
  signatory_name: string;
  signatory_position: string;
}

export function DeclarationForm({ versionId, organizationId }: DeclarationFormProps) {
  const { toast } = useToast();
  const [isSigning, setIsSigning] = useState(false);

  const { data: declaration, isLoading } = useEUDeclaration(versionId);
  const createDeclaration = useCreateEUDeclaration();
  const updateDeclaration = useUpdateEUDeclaration();
  const signDeclaration = useSignEUDeclaration();

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<DeclarationFormData>({
    defaultValues: {
      ai_system_name: "",
      ai_system_type: "",
      traceable_reference: "",
      provider_name: "",
      provider_address: "",
      conformity_statement: DEFAULT_CONFORMITY_STATEMENT,
      harmonised_standards: "",
      common_specifications: "",
      notified_body_name: "",
      notified_body_number: "",
      notified_body_certificate: "",
      place_of_issue: "",
      signatory_name: "",
      signatory_position: "",
    }
  });

  // Update form when declaration loads
  useEffect(() => {
    if (declaration) {
      reset({
        ai_system_name: declaration.ai_system_name || "",
        ai_system_type: declaration.ai_system_type || "",
        traceable_reference: declaration.traceable_reference || "",
        provider_name: declaration.provider_name || "",
        provider_address: declaration.provider_address || "",
        conformity_statement: declaration.conformity_statement || DEFAULT_CONFORMITY_STATEMENT,
        harmonised_standards: Array.isArray(declaration.harmonised_standards) 
          ? declaration.harmonised_standards.join(", ") 
          : "",
        common_specifications: Array.isArray(declaration.common_specifications) 
          ? declaration.common_specifications.join(", ") 
          : "",
        notified_body_name: declaration.notified_body_name || "",
        notified_body_number: declaration.notified_body_number || "",
        notified_body_certificate: declaration.notified_body_certificate || "",
        place_of_issue: declaration.place_of_issue || "",
        signatory_name: declaration.signatory_name || "",
        signatory_position: declaration.signatory_position || "",
      });
    }
  }, [declaration, reset]);

  const onSave = async (data: DeclarationFormData) => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    const payload = {
      ai_system_name: data.ai_system_name,
      ai_system_type: data.ai_system_type,
      traceable_reference: data.traceable_reference,
      provider_name: data.provider_name,
      provider_address: data.provider_address,
      conformity_statement: data.conformity_statement,
      harmonised_standards: data.harmonised_standards.split(",").map(s => s.trim()).filter(Boolean),
      common_specifications: data.common_specifications.split(",").map(s => s.trim()).filter(Boolean),
      notified_body_name: data.notified_body_name,
      notified_body_number: data.notified_body_number,
      notified_body_certificate: data.notified_body_certificate,
      place_of_issue: data.place_of_issue,
      signatory_name: data.signatory_name,
      signatory_position: data.signatory_position,
    };

    if (declaration) {
      updateDeclaration.mutate({
        id: declaration.id,
        ...payload,
      });
    } else {
      createDeclaration.mutate({
        ai_system_version_id: versionId,
        organization_id: organizationId,
        ...payload,
      });
    }
  };

  const handleSign = () => {
    if (!declaration) return;
    
    setIsSigning(true);
    signDeclaration.mutate({
      id: declaration.id,
      signatoryName: declaration.signatory_name || "",
      signatoryPosition: declaration.signatory_position || "",
    }, {
      onSettled: () => setIsSigning(false)
    });
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

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4 sm:space-y-6">
      {/* Status Card */}
      {declaration?.signed_at && (
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950 rounded-xl">
          <CardContent className="py-3 sm:py-4 p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-medium text-emerald-700 dark:text-emerald-300">Declaration Signed</p>
                <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  Signed on {format(new Date(declaration.signed_at), "MMMM d, yyyy 'at' HH:mm")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI System Information */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">1. AI System Information</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Details of the AI system covered by this declaration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="ai_system_name" className="text-xs sm:text-sm">AI System Name *</Label>
              <Input
                id="ai_system_name"
                placeholder="Name of the AI system"
                {...register("ai_system_name")}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="ai_system_type" className="text-xs sm:text-sm">Type / Model</Label>
              <Input
                id="ai_system_type"
                placeholder="Type or model designation"
                {...register("ai_system_type")}
                className="h-10"
              />
            </div>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="traceable_reference" className="text-xs sm:text-sm">Unique Identifier</Label>
            <Input
              id="traceable_reference"
              placeholder="Serial number, product code, or other identifier"
              {...register("traceable_reference")}
              className="h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Provider Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">2. Provider Information</CardTitle>
          <CardDescription>
            Name and address of the provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider_name">Provider Name *</Label>
            <Input
              id="provider_name"
              placeholder="Legal name of the provider"
              {...register("provider_name")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider_address">Provider Address *</Label>
            <Textarea
              id="provider_address"
              placeholder="Full registered address"
              {...register("provider_address")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Conformity Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">3. Declaration of Conformity</CardTitle>
          <CardDescription>
            Statement declaring conformity with the EU AI Act
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="conformity_statement">Conformity Statement *</Label>
            <Textarea
              id="conformity_statement"
              className="min-h-[100px]"
              {...register("conformity_statement")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Standards & Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">4. Standards & Specifications Applied</CardTitle>
          <CardDescription>
            References to relevant harmonised standards or common specifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="harmonised_standards">Harmonised Standards</Label>
            <Textarea
              id="harmonised_standards"
              placeholder="List harmonised standards applied (comma-separated)"
              {...register("harmonised_standards")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="common_specifications">Common Specifications</Label>
            <Textarea
              id="common_specifications"
              placeholder="List common specifications applied (comma-separated)"
              {...register("common_specifications")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notified Body */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">5. Notified Body (if applicable)</CardTitle>
          <CardDescription>
            For conformity assessments involving a notified body
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="notified_body_name">Notified Body Name</Label>
              <Input
                id="notified_body_name"
                placeholder="Name of notified body"
                {...register("notified_body_name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notified_body_number">Notified Body Number</Label>
              <Input
                id="notified_body_number"
                placeholder="e.g., NB 1234"
                {...register("notified_body_number")}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notified_body_certificate">Certificate Number</Label>
            <Input
              id="notified_body_certificate"
              placeholder="Certificate or approval number"
              {...register("notified_body_certificate")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">6. Signature</CardTitle>
          <CardDescription>
            Signed for and on behalf of the provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="place_of_issue">Place of Issue</Label>
              <Input
                id="place_of_issue"
                placeholder="City, Country"
                {...register("place_of_issue")}
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Issue</Label>
              <Input
                value={declaration?.signed_at ? format(new Date(declaration.signed_at), "yyyy-MM-dd") : "Not yet signed"}
                disabled
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signatory_name">Signatory Name</Label>
              <Input
                id="signatory_name"
                placeholder="Full name of signatory"
                {...register("signatory_name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signatory_position">Position / Title</Label>
              <Input
                id="signatory_position"
                placeholder="e.g., CEO, CTO, Compliance Director"
                {...register("signatory_position")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3">
        <Button type="button" variant="outline" disabled={!declaration} className="h-11 w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button type="submit" variant="outline" disabled={!isDirty} className="h-11 w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            type="button" 
            onClick={handleSign}
            disabled={!declaration || !!declaration.signed_at || isSigning}
            className="h-11 w-full sm:w-auto"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            {declaration?.signed_at ? "Signed" : "Sign Declaration"}
          </Button>
        </div>
      </div>
    </form>
  );
}
