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
          id: string
          is_ai_system: boolean | null
          is_high_risk_candidate: boolean | null
          last_material_change_at: string | null
          organization_id: string
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
          id?: string
          is_ai_system?: boolean | null
          is_high_risk_candidate?: boolean | null
          last_material_change_at?: string | null
          organization_id: string
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
          id?: string
          is_ai_system?: boolean | null
          is_high_risk_candidate?: boolean | null
          last_material_change_at?: string | null
          organization_id?: string
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
          applies_to: string[]
          article_reference: string | null
          category: string
          code: string
          created_at: string
          description: string | null
          evidence_requirements: string | null
          id: string
          name: string
          review_frequency: string | null
          updated_at: string
        }
        Insert: {
          applies_to?: string[]
          article_reference?: string | null
          category: string
          code: string
          created_at?: string
          description?: string | null
          evidence_requirements?: string | null
          id?: string
          name: string
          review_frequency?: string | null
          updated_at?: string
        }
        Update: {
          applies_to?: string[]
          article_reference?: string | null
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          evidence_requirements?: string | null
          id?: string
          name?: string
          review_frequency?: string | null
          updated_at?: string
        }
        Relationships: []
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
      organizations: {
        Row: {
          company_size: string | null
          created_at: string
          id: string
          industry_sector: string | null
          name: string
          updated_at: string
        }
        Insert: {
          company_size?: string | null
          created_at?: string
          id?: string
          industry_sector?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          company_size?: string | null
          created_at?: string
          id?: string
          industry_sector?: string | null
          name?: string
          updated_at?: string
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
          due_diligence_status: Database["public"]["Enums"]["due_diligence_status"]
          id: string
          name: string
          notes: string | null
          organization_id: string
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contract_renewal_date?: string | null
          created_at?: string
          due_diligence_status?: Database["public"]["Enums"]["due_diligence_status"]
          id?: string
          name: string
          notes?: string | null
          organization_id: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contract_renewal_date?: string | null
          created_at?: string
          due_diligence_status?: Database["public"]["Enums"]["due_diligence_status"]
          id?: string
          name?: string
          notes?: string | null
          organization_id?: string
          updated_at?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      due_diligence_status:
        | "not_started"
        | "in_progress"
        | "completed"
        | "needs_review"
      lifecycle_status: "draft" | "pilot" | "live" | "retired" | "archived"
      risk_level:
        | "prohibited"
        | "high_risk"
        | "limited_risk"
        | "minimal_risk"
        | "not_classified"
      subscription_status: "trialing" | "active" | "past_due" | "canceled"
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
      due_diligence_status: [
        "not_started",
        "in_progress",
        "completed",
        "needs_review",
      ],
      lifecycle_status: ["draft", "pilot", "live", "retired", "archived"],
      risk_level: [
        "prohibited",
        "high_risk",
        "limited_risk",
        "minimal_risk",
        "not_classified",
      ],
      subscription_status: ["trialing", "active", "past_due", "canceled"],
    },
  },
} as const
