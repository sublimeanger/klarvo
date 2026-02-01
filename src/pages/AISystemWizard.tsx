import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, CloudOff, Cloud, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useVendors, useCreateVendor } from "@/hooks/useVendors";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import { useCreateBulkTasks } from "@/hooks/useTasks";
import { useWizardDraft } from "@/hooks/useWizardDraft";
import { WizardProgress } from "@/components/ai-systems/wizard/WizardProgress";
import { QUICK_CAPTURE_STEPS, FULL_ASSESSMENT_STEPS } from "@/components/ai-systems/wizard/constants";
import { generateWizardTasks } from "@/lib/wizardTaskGenerator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { ExtractedSystemData } from "@/hooks/useAISystemIntake";

// Step components
import { Step0ModeSelection } from "@/components/ai-systems/wizard/steps/Step0ModeSelection";
import { Step1Basics } from "@/components/ai-systems/wizard/steps/Step1Basics";
import { Step2Vendor } from "@/components/ai-systems/wizard/steps/Step2Vendor";
import { Step3Ownership } from "@/components/ai-systems/wizard/steps/Step3Ownership";
import { Step4Scope } from "@/components/ai-systems/wizard/steps/Step4Scope";
import { Step5ValueChain } from "@/components/ai-systems/wizard/steps/Step5ValueChain";
import { Step6AIDefinition } from "@/components/ai-systems/wizard/steps/Step6AIDefinition";
import { Step7UseCase } from "@/components/ai-systems/wizard/steps/Step7UseCase";
import { Step8Prohibited } from "@/components/ai-systems/wizard/steps/Step8Prohibited";
import { Step9HighRisk } from "@/components/ai-systems/wizard/steps/Step9HighRisk";
import { Step10Transparency } from "@/components/ai-systems/wizard/steps/Step10Transparency";
import { Step11DataPrivacy } from "@/components/ai-systems/wizard/steps/Step11DataPrivacy";
import { Step12Oversight } from "@/components/ai-systems/wizard/steps/Step12Oversight";
import { Step13Logging } from "@/components/ai-systems/wizard/steps/Step13Logging";
import { Step14Incidents } from "@/components/ai-systems/wizard/steps/Step14Incidents";
import { Step15Workplace } from "@/components/ai-systems/wizard/steps/Step15Workplace";
import { Step16Authority } from "@/components/ai-systems/wizard/steps/Step16Authority";
import { Step17Training } from "@/components/ai-systems/wizard/steps/Step17Training";
import { Step18FRIA } from "@/components/ai-systems/wizard/steps/Step18FRIA";
import { Step19Signoff } from "@/components/ai-systems/wizard/steps/Step19Signoff";
import { Step20Done } from "@/components/ai-systems/wizard/steps/Step20Done";

export default function AISystemWizard() {
  const navigate = useNavigate();
  const { vendors } = useVendors();
  const { members } = useOrgMembers();
  const createVendor = useCreateVendor();
  const createBulkTasks = useCreateBulkTasks();

  const {
    data,
    updateData,
    currentStep,
    draftId,
    isLoading,
    isSaving,
    lastSaved,
    completeDraft,
    resetDraft,
    handleNext,
    handleBack,
  } = useWizardDraft();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSystemId, setCreatedSystemId] = useState<string>();

  const isFullAssessment = data.wizard_mode === "full_assessment";
  const steps = isFullAssessment ? FULL_ASSESSMENT_STEPS : QUICK_CAPTURE_STEPS;
  const currentStepDef = steps[currentStep];

  const isHighRisk = data.highrisk_screening_result === "high_risk_annex_iii" || 
                     data.highrisk_screening_result === "high_risk_product";
  const hasWorkplaceImpact = data.has_workplace_impact === "yes";
  const isPublicAuthority = data.is_public_authority === "yes" || data.provides_public_service === "yes";

  const validateStep = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (currentStepDef?.key === "basics" && !data.name.trim()) {
      newErrors.name = "System name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStepDef?.key, data.name]);

  const handleNextClick = useCallback(async () => {
    if (!validateStep()) return;
    await handleNext();
  }, [validateStep, handleNext]);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // Handle new vendor creation if needed
      let vendorId = data.vendor_id;
      if (data.vendor_id === "new" && data.new_vendor_name) {
        const vendor = await createVendor.mutateAsync({ name: data.new_vendor_name });
        vendorId = vendor.id;
        updateData({ vendor_id: vendorId });
      }

      // Complete the draft (marks wizard_completed_at)
      const result = await completeDraft();
      
      if (!result) {
        throw new Error("Failed to complete assessment");
      }

      setCreatedSystemId(result.id);

      // Generate and create compliance tasks
      const tasks = generateWizardTasks(data, result.id, data.name);
      if (tasks.length > 0) {
        try {
          await createBulkTasks.mutateAsync(tasks);
        } catch (taskError) {
          console.error("Failed to create tasks:", taskError);
          toast.error("AI system saved, but failed to create some tasks");
        }
      }

      toast.success("AI system created successfully");
      
      // Move to done step
      // Note: We use direct step setting here as the wizard is complete
      window.location.hash = "#done";
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to complete assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetDraft();
    setCreatedSystemId(undefined);
    setErrors({});
  };

  // Handle AI-extracted data from NaturalLanguageIntake
  const handleAIExtract = useCallback((extractedData: Partial<ExtractedSystemData>) => {
    // Map extracted fields to wizard data structure
    const mappedData: Record<string, unknown> = {
      wizard_mode: "full_assessment", // Switch to full assessment for review
    };

    // Map all extracted fields
    if (extractedData.name) mappedData.name = extractedData.name;
    if (extractedData.description) mappedData.description = extractedData.description;
    if (extractedData.department) mappedData.department = extractedData.department;
    if (extractedData.deployment_regions) mappedData.deployment_regions = extractedData.deployment_regions;
    if (extractedData.eu_countries) mappedData.eu_countries = extractedData.eu_countries;
    if (extractedData.internal_user_groups) mappedData.internal_user_groups = extractedData.internal_user_groups;
    if (extractedData.affected_groups) mappedData.affected_groups = extractedData.affected_groups;
    if (extractedData.is_customer_facing !== undefined && extractedData.is_customer_facing !== null) mappedData.is_customer_facing = extractedData.is_customer_facing;
    if (extractedData.has_workplace_impact !== undefined && extractedData.has_workplace_impact !== null) mappedData.has_workplace_impact = extractedData.has_workplace_impact;
    if (extractedData.has_legal_effects !== undefined && extractedData.has_legal_effects !== null) mappedData.has_legal_effects = extractedData.has_legal_effects;
    if (extractedData.summary) mappedData.summary = extractedData.summary;
    if (extractedData.built_internally) mappedData.built_internally = extractedData.built_internally;
    if (extractedData.acquisition_method) mappedData.acquisition_method = extractedData.acquisition_method;
    if (extractedData.value_chain_role) mappedData.value_chain_role = extractedData.value_chain_role;
    if (extractedData.purpose_category) mappedData.purpose_category = extractedData.purpose_category;
    if (extractedData.human_involvement) mappedData.human_involvement = extractedData.human_involvement;
    if (extractedData.processes_personal_data) mappedData.processes_personal_data = extractedData.processes_personal_data;
    if (extractedData.data_sources) mappedData.data_sources = extractedData.data_sources;
    if (extractedData.highrisk_employment) mappedData.highrisk_employment = extractedData.highrisk_employment;
    if (extractedData.highrisk_essential_services) mappedData.highrisk_essential_services = extractedData.highrisk_essential_services;
    if (extractedData.highrisk_biometric) mappedData.highrisk_biometric = extractedData.highrisk_biometric;
    if (extractedData.highrisk_education) mappedData.highrisk_education = extractedData.highrisk_education;
    if (extractedData.transparency_direct_interaction) mappedData.transparency_direct_interaction = extractedData.transparency_direct_interaction;
    if (extractedData.transparency_synthetic_content) mappedData.transparency_synthetic_content = extractedData.transparency_synthetic_content;
    if (extractedData.output_types) mappedData.output_types = extractedData.output_types;
    if (extractedData.technical_approach) mappedData.technical_approach = extractedData.technical_approach;

    updateData(mappedData);
    toast.success(`${Object.keys(mappedData).length - 1} fields pre-filled from AI analysis`);
    
    // Move to step 1 (basics) to review the extracted data
    handleNext();
  }, [updateData, handleNext]);

  const renderStep = () => {
    switch (currentStepDef?.key) {
      case "mode": return <Step0ModeSelection value={data.wizard_mode} onChange={(mode) => updateData({ wizard_mode: mode })} onAIExtract={handleAIExtract} />;
      case "basics": return <Step1Basics data={data} onChange={updateData} errors={errors} />;
      case "vendor": return <Step2Vendor data={data} onChange={updateData} vendors={vendors} />;
      case "ownership": return <Step3Ownership data={data} onChange={updateData} members={members} isFullAssessment={isFullAssessment} />;
      case "scope": return <Step4Scope data={data} onChange={updateData} />;
      case "value_chain": return <Step5ValueChain data={data} onChange={updateData} />;
      case "definition": return <Step6AIDefinition data={data} onChange={updateData} members={members} />;
      case "use_case": return <Step7UseCase data={data} onChange={updateData} />;
      case "prohibited": return <Step8Prohibited data={data} onChange={updateData} />;
      case "high_risk": return <Step9HighRisk data={data} onChange={updateData} />;
      case "transparency": return <Step10Transparency data={data} onChange={updateData} />;
      case "data_privacy": return <Step11DataPrivacy data={data} onChange={updateData} members={members} />;
      case "oversight": return <Step12Oversight data={data} onChange={updateData} members={members} />;
      case "logging": return <Step13Logging data={data} onChange={updateData} isHighRisk={isHighRisk} />;
      case "incidents": return <Step14Incidents data={data} onChange={updateData} />;
      case "workplace": return <Step15Workplace data={data} onChange={updateData} hasWorkplaceImpact={hasWorkplaceImpact} isHighRisk={isHighRisk} />;
      case "authority": return <Step16Authority data={data} onChange={updateData} isHighRisk={isHighRisk} />;
      case "training": return <Step17Training data={data} onChange={updateData} />;
      case "fria": return <Step18FRIA data={data} onChange={updateData} isHighRisk={isHighRisk} isPublicAuthority={isPublicAuthority} aiSystemId={createdSystemId || draftId || undefined} />;
      case "signoff": return <Step19Signoff data={data} onChange={updateData} members={members} />;
      case "done": return <Step20Done data={data} onReset={handleReset} createdSystemId={createdSystemId || draftId || undefined} />;
      default: return null;
    }
  };

  const isLastInputStep = currentStep === steps.length - 2; // Before "done" step
  const isDoneStep = currentStepDef?.key === "done";

  // Show loading state while fetching existing draft
  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 animate-fade-up">
        <div className="flex items-center gap-3 sm:gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-2 w-full" />
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Button variant="ghost" size="icon" onClick={() => navigate("/ai-systems")} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">
              {draftId ? "Continue Assessment" : "Add AI System"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground truncate">
              {isFullAssessment ? "Full Assessment — EU AI Act classification" : "Quick capture — essential details"}
            </p>
          </div>
        </div>
        
        {/* Auto-save indicator */}
        {draftId && !isDoneStep && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : lastSaved ? (
            <>
                <Check className="h-3 w-3 text-primary" />
                <span className="hidden sm:inline">Draft saved</span>
              </>
            ) : (
              <>
                <CloudOff className="h-3 w-3" />
                <span className="hidden sm:inline">Not saved</span>
              </>
            )}
          </div>
        )}
      </div>

      {!isDoneStep && <WizardProgress steps={steps} currentStep={currentStep} />}

      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">{currentStepDef?.title}</CardTitle>
          <CardDescription className="text-sm">{currentStepDef?.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {renderStep()}

          {!isDoneStep && (
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStep === 0 || isSaving}
                className="h-11 sm:h-10 px-4 sm:px-6"
              >
                <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Back</span>
              </Button>

              {isLastInputStep ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || isSaving}
                  className="h-11 sm:h-10 px-4 sm:px-6 flex-1 sm:flex-initial"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-1.5 sm:mr-2 h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{isFullAssessment ? "Complete Assessment" : "Create AI System"}</span>
                  <span className="sm:hidden">{isFullAssessment ? "Complete" : "Create"}</span>
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleNextClick} 
                  disabled={isSaving}
                  className="h-11 sm:h-10 px-4 sm:px-6 flex-1 sm:flex-initial"
                >
                  {isSaving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                  <span>Next</span>
                  <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
