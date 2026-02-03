import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Package,
  FileText,
  Shield,
  CheckCircle,
  Download,
  FolderOpen,
  Users,
  Building,
  Lock,
  Zap,
  Clock
} from "lucide-react";

const packSections = [
  { section: "Executive Summary", description: "One-page overview with risk classification and compliance status" },
  { section: "AI System Inventory", description: "Complete system details: purpose, owner, deployment, affected groups" },
  { section: "Classification Memo", description: "Prohibited screening, high-risk assessment, rationale, and sign-off" },
  { section: "Obligations Checklist", description: "Article 26/50 controls with implementation status" },
  { section: "Human Oversight Plan", description: "HITL/HOTL model, competence, authority to intervene" },
  { section: "Evidence Index", description: "Numbered list of all attached evidence with metadata" },
  { section: "Training Records", description: "AI literacy completion for relevant staff roles" },
  { section: "Vendor Documentation", description: "Due diligence, security docs, contract references" },
];

const useCases = [
  {
    title: "Procurement Due Diligence",
    description: "Enterprise buyers and public sector require AI governance proof before signing contracts.",
    icon: Building
  },
  {
    title: "Auditor Requests",
    description: "When regulators or internal audit ask 'show me your AI governance,' you're ready.",
    icon: Shield
  },
  {
    title: "Board Reporting",
    description: "Demonstrate governance maturity to leadership with professional documentation.",
    icon: Users
  },
];

const exportFormats = [
  { format: "Single PDF", description: "Executive-friendly summary for quick sharing" },
  { format: "ZIP Bundle", description: "Organized folders with raw evidence files for detailed audits" },
  { format: "Read-Only Link", description: "Secure auditor access without emailing files" },
];

const faqQuestions = [
  {
    question: "What is an AI governance evidence pack?",
    answer: "An evidence pack is a structured bundle of documents demonstrating EU AI Act compliance—AI inventory, classification memos, control implementation, training records, and vendor documentation. It's your audit-ready proof of governance."
  },
  {
    question: "How quickly can I generate an evidence pack?",
    answer: "One click. Klarvo compiles all your governance data into a professional PDF or ZIP export instantly. No manual document compilation or formatting."
  },
  {
    question: "What's included in the pack?",
    answer: "Executive summary, AI system inventory, classification memo, obligations checklist, human oversight plan, evidence index with all attachments, training records, and vendor documentation."
  },
  {
    question: "Can I customize what's included?",
    answer: "Yes. Export a single system pack or organization-wide governance summary. Choose PDF for quick sharing or ZIP for detailed auditor review."
  },
  {
    question: "How does this help with procurement?",
    answer: "Enterprise customers and public sector organizations increasingly require AI governance documentation. Your evidence pack answers their due diligence questionnaire in one document."
  }
];

export default function EvidencePacksPage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo Evidence Packs",
    description: "Generate audit-ready AI governance evidence packs in one click. Professional PDF and ZIP exports for procurement, auditors, and board reporting.",
    applicationCategory: "BusinessApplication",
    offers: { price: "99", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "AI Governance Evidence Packs", url: "https://klarvo.io/ai-governance-evidence-packs" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Governance Evidence Packs | Klarvo"
        description="Generate audit-ready AI governance evidence packs in one click. Professional PDF and ZIP exports for procurement due diligence and auditors."
        keywords={["AI governance evidence pack", "AI audit documentation", "EU AI Act evidence", "AI compliance export", "AI due diligence"]}
        canonical="https://klarvo.io/ai-governance-evidence-packs"
        ogType="website"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Product</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Audit-Ready Evidence Packs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              One click generates a professional AI governance pack. Answer procurement, auditors, and board questions with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/guides/evidence-pack-procurement">
                  <FileText className="mr-2 h-5 w-5" />
                  Read the Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Evidence Packs Matter</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <useCase.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">What's in the Pack</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Every evidence pack includes these sections, auto-populated from your Klarvo data:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {packSections.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{item.section}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Formats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Export Formats</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {exportFormats.map((format, index) => (
                <Card key={index}>
                  <CardHeader>
                    {index === 0 && <FileText className="h-10 w-10 text-primary mb-2" />}
                    {index === 1 && <FolderOpen className="h-10 w-10 text-primary mb-2" />}
                    {index === 2 && <Lock className="h-10 w-10 text-primary mb-2" />}
                    <CardTitle>{format.format}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{format.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Build Your Inventory</h3>
                  <p className="text-sm text-muted-foreground">
                    Add AI systems, classify risk, upload evidence
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Click Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose PDF or ZIP, single system or org-wide
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Share with Confidence</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional pack ready for auditors or procurement
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent currentHref="/ai-governance-evidence-packs" title="Related Resources" />

      <CTASection
        title="Generate Your First Evidence Pack"
        subtitle="Start free and export audit-ready documentation in minutes."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Read the Guide", href: "/guides/evidence-pack-procurement" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
