import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.svg";

export default function Signup() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      // If user just signed up and has a pending invite, redirect to accept it
      const pendingInvite = sessionStorage.getItem('pending_invite');
      if (pendingInvite) {
        sessionStorage.setItem('invite_token', pendingInvite);
        sessionStorage.removeItem('pending_invite');
        sessionStorage.removeItem('pending_invite_email');
        navigate("/invite", { replace: true });
        return;
      }
      if (profile && !profile.onboarding_completed) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, profile, isLoading, navigate]);

  return (
    <>
      <SEOHead
        title="Sign Up - Start Free Trial | Klarvo"
        description="Create a Klarvo account and start your 14-day free trial. EU AI Act compliance made simple for SMEs."
        canonical="https://klarvo.io/auth/signup"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <img src={klarvoLogo} alt="Klarvo" className="h-8 sm:h-10 w-auto" width={160} height={40} />
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              EU AI Act Compliance Hub
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl sm:text-2xl">Create an account</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  14-day trial
                </Badge>
              </div>
              <CardDescription className="text-sm">
                Start your free Growth trial. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <AuthForm mode="signup" />

              <p className="mt-4 sm:mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2 sm:space-y-3 text-center px-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              ✓ Full access to Growth features for 14 days
              <br />
              ✓ Up to 25 AI systems · ✓ All compliance tools
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
