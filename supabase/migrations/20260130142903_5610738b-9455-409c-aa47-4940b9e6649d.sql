-- Add reassessment tracking fields to ai_system_classifications
ALTER TABLE public.ai_system_classifications
ADD COLUMN IF NOT EXISTS reassessment_needed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reassessment_reason TEXT,
ADD COLUMN IF NOT EXISTS reassessment_triggered_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_material_change_at TIMESTAMPTZ;

-- Create index for finding systems needing reassessment
CREATE INDEX IF NOT EXISTS idx_classifications_reassessment 
ON public.ai_system_classifications(reassessment_needed) 
WHERE reassessment_needed = true;