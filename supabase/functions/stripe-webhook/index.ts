import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured - rejecting webhook");
      return new Response(
        JSON.stringify({ error: "Webhook not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", errMessage);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 400, headers: corsHeaders }
      );
    }

    console.log("Processing webhook event:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const organizationId = session.metadata?.organization_id;
        const checkoutType = session.metadata?.checkout_type || "plan";
        const billingPeriod = session.metadata?.billing_period || "monthly";

        if (!organizationId) {
          console.error("Missing organization_id in checkout session");
          break;
        }

        // Get subscription details from Stripe
        const stripeSubscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (checkoutType === "addon") {
          // Handle add-on checkout
          const addonId = session.metadata?.addon_id;
          
          if (!addonId) {
            console.error("Missing addon_id in addon checkout session");
            break;
          }

          // Get the subscription item for this addon
          const subscriptionItem = stripeSubscription.items.data[0];

          // Insert or update addon in subscription_addons table
          const { error } = await supabaseClient
            .from("subscription_addons")
            .upsert({
              organization_id: organizationId,
              addon_id: addonId,
              status: "active",
              stripe_subscription_item_id: subscriptionItem.id,
              stripe_price_id: subscriptionItem.price.id,
              billing_period: billingPeriod,
              current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: stripeSubscription.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: "organization_id,addon_id",
            });

          if (error) {
            console.error("Failed to upsert addon subscription:", error);
          } else {
            console.log(`Add-on ${addonId} activated for org ${organizationId}`);
          }
        } else {
          // Handle plan checkout (existing logic)
          const planId = session.metadata?.plan_id;
          
          if (!planId) {
            console.error("Missing plan_id in plan checkout session");
            break;
          }

          const { error } = await supabaseClient
            .from("subscriptions")
            .update({
              plan_id: planId,
              status: "active",
              billing_period: billingPeriod,
              stripe_subscription_id: stripeSubscription.id,
              stripe_customer_id: session.customer as string,
              current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
              trial_end: null,
              cancel_at_period_end: false,
            })
            .eq("organization_id", organizationId);

          if (error) {
            console.error("Failed to update subscription:", error);
          } else {
            console.log(`Subscription activated for org ${organizationId}: ${planId}`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organization_id;
        const addonId = subscription.metadata?.addon_id;

        if (!organizationId) {
          console.error("Missing organization_id in subscription metadata");
          break;
        }

        // Map Stripe status to our status
        let status: "active" | "past_due" | "canceled" | "trialing" = "active";
        if (subscription.status === "past_due") status = "past_due";
        else if (subscription.status === "canceled") status = "canceled";
        else if (subscription.status === "trialing") status = "trialing";

        if (addonId) {
          // Update addon subscription
          const { error } = await supabaseClient
            .from("subscription_addons")
            .update({
              status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            })
            .eq("organization_id", organizationId)
            .eq("addon_id", addonId);

          if (error) {
            console.error("Failed to update addon subscription:", error);
          } else {
            console.log(`Addon ${addonId} updated for org ${organizationId}: ${status}`);
          }
        } else {
          // Update main subscription
          const { error } = await supabaseClient
            .from("subscriptions")
            .update({
              status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            })
            .eq("organization_id", organizationId);

          if (error) {
            console.error("Failed to update subscription:", error);
          } else {
            console.log(`Subscription updated for org ${organizationId}: ${status}`);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organization_id;
        const addonId = subscription.metadata?.addon_id;

        if (addonId && organizationId) {
          // Handle addon cancellation
          const { error } = await supabaseClient
            .from("subscription_addons")
            .update({
              status: "canceled",
              updated_at: new Date().toISOString(),
            })
            .eq("organization_id", organizationId)
            .eq("addon_id", addonId);

          if (error) {
            console.error("Failed to cancel addon:", error);
          } else {
            console.log(`Addon ${addonId} canceled for org ${organizationId}`);
          }
        } else if (!organizationId) {
          // Try to find by stripe_subscription_id
          const { data: sub } = await supabaseClient
            .from("subscriptions")
            .select("organization_id")
            .eq("stripe_subscription_id", subscription.id)
            .single();

          if (sub) {
            await supabaseClient
              .from("subscriptions")
              .update({
                status: "canceled",
                plan_id: "free",
                stripe_subscription_id: null,
              })
              .eq("organization_id", sub.organization_id);

            console.log(`Subscription canceled for org ${sub.organization_id}`);
          }
        } else {
          await supabaseClient
            .from("subscriptions")
            .update({
              status: "canceled",
              plan_id: "free",
              stripe_subscription_id: null,
            })
            .eq("organization_id", organizationId);

          console.log(`Subscription canceled for org ${organizationId}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find subscription by customer ID
        const { data: sub, error: subError } = await supabaseClient
          .from("subscriptions")
          .select("organization_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!subError && sub) {
          await supabaseClient
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("organization_id", sub.organization_id);

          // Also update any addons to past_due
          await supabaseClient
            .from("subscription_addons")
            .update({ status: "past_due", updated_at: new Date().toISOString() })
            .eq("organization_id", sub.organization_id)
            .eq("status", "active");

          console.log(`Payment failed for org ${sub.organization_id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Webhook error:", error);
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
