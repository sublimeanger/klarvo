-- =====================================================
-- PROVIDER / IMPORTER / DISTRIBUTOR TRACK SCHEMA
-- Sprint 1: Database Foundation
-- =====================================================

-- 1. NEW ENUMS
-- -----------------------------------------------------

-- Operator role types in AI value chain
CREATE TYPE operator_role_type AS ENUM (
  'provider', 
  'deployer', 
  'importer', 
  'distributor', 
  'authorised_representative'
);

-- Conformity assessment workflow status
CREATE TYPE conformity_status AS ENUM (
  'draft', 
  'internal_review', 
  'submitted', 
  'findings', 
  'closed', 
  'certified', 
  'reassessment_triggered'
);

-- AI system version lifecycle status
CREATE TYPE version_status AS ENUM (
  'draft', 
  'released', 
  'withdrawn', 
  'recalled'
);

-- Document review status
CREATE TYPE doc_status AS ENUM (
  'draft', 
  'in_review', 
  'approved'
);

-- Conformity assessment path type
CREATE TYPE conformity_path_type AS ENUM (
  'annex_vi_internal',
  'annex_vii_notified_body'
);

-- Serious incident category (affects deadline calculation)
CREATE TYPE serious_incident_category AS ENUM (
  'death_or_serious_damage',
  'serious_incident_with_risk',
  'malfunctioning_with_risk',
  'other'
);

-- 2. AI SYSTEM OPERATOR ROLES
-- Track multiple roles per AI system with jurisdiction scope
-- -----------------------------------------------------
CREATE TABLE public.ai_system_operator_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role_type operator_role_type NOT NULL,
  jurisdiction_scope TEXT NOT NULL DEFAULT 'EU', -- EU, UK, global, etc.
  is_primary BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ai_system_id, role_type)
);

ALTER TABLE public.ai_system_operator_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view operator roles in own org"
  ON public.ai_system_operator_roles FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can insert operator roles"
  ON public.ai_system_operator_roles FOR INSERT
  WITH CHECK (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

CREATE POLICY "Authorized users can update operator roles"
  ON public.ai_system_operator_roles FOR UPDATE
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

CREATE POLICY "Authorized users can delete operator roles"
  ON public.ai_system_operator_roles FOR DELETE
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 3. AI SYSTEM VERSIONS
-- Version tracking for providers (Article 9 requires version management)
-- -----------------------------------------------------
CREATE TABLE public.ai_system_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  version_label TEXT NOT NULL,
  release_date DATE,
  relation_to_previous TEXT, -- describes changes from previous version
  predetermined_changes_summary TEXT, -- for predetermined changes under Article 6(1e)
  status version_status NOT NULL DEFAULT 'draft',
  requires_new_conformity BOOLEAN NOT NULL DEFAULT false,
  conformity_notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_system_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view versions in own org"
  ON public.ai_system_versions FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can insert versions"
  ON public.ai_system_versions FOR INSERT
  WITH CHECK (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

CREATE POLICY "Authorized users can update versions"
  ON public.ai_system_versions FOR UPDATE
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

CREATE POLICY "Authorized users can delete versions"
  ON public.ai_system_versions FOR DELETE
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 4. ECONOMIC OPERATORS
-- External parties: notified bodies, authorized representatives, etc.
-- -----------------------------------------------------
CREATE TABLE public.economic_operators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  operator_type TEXT NOT NULL, -- notified_body, authorised_representative, market_surveillance_authority
  legal_name TEXT NOT NULL,
  trading_name TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  eu_established BOOLEAN NOT NULL DEFAULT false,
  notified_body_id TEXT, -- official NB number if applicable
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.economic_operators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view operators in own org"
  ON public.economic_operators FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage operators"
  ON public.economic_operators FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 5. TECHNICAL DOCUMENTATION (ANNEX IV)
-- Structured technical documentation per version
-- -----------------------------------------------------
CREATE TABLE public.technical_documentation_annexiv (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Annex IV sections as JSONB for flexibility
  general_description JSONB DEFAULT '{}', -- purpose, provider info, versions, hardware/software
  development_process JSONB DEFAULT '{}', -- methods, third-party tools, architecture
  data_requirements JSONB DEFAULT '{}', -- datasheets, provenance, labeling
  human_oversight_measures JSONB DEFAULT '{}', -- measures & design choices
  testing_procedures JSONB DEFAULT '{}', -- datasets, metrics, test logs
  cybersecurity_measures JSONB DEFAULT '{}', -- threats, resilience
  risk_management_description JSONB DEFAULT '{}', -- summary of risk management system
  standards_applied JSONB DEFAULT '{}', -- harmonised standards, common specs
  doc_reference TEXT, -- link to DoC
  pms_reference TEXT, -- link to post-market monitoring plan
  
  status doc_status NOT NULL DEFAULT 'draft',
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.technical_documentation_annexiv ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tech docs in own org"
  ON public.technical_documentation_annexiv FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage tech docs"
  ON public.technical_documentation_annexiv FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 6. QMS DOCUMENTS
-- Quality Management System document library (Article 17)
-- -----------------------------------------------------
CREATE TABLE public.qms_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL, -- qms_policy, procedure, work_instruction, form, record
  doc_category TEXT, -- risk_management, design_control, change_control, etc.
  title TEXT NOT NULL,
  doc_number TEXT, -- internal document number
  version TEXT NOT NULL DEFAULT '1.0',
  status doc_status NOT NULL DEFAULT 'draft',
  description TEXT,
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  effective_date DATE,
  review_date DATE,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.qms_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view QMS docs in own org"
  ON public.qms_documents FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage QMS docs"
  ON public.qms_documents FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 7. CONFORMITY ASSESSMENTS
-- Conformity assessment workflow (Article 43)
-- -----------------------------------------------------
CREATE TABLE public.conformity_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  path_type conformity_path_type NOT NULL,
  notified_body_id UUID REFERENCES public.economic_operators(id),
  status conformity_status NOT NULL DEFAULT 'draft',
  certificate_id TEXT, -- certificate number if certified
  certificate_expiry DATE,
  submission_date DATE,
  closed_date DATE,
  findings_summary TEXT,
  corrective_actions JSONB DEFAULT '[]', -- array of action items
  evidence_file_id UUID REFERENCES public.evidence_files(id), -- certificate/report
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.conformity_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view conformity assessments in own org"
  ON public.conformity_assessments FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage conformity assessments"
  ON public.conformity_assessments FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 8. EU DECLARATIONS OF CONFORMITY
-- DoC generator (Annex V)
-- -----------------------------------------------------
CREATE TABLE public.eu_declarations_of_conformity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Required Annex V fields
  ai_system_name TEXT NOT NULL,
  ai_system_type TEXT,
  traceable_reference TEXT, -- unique identification
  provider_name TEXT NOT NULL,
  provider_address TEXT,
  conformity_statement TEXT, -- standard statement
  harmonised_standards JSONB DEFAULT '[]', -- array of standard references
  common_specifications JSONB DEFAULT '[]',
  notified_body_name TEXT,
  notified_body_number TEXT,
  notified_body_certificate TEXT,
  place_of_issue TEXT,
  date_of_issue DATE,
  signatory_name TEXT,
  signatory_position TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  
  generated_pdf_evidence_id UUID REFERENCES public.evidence_files(id),
  status doc_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.eu_declarations_of_conformity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view DoC in own org"
  ON public.eu_declarations_of_conformity FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage DoC"
  ON public.eu_declarations_of_conformity FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 9. CE MARKING RECORDS
-- CE marking evidence (Article 48)
-- -----------------------------------------------------
CREATE TABLE public.ce_marking_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  marking_type TEXT NOT NULL, -- digital, physical, packaging, documentation
  location_description TEXT, -- where marking is applied
  notified_body_id_displayed BOOLEAN DEFAULT false,
  notified_body_number TEXT,
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ce_marking_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view CE marking in own org"
  ON public.ce_marking_records FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage CE marking"
  ON public.ce_marking_records FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 10. EU REGISTRATION RECORDS
-- EU database registration (Article 49)
-- -----------------------------------------------------
CREATE TABLE public.eu_registration_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  eu_database_reference TEXT, -- registration ID from EU database
  registration_status TEXT NOT NULL DEFAULT 'not_started', -- not_started, draft, submitted, registered, updated
  submitted_at TIMESTAMP WITH TIME ZONE,
  registered_at TIMESTAMP WITH TIME ZONE,
  last_updated_at TIMESTAMP WITH TIME ZONE,
  registration_data JSONB DEFAULT '{}', -- Annex VIII fields
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.eu_registration_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view registration in own org"
  ON public.eu_registration_records FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage registration"
  ON public.eu_registration_records FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role]));

-- 11. POST-MARKET MONITORING PLANS
-- PMS plans (Article 72)
-- -----------------------------------------------------
CREATE TABLE public.post_market_monitoring_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Plan structure
  data_collection_methods JSONB DEFAULT '[]', -- array of methods
  performance_kpis JSONB DEFAULT '[]', -- key performance indicators
  risk_thresholds JSONB DEFAULT '{}', -- threshold definitions
  review_frequency TEXT, -- monthly, quarterly, annually
  responsible_roles JSONB DEFAULT '[]',
  escalation_procedures TEXT,
  
  status doc_status NOT NULL DEFAULT 'draft',
  next_review_date DATE,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.post_market_monitoring_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view PMS plans in own org"
  ON public.post_market_monitoring_plans FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage PMS plans"
  ON public.post_market_monitoring_plans FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 12. SERIOUS INCIDENT REPORTS
-- Serious incident reporting (Article 73)
-- -----------------------------------------------------
CREATE TABLE public.serious_incident_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  ai_system_version_id UUID REFERENCES public.ai_system_versions(id),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Incident details
  title TEXT NOT NULL,
  description TEXT,
  category serious_incident_category NOT NULL,
  aware_at TIMESTAMP WITH TIME ZONE NOT NULL, -- when provider became aware
  occurred_at TIMESTAMP WITH TIME ZONE, -- when incident occurred
  
  -- Deadline calculation (based on category)
  -- death_or_serious_damage: 2 days after awareness
  -- serious_incident_with_risk: 10 days after awareness
  -- other: 15 days after awareness
  deadline_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  affected_persons_count INTEGER,
  affected_countries JSONB DEFAULT '[]',
  root_cause_analysis TEXT,
  immediate_actions TEXT,
  corrective_actions TEXT,
  
  -- Reporting status
  status TEXT NOT NULL DEFAULT 'draft', -- draft, pending_submission, submitted, acknowledged, closed
  submitted_at TIMESTAMP WITH TIME ZONE,
  submission_reference TEXT, -- reference from authority
  market_surveillance_authority TEXT, -- which authority notified
  
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  reported_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.serious_incident_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view serious incidents in own org"
  ON public.serious_incident_reports FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage serious incidents"
  ON public.serious_incident_reports FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 13. RISK MANAGEMENT RECORDS
-- Provider risk register (Article 9)
-- -----------------------------------------------------
CREATE TABLE public.risk_management_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  risk_id TEXT, -- internal risk identifier
  hazard TEXT NOT NULL, -- description of hazard
  hazard_category TEXT, -- safety, fundamental_rights, discrimination, privacy, etc.
  impacted_stakeholders TEXT, -- who is affected
  
  -- Risk assessment
  severity TEXT NOT NULL, -- negligible, minor, moderate, major, catastrophic
  likelihood TEXT NOT NULL, -- rare, unlikely, possible, likely, almost_certain
  risk_level TEXT, -- low, medium, high, critical (calculated)
  
  -- Mitigation
  mitigation_measures TEXT,
  residual_risk_level TEXT,
  residual_risk_acceptable BOOLEAN,
  acceptance_rationale TEXT,
  
  -- Tracking
  owner_id UUID REFERENCES public.profiles(id),
  review_cadence TEXT, -- monthly, quarterly, annually
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  next_review_date DATE,
  status TEXT NOT NULL DEFAULT 'open', -- open, mitigated, accepted, closed
  
  linked_test_evidence_id UUID REFERENCES public.evidence_files(id),
  linked_incident_id UUID REFERENCES public.incidents(id),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.risk_management_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view risk records in own org"
  ON public.risk_management_records FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage risk records"
  ON public.risk_management_records FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 14. DATASET REGISTRY
-- Data governance datasets (Article 10)
-- -----------------------------------------------------
CREATE TABLE public.dataset_registry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_version_id UUID NOT NULL REFERENCES public.ai_system_versions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  purpose TEXT NOT NULL, -- training, validation, testing
  description TEXT,
  
  -- Provenance
  data_source TEXT,
  collection_method TEXT,
  collection_date_range TEXT,
  geographic_scope TEXT,
  
  -- Governance
  licenses JSONB DEFAULT '[]', -- applicable licenses
  access_restrictions TEXT,
  retention_period TEXT,
  
  -- Quality & Bias
  known_limitations TEXT,
  bias_checks_performed JSONB DEFAULT '[]',
  bias_mitigation_measures TEXT,
  data_quality_measures TEXT,
  
  -- Statistics
  record_count INTEGER,
  feature_count INTEGER,
  label_distribution JSONB DEFAULT '{}',
  
  evidence_file_id UUID REFERENCES public.evidence_files(id), -- datasheet
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dataset_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view datasets in own org"
  ON public.dataset_registry FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage datasets"
  ON public.dataset_registry FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 15. IMPORTER VERIFICATIONS
-- Importer checklist records (Article 23)
-- -----------------------------------------------------
CREATE TABLE public.importer_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Verification checklist (JSONB for flexibility)
  verification_data JSONB NOT NULL DEFAULT '{
    "conformity_assessment_carried_out": null,
    "technical_documentation_available": null,
    "instructions_for_use_available": null,
    "ce_marking_affixed": null,
    "doc_accompanies_system": null,
    "provider_identified": null,
    "authorised_rep_appointed": null,
    "contact_point_established": null,
    "storage_transport_compliant": null,
    "corrective_actions_cooperated": null
  }',
  
  -- Provider/rep details captured
  provider_name TEXT,
  provider_address TEXT,
  provider_contact TEXT,
  authorised_rep_name TEXT,
  authorised_rep_address TEXT,
  
  -- Overall status
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, compliant, non_compliant, blocked
  non_compliance_details TEXT,
  corrective_actions_taken TEXT,
  
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.importer_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view importer verifications in own org"
  ON public.importer_verifications FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage importer verifications"
  ON public.importer_verifications FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- 16. DISTRIBUTOR VERIFICATIONS
-- Distributor checklist records (Article 24)
-- -----------------------------------------------------
CREATE TABLE public.distributor_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Verification checklist (JSONB for flexibility)
  verification_data JSONB NOT NULL DEFAULT '{
    "ce_marking_present": null,
    "doc_accompanies_system": null,
    "instructions_for_use_present": null,
    "provider_identified": null,
    "importer_identified": null,
    "storage_transport_compliant": null,
    "no_modifications_made": null,
    "no_rebranding_done": null
  }',
  
  -- Escalation triggers
  has_rebranded BOOLEAN DEFAULT false,
  has_modified BOOLEAN DEFAULT false,
  escalation_to_provider_triggered BOOLEAN DEFAULT false,
  escalation_notes TEXT,
  
  -- Overall status
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, compliant, non_compliant, escalated
  non_compliance_details TEXT,
  corrective_actions_taken TEXT,
  
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  evidence_file_id UUID REFERENCES public.evidence_files(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.distributor_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view distributor verifications in own org"
  ON public.distributor_verifications FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can manage distributor verifications"
  ON public.distributor_verifications FOR ALL
  USING (organization_id = get_user_organization_id(auth.uid()) 
    AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role]));

-- =====================================================
-- TRIGGERS FOR updated_at
-- =====================================================

CREATE TRIGGER update_ai_system_operator_roles_updated_at
  BEFORE UPDATE ON public.ai_system_operator_roles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_ai_system_versions_updated_at
  BEFORE UPDATE ON public.ai_system_versions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_economic_operators_updated_at
  BEFORE UPDATE ON public.economic_operators
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_technical_documentation_annexiv_updated_at
  BEFORE UPDATE ON public.technical_documentation_annexiv
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_qms_documents_updated_at
  BEFORE UPDATE ON public.qms_documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_conformity_assessments_updated_at
  BEFORE UPDATE ON public.conformity_assessments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_eu_declarations_updated_at
  BEFORE UPDATE ON public.eu_declarations_of_conformity
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_ce_marking_records_updated_at
  BEFORE UPDATE ON public.ce_marking_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_eu_registration_records_updated_at
  BEFORE UPDATE ON public.eu_registration_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_post_market_monitoring_plans_updated_at
  BEFORE UPDATE ON public.post_market_monitoring_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_serious_incident_reports_updated_at
  BEFORE UPDATE ON public.serious_incident_reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_risk_management_records_updated_at
  BEFORE UPDATE ON public.risk_management_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_dataset_registry_updated_at
  BEFORE UPDATE ON public.dataset_registry
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_importer_verifications_updated_at
  BEFORE UPDATE ON public.importer_verifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_distributor_verifications_updated_at
  BEFORE UPDATE ON public.distributor_verifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_operator_roles_ai_system ON public.ai_system_operator_roles(ai_system_id);
CREATE INDEX idx_operator_roles_org ON public.ai_system_operator_roles(organization_id);
CREATE INDEX idx_versions_ai_system ON public.ai_system_versions(ai_system_id);
CREATE INDEX idx_versions_org ON public.ai_system_versions(organization_id);
CREATE INDEX idx_tech_docs_version ON public.technical_documentation_annexiv(ai_system_version_id);
CREATE INDEX idx_conformity_version ON public.conformity_assessments(ai_system_version_id);
CREATE INDEX idx_doc_version ON public.eu_declarations_of_conformity(ai_system_version_id);
CREATE INDEX idx_ce_marking_version ON public.ce_marking_records(ai_system_version_id);
CREATE INDEX idx_registration_version ON public.eu_registration_records(ai_system_version_id);
CREATE INDEX idx_pms_version ON public.post_market_monitoring_plans(ai_system_version_id);
CREATE INDEX idx_serious_incidents_ai_system ON public.serious_incident_reports(ai_system_id);
CREATE INDEX idx_serious_incidents_deadline ON public.serious_incident_reports(deadline_at);
CREATE INDEX idx_risk_records_version ON public.risk_management_records(ai_system_version_id);
CREATE INDEX idx_datasets_version ON public.dataset_registry(ai_system_version_id);
CREATE INDEX idx_importer_verifications_ai_system ON public.importer_verifications(ai_system_id);
CREATE INDEX idx_distributor_verifications_ai_system ON public.distributor_verifications(ai_system_id);