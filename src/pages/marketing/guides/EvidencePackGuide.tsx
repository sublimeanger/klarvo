import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  Package,
  FileText,
  Shield,
  CheckCircle,
  Download,
  FolderOpen,
  Users,
  Building,
  Lock
} from "lucide-react";

const packContents = [
  {
    section: "AI System Summary",
    items: ["System name & ID", "Business owner", "Purpose description", "Deployment scope"],
    purpose: "Quick reference for auditors"
  },
  {
    section: "Classification Memo",
    items: ["AI definition test result", "Prohibited screening", "High-risk assessment", "Final classification"],
    purpose: "Demonstrates due diligence"
  },
  {
    section: "Obligations Checklist",
    items: ["Article 26 deployer duties", "Article 50 transparency", "Logging requirements", "Control status"],
    purpose: "Shows compliance mapping"
  },
  {
    section: "Human Oversight Plan",
    items: ["Oversight model (HITL/HOTL)", "Competence requirements", "Authority to intervene", "Monitoring procedures"],
    purpose: "High-risk requirement"
  },
  {
    section: "Evidence Index",
    items: ["Training records", "Policy documents", "Vendor attestations", "Screenshots/configs"],
    purpose: "Proves implementation"
  },
  {
    section: "Vendor Documentation",
    items: ["Vendor profile", "Security docs", "Contract/DPA", "Model card (if applicable)"],
    purpose: "Supply chain due diligence"
  },
];

const procurementQuestions = [
  {
    question: "How do you identify and classify AI systems?",
    answer: "Show your classification memo with Annex III screening results and rationale",
    urgency: "Common"
  },
  {
    question: "What controls are in place for high-risk AI?",
    answer: "Provide obligations checklist and control implementation status",
    urgency: "Common"
  },
  {
    question: "How do you ensure human oversight?",
    answer: "Include your human oversight plan with competence requirements",
    urgency: "Common"
  },
  {
    question: "What training do staff receive?",
    answer: "Attach training completion records and AI policy acknowledgements",
    urgency: "Common"
  },
  {
    question: "How do you handle AI incidents?",
    answer: "Reference your incident register template and escalation procedures",
    urgency: "Less Common"
  },
  {
    question: "What vendor due diligence do you perform?",
    answer: "Include vendor questionnaire responses and security documentation",
    urgency: "Less Common"
  },
];

const exportFormats = [
  {
    format: "Single PDF",
    useCase: "Quick sharing with leadership or procurement contacts",
    icon: FileText
  },
  {
    format: "ZIP Bundle",
    useCase: "Detailed auditor pack with organized folders and raw evidence",
    icon: FolderOpen
  },
  {
    format: "Read-Only Portal Link",
    useCase: "Secure auditor access without sending files",
    icon: Lock
  },
];

const faqQuestions = [
  {
    question: "What is an AI governance evidence pack?",
    answer: "An evidence pack is a structured bundle of documents that demonstrates your EU AI Act compliance—including AI inventory, classification memos, control implementation, training records, and vendor documentation. It's what you present to auditors, customers, or procurement teams."
  },
  {
    question: "Why do procurement teams ask for AI governance documentation?",
    answer: "Enterprise customers and public sector organizations increasingly require vendors to demonstrate AI compliance before contracting. The evidence pack answers their due diligence questions in one document."
  },
  {
    question: "What should an evidence pack include?",
    answer: "At minimum: AI system inventory, classification documentation, applicable obligations checklist, human oversight plan, training records, and vendor documentation. For high-risk systems, add FRIA reports and incident procedures."
  },
  {
    question: "How often should we update our evidence pack?",
    answer: "Refresh quarterly or when material changes occur—new AI systems, vendor changes, model updates, or regulatory guidance. Keep evidence validity periods tracked and renew before expiry."
  },
  {
    question: "Can we use Klarvo to generate evidence packs?",
    answer: "Yes. Klarvo automatically compiles all your AI governance documentation into audit-ready PDF and ZIP exports. One click generates a professional evidence pack from your current compliance data."
  }
];

export default function EvidencePackGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Governance Evidence Packs: Procurement-Ready Documentation",
    description: "Learn how to create audit-ready AI governance evidence packs. What to include, how to organize it, and how to respond to procurement questionnaires.",
    datePublished: "2025-01-25",
    dateModified: "2025-01-31"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "Evidence Pack Guide", url: "https://klarvo.io/guides/evidence-pack-procurement" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Governance Evidence Packs: Procurement Guide"
        description="Create audit-ready AI governance evidence packs. Learn what to include, how to structure documentation, and respond to procurement due diligence."
        keywords={["AI governance evidence pack", "AI due diligence", "AI audit documentation", "EU AI Act evidence", "AI procurement"]}
        canonical="https://klarvo.io/guides/evidence-pack-procurement"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <Badge variant="outline">Procurement</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                10 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Governance Evidence Packs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Enterprise customers and auditors want proof of AI compliance. Here's what to include in your evidence pack and how to structure it for maximum impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/ai-governance-evidence-packs">
                  <Download className="mr-2 h-5 w-5" />
                  Download Sample Pack
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/vendor-due-diligence-questionnaire">
                  Vendor Questionnaire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Evidence Packs Matter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Evidence Packs Matter</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Procurement Due Diligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enterprise and public sector buyers increasingly require AI governance documentation before signing contracts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Auditor Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When regulators or internal audit ask "show me your AI governance," you need a ready answer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Board Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leadership wants visibility into AI risk. A professional pack demonstrates your governance maturity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">What to Include</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A comprehensive evidence pack has these sections:
            </p>
            <div className="space-y-4">
              {packContents.map((section, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{section.section}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {section.items.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        {section.purpose}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Procurement Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Procurement Questions</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Here's what buyers typically ask and how your evidence pack answers:
            </p>
            <div className="space-y-4">
              {procurementQuestions.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">"{item.question}"</div>
                        <div className="text-sm text-muted-foreground">{item.answer}</div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">{item.urgency}</Badge>
                    </div>
                  </CardContent>
                </Card>
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
                    <format.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{format.format}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{format.useCase}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Package className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Evidence Packs Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    One-click generation of audit-ready packs.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/ai-governance-evidence-packs">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Vendor Questionnaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Template for vendor AI due diligence.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/vendor-due-diligence-questionnaire">
                      Get Template <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FolderOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Evidence Vault</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Organize and manage all your compliance evidence.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/evidence-vault-software">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
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

      <CTASection
        title="Generate Evidence Packs in One Click"
        subtitle="Klarvo compiles your AI governance data into professional, audit-ready exports automatically."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Sample Pack", href: "/ai-governance-evidence-packs" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
