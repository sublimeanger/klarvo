import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  FileCheck,
  Clock,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Clock,
    title: "Hours, Not Weeks",
    description: "Get your AI inventory and risk classification done in a fraction of the time it takes with manual processes or consultants."
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Instantly",
    description: "Generate professional evidence packs with one click—the same quality as what consultancies charge thousands for."
  },
  {
    icon: Users,
    title: "No Expert Required",
    description: "Our guided workflows translate legal requirements into plain-language questions anyone on your team can answer."
  },
  {
    icon: Sparkles,
    title: "Continuous Compliance",
    description: "Stay compliant as regulations evolve with automatic updates, renewal reminders, and reassessment triggers."
  }
];

const features = [
  "Complete AI system inventory wizard",
  "Automated risk classification (high/limited/minimal)",
  "Prohibited practices screening",
  "Control library with implementation tracking",
  "Evidence vault with approval workflows",
  "Training and AI literacy management",
  "One-click export packs (PDF + ZIP)",
  "Vendor attestation tracking"
];

const useCases = [
  {
    title: "Marketing Teams Using AI",
    description: "Content generation tools, personalization engines, chatbots—document them all in one place.",
    systems: ["ChatGPT", "Jasper", "Copy.ai", "MidJourney"]
  },
  {
    title: "HR & Recruitment",
    description: "AI-assisted resume screening, interview scheduling, performance analytics—high-risk territory made manageable.",
    systems: ["HireVue", "Pymetrics", "Beamery"]
  },
  {
    title: "Customer Support",
    description: "AI chatbots, sentiment analysis, ticket routing—ensure transparent disclosure to customers.",
    systems: ["Intercom", "Zendesk AI", "Drift"]
  }
];

export default function SMEUseCase() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/30 bg-primary/5">
                <Building2 className="h-4 w-4 mr-2 text-primary" />
                For SMEs
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                EU AI Act Compliance{" "}
                <span className="text-gradient-hero">Without the Enterprise Price Tag</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                You shouldn't need a team of lawyers to use AI responsibly. Klarvo gives 
                small and medium businesses the same compliance firepower as Fortune 500 companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-premium" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Book a Demo</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-premium rounded-2xl p-8">
                <div className="space-y-4">
                  {features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-2 text-sm text-muted-foreground">
                    + {features.length - 5} more features included
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Built for Lean Teams
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Enterprise-Quality Compliance, SME-Friendly Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We know SMEs can't dedicate months to compliance projects. That's why 
              Klarvo does the heavy lifting for you.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              AI Tools You're Already Using
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From marketing to HR, SMEs use AI across the business. Klarvo helps 
              you document and manage all of it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.systems.map((system, j) => (
                      <Badge key={j} variant="secondary" className="font-normal">{system}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Compliance Made Simple"
        subtitle="Join hundreds of SMEs already using Klarvo to navigate EU AI Act compliance without the complexity or cost."
        primaryCta={{ label: "Start Your Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
