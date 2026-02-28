import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Zap, ChevronDown, Shield, Users, BarChart3 } from "lucide-react";
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
import { SEOHead, SchemaMarkup, createProductSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { 
  PLANS, 
  WORKFLOW_ADDONS,
  PARTNER_ADDONS,
  SERVICES, 
  FAQS,
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

  const corePlans: PlanId[] = ['free', 'starter', 'growth'];
  const scalePlans: PlanId[] = ['pro', 'enterprise'];

  const productSchema = createProductSchema({
    name: "Klarvo EU AI Act Compliance Platform",
    description: "Complete EU AI Act compliance solution for SMEs. AI inventory, risk classification, evidence management, and audit exports.",
    brand: "Klarvo",
    offers: {
      price: "0",
      priceCurrency: "EUR"
    }
  });

  const faqSchema = createFAQSchema({
    questions: FAQS.map(f => ({ question: f.question, answer: f.answer }))
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
      <SchemaMarkup schema={[productSchema, faqSchema, breadcrumbSchema]} />
      
      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float-slow" />
        <div className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/30 bg-primary/5">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Simple, Transparent Pricing
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              EU AI Act Compliance{" "}
              <span className="text-gradient-hero block sm:inline">Priced for SMEs</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Build your AI inventory, classify risk, track evidence, and export audit-ready packs — without enterprise GRC complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <Button size="lg" className="btn-premium w-full sm:w-auto h-12 px-8" asChild>
                <Link to="/auth/signup">
                  Start Free 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-border/60 hover:border-primary/50 w-full sm:w-auto h-12 px-8" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No credit card required · Upgrade anytime · Keep your data if you downgrade
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 mb-4 px-4 py-1.5">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Unlimited users on every paid plan
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Pay per AI system, not per seat
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seats slow down compliance. You get unlimited users and pay based on the number of AI systems you need to track.
              </p>
            </div>
            
            {/* Value props */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "No per-seat fees", desc: "Invite your whole team without worrying about cost." },
                { icon: Shield, title: "Scale as you grow", desc: "Start with 1 system, add more as your AI portfolio expands." },
                { icon: BarChart3, title: "Only active systems count", desc: "Retired systems don't count toward your plan limit." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-muted/30 border border-border/40">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ROICalculator />
        </div>
      </section>

      {/* Billing Toggle + Core Plan Cards (Free, Starter, Growth) */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground text-lg mb-8">Start free, upgrade when you're ready</p>
            <BillingToggle billingPeriod={billingPeriod} onChange={setBillingPeriod} />
          </div>

          {/* Core plans: 3 columns */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-5xl mx-auto mt-12">
            {corePlans.map((planId) => (
              <PlanCard 
                key={planId}
                plan={PLANS[planId]}
                billingPeriod={billingPeriod}
                onSelect={handlePlanSelect}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Scale plans: 2 columns, centered */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-3xl mx-auto mt-8">
            {scalePlans.map((planId) => (
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

      {/* Compare All Features */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Collapsible open={showComparison} onOpenChange={setShowComparison}>
            <div className="flex justify-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="items-center gap-2 border-border/60 hover:border-primary/50 rounded-xl h-12 px-8"
                >
                  Compare all features
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-8 animate-in slide-in-from-top-2 duration-300">
              <PlanComparisonTable />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Included in All Paid */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Included in Every Paid Plan
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED_IN_ALL_PAID.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/40">
                  <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-success" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overages */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need More AI Systems?</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Add AI systems without changing plans
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { plan: 'Starter', price: '€12', color: 'from-muted to-muted/50' },
                { plan: 'Growth', price: '€9', color: 'from-primary/5 to-primary/[0.02]' },
                { plan: 'Pro', price: '€6', color: 'from-muted to-muted/50' },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-8 text-center bg-gradient-to-b ${item.color} border border-border/40 hover:border-primary/30 transition-all hover:shadow-md`}>
                  <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">{item.plan}</p>
                  <p className="text-4xl font-bold tracking-tight mb-1">{item.price}</p>
                  <p className="text-sm text-muted-foreground">per extra system/mo</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              We count active AI systems (Draft / Pilot / Live). Retired systems don't count.
            </p>
          </div>
        </div>
      </section>

      {/* Market Access Add-ons */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <OperatorTrackAddons billingPeriod={billingPeriod} />
        </div>
      </section>

      {/* Workflow Add-ons */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Workflow Add-ons</h2>
            <p className="text-muted-foreground text-lg">Extend your platform with specialized capabilities</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[...WORKFLOW_ADDONS, ...PARTNER_ADDONS].map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Professional Services</h2>
            <p className="text-muted-foreground text-lg">Get hands-on help from our compliance experts</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ObjectionCards />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-muted/30">
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
