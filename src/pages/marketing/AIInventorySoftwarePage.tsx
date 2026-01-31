import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Link2,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Database
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Guided 20-Step Wizard",
    description: "Our wizard captures all EU AI Act required fields—purpose, affected groups, data types, oversight, and more—in under 10 minutes.",
  },
  {
    icon: Search,
    title: "Automatic Classification",
    description: "As you complete the wizard, Klarvo automatically determines risk level, flags prohibited practices, and identifies transparency obligations.",
  },
  {
    icon: AlertTriangle,
    title: "Gap Detection",
    description: "See exactly what's missing. Each AI system shows a completeness score with specific gaps to address before audit.",
  },
  {
    icon: Link2,
    title: "Evidence Linking",
    description: "Attach policies, screenshots, and vendor docs directly to each AI system. Evidence stays organized and audit-ready.",
  },
  {
    icon: Database,
    title: "Vendor & Model Tracking",
    description: "Track which vendors and foundation models power each system. Link to contracts and due diligence documentation.",
  },
  {
    icon: Clock,
    title: "Change Management",
    description: "When AI systems change, trigger reassessment prompts. Version history tracks what changed and when.",
  },
];

const faqQuestions = [
  {
    question: "What is an AI inventory?",
    answer: "An AI inventory is a register of all AI systems used or deployed by an organization. Under the EU AI Act, maintaining an inventory is essential for tracking obligations, evidencing compliance, and supporting governance processes."
  },
  {
    question: "What should an AI inventory include?",
    answer: "A comprehensive AI inventory includes: system name and purpose, vendor and model information, affected persons, data types processed, human oversight arrangements, risk classification, linked evidence, and ownership details."
  },
  {
    question: "Is an AI inventory required by the EU AI Act?",
    answer: "While the EU AI Act doesn't explicitly mandate a 'register', it requires organizations to track and document AI systems, their risk levels, and associated obligations. An inventory is the practical way to meet these requirements."
  },
  {
    question: "How is Klarvo different from a spreadsheet inventory?",
    answer: "Klarvo provides automated classification, evidence attachment, approval workflows, version history, and audit-ready exports. Spreadsheets lack these capabilities and become unmanageable as your AI portfolio grows."
  },
  {
    question: "Can I import my existing AI inventory?",
    answer: "Yes. Klarvo supports CSV import for existing inventories. We'll map your columns to our fields and help you enhance records with classification and evidence."
  }
];

export default function AIInventorySoftwarePage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo - AI Inventory Software",
    description: "AI inventory software for EU AI Act compliance. Track every AI system with guided intake, automatic classification, and evidence linking.",
    applicationCategory: "BusinessApplication",
    offers: { price: "0", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "AI Inventory Software", url: "https://klarvo.io/ai-inventory-software" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Inventory Software - EU AI Act"
        description="AI inventory software for EU AI Act compliance. Track every AI system with guided intake, automatic classification, and audit-ready evidence linking."
        keywords={["AI inventory software", "AI register software", "AI system inventory", "EU AI Act inventory", "AI asset management", "AI governance software"]}
        canonical="https://klarvo.io/ai-inventory-software"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="AI Inventory Software"
        title={
          <>
            <span className="text-foreground">Track Every AI System.</span>
            <br />
            <span className="text-gradient-hero">Classify Risk Automatically.</span>
          </>
        }
        subtitle="Build your EU AI Act compliant AI inventory in hours, not weeks. Our guided wizard captures everything regulators require."
        variant="centered"
      />

      {/* Key Stats */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-primary">10 min</div>
              <div className="text-sm text-muted-foreground">per AI system</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">20 steps</div>
              <div className="text-sm text-muted-foreground">guided wizard</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">EU AI Act aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Than Just a List</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Klarvo's AI inventory connects classification, evidence, and controls in one place.
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

      {/* Template CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Template</Badge>
            <h2 className="text-3xl font-bold mb-4">Start with Our AI Inventory Template</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download our free spreadsheet template to get started. When you're ready, import it into Klarvo for automated tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/templates/ai-inventory-template">
                  Get Free Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/guides/ai-inventory-eu-ai-act">
                  Read the Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Build Your AI Inventory Today"
        subtitle="Start free. Get your first AI system documented in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
