import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import klarvoLogo from "@/assets/klarvo-logo.png";

export default function Signup() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
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
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <img src={klarvoLogo} alt="Klarvo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold">Klarvo</h1>
          <p className="text-muted-foreground text-center">
            EU AI Act Compliance Hub
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                14-day trial
              </Badge>
            </div>
            <CardDescription>
              Start your free Growth trial. No credit card required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm mode="signup" />

            <p className="mt-6 text-center text-sm text-muted-foreground">
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

        <div className="space-y-3 text-center">
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
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
