import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, User, Rocket, Check, ArrowRight, ArrowLeft } from "lucide-react";
import klarvoLogo from "@/assets/klarvo-logo.png";

const INDUSTRY_SECTORS = [
  "Technology & Software",
  "Financial Services",
  "Healthcare & Life Sciences",
  "Manufacturing",
  "Retail & E-commerce",
  "Professional Services",
  "Education",
  "Government & Public Sector",
  "Energy & Utilities",
  "Telecommunications",
  "Other",
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const USER_ROLES = [
  { value: "admin", label: "Founder / CEO", description: "Full access to all features and settings" },
  { value: "compliance_owner", label: "Compliance / DPO", description: "Manage compliance, policies, and assessments" },
  { value: "system_owner", label: "Product / CTO", description: "Manage AI systems and vendors" },
  { value: "reviewer", label: "Reviewer / Approver", description: "Review and approve assessments" },
  { value: "viewer", label: "Team Member", description: "View-only access to dashboards" },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);

    try {
      // 1. Create organization
      const { data: org, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: companyName,
          industry_sector: industrySector,
          company_size: companySize,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // 2. Update profile with organization
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          organization_id: org.id,
          onboarding_completed: true,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 3. Create user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: user.id,
          organization_id: org.id,
          role: selectedRole as any,
        });

      if (roleError) throw roleError;

      // 4. Create subscription (14-day Growth trial)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 14);

      const { error: subError } = await supabase
        .from("subscriptions")
        .insert({
          organization_id: org.id,
          plan_id: "growth",
          status: "trialing",
          billing_period: "annual",
          trial_end: trialEnd.toISOString(),
          current_period_start: new Date().toISOString(),
          current_period_end: trialEnd.toISOString(),
        });

      if (subError) throw subError;

      toast({
        title: "Welcome to Klarvo! 🎉",
        description: "Your 14-day Growth trial has started.",
      });

      await refreshProfile();
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = companyName.length >= 2 && industrySector && companySize;
  const isStep2Valid = !!selectedRole;

  return (
    <div className="min-h-screen bg-muted/30 py-8 sm:py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <img src={klarvoLogo} alt="Klarvo" className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="text-xl sm:text-2xl font-bold">Welcome to Klarvo</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-center">
            Let's set up your workspace in 2 minutes
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                s === step
                  ? "bg-primary text-primary-foreground"
                  : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Company Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>Tell us about your organization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industrySector">Industry Sector</Label>
                <Select value={industrySector} onValueChange={setIndustrySector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={companySize} onValueChange={setCompanySize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full mt-4"
                onClick={handleNext}
                disabled={!isStep1Valid}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Your Role */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Your Role</CardTitle>
                  <CardDescription>How will you be using Klarvo?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {USER_ROLES.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium">{role.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                </button>
              ))}

              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Get Started */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>You're all set!</CardTitle>
                  <CardDescription>
                    Start your 14-day free Growth trial
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-primary/5 p-4 space-y-3">
                <h4 className="font-medium">Your Growth Trial includes:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Up to 25 AI systems
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Full classification engine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Evidence vault with approvals
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Policy templates & versioning
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Training tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Export-ready compliance packs
                  </li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                No credit card required. Cancel anytime.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleComplete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Rocket className="mr-2 h-4 w-4" />
                  )}
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
