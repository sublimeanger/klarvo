-- Drop and recreate the task_type check constraint with expanded values
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_task_type_check;

-- Add expanded check constraint to support all task types used in the application
ALTER TABLE public.tasks ADD CONSTRAINT tasks_task_type_check CHECK (task_type IN (
    -- Core types
    'classification', 'evidence', 'review', 'training', 'documentation', 'monitoring', 'incident', 'other',
    -- Prohibited practices
    'prohibited_review',
    -- Classification
    'classification_review', 'full_classification',
    -- High-risk deployer obligations (Article 26)
    'dep_instructions', 'dep_oversight', 'dep_monitoring', 'dep_log_retention', 'dep_incident_process', 'dep_worker_notice',
    -- FRIA
    'fria_assessment', 'fria_trigger',
    -- Transparency
    'transparency_disclosure',
    -- Registration
    'eu_registration',
    -- Training/Literacy
    'ai_literacy_training',
    -- Vendor
    'vendor_due_diligence', 'vendor_attestation', 'vendor_logging', 'vendor_docs',
    -- Human oversight
    'human_oversight', 'oversight_competence',
    -- Worker
    'worker_notification',
    -- Documentation
    'upload_documentation', 'logging',
    -- Review
    'quarterly_review', 'incident_process'
));