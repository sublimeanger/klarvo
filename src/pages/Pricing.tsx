import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/billing/PlanCard";
import { BillingToggle } from "@/components/billing/BillingToggle";
import { AddonCard } from "@/components/billing/AddonCard";
import { ServiceCard } from "@/components/billing/ServiceCard";
import { FAQSection } from "@/components/billing/FAQSection";
import { 
  PLANS, 
  ADDONS, 
  SERVICES, 
  INCLUDED_IN_ALL_PAID,
  type BillingPeriod,
  type PlanId 
} from "@/lib/billing-constants";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual');

  const handlePlanSelect = (planId: string) => {
    // TODO: Implement plan selection / checkout flow
    console.log('Selected plan:', planId, billingPeriod);
  };

  const orderedPlans: PlanId[] = ['free', 'starter', 'growth', 'pro', 'enterprise'];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">EU AI Act Compliance Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to App
            </Link>
            <Button asChild>
              <Link to="/">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            EU AI Act compliance — simple pricing that scales with your AI footprint.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build your AI inventory, classify risk, track controls & evidence, and export audit-ready packs — without enterprise GRC complexity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Button size="lg" asChild>
              <Link to="/">Start Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg">
              Talk to Sales
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card. Upgrade anytime. Keep your data if you downgrade.
          </p>
        </div>
      </section>

      {/* How pricing works */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Pay per AI system, not per seat.</h2>
          <p className="text-muted-foreground">
            Seats slow down compliance. On every paid plan, you get unlimited users and you pay based on the number of AI systems (use-cases) you need to track.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            An "AI system" is one distinct AI use-case that needs its own classification, controls, and evidence pack.
          </p>
        </div>
      </section>

      {/* Billing toggle */}
      <section className="py-8 px-4">
        <BillingToggle billingPeriod={billingPeriod} onChange={setBillingPeriod} />
      </section>

      {/* Plan cards */}
      <section className="py-12 px-4">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {orderedPlans.map((planId) => (
              <PlanCard 
                key={planId}
                plan={PLANS[planId]}
                billingPeriod={billingPeriod}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Included in all paid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Included in every paid plan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {INCLUDED_IN_ALL_PAID.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overages */}
      <section className="py-16 px-4">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Need more AI systems?</h2>
          <p className="text-muted-foreground mb-6">
            Add AI systems without changing plans:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium">Starter</p>
              <p className="text-2xl font-bold">€12</p>
              <p className="text-sm text-muted-foreground">per extra AI system/mo</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium">Growth</p>
              <p className="text-2xl font-bold">€9</p>
              <p className="text-sm text-muted-foreground">per extra AI system/mo</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="font-medium">Pro</p>
              <p className="text-2xl font-bold">€6</p>
              <p className="text-sm text-muted-foreground">per extra AI system/mo</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            We count active AI systems (Draft / Pilot / Live). Retired systems don't count.
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-8">Add-ons (optional)</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {ADDONS.map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-8">Professional Services (optional)</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <FAQSection />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build an audit-ready AI inventory?</h2>
          <p className="text-muted-foreground mb-8">
            Start free, add your first AI system, and generate your first evidence pack today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/">Start Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Shield className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              EU AI Act Compliance Hub
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
