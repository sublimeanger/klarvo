-- =====================================================
-- CONTROL LIBRARY EXPANSION
-- Provider, Importer, Distributor Controls
-- =====================================================

-- PROV: Provider Obligations (Article 16)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('PROV-01', 'Risk Management System', 'Establish and maintain a risk management system throughout the AI system lifecycle (Article 9)', 'PROV', ARRAY['provider'], 'Risk management procedure, risk register, review records', 'quarterly', 'Article 9'),
('PROV-02', 'Data Governance', 'Implement data governance and management practices for training, validation, and testing datasets (Article 10)', 'PROV', ARRAY['provider'], 'Data governance policy, dataset registry, bias assessments', 'quarterly', 'Article 10'),
('PROV-03', 'Technical Documentation', 'Prepare and maintain technical documentation per Annex IV requirements', 'PROV', ARRAY['provider'], 'Annex IV technical documentation package', 'per_release', 'Article 11, Annex IV'),
('PROV-04', 'Automatic Logging', 'Ensure AI system has automatic logging capabilities per Annex IV requirements', 'PROV', ARRAY['provider'], 'Logging specification, sample logs, retention evidence', 'per_release', 'Article 12'),
('PROV-05', 'Instructions for Use', 'Provide clear instructions for deployers including limitations, oversight requirements', 'PROV', ARRAY['provider'], 'Instructions for use document, deployer guidance', 'per_release', 'Article 13'),
('PROV-06', 'Human Oversight Design', 'Design AI system to allow effective human oversight by deployers', 'PROV', ARRAY['provider'], 'Human oversight design documentation, user interface evidence', 'per_release', 'Article 14'),
('PROV-07', 'Accuracy and Robustness', 'Ensure appropriate levels of accuracy, robustness and cybersecurity', 'PROV', ARRAY['provider'], 'Test reports, robustness testing results, security assessment', 'per_release', 'Article 15');

-- QMS: Quality Management System (Article 17)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('QMS-01', 'QMS Policies and Procedures', 'Establish documented QMS with policies, procedures, and work instructions', 'QMS', ARRAY['provider'], 'QMS manual, policies, procedures index', 'annually', 'Article 17(1)(a)'),
('QMS-02', 'Design and Development Control', 'Implement design control procedures including verification and validation', 'QMS', ARRAY['provider'], 'Design control procedure, design review records', 'per_release', 'Article 17(1)(b)'),
('QMS-03', 'Change Management', 'Manage changes to AI system design, development, and operation', 'QMS', ARRAY['provider'], 'Change control procedure, change records', 'per_change', 'Article 17(1)(c)'),
('QMS-04', 'Internal Audit and Management Review', 'Conduct internal audits and management reviews of QMS effectiveness', 'QMS', ARRAY['provider'], 'Audit schedule, audit reports, management review minutes', 'annually', 'Article 17(1)(d)');

-- CONF: Conformity Assessment (Article 43)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('CONF-01', 'Conformity Assessment Completed', 'Complete appropriate conformity assessment procedure before placing on market', 'CONF', ARRAY['provider'], 'Conformity assessment records, certificate (if applicable)', 'per_release', 'Article 43');

-- DOC: EU Declaration of Conformity (Article 47, Annex V)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('DOC-01', 'EU Declaration of Conformity', 'Draw up and maintain EU Declaration of Conformity per Annex V', 'DOC', ARRAY['provider'], 'Signed EU Declaration of Conformity', 'per_release', 'Article 47, Annex V');

-- CEM: CE Marking (Article 48)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('CEM-01', 'CE Marking Affixed', 'Affix CE marking visibly, legibly, and indelibly to AI system or documentation', 'CEM', ARRAY['provider'], 'CE marking evidence (screenshots, packaging images)', 'per_release', 'Article 48');

-- REG: EU Database Registration (Article 49)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('REG-01', 'EU Database Registration', 'Register high-risk AI system in EU database before placing on market', 'REG', ARRAY['provider', 'deployer'], 'EU database registration confirmation, Annex VIII data', 'per_release', 'Article 49, Annex VIII');

-- PMS: Post-Market Monitoring (Article 72)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('PMS-01', 'Post-Market Monitoring Plan', 'Establish documented post-market monitoring system proportionate to risk', 'PMS', ARRAY['provider'], 'PMS plan, data collection procedures, KPIs', 'annually', 'Article 72(1)'),
('PMS-02', 'Post-Market Monitoring Execution', 'Actively collect and analyze post-market performance data', 'PMS', ARRAY['provider'], 'Monitoring reports, trend analyses, corrective actions', 'quarterly', 'Article 72(2)');

-- SIR: Serious Incident Reporting (Article 73)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('SIR-01', 'Serious Incident Reporting', 'Report serious incidents to market surveillance authorities within required timeframes', 'SIR', ARRAY['provider'], 'Incident reports, authority submissions, acknowledgments', 'per_incident', 'Article 73');

-- IMP: Importer Obligations (Article 23)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('IMP-01', 'Importer Verification', 'Verify conformity assessment, technical documentation, CE marking before import', 'IMP', ARRAY['importer'], 'Verification checklist, provider documentation copies', 'per_import', 'Article 23(1)-(3)'),
('IMP-02', 'Storage and Transport Conditions', 'Ensure storage and transport conditions do not jeopardize compliance', 'IMP', ARRAY['importer'], 'Storage conditions documentation, transport procedures', 'annually', 'Article 23(5)'),
('IMP-03', 'Documentation Retention', 'Keep copy of EU DoC and make technical documentation available for 10 years', 'IMP', ARRAY['importer'], 'Document retention records, DoC copies', 'annually', 'Article 23(2)');

-- DIST: Distributor Obligations (Article 24)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('DIST-01', 'Distributor Verification', 'Verify CE marking, DoC, instructions for use, provider/importer identification', 'DIST', ARRAY['distributor'], 'Verification checklist, documentation copies', 'per_distribution', 'Article 24(1)-(2)'),
('DIST-02', 'Non-Compliance Actions', 'Take corrective action when AI system is not in conformity and inform provider/importer', 'DIST', ARRAY['distributor'], 'Non-compliance records, corrective action evidence', 'per_incident', 'Article 24(4)');

-- CHAIN: Supply Chain Role Management (Article 25)
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
('CHAIN-01', 'Role Escalation Monitoring', 'Monitor for conditions that trigger provider obligations (rebranding, substantial modification)', 'CHAIN', ARRAY['importer', 'distributor'], 'Role assessment records, escalation analysis', 'quarterly', 'Article 25');