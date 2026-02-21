// Shared AI privacy utilities for edge functions
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface AIPrivacySettings {
  ai_features_enabled: boolean;
  ai_data_sharing_mode: 'standard' | 'minimal' | 'disabled';
  ai_never_send_evidence_text: boolean;
  ai_chat_enabled: boolean;
  ai_intake_enabled: boolean;
  ai_classification_enabled: boolean;
  ai_document_enabled: boolean;
  ai_copilot_enabled: boolean;
}

export interface PrivacyCheckResult {
  allowed: boolean;
  errorMessage?: string;
  errorStatus?: number;
  settings?: AIPrivacySettings;
}

export const DEFAULT_SETTINGS: AIPrivacySettings = {
  ai_features_enabled: true,
  ai_data_sharing_mode: 'standard',
  ai_never_send_evidence_text: false,
  ai_chat_enabled: true,
  ai_intake_enabled: true,
  ai_classification_enabled: true,
  ai_document_enabled: true,
  ai_copilot_enabled: true,
};

/**
 * Get the organization ID from an authenticated request
 */
export async function getOrganizationId(
  supabaseUrl: string,
  supabaseServiceKey: string,
  authHeader: string | null
): Promise<{ organizationId: string | null; error?: string }> {
  if (!authHeader) {
    return { organizationId: null, error: "Unauthorized" };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return { organizationId: null, error: "Unauthorized" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (!profile?.organization_id) {
    return { organizationId: null, error: "No organization found" };
  }

  return { organizationId: profile.organization_id };
}

/**
 * Fetch AI privacy settings for an organization
 */
export async function fetchAIPrivacySettings(
  supabaseUrl: string,
  supabaseServiceKey: string,
  organizationId: string
): Promise<AIPrivacySettings> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data } = await supabase
    .from("organizations")
    .select(`
      ai_features_enabled,
      ai_data_sharing_mode,
      ai_never_send_evidence_text,
      ai_chat_enabled,
      ai_intake_enabled,
      ai_classification_enabled,
      ai_document_enabled,
      ai_copilot_enabled
    `)
    .eq("id", organizationId)
    .single();

  if (!data) {
    return DEFAULT_SETTINGS;
  }

  return {
    ai_features_enabled: data.ai_features_enabled ?? true,
    ai_data_sharing_mode: data.ai_data_sharing_mode ?? 'standard',
    ai_never_send_evidence_text: data.ai_never_send_evidence_text ?? false,
    ai_chat_enabled: data.ai_chat_enabled ?? true,
    ai_intake_enabled: data.ai_intake_enabled ?? true,
    ai_classification_enabled: data.ai_classification_enabled ?? true,
    ai_document_enabled: data.ai_document_enabled ?? true,
    ai_copilot_enabled: data.ai_copilot_enabled ?? true,
  };
}

/**
 * Check if a specific AI feature is allowed for an organization
 */
export async function checkAIFeatureAllowed(
  supabaseUrl: string,
  supabaseServiceKey: string,
  authHeader: string | null,
  featureName: 'chat' | 'intake' | 'classification' | 'document' | 'copilot'
): Promise<PrivacyCheckResult> {
  // Get organization ID
  const { organizationId, error } = await getOrganizationId(supabaseUrl, supabaseServiceKey, authHeader);
  
  if (error || !organizationId) {
    return { 
      allowed: false, 
      errorMessage: error || "Unauthorized", 
      errorStatus: 401 
    };
  }

  // Fetch AI privacy settings
  const settings = await fetchAIPrivacySettings(supabaseUrl, supabaseServiceKey, organizationId);

  // Check master toggle
  if (!settings.ai_features_enabled) {
    return { 
      allowed: false, 
      errorMessage: "AI features are disabled for your organization. An admin can enable them in Settings.", 
      errorStatus: 403,
      settings 
    };
  }

  // Check data sharing mode
  if (settings.ai_data_sharing_mode === 'disabled') {
    return { 
      allowed: false, 
      errorMessage: "AI data sharing is disabled for your organization.", 
      errorStatus: 403,
      settings 
    };
  }

  // Check feature-specific toggle
  const featureToggleMap: Record<string, keyof AIPrivacySettings> = {
    chat: 'ai_chat_enabled',
    intake: 'ai_intake_enabled',
    classification: 'ai_classification_enabled',
    document: 'ai_document_enabled',
    copilot: 'ai_copilot_enabled',
  };

  const featureKey = featureToggleMap[featureName];
  if (featureKey && !settings[featureKey]) {
    const featureDisplayNames: Record<string, string> = {
      chat: 'AI Chat',
      intake: 'AI-Powered Intake',
      classification: 'Classification Assistant',
      document: 'Document Intelligence',
      copilot: 'Compliance Copilot',
    };
    
    return { 
      allowed: false, 
      errorMessage: `${featureDisplayNames[featureName]} is disabled for your organization.`, 
      errorStatus: 403,
      settings 
    };
  }

  // Special check for document intelligence + evidence text
  if (featureName === 'document' && settings.ai_never_send_evidence_text) {
    return { 
      allowed: false, 
      errorMessage: "Evidence text analysis is disabled for your organization to protect document privacy.", 
      errorStatus: 403,
      settings 
    };
  }

  return { allowed: true, settings };
}

/**
 * Check if the authenticated user has one of the required roles
 */
export async function checkUserRole(
  supabaseUrl: string,
  supabaseServiceKey: string,
  authHeader: string | null,
  allowedRoles: string[]
): Promise<{ allowed: boolean; role?: string; errorMessage?: string; errorStatus?: number }> {
  const { organizationId, error } = await getOrganizationId(supabaseUrl, supabaseServiceKey, authHeader);

  if (error || !organizationId) {
    return { allowed: false, errorMessage: error || "Unauthorized", errorStatus: 401 };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const token = authHeader!.replace("Bearer ", "");
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user) {
    return { allowed: false, errorMessage: "Unauthorized", errorStatus: 401 };
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("organization_id", organizationId)
    .single();

  if (!roleData || !allowedRoles.includes(roleData.role)) {
    return {
      allowed: false,
      errorMessage: "You don't have permission to use this feature",
      errorStatus: 403
    };
  }

  return { allowed: true, role: roleData.role };
}

/**
 * Create a standardized error response for AI privacy checks
 */
export function createPrivacyErrorResponse(result: PrivacyCheckResult, corsHeaders: Record<string, string>): Response {
  return new Response(
    JSON.stringify({ 
      error: result.errorMessage,
      privacy_restricted: true,
    }),
    { 
      status: result.errorStatus || 403, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    }
  );
}
