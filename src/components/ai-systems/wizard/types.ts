import type { Database } from "@/integrations/supabase/types";

export type WizardMode = "quick_capture" | "full_assessment";

export type LifecycleStatus = Database["public"]["Enums"]["lifecycle_status"];

// Step definitions
export interface WizardStep {
  id: number;
  key: string;
  title: string;
  description: string;
  icon: string;
  quickCapture: boolean; // Is this step part of quick capture?
}

// Full form data structure
export interface AISystemWizardData {
  // Step 0: Mode & Basic Identity
  wizard_mode: WizardMode;
  name: string;
  internal_reference_id: string;
  description: string;
  department: string;
  lifecycle_status: LifecycleStatus;
  primary_owner_id: string;
  backup_owner_id: string;
  vendor_id: string;
  new_vendor_name: string;

  // Step 1: Scope & Geography
  deployment_regions: string[];
  eu_countries: string[];
  internal_user_groups: string[];
  affected_groups: string[];
  is_customer_facing: string;
  has_workplace_impact: string;
  has_legal_effects: string;
  summary: string;

  // Step 2: Value Chain Role
  built_internally: string;
  acquisition_method: string[];
  value_chain_role: string[];
  is_externally_offered: string;
  foundation_model: string;
  contract_url: string;

  // Step 3: AI Definition Test
  infers_outputs: string;
  output_types: string[];
  operates_autonomously: string;
  adapts_after_deployment: string;
  technical_approach: string[];
  ai_definition_result: string;
  ai_definition_rationale: string;
  ai_definition_reviewer_id: string;
  ai_definition_confidence: string;

  // Step 4: Use Case & Functionality
  purpose_category: string;
  workflow_description: string;
  output_action_type: string;
  output_destinations: string[];
  human_involvement: string;
  override_capability: string;
  usage_frequency: string;
  impact_scale: number | null;

  // Step 5: Prohibited Practices Screening
  prohibited_manipulation: string;
  prohibited_exploitation: string;
  prohibited_social_scoring: string;
  prohibited_criminal_profiling: string;
  prohibited_facial_scraping: string;
  prohibited_emotion_inference: string;
  prohibited_biometric_categorisation: string;
  prohibited_realtime_biometric: string;
  prohibited_screening_notes: string;
  prohibited_screening_result: string;

  // Step 6: High-Risk Screening
  highrisk_biometric: string;
  highrisk_critical_infrastructure: string;
  highrisk_education: string;
  highrisk_employment: string;
  highrisk_essential_services: string;
  highrisk_law_enforcement: string;
  highrisk_migration: string;
  highrisk_justice: string;
  highrisk_safety_component: string;
  highrisk_screening_notes: string;
  highrisk_screening_result: string;

  // Step 7: Transparency Obligations
  transparency_direct_interaction: string;
  transparency_obvious_ai: string;
  transparency_synthetic_content: string;
  transparency_outputs_marked: string;
  transparency_emotion_recognition: string;
  transparency_deepfake: string;
  transparency_public_text: string;
  transparency_status: string;
  transparency_notes: string;

  // Step 8: Data & Privacy
  processes_personal_data: string;
  special_category_data: string;
  involves_minors: string;
  data_sources: string[];
  data_under_control: string;
  input_retention_period: string;
  output_retention_period: string;
  dpia_status: string;
  dpia_url: string;
  privacy_owner_id: string;

  // Step 9: Human Oversight
  oversight_model: string;
  oversight_owner_id: string;
  has_stop_authority: string;
  competence_requirements: string;
  operators_trained: string;
  oversight_sop_status: string;
  monitoring_plan_status: string;
  monitoring_metrics: string[];

  // Step 10: Logging & Record-Keeping
  has_automatic_logs: string;
  log_storage_location: string;
  log_access_roles: string[];
  log_retention_period: string;
  can_export_logs: string;
  log_retention_6_months_confirmed: string;

  // Step 11: Risk & Incident Handling
  incident_process_status: string;
  severity_levels_defined: string;
  internal_notification_list: string[];
  external_notification_requirements: string;
  can_suspend_quickly: string;

  // Step 12: Workplace-Specific
  worker_notification_status: string;

  // Step 13: Public Authority
  is_public_authority: string;
  provides_public_service: string;
  registration_status: string;

  // Step 14: Training & AI Literacy
  staff_roles: string[];
  training_exists: string;
  training_completion_status: string;

  // Step 15: FRIA Trigger
  fria_trigger_status: string;
  fria_status: string;

  // Step 16: Sign-off
  final_classification: string;
  signoff_reviewer_id: string;
  signoff_notes: string;
}

export const DEFAULT_WIZARD_DATA: AISystemWizardData = {
  wizard_mode: "quick_capture",
  name: "",
  internal_reference_id: "",
  description: "",
  department: "",
  lifecycle_status: "draft",
  primary_owner_id: "",
  backup_owner_id: "",
  vendor_id: "",
  new_vendor_name: "",

  deployment_regions: [],
  eu_countries: [],
  internal_user_groups: [],
  affected_groups: [],
  is_customer_facing: "",
  has_workplace_impact: "",
  has_legal_effects: "",
  summary: "",

  built_internally: "",
  acquisition_method: [],
  value_chain_role: [],
  is_externally_offered: "",
  foundation_model: "",
  contract_url: "",

  infers_outputs: "",
  output_types: [],
  operates_autonomously: "",
  adapts_after_deployment: "",
  technical_approach: [],
  ai_definition_result: "",
  ai_definition_rationale: "",
  ai_definition_reviewer_id: "",
  ai_definition_confidence: "",

  purpose_category: "",
  workflow_description: "",
  output_action_type: "",
  output_destinations: [],
  human_involvement: "",
  override_capability: "",
  usage_frequency: "",
  impact_scale: null,

  prohibited_manipulation: "",
  prohibited_exploitation: "",
  prohibited_social_scoring: "",
  prohibited_criminal_profiling: "",
  prohibited_facial_scraping: "",
  prohibited_emotion_inference: "",
  prohibited_biometric_categorisation: "",
  prohibited_realtime_biometric: "",
  prohibited_screening_notes: "",
  prohibited_screening_result: "",

  highrisk_biometric: "",
  highrisk_critical_infrastructure: "",
  highrisk_education: "",
  highrisk_employment: "",
  highrisk_essential_services: "",
  highrisk_law_enforcement: "",
  highrisk_migration: "",
  highrisk_justice: "",
  highrisk_safety_component: "",
  highrisk_screening_notes: "",
  highrisk_screening_result: "",

  transparency_direct_interaction: "",
  transparency_obvious_ai: "",
  transparency_synthetic_content: "",
  transparency_outputs_marked: "",
  transparency_emotion_recognition: "",
  transparency_deepfake: "",
  transparency_public_text: "",
  transparency_status: "",
  transparency_notes: "",

  processes_personal_data: "",
  special_category_data: "",
  involves_minors: "",
  data_sources: [],
  data_under_control: "",
  input_retention_period: "",
  output_retention_period: "",
  dpia_status: "",
  dpia_url: "",
  privacy_owner_id: "",

  oversight_model: "",
  oversight_owner_id: "",
  has_stop_authority: "",
  competence_requirements: "",
  operators_trained: "",
  oversight_sop_status: "",
  monitoring_plan_status: "",
  monitoring_metrics: [],

  has_automatic_logs: "",
  log_storage_location: "",
  log_access_roles: [],
  log_retention_period: "",
  can_export_logs: "",
  log_retention_6_months_confirmed: "",

  incident_process_status: "",
  severity_levels_defined: "",
  internal_notification_list: [],
  external_notification_requirements: "",
  can_suspend_quickly: "",

  worker_notification_status: "",

  is_public_authority: "",
  provides_public_service: "",
  registration_status: "",

  staff_roles: [],
  training_exists: "",
  training_completion_status: "",

  fria_trigger_status: "",
  fria_status: "",

  final_classification: "",
  signoff_reviewer_id: "",
  signoff_notes: "",
};
