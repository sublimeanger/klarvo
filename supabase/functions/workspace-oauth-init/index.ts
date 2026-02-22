import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// OAuth configuration
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_SECRET");
const MICROSOFT_CLIENT_ID = Deno.env.get("MICROSOFT_365_CLIENT_ID");
const MICROSOFT_TENANT_ID = Deno.env.get("MICROSOFT_365_TENANT_ID") || "common";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Verify user is authenticated
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      throw new Error("User not associated with an organization");
    }

    const { provider, redirect_uri } = await req.json();

    if (!provider || !["google_workspace", "microsoft_365"].includes(provider)) {
      throw new Error("Invalid provider. Must be 'google_workspace' or 'microsoft_365'");
    }

    if (!redirect_uri) {
      throw new Error("Missing redirect_uri");
    }

    // Validate redirect_uri against allowed origins to prevent open redirect
    const ALLOWED_ORIGINS = [
      Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
      "https://app.klarvo.io",
      "http://localhost:5173",
      "http://localhost:8080",
    ];

    try {
      new URL(redirect_uri); // Validate it's a proper URL
    } catch {
      throw new Error("Invalid redirect_uri format");
    }

    if (!ALLOWED_ORIGINS.some(origin => redirect_uri.startsWith(origin))) {
      throw new Error("Invalid redirect_uri: origin not allowed");
    }

    // Generate state token for CSRF protection
    const state = crypto.randomUUID();
    
    // Store state in database for verification during callback
    await supabase
      .from("workspace_connections")
      .insert({
        organization_id: profile.organization_id,
        provider,
        status: "pending",
        connected_by: user.id,
      });

    // We'll use the connection ID as part of the state
    const { data: pendingConnection } = await supabase
      .from("workspace_connections")
      .select("id")
      .eq("organization_id", profile.organization_id)
      .eq("provider", provider)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const statePayload = JSON.stringify({
      state,
      connection_id: pendingConnection?.id,
      redirect_uri,
    });
    const encodedState = btoa(statePayload);

    let authUrl: string;

    if (provider === "google_workspace") {
      if (!GOOGLE_CLIENT_ID) {
        throw new Error("Google Workspace OAuth not configured");
      }

      // Google Admin SDK scopes for reading installed apps
      const scopes = [
        "https://www.googleapis.com/auth/admin.directory.user.readonly",
        "https://www.googleapis.com/auth/admin.reports.audit.readonly",
        "openid",
        "email",
        "profile",
      ].join(" ");

      const callbackUrl = `${SUPABASE_URL}/functions/v1/workspace-oauth-callback`;

      const authUrlObj = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrlObj.searchParams.set("client_id", GOOGLE_CLIENT_ID);
      authUrlObj.searchParams.set("redirect_uri", callbackUrl);
      authUrlObj.searchParams.set("response_type", "code");
      authUrlObj.searchParams.set("scope", scopes);
      authUrlObj.searchParams.set("state", encodedState);
      authUrlObj.searchParams.set("access_type", "offline");
      authUrlObj.searchParams.set("prompt", "consent");
      authUrl = authUrlObj.toString();
    } else {
      // Microsoft 365
      if (!MICROSOFT_CLIENT_ID) {
        throw new Error("Microsoft 365 OAuth not configured");
      }

      // Microsoft Graph scopes for reading app permissions
      const scopes = [
        "https://graph.microsoft.com/Application.Read.All",
        "https://graph.microsoft.com/User.Read",
        "openid",
        "email",
        "profile",
        "offline_access",
      ].join(" ");

      const callbackUrl = `${SUPABASE_URL}/functions/v1/workspace-oauth-callback`;

      const authUrlObj = new URL(`https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`);
      authUrlObj.searchParams.set("client_id", MICROSOFT_CLIENT_ID);
      authUrlObj.searchParams.set("redirect_uri", callbackUrl);
      authUrlObj.searchParams.set("response_type", "code");
      authUrlObj.searchParams.set("scope", scopes);
      authUrlObj.searchParams.set("state", encodedState);
      authUrlObj.searchParams.set("response_mode", "query");
      authUrl = authUrlObj.toString();
    }

    return new Response(
      JSON.stringify({ auth_url: authUrl }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("OAuth init error:", error);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
