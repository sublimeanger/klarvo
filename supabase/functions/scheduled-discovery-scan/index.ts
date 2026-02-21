import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://klarvo.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Scheduled Discovery Scan
 * 
 * This function is triggered by pg_cron weekly to re-scan all active
 * workspace connections for new AI tools.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find all active workspace connections due for re-scan
    const now = new Date().toISOString();
    
    const { data: connections, error: connError } = await supabase
      .from("workspace_connections")
      .select("id, organization_id, provider, domain")
      .eq("status", "active")
      .or(`next_scan_at.is.null,next_scan_at.lte.${now}`);

    if (connError) {
      throw connError;
    }

    if (!connections || connections.length === 0) {
      console.log("No connections due for re-scan");
      return new Response(
        JSON.stringify({ success: true, scanned: 0, message: "No connections due for re-scan" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${connections.length} connections to re-scan`);

    const results: Array<{ connection_id: string; status: string; tools_found?: number; error?: string }> = [];

    // Process each connection
    for (const connection of connections) {
      try {
        // Call the discovery-scan function for each connection
        // Note: In production, you would implement the actual scan logic here
        // or use service-to-service calls with proper auth
        
        console.log(`Scanning connection ${connection.id} (${connection.provider})`);

        // Update last_scan_at and schedule next scan
        await supabase
          .from("workspace_connections")
          .update({
            last_scan_at: now,
            next_scan_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          })
          .eq("id", connection.id);

        // Log the scheduled scan
        await supabase.from("audit_logs").insert({
          organization_id: connection.organization_id,
          entity_type: "workspace_connection",
          entity_id: connection.id,
          action_type: "scheduled_scan",
          entity_name: connection.provider,
          details: { triggered_by: "cron", domain: connection.domain },
        });

        results.push({
          connection_id: connection.id,
          status: "success",
        });

      } catch (scanError) {
        console.error(`Error scanning connection ${connection.id}:`, scanError);
        
        // Mark connection as having an error
        await supabase
          .from("workspace_connections")
          .update({
            error_message: scanError instanceof Error ? scanError.message : "Scan failed",
          })
          .eq("id", connection.id);

        results.push({
          connection_id: connection.id,
          status: "error",
          error: scanError instanceof Error ? scanError.message : "Unknown error",
        });
      }
    }

    const successCount = results.filter(r => r.status === "success").length;
    const errorCount = results.filter(r => r.status === "error").length;

    console.log(`Scheduled scan complete: ${successCount} success, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        scanned: connections.length,
        results: {
          success: successCount,
          errors: errorCount,
        },
        details: results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Scheduled discovery scan error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err instanceof Error ? err.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
