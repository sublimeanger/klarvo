export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_system_classifications: {
        Row: {
          ai_assisted: boolean | null
          ai_model_version: string | null
          ai_suggestion: Json | null
          ai_system_id: string
          ai_system_rationale: string | null
          classification_rationale: string | null
          classified_at: string | null
          classified_by: string | null
          confidence_level: string | null
          created_at: string
          has_prohibited_indicators: boolean | null
          has_transparency_obligations: boolean | null
          high_risk_categories: string[] | null
          high_risk_notes: string | null
          high_risk_screening_completed: boolean | null
          human_override: boolean | null
          id: string
          is_ai_system: boolean | null
          is_high_risk_candidate: boolean | null
          last_material_change_at: string | null
          organization_id: string
          override_reason: string | null
          prohibited_notes: string | null
          prohibited_screening_completed: boolean | null
          reassessment_needed: boolean | null
          reassessment_reason: string | null
          reassessment_triggered_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_level: Database["public"]["Enums"]["risk_level"]
          transparency_categories: string[] | null
          transparency_screening_completed: boolean | null
          updated_at: string
        }
        Insert: {
          ai_assisted?: boolean | null
          ai_model_version?: string | null
          ai_suggestion?: Json | null
          ai_system_id: string
          ai_system_rationale?: string | null
          classification_rationale?: string | null
          classified_at?: string | null
          classified_by?: string | null
          confidence_level?: string | null
          created_at?: string
          has_prohibited_indicators?: boolean | null
          has_transparency_obligations?: boolean | null
          high_risk_categories?: string[] | null
          high_risk_notes?: string | null
          high_risk_screening_completed?: boolean | null
          human_override?: boolean | null
          id?: string
          is_ai_system?: boolean | null
          is_high_risk_candidate?: boolean | null
          last_material_change_at?: string | null
          organization_id: string
          override_reason?: string | null
          prohibited_notes?: string | null
          prohibited_screening_completed?: boolean | null
          reassessment_needed?: boolean | null
          reassessment_reason?: string | null
          reassessment_triggered_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          transparency_categories?: string[] | null
          transparency_screening_completed?: boolean | null
          updated_at?: string
        }
        Update: {
          ai_assisted?: boolean | null
          ai_model_version?: string | null
          ai_suggestion?: Json | null
          ai_system_id?: string
          ai_system_rationale?: string | null
          classification_rationale?: string | null
          classified_at?: string | null
          classified_by?: string | null
          confidence_level?: string | null
          created_at?: string
          has_prohibited_indicators?: boolean | null
          has_transparency_obligations?: boolean | null
          high_risk_categories?: string[] | null
          high_risk_notes?: string | null
          high_risk_screening_completed?: boolean | null
          human_override?: boolean | null
          id?: string
          is_ai_system?: boolean | null
          is_high_risk_candidate?: boolean | null
          last_material_change_at?: string | null
          organization_id?: string
          override_reason?: string | null
          prohibited_notes?: string | null
          prohibited_screening_completed?: boolean | null
          reassessment_needed?: boolean | null
          reassessment_reason?: string | null
          reassessment_triggered_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          transparency_categories?: string[] | null
          transparency_screening_completed?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_system_classifications_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: true
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_classifications_classified_by_fkey"
            columns: ["classified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_classifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_classifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_system_operator_roles: {
        Row: {
          ai_system_id: string
          created_at: string
          id: string
          is_primary: boolean
          jurisdiction_scope: string
          notes: string | null
          organization_id: string
          role_type: Database["public"]["Enums"]["operator_role_type"]
          updated_at: string
        }
        Insert: {
          ai_system_id: string
          created_at?: string
          id?: string
          is_primary?: boolean
          jurisdiction_scope?: string
          notes?: string | null
          organization_id: string
          role_type: Database["public"]["Enums"]["operator_role_type"]
          updated_at?: string
        }
        Update: {
          ai_system_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          jurisdiction_scope?: string
          notes?: string | null
          organization_id?: string
          role_type?: Database["public"]["Enums"]["operator_role_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_system_operator_roles_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_operator_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_system_versions: {
        Row: {
          ai_system_id: string
          conformity_notes: string | null
          created_at: string
          created_by: string | null
          id: string
          organization_id: string
          predetermined_changes_summary: string | null
          relation_to_previous: string | null
          release_date: string | null
          requires_new_conformity: boolean
          status: Database["public"]["Enums"]["version_status"]
          updated_at: string
          version_label: string
        }
        Insert: {
          ai_system_id: string
          conformity_notes?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          organization_id: string
          predetermined_changes_summary?: string | null
          relation_to_previous?: string | null
          release_date?: string | null
          requires_new_conformity?: boolean
          status?: Database["public"]["Enums"]["version_status"]
          updated_at?: string
          version_label: string
        }
        Update: {
          ai_system_id?: string
          conformity_notes?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          organization_id?: string
          predetermined_changes_summary?: string | null
          relation_to_previous?: string | null
          release_date?: string | null
          requires_new_conformity?: boolean
          status?: Database["public"]["Enums"]["version_status"]
          updated_at?: string
          version_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_system_versions_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_system_versions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_systems: {
        Row: {
          acquisition_method: string[] | null
          adapts_after_deployment: string | null
          affected_groups: string[] | null
          ai_definition_confidence: string | null
          ai_definition_rationale: string | null
          ai_definition_result: string | null
          ai_definition_reviewer_id: string | null
          backup_owner_id: string | null
          built_internally: string | null
          can_export_logs: string | null
          can_suspend_quickly: string | null
          competence_requirements: string | null
          contract_url: string | null
          created_at: string
          created_by: string | null
          data_sources: string[] | null
          data_under_control: string | null
          department: string | null
          deployment_regions: string[] | null
          description: string | null
          dpia_status: string | null
          dpia_url: string | null
          eu_countries: string[] | null
          external_notification_requirements: string | null
          final_classification: string | null
          foundation_model: string | null
          fria_status: string | null
          fria_trigger_status: string | null
          has_automatic_logs: string | null
          has_legal_effects: boolean | null
          has_stop_authority: boolean | null
          has_workplace_impact: boolean | null
          highrisk_biometric: string | null
          highrisk_critical_infrastructure: string | null
          highrisk_education: string | null
          highrisk_employment: string | null
          highrisk_essential_services: string | null
          highrisk_justice: string | null
          highrisk_law_enforcement: string | null
          highrisk_migration: string | null
          highrisk_safety_component: string | null
          highrisk_screening_notes: string | null
          highrisk_screening_result: string | null
          human_involvement: string | null
          id: string
          impact_scale: number | null
          incident_process_status: string | null
          infers_outputs: string | null
          input_retention_period: string | null
          internal_notification_list: string[] | null
          internal_reference_id: string | null
          internal_user_groups: string[] | null
          involves_minors: string | null
          is_customer_facing: boolean | null
          is_externally_offered: boolean | null
          is_public_authority: boolean | null
          lifecycle_status: Database["public"]["Enums"]["lifecycle_status"]
          log_access_roles: string[] | null
          log_retention_6_months_confirmed: boolean | null
          log_retention_period: string | null
          log_storage_location: string | null
          monitoring_metrics: string[] | null
          monitoring_plan_status: string | null
          name: string
          operates_autonomously: string | null
          operators_trained: string | null
          organization_id: string
          output_action_type: string | null
          output_destinations: string[] | null
          output_retention_period: string | null
          output_types: string[] | null
          override_capability: string | null
          oversight_model: string | null
          oversight_owner_id: string | null
          oversight_sop_status: string | null
          primary_owner_id: string | null
          privacy_owner_id: string | null
          processes_personal_data: string | null
          prohibited_biometric_categorisation: string | null
          prohibited_criminal_profiling: string | null
          prohibited_emotion_inference: string | null
          prohibited_exploitation: string | null
          prohibited_facial_scraping: string | null
          prohibited_manipulation: string | null
          prohibited_realtime_biometric: string | null
          prohibited_screening_notes: string | null
          prohibited_screening_result: string | null
          prohibited_social_scoring: string | null
          provides_public_service: boolean | null
          purpose_category: string | null
          registration_status: string | null
          severity_levels_defined: boolean | null
          signoff_date: string | null
          signoff_notes: string | null
          signoff_reviewer_id: string | null
          special_category_data: string | null
          staff_roles: string[] | null
          summary: string | null
          technical_approach: string[] | null
          training_completion_status: string | null
          training_exists: string | null
          transparency_deepfake: string | null
          transparency_direct_interaction: string | null
          transparency_emotion_recognition: string | null
          transparency_notes: string | null
          transparency_obvious_ai: string | null
          transparency_outputs_marked: string | null
          transparency_public_text: string | null
          transparency_status: string | null
          transparency_synthetic_content: string | null
          updated_at: string
          usage_frequency: string | null
          value_chain_role: string[] | null
          vendor_id: string | null
          wizard_completed_at: string | null
          wizard_mode: string | null
          worker_notification_status: string | null
          workflow_description: string | null
        }
        Insert: {
          acquisition_method?: string[] | null
          adapts_after_deployment?: string | null
          affected_groups?: string[] | null
          ai_definition_confidence?: string | null
          ai_definition_rationale?: string | null
          ai_definition_result?: string | null
          ai_definition_reviewer_id?: string | null
          backup_owner_id?: string | null
          built_internally?: string | null
          can_export_logs?: string | null
          can_suspend_quickly?: string | null
          competence_requirements?: string | null
          contract_url?: string | null
          created_at?: string
          created_by?: string | null
          data_sources?: string[] | null
          data_under_control?: string | null
          department?: string | null
          deployment_regions?: string[] | null
          description?: string | null
          dpia_status?: string | null
          dpia_url?: string | null
          eu_countries?: string[] | null
          external_notification_requirements?: string | null
          final_classification?: string | null
          foundation_model?: string | null
          fria_status?: string | null
          fria_trigger_status?: string | null
          has_automatic_logs?: string | null
          has_legal_effects?: boolean | null
          has_stop_authority?: boolean | null
          has_workplace_impact?: boolean | null
          highrisk_biometric?: string | null
          highrisk_critical_infrastructure?: string | null
          highrisk_education?: string | null
          highrisk_employment?: string | null
          highrisk_essential_services?: string | null
          highrisk_justice?: string | null
          highrisk_law_enforcement?: string | null
          highrisk_migration?: string | null
          highrisk_safety_component?: string | null
          highrisk_screening_notes?: string | null
          highrisk_screening_result?: string | null
          human_involvement?: string | null
          id?: string
          impact_scale?: number | null
          incident_process_status?: string | null
          infers_outputs?: string | null
          input_retention_period?: string | null
          internal_notification_list?: string[] | null
          internal_reference_id?: string | null
          internal_user_groups?: string[] | null
          involves_minors?: string | null
          is_customer_facing?: boolean | null
          is_externally_offered?: boolean | null
          is_public_authority?: boolean | null
          lifecycle_status?: Database["public"]["Enums"]["lifecycle_status"]
          log_access_roles?: string[] | null
          log_retention_6_months_confirmed?: boolean | null
          log_retention_period?: string | null
          log_storage_location?: string | null
          monitoring_metrics?: string[] | null
          monitoring_plan_status?: string | null
          name: string
          operates_autonomously?: string | null
          operators_trained?: string | null
          organization_id: string
          output_action_type?: string | null
          output_destinations?: string[] | null
          output_retention_period?: string | null
          output_types?: string[] | null
          override_capability?: string | null
          oversight_model?: string | null
          oversight_owner_id?: string | null
          oversight_sop_status?: string | null
          primary_owner_id?: string | null
          privacy_owner_id?: string | null
          processes_personal_data?: string | null
          prohibited_biometric_categorisation?: string | null
          prohibited_criminal_profiling?: string | null
          prohibited_emotion_inference?: string | null
          prohibited_exploitation?: string | null
          prohibited_facial_scraping?: string | null
          prohibited_manipulation?: string | null
          prohibited_realtime_biometric?: string | null
          prohibited_screening_notes?: string | null
          prohibited_screening_result?: string | null
          prohibited_social_scoring?: string | null
          provides_public_service?: boolean | null
          purpose_category?: string | null
          registration_status?: string | null
          severity_levels_defined?: boolean | null
          signoff_date?: string | null
          signoff_notes?: string | null
          signoff_reviewer_id?: string | null
          special_category_data?: string | null
          staff_roles?: string[] | null
          summary?: string | null
          technical_approach?: string[] | null
          training_completion_status?: string | null
          training_exists?: string | null
          transparency_deepfake?: string | null
          transparency_direct_interaction?: string | null
          transparency_emotion_recognition?: string | null
          transparency_notes?: string | null
          transparency_obvious_ai?: string | null
          transparency_outputs_marked?: string | null
          transparency_public_text?: string | null
          transparency_status?: string | null
          transparency_synthetic_content?: string | null
          updated_at?: string
          usage_frequency?: string | null
          value_chain_role?: string[] | null
          vendor_id?: string | null
          wizard_completed_at?: string | null
          wizard_mode?: string | null
          worker_notification_status?: string | null
          workflow_description?: string | null
        }
        Update: {
          acquisition_method?: string[] | null
          adapts_after_deployment?: string | null
          affected_groups?: string[] | null
          ai_definition_confidence?: string | null
          ai_definition_rationale?: string | null
          ai_definition_result?: string | null
          ai_definition_reviewer_id?: string | null
          backup_owner_id?: string | null
          built_internally?: string | null
          can_export_logs?: string | null
          can_suspend_quickly?: string | null
          competence_requirements?: string | null
          contract_url?: string | null
          created_at?: string
          created_by?: string | null
          data_sources?: string[] | null
          data_under_control?: string | null
          department?: string | null
          deployment_regions?: string[] | null
          description?: string | null
          dpia_status?: string | null
          dpia_url?: string | null
          eu_countries?: string[] | null
          external_notification_requirements?: string | null
          final_classification?: string | null
          foundation_model?: string | null
          fria_status?: string | null
          fria_trigger_status?: string | null
          has_automatic_logs?: string | null
          has_legal_effects?: boolean | null
          has_stop_authority?: boolean | null
          has_workplace_impact?: boolean | null
          highrisk_biometric?: string | null
          highrisk_critical_infrastructure?: string | null
          highrisk_education?: string | null
          highrisk_employment?: string | null
          highrisk_essential_services?: string | null
          highrisk_justice?: string | null
          highrisk_law_enforcement?: string | null
          highrisk_migration?: string | null
          highrisk_safety_component?: string | null
          highrisk_screening_notes?: string | null
          highrisk_screening_result?: string | null
          human_involvement?: string | null
          id?: string
          impact_scale?: number | null
          incident_process_status?: string | null
          infers_outputs?: string | null
          input_retention_period?: string | null
          internal_notification_list?: string[] | null
          internal_reference_id?: string | null
          internal_user_groups?: string[] | null
          involves_minors?: string | null
          is_customer_facing?: boolean | null
          is_externally_offered?: boolean | null
          is_public_authority?: boolean | null
          lifecycle_status?: Database["public"]["Enums"]["lifecycle_status"]
          log_access_roles?: string[] | null
          log_retention_6_months_confirmed?: boolean | null
          log_retention_period?: string | null
          log_storage_location?: string | null
          monitoring_metrics?: string[] | null
          monitoring_plan_status?: string | null
          name?: string
          operates_autonomously?: string | null
          operators_trained?: string | null
          organization_id?: string
          output_action_type?: string | null
          output_destinations?: string[] | null
          output_retention_period?: string | null
          output_types?: string[] | null
          override_capability?: string | null
          oversight_model?: string | null
          oversight_owner_id?: string | null
          oversight_sop_status?: string | null
          primary_owner_id?: string | null
          privacy_owner_id?: string | null
          processes_personal_data?: string | null
          prohibited_biometric_categorisation?: string | null
          prohibited_criminal_profiling?: string | null
          prohibited_emotion_inference?: string | null
          prohibited_exploitation?: string | null
          prohibited_facial_scraping?: string | null
          prohibited_manipulation?: string | null
          prohibited_realtime_biometric?: string | null
          prohibited_screening_notes?: string | null
          prohibited_screening_result?: string | null
          prohibited_social_scoring?: string | null
          provides_public_service?: boolean | null
          purpose_category?: string | null
          registration_status?: string | null
          severity_levels_defined?: boolean | null
          signoff_date?: string | null
          signoff_notes?: string | null
          signoff_reviewer_id?: string | null
          special_category_data?: string | null
          staff_roles?: string[] | null
          summary?: string | null
          technical_approach?: string[] | null
          training_completion_status?: string | null
          training_exists?: string | null
          transparency_deepfake?: string | null
          transparency_direct_interaction?: string | null
          transparency_emotion_recognition?: string | null
          transparency_notes?: string | null
          transparency_obvious_ai?: string | null
          transparency_outputs_marked?: string | null
          transparency_public_text?: string | null
          transparency_status?: string | null
          transparency_synthetic_content?: string | null
          updated_at?: string
          usage_frequency?: string | null
          value_chain_role?: string[] | null
          vendor_id?: string | null
          wizard_completed_at?: string | null
          wizard_mode?: string | null
          worker_notification_status?: string | null
          workflow_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_systems_ai_definition_reviewer_id_fkey"
            columns: ["ai_definition_reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_backup_owner_id_fkey"
            columns: ["backup_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_oversight_owner_id_fkey"
            columns: ["oversight_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_primary_owner_id_fkey"
            columns: ["primary_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_privacy_owner_id_fkey"
            columns: ["privacy_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_signoff_reviewer_id_fkey"
            columns: ["signoff_reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_systems_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tool_patterns: {
        Row: {
          category: string | null
          created_at: string | null
          detection_patterns: string[]
          id: string
          is_ai_confirmed: boolean | null
          notes: string | null
          tool_name: string
          typical_purpose: string | null
          typical_risk_level: string | null
          updated_at: string | null
          vendor_name: string
          website_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          detection_patterns: string[]
          id?: string
          is_ai_confirmed?: boolean | null
          notes?: string | null
          tool_name: string
          typical_purpose?: string | null
          typical_risk_level?: string | null
          updated_at?: string | null
          vendor_name: string
          website_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          detection_patterns?: string[]
          id?: string
          is_ai_confirmed?: boolean | null
          notes?: string | null
          tool_name?: string
          typical_purpose?: string | null
          typical_risk_level?: string | null
          updated_at?: string | null
          vendor_name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      assessment_answers: {
        Row: {
          answer_notes: string | null
          answer_value: string | null
          answered_at: string | null
          answered_by: string | null
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          classification_id: string
          created_at: string
          id: string
          organization_id: string
          question_id: string
        }
        Insert: {
          answer_notes?: string | null
          answer_value?: string | null
          answered_at?: string | null
          answered_by?: string | null
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          classification_id: string
          created_at?: string
          id?: string
          organization_id: string
          question_id: string
        }
        Update: {
          answer_notes?: string | null
          answer_value?: string | null
          answered_at?: string | null
          answered_by?: string | null
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          classification_id?: string
          created_at?: string
          id?: string
          organization_id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_answered_by_fkey"
            columns: ["answered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_answers_classification_id_fkey"
            columns: ["classification_id"]
            isOneToOne: false
            referencedRelation: "ai_system_classifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_answers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_name: string | null
          entity_type: string
          id: string
          ip_address: string | null
          organization_id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          organization_id: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          organization_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auditor_links: {
        Row: {
          access_count: number
          ai_system_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          expires_at: string
          id: string
          is_active: boolean
          last_accessed_at: string | null
          max_access_count: number | null
          name: string
          organization_id: string
          token: string
        }
        Insert: {
          access_count?: number
          ai_system_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at: string
          id?: string
          is_active?: boolean
          last_accessed_at?: string | null
          max_access_count?: number | null
          name: string
          organization_id: string
          token: string
        }
        Update: {
          access_count?: number
          ai_system_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean
          last_accessed_at?: string | null
          max_access_count?: number | null
          name?: string
          organization_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "auditor_links_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auditor_links_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auditor_links_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ce_marking_records: {
        Row: {
          ai_system_version_id: string
          created_at: string
          evidence_file_id: string | null
          id: string
          location_description: string | null
          marking_type: string
          notes: string | null
          notified_body_id_displayed: boolean | null
          notified_body_number: string | null
          organization_id: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_system_version_id: string
          created_at?: string
          evidence_file_id?: string | null
          id?: string
          location_description?: string | null
          marking_type: string
          notes?: string | null
          notified_body_id_displayed?: boolean | null
          notified_body_number?: string | null
          organization_id: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_system_version_id?: string
          created_at?: string
          evidence_file_id?: string | null
          id?: string
          location_description?: string | null
          marking_type?: string
          notes?: string | null
          notified_body_id_displayed?: boolean | null
          notified_body_number?: string | null
          organization_id?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ce_marking_records_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ce_marking_records_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ce_marking_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ce_marking_records_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classification_history: {
        Row: {
          ai_assisted: boolean | null
          ai_model_version: string | null
          ai_suggestion: Json | null
          ai_system_id: string
          change_reason: string | null
          classification_rationale: string | null
          classified_at: string
          classified_by: string | null
          confidence_level: string | null
          created_at: string
          has_prohibited_indicators: boolean | null
          has_transparency_obligations: boolean | null
          high_risk_categories: string[] | null
          human_override: boolean | null
          id: string
          is_ai_system: boolean | null
          is_current: boolean
          is_high_risk_candidate: boolean | null
          organization_id: string
          override_reason: string | null
          risk_level: string
          ruleset_version: string | null
          transparency_categories: string[] | null
          version_number: number
        }
        Insert: {
          ai_assisted?: boolean | null
          ai_model_version?: string | null
          ai_suggestion?: Json | null
          ai_system_id: string
          change_reason?: string | null
          classification_rationale?: string | null
          classified_at?: string
          classified_by?: string | null
          confidence_level?: string | null
          created_at?: string
          has_prohibited_indicators?: boolean | null
          has_transparency_obligations?: boolean | null
          high_risk_categories?: string[] | null
          human_override?: boolean | null
          id?: string
          is_ai_system?: boolean | null
          is_current?: boolean
          is_high_risk_candidate?: boolean | null
          organization_id: string
          override_reason?: string | null
          risk_level?: string
          ruleset_version?: string | null
          transparency_categories?: string[] | null
          version_number?: number
        }
        Update: {
          ai_assisted?: boolean | null
          ai_model_version?: string | null
          ai_suggestion?: Json | null
          ai_system_id?: string
          change_reason?: string | null
          classification_rationale?: string | null
          classified_at?: string
          classified_by?: string | null
          confidence_level?: string | null
          created_at?: string
          has_prohibited_indicators?: boolean | null
          has_transparency_obligations?: boolean | null
          high_risk_categories?: string[] | null
          human_override?: boolean | null
          id?: string
          is_ai_system?: boolean | null
          is_current?: boolean
          is_high_risk_candidate?: boolean | null
          organization_id?: string
          override_reason?: string | null
          risk_level?: string
          ruleset_version?: string | null
          transparency_categories?: string[] | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "classification_history_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_history_classified_by_fkey"
            columns: ["classified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_recommendations: {
        Row: {
          action_path: string | null
          action_payload: Json | null
          action_type: string
          ai_system_id: string | null
          confidence_score: number | null
          created_at: string
          description: string
          expires_at: string
          generated_at: string
          id: string
          is_dismissed: boolean
          organization_id: string
          priority: number
          recommendation_type: string
          title: string
        }
        Insert: {
          action_path?: string | null
          action_payload?: Json | null
          action_type: string
          ai_system_id?: string | null
          confidence_score?: number | null
          created_at?: string
          description: string
          expires_at?: string
          generated_at?: string
          id?: string
          is_dismissed?: boolean
          organization_id: string
          priority: number
          recommendation_type: string
          title: string
        }
        Update: {
          action_path?: string | null
          action_payload?: Json | null
          action_type?: string
          ai_system_id?: string | null
          confidence_score?: number | null
          created_at?: string
          description?: string
          expires_at?: string
          generated_at?: string
          id?: string
          is_dismissed?: boolean
          organization_id?: string
          priority?: number
          recommendation_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_recommendations_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_recommendations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      conformity_assessments: {
        Row: {
          ai_system_version_id: string
          certificate_expiry: string | null
          certificate_id: string | null
          closed_date: string | null
          corrective_actions: Json | null
          created_at: string
          created_by: string | null
          evidence_file_id: string | null
          findings_summary: string | null
          id: string
          notes: string | null
          notified_body_id: string | null
          organization_id: string
          path_type: Database["public"]["Enums"]["conformity_path_type"]
          status: Database["public"]["Enums"]["conformity_status"]
          submission_date: string | null
          updated_at: string
        }
        Insert: {
          ai_system_version_id: string
          certificate_expiry?: string | null
          certificate_id?: string | null
          closed_date?: string | null
          corrective_actions?: Json | null
          created_at?: string
          created_by?: string | null
          evidence_file_id?: string | null
          findings_summary?: string | null
          id?: string
          notes?: string | null
          notified_body_id?: string | null
          organization_id: string
          path_type: Database["public"]["Enums"]["conformity_path_type"]
          status?: Database["public"]["Enums"]["conformity_status"]
          submission_date?: string | null
          updated_at?: string
        }
        Update: {
          ai_system_version_id?: string
          certificate_expiry?: string | null
          certificate_id?: string | null
          closed_date?: string | null
          corrective_actions?: Json | null
          created_at?: string
          created_by?: string | null
          evidence_file_id?: string | null
          findings_summary?: string | null
          id?: string
          notes?: string | null
          notified_body_id?: string | null
          organization_id?: string
          path_type?: Database["public"]["Enums"]["conformity_path_type"]
          status?: Database["public"]["Enums"]["conformity_status"]
          submission_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conformity_assessments_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conformity_assessments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conformity_assessments_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conformity_assessments_notified_body_id_fkey"
            columns: ["notified_body_id"]
            isOneToOne: false
            referencedRelation: "economic_operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conformity_assessments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          submitted_at: string | null
        }
        Insert: {
          company?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          submitted_at?: string | null
        }
        Update: {
          company?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          submitted_at?: string | null
        }
        Relationships: []
      }
      control_evidence_links: {
        Row: {
          control_implementation_id: string
          evidence_file_id: string
          id: string
          linked_at: string
          linked_by: string | null
          notes: string | null
          organization_id: string
        }
        Insert: {
          control_implementation_id: string
          evidence_file_id: string
          id?: string
          linked_at?: string
          linked_by?: string | null
          notes?: string | null
          organization_id: string
        }
        Update: {
          control_implementation_id?: string
          evidence_file_id?: string
          id?: string
          linked_at?: string
          linked_by?: string | null
          notes?: string | null
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "control_evidence_links_control_implementation_id_fkey"
            columns: ["control_implementation_id"]
            isOneToOne: false
            referencedRelation: "control_implementations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_evidence_links_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_evidence_links_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_evidence_links_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      control_implementations: {
        Row: {
          ai_system_id: string
          control_id: string
          created_at: string
          id: string
          last_reviewed_at: string | null
          na_approved_at: string | null
          na_approved_by: string | null
          na_justification: string | null
          next_review_date: string | null
          notes: string | null
          organization_id: string
          owner_id: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_system_id: string
          control_id: string
          created_at?: string
          id?: string
          last_reviewed_at?: string | null
          na_approved_at?: string | null
          na_approved_by?: string | null
          na_justification?: string | null
          next_review_date?: string | null
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_system_id?: string
          control_id?: string
          created_at?: string
          id?: string
          last_reviewed_at?: string | null
          na_approved_at?: string | null
          na_approved_by?: string | null
          na_justification?: string | null
          next_review_date?: string | null
          notes?: string | null
          organization_id?: string
          owner_id?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "control_implementations_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_implementations_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "control_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_implementations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_implementations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_implementations_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      control_library: {
        Row: {
          acceptance_criteria: string | null
          applies_to: string[]
          article_reference: string | null
          category: string
          code: string
          created_at: string
          description: string | null
          evidence_requirements: string | null
          id: string
          na_approver_role: string | null
          na_requires_justification: boolean | null
          name: string
          review_frequency: string | null
          updated_at: string
        }
        Insert: {
          acceptance_criteria?: string | null
          applies_to?: string[]
          article_reference?: string | null
          category: string
          code: string
          created_at?: string
          description?: string | null
          evidence_requirements?: string | null
          id?: string
          na_approver_role?: string | null
          na_requires_justification?: boolean | null
          name: string
          review_frequency?: string | null
          updated_at?: string
        }
        Update: {
          acceptance_criteria?: string | null
          applies_to?: string[]
          article_reference?: string | null
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          evidence_requirements?: string | null
          id?: string
          na_approver_role?: string | null
          na_requires_justification?: boolean | null
          name?: string
          review_frequency?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dataset_registry: {
        Row: {
          access_restrictions: string | null
          ai_system_version_id: string
          bias_checks_performed: Json | null
          bias_mitigation_measures: string | null
          collection_date_range: string | null
          collection_method: string | null
          created_at: string
          created_by: string | null
          data_quality_measures: string | null
          data_source: string | null
          description: string | null
          evidence_file_id: string | null
          feature_count: number | null
          geographic_scope: string | null
          id: string
          known_limitations: string | null
          label_distribution: Json | null
          licenses: Json | null
          name: string
          organization_id: string
          purpose: string
          record_count: number | null
          retention_period: string | null
          updated_at: string
        }
        Insert: {
          access_restrictions?: string | null
          ai_system_version_id: string
          bias_checks_performed?: Json | null
          bias_mitigation_measures?: string | null
          collection_date_range?: string | null
          collection_method?: string | null
          created_at?: string
          created_by?: string | null
          data_quality_measures?: string | null
          data_source?: string | null
          description?: string | null
          evidence_file_id?: string | null
          feature_count?: number | null
          geographic_scope?: string | null
          id?: string
          known_limitations?: string | null
          label_distribution?: Json | null
          licenses?: Json | null
          name: string
          organization_id: string
          purpose: string
          record_count?: number | null
          retention_period?: string | null
          updated_at?: string
        }
        Update: {
          access_restrictions?: string | null
          ai_system_version_id?: string
          bias_checks_performed?: Json | null
          bias_mitigation_measures?: string | null
          collection_date_range?: string | null
          collection_method?: string | null
          created_at?: string
          created_by?: string | null
          data_quality_measures?: string | null
          data_source?: string | null
          description?: string | null
          evidence_file_id?: string | null
          feature_count?: number | null
          geographic_scope?: string | null
          id?: string
          known_limitations?: string | null
          label_distribution?: Json | null
          licenses?: Json | null
          name?: string
          organization_id?: string
          purpose?: string
          record_count?: number | null
          retention_period?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dataset_registry_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dataset_registry_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dataset_registry_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dataset_registry_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      discovered_ai_tools: {
        Row: {
          ai_system_id: string | null
          created_at: string | null
          detected_source: string | null
          detection_confidence: number | null
          dismiss_reason: string | null
          first_seen_at: string | null
          id: string
          last_seen_at: string | null
          matched_pattern_id: string | null
          organization_id: string
          raw_metadata: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["discovered_tool_status"] | null
          tool_name: string
          updated_at: string | null
          user_count: number | null
          vendor_name: string | null
          workspace_connection_id: string | null
        }
        Insert: {
          ai_system_id?: string | null
          created_at?: string | null
          detected_source?: string | null
          detection_confidence?: number | null
          dismiss_reason?: string | null
          first_seen_at?: string | null
          id?: string
          last_seen_at?: string | null
          matched_pattern_id?: string | null
          organization_id: string
          raw_metadata?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["discovered_tool_status"] | null
          tool_name: string
          updated_at?: string | null
          user_count?: number | null
          vendor_name?: string | null
          workspace_connection_id?: string | null
        }
        Update: {
          ai_system_id?: string | null
          created_at?: string | null
          detected_source?: string | null
          detection_confidence?: number | null
          dismiss_reason?: string | null
          first_seen_at?: string | null
          id?: string
          last_seen_at?: string | null
          matched_pattern_id?: string | null
          organization_id?: string
          raw_metadata?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["discovered_tool_status"] | null
          tool_name?: string
          updated_at?: string | null
          user_count?: number | null
          vendor_name?: string | null
          workspace_connection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discovered_ai_tools_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discovered_ai_tools_matched_pattern_id_fkey"
            columns: ["matched_pattern_id"]
            isOneToOne: false
            referencedRelation: "ai_tool_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discovered_ai_tools_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discovered_ai_tools_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discovered_ai_tools_workspace_connection_id_fkey"
            columns: ["workspace_connection_id"]
            isOneToOne: false
            referencedRelation: "workspace_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      distributor_verifications: {
        Row: {
          ai_system_id: string
          corrective_actions_taken: string | null
          created_at: string
          escalation_notes: string | null
          escalation_to_provider_triggered: boolean | null
          evidence_file_id: string | null
          has_modified: boolean | null
          has_rebranded: boolean | null
          id: string
          non_compliance_details: string | null
          notes: string | null
          organization_id: string
          status: string
          updated_at: string
          verification_data: Json
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_system_id: string
          corrective_actions_taken?: string | null
          created_at?: string
          escalation_notes?: string | null
          escalation_to_provider_triggered?: boolean | null
          evidence_file_id?: string | null
          has_modified?: boolean | null
          has_rebranded?: boolean | null
          id?: string
          non_compliance_details?: string | null
          notes?: string | null
          organization_id: string
          status?: string
          updated_at?: string
          verification_data?: Json
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_system_id?: string
          corrective_actions_taken?: string | null
          created_at?: string
          escalation_notes?: string | null
          escalation_to_provider_triggered?: boolean | null
          evidence_file_id?: string | null
          has_modified?: boolean | null
          has_rebranded?: boolean | null
          id?: string
          non_compliance_details?: string | null
          notes?: string | null
          organization_id?: string
          status?: string
          updated_at?: string
          verification_data?: Json
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "distributor_verifications_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distributor_verifications_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distributor_verifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distributor_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      economic_operators: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          created_by: string | null
          eu_established: boolean
          id: string
          legal_name: string
          notes: string | null
          notified_body_id: string | null
          operator_type: string
          organization_id: string
          postal_code: string | null
          trading_name: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          eu_established?: boolean
          id?: string
          legal_name: string
          notes?: string | null
          notified_body_id?: string | null
          operator_type: string
          organization_id: string
          postal_code?: string | null
          trading_name?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          eu_established?: boolean
          id?: string
          legal_name?: string
          notes?: string | null
          notified_body_id?: string | null
          operator_type?: string
          organization_id?: string
          postal_code?: string | null
          trading_name?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "economic_operators_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "economic_operators_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      eu_declarations_of_conformity: {
        Row: {
          ai_system_name: string
          ai_system_type: string | null
          ai_system_version_id: string
          common_specifications: Json | null
          conformity_statement: string | null
          created_at: string
          created_by: string | null
          date_of_issue: string | null
          generated_pdf_evidence_id: string | null
          harmonised_standards: Json | null
          id: string
          notified_body_certificate: string | null
          notified_body_name: string | null
          notified_body_number: string | null
          organization_id: string
          place_of_issue: string | null
          provider_address: string | null
          provider_name: string
          signatory_name: string | null
          signatory_position: string | null
          signed_at: string | null
          status: Database["public"]["Enums"]["doc_status"]
          traceable_reference: string | null
          updated_at: string
        }
        Insert: {
          ai_system_name: string
          ai_system_type?: string | null
          ai_system_version_id: string
          common_specifications?: Json | null
          conformity_statement?: string | null
          created_at?: string
          created_by?: string | null
          date_of_issue?: string | null
          generated_pdf_evidence_id?: string | null
          harmonised_standards?: Json | null
          id?: string
          notified_body_certificate?: string | null
          notified_body_name?: string | null
          notified_body_number?: string | null
          organization_id: string
          place_of_issue?: string | null
          provider_address?: string | null
          provider_name: string
          signatory_name?: string | null
          signatory_position?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          traceable_reference?: string | null
          updated_at?: string
        }
        Update: {
          ai_system_name?: string
          ai_system_type?: string | null
          ai_system_version_id?: string
          common_specifications?: Json | null
          conformity_statement?: string | null
          created_at?: string
          created_by?: string | null
          date_of_issue?: string | null
          generated_pdf_evidence_id?: string | null
          harmonised_standards?: Json | null
          id?: string
          notified_body_certificate?: string | null
          notified_body_name?: string | null
          notified_body_number?: string | null
          organization_id?: string
          place_of_issue?: string | null
          provider_address?: string | null
          provider_name?: string
          signatory_name?: string | null
          signatory_position?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          traceable_reference?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "eu_declarations_of_conformity_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_declarations_of_conformity_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_declarations_of_conformity_generated_pdf_evidence_id_fkey"
            columns: ["generated_pdf_evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_declarations_of_conformity_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      eu_registration_records: {
        Row: {
          ai_system_version_id: string
          created_at: string
          created_by: string | null
          eu_database_reference: string | null
          evidence_file_id: string | null
          id: string
          last_updated_at: string | null
          notes: string | null
          organization_id: string
          registered_at: string | null
          registration_data: Json | null
          registration_status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          ai_system_version_id: string
          created_at?: string
          created_by?: string | null
          eu_database_reference?: string | null
          evidence_file_id?: string | null
          id?: string
          last_updated_at?: string | null
          notes?: string | null
          organization_id: string
          registered_at?: string | null
          registration_data?: Json | null
          registration_status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          ai_system_version_id?: string
          created_at?: string
          created_by?: string | null
          eu_database_reference?: string | null
          evidence_file_id?: string | null
          id?: string
          last_updated_at?: string | null
          notes?: string | null
          organization_id?: string
          registered_at?: string | null
          registration_data?: Json | null
          registration_status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "eu_registration_records_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_registration_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_registration_records_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eu_registration_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_files: {
        Row: {
          ai_system_id: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          evidence_type: string | null
          expires_at: string | null
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          name: string
          organization_id: string
          status: string
          tags: string[] | null
          updated_at: string
          uploaded_by: string | null
          vendor_id: string | null
        }
        Insert: {
          ai_system_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          evidence_type?: string | null
          expires_at?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name: string
          organization_id: string
          status?: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          vendor_id?: string | null
        }
        Update: {
          ai_system_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          evidence_type?: string | null
          expires_at?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name?: string
          organization_id?: string
          status?: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_files_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_files_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_files_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      export_logs: {
        Row: {
          ai_system_id: string | null
          created_at: string | null
          export_type: string
          file_name: string
          file_size_bytes: number | null
          id: string
          metadata: Json | null
          organization_id: string
          user_id: string | null
        }
        Insert: {
          ai_system_id?: string | null
          created_at?: string | null
          export_type: string
          file_name: string
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          organization_id: string
          user_id?: string | null
        }
        Update: {
          ai_system_id?: string | null
          created_at?: string | null
          export_type?: string
          file_name?: string
          file_size_bytes?: number | null
          id?: string
          metadata?: Json | null
          organization_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "export_logs_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fria_assessments: {
        Row: {
          accessibility_considerations: string | null
          affected_categories: string[] | null
          affected_notification_method: string | null
          affected_scale_per_month: number | null
          ai_system_id: string
          approved_at: string | null
          approved_by: string | null
          assessment_owner_id: string | null
          complaint_mechanism: string | null
          completed_at: string | null
          created_at: string
          decision_points: string | null
          deployment_duration: string | null
          expected_deployment_date: string | null
          final_conclusion: string | null
          governance_arrangements: string | null
          has_existing_dpia: boolean | null
          has_intervention_authority: boolean | null
          has_vulnerable_groups: boolean | null
          human_oversight_description: string | null
          id: string
          identified_risks: Json | null
          intended_purpose: string | null
          is_first_use: boolean | null
          mitigation_measures: string | null
          monitoring_plan: string | null
          notification_evidence_url: string | null
          notify_authority: boolean | null
          organization_id: string
          oversight_competence: string | null
          oversight_design: string | null
          process_description: string | null
          reassessment_triggers: string[] | null
          status: string
          title: string
          updated_at: string
          usage_frequency: string | null
        }
        Insert: {
          accessibility_considerations?: string | null
          affected_categories?: string[] | null
          affected_notification_method?: string | null
          affected_scale_per_month?: number | null
          ai_system_id: string
          approved_at?: string | null
          approved_by?: string | null
          assessment_owner_id?: string | null
          complaint_mechanism?: string | null
          completed_at?: string | null
          created_at?: string
          decision_points?: string | null
          deployment_duration?: string | null
          expected_deployment_date?: string | null
          final_conclusion?: string | null
          governance_arrangements?: string | null
          has_existing_dpia?: boolean | null
          has_intervention_authority?: boolean | null
          has_vulnerable_groups?: boolean | null
          human_oversight_description?: string | null
          id?: string
          identified_risks?: Json | null
          intended_purpose?: string | null
          is_first_use?: boolean | null
          mitigation_measures?: string | null
          monitoring_plan?: string | null
          notification_evidence_url?: string | null
          notify_authority?: boolean | null
          organization_id: string
          oversight_competence?: string | null
          oversight_design?: string | null
          process_description?: string | null
          reassessment_triggers?: string[] | null
          status?: string
          title: string
          updated_at?: string
          usage_frequency?: string | null
        }
        Update: {
          accessibility_considerations?: string | null
          affected_categories?: string[] | null
          affected_notification_method?: string | null
          affected_scale_per_month?: number | null
          ai_system_id?: string
          approved_at?: string | null
          approved_by?: string | null
          assessment_owner_id?: string | null
          complaint_mechanism?: string | null
          completed_at?: string | null
          created_at?: string
          decision_points?: string | null
          deployment_duration?: string | null
          expected_deployment_date?: string | null
          final_conclusion?: string | null
          governance_arrangements?: string | null
          has_existing_dpia?: boolean | null
          has_intervention_authority?: boolean | null
          has_vulnerable_groups?: boolean | null
          human_oversight_description?: string | null
          id?: string
          identified_risks?: Json | null
          intended_purpose?: string | null
          is_first_use?: boolean | null
          mitigation_measures?: string | null
          monitoring_plan?: string | null
          notification_evidence_url?: string | null
          notify_authority?: boolean | null
          organization_id?: string
          oversight_competence?: string | null
          oversight_design?: string | null
          process_description?: string | null
          reassessment_triggers?: string[] | null
          status?: string
          title?: string
          updated_at?: string
          usage_frequency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fria_assessments_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fria_assessments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fria_assessments_assessment_owner_id_fkey"
            columns: ["assessment_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fria_assessments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      importer_verifications: {
        Row: {
          ai_system_id: string
          authorised_rep_address: string | null
          authorised_rep_name: string | null
          corrective_actions_taken: string | null
          created_at: string
          evidence_file_id: string | null
          id: string
          non_compliance_details: string | null
          notes: string | null
          organization_id: string
          provider_address: string | null
          provider_contact: string | null
          provider_name: string | null
          status: string
          updated_at: string
          verification_data: Json
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ai_system_id: string
          authorised_rep_address?: string | null
          authorised_rep_name?: string | null
          corrective_actions_taken?: string | null
          created_at?: string
          evidence_file_id?: string | null
          id?: string
          non_compliance_details?: string | null
          notes?: string | null
          organization_id: string
          provider_address?: string | null
          provider_contact?: string | null
          provider_name?: string | null
          status?: string
          updated_at?: string
          verification_data?: Json
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ai_system_id?: string
          authorised_rep_address?: string | null
          authorised_rep_name?: string | null
          corrective_actions_taken?: string | null
          created_at?: string
          evidence_file_id?: string | null
          id?: string
          non_compliance_details?: string | null
          notes?: string | null
          organization_id?: string
          provider_address?: string | null
          provider_contact?: string | null
          provider_name?: string | null
          status?: string
          updated_at?: string
          verification_data?: Json
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "importer_verifications_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "importer_verifications_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "importer_verifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "importer_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          affected_parties: string[] | null
          ai_system_id: string | null
          assigned_to: string | null
          containment_actions: string | null
          created_at: string
          description: string | null
          detected_at: string | null
          external_notification_details: string | null
          external_notified: boolean | null
          id: string
          impact_description: string | null
          internal_notified: string[] | null
          occurred_at: string | null
          organization_id: string
          reported_by: string | null
          resolution_notes: string | null
          resolved_at: string | null
          root_cause: string | null
          severity: string
          status: string
          title: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          affected_parties?: string[] | null
          ai_system_id?: string | null
          assigned_to?: string | null
          containment_actions?: string | null
          created_at?: string
          description?: string | null
          detected_at?: string | null
          external_notification_details?: string | null
          external_notified?: boolean | null
          id?: string
          impact_description?: string | null
          internal_notified?: string[] | null
          occurred_at?: string | null
          organization_id: string
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: string
          status?: string
          title: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          affected_parties?: string[] | null
          ai_system_id?: string | null
          assigned_to?: string | null
          containment_actions?: string | null
          created_at?: string
          description?: string | null
          detected_at?: string | null
          external_notification_details?: string | null
          external_notified?: boolean | null
          id?: string
          impact_description?: string | null
          internal_notified?: string[] | null
          occurred_at?: string | null
          organization_id?: string
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          root_cause?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          source: string
          status: string | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          source: string
          status?: string | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          source?: string
          status?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          details: Json | null
          id: string
          notification_type: string
          organization_id: string
          recipient_email: string
          sent_at: string | null
          subject: string
          user_id: string | null
        }
        Insert: {
          details?: Json | null
          id?: string
          notification_type: string
          organization_id: string
          recipient_email: string
          sent_at?: string | null
          subject: string
          user_id?: string | null
        }
        Update: {
          details?: Json | null
          id?: string
          notification_type?: string
          organization_id?: string
          recipient_email?: string
          sent_at?: string | null
          subject?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_addons: {
        Row: {
          addon_id: string
          created_at: string | null
          enabled_at: string | null
          enabled_by: string | null
          expires_at: string | null
          id: string
          organization_id: string
          stripe_subscription_item_id: string | null
          updated_at: string | null
        }
        Insert: {
          addon_id: string
          created_at?: string | null
          enabled_at?: string | null
          enabled_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id: string
          stripe_subscription_item_id?: string | null
          updated_at?: string | null
        }
        Update: {
          addon_id?: string
          created_at?: string | null
          enabled_at?: string | null
          enabled_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id?: string
          stripe_subscription_item_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_addons_enabled_by_fkey"
            columns: ["enabled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_addons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_invites: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          status: string
          token: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          token?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_invites_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          ai_chat_enabled: boolean | null
          ai_classification_enabled: boolean | null
          ai_copilot_enabled: boolean | null
          ai_data_sharing_mode: string | null
          ai_document_enabled: boolean | null
          ai_features_enabled: boolean | null
          ai_intake_enabled: boolean | null
          ai_never_send_evidence_text: boolean | null
          company_size: string | null
          created_at: string
          id: string
          industry_sector: string | null
          name: string
          regulatory_timeline_mode: string | null
          updated_at: string
        }
        Insert: {
          ai_chat_enabled?: boolean | null
          ai_classification_enabled?: boolean | null
          ai_copilot_enabled?: boolean | null
          ai_data_sharing_mode?: string | null
          ai_document_enabled?: boolean | null
          ai_features_enabled?: boolean | null
          ai_intake_enabled?: boolean | null
          ai_never_send_evidence_text?: boolean | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry_sector?: string | null
          name: string
          regulatory_timeline_mode?: string | null
          updated_at?: string
        }
        Update: {
          ai_chat_enabled?: boolean | null
          ai_classification_enabled?: boolean | null
          ai_copilot_enabled?: boolean | null
          ai_data_sharing_mode?: string | null
          ai_document_enabled?: boolean | null
          ai_features_enabled?: boolean | null
          ai_intake_enabled?: boolean | null
          ai_never_send_evidence_text?: boolean | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry_sector?: string | null
          name?: string
          regulatory_timeline_mode?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      paid_search_leads: {
        Row: {
          ai_system_count: string | null
          company: string
          created_at: string | null
          email: string
          id: string
          landing_variant: string
          operator_type: string | null
          role: string | null
          status: string | null
          step_completed: number | null
          submitted_at: string | null
          updated_at: string | null
          urgent_use_case: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          ai_system_count?: string | null
          company: string
          created_at?: string | null
          email: string
          id?: string
          landing_variant: string
          operator_type?: string | null
          role?: string | null
          status?: string | null
          step_completed?: number | null
          submitted_at?: string | null
          updated_at?: string | null
          urgent_use_case?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          ai_system_count?: string | null
          company?: string
          created_at?: string | null
          email?: string
          id?: string
          landing_variant?: string
          operator_type?: string | null
          role?: string | null
          status?: string | null
          step_completed?: number | null
          submitted_at?: string | null
          updated_at?: string | null
          urgent_use_case?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_template: boolean
          name: string
          organization_id: string
          policy_type: string
          status: string
          template_source: string | null
          updated_at: string
          version: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_template?: boolean
          name: string
          organization_id: string
          policy_type: string
          status?: string
          template_source?: string | null
          updated_at?: string
          version?: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_template?: boolean
          name?: string
          organization_id?: string
          policy_type?: string
          status?: string
          template_source?: string | null
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "policies_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_versions: {
        Row: {
          change_summary: string | null
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          organization_id: string
          policy_id: string
          policy_type: string
          status: string
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          organization_id: string
          policy_id: string
          policy_type: string
          status: string
          version_number: number
        }
        Update: {
          change_summary?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          policy_id?: string
          policy_type?: string
          status?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "policy_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_versions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_versions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      post_market_monitoring_plans: {
        Row: {
          ai_system_version_id: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          created_by: string | null
          data_collection_methods: Json | null
          escalation_procedures: string | null
          evidence_file_id: string | null
          id: string
          last_reviewed_at: string | null
          next_review_date: string | null
          organization_id: string
          performance_kpis: Json | null
          responsible_roles: Json | null
          review_frequency: string | null
          risk_thresholds: Json | null
          status: Database["public"]["Enums"]["doc_status"]
          updated_at: string
        }
        Insert: {
          ai_system_version_id: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          data_collection_methods?: Json | null
          escalation_procedures?: string | null
          evidence_file_id?: string | null
          id?: string
          last_reviewed_at?: string | null
          next_review_date?: string | null
          organization_id: string
          performance_kpis?: Json | null
          responsible_roles?: Json | null
          review_frequency?: string | null
          risk_thresholds?: Json | null
          status?: Database["public"]["Enums"]["doc_status"]
          updated_at?: string
        }
        Update: {
          ai_system_version_id?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          data_collection_methods?: Json | null
          escalation_procedures?: string | null
          evidence_file_id?: string | null
          id?: string
          last_reviewed_at?: string | null
          next_review_date?: string | null
          organization_id?: string
          performance_kpis?: Json | null
          responsible_roles?: Json | null
          review_frequency?: string | null
          risk_thresholds?: Json | null
          status?: Database["public"]["Enums"]["doc_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_market_monitoring_plans_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_market_monitoring_plans_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_market_monitoring_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_market_monitoring_plans_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_market_monitoring_plans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email_notifications_enabled: boolean | null
          full_name: string | null
          id: string
          last_notification_sent_at: string | null
          notification_frequency: string | null
          onboarding_completed: boolean
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email_notifications_enabled?: boolean | null
          full_name?: string | null
          id: string
          last_notification_sent_at?: string | null
          notification_frequency?: string | null
          onboarding_completed?: boolean
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email_notifications_enabled?: boolean | null
          full_name?: string | null
          id?: string
          last_notification_sent_at?: string | null
          notification_frequency?: string | null
          onboarding_completed?: boolean
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      qms_documents: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          created_by: string | null
          description: string | null
          doc_category: string | null
          doc_number: string | null
          doc_type: string
          effective_date: string | null
          evidence_file_id: string | null
          id: string
          organization_id: string
          review_date: string | null
          status: Database["public"]["Enums"]["doc_status"]
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          doc_category?: string | null
          doc_number?: string | null
          doc_type: string
          effective_date?: string | null
          evidence_file_id?: string | null
          id?: string
          organization_id: string
          review_date?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          doc_category?: string | null
          doc_number?: string | null
          doc_type?: string
          effective_date?: string | null
          evidence_file_id?: string | null
          id?: string
          organization_id?: string
          review_date?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "qms_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qms_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      regulatory_rulesets: {
        Row: {
          changes_summary: string | null
          created_at: string
          description: string | null
          effective_date: string
          id: string
          is_current: boolean
          version: string
        }
        Insert: {
          changes_summary?: string | null
          created_at?: string
          description?: string | null
          effective_date: string
          id?: string
          is_current?: boolean
          version: string
        }
        Update: {
          changes_summary?: string | null
          created_at?: string
          description?: string | null
          effective_date?: string
          id?: string
          is_current?: boolean
          version?: string
        }
        Relationships: []
      }
      risk_management_records: {
        Row: {
          acceptance_rationale: string | null
          ai_system_version_id: string
          created_at: string
          created_by: string | null
          hazard: string
          hazard_category: string | null
          id: string
          impacted_stakeholders: string | null
          last_reviewed_at: string | null
          likelihood: string
          linked_incident_id: string | null
          linked_test_evidence_id: string | null
          mitigation_measures: string | null
          next_review_date: string | null
          notes: string | null
          organization_id: string
          owner_id: string | null
          residual_risk_acceptable: boolean | null
          residual_risk_level: string | null
          review_cadence: string | null
          risk_id: string | null
          risk_level: string | null
          severity: string
          status: string
          updated_at: string
        }
        Insert: {
          acceptance_rationale?: string | null
          ai_system_version_id: string
          created_at?: string
          created_by?: string | null
          hazard: string
          hazard_category?: string | null
          id?: string
          impacted_stakeholders?: string | null
          last_reviewed_at?: string | null
          likelihood: string
          linked_incident_id?: string | null
          linked_test_evidence_id?: string | null
          mitigation_measures?: string | null
          next_review_date?: string | null
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          residual_risk_acceptable?: boolean | null
          residual_risk_level?: string | null
          review_cadence?: string | null
          risk_id?: string | null
          risk_level?: string | null
          severity: string
          status?: string
          updated_at?: string
        }
        Update: {
          acceptance_rationale?: string | null
          ai_system_version_id?: string
          created_at?: string
          created_by?: string | null
          hazard?: string
          hazard_category?: string | null
          id?: string
          impacted_stakeholders?: string | null
          last_reviewed_at?: string | null
          likelihood?: string
          linked_incident_id?: string | null
          linked_test_evidence_id?: string | null
          mitigation_measures?: string | null
          next_review_date?: string | null
          notes?: string | null
          organization_id?: string
          owner_id?: string | null
          residual_risk_acceptable?: boolean | null
          residual_risk_level?: string | null
          review_cadence?: string | null
          risk_id?: string | null
          risk_level?: string | null
          severity?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_management_records_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_management_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_management_records_linked_incident_id_fkey"
            columns: ["linked_incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_management_records_linked_test_evidence_id_fkey"
            columns: ["linked_test_evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_management_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_management_records_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      serious_incident_reports: {
        Row: {
          affected_countries: Json | null
          affected_persons_count: number | null
          ai_system_id: string
          ai_system_version_id: string | null
          aware_at: string
          category: Database["public"]["Enums"]["serious_incident_category"]
          corrective_actions: string | null
          created_at: string
          deadline_at: string
          description: string | null
          evidence_file_id: string | null
          id: string
          immediate_actions: string | null
          market_surveillance_authority: string | null
          occurred_at: string | null
          organization_id: string
          reported_by: string | null
          root_cause_analysis: string | null
          status: string
          submission_reference: string | null
          submitted_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          affected_countries?: Json | null
          affected_persons_count?: number | null
          ai_system_id: string
          ai_system_version_id?: string | null
          aware_at: string
          category: Database["public"]["Enums"]["serious_incident_category"]
          corrective_actions?: string | null
          created_at?: string
          deadline_at: string
          description?: string | null
          evidence_file_id?: string | null
          id?: string
          immediate_actions?: string | null
          market_surveillance_authority?: string | null
          occurred_at?: string | null
          organization_id: string
          reported_by?: string | null
          root_cause_analysis?: string | null
          status?: string
          submission_reference?: string | null
          submitted_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          affected_countries?: Json | null
          affected_persons_count?: number | null
          ai_system_id?: string
          ai_system_version_id?: string | null
          aware_at?: string
          category?: Database["public"]["Enums"]["serious_incident_category"]
          corrective_actions?: string | null
          created_at?: string
          deadline_at?: string
          description?: string | null
          evidence_file_id?: string | null
          id?: string
          immediate_actions?: string | null
          market_surveillance_authority?: string | null
          occurred_at?: string | null
          organization_id?: string
          reported_by?: string | null
          root_cause_analysis?: string | null
          status?: string
          submission_reference?: string | null
          submitted_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "serious_incident_reports_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "serious_incident_reports_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "serious_incident_reports_evidence_file_id_fkey"
            columns: ["evidence_file_id"]
            isOneToOne: false
            referencedRelation: "evidence_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "serious_incident_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "serious_incident_reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_addons: {
        Row: {
          addon_id: string
          billing_period: string
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          organization_id: string
          status: string
          stripe_price_id: string | null
          stripe_subscription_item_id: string | null
          updated_at: string
        }
        Insert: {
          addon_id: string
          billing_period?: string
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id: string
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_item_id?: string | null
          updated_at?: string
        }
        Update: {
          addon_id?: string
          billing_period?: string
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string
          status?: string
          stripe_price_id?: string | null
          stripe_subscription_item_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_addons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_period: Database["public"]["Enums"]["billing_period"]
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          organization_id: string
          plan_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
        }
        Insert: {
          billing_period?: Database["public"]["Enums"]["billing_period"]
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id: string
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Update: {
          billing_period?: Database["public"]["Enums"]["billing_period"]
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          organization_id?: string
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      substantial_modifications: {
        Row: {
          ai_system_id: string
          conformity_assessment_status: string
          created_at: string
          description: string
          detected_at: string
          detected_by: string | null
          id: string
          modification_type: string
          new_value: string | null
          old_value: string | null
          organization_id: string
          requires_new_conformity: boolean
          reviewed_at: string | null
          reviewed_by: string | null
          waiver_reason: string | null
        }
        Insert: {
          ai_system_id: string
          conformity_assessment_status?: string
          created_at?: string
          description: string
          detected_at?: string
          detected_by?: string | null
          id?: string
          modification_type: string
          new_value?: string | null
          old_value?: string | null
          organization_id: string
          requires_new_conformity?: boolean
          reviewed_at?: string | null
          reviewed_by?: string | null
          waiver_reason?: string | null
        }
        Update: {
          ai_system_id?: string
          conformity_assessment_status?: string
          created_at?: string
          description?: string
          detected_at?: string
          detected_by?: string | null
          id?: string
          modification_type?: string
          new_value?: string | null
          old_value?: string | null
          organization_id?: string
          requires_new_conformity?: boolean
          reviewed_at?: string | null
          reviewed_by?: string | null
          waiver_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "substantial_modifications_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substantial_modifications_detected_by_fkey"
            columns: ["detected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substantial_modifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "substantial_modifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          ai_system_id: string | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          organization_id: string
          priority: string
          status: string
          task_type: string | null
          title: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          ai_system_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          priority?: string
          status?: string
          task_type?: string | null
          title: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          ai_system_id?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string
          priority?: string
          status?: string
          task_type?: string | null
          title?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_ai_system_id_fkey"
            columns: ["ai_system_id"]
            isOneToOne: false
            referencedRelation: "ai_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_documentation_annexiv: {
        Row: {
          ai_system_version_id: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          created_by: string | null
          cybersecurity_measures: Json | null
          data_requirements: Json | null
          development_process: Json | null
          doc_reference: string | null
          general_description: Json | null
          human_oversight_measures: Json | null
          id: string
          organization_id: string
          pms_reference: string | null
          risk_management_description: Json | null
          standards_applied: Json | null
          status: Database["public"]["Enums"]["doc_status"]
          testing_procedures: Json | null
          updated_at: string
        }
        Insert: {
          ai_system_version_id: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          cybersecurity_measures?: Json | null
          data_requirements?: Json | null
          development_process?: Json | null
          doc_reference?: string | null
          general_description?: Json | null
          human_oversight_measures?: Json | null
          id?: string
          organization_id: string
          pms_reference?: string | null
          risk_management_description?: Json | null
          standards_applied?: Json | null
          status?: Database["public"]["Enums"]["doc_status"]
          testing_procedures?: Json | null
          updated_at?: string
        }
        Update: {
          ai_system_version_id?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          cybersecurity_measures?: Json | null
          data_requirements?: Json | null
          development_process?: Json | null
          doc_reference?: string | null
          general_description?: Json | null
          human_oversight_measures?: Json | null
          id?: string
          organization_id?: string
          pms_reference?: string | null
          risk_management_description?: Json | null
          standards_applied?: Json | null
          status?: Database["public"]["Enums"]["doc_status"]
          testing_procedures?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_documentation_annexiv_ai_system_version_id_fkey"
            columns: ["ai_system_version_id"]
            isOneToOne: false
            referencedRelation: "ai_system_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technical_documentation_annexiv_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technical_documentation_annexiv_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technical_documentation_annexiv_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      training_records: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          created_at: string
          expires_at: string | null
          id: string
          notes: string | null
          organization_id: string
          status: string
          training_name: string
          training_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          organization_id: string
          status?: string
          training_name: string
          training_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          organization_id?: string
          status?: string
          training_name?: string
          training_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_snapshots: {
        Row: {
          active_ai_systems_count: number
          created_at: string
          exports_count: number
          id: string
          organization_id: string
          snapshot_date: string
          storage_used_bytes: number
        }
        Insert: {
          active_ai_systems_count?: number
          created_at?: string
          exports_count?: number
          id?: string
          organization_id: string
          snapshot_date?: string
          storage_used_bytes?: number
        }
        Update: {
          active_ai_systems_count?: number
          created_at?: string
          exports_count?: number
          id?: string
          organization_id?: string
          snapshot_date?: string
          storage_used_bytes?: number
        }
        Relationships: [
          {
            foreignKeyName: "usage_snapshots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_attestations: {
        Row: {
          attestation_type: string
          created_at: string
          description: string | null
          document_url: string | null
          file_path: string | null
          id: string
          notes: string | null
          organization_id: string
          status: string
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
          vendor_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          attestation_type: string
          created_at?: string
          description?: string | null
          document_url?: string | null
          file_path?: string | null
          id?: string
          notes?: string | null
          organization_id: string
          status?: string
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          vendor_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          attestation_type?: string
          created_at?: string
          description?: string | null
          document_url?: string | null
          file_path?: string | null
          id?: string
          notes?: string | null
          organization_id?: string
          status?: string
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          vendor_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_attestations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_attestations_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_attestations_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          contact_email: string | null
          contract_renewal_date: string | null
          created_at: string
          documentation_provided_at: string | null
          due_diligence_status: Database["public"]["Enums"]["due_diligence_status"]
          id: string
          incident_escalation_contact: string | null
          last_attestation_date: string | null
          model_provider: string | null
          name: string
          next_review_date: string | null
          notes: string | null
          organization_id: string
          update_cadence: string | null
          updated_at: string
          version_tracking_method: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contract_renewal_date?: string | null
          created_at?: string
          documentation_provided_at?: string | null
          due_diligence_status?: Database["public"]["Enums"]["due_diligence_status"]
          id?: string
          incident_escalation_contact?: string | null
          last_attestation_date?: string | null
          model_provider?: string | null
          name: string
          next_review_date?: string | null
          notes?: string | null
          organization_id: string
          update_cadence?: string | null
          updated_at?: string
          version_tracking_method?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contract_renewal_date?: string | null
          created_at?: string
          documentation_provided_at?: string | null
          due_diligence_status?: Database["public"]["Enums"]["due_diligence_status"]
          id?: string
          incident_escalation_contact?: string | null
          last_attestation_date?: string | null
          model_provider?: string | null
          name?: string
          next_review_date?: string | null
          notes?: string | null
          organization_id?: string
          update_cadence?: string | null
          updated_at?: string
          version_tracking_method?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_connections: {
        Row: {
          access_token: string | null
          access_token_encrypted: string | null
          connected_at: string | null
          connected_by: string | null
          created_at: string | null
          domain: string | null
          error_message: string | null
          id: string
          last_scan_at: string | null
          next_scan_at: string | null
          organization_id: string
          provider: Database["public"]["Enums"]["workspace_provider"]
          refresh_token: string | null
          refresh_token_encrypted: string | null
          scopes: string[] | null
          status: Database["public"]["Enums"]["connection_status"] | null
          token_expires_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          access_token_encrypted?: string | null
          connected_at?: string | null
          connected_by?: string | null
          created_at?: string | null
          domain?: string | null
          error_message?: string | null
          id?: string
          last_scan_at?: string | null
          next_scan_at?: string | null
          organization_id: string
          provider: Database["public"]["Enums"]["workspace_provider"]
          refresh_token?: string | null
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          access_token_encrypted?: string | null
          connected_at?: string | null
          connected_by?: string | null
          created_at?: string | null
          domain?: string | null
          error_message?: string | null
          id?: string
          last_scan_at?: string | null
          next_scan_at?: string | null
          organization_id?: string
          provider?: Database["public"]["Enums"]["workspace_provider"]
          refresh_token?: string | null
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_connections_connected_by_fkey"
            columns: ["connected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_connections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_organization_invite: {
        Args: { _token: string; _user_id: string }
        Returns: Json
      }
      can_create_organization: { Args: { _user_id: string }; Returns: boolean }
      get_user_organization_id: { Args: { _user_id: string }; Returns: string }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      user_belongs_to_org: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
      validate_invite_token: { Args: { _token: string }; Returns: Json }
    }
    Enums: {
      app_role:
        | "admin"
        | "compliance_owner"
        | "system_owner"
        | "reviewer"
        | "viewer"
      assessment_status: "draft" | "in_progress" | "completed" | "needs_review"
      assessment_type:
        | "ai_definition"
        | "prohibited_screening"
        | "high_risk_screening"
        | "transparency_screening"
        | "full_classification"
      billing_period: "monthly" | "annual"
      conformity_path_type: "annex_vi_internal" | "annex_vii_notified_body"
      conformity_status:
        | "draft"
        | "internal_review"
        | "submitted"
        | "findings"
        | "closed"
        | "certified"
        | "reassessment_triggered"
      connection_status: "active" | "disconnected" | "error" | "pending"
      discovered_tool_status:
        | "pending"
        | "reviewed"
        | "added_to_inventory"
        | "dismissed"
      doc_status: "draft" | "in_review" | "approved"
      due_diligence_status:
        | "not_started"
        | "in_progress"
        | "completed"
        | "needs_review"
      lifecycle_status: "draft" | "pilot" | "live" | "retired" | "archived"
      operator_role_type:
        | "provider"
        | "deployer"
        | "importer"
        | "distributor"
        | "authorised_representative"
      risk_level:
        | "prohibited"
        | "high_risk"
        | "limited_risk"
        | "minimal_risk"
        | "not_classified"
      serious_incident_category:
        | "death_or_serious_damage"
        | "serious_incident_with_risk"
        | "malfunctioning_with_risk"
        | "other"
      subscription_status: "trialing" | "active" | "past_due" | "canceled"
      version_status: "draft" | "released" | "withdrawn" | "recalled"
      workspace_provider: "google_workspace" | "microsoft_365"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "compliance_owner",
        "system_owner",
        "reviewer",
        "viewer",
      ],
      assessment_status: ["draft", "in_progress", "completed", "needs_review"],
      assessment_type: [
        "ai_definition",
        "prohibited_screening",
        "high_risk_screening",
        "transparency_screening",
        "full_classification",
      ],
      billing_period: ["monthly", "annual"],
      conformity_path_type: ["annex_vi_internal", "annex_vii_notified_body"],
      conformity_status: [
        "draft",
        "internal_review",
        "submitted",
        "findings",
        "closed",
        "certified",
        "reassessment_triggered",
      ],
      connection_status: ["active", "disconnected", "error", "pending"],
      discovered_tool_status: [
        "pending",
        "reviewed",
        "added_to_inventory",
        "dismissed",
      ],
      doc_status: ["draft", "in_review", "approved"],
      due_diligence_status: [
        "not_started",
        "in_progress",
        "completed",
        "needs_review",
      ],
      lifecycle_status: ["draft", "pilot", "live", "retired", "archived"],
      operator_role_type: [
        "provider",
        "deployer",
        "importer",
        "distributor",
        "authorised_representative",
      ],
      risk_level: [
        "prohibited",
        "high_risk",
        "limited_risk",
        "minimal_risk",
        "not_classified",
      ],
      serious_incident_category: [
        "death_or_serious_damage",
        "serious_incident_with_risk",
        "malfunctioning_with_risk",
        "other",
      ],
      subscription_status: ["trialing", "active", "past_due", "canceled"],
      version_status: ["draft", "released", "withdrawn", "recalled"],
      workspace_provider: ["google_workspace", "microsoft_365"],
    },
  },
} as const
