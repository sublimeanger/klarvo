import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { AnimatedCounter } from "@/components/marketing/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Target, 
  Heart, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, organizationSchema, createBreadcrumbSchema } from "@/components/seo";

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
  { year: "2024", event: "Open Digital WEB LTD founded in Peterborough, UK to address the EU AI Act compliance gap for SMEs", quarter: "Q1" },
  { year: "2024", event: "Platform MVP launched with core inventory & classification engine", quarter: "Q3" },
  { year: "2025", event: "Full evidence vault, export packs, and FRIA workflow released", quarter: "Q1" },
  { year: "2025", event: "Control library, provider track, and AI-assisted classification added", quarter: "Q3" },
  { year: "2026", event: "Shadow AI discovery, team collaboration, and advanced export packs shipped", quarter: "Q1" },
];

const stats = [
  { value: 50, suffix: "+", label: "Controls in Library" },
  { value: 20, suffix: "-step", label: "AI System Wizard" },
  { value: 8, suffix: "", label: "Export Pack Types" },
  { value: 99.9, suffix: "%", label: "Platform Uptime" },
];

const missionPoints = [
  "Complete AI system inventory in minutes, not weeks",
  "Automated risk classification with explainable results",
  "One-click evidence packs that impress auditors",
  "Continuous compliance, not point-in-time snapshots"
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "About", url: "https://klarvo.io/about" }
  ]
});

export default function About() {
  return (
    <MarketingLayout>
      <SEOHead
        title="About Klarvo - EU AI Act Compliance for SMEs"
        description="Klarvo is on a mission to democratize AI compliance. We make EU AI Act compliance accessible to every organization, without expensive consultants."
        keywords={["Klarvo", "about Klarvo", "AI compliance company", "EU AI Act startup", "AI governance platform"]}
        canonical="https://klarvo.io/about"
      />
      <SchemaMarkup schema={[organizationSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="About Klarvo"
        title={
          <>
            <span className="text-foreground">Making AI Compliance</span>
            <br />
            <span className="text-gradient-hero">Accessible to Everyone</span>
          </>
        }
        subtitle="We're on a mission to democratize EU AI Act compliance. Every organization using AI deserves the tools to do it responsibly—without needing a team of lawyers or consultants."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Mission Section */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge variant="outline" className="mb-6">
                <Target className="h-3 w-3 mr-1" />
                Our Mission
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Leveling the Playing Field
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
                {missionPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/30 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="relative">
              <div className="glass-premium rounded-2xl p-8 lg:p-10">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center group">
                      <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                        <AnimatedCounter 
                          value={stat.value} 
                          suffix={stat.suffix}
                          duration={2000}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature we build, every decision we make, is guided by these core values
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Building the Future of AI Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From idea to industry-leading platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Animated line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />
              
              {milestones.map((milestone, i) => (
                <div key={i} className="relative pl-14 pb-12 last:pb-0 group">
                  {/* Node */}
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  
                  {/* Card */}
                  <Card className="border-border/50 hover:border-primary/30 transition-colors hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="font-mono">
                          {milestone.year} {milestone.quarter}
                        </Badge>
                      </div>
                      <p className="text-foreground font-medium">
                        {milestone.event}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Globe className="h-3 w-3 mr-1" />
                Company Information
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                About the Company
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Klarvo is a product of <strong className="text-foreground">Open Digital WEB LTD</strong>, a company registered in England and Wales. Our registered office is at 36 Tyndall Court, Lynchwood Business Park, Peterborough, PE2 6LR, United Kingdom.
              </p>
              <p>
                Founded in 2024, we recognised that the EU AI Act — the world's first comprehensive AI regulation — would create significant compliance challenges for small and medium-sized enterprises. While large corporations can engage specialist consultancies and build internal governance teams, most businesses lack the resources, time, and regulatory expertise to navigate the Act's complex requirements.
              </p>
              <p>
                Klarvo was built to close that gap. Our platform provides guided workflows that translate legal obligations into practical, actionable steps. Whether an organisation is a deployer using third-party AI tools, a provider building AI systems, or an importer distributing AI products into the EU market, Klarvo provides the tools to inventory, classify, control, and evidence every AI system — and to produce audit-ready documentation that satisfies regulators, procurement teams, and leadership alike.
              </p>
              <p>
                We are committed to evidence-based compliance — not compliance theatre. Every feature we build produces traceable, version-controlled artefacts that can withstand scrutiny. Our export packs are designed to look and read like the output of a professional compliance consultancy, because we believe SMEs deserve the same quality of documentation as enterprise organisations.
              </p>
              <p>
                We operate as a remote-first team across the UK and Europe, with a focus on building software that is simple, guided, and always up-to-date with the latest regulatory guidance from the European Commission and the AI Office.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-muted/50 border space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Registered Name:</strong> Open Digital WEB LTD</p>
              <p><strong className="text-foreground">Registered Office:</strong> 36 Tyndall Court, Lynchwood Business Park, Peterborough, PE2 6LR, United Kingdom</p>
              <p><strong className="text-foreground">Telephone:</strong> <a href="tel:+443300435929" className="text-primary hover:underline">+44 330 043 5929</a></p>
              <p><strong className="text-foreground">Email:</strong> <a href="mailto:hello@klarvo.io" className="text-primary hover:underline">hello@klarvo.io</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-surface-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-6">Learn More</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/careers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border hover:border-primary/30 hover:text-primary transition-colors text-sm font-medium">
                Join Our Team
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border hover:border-primary/30 hover:text-primary transition-colors text-sm font-medium">
                Contact Us
              </Link>
              <Link to="/press" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border hover:border-primary/30 hover:text-primary transition-colors text-sm font-medium">
                Press & Media
              </Link>
              <Link to="/partners" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border hover:border-primary/30 hover:text-primary transition-colors text-sm font-medium">
                Partners
              </Link>
              <Link to="/security" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border hover:border-primary/30 hover:text-primary transition-colors text-sm font-medium">
                Security
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Join Us?"
        subtitle="Whether you're looking to achieve compliance or join our team, we'd love to hear from you."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "View Open Positions", href: "/careers" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
