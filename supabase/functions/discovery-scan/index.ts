import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// OAuth configuration
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_SECRET");

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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

interface GoogleApp {
  name?: string;
  displayText?: string;
  clientId?: string;
  scopes?: string[];
  userKey?: string;
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

    if (connection.status !== "active") {
      throw new Error("Connection is not active");
    }

    // Load AI tool patterns
    const { data: patterns, error: patternsError } = await supabaseClient
      .from("ai_tool_patterns")
      .select("*");

    if (patternsError) {
      throw new Error("Failed to load AI tool patterns");
    }

    const aiPatterns = patterns as AIToolPattern[];
    let discoveredTools: Array<{
      tool_name: string;
      vendor_name: string | null;
      matched_pattern_id: string | null;
      detected_source: string;
      detection_confidence: number;
      user_count: number | null;
      raw_metadata: Record<string, unknown>;
    }> = [];

    if (connection.provider === "google_workspace") {
      discoveredTools = await scanGoogleWorkspace(connection, aiPatterns);
    } else if (connection.provider === "microsoft_365") {
      discoveredTools = await scanMicrosoft365(connection, aiPatterns);
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
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

// Scan Google Workspace for AI tools
async function scanGoogleWorkspace(
  connection: Record<string, unknown>,
  patterns: AIToolPattern[]
): Promise<Array<{
  tool_name: string;
  vendor_name: string | null;
  matched_pattern_id: string | null;
  detected_source: string;
  detection_confidence: number;
  user_count: number | null;
  raw_metadata: Record<string, unknown>;
}>> {
  // Note: In production, you would need to:
  // 1. Store and retrieve the access_token from a secure vault
  // 2. Implement token refresh logic
  // 3. Use Google Admin SDK to list installed apps
  
  // For demo purposes, we'll simulate discovering some common AI tools
  // In production, this would call:
  // - Google Admin SDK: https://admin.googleapis.com/admin/directory/v1/users/{userKey}/tokens
  // - Or: https://admin.googleapis.com/admin/reports/v1/activity/users/all/applications/token

  console.log("Scanning Google Workspace for connection:", connection.id);

  // Simulated discovered apps (in production, this comes from Google APIs)
  const simulatedApps: GoogleApp[] = [
    { name: "ChatGPT", displayText: "ChatGPT", clientId: "chatgpt-client" },
    { name: "Grammarly", displayText: "Grammarly", clientId: "grammarly-client" },
    { name: "Notion", displayText: "Notion", clientId: "notion-client" },
    { name: "Slack", displayText: "Slack", clientId: "slack-client" },
  ];

  return matchAppsToPatterns(simulatedApps, patterns, "google_oauth");
}

// Scan Microsoft 365 for AI tools  
async function scanMicrosoft365(
  connection: Record<string, unknown>,
  patterns: AIToolPattern[]
): Promise<Array<{
  tool_name: string;
  vendor_name: string | null;
  matched_pattern_id: string | null;
  detected_source: string;
  detection_confidence: number;
  user_count: number | null;
  raw_metadata: Record<string, unknown>;
}>> {
  // Note: In production, you would:
  // 1. Use Microsoft Graph API to list service principals / app registrations
  // 2. Call: https://graph.microsoft.com/v1.0/servicePrincipals
  // 3. Or audit logs: https://graph.microsoft.com/v1.0/auditLogs/signIns

  console.log("Scanning Microsoft 365 for connection:", connection.id);

  // Simulated discovered apps
  const simulatedApps: GoogleApp[] = [
    { name: "Microsoft Copilot", displayText: "Copilot", clientId: "copilot-client" },
    { name: "GitHub Copilot", displayText: "GitHub Copilot", clientId: "gh-copilot" },
    { name: "Zoom", displayText: "Zoom", clientId: "zoom-client" },
  ];

  return matchAppsToPatterns(simulatedApps, patterns, "microsoft_oauth");
}

// Match discovered apps against known AI tool patterns
function matchAppsToPatterns(
  apps: GoogleApp[],
  patterns: AIToolPattern[],
  source: string
): Array<{
  tool_name: string;
  vendor_name: string | null;
  matched_pattern_id: string | null;
  detected_source: string;
  detection_confidence: number;
  user_count: number | null;
  raw_metadata: Record<string, unknown>;
}> {
  const results: Array<{
    tool_name: string;
    vendor_name: string | null;
    matched_pattern_id: string | null;
    detected_source: string;
    detection_confidence: number;
    user_count: number | null;
    raw_metadata: Record<string, unknown>;
  }> = [];

  for (const app of apps) {
    const appName = (app.name || app.displayText || "").toLowerCase();
    
    // Try to match against patterns
    let bestMatch: AIToolPattern | null = null;
    let bestConfidence = 0;

    for (const pattern of patterns) {
      // Check if app name matches any detection pattern
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
    } else if (appName.includes("ai") || appName.includes("gpt") || appName.includes("copilot")) {
      // Unmatched but likely AI tool
      results.push({
        tool_name: app.name || app.displayText || "Unknown AI Tool",
        vendor_name: null,
        matched_pattern_id: null,
        detected_source: source,
        detection_confidence: 0.3, // Low confidence for unmatched
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

// Calculate match score between app name and pattern
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
