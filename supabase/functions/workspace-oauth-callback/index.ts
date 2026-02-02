import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// OAuth configuration
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_WORKSPACE_CLIENT_SECRET");
const MICROSOFT_CLIENT_ID = Deno.env.get("MICROSOFT_365_CLIENT_ID");
const MICROSOFT_CLIENT_SECRET = Deno.env.get("MICROSOFT_365_CLIENT_SECRET");
const MICROSOFT_TENANT_ID = Deno.env.get("MICROSOFT_365_TENANT_ID") || "common";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

interface StatePayload {
  state: string;
  connection_id: string;
  redirect_uri: string;
}

/**
 * Exchange authorization code for tokens with Google
 */
async function exchangeGoogleCode(
  code: string,
  callbackUrl: string
): Promise<{ tokenData: TokenData; userDomain: string | null }> {
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      redirect_uri: callbackUrl,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    console.error("Google token exchange failed:", tokenData);
    throw new Error("Failed to exchange code for tokens with Google");
  }

  // Get user info to extract domain
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  );
  const userInfo = await userInfoResponse.json();
  
  let userDomain: string | null = null;
  if (userInfo.hd) {
    userDomain = userInfo.hd; // Google Workspace domain
  } else if (userInfo.email) {
    userDomain = userInfo.email.split("@")[1];
  }

  return { tokenData, userDomain };
}

/**
 * Exchange authorization code for tokens with Microsoft
 */
async function exchangeMicrosoftCode(
  code: string,
  callbackUrl: string
): Promise<{ tokenData: TokenData; userDomain: string | null }> {
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: MICROSOFT_CLIENT_ID!,
        client_secret: MICROSOFT_CLIENT_SECRET!,
        redirect_uri: callbackUrl,
        grant_type: "authorization_code",
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    console.error("Microsoft token exchange failed:", tokenData);
    throw new Error("Failed to exchange code for tokens with Microsoft");
  }

  // Get user info to extract domain
  const userInfoResponse = await fetch(
    "https://graph.microsoft.com/v1.0/me",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  );
  const userInfo = await userInfoResponse.json();
  
  let userDomain: string | null = null;
  if (userInfo.mail) {
    userDomain = userInfo.mail.split("@")[1];
  } else if (userInfo.userPrincipalName) {
    userDomain = userInfo.userPrincipalName.split("@")[1];
  }

  return { tokenData, userDomain };
}

/**
 * Parse and validate the state parameter
 */
function parseState(encodedState: string | null): StatePayload {
  if (!encodedState) {
    throw new Error("Missing state parameter");
  }
  
  try {
    return JSON.parse(atob(encodedState));
  } catch {
    throw new Error("Invalid state parameter");
  }
}

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const encodedState = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    // Parse state
    const { connection_id, redirect_uri } = parseState(encodedState);

    // Use service role to update connection status
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Handle OAuth errors
    if (error) {
      console.error("OAuth error:", error, errorDescription);
      
      await supabase
        .from("workspace_connections")
        .update({
          status: "error",
          error_message: errorDescription || error,
        })
        .eq("id", connection_id);

      return Response.redirect(
        `${redirect_uri}?error=${encodeURIComponent(errorDescription || error)}`
      );
    }

    if (!code) {
      throw new Error("Missing authorization code");
    }

    // Get connection to determine provider
    const { data: connection, error: connError } = await supabase
      .from("workspace_connections")
      .select("*")
      .eq("id", connection_id)
      .single();

    if (connError || !connection) {
      throw new Error("Connection not found");
    }

    const callbackUrl = `${SUPABASE_URL}/functions/v1/workspace-oauth-callback`;
    let tokenData: TokenData;
    let userDomain: string | null = null;

    if (connection.provider === "google_workspace") {
      const result = await exchangeGoogleCode(code, callbackUrl);
      tokenData = result.tokenData;
      userDomain = result.userDomain;
    } else {
      const result = await exchangeMicrosoftCode(code, callbackUrl);
      tokenData = result.tokenData;
      userDomain = result.userDomain;
    }

    // Calculate token expiration time
    const tokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    // Update connection with tokens (encrypted at rest by Supabase)
    // Store tokens for real API access during discovery scans
    const { error: updateError } = await supabase
      .from("workspace_connections")
      .update({
        status: "active",
        domain: userDomain,
        error_message: null,
        access_token_encrypted: tokenData.access_token,
        refresh_token_encrypted: tokenData.refresh_token || null,
        token_expires_at: tokenExpiresAt,
      })
      .eq("id", connection_id);

    if (updateError) {
      throw updateError;
    }

    // Log the connection event
    await supabase.from("audit_logs").insert({
      organization_id: connection.organization_id,
      user_id: connection.connected_by,
      entity_type: "workspace_connection",
      entity_id: connection_id,
      action_type: "connected",
      entity_name: connection.provider,
      details: { domain: userDomain },
    });

    // Redirect back to the app
    return Response.redirect(`${redirect_uri}?success=true`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    
    // Try to redirect with error, fallback to JSON response
    try {
      const url = new URL(req.url);
      const encodedState = url.searchParams.get("state");
      if (encodedState) {
        const { redirect_uri } = JSON.parse(atob(encodedState));
        return Response.redirect(
          `${redirect_uri}?error=${encodeURIComponent(errorMessage)}`
        );
      }
    } catch {}

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});