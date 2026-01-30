import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Users, 
  Target, 
  Heart, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe compliance should be clear, not confusing. Every feature we build prioritizes explainability and auditability."
  },
  {
    icon: Users,
    title: "SME-First Design",
    description: "Enterprise tools shouldn't require enterprise budgets. We build for the 99% of companies navigating AI compliance alone."
  },
  {
    icon: Target,
    title: "Evidence Over Theatre",
    description: "Real compliance means real proof. We focus on generating audit-ready documentation, not checkbox exercises."
  },
  {
    icon: Heart,
    title: "Human-Centered AI",
    description: "The EU AI Act exists to protect people. We're proud to help organizations use AI responsibly and ethically."
  }
];

const milestones = [
  { year: "2024", event: "Klarvo founded to address EU AI Act compliance gap" },
  { year: "2024", event: "Platform MVP launched with core inventory & classification" },
  { year: "2025", event: "Full evidence vault and export pack capabilities released" },
  { year: "2025", event: "FRIA workflow and control library modules added" },
];

const stats = [
  { value: "500+", label: "AI Systems Documented" },
  { value: "50+", label: "Organizations Served" },
  { value: "10K+", label: "Evidence Files Managed" },
  { value: "99.9%", label: "Platform Uptime" },
];

export default function About() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              About Klarvo
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Making AI Compliance{" "}
              <span className="text-gradient">Accessible</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to democratize EU AI Act compliance. Every organization 
              using AI deserves the tools to do it responsibly—without needing a team of 
              lawyers or consultants.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The EU AI Act represents the world's first comprehensive AI regulation. 
                It's a landmark achievement for responsible AI—but compliance shouldn't 
                be a privilege reserved for large enterprises with deep pockets.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Klarvo exists to level the playing field. We provide SMEs with the same 
                caliber of compliance tooling that Fortune 500 companies pay consultants 
                millions to deliver—automated, guided, and always audit-ready.
              </p>
              
              <div className="space-y-3">
                {[
                  "Complete AI system inventory in minutes, not weeks",
                  "Automated risk classification with explainable results",
                  "One-click evidence packs that impress auditors",
                  "Continuous compliance, not point-in-time snapshots"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center p-4">
                      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building the future of AI compliance, one milestone at a time
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              {milestones.map((milestone, i) => (
                <div key={i} className="relative pl-12 pb-10 last:pb-0">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 border-4 border-background flex items-center justify-center">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div className="glass-card rounded-xl p-6">
                    <div className="text-sm font-medium text-primary mb-1">
                      {milestone.year}
                    </div>
                    <div className="text-foreground">
                      {milestone.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to achieve compliance or join our team, 
              we'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/careers">
                  View Open Positions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
