import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Price IDs mapping for plans
const PLAN_PRICE_IDS: Record<string, Record<string, string>> = {
  starter: {
    monthly: "price_1SvFtsE8C88su4JmiYxaajQ3",
    annual: "price_1SvFttE8C88su4JmrPjV2zFt",
  },
  growth: {
    monthly: "price_1SvFtuE8C88su4JmD6lZSKM2",
    annual: "price_1SvFtvE8C88su4JmzSFfVNQZ",
  },
  pro: {
    monthly: "price_1SvFtxE8C88su4JmBryivOwL",
    annual: "price_1SvFtxE8C88su4JmWPzqgBcw",
  },
};

// Price IDs mapping for add-ons (operator tracks)
const ADDON_PRICE_IDS: Record<string, Record<string, string>> = {
  importer_distributor: {
    monthly: "price_1Sw3CdE8C88su4Jmn8qJuNqR",
    annual: "price_1Sw3CoE8C88su4JmJeTSb5iB",
  },
  provider_track: {
    monthly: "price_1Sw3CeE8C88su4JmntWff0cV",
    annual: "price_1Sw3CpE8C88su4Jmp50WMdGu",
  },
  provider_assurance: {
    monthly: "price_1Sw3CgE8C88su4Jme5Sevrzo",
    annual: "price_1Sw3CrE8C88su4Jm4RNZAGm9",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    // Get the user from the auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    // Get user's profile and organization
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      throw new Error("User profile or organization not found");
    }

    // Get organization details
    const { data: org, error: orgError } = await supabaseClient
      .from("organizations")
      .select("name")
      .eq("id", profile.organization_id)
      .single();

    if (orgError || !org) {
      throw new Error("Organization not found");
    }

    // Get or create Stripe customer
    const { data: subscription } = await supabaseClient
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("organization_id", profile.organization_id)
      .single();

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    let customerId = subscription?.stripe_customer_id;

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: org.name,
        metadata: {
          organization_id: profile.organization_id,
          user_id: user.id,
        },
      });
      customerId = customer.id;

      // Update subscription with customer ID
      await supabaseClient
        .from("subscriptions")
        .update({ stripe_customer_id: customerId })
        .eq("organization_id", profile.organization_id);
    }

    // Parse request body
    const body = await req.json();
    const { planId, billingPeriod, addonId, checkoutType = "plan" } = body;

    if (!billingPeriod) {
      throw new Error("billingPeriod is required");
    }

    const origin = req.headers.get("origin") || "https://localhost:5173";
    let session: Stripe.Checkout.Session;

    if (checkoutType === "addon" && addonId) {
      // Handle add-on purchase
      const addonPriceId = ADDON_PRICE_IDS[addonId]?.[billingPeriod];
      if (!addonPriceId) {
        throw new Error(`Invalid addon: ${addonId} ${billingPeriod}`);
      }

      // Check if user has an active subscription first
      const { data: currentSub } = await supabaseClient
        .from("subscriptions")
        .select("stripe_subscription_id, plan_id")
        .eq("organization_id", profile.organization_id)
        .single();

      if (!currentSub?.stripe_subscription_id || currentSub.plan_id === "free") {
        throw new Error("An active subscription is required to purchase add-ons");
      }

      // Add addon to existing subscription
      const stripeSubscription = await stripe.subscriptions.retrieve(
        currentSub.stripe_subscription_id
      );

      // Check if addon already exists
      const existingItem = stripeSubscription.items.data.find(
        (item: Stripe.SubscriptionItem) => ADDON_PRICE_IDS[addonId] && 
          Object.values(ADDON_PRICE_IDS[addonId]).includes(item.price.id)
      );

      if (existingItem) {
        throw new Error("This add-on is already active on your subscription");
      }

      // Create a checkout session to add the addon
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: addonPriceId,
            quantity: 1,
          },
        ],
        success_url: `${origin}/settings/billing?success=true&addon=${addonId}`,
        cancel_url: `${origin}/settings/billing?canceled=true`,
        metadata: {
          organization_id: profile.organization_id,
          addon_id: addonId,
          billing_period: billingPeriod,
          checkout_type: "addon",
        },
        subscription_data: {
          metadata: {
            organization_id: profile.organization_id,
            addon_id: addonId,
          },
        },
      });
    } else {
      // Handle plan purchase (existing logic)
      if (!planId) {
        throw new Error("planId is required for plan checkout");
      }

      const priceId = PLAN_PRICE_IDS[planId]?.[billingPeriod];
      if (!priceId) {
        throw new Error(`Invalid plan: ${planId} ${billingPeriod}`);
      }

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${origin}/settings/billing?success=true`,
        cancel_url: `${origin}/settings/billing?canceled=true`,
        metadata: {
          organization_id: profile.organization_id,
          plan_id: planId,
          billing_period: billingPeriod,
          checkout_type: "plan",
        },
        subscription_data: {
          metadata: {
            organization_id: profile.organization_id,
            plan_id: planId,
          },
        },
      });
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Checkout session error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
