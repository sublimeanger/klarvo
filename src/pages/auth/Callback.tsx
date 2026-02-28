import { useEffect, useState } from "react";
import { logger } from "@/lib/logger";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo";
import { Loader2 } from "lucide-react";

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;

    const handleCallback = async () => {
      try {
        // Check for error in URL params (OAuth errors)
        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (errorParam) {
          logger.error("OAuth error:", errorParam, errorDescription);
          setError(errorDescription || errorParam);
          redirectTimer = setTimeout(() => navigate("/auth/login", { replace: true }), 3000);
          return;
        }

        // Exchange the auth code if present (for custom domain OAuth flow)
        const code = searchParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            logger.error("Code exchange error:", exchangeError);
            setError(exchangeError.message);
            redirectTimer = setTimeout(() => navigate("/auth/login", { replace: true }), 3000);
            return;
          }
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          logger.error("Auth callback error:", sessionError);
          navigate("/auth/login", { replace: true });
          return;
        }

        if (session) {
          // Check if user needs onboarding
          const { data: profile } = await supabase
            .from("profiles")
            .select("onboarding_completed")
            .eq("id", session.user.id)
            .single();

          if (profile && !profile.onboarding_completed) {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        } else {
          navigate("/auth/login", { replace: true });
        }
      } catch (err) {
        logger.error("Callback error:", err);
        navigate("/auth/login", { replace: true });
      }
    };

    handleCallback();

    return () => clearTimeout(redirectTimer);
  }, [navigate, searchParams]);

  if (error) {
    return (
      <>
        <SEOHead
          title="Authentication Error - Klarvo"
          description="There was an error during sign in"
          noindex={true}
        />
        <div className="flex h-screen items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-4">
            <div className="h-12 w-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive text-xl">✕</span>
            </div>
            <h1 className="text-lg font-semibold">Authentication Error</h1>
            <p className="text-muted-foreground text-sm">{error}</p>
            <p className="text-muted-foreground text-xs">Redirecting to login...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Completing Sign In - Klarvo"
        description="Completing your sign in..."
        noindex={true}
      />
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Completing sign in...</p>
        </div>
      </div>
    </>
  );
}
