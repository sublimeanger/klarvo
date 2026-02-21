import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Plan price IDs from environment (allows test/live switching)
const PLAN_PRICE_IDS: Record<string, Record<string, string>> = {
  starter: {
    monthly: Deno.env.get("STRIPE_PRICE_STARTER_MONTHLY") || "price_1SwRgRE5Z0P87vcieb31CciX",
    annual: Deno.env.get("STRIPE_PRICE_STARTER_ANNUAL") || "price_1SwRgSE5Z0P87vciaateHbEt",
  },
  growth: {
    monthly: Deno.env.get("STRIPE_PRICE_GROWTH_MONTHLY") || "price_1SwRgUE5Z0P87vciYIcVI7ju",
    annual: Deno.env.get("STRIPE_PRICE_GROWTH_ANNUAL") || "price_1SwRgVE5Z0P87vciJyDiTPSk",
  },
  pro: {
    monthly: Deno.env.get("STRIPE_PRICE_PRO_MONTHLY") || "price_1SwRgWE5Z0P87vcinPPbuZYm",
    annual: Deno.env.get("STRIPE_PRICE_PRO_ANNUAL") || "price_1SwRgXE5Z0P87vci5F3a3Sg1",
  },
};

// Add-on price IDs from environment (allows test/live switching)
const ADDON_PRICE_IDS: Record<string, Record<string, string>> = {
  importer_distributor: {
    monthly: Deno.env.get("STRIPE_PRICE_IMPORTER_MONTHLY") || "price_1SwRgbE5Z0P87vcifd1UzDA5",
    annual: Deno.env.get("STRIPE_PRICE_IMPORTER_ANNUAL") || "price_1SwRgcE5Z0P87vciiPYza6Bu",
  },
  provider_track: {
    monthly: Deno.env.get("STRIPE_PRICE_PROVIDER_MONTHLY") || "price_1SwRgdE5Z0P87vci2LGR6eA7",
    annual: Deno.env.get("STRIPE_PRICE_PROVIDER_ANNUAL") || "price_1SwRgeE5Z0P87vciJQVObrH5",
  },
  provider_assurance: {
    monthly: Deno.env.get("STRIPE_PRICE_ASSURANCE_MONTHLY") || "price_1SwRggE5Z0P87vci9sk1b7su",
    annual: Deno.env.get("STRIPE_PRICE_ASSURANCE_ANNUAL") || "price_1SwRghE5Z0P87vcixctHWEcR",
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

    // Check user has admin role
    const { data: roleData } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("organization_id", profile.organization_id)
      .single();

    if (!roleData || roleData.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Only admins can manage billing" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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

    const origin = Deno.env.get("APP_URL") || "https://klarvo.io";
    let session: Stripe.Checkout.Session;

    if (checkoutType === "addon" && addonId) {
      const addonPriceId = ADDON_PRICE_IDS[addonId]?.[billingPeriod];
      if (!addonPriceId) {
        throw new Error(`Invalid addon: ${addonId} ${billingPeriod}`);
      }

      // Get existing subscription
      const { data: currentSub } = await supabaseClient
        .from("subscriptions")
        .select("stripe_subscription_id, plan_id")
        .eq("organization_id", profile.organization_id)
        .single();

      if (!currentSub?.stripe_subscription_id || currentSub.plan_id === "free") {
        throw new Error("An active subscription is required to purchase add-ons");
      }

      // Retrieve the Stripe subscription
      const stripeSubscription = await stripe.subscriptions.retrieve(
        currentSub.stripe_subscription_id
      );

      // Check if addon already exists on the subscription
      const existingItem = stripeSubscription.items.data.find(
        (item: Stripe.SubscriptionItem) => Object.values(ADDON_PRICE_IDS[addonId] || {}).includes(item.price.id)
      );

      if (existingItem) {
        throw new Error("This add-on is already active on your subscription");
      }

      // Add the addon as a new line item to the existing subscription
      const updatedSubscription = await stripe.subscriptions.update(
        currentSub.stripe_subscription_id,
        {
          items: [
            ...stripeSubscription.items.data.map((item: Stripe.SubscriptionItem) => ({ id: item.id })),
            { price: addonPriceId },
          ],
          proration_behavior: "create_prorations",
          metadata: {
            ...stripeSubscription.metadata,
            [`addon_${addonId}`]: "active",
          },
        }
      );

      // Find the new subscription item for this addon
      const newItem = updatedSubscription.items.data.find(
        (item: Stripe.SubscriptionItem) => item.price.id === addonPriceId
      );

      // Record the addon in our database
      await supabaseClient
        .from("subscription_addons")
        .upsert({
          organization_id: profile.organization_id,
          addon_id: addonId,
          status: "active",
          stripe_subscription_item_id: newItem?.id || null,
          stripe_price_id: addonPriceId,
          billing_period: billingPeriod,
          current_period_start: new Date(updatedSubscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(updatedSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "organization_id,addon_id",
        });

      // Return success (no redirect needed — the addon is immediately active)
      const appUrl = Deno.env.get("APP_URL") || "https://klarvo.io";
      return new Response(
        JSON.stringify({ 
          success: true, 
          url: `${appUrl}/settings/billing?success=true&addon=${addonId}`,
          addon_id: addonId 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
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
