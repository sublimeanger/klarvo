import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify this is called by cron or authorized service
    const authHeader = req.headers.get("authorization");
    const cronSecret = Deno.env.get("CRON_SECRET");
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find all expired trials: status = "trialing" AND trial_end < now
    const { data: expiredTrials, error: fetchError } = await supabase
      .from("subscriptions")
      .select("id, organization_id, plan_id, trial_end")
      .eq("status", "trialing")
      .lt("trial_end", new Date().toISOString())
      .is("stripe_subscription_id", null);  // Only trials without active Stripe subscription

    if (fetchError) {
      throw new Error(`Failed to fetch expired trials: ${fetchError.message}`);
    }

    if (!expiredTrials || expiredTrials.length === 0) {
      return new Response(
        JSON.stringify({ message: "No expired trials found", count: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Downgrade each expired trial to free
    let downgraded = 0;
    for (const trial of expiredTrials) {
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          plan_id: "free",
          status: "canceled",
          cancel_at_period_end: false,
        })
        .eq("id", trial.id);

      if (updateError) {
        console.error(`Failed to downgrade org ${trial.organization_id}:`, updateError);
      } else {
        downgraded++;
        console.log(`Downgraded org ${trial.organization_id} from ${trial.plan_id} trial to free`);
      }
    }

    return new Response(
      JSON.stringify({ message: `Downgraded ${downgraded} expired trials`, count: downgraded }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("expire-trials error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
