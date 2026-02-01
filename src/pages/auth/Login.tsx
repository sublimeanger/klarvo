import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/seo";
import klarvoLogo from "@/assets/klarvo-logo.png";

export default function Login() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user && !isLoading) {
      if (profile && !profile.onboarding_completed) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, profile, isLoading, navigate, from]);

  return (
    <>
      <SEOHead
        title="Sign In - Klarvo"
        description="Sign in to your Klarvo account to manage EU AI Act compliance, AI system inventory, and governance documentation."
        canonical="https://klarvo.io/auth/login"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <img src={klarvoLogo} alt="Klarvo" className="h-10 w-10 sm:h-12 sm:w-12" />
            <h1 className="text-xl sm:text-2xl font-bold">Klarvo</h1>
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              EU AI Act Compliance Hub
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-xl sm:text-2xl">Welcome back</CardTitle>
              <CardDescription className="text-sm">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <AuthForm 
                mode="login" 
                onSuccess={() => navigate(from, { replace: true })} 
              />

              <p className="mt-4 sm:mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-[10px] sm:text-xs text-muted-foreground px-4">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
