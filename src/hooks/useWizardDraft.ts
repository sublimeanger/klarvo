import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { DEFAULT_WIZARD_DATA, type AISystemWizardData } from "@/components/ai-systems/wizard/types";

/**
 * Hook to manage wizard draft state with auto-save to database.
 * Creates a draft on first meaningful input, then auto-saves on each step change.
 */
export function useWizardDraft() {
  const { profile, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [draftId, setDraftId] = useState<string | null>(searchParams.get("draft"));
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<AISystemWizardData>({
    ...DEFAULT_WIZARD_DATA,
    primary_owner_id: user?.id || "",
  });
  const [isLoading, setIsLoading] = useState(!!searchParams.get("draft"));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Track if initial load is complete
  const initialLoadComplete = useRef(false);
  // Track last saved data to avoid unnecessary saves
  const lastSavedData = useRef<string>("");

  // Load existing draft on mount
  useEffect(() => {
    const existingDraftId = searchParams.get("draft");
    if (existingDraftId && !initialLoadComplete.current) {
      loadDraft(existingDraftId);
    } else {
      initialLoadComplete.current = true;
    }
  }, [searchParams]);

  const loadDraft = async (id: string) => {
    setIsLoading(true);
    try {
      const { data: draft, error } = await supabase
        .from("ai_systems")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      
      if (draft && !draft.wizard_completed_at) {
        // Map database fields back to wizard data structure
        const wizardData: AISystemWizardData = {
          wizard_mode: (draft.wizard_mode as "quick_capture" | "full_assessment") || "quick_capture",
          name: draft.name || "",
          internal_reference_id: draft.internal_reference_id || "",
          description: draft.description || "",
          department: draft.department || "",
          lifecycle_status: draft.lifecycle_status || "draft",
          primary_owner_id: draft.primary_owner_id || "",
          backup_owner_id: draft.backup_owner_id || "",
          vendor_id: draft.vendor_id || "",
          new_vendor_name: "",
          // Scope
          deployment_regions: draft.deployment_regions || [],
          eu_countries: draft.eu_countries || [],
          internal_user_groups: draft.internal_user_groups || [],
          affected_groups: draft.affected_groups || [],
          is_customer_facing: draft.is_customer_facing ? "yes" : "",
          has_workplace_impact: draft.has_workplace_impact ? "yes" : "",
          has_legal_effects: draft.has_legal_effects ? "yes" : "",
          summary: draft.summary || "",
          // Value Chain
          built_internally: draft.built_internally || "",
          acquisition_method: draft.acquisition_method || [],
          value_chain_role: draft.value_chain_role || [],
          is_externally_offered: draft.is_externally_offered ? "yes" : "",
          foundation_model: draft.foundation_model || "",
          contract_url: draft.contract_url || "",
          // AI Definition
          infers_outputs: draft.infers_outputs || "",
          output_types: draft.output_types || [],
          operates_autonomously: draft.operates_autonomously || "",
          adapts_after_deployment: draft.adapts_after_deployment || "",
          technical_approach: draft.technical_approach || [],
          ai_definition_result: draft.ai_definition_result || "",
          ai_definition_rationale: draft.ai_definition_rationale || "",
          ai_definition_reviewer_id: draft.ai_definition_reviewer_id || "",
          ai_definition_confidence: draft.ai_definition_confidence || "",
          // Use Case
          purpose_category: draft.purpose_category || "",
          workflow_description: draft.workflow_description || "",
          output_action_type: draft.output_action_type || "",
          output_destinations: draft.output_destinations || [],
          human_involvement: draft.human_involvement || "",
          override_capability: draft.override_capability || "",
          usage_frequency: draft.usage_frequency || "",
          impact_scale: draft.impact_scale || null,
          // Prohibited
          prohibited_manipulation: draft.prohibited_manipulation || "",
          prohibited_exploitation: draft.prohibited_exploitation || "",
          prohibited_social_scoring: draft.prohibited_social_scoring || "",
          prohibited_criminal_profiling: draft.prohibited_criminal_profiling || "",
          prohibited_facial_scraping: draft.prohibited_facial_scraping || "",
          prohibited_emotion_inference: draft.prohibited_emotion_inference || "",
          prohibited_biometric_categorisation: draft.prohibited_biometric_categorisation || "",
          prohibited_realtime_biometric: draft.prohibited_realtime_biometric || "",
          prohibited_screening_notes: draft.prohibited_screening_notes || "",
          prohibited_screening_result: draft.prohibited_screening_result || "",
          // High Risk
          highrisk_biometric: draft.highrisk_biometric || "",
          highrisk_critical_infrastructure: draft.highrisk_critical_infrastructure || "",
          highrisk_education: draft.highrisk_education || "",
          highrisk_employment: draft.highrisk_employment || "",
          highrisk_essential_services: draft.highrisk_essential_services || "",
          highrisk_law_enforcement: draft.highrisk_law_enforcement || "",
          highrisk_migration: draft.highrisk_migration || "",
          highrisk_justice: draft.highrisk_justice || "",
          highrisk_safety_component: draft.highrisk_safety_component || "",
          highrisk_screening_notes: draft.highrisk_screening_notes || "",
          highrisk_screening_result: draft.highrisk_screening_result || "",
          // Transparency
          transparency_direct_interaction: draft.transparency_direct_interaction || "",
          transparency_obvious_ai: draft.transparency_obvious_ai || "",
          transparency_synthetic_content: draft.transparency_synthetic_content || "",
          transparency_outputs_marked: draft.transparency_outputs_marked || "",
          transparency_emotion_recognition: draft.transparency_emotion_recognition || "",
          transparency_deepfake: draft.transparency_deepfake || "",
          transparency_public_text: draft.transparency_public_text || "",
          transparency_status: draft.transparency_status || "",
          transparency_notes: draft.transparency_notes || "",
          // Data Privacy
          processes_personal_data: draft.processes_personal_data || "",
          special_category_data: draft.special_category_data || "",
          involves_minors: draft.involves_minors || "",
          data_sources: draft.data_sources || [],
          data_under_control: draft.data_under_control || "",
          input_retention_period: draft.input_retention_period || "",
          output_retention_period: draft.output_retention_period || "",
          dpia_status: draft.dpia_status || "",
          dpia_url: draft.dpia_url || "",
          privacy_owner_id: draft.privacy_owner_id || "",
          // Oversight
          oversight_model: draft.oversight_model || "",
          oversight_owner_id: draft.oversight_owner_id || "",
          has_stop_authority: draft.has_stop_authority ? "yes" : "",
          competence_requirements: draft.competence_requirements || "",
          operators_trained: draft.operators_trained || "",
          oversight_sop_status: draft.oversight_sop_status || "",
          monitoring_plan_status: draft.monitoring_plan_status || "",
          monitoring_metrics: draft.monitoring_metrics || [],
          // Logging
          has_automatic_logs: draft.has_automatic_logs || "",
          log_storage_location: draft.log_storage_location || "",
          log_access_roles: draft.log_access_roles || [],
          log_retention_period: draft.log_retention_period || "",
          can_export_logs: draft.can_export_logs || "",
          log_retention_6_months_confirmed: draft.log_retention_6_months_confirmed ? "yes" : "",
          // Incidents
          incident_process_status: draft.incident_process_status || "",
          severity_levels_defined: draft.severity_levels_defined ? "yes" : "",
          internal_notification_list: draft.internal_notification_list || [],
          external_notification_requirements: draft.external_notification_requirements || "",
          can_suspend_quickly: draft.can_suspend_quickly || "",
          // Workplace
          worker_notification_status: draft.worker_notification_status || "",
          // Authority
          is_public_authority: draft.is_public_authority ? "yes" : "",
          provides_public_service: draft.provides_public_service ? "yes" : "",
          registration_status: draft.registration_status || "",
          // Training
          staff_roles: draft.staff_roles || [],
          training_exists: draft.training_exists || "",
          training_completion_status: draft.training_completion_status || "",
          // FRIA
          fria_trigger_status: draft.fria_trigger_status || "",
          fria_status: draft.fria_status || "",
          // Signoff
          final_classification: draft.final_classification || "",
          signoff_reviewer_id: draft.signoff_reviewer_id || "",
          signoff_notes: draft.signoff_notes || "",
        };
        
        setData(wizardData);
        setDraftId(id);
        lastSavedData.current = JSON.stringify(wizardData);
        toast.info("Draft loaded", { description: `Continuing "${draft.name}"` });
      } else if (draft?.wizard_completed_at) {
        // Already completed, redirect to detail page
        toast.info("This assessment is already complete");
        navigate(`/ai-systems/${id}`);
        return;
      } else {
        toast.error("Draft not found");
        setSearchParams({});
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
      toast.error("Failed to load draft");
      setSearchParams({});
    } finally {
      setIsLoading(false);
      initialLoadComplete.current = true;
    }
  };

  const buildDatabasePayload = useCallback((wizardData: AISystemWizardData) => {
    return {
      name: wizardData.name || "Untitled Draft",
      description: wizardData.description || null,
      department: wizardData.department || null,
      lifecycle_status: wizardData.lifecycle_status,
      vendor_id: wizardData.vendor_id && wizardData.vendor_id !== "new" && wizardData.vendor_id !== "internal" 
        ? wizardData.vendor_id : null,
      primary_owner_id: wizardData.primary_owner_id || null,
      backup_owner_id: wizardData.backup_owner_id || null,
      internal_reference_id: wizardData.internal_reference_id || null,
      wizard_mode: wizardData.wizard_mode,
      // Geography & Scope
      deployment_regions: wizardData.deployment_regions.length ? wizardData.deployment_regions : null,
      eu_countries: wizardData.eu_countries.length ? wizardData.eu_countries : null,
      internal_user_groups: wizardData.internal_user_groups.length ? wizardData.internal_user_groups : null,
      affected_groups: wizardData.affected_groups.length ? wizardData.affected_groups : null,
      is_customer_facing: wizardData.is_customer_facing === "yes",
      has_workplace_impact: wizardData.has_workplace_impact === "yes",
      has_legal_effects: wizardData.has_legal_effects === "yes",
      summary: wizardData.summary || null,
      // Value Chain
      built_internally: wizardData.built_internally || null,
      acquisition_method: wizardData.acquisition_method.length ? wizardData.acquisition_method : null,
      value_chain_role: wizardData.value_chain_role.length ? wizardData.value_chain_role : null,
      is_externally_offered: wizardData.is_externally_offered === "yes",
      foundation_model: wizardData.foundation_model || null,
      contract_url: wizardData.contract_url || null,
      // AI Definition Test
      infers_outputs: wizardData.infers_outputs || null,
      output_types: wizardData.output_types.length ? wizardData.output_types : null,
      operates_autonomously: wizardData.operates_autonomously || null,
      adapts_after_deployment: wizardData.adapts_after_deployment || null,
      technical_approach: wizardData.technical_approach.length ? wizardData.technical_approach : null,
      ai_definition_result: wizardData.ai_definition_result || null,
      ai_definition_rationale: wizardData.ai_definition_rationale || null,
      ai_definition_reviewer_id: wizardData.ai_definition_reviewer_id || null,
      ai_definition_confidence: wizardData.ai_definition_confidence || null,
      // Use Case
      purpose_category: wizardData.purpose_category || null,
      workflow_description: wizardData.workflow_description || null,
      output_action_type: wizardData.output_action_type || null,
      output_destinations: wizardData.output_destinations.length ? wizardData.output_destinations : null,
      human_involvement: wizardData.human_involvement || null,
      override_capability: wizardData.override_capability || null,
      usage_frequency: wizardData.usage_frequency || null,
      impact_scale: wizardData.impact_scale || null,
      // Prohibited Screening
      prohibited_manipulation: wizardData.prohibited_manipulation || null,
      prohibited_exploitation: wizardData.prohibited_exploitation || null,
      prohibited_social_scoring: wizardData.prohibited_social_scoring || null,
      prohibited_criminal_profiling: wizardData.prohibited_criminal_profiling || null,
      prohibited_facial_scraping: wizardData.prohibited_facial_scraping || null,
      prohibited_emotion_inference: wizardData.prohibited_emotion_inference || null,
      prohibited_biometric_categorisation: wizardData.prohibited_biometric_categorisation || null,
      prohibited_realtime_biometric: wizardData.prohibited_realtime_biometric || null,
      prohibited_screening_notes: wizardData.prohibited_screening_notes || null,
      prohibited_screening_result: wizardData.prohibited_screening_result || null,
      // High-Risk Screening
      highrisk_biometric: wizardData.highrisk_biometric || null,
      highrisk_critical_infrastructure: wizardData.highrisk_critical_infrastructure || null,
      highrisk_education: wizardData.highrisk_education || null,
      highrisk_employment: wizardData.highrisk_employment || null,
      highrisk_essential_services: wizardData.highrisk_essential_services || null,
      highrisk_law_enforcement: wizardData.highrisk_law_enforcement || null,
      highrisk_migration: wizardData.highrisk_migration || null,
      highrisk_justice: wizardData.highrisk_justice || null,
      highrisk_safety_component: wizardData.highrisk_safety_component || null,
      highrisk_screening_notes: wizardData.highrisk_screening_notes || null,
      highrisk_screening_result: wizardData.highrisk_screening_result || null,
      // Transparency
      transparency_direct_interaction: wizardData.transparency_direct_interaction || null,
      transparency_obvious_ai: wizardData.transparency_obvious_ai || null,
      transparency_synthetic_content: wizardData.transparency_synthetic_content || null,
      transparency_outputs_marked: wizardData.transparency_outputs_marked || null,
      transparency_emotion_recognition: wizardData.transparency_emotion_recognition || null,
      transparency_deepfake: wizardData.transparency_deepfake || null,
      transparency_public_text: wizardData.transparency_public_text || null,
      transparency_status: wizardData.transparency_status || null,
      transparency_notes: wizardData.transparency_notes || null,
      // Data & Privacy
      processes_personal_data: wizardData.processes_personal_data || null,
      special_category_data: wizardData.special_category_data || null,
      involves_minors: wizardData.involves_minors || null,
      data_sources: wizardData.data_sources.length ? wizardData.data_sources : null,
      data_under_control: wizardData.data_under_control || null,
      input_retention_period: wizardData.input_retention_period || null,
      output_retention_period: wizardData.output_retention_period || null,
      dpia_status: wizardData.dpia_status || null,
      dpia_url: wizardData.dpia_url || null,
      privacy_owner_id: wizardData.privacy_owner_id || null,
      // Human Oversight
      oversight_model: wizardData.oversight_model || null,
      oversight_owner_id: wizardData.oversight_owner_id || null,
      has_stop_authority: wizardData.has_stop_authority === "yes",
      competence_requirements: wizardData.competence_requirements || null,
      operators_trained: wizardData.operators_trained || null,
      oversight_sop_status: wizardData.oversight_sop_status || null,
      monitoring_plan_status: wizardData.monitoring_plan_status || null,
      monitoring_metrics: wizardData.monitoring_metrics.length ? wizardData.monitoring_metrics : null,
      // Logging
      has_automatic_logs: wizardData.has_automatic_logs || null,
      log_storage_location: wizardData.log_storage_location || null,
      log_access_roles: wizardData.log_access_roles.length ? wizardData.log_access_roles : null,
      log_retention_period: wizardData.log_retention_period || null,
      can_export_logs: wizardData.can_export_logs || null,
      log_retention_6_months_confirmed: wizardData.log_retention_6_months_confirmed === "yes",
      // Incidents
      incident_process_status: wizardData.incident_process_status || null,
      severity_levels_defined: wizardData.severity_levels_defined === "yes",
      internal_notification_list: wizardData.internal_notification_list.length ? wizardData.internal_notification_list : null,
      external_notification_requirements: wizardData.external_notification_requirements || null,
      can_suspend_quickly: wizardData.can_suspend_quickly || null,
      // Workplace
      worker_notification_status: wizardData.worker_notification_status || null,
      // Public Authority
      is_public_authority: wizardData.is_public_authority === "yes",
      provides_public_service: wizardData.provides_public_service === "yes",
      registration_status: wizardData.registration_status || null,
      // Training
      staff_roles: wizardData.staff_roles.length ? wizardData.staff_roles : null,
      training_exists: wizardData.training_exists || null,
      training_completion_status: wizardData.training_completion_status || null,
      // FRIA
      fria_trigger_status: wizardData.fria_trigger_status || null,
      fria_status: wizardData.fria_status || null,
      // Sign-off
      final_classification: wizardData.final_classification || null,
      signoff_reviewer_id: wizardData.signoff_reviewer_id || null,
      signoff_notes: wizardData.signoff_notes || null,
    };
  }, []);

  const saveDraft = useCallback(async (wizardData: AISystemWizardData, existingId?: string | null) => {
    if (!profile?.organization_id) return null;
    
    // Don't save if data hasn't meaningfully changed
    const currentDataStr = JSON.stringify(wizardData);
    if (currentDataStr === lastSavedData.current && existingId) {
      return existingId;
    }

    setIsSaving(true);
    try {
      const payload = buildDatabasePayload(wizardData);

      if (existingId) {
        // Update existing draft
        const { error } = await supabase
          .from("ai_systems")
          .update(payload)
          .eq("id", existingId);

        if (error) throw error;
        setLastSaved(new Date());
        lastSavedData.current = currentDataStr;
        return existingId;
      } else {
        // Create new draft
        const { data: newDraft, error } = await supabase
          .from("ai_systems")
          .insert({
            ...payload,
            organization_id: profile.organization_id,
            created_by: user?.id,
          })
          .select("id")
          .single();

        if (error) throw error;
        
        const newId = newDraft.id;
        setDraftId(newId);
        setSearchParams({ draft: newId });
        setLastSaved(new Date());
        lastSavedData.current = currentDataStr;
        toast.success("Draft saved", { description: "Your progress is being saved automatically" });
        return newId;
      }
    } catch (error) {
      console.error("Failed to save draft:", error);
      // Don't show error toast on every save attempt, just log it
      return existingId || null;
    } finally {
      setIsSaving(false);
    }
  }, [profile?.organization_id, user?.id, buildDatabasePayload, setSearchParams]);

  const updateData = useCallback((updates: Partial<AISystemWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  // Auto-save when step changes (after initial load)
  const saveOnStepChange = useCallback(async (newStep: number) => {
    if (!initialLoadComplete.current) return;
    
    // Only save if we have a name (basic validation)
    if (data.name.trim()) {
      const savedId = await saveDraft(data, draftId);
      if (savedId && !draftId) {
        setDraftId(savedId);
      }
    }
    setCurrentStep(newStep);
  }, [data, draftId, saveDraft]);

  const handleNext = useCallback(async () => {
    const steps = data.wizard_mode === "full_assessment" ? 21 : 5;
    if (currentStep < steps - 1) {
      await saveOnStepChange(currentStep + 1);
    }
  }, [currentStep, data.wizard_mode, saveOnStepChange]);

  const handleBack = useCallback(async () => {
    if (currentStep > 0) {
      await saveOnStepChange(currentStep - 1);
    }
  }, [currentStep, saveOnStepChange]);

  const completeDraft = useCallback(async () => {
    if (!draftId) return null;
    
    setIsSaving(true);
    try {
      const payload = buildDatabasePayload(data);
      
      const { data: updated, error } = await supabase
        .from("ai_systems")
        .update({
          ...payload,
          wizard_completed_at: new Date().toISOString(),
          signoff_date: data.wizard_mode === "full_assessment" ? new Date().toISOString() : null,
        })
        .eq("id", draftId)
        .select()
        .single();

      if (error) throw error;
      return updated;
    } catch (error) {
      console.error("Failed to complete draft:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [draftId, data, buildDatabasePayload]);

  const resetDraft = useCallback(() => {
    setData({ ...DEFAULT_WIZARD_DATA, primary_owner_id: user?.id || "" });
    setCurrentStep(0);
    setDraftId(null);
    setSearchParams({});
    lastSavedData.current = "";
  }, [user?.id, setSearchParams]);

  return {
    data,
    updateData,
    currentStep,
    setCurrentStep: saveOnStepChange,
    draftId,
    isLoading,
    isSaving,
    lastSaved,
    saveDraft: () => saveDraft(data, draftId),
    completeDraft,
    resetDraft,
    handleNext,
    handleBack,
  };
}
