-- Seed acceptance criteria for all controls to enable traceability
-- Also mark critical controls as requiring N/A justification

-- Governance Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Named primary owner, oversight owner, and backup owner assigned in system record; all three must be documented.',
  na_requires_justification = true
WHERE code = 'GOV-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Inventory completeness score ≥90%; quarterly review dated within last 90 days.',
  na_requires_justification = false
WHERE code = 'GOV-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Classification memo PDF generated with reviewer name, date, and rationale documented.',
  na_requires_justification = true
WHERE code = 'GOV-03';

UPDATE public.control_library SET 
  acceptance_criteria = 'All 8 prohibited practices questions answered; explicit "No prohibited indicators" conclusion OR escalation path documented.',
  na_requires_justification = true
WHERE code = 'GOV-04';

UPDATE public.control_library SET 
  acceptance_criteria = 'Change log shows all material modifications; each triggers documented reassessment decision.',
  na_requires_justification = false
WHERE code = 'GOV-05';

-- Classification Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'AI definition test completed with clear in-scope/out-of-scope conclusion, rationale, reviewer name, and confidence level.',
  na_requires_justification = true
WHERE code = 'CLS-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'All 9 Annex III category questions answered; result documented with rationale.',
  na_requires_justification = true
WHERE code = 'CLS-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Article 50 scenarios assessed; disclosure evidence uploaded for each applicable scenario.',
  na_requires_justification = false
WHERE code = 'CLS-03';

-- Transparency Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Screenshot evidence of AI interaction disclosure shown at first user contact; copy of disclosure text stored.',
  na_requires_justification = true
WHERE code = 'TRN-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Provider documentation confirming machine-readable marking; sample output with visible marking attached.',
  na_requires_justification = true
WHERE code = 'TRN-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Disclosure method documented; screenshot showing "AI-generated/manipulated" label at content exposure point.',
  na_requires_justification = true
WHERE code = 'TRN-03';

-- High-Risk Deployer Controls (Article 26)
UPDATE public.control_library SET 
  acceptance_criteria = 'Provider instructions document uploaded; internal SOP referencing and operationalizing those instructions.',
  na_requires_justification = true
WHERE code = 'DEP-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Named oversight person documented; AI literacy training completion certificate dated within 30 days of assignment.',
  na_requires_justification = true
WHERE code = 'DEP-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Oversight SOP explicitly states authority to pause/stop system; escalation path documented.',
  na_requires_justification = true
WHERE code = 'DEP-03';

UPDATE public.control_library SET 
  acceptance_criteria = 'Data quality sampling reports attached; documented review of input representativeness.',
  na_requires_justification = false
WHERE code = 'DEP-04';

UPDATE public.control_library SET 
  acceptance_criteria = 'Monitoring plan document attached; at least one monthly monitoring report within last 30 days.',
  na_requires_justification = true
WHERE code = 'DEP-05';

UPDATE public.control_library SET 
  acceptance_criteria = 'Incident response SOP attached; escalation contacts documented; test drill record within last 12 months.',
  na_requires_justification = true
WHERE code = 'DEP-06';

UPDATE public.control_library SET 
  acceptance_criteria = 'Retention policy document specifying ≥6 months for AI logs; system configuration screenshot confirming setting.',
  na_requires_justification = true
WHERE code = 'DEP-07';

UPDATE public.control_library SET 
  acceptance_criteria = 'Worker notification document attached; date sent and recipient list documented.',
  na_requires_justification = true
WHERE code = 'DEP-08';

-- Logging Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Vendor documentation confirming logging capability; test evidence showing log generation.',
  na_requires_justification = true
WHERE code = 'LOG-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Access control policy attached; role-based access list documented.',
  na_requires_justification = false
WHERE code = 'LOG-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Sample log export file attached; export procedure documented.',
  na_requires_justification = false
WHERE code = 'LOG-03';

-- Data Governance Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Data flow diagram attached showing all input/output paths; system description included.',
  na_requires_justification = false
WHERE code = 'DATA-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Retention policy specifying input and output data periods; deletion mechanism documented.',
  na_requires_justification = false
WHERE code = 'DATA-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'DPIA document attached with DPO review; or documented rationale why DPIA not required.',
  na_requires_justification = false
WHERE code = 'DATA-03';

-- AI Literacy Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Training program document with role-based curriculum; module list attached.',
  na_requires_justification = true
WHERE code = 'LIT-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Training completion report showing ≥90% completion for relevant roles.',
  na_requires_justification = false
WHERE code = 'LIT-02';

-- Monitoring Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Incident register maintained with all AI-related incidents logged; review within last quarter.',
  na_requires_justification = true
WHERE code = 'MON-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Quarterly governance review meeting notes attached; dated within last 90 days.',
  na_requires_justification = false
WHERE code = 'MON-02';

-- Provider Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Risk management procedure document attached; risk register with mitigation actions; quarterly review record.',
  na_requires_justification = true
WHERE code = 'PROV-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Data governance policy attached; dataset registry maintained; bias assessment results documented.',
  na_requires_justification = true
WHERE code = 'PROV-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Complete Annex IV technical documentation package uploaded.',
  na_requires_justification = true
WHERE code = 'PROV-03';

UPDATE public.control_library SET 
  acceptance_criteria = 'Logging specification document; sample logs attached; retention evidence shown.',
  na_requires_justification = true
WHERE code = 'PROV-04';

UPDATE public.control_library SET 
  acceptance_criteria = 'Instructions for use document covering all Article 13 requirements; deployer guidance included.',
  na_requires_justification = true
WHERE code = 'PROV-05';

UPDATE public.control_library SET 
  acceptance_criteria = 'Human oversight design documentation; UI evidence showing oversight controls.',
  na_requires_justification = true
WHERE code = 'PROV-06';

UPDATE public.control_library SET 
  acceptance_criteria = 'Test reports attached; robustness testing results; security assessment completed.',
  na_requires_justification = true
WHERE code = 'PROV-07';

-- QMS Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'QMS manual attached; policies and procedures index maintained.',
  na_requires_justification = true
WHERE code = 'QMS-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Design control procedure attached; design review records for latest release.',
  na_requires_justification = true
WHERE code = 'QMS-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Change control procedure attached; change records maintained.',
  na_requires_justification = false
WHERE code = 'QMS-03';

UPDATE public.control_library SET 
  acceptance_criteria = 'Annual audit schedule; audit reports attached; management review minutes dated within last 12 months.',
  na_requires_justification = true
WHERE code = 'QMS-04';

-- Conformity Assessment
UPDATE public.control_library SET 
  acceptance_criteria = 'Conformity assessment records attached; certificate uploaded (if third-party path).',
  na_requires_justification = true
WHERE code = 'CONF-01';

-- Declaration and Marking
UPDATE public.control_library SET 
  acceptance_criteria = 'Signed EU Declaration of Conformity document attached with all required elements per Annex V.',
  na_requires_justification = true
WHERE code = 'DOC-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Photo/screenshot showing CE marking on product/packaging/documentation; notified body number shown (if applicable).',
  na_requires_justification = true
WHERE code = 'CEM-01';

-- Importer Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Verification checklist completed; provider conformity evidence reviewed and attached.',
  na_requires_justification = true
WHERE code = 'IMP-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Storage and transport procedures documented; no conditions compromise compliance.',
  na_requires_justification = false
WHERE code = 'IMP-02';

UPDATE public.control_library SET 
  acceptance_criteria = 'Documentation retention policy specifying 10+ years; evidence of secure storage.',
  na_requires_justification = false
WHERE code = 'IMP-03';

-- Distributor Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Verification checklist completed; CE marking and documentation presence confirmed.',
  na_requires_justification = true
WHERE code = 'DIST-01';

UPDATE public.control_library SET 
  acceptance_criteria = 'Non-compliance action procedure documented; evidence of notification to provider/importer if issues found.',
  na_requires_justification = false
WHERE code = 'DIST-02';

-- Supply Chain Controls
UPDATE public.control_library SET 
  acceptance_criteria = 'Role escalation monitoring active; quarterly review of operator responsibilities.',
  na_requires_justification = false
WHERE code = 'CHAIN-01';

-- Post-Market Surveillance
UPDATE public.control_library SET 
  acceptance_criteria = 'PMS plan document attached covering Article 72 requirements.',
  na_requires_justification = true
WHERE code = 'PMS-01';