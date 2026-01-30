import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Sparkles
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
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6" variant="outline">
                <Building2 className="h-3 w-3 mr-1" />
                For SMEs
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                EU AI Act Compliance{" "}
                <span className="text-gradient">Without the Enterprise Price Tag</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                You shouldn't need a team of lawyers to use AI responsibly. Klarvo gives 
                small and medium businesses the same compliance firepower as Fortune 500 companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
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
              <div className="glass-card rounded-2xl p-8">
                <div className="space-y-4">
                  {features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-2 text-sm text-muted-foreground">
                    + {features.length - 5} more features included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for Lean Teams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We know SMEs can't dedicate months to compliance projects. That's why 
              Klarvo does the heavy lifting for you.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
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
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {useCase.systems.map((system, j) => (
                      <Badge key={j} variant="secondary">{system}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Compliance Made Simple
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Join hundreds of SMEs already using Klarvo to navigate EU AI Act 
            compliance without the complexity or cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
