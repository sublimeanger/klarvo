import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decryptToken, encryptToken, isEncrypted } from "../_shared/token-encryption.ts";

// OAuth configuration for token refresh
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_SECRET");
const MICROSOFT_CLIENT_ID = Deno.env.get("MICROSOFT_365_CLIENT_ID");
const MICROSOFT_CLIENT_SECRET = Deno.env.get("MICROSOFT_365_CLIENT_SECRET");
const MICROSOFT_TENANT_ID = Deno.env.get("MICROSOFT_365_TENANT_ID") || "common";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AIToolPattern {
  id: string;
  tool_name: string;
  vendor_name: string;
  detection_patterns: string[];
  category: string | null;
  is_ai_confirmed: boolean;
  typical_risk_level: string | null;
  typical_purpose: string | null;
}

interface WorkspaceConnection {
  id: string;
  organization_id: string;
  provider: string;
  status: string;
  access_token_encrypted: string | null;
  refresh_token_encrypted: string | null;
  token_expires_at: string | null;
  connected_by: string;
}

interface DiscoveredApp {
  name: string;
  displayText?: string;
  clientId?: string;
  scopes?: string[];
  userKey?: string;
}

interface DiscoveredTool {
  tool_name: string;
  vendor_name: string | null;
  matched_pattern_id: string | null;
  detected_source: string;
  detection_confidence: number;
  user_count: number | null;
  raw_metadata: Record<string, unknown>;
}

/**
 * Refresh an expired Google access token
 */
async function refreshGoogleToken(refreshToken: string): Promise<{ access_token: string; expires_in: number } | null> {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      return { access_token: data.access_token, expires_in: data.expires_in };
    }
    console.error("Google token refresh failed:", data);
    return null;
  } catch (error) {
    console.error("Error refreshing Google token:", error);
    return null;
  }
}

/**
 * Refresh an expired Microsoft access token
 */
async function refreshMicrosoftToken(refreshToken: string): Promise<{ access_token: string; expires_in: number } | null> {
  try {
    const response = await fetch(
      `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: MICROSOFT_CLIENT_ID!,
          client_secret: MICROSOFT_CLIENT_SECRET!,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      }
    );

    const data = await response.json();
    if (data.access_token) {
      return { access_token: data.access_token, expires_in: data.expires_in };
    }
    console.error("Microsoft token refresh failed:", data);
    return null;
  } catch (error) {
    console.error("Error refreshing Microsoft token:", error);
    return null;
  }
}

/**
 * Get a valid access token, refreshing if necessary
 * Handles both encrypted and legacy unencrypted tokens
 */
async function getValidAccessToken(
  connection: WorkspaceConnection,
  supabase: SupabaseClient
): Promise<string | null> {
  // Check if token is expired
  const tokenExpiresAt = connection.token_expires_at ? new Date(connection.token_expires_at) : null;
  const now = new Date();
  const bufferTime = 5 * 60 * 1000; // 5 minutes buffer

  if (tokenExpiresAt && tokenExpiresAt.getTime() - bufferTime > now.getTime()) {
    // Token is still valid - decrypt if encrypted
    if (!connection.access_token_encrypted) return null;
    
    if (isEncrypted(connection.access_token_encrypted)) {
      return await decryptToken(connection.access_token_encrypted);
    }
    // Legacy unencrypted token
    return connection.access_token_encrypted;
  }

  // Token is expired or expiring soon, try to refresh
  if (!connection.refresh_token_encrypted) {
    console.error("No refresh token available for connection:", connection.id);
    return null;
  }

  console.log("Refreshing expired token for connection:", connection.id);

  // Decrypt refresh token if encrypted
  let refreshToken = connection.refresh_token_encrypted;
  if (isEncrypted(refreshToken)) {
    refreshToken = await decryptToken(refreshToken);
  }

  let refreshResult: { access_token: string; expires_in: number } | null = null;

  if (connection.provider === "google_workspace") {
    refreshResult = await refreshGoogleToken(refreshToken);
  } else if (connection.provider === "microsoft_365") {
    refreshResult = await refreshMicrosoftToken(refreshToken);
  }

  if (!refreshResult) {
    // Mark connection as needing re-authentication
    await supabase
      .from("workspace_connections")
      .update({
        status: "token_expired",
        error_message: "Token expired and refresh failed. Please reconnect.",
      })
      .eq("id", connection.id);
    return null;
  }

  // Encrypt the new token before storing
  const encryptedNewToken = await encryptToken(refreshResult.access_token);
  
  // Update token in database with encrypted value
  const newExpiresAt = new Date(Date.now() + refreshResult.expires_in * 1000).toISOString();
  await supabase
    .from("workspace_connections")
    .update({
      access_token_encrypted: encryptedNewToken,
      token_expires_at: newExpiresAt,
    })
    .eq("id", connection.id);

  return refreshResult.access_token;
}

/**
 * Scan Google Workspace for installed OAuth apps using Admin SDK
 */
async function scanGoogleWorkspace(
  accessToken: string,
  patterns: AIToolPattern[]
): Promise<DiscoveredTool[]> {
  console.log("Scanning Google Workspace with real API...");

  const discoveredApps: DiscoveredApp[] = [];

  try {
    // Try to fetch OAuth tokens granted to apps
    // Note: This requires the Reports API scope
    const response = await fetch(
      "https://admin.googleapis.com/admin/reports/v1/activity/users/all/applications/token?maxResults=500",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      
      // Extract unique app names from token activity
      const seenApps = new Set<string>();
      for (const item of data.items || []) {
        for (const event of item.events || []) {
          for (const param of event.parameters || []) {
            if (param.name === "app_name" && param.value && !seenApps.has(param.value)) {
              seenApps.add(param.value);
              discoveredApps.push({
                name: param.value,
                displayText: param.value,
              });
            }
          }
        }
      }
      console.log(`Found ${discoveredApps.length} apps from Google Admin Reports API`);
    } else if (response.status === 403) {
      console.log("Admin Reports API access denied - trying alternative endpoint");
      
      // Fallback: Try Directory API for marketplace apps
      const directoryResponse = await fetch(
        "https://www.googleapis.com/admin/directory/v1/users?maxResults=10&customer=my_customer",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      
      if (directoryResponse.status === 200) {
        // We have directory access - could enumerate users and their tokens
        // For now, log that we have partial access
        console.log("Directory API access available but app enumeration not implemented");
      }
    } else {
      console.error("Google API error:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Error scanning Google Workspace:", error);
  }

  // If no apps found via API, return empty - don't use fake data
  if (discoveredApps.length === 0) {
    console.log("No apps discovered from Google Workspace APIs");
    return [];
  }

  return matchAppsToPatterns(discoveredApps, patterns, "google_oauth");
}

/**
 * Scan Microsoft 365 for installed apps using Graph API
 */
async function scanMicrosoft365(
  accessToken: string,
  patterns: AIToolPattern[]
): Promise<DiscoveredTool[]> {
  console.log("Scanning Microsoft 365 with real API...");

  const discoveredApps: DiscoveredApp[] = [];

  try {
    // Fetch service principals (apps installed in the tenant)
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/servicePrincipals?$top=500&$select=displayName,appId,tags",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      
      for (const app of data.value || []) {
        if (app.displayName) {
          discoveredApps.push({
            name: app.displayName,
            displayText: app.displayName,
            clientId: app.appId,
          });
        }
      }
      console.log(`Found ${discoveredApps.length} apps from Microsoft Graph API`);
    } else if (response.status === 403) {
      console.log("Service Principals API access denied - trying user consented apps");
      
      // Fallback: Try to get OAuth2 permission grants
      const grantsResponse = await fetch(
        "https://graph.microsoft.com/v1.0/oauth2PermissionGrants?$top=500",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      
      if (grantsResponse.status === 200) {
        const grantsData = await grantsResponse.json();
        const seenClientIds = new Set<string>();
        
        for (const grant of grantsData.value || []) {
          if (grant.clientId && !seenClientIds.has(grant.clientId)) {
            seenClientIds.add(grant.clientId);
            // We'd need to look up the app name from the clientId
            discoveredApps.push({
              name: `App ${grant.clientId.substring(0, 8)}`,
              clientId: grant.clientId,
            });
          }
        }
        console.log(`Found ${discoveredApps.length} apps from OAuth2 permission grants`);
      }
    } else {
      console.error("Microsoft API error:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Error scanning Microsoft 365:", error);
  }

  // If no apps found via API, return empty - don't use fake data
  if (discoveredApps.length === 0) {
    console.log("No apps discovered from Microsoft 365 APIs");
    return [];
  }

  return matchAppsToPatterns(discoveredApps, patterns, "microsoft_oauth");
}

/**
 * Match discovered apps against known AI tool patterns
 */
function matchAppsToPatterns(
  apps: DiscoveredApp[],
  patterns: AIToolPattern[],
  source: string
): DiscoveredTool[] {
  const results: DiscoveredTool[] = [];

  for (const app of apps) {
    const appName = (app.name || app.displayText || "").toLowerCase();
    
    // Try to match against patterns
    let bestMatch: AIToolPattern | null = null;
    let bestConfidence = 0;

    for (const pattern of patterns) {
      const matchScore = calculateMatchScore(appName, pattern);
      
      if (matchScore > bestConfidence) {
        bestConfidence = matchScore;
        bestMatch = pattern;
      }
    }

    // Only include if we have some confidence it's an AI tool
    if (bestMatch && bestConfidence >= 0.5) {
      results.push({
        tool_name: bestMatch.tool_name,
        vendor_name: bestMatch.vendor_name,
        matched_pattern_id: bestMatch.id,
        detected_source: source,
        detection_confidence: bestConfidence,
        user_count: null,
        raw_metadata: {
          original_name: app.name,
          display_text: app.displayText,
          client_id: app.clientId,
        },
      });
    } else if (appName.includes("ai") || appName.includes("gpt") || appName.includes("copilot") || 
               appName.includes("claude") || appName.includes("gemini") || appName.includes("llm")) {
      // Unmatched but likely AI tool
      results.push({
        tool_name: app.name || app.displayText || "Unknown AI Tool",
        vendor_name: null,
        matched_pattern_id: null,
        detected_source: source,
        detection_confidence: 0.3,
        user_count: null,
        raw_metadata: {
          original_name: app.name,
          display_text: app.displayText,
          client_id: app.clientId,
        },
      });
    }
  }

  return results;
}

/**
 * Calculate match score between app name and pattern
 */
function calculateMatchScore(appName: string, pattern: AIToolPattern): number {
  const patternName = pattern.tool_name.toLowerCase();
  const vendorName = pattern.vendor_name.toLowerCase();

  // Exact match
  if (appName === patternName) return 1.0;
  
  // Contains full tool name
  if (appName.includes(patternName)) return 0.9;
  
  // Tool name contains app name
  if (patternName.includes(appName) && appName.length > 3) return 0.8;

  // Check detection patterns
  for (const dp of pattern.detection_patterns) {
    const detectionPattern = dp.toLowerCase();
    if (appName.includes(detectionPattern)) return 0.85;
    if (detectionPattern.includes(appName) && appName.length > 3) return 0.75;
  }

  // Vendor name match
  if (appName.includes(vendorName) || vendorName.includes(appName)) return 0.6;

  return 0;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verify the user token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      throw new Error("User organization not found");
    }

    const organizationId = profile.organization_id;

    // Parse request body
    const { connection_id } = await req.json();

    if (!connection_id) {
      throw new Error("Missing connection_id");
    }

    // Get the workspace connection
    const { data: connection, error: connError } = await supabaseClient
      .from("workspace_connections")
      .select("*")
      .eq("id", connection_id)
      .eq("organization_id", organizationId)
      .single();

    if (connError || !connection) {
      throw new Error("Connection not found or unauthorized");
    }

    if (connection.status !== "active" && connection.status !== "token_expired") {
      throw new Error(`Connection is not active (status: ${connection.status})`);
    }

    // Get valid access token (refresh if needed)
    const accessToken = await getValidAccessToken(connection as WorkspaceConnection, supabaseClient);
    
    if (!accessToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Token expired and could not be refreshed. Please reconnect.",
          needs_reconnect: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Load AI tool patterns
    const { data: patterns, error: patternsError } = await supabaseClient
      .from("ai_tool_patterns")
      .select("*");

    if (patternsError) {
      throw new Error("Failed to load AI tool patterns");
    }

    const aiPatterns = patterns as AIToolPattern[];
    let discoveredTools: DiscoveredTool[] = [];

    // Perform real API scans
    if (connection.provider === "google_workspace") {
      discoveredTools = await scanGoogleWorkspace(accessToken, aiPatterns);
    } else if (connection.provider === "microsoft_365") {
      discoveredTools = await scanMicrosoft365(accessToken, aiPatterns);
    }

    // Upsert discovered tools
    for (const tool of discoveredTools) {
      // Check if tool already exists
      const { data: existing } = await supabaseClient
        .from("discovered_ai_tools")
        .select("id, first_seen_at")
        .eq("organization_id", organizationId)
        .eq("tool_name", tool.tool_name)
        .eq("workspace_connection_id", connection_id)
        .single();

      if (existing) {
        // Update existing
        await supabaseClient
          .from("discovered_ai_tools")
          .update({
            last_seen_at: new Date().toISOString(),
            user_count: tool.user_count,
            detection_confidence: tool.detection_confidence,
            raw_metadata: tool.raw_metadata,
          })
          .eq("id", existing.id);
      } else {
        // Insert new
        await supabaseClient.from("discovered_ai_tools").insert({
          organization_id: organizationId,
          workspace_connection_id: connection_id,
          tool_name: tool.tool_name,
          vendor_name: tool.vendor_name,
          matched_pattern_id: tool.matched_pattern_id,
          detected_source: tool.detected_source,
          detection_confidence: tool.detection_confidence,
          user_count: tool.user_count,
          first_seen_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
          status: "pending",
          raw_metadata: tool.raw_metadata,
        });
      }
    }

    // Update connection last_scan_at
    await supabaseClient
      .from("workspace_connections")
      .update({
        last_scan_at: new Date().toISOString(),
        next_scan_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        status: "active", // Ensure status is active after successful scan
        error_message: null,
      })
      .eq("id", connection_id);

    // Log the scan
    await supabaseClient.from("audit_logs").insert({
      organization_id: organizationId,
      user_id: user.id,
      entity_type: "workspace_connection",
      entity_id: connection_id,
      action_type: "scan_completed",
      entity_name: connection.provider,
      details: { tools_found: discoveredTools.length },
    });

    return new Response(
      JSON.stringify({
        success: true,
        tools_found: discoveredTools.length,
        tools: discoveredTools.map((t) => ({
          name: t.tool_name,
          vendor: t.vendor_name,
          confidence: t.detection_confidence,
        })),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Discovery scan error:", err);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});