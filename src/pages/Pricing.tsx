import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PlanCard } from "@/components/billing/PlanCard";
import { BillingToggle } from "@/components/billing/BillingToggle";
import { AddonCard } from "@/components/billing/AddonCard";
import { ServiceCard } from "@/components/billing/ServiceCard";
import { FAQSection } from "@/components/billing/FAQSection";
import { TrustBadges } from "@/components/billing/TrustBadges";
import { PlanComparisonTable } from "@/components/billing/PlanComparisonTable";
import { ObjectionCards } from "@/components/billing/ObjectionCards";
import { ROICalculator } from "@/components/billing/ROICalculator";
import { CTASection } from "@/components/marketing/CTASection";
import { OperatorTrackAddons } from "@/components/billing/OperatorTrackAddons";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { SEOHead, SchemaMarkup, createProductSchema, createBreadcrumbSchema } from "@/components/seo";
import { 
  PLANS, 
  WORKFLOW_ADDONS,
  PARTNER_ADDONS,
  SERVICES, 
  INCLUDED_IN_ALL_PAID,
  type BillingPeriod,
  type PlanId 
} from "@/lib/billing-constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual');
  const [showComparison, setShowComparison] = useState(false);
  const { user, profile } = useAuth();
  const { createCheckoutSession, isLoading } = useBilling();
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    const plan = planId as PlanId;
    
    if (plan === "free") {
      if (user) {
        navigate("/");
      } else {
        navigate("/auth/signup");
      }
      return;
    }
    
    if (plan === "enterprise") {
      window.open("mailto:sales@klarvo.com?subject=Enterprise%20Inquiry", "_blank");
      return;
    }
    
    if (!user) {
      navigate("/auth/signup");
      return;
    }
    
    if (!profile?.organization_id) {
      navigate("/onboarding");
      return;
    }
    
    createCheckoutSession(plan, billingPeriod);
  };

  const orderedPlans: PlanId[] = ['free', 'starter', 'growth', 'pro', 'enterprise'];

  const productSchema = createProductSchema({
    name: "Klarvo EU AI Act Compliance Platform",
    description: "Complete EU AI Act compliance solution for SMEs. AI inventory, risk classification, evidence management, and audit exports.",
    brand: "Klarvo",
    offers: {
      price: "0",
      priceCurrency: "EUR"
    }
  });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Pricing", url: "https://klarvo.io/pricing" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Pricing - EU AI Act Compliance for SMEs"
        description="Simple, transparent pricing for EU AI Act compliance. Free tier available. Plans from €149/month. No enterprise complexity."
        keywords={["AI compliance pricing", "EU AI Act software pricing", "compliance platform cost", "SME compliance pricing"]}
        canonical="https://klarvo.io/pricing"
      />
      <SchemaMarkup schema={[productSchema, breadcrumbSchema]} />
      
      {/* Hero */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs - Hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
        <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border-primary/30 bg-primary/5">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-primary" />
              Simple, Transparent Pricing
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
              EU AI Act Compliance —{" "}
              <span className="text-gradient-hero">Priced for SMEs</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
              Build your AI inventory, classify risk, track controls & evidence, and export 
              audit-ready packs — without enterprise GRC complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
              <Button size="lg" className="btn-premium w-full sm:w-auto h-12 sm:h-11" asChild>
                <Link to="/auth/signup">
                  Start Free 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-border/60 hover:border-primary/50 w-full sm:w-auto h-12 sm:h-11">
                Talk to Sales
              </Button>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground">
              No credit card required. Upgrade anytime. Keep your data if you downgrade.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 sm:py-10 border-y border-border/50 bg-surface-1/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Pay per AI system, not per seat
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Unlimited Users on Every Paid Plan
            </h2>
            <p className="text-muted-foreground text-lg">
              Seats slow down compliance. On every paid plan, you get unlimited users and 
              pay based on the number of AI systems (use-cases) you need to track.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              An "AI system" is one distinct AI use-case that needs its own classification, 
              controls, and evidence pack.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ROICalculator />
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 px-4">
        <BillingToggle billingPeriod={billingPeriod} onChange={setBillingPeriod} />
      </section>

      {/* Plan Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {orderedPlans.map((planId) => (
              <PlanCard 
                key={planId}
                plan={PLANS[planId]}
                billingPeriod={billingPeriod}
                onSelect={handlePlanSelect}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Compare All Features - Collapsible */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <Collapsible open={showComparison} onOpenChange={setShowComparison}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="mx-auto flex items-center gap-2 border-border/60 hover:border-primary/50"
              >
                Compare all features
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showComparison ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8 animate-in slide-in-from-top-2 duration-300">
              <PlanComparisonTable />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Included in All Paid */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Included in Every Paid Plan
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {INCLUDED_IN_ALL_PAID.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overages */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Need More AI Systems?</h2>
            <p className="text-muted-foreground mb-8">
              Add AI systems without changing plans:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { plan: 'Starter', price: '€12' },
                { plan: 'Growth', price: '€9' },
                { plan: 'Pro', price: '€6' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-6 text-center group hover:border-primary/30 transition-colors">
                  <p className="font-medium text-muted-foreground mb-2">{item.plan}</p>
                  <p className="text-3xl font-bold text-gradient mb-1">{item.price}</p>
                  <p className="text-xs text-muted-foreground">per extra AI system/mo</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              We count active AI systems (Draft / Pilot / Live). Retired systems don't count.
            </p>
          </div>
        </div>
      </section>

      {/* Market Access Add-ons (Operator Tracks) */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <OperatorTrackAddons billingPeriod={billingPeriod} />
        </div>
      </section>

      {/* Workflow Add-ons */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-2">Workflow Add-ons</h2>
            <p className="text-muted-foreground">Extend your platform with specialized capabilities</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[...WORKFLOW_ADDONS, ...PARTNER_ADDONS].map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-2">Professional Services</h2>
            <p className="text-muted-foreground">Get hands-on help from our compliance experts</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ObjectionCards />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Build an Audit-Ready AI Inventory?"
        subtitle="Start free, add your first AI system, and generate your first evidence pack today."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
