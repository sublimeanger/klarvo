import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

/**
 * Scheduled Compliance Digest Cron
 * 
 * This function is designed to be called by an external cron service (e.g., cron-job.org)
 * on a schedule (e.g., every hour or daily at 8am).
 * 
 * It finds all users due for a digest based on their notification_frequency
 * and last_notification_sent_at, then sends emails to eligible users.
 */

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Klarvo <notifications@klarvo.app>",
      to: [to],
      subject,
      html,
    }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend API error: ${error}`);
  }
  
  return res.json();
}

interface ComplianceAlert {
  type: "overdue_task" | "expiring_evidence" | "expiring_attestation" | "review_due";
  title: string;
  description: string;
  dueDate?: string;
  severity: "critical" | "warning" | "info";
}

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Require authentication for cron requests
  const authHeader = req.headers.get("authorization");
  const cronSecret = Deno.env.get("CRON_SECRET");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  const isAuthorizedByCronSecret = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const isAuthorizedByServiceKey = supabaseServiceKey && authHeader === `Bearer ${supabaseServiceKey}`;

  if (!isAuthorizedByCronSecret && !isAuthorizedByServiceKey) {
    console.error("Unauthorized cron request rejected");
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const currentHour = now.getUTCHours();
    
    console.log(`Running scheduled digest cron at ${now.toISOString()} (UTC hour: ${currentHour})`);

    // Get all users with notifications enabled
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        organization_id,
        email_notifications_enabled,
        notification_frequency,
        last_notification_sent_at
      `)
      .eq("email_notifications_enabled", true)
      .not("organization_id", "is", null);

    if (usersError) throw usersError;

    const results: { userId: string; sent: boolean; reason?: string }[] = [];
    let emailsSent = 0;
    let skipped = 0;

    for (const user of users || []) {
      try {
        // Check if user is due for a notification
        const frequency = user.notification_frequency || "weekly";
        const lastSent = user.last_notification_sent_at 
          ? new Date(user.last_notification_sent_at) 
          : null;

        let shouldSend = false;
        let reason = "";

        if (!lastSent) {
          // Never sent before - send now
          shouldSend = true;
          reason = "first notification";
        } else {
          const hoursSinceLast = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60);
          
          if (frequency === "daily" && hoursSinceLast >= 23) {
            shouldSend = true;
            reason = "daily schedule due";
          } else if (frequency === "weekly" && hoursSinceLast >= 167) {
            shouldSend = true;
            reason = "weekly schedule due";
          } else {
            reason = `not due yet (${Math.round(hoursSinceLast)}h since last, need ${frequency === "daily" ? 23 : 167}h)`;
          }
        }

        if (!shouldSend) {
          results.push({ userId: user.id, sent: false, reason });
          skipped++;
          continue;
        }

        // Get user's email from auth
        const { data: authUser } = await supabase.auth.admin.getUserById(user.id);
        if (!authUser?.user?.email) {
          results.push({ userId: user.id, sent: false, reason: "no email found" });
          skipped++;
          continue;
        }

        const email = authUser.user.email;
        const orgId = user.organization_id;

        // Gather compliance alerts
        const alerts: ComplianceAlert[] = [];
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        // 1. Overdue tasks
        const { data: overdueTasks } = await supabase
          .from("tasks")
          .select("id, title, due_date")
          .eq("organization_id", orgId)
          .neq("status", "done")
          .lt("due_date", now.toISOString())
          .limit(10);

        for (const task of overdueTasks || []) {
          alerts.push({
            type: "overdue_task",
            title: task.title,
            description: `Task is overdue`,
            dueDate: task.due_date,
            severity: "critical",
          });
        }

        // 2. Expiring evidence (next 30 days)
        const { data: expiringEvidence } = await supabase
          .from("evidence_files")
          .select("id, name, expires_at")
          .eq("organization_id", orgId)
          .gt("expires_at", now.toISOString())
          .lt("expires_at", thirtyDaysFromNow.toISOString())
          .limit(10);

        for (const evidence of expiringEvidence || []) {
          const daysUntil = Math.ceil(
            (new Date(evidence.expires_at).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          alerts.push({
            type: "expiring_evidence",
            title: evidence.name,
            description: `Evidence expires in ${daysUntil} days`,
            dueDate: evidence.expires_at,
            severity: daysUntil <= 7 ? "critical" : "warning",
          });
        }

        // 3. Expiring attestations (next 30 days)
        const { data: expiringAttestations } = await supabase
          .from("vendor_attestations")
          .select("id, title, valid_until")
          .eq("organization_id", orgId)
          .gt("valid_until", now.toISOString())
          .lt("valid_until", thirtyDaysFromNow.toISOString())
          .limit(10);

        for (const attestation of expiringAttestations || []) {
          const daysUntil = Math.ceil(
            (new Date(attestation.valid_until).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          alerts.push({
            type: "expiring_attestation",
            title: attestation.title,
            description: `Attestation expires in ${daysUntil} days`,
            dueDate: attestation.valid_until,
            severity: daysUntil <= 7 ? "critical" : "warning",
          });
        }

        // 4. Controls needing review
        const { data: reviewDueControls } = await supabase
          .from("control_implementations")
          .select("id, control:control_library(code, name), next_review_date")
          .eq("organization_id", orgId)
          .lt("next_review_date", thirtyDaysFromNow.toISOString())
          .limit(10);

        for (const ctrl of reviewDueControls || []) {
          const controlData = ctrl.control as unknown as { code: string; name: string } | null;
          if (controlData) {
            alerts.push({
              type: "review_due",
              title: `${controlData.code}: ${controlData.name}`,
              description: "Control review is due",
              dueDate: ctrl.next_review_date || undefined,
              severity: "warning",
            });
          }
        }

        // Skip if no alerts
        if (alerts.length === 0) {
          // Still update last sent to prevent checking again too soon
          await supabase
            .from("profiles")
            .update({ last_notification_sent_at: now.toISOString() })
            .eq("id", user.id);
          
          results.push({ userId: user.id, sent: false, reason: "no alerts to send" });
          skipped++;
          continue;
        }

        // Build email HTML
        const criticalAlerts = alerts.filter((a) => a.severity === "critical");
        const warningAlerts = alerts.filter((a) => a.severity === "warning");

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .alert-section { margin-bottom: 20px; }
    .alert-title { font-weight: bold; margin-bottom: 10px; }
    .critical { color: #dc2626; }
    .warning { color: #f59e0b; }
    .alert-item { background: white; padding: 12px; margin-bottom: 8px; border-radius: 6px; border-left: 4px solid; }
    .alert-item.critical { border-color: #dc2626; }
    .alert-item.warning { border-color: #f59e0b; }
    .footer { margin-top: 20px; font-size: 12px; color: #666; }
    .cta-button { display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Klarvo Compliance Digest</h1>
      <p style="margin: 5px 0 0;">Your ${frequency} compliance summary</p>
    </div>
    <div class="content">
      <p>Hi ${user.full_name || "there"},</p>
      <p>Here's your compliance update with <strong>${alerts.length}</strong> items requiring attention:</p>
      
      ${criticalAlerts.length > 0 ? `
      <div class="alert-section">
        <p class="alert-title critical">🔴 Critical (${criticalAlerts.length})</p>
        ${criticalAlerts.map((a) => `
          <div class="alert-item critical">
            <strong>${a.title}</strong><br>
            <small>${a.description}${a.dueDate ? ` • Due: ${new Date(a.dueDate).toLocaleDateString()}` : ""}</small>
          </div>
        `).join("")}
      </div>
      ` : ""}
      
      ${warningAlerts.length > 0 ? `
      <div class="alert-section">
        <p class="alert-title warning">🟡 Warnings (${warningAlerts.length})</p>
        ${warningAlerts.map((a) => `
          <div class="alert-item warning">
            <strong>${a.title}</strong><br>
            <small>${a.description}${a.dueDate ? ` • Due: ${new Date(a.dueDate).toLocaleDateString()}` : ""}</small>
          </div>
        `).join("")}
      </div>
      ` : ""}
      
      <a href="https://app.klarvo.io/dashboard" class="cta-button">View Dashboard</a>
      
      <div class="footer">
        <p>You're receiving this because email notifications are enabled in your Klarvo settings.</p>
        <p>To change your notification preferences, go to Settings → Notifications.</p>
      </div>
    </div>
  </div>
</body>
</html>
        `;

        // Send email
        await sendEmail(
          email,
          `Klarvo: ${criticalAlerts.length > 0 ? `${criticalAlerts.length} critical` : `${alerts.length}`} compliance items need attention`,
          emailHtml
        );

        // Update last notification sent timestamp
        await supabase
          .from("profiles")
          .update({ last_notification_sent_at: now.toISOString() })
          .eq("id", user.id);

        // Log the notification
        await supabase.from("notification_logs").insert({
          organization_id: orgId,
          user_id: user.id,
          notification_type: "scheduled_digest",
          subject: `Compliance digest: ${alerts.length} items`,
          recipient_email: email,
          details: { 
            alertCount: alerts.length, 
            criticalCount: criticalAlerts.length,
            frequency,
            triggeredBy: "cron"
          },
        });

        results.push({ userId: user.id, sent: true, reason });
        emailsSent++;
        
        console.log(`Sent digest to ${email} (${alerts.length} alerts)`);
      } catch (userError: unknown) {
        console.error(`Error processing user ${user.id}:`, userError);
        results.push({
          userId: user.id,
          sent: false,
          reason: userError instanceof Error ? userError.message : "Unknown error",
        });
      }
    }

    console.log(`Cron complete: ${emailsSent} emails sent, ${skipped} skipped`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        summary: {
          totalUsers: users?.length || 0,
          emailsSent,
          skipped,
          timestamp: now.toISOString()
        },
        results 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in scheduled-digest-cron:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
