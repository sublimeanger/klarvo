import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  Shield, 
  Download, 
  Clock,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "AI System Inventory",
    description: "Track every AI system with a 20-step guided wizard. Capture all EU AI Act required fields in under 10 minutes.",
  },
  {
    icon: Shield,
    title: "Automated Classification",
    description: "Our classification engine determines risk level, detects prohibited practices, and flags transparency obligations automatically.",
  },
  {
    icon: Target,
    title: "Gap Analysis & Controls",
    description: "See exactly what's missing. Get auto-generated checklists based on your classification with linked evidence requirements.",
  },
  {
    icon: Download,
    title: "Audit-Ready Exports",
    description: "Generate professional PDF reports and ZIP evidence packs that satisfy auditors, boards, and customer procurement.",
  },
  {
    icon: Users,
    title: "Evidence Vault",
    description: "Store policies, screenshots, and vendor docs. Attach evidence to controls with approval workflows and expiration tracking.",
  },
  {
    icon: Clock,
    title: "Continuous Compliance",
    description: "Get reminded before deadlines. Track training completion. Log incidents. Keep evidence fresh with automatic renewal alerts.",
  },
];

const benefits = [
  "Complete AI inventory in hours, not weeks",
  "Know your risk level with clear rationale",
  "Auto-generate Article 26 deployer checklists",
  "FRIA workflow for high-risk systems",
  "Export evidence packs for procurement",
  "Track training completion for AI literacy",
];

const faqQuestions = [
  {
    question: "What is EU AI Act compliance software?",
    answer: "EU AI Act compliance software helps organizations inventory their AI systems, classify risk levels, track required controls, and generate documentation to prove compliance with the European Union's AI Act regulation."
  },
  {
    question: "Who needs EU AI Act compliance software?",
    answer: "Any organization using AI systems in the EU or serving EU customers needs to comply with the EU AI Act. This includes deployers (users of AI), providers (developers of AI), and importers/distributors of AI systems."
  },
  {
    question: "When did the EU AI Act come into force?",
    answer: "The EU AI Act entered into force on 1 August 2024. Prohibited practices and AI literacy obligations started applying from 2 February 2025, with broader obligations applying from August 2025 and 2026."
  },
  {
    question: "How is Klarvo different from spreadsheets?",
    answer: "Unlike spreadsheets, Klarvo provides automated classification logic, version-controlled evidence storage, approval workflows, audit trails, and professional export packs. It also updates automatically when regulations change."
  },
  {
    question: "Can I try Klarvo for free?",
    answer: "Yes! Klarvo offers a free tier that lets you inventory up to 2 AI systems with basic classification and export functionality. No credit card required."
  },
  {
    question: "How long does it take to get compliant with Klarvo?",
    answer: "Most SMEs can complete their first AI system classification in under 10 minutes. A full inventory with evidence typically takes days, not the weeks required with manual approaches."
  }
];

export default function ComplianceSoftwarePage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo - EU AI Act Compliance Software",
    description: "AI system-of-record for EU AI Act compliance. Build AI inventories, classify risk, and generate audit-ready evidence packs.",
    applicationCategory: "BusinessApplication",
    offers: { price: "0", priceCurrency: "EUR" },
    aggregateRating: { ratingValue: 4.9, reviewCount: 47 }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "EU AI Act Compliance Software", url: "https://klarvo.io/eu-ai-act-compliance-software" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Compliance Software"
        description="EU AI Act compliance software for SMEs. Build your AI inventory, classify risk, and generate audit-ready evidence packs. Start free today."
        keywords={["EU AI Act compliance software", "AI governance software", "AI compliance tool", "EU AI Act software", "AI regulation software", "AI inventory software"]}
        canonical="https://klarvo.io/eu-ai-act-compliance-software"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="EU AI Act Compliance Software"
        title={
          <>
            <span className="text-foreground">The AI System-of-Record for</span>
            <br />
            <span className="text-gradient-hero">EU AI Act Compliance</span>
          </>
        }
        subtitle="Turn EU AI Act requirements into assigned controls, linked evidence, and audit-ready export packs. Built for SMEs who need compliance without the complexity."
        variant="centered"
      />

      {/* Social Proof */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>10 minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <span>Updated for Feb 2025 deadlines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for EU AI Act Compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From inventory to evidence packs, Klarvo covers the full compliance lifecycle.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Why Klarvo</Badge>
              <h2 className="text-3xl font-bold mb-4">Purpose-Built for EU AI Act</h2>
              <p className="text-lg text-muted-foreground">
                Unlike generic GRC tools, Klarvo understands AI-specific regulations.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who Uses Klarvo?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">SMEs</Badge>
                <CardTitle className="text-lg">Small & Medium Businesses</CardTitle>
                <CardDescription>Get compliant without hiring consultants. Klarvo guides you through every step.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/use-cases/sme">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">HR Teams</Badge>
                <CardTitle className="text-lg">HR & Recruitment</CardTitle>
                <CardDescription>AI in hiring is high-risk. Get your Article 26 obligations sorted.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/industries/hr-recruitment-ai-act">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">SaaS</Badge>
                <CardTitle className="text-lg">B2B SaaS Companies</CardTitle>
                <CardDescription>Generate evidence packs that satisfy customer procurement questionnaires.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0">
                  <Link to="/industries/saas-selling-into-eu">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get EU AI Act Compliant Today"
        subtitle="Start free. No credit card required. Get your first AI system classified in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
