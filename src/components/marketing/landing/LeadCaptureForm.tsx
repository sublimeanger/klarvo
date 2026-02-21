import { useState, useEffect, useRef } from "react";
import { logger } from "@/lib/logger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackFormStart, trackLeadStep } from "@/lib/analytics";
// Step 1 Schema
const stepOneSchema = z.object({
  email: z.string().email("Please enter a valid work email").max(255),
  company: z.string().trim().min(2, "Company name required").max(100),
});

// Step 2 Schema
const stepTwoSchema = z.object({
  role: z.enum(["founder", "ops", "cto", "dpo", "other"]),
  aiSystemCount: z.enum(["1", "2-10", "11-25", "26-100", "100+"]),
  operatorType: z.enum(["deployer", "provider", "both", "unsure"]),
  urgentUseCase: z.string().max(500).optional(),
});

type StepOneData = z.infer<typeof stepOneSchema>;
type StepTwoData = z.infer<typeof stepTwoSchema>;

interface LeadCaptureFormProps {
  variant: "demo" | "start";
  id?: string;
}

interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

export const LeadCaptureForm = ({ variant, id }: LeadCaptureFormProps) => {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formStartTracked, setFormStartTracked] = useState(false);
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  });
  const { toast } = useToast();

  // Track form start on first field focus
  const handleFormFocus = () => {
    if (!formStartTracked) {
      trackFormStart(variant);
      setFormStartTracked(true);
    }
  };
  // Capture UTM parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_term: params.get("utm_term"),
      utm_content: params.get("utm_content"),
    });
  }, []);

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { email: "", company: "" },
  });

  const stepTwoForm = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      role: undefined,
      aiSystemCount: undefined,
      operatorType: undefined,
      urgentUseCase: "",
    },
  });

  const handleStepOneSubmit = async (data: StepOneData) => {
    setIsSubmitting(true);
    try {
      const { data: lead, error } = await supabase
        .from("paid_search_leads")
        .insert({
          email: data.email,
          company: data.company,
          landing_variant: variant,
          step_completed: 1,
          ...utmParams,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Track step 1 completion
      trackLeadStep(1, variant, { company: data.company });

      setLeadId(lead.id);
      setStep(2);
    } catch (error) {
      logger.error("Error submitting step 1:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepTwoSubmit = async (data: StepTwoData) => {
    if (!leadId) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("paid_search_leads")
        .update({
          role: data.role,
          ai_system_count: data.aiSystemCount,
          operator_type: data.operatorType,
          urgent_use_case: data.urgentUseCase || null,
          step_completed: 2,
        })
        .eq("id", leadId);

      if (error) throw error;

      // Track step 2 completion + generate_lead conversion
      trackLeadStep(2, variant, {
        role: data.role,
        ai_system_count: data.aiSystemCount,
        operator_type: data.operatorType,
      });

      setIsComplete(true);
    } catch (error) {
      logger.error("Error submitting step 2:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formTitle = variant === "demo"
    ? "Get a Personalized Compliance Walkthrough"
    : "Start Your Compliance Journey";

  const successMessage = variant === "demo"
    ? "We'll be in touch within 24 hours to schedule your demo."
    : "Check your inbox — we've sent you access instructions.";

  if (isComplete) {
    return (
      <div id={id} className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">You're all set!</h3>
        <p className="text-muted-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <div id={id} className="bg-card rounded-xl border border-border p-6 md:p-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">{formTitle}</h3>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
      </div>

      {step === 1 ? (
        <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              {...stepOneForm.register("email")}
              className="mt-1.5"
              onFocus={handleFormFocus}
            />
            {stepOneForm.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {stepOneForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Inc."
              {...stepOneForm.register("company")}
              className="mt-1.5"
            />
            {stepOneForm.formState.errors.company && (
              <p className="text-sm text-destructive mt-1">
                {stepOneForm.formState.errors.company.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll use this only to tailor your compliance pack — no spam.
          </p>
        </form>
      ) : (
        <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)} className="space-y-5">
          {/* Role */}
          <div>
            <Label className="mb-3 block">Your Role</Label>
            <RadioGroup
              value={stepTwoForm.watch("role")}
              onValueChange={(val) => stepTwoForm.setValue("role", val as StepTwoData["role"])}
              className="grid grid-cols-2 gap-2"
            >
              {[
                { value: "founder", label: "Founder / CEO" },
                { value: "ops", label: "COO / Ops" },
                { value: "cto", label: "CTO / Product" },
                { value: "dpo", label: "DPO / Compliance" },
                { value: "other", label: "Other" },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`role-${option.value}`}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    stepTwoForm.watch("role") === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={`role-${option.value}`} />
                  <span className="text-sm">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* AI System Count */}
          <div>
            <Label className="mb-3 block"># of AI Systems</Label>
            <RadioGroup
              value={stepTwoForm.watch("aiSystemCount")}
              onValueChange={(val) => stepTwoForm.setValue("aiSystemCount", val as StepTwoData["aiSystemCount"])}
              className="grid grid-cols-3 gap-2"
            >
              {["1", "2-10", "11-25", "26-100", "100+"].map((count) => (
                <Label
                  key={count}
                  htmlFor={`count-${count}`}
                  className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors text-sm ${
                    stepTwoForm.watch("aiSystemCount") === count
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={count} id={`count-${count}`} className="sr-only" />
                  {count}
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Operator Type */}
          <div>
            <Label className="mb-3 block">Are you a...</Label>
            <RadioGroup
              value={stepTwoForm.watch("operatorType")}
              onValueChange={(val) => stepTwoForm.setValue("operatorType", val as StepTwoData["operatorType"])}
              className="grid grid-cols-2 gap-2"
            >
              {[
                { value: "deployer", label: "Deployer (use AI)" },
                { value: "provider", label: "Provider (build AI)" },
                { value: "both", label: "Both" },
                { value: "unsure", label: "Not sure" },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`type-${option.value}`}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    stepTwoForm.watch("operatorType") === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={`type-${option.value}`} />
                  <span className="text-sm">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Optional Use Case */}
          <div>
            <Label htmlFor="useCase" className="flex items-center gap-2">
              Most urgent use case?
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="useCase"
              placeholder="e.g., HR hiring tool, credit scoring, AI chatbot..."
              {...stepTwoForm.register("urgentUseCase")}
              className="mt-1.5 resize-none"
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              variant === "demo" ? "Schedule My Demo" : "Get Started"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
