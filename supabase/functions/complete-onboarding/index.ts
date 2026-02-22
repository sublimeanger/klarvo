import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[COMPLETE-ONBOARDING] ${step}${d}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  // Anon client to verify the user's JWT
  const anonClient = createClient(supabaseUrl, anonKey);
  // Service role client for privileged operations
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    logStep("Function started");

    // 1. Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await anonClient.auth.getUser(token);
    if (authError || !userData.user) throw new Error("Authentication failed");

    const userId = userData.user.id;
    logStep("User authenticated", { userId });

    // 2. Parse and validate input
    const { companyName, industrySector, companySize, selectedRole } = await req.json();

    if (!companyName || typeof companyName !== "string" || companyName.trim().length < 2) {
      throw new Error("Company name must be at least 2 characters");
    }
    if (!industrySector || typeof industrySector !== "string") {
      throw new Error("Industry sector is required");
    }
    if (!companySize || typeof companySize !== "string") {
      throw new Error("Company size is required");
    }
    logStep("Input validated", { companyName, industrySector, companySize, selectedRole });

    // 3. Verify user hasn't already completed onboarding
    const { data: profile, error: profileErr } = await adminClient
      .from("profiles")
      .select("onboarding_completed, organization_id")
      .eq("id", userId)
      .single();

    if (profileErr) throw new Error("Failed to fetch profile");

    if (profile.onboarding_completed) {
      throw new Error("Onboarding already completed");
    }
    if (profile.organization_id) {
      throw new Error("User already belongs to an organization");
    }
    logStep("Pre-conditions verified");

    // 4. Create organization
    const { data: org, error: orgError } = await adminClient
      .from("organizations")
      .insert({
        name: companyName.trim(),
        industry_sector: industrySector,
        company_size: companySize,
      })
      .select("id")
      .single();

    if (orgError) throw new Error(`Failed to create organization: ${orgError.message}`);
    logStep("Organization created", { orgId: org.id });

    // 5. Update profile to link to org
    const { error: updateErr } = await adminClient
      .from("profiles")
      .update({
        organization_id: org.id,
        onboarding_completed: true,
      })
      .eq("id", userId);

    if (updateErr) throw new Error(`Failed to update profile: ${updateErr.message}`);
    logStep("Profile updated");

    // 6. FORCE role to 'admin' — org creator is always admin regardless of selectedRole
    const { error: roleErr } = await adminClient
      .from("user_roles")
      .insert({
        user_id: userId,
        organization_id: org.id,
        role: "admin",
      });

    if (roleErr) throw new Error(`Failed to assign role: ${roleErr.message}`);
    logStep("Admin role assigned (forced server-side)");

    // 7. Create subscription with FIXED values
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 14);

    const { error: subErr } = await adminClient
      .from("subscriptions")
      .insert({
        organization_id: org.id,
        plan_id: "growth",
        status: "trialing",
        billing_period: "annual",
        trial_end: trialEnd.toISOString(),
        current_period_start: now.toISOString(),
        current_period_end: trialEnd.toISOString(),
      });

    if (subErr) throw new Error(`Failed to create subscription: ${subErr.message}`);
    logStep("Subscription created (growth trial, 14 days)");

    return new Response(
      JSON.stringify({ organization_id: org.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message });
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
