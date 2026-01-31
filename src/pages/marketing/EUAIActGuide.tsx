import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { TimelineSection } from "@/components/marketing/TimelineSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale,
  ArrowRight,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  Users,
  Building2,
  Globe,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createArticleSchema, createBreadcrumbSchema } from "@/components/seo";

const keyDates = [
  {
    date: "August 1, 2024",
    title: "EU AI Act Enters into Force",
    description: "The EU AI Act officially enters into force, starting the clock on compliance deadlines.",
    status: "completed" as const
  },
  {
    date: "February 2, 2025",
    title: "Prohibited Practices + AI Literacy",
    description: "Prohibitions on unacceptable AI practices take effect. AI literacy obligations for staff begin.",
    status: "current" as const
  },
  {
    date: "August 2, 2025",
    title: "GPAI + Governance Rules",
    description: "General Purpose AI (GPAI) obligations and governance framework rules apply.",
    status: "upcoming" as const
  },
  {
    date: "August 2, 2026",
    title: "Most Obligations Apply",
    description: "Most EU AI Act obligations become enforceable, including deployer duties for high-risk AI.",
    status: "upcoming" as const
  },
  {
    date: "August 2, 2027",
    title: "Extended Transition Ends",
    description: "Extended transition period ends for high-risk AI embedded in regulated products (Annex I).",
    status: "upcoming" as const
  }
];

const prohibitedPractices = [
  {
    title: "Manipulative or Deceptive AI",
    description: "AI systems using subliminal techniques or deception to distort behavior and cause harm."
  },
  {
    title: "Exploitation of Vulnerabilities",
    description: "AI exploiting vulnerabilities (age, disability, social situation) to distort behavior harmfully."
  },
  {
    title: "Social Scoring",
    description: "AI systems evaluating individuals based on social behavior for unrelated detrimental treatment."
  },
  {
    title: "Criminal Profiling",
    description: "AI predicting criminal offenses based solely on profiling or personality traits."
  },
  {
    title: "Untargeted Facial Scraping",
    description: "Creating facial recognition databases by untargeted scraping from internet/CCTV."
  },
  {
    title: "Workplace/Education Emotion AI",
    description: "Emotion recognition AI in workplace or education settings (with limited exceptions)."
  },
  {
    title: "Biometric Categorization",
    description: "AI inferring sensitive attributes (race, political opinions, etc.) from biometrics."
  },
  {
    title: "Real-time Biometric ID",
    description: "Real-time remote biometric identification in public spaces for law enforcement (with exceptions)."
  }
];

const highRiskCategories = [
  { icon: Users, title: "Biometrics", description: "Remote biometric identification and categorization" },
  { icon: Building2, title: "Critical Infrastructure", description: "Safety components of critical infrastructure" },
  { icon: BookOpen, title: "Education & Training", description: "Access to education and vocational training" },
  { icon: Users, title: "Employment", description: "Recruitment, worker management, access to self-employment" },
  { icon: Scale, title: "Essential Services", description: "Credit, insurance, healthcare access, benefits" },
  { icon: Shield, title: "Law Enforcement", description: "Risk assessment, evidence, crime prediction" },
  { icon: Globe, title: "Migration & Border", description: "Visa, asylum, border control applications" },
  { icon: Scale, title: "Justice & Democracy", description: "Court support, election-related systems" }
];

const obligations = [
  {
    title: "AI System Inventory",
    description: "Document all AI systems with detailed records of purpose, ownership, and usage."
  },
  {
    title: "Risk Classification",
    description: "Classify each AI system by risk level: prohibited, high-risk, limited, or minimal."
  },
  {
    title: "Human Oversight",
    description: "Assign competent persons to oversee AI operation with authority to intervene."
  },
  {
    title: "Transparency",
    description: "Inform users when interacting with AI and mark synthetic content appropriately."
  },
  {
    title: "Logging & Records",
    description: "Maintain logs and records for at least 6 months for high-risk AI systems."
  },
  {
    title: "Incident Reporting",
    description: "Report serious incidents and cooperate with authorities when required."
  }
];

const articleSchema = createArticleSchema({
  headline: "The EU AI Act Explained - Complete Guide",
  description: "Comprehensive guide to the EU AI Act. Understand requirements, timeline, risk levels, and compliance obligations for AI systems.",
  datePublished: "2024-12-01",
  dateModified: "2025-01-28"
});

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "EU AI Act Guide", url: "https://klarvo.io/eu-ai-act-guide" }
  ]
});

export default function EUAIActGuide() {
  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Explained - Complete SME Guide"
        description="Comprehensive guide to the EU AI Act for SMEs. Understand timeline, risk levels, prohibited practices, and deployer obligations. Free compliance resources."
        keywords={["EU AI Act", "AI regulation guide", "AI Act explained", "AI compliance requirements", "high-risk AI"]}
        canonical="https://klarvo.io/eu-ai-act-guide"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="EU AI Act Guide"
        title={
          <>
            <span className="text-foreground">The EU AI Act</span>
            <br />
            <span className="text-gradient-hero">Explained</span>
          </>
        }
        subtitle="The world's first comprehensive AI regulation. Understand the requirements, timeline, and what it means for your organization."
        primaryCta={{ label: "Check Compliance", href: "/auth/signup" }}
        secondaryCta={{ label: "Download Guide", href: "/templates" }}
        variant="centered"
        showTrustBadges={false}
      />

      {/* What is the EU AI Act */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Scale className="h-3 w-3 mr-1" />
              Overview
            </Badge>
            
            <h2 className="text-3xl font-bold mb-6">What is the EU AI Act?</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                The <strong className="text-foreground">EU AI Act</strong> (Regulation 2024/1689) is the world's first comprehensive 
                legal framework for artificial intelligence. Adopted in 2024, it establishes requirements 
                for AI systems based on their potential risk to people's safety and fundamental rights.
              </p>
              
              <p>
                The Act takes a <strong className="text-foreground">risk-based approach</strong>, categorizing AI systems into four levels: 
                unacceptable risk (prohibited), high-risk (strict requirements), limited risk (transparency 
                obligations), and minimal risk (no specific requirements).
              </p>
              
              <p>
                Unlike sector-specific rules, the EU AI Act applies <strong className="text-foreground">horizontally across industries</strong> and 
                affects providers, deployers, importers, and distributors of AI systems in the EU market—regardless 
                of where they're based.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Globe, label: "Applies EU-Wide", desc: "All 27 member states" },
                { icon: Building2, label: "All Industries", desc: "Horizontal regulation" },
                { icon: Scale, label: "Risk-Based", desc: "Proportional requirements" }
              ].map((item, i) => (
                <Card key={i} className="text-center border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection 
        title="Key Compliance Deadlines"
        subtitle="The EU AI Act phases in over several years. Know what's required and when."
        items={keyDates}
      />

      {/* Prohibited Practices */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-destructive/30 text-destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Prohibited Practices
              </Badge>
              <h2 className="text-3xl font-bold mb-4">What's Banned Under Article 5</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These AI practices are completely prohibited in the EU as of February 2, 2025.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {prohibitedPractices.map((practice, i) => (
                <Card key={i} className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{practice.title}</h3>
                      <p className="text-sm text-muted-foreground">{practice.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-Risk Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-warning/30 text-warning">
                <Shield className="h-3 w-3 mr-1" />
                Annex III Categories
              </Badge>
              <h2 className="text-3xl font-bold mb-4">High-Risk AI Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                AI systems used in these areas are classified as high-risk and face strict requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highRiskCategories.map((category, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow border-border/50 hover:border-warning/30">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-3">
                      <category.icon className="h-6 w-6 text-warning" />
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deployer Obligations */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Key Obligations
              </Badge>
              <h2 className="text-3xl font-bold mb-4">What Deployers Must Do</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Most SMEs are deployers (users of AI), not providers. Here are your key obligations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {obligations.map((obligation, i) => (
                <Card key={i} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 border-border/50">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{obligation.title}</h3>
                    <p className="text-sm text-muted-foreground">{obligation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Learn More
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Official Resources
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Access the official EU AI Act text and supporting documentation from 
                    the European Commission.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      Full EU AI Act Text (EUR-Lex)
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      European Commission AI Policy
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button className="w-full btn-premium" size="lg" asChild>
                    <Link to="/templates">
                      Download Compliance Templates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link to="/faq">
                      Read FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Get Compliant?"
        subtitle="Klarvo makes EU AI Act compliance simple. Start documenting your AI systems today."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Learn More", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
