import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

/**
 * Sliding-window rate limiter backed by the rate_limits table.
 * Uses service-role client so RLS doesn't block access.
 */
export async function checkRateLimit(
  supabaseUrl: string,
  supabaseServiceKey: string,
  userId: string,
  endpoint: string,
  maxRequests: number,
  windowMinutes: number
): Promise<RateLimitResult> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const key = `${endpoint}:${userId}`;
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  // Count requests in the current window
  const { count, error: countError } = await supabase
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("key", key)
    .gte("window_start", windowStart);

  if (countError) {
    console.error("Rate limit check error:", countError);
    // Fail open — don't block on DB errors
    return { allowed: true, remaining: maxRequests };
  }

  const currentCount = count || 0;

  if (currentCount >= maxRequests) {
    // Find the oldest entry in the window to calculate retry-after
    const { data: oldest } = await supabase
      .from("rate_limits")
      .select("window_start")
      .eq("key", key)
      .gte("window_start", windowStart)
      .order("window_start", { ascending: true })
      .limit(1);

    let retryAfterSeconds = 60; // default
    if (oldest && oldest.length > 0) {
      const oldestTime = new Date(oldest[0].window_start).getTime();
      const windowEnd = oldestTime + windowMinutes * 60 * 1000;
      retryAfterSeconds = Math.max(1, Math.ceil((windowEnd - Date.now()) / 1000));
    }

    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  // Record this request
  const { error: insertError } = await supabase
    .from("rate_limits")
    .insert({ key, window_start: new Date().toISOString() });

  if (insertError) {
    console.error("Rate limit insert error:", insertError);
  }

  // Opportunistic cleanup (1% chance per request)
  if (Math.random() < 0.01) {
    supabase.rpc("cleanup_rate_limits").then(() => {}).catch(() => {});
  }

  return { allowed: true, remaining: maxRequests - currentCount - 1 };
}

/**
 * Build a 429 response with Retry-After header.
 */
export function createRateLimitResponse(
  retryAfterSeconds: number,
  corsHeaders: Record<string, string>
): Response {
  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded. Please try again later.",
      retry_after_seconds: retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}
