import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  email: string;
  role: "admin" | "compliance_owner" | "system_owner" | "reviewer" | "viewer";
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's token to verify identity
    const supabaseUser = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get current user
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create service role client for privileged operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user's organization and role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id, full_name")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      return new Response(
        JSON.stringify({ error: "User not part of an organization" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check user has admin or compliance_owner role
    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("organization_id", profile.organization_id)
      .single();

    if (!userRole || !["admin", "compliance_owner"].includes(userRole.role)) {
      return new Response(
        JSON.stringify({ error: "Only admins and compliance owners can invite members" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Compliance owners cannot invite admins
    const { email, role }: InviteRequest = await req.json();
    if (userRole.role === "compliance_owner" && role === "admin") {
      return new Response(
        JSON.stringify({ error: "Compliance owners cannot invite admin users" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user already exists in the organization
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("organization_id", profile.organization_id)
      .ilike("id", `%`) // We need to check by email from auth.users
      .limit(1);

    // Check for existing pending invite
    const { data: existingInvite } = await supabase
      .from("organization_invites")
      .select("id, status")
      .eq("organization_id", profile.organization_id)
      .eq("email", email.toLowerCase())
      .eq("status", "pending")
      .single();

    if (existingInvite) {
      return new Response(
        JSON.stringify({ error: "An invite is already pending for this email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get organization name
    const { data: org } = await supabase
      .from("organizations")
      .select("name")
      .eq("id", profile.organization_id)
      .single();

    // Create the invite
    const { data: invite, error: inviteError } = await supabase
      .from("organization_invites")
      .insert({
        organization_id: profile.organization_id,
        email: email.toLowerCase(),
        role,
        invited_by: user.id,
      })
      .select()
      .single();

    if (inviteError) {
      console.error("Invite creation error:", inviteError);
      return new Response(
        JSON.stringify({ error: "Failed to create invite" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate invite URL
    const baseUrl = req.headers.get("origin") || "https://klarvo.lovable.app";
    const inviteUrl = `${baseUrl}/invite/${invite.token}`;

    // Send email via Resend
    if (resendApiKey) {
      const inviterName = profile.full_name || "A team member";
      const orgName = org?.name || "their organization";
      const roleLabel = {
        admin: "Admin",
        compliance_owner: "Compliance Owner",
        system_owner: "System Owner",
        reviewer: "Reviewer",
        viewer: "Viewer",
      }[role];

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Klarvo <noreply@klarvo.com>",
          to: [email],
          subject: `You've been invited to join ${orgName} on Klarvo`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="https://klarvo.lovable.app/klarvo-logo-primary.svg" alt="Klarvo" style="height: 40px;" />
                </div>
                
                <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">You're invited to join ${orgName}</h1>
                
                <p style="margin-bottom: 16px;">
                  ${inviterName} has invited you to join <strong>${orgName}</strong> on Klarvo as a <strong>${roleLabel}</strong>.
                </p>
                
                <p style="margin-bottom: 24px;">
                  Klarvo helps organizations manage EU AI Act compliance with AI system inventories, risk classifications, and audit-ready evidence packs.
                </p>
                
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${inviteUrl}" style="background-color: #0d9373; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                    Accept Invitation
                  </a>
                </div>
                
                <p style="color: #666; font-size: 14px; margin-top: 24px;">
                  This invite expires in 7 days. If you didn't expect this invitation, you can safely ignore this email.
                </p>
                
                <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
                
                <p style="color: #999; font-size: 12px; text-align: center;">
                  Klarvo · EU AI Act Compliance Platform<br/>
                  <a href="https://klarvo.lovable.app" style="color: #0d9373;">klarvo.lovable.app</a>
                </p>
              </body>
            </html>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email send error:", await emailResponse.text());
        // Don't fail the invite creation, just log the error
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email send");
      console.log("Invite URL:", inviteUrl);
    }

    return new Response(
      JSON.stringify({
        success: true,
        invite: {
          id: invite.id,
          email: invite.email,
          role: invite.role,
          expires_at: invite.expires_at,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-team-invite:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
