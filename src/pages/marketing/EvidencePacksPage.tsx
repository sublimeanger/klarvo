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
  FileText,
  Shield,
  CheckCircle,
  FolderOpen,
  Users,
  Building,
  Lock,
  AlertTriangle
} from "lucide-react";

const packSections = [
  { section: "Executive Summary", description: "One-page overview with risk classification badge, compliance status, key risks, open gaps, and next review date" },
  { section: "AI System Inventory Record", description: "Complete system details: identity, ownership, deployment footprint, user groups, affected persons, workflow description, human involvement model" },
  { section: "AI System Definition Test", description: "In-scope/out-of-scope conclusion with rationale, reviewer, confidence level, and reference to Commission guidelines" },
  { section: "Prohibited Practices Screening", description: "Article 5 screening results across all 8 prohibited categories with explicit 'no indicators found' statement or escalation notes" },
  { section: "Risk Classification Memo", description: "Annex III high-risk screening, final classification decision, rationale, applicable timeline notes, and reviewer sign-off" },
  { section: "Transparency Obligations (Article 50)", description: "AI interaction disclosure, synthetic content marking, emotion recognition notices, deepfake disclosure, public-interest text disclosure evidence" },
  { section: "High-Risk Deployer Obligations (Article 26)", description: "Instructions for use, human oversight assignment, input data controls, monitoring plan, incident reporting, log retention, workplace notice, registration check" },
  { section: "Record-keeping & Logging", description: "Logging capability statement, access controls, export method, retention settings evidence per Article 12" },
  { section: "Data & Privacy", description: "Data types and sources, retention policy, DPIA status and link, data minimisation statement" },
  { section: "Training & AI Literacy (Article 4)", description: "Role-based training coverage, completion report for relevant staff, next refresh date" },
  { section: "Monitoring & Incidents", description: "Monitoring events summary, incidents summary, changes since last review, reassessment status" },
  { section: "Vendor Documentation", description: "Vendor profile, contract info, due diligence checklist, security docs, transparency support, logging capability confirmation" },
  { section: "Evidence Index", description: "Numbered list of all attachments: evidence ID, title, type, linked controls, date collected, owner, shareability classification" },
];

const useCases = [
  {
    title: "Procurement Due Diligence",
    description: "Enterprise buyers and public sector organisations increasingly require AI governance proof before signing contracts. Your evidence pack answers their questionnaire in one document—covering risk classification, human oversight, data governance, and incident response.",
    icon: Building
  },
  {
    title: "Auditor & Regulator Requests",
    description: "When internal audit, external auditors, or market surveillance authorities ask 'show me your AI governance,' you produce a professional, structured pack with traceable evidence IDs—not a scrambled folder of screenshots and email attachments.",
    icon: Shield
  },
  {
    title: "Board & Leadership Reporting",
    description: "Demonstrate governance maturity to leadership with a professional executive summary. Show total AI systems, risk distribution, compliance gaps, training completion, and audit readiness at a glance—without requiring the board to read hundreds of pages.",
    icon: Users
  },
];

const exportFormats = [
  { format: "Single PDF", description: "Executive-friendly summary document with all sections in one file. Ideal for quick sharing with leadership, customers, or initial auditor review." },
  { format: "ZIP Bundle", description: "Organized folder structure with raw evidence files: /Executive, /Inventory, /Classification, /Transparency, /HighRisk_Deployer, /Logging, /Data_Privacy, /Training, /Vendor, /Evidence_Index. Ready for detailed audit." },
  { format: "Read-Only Auditor Link", description: "Secure, time-limited link with access controls. Share with external auditors or customers without emailing files. Track access count and expiration." },
];

const faqQuestions = [
  {
    question: "What is an AI governance evidence pack?",
    answer: "An evidence pack is a structured bundle of documents demonstrating EU AI Act compliance—AI inventory, classification memos, control implementation, training records, and vendor documentation. It's your audit-ready proof of governance. Klarvo generates packs that look like a deliverable from a top compliance consultancy."
  },
  {
    question: "How quickly can I generate an evidence pack?",
    answer: "One click. Klarvo compiles all your governance data into a professional PDF or ZIP export instantly. No manual document compilation, formatting, or folder organisation."
  },
  {
    question: "What regulatory articles does the evidence pack cover?",
    answer: "The pack covers Article 5 (prohibited practices screening), Annex III (high-risk classification), Article 26 (deployer obligations), Article 50 (transparency), Article 12 (record-keeping), Article 4 (AI literacy), and Article 27 (FRIA where applicable). Each section references the specific regulatory basis."
  },
  {
    question: "Can I customize what's included?",
    answer: "Yes. Export a single system pack or organization-wide governance summary. Choose PDF for quick sharing or ZIP for detailed auditor review. The pack auto-includes only sections relevant to your system's classification—minimal risk systems won't show Article 26 deployer sections."
  },
  {
    question: "How does this help with procurement?",
    answer: "Enterprise customers and public sector organisations increasingly require AI governance documentation during procurement. Your evidence pack answers due diligence questionnaires covering risk management, human oversight, data governance, incident response, and training. Instead of answering 50 questions manually, you share one document."
  },
  {
    question: "What makes Klarvo's exports different from manual document packs?",
    answer: "Every piece of evidence has a unique ID (EV-001, EV-002...) that maps to specific controls. The pack includes a numbered evidence index with metadata: title, type, linked controls, collection date, owner, and shareability classification. This traceability is what auditors expect—and what manual compilation can't provide at scale."
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
        keywords={["AI governance evidence pack", "AI audit documentation", "EU AI Act evidence", "AI compliance export", "AI due diligence", "audit-ready AI documentation"]}
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
              One click generates a professional AI governance pack covering every EU AI Act requirement relevant to your system. Answer procurement, auditors, and board questions with confidence.
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

      {/* What Auditors Actually Want to See */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Auditors Actually Want to See</h2>
              <p className="text-lg text-muted-foreground">
                Auditors and procurement teams don't want a folder of random PDFs. They want structured, traceable documentation that demonstrates you've thought systematically about AI risk. Here's what they look for:
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Traceable evidence chain</div>
                  <p className="text-sm text-muted-foreground">Every claim of compliance should link to specific evidence. "We have human oversight" must point to an oversight SOP, training records, and named oversight personnel. Klarvo's evidence index provides unique IDs (EV-001, EV-002...) mapped to specific controls.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Classification rationale</div>
                  <p className="text-sm text-muted-foreground">Not just "this is minimal risk" but <em>why</em>—what screenings were performed, who reviewed the classification, and what confidence level was assigned. Klarvo's classification memo includes all Article 5 prohibited screening results, Annex III high-risk screening, and Article 50 transparency checks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Gap acknowledgement</div>
                  <p className="text-sm text-muted-foreground">Auditors respect organisations that clearly state what's incomplete and have a plan to address gaps. Klarvo's evidence pack includes an open gaps section with remediation tasks and target dates—showing you're on a path, not pretending everything is perfect.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
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
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">What's in the Pack</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Every evidence pack includes these sections, auto-populated from your Klarvo data. Sections are only included when relevant to your system's classification—minimal risk systems won't show high-risk deployer sections.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {packSections.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{item.section}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Formats */}
      <section className="py-16">
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
                    <p className="text-muted-foreground text-sm">{format.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Build Your Inventory</h3>
                  <p className="text-sm text-muted-foreground">Add AI systems via the guided wizard. Classify risk, attach evidence, and assign oversight owners.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Click Export</h3>
                  <p className="text-sm text-muted-foreground">Choose single system or org-wide pack. Select PDF for executives or ZIP for detailed audit. One click generates everything.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Share with Confidence</h3>
                  <p className="text-sm text-muted-foreground">Professional pack ready for auditors, procurement, or board. Or share via secure read-only auditor link with access tracking.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
