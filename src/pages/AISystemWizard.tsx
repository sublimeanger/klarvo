import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCreateAISystem } from "@/hooks/useAISystems";
import { useVendors, useCreateVendor } from "@/hooks/useVendors";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import { useCreateBulkTasks } from "@/hooks/useTasks";
import { useAuth } from "@/contexts/AuthContext";
import { WizardProgress } from "@/components/ai-systems/wizard/WizardProgress";
import { QUICK_CAPTURE_STEPS, FULL_ASSESSMENT_STEPS } from "@/components/ai-systems/wizard/constants";
import { DEFAULT_WIZARD_DATA, type AISystemWizardData } from "@/components/ai-systems/wizard/types";
import { generateWizardTasks } from "@/lib/wizardTaskGenerator";

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
  const { user } = useAuth();
  const { vendors } = useVendors();
  const { members } = useOrgMembers();
  const createSystem = useCreateAISystem();
  const createVendor = useCreateVendor();
  const createBulkTasks = useCreateBulkTasks();

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<AISystemWizardData>({
    ...DEFAULT_WIZARD_DATA,
    primary_owner_id: user?.id || "",
  });
  const [createdSystemId, setCreatedSystemId] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFullAssessment = data.wizard_mode === "full_assessment";
  const steps = isFullAssessment ? FULL_ASSESSMENT_STEPS : QUICK_CAPTURE_STEPS;
  const currentStepDef = steps[currentStep];

  const isHighRisk = data.highrisk_screening_result === "high_risk_annex_iii" || 
                     data.highrisk_screening_result === "high_risk_product";
  const hasWorkplaceImpact = data.has_workplace_impact === "yes";
  const isPublicAuthority = data.is_public_authority === "yes" || data.provides_public_service === "yes";

  const updateData = useCallback((updates: Partial<AISystemWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStepDef?.key === "basics" && !data.name.trim()) {
      newErrors.name = "System name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      let vendorId = data.vendor_id === "new" || data.vendor_id === "internal" ? undefined : data.vendor_id || undefined;

      if (data.vendor_id === "new" && data.new_vendor_name) {
        const vendor = await createVendor.mutateAsync({ name: data.new_vendor_name });
        vendorId = vendor.id;
      }

      // Build the full payload with all wizard fields
      const result = await createSystem.mutateAsync({
        name: data.name,
        description: data.description || null,
        department: data.department || null,
        lifecycle_status: data.lifecycle_status,
        vendor_id: vendorId || null,
        primary_owner_id: data.primary_owner_id || null,
        backup_owner_id: data.backup_owner_id || null,
        internal_reference_id: data.internal_reference_id || null,
        wizard_mode: data.wizard_mode,
        wizard_completed_at: new Date().toISOString(),
        // Geography & Scope
        deployment_regions: data.deployment_regions.length ? data.deployment_regions : null,
        eu_countries: data.eu_countries.length ? data.eu_countries : null,
        internal_user_groups: data.internal_user_groups.length ? data.internal_user_groups : null,
        affected_groups: data.affected_groups.length ? data.affected_groups : null,
        is_customer_facing: data.is_customer_facing === "yes",
        has_workplace_impact: data.has_workplace_impact === "yes",
        has_legal_effects: data.has_legal_effects === "yes",
        summary: data.summary || null,
        // Value Chain
        built_internally: data.built_internally || null,
        acquisition_method: data.acquisition_method.length ? data.acquisition_method : null,
        value_chain_role: data.value_chain_role.length ? data.value_chain_role : null,
        is_externally_offered: data.is_externally_offered === "yes",
        foundation_model: data.foundation_model || null,
        contract_url: data.contract_url || null,
        // AI Definition Test
        infers_outputs: data.infers_outputs || null,
        output_types: data.output_types.length ? data.output_types : null,
        operates_autonomously: data.operates_autonomously || null,
        adapts_after_deployment: data.adapts_after_deployment || null,
        technical_approach: data.technical_approach.length ? data.technical_approach : null,
        ai_definition_result: data.ai_definition_result || null,
        ai_definition_rationale: data.ai_definition_rationale || null,
        ai_definition_reviewer_id: data.ai_definition_reviewer_id || null,
        ai_definition_confidence: data.ai_definition_confidence || null,
        // Use Case
        purpose_category: data.purpose_category || null,
        workflow_description: data.workflow_description || null,
        output_action_type: data.output_action_type || null,
        output_destinations: data.output_destinations.length ? data.output_destinations : null,
        human_involvement: data.human_involvement || null,
        override_capability: data.override_capability || null,
        usage_frequency: data.usage_frequency || null,
        impact_scale: data.impact_scale || null,
        // Prohibited Screening
        prohibited_manipulation: data.prohibited_manipulation || null,
        prohibited_exploitation: data.prohibited_exploitation || null,
        prohibited_social_scoring: data.prohibited_social_scoring || null,
        prohibited_criminal_profiling: data.prohibited_criminal_profiling || null,
        prohibited_facial_scraping: data.prohibited_facial_scraping || null,
        prohibited_emotion_inference: data.prohibited_emotion_inference || null,
        prohibited_biometric_categorisation: data.prohibited_biometric_categorisation || null,
        prohibited_realtime_biometric: data.prohibited_realtime_biometric || null,
        prohibited_screening_notes: data.prohibited_screening_notes || null,
        prohibited_screening_result: data.prohibited_screening_result || null,
        // High-Risk Screening
        highrisk_biometric: data.highrisk_biometric || null,
        highrisk_critical_infrastructure: data.highrisk_critical_infrastructure || null,
        highrisk_education: data.highrisk_education || null,
        highrisk_employment: data.highrisk_employment || null,
        highrisk_essential_services: data.highrisk_essential_services || null,
        highrisk_law_enforcement: data.highrisk_law_enforcement || null,
        highrisk_migration: data.highrisk_migration || null,
        highrisk_justice: data.highrisk_justice || null,
        highrisk_safety_component: data.highrisk_safety_component || null,
        highrisk_screening_notes: data.highrisk_screening_notes || null,
        highrisk_screening_result: data.highrisk_screening_result || null,
        // Transparency
        transparency_direct_interaction: data.transparency_direct_interaction || null,
        transparency_obvious_ai: data.transparency_obvious_ai || null,
        transparency_synthetic_content: data.transparency_synthetic_content || null,
        transparency_outputs_marked: data.transparency_outputs_marked || null,
        transparency_emotion_recognition: data.transparency_emotion_recognition || null,
        transparency_deepfake: data.transparency_deepfake || null,
        transparency_public_text: data.transparency_public_text || null,
        transparency_status: data.transparency_status || null,
        transparency_notes: data.transparency_notes || null,
        // Data & Privacy
        processes_personal_data: data.processes_personal_data || null,
        special_category_data: data.special_category_data || null,
        involves_minors: data.involves_minors || null,
        data_sources: data.data_sources.length ? data.data_sources : null,
        data_under_control: data.data_under_control || null,
        input_retention_period: data.input_retention_period || null,
        output_retention_period: data.output_retention_period || null,
        dpia_status: data.dpia_status || null,
        dpia_url: data.dpia_url || null,
        privacy_owner_id: data.privacy_owner_id || null,
        // Human Oversight
        oversight_model: data.oversight_model || null,
        oversight_owner_id: data.oversight_owner_id || null,
        has_stop_authority: data.has_stop_authority === "yes",
        competence_requirements: data.competence_requirements || null,
        operators_trained: data.operators_trained || null,
        oversight_sop_status: data.oversight_sop_status || null,
        monitoring_plan_status: data.monitoring_plan_status || null,
        monitoring_metrics: data.monitoring_metrics.length ? data.monitoring_metrics : null,
        // Logging
        has_automatic_logs: data.has_automatic_logs || null,
        log_storage_location: data.log_storage_location || null,
        log_access_roles: data.log_access_roles.length ? data.log_access_roles : null,
        log_retention_period: data.log_retention_period || null,
        can_export_logs: data.can_export_logs || null,
        log_retention_6_months_confirmed: data.log_retention_6_months_confirmed === "yes",
        // Incidents
        incident_process_status: data.incident_process_status || null,
        severity_levels_defined: data.severity_levels_defined === "yes",
        internal_notification_list: data.internal_notification_list.length ? data.internal_notification_list : null,
        external_notification_requirements: data.external_notification_requirements || null,
        can_suspend_quickly: data.can_suspend_quickly || null,
        // Workplace
        worker_notification_status: data.worker_notification_status || null,
        // Public Authority
        is_public_authority: data.is_public_authority === "yes",
        provides_public_service: data.provides_public_service === "yes",
        registration_status: data.registration_status || null,
        // Training
        staff_roles: data.staff_roles.length ? data.staff_roles : null,
        training_exists: data.training_exists || null,
        training_completion_status: data.training_completion_status || null,
        // FRIA
        fria_trigger_status: data.fria_trigger_status || null,
        fria_status: data.fria_status || null,
        // Sign-off
        final_classification: data.final_classification || null,
        signoff_reviewer_id: data.signoff_reviewer_id || null,
        signoff_date: isFullAssessment ? new Date().toISOString() : null,
        signoff_notes: data.signoff_notes || null,
      });

      setCreatedSystemId(result.id);

      // Generate and create compliance tasks
      const tasks = generateWizardTasks(data, result.id, data.name);
      if (tasks.length > 0) {
        await createBulkTasks.mutateAsync(tasks);
      }

      setCurrentStep(steps.length - 1); // Go to Done step
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleReset = () => {
    setData({ ...DEFAULT_WIZARD_DATA, primary_owner_id: user?.id || "" });
    setCurrentStep(0);
    setCreatedSystemId(undefined);
    setErrors({});
  };

  const renderStep = () => {
    switch (currentStepDef?.key) {
      case "mode": return <Step0ModeSelection value={data.wizard_mode} onChange={(mode) => updateData({ wizard_mode: mode })} />;
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
      case "fria": return <Step18FRIA data={data} onChange={updateData} isHighRisk={isHighRisk} isPublicAuthority={isPublicAuthority} aiSystemId={createdSystemId} />;
      case "signoff": return <Step19Signoff data={data} onChange={updateData} members={members} />;
      case "done": return <Step20Done data={data} onReset={handleReset} createdSystemId={createdSystemId} />;
      default: return null;
    }
  };

  const isSubmitting = createSystem.isPending || createVendor.isPending;
  const isLastInputStep = currentStep === steps.length - 2; // Before "done" step
  const isDoneStep = currentStepDef?.key === "done";

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/ai-systems")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add AI System</h1>
          <p className="text-muted-foreground">
            {isFullAssessment ? "Full Assessment — complete EU AI Act classification" : "Quick capture — essential details only"}
          </p>
        </div>
      </div>

      {!isDoneStep && <WizardProgress steps={steps} currentStep={currentStep} />}

      <Card>
        <CardHeader>
          <CardTitle>{currentStepDef?.title}</CardTitle>
          <CardDescription>{currentStepDef?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}

          {!isDoneStep && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              {isLastInputStep ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isFullAssessment ? "Complete Assessment" : "Create AI System"}
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
