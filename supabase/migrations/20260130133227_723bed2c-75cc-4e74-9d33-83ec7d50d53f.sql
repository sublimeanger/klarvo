-- Tasks table for compliance tracking
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Task details
    title TEXT NOT NULL,
    description TEXT,
    
    -- Priority and status
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'blocked')),
    
    -- Dates
    due_date DATE,
    completed_at TIMESTAMPTZ,
    
    -- Assignment
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.profiles(id),
    
    -- Linkages
    ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
    
    -- Task type for categorization
    task_type TEXT CHECK (task_type IN (
        'classification', 'evidence', 'review', 'training', 
        'documentation', 'monitoring', 'incident', 'other'
    )),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view tasks in own org"
    ON public.tasks FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can create tasks"
    ON public.tasks FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can update tasks"
    ON public.tasks FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete tasks"
    ON public.tasks FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();