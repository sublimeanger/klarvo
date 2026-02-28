import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
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
  Lock,
  AlertTriangle,
  Eye,
  Database
} from "lucide-react";

const packContents = [
  {
    section: "1. Executive Summary",
    items: ["System name & ID", "Risk Classification badge", "Compliance Status", "Key gaps", "Next review date"],
    purpose: "For leadership/board. High-level assurance without technical detail."
  },
  {
    section: "2. Inventory Record",
    items: ["Owner", "Department", "Purpose", "Deployment regions", "Vendor details", "Model info"],
    purpose: "For auditors. Proves you know what the system is and who owns it."
  },
  {
    section: "3. Classification Logic",
    items: ["Article 5 screening", "Annex III screening", "Article 50 screening", "Final verdict", "Rationale", "Reviewer sign-off"],
    purpose: "For regulators. Demonstrates due diligence in determining risk."
  },
  {
    section: "4. Obligations Checklist",
    items: ["Article 26 deployer duties status", "Transparency implementation", "Literacy coverage", "Gap remediation plan"],
    purpose: "For compliance officers. Shows progress against legal requirements."
  },
  {
    section: "5. Human Oversight Plan",
    items: ["Oversight model (HITL/HOTL)", "Named overseers", "Competence/training records", "Authority to intervene"],
    purpose: "For high-risk audits. Proves meaningful human control."
  },
  {
    section: "6. Evidence Index",
    items: ["List of all attachments", "Document versions", "Dates", "Confidentiality level"],
    purpose: "For everyone. The 'table of contents' for your compliance proof."
  },
];

const procurementQuestions = [
  {
    question: "Do you have an AI governance framework?",
    answer: "Yes. Share the Executive Summary showing your policy framework and risk classification methodology.",
    urgency: "High"
  },
  {
    question: "Is this system high-risk under the EU AI Act?",
    answer: "Share the Classification Logic section. If low risk, show the screening that proves it.",
    urgency: "High"
  },
  {
    question: "How do you ensure human oversight?",
    answer: "Share the Human Oversight Plan. Demonstrate that a human can intervene or stop the system.",
    urgency: "Medium"
  },
  {
    question: "What training do your staff receive?",
    answer: "Share the AI Literacy/Training records section of the pack.",
    urgency: "Medium"
  },
  {
    question: "How do you handle incidents?",
    answer: "Share your Incident Response procedure and log template from the pack.",
    urgency: "Low"
  }
];

const exportFormats = [
  {
    format: "Single PDF",
    useCase: "Executive summary for board meetings or initial sales conversations.",
    icon: FileText
  },
  {
    format: "ZIP Bundle",
    useCase: "Full audit or procurement due diligence. Contains raw evidence files (policies, screenshots).",
    icon: FolderOpen
  },
  {
    format: "Secure Link",
    useCase: "Sharing with external auditors or customers without sending files via email.",
    icon: Lock
  },
];

const faqQuestions = [
  {
    question: "What is an AI governance evidence pack?",
    answer: "It is a structured compilation of documents that proves your AI system complies with relevant regulations (EU AI Act, GDPR). It links your claims (e.g., 'we have oversight') to proof (e.g., 'here is the signed oversight plan')."
  },
  {
    question: "Why do I need one?",
    answer: "Two reasons: 1) To pass procurement. Enterprise buyers won't sign contracts without proof of AI safety. 2) To survive audits. If a regulator calls, you need to produce documentation immediately, not start writing it then."
  },
  {
    question: "How is this different from a technical file?",
    answer: "A technical file (Annex IV) is for Providers (builders). An evidence pack is broader—it includes Deployer (user) evidence like training records, oversight logs, and internal policies, which the technical file doesn't cover."
  },
  {
    question: "Can Klarvo generate this automatically?",
    answer: "Yes. Klarvo pulls data from your inventory, classification, and evidence vault to compile the pack. You don't need to manually copy-paste into Word documents."
  },
  {
    question: "How often should I update it?",
    answer: "Ideally, the pack is generated 'on demand' from live data. If you maintain static files, update them quarterly or whenever the system undergoes a material change."
  }
];

export default function EvidencePackGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Governance Evidence Packs: Procurement-Ready Documentation",
    description: "Learn how to create audit-ready AI governance evidence packs. What to include, how to organize it, and how to respond to procurement questionnaires.",
    datePublished: "2025-01-25",
    dateModified: "2026-02-28"
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
        keywords={["AI governance evidence pack", "AI due diligence", "AI audit documentation", "EU AI Act evidence", "AI procurement", "AI trust pack"]}
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
              "Show me your AI policy." "Prove this isn't high-risk." Enterprise buyers and auditors are asking hard questions. The Evidence Pack is your answer.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Why You Need an Evidence Pack</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Close Deals Faster</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Procurement cycles for AI software are stalling due to compliance concerns. Handing over a complete evidence pack on Day 1 builds trust and speeds up approval.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Pass Audits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Regulators (and internal auditors) don't trust what you say; they trust what you can prove. An organized pack turns a chaotic audit into a tick-box exercise.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Reassure Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Your Board wants to know: "Are we compliant? Are we safe?" A one-page executive summary from your pack answers this definitively.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What to Include - Expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Anatomy of a Perfect Pack</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Don't just dump files in a folder. Structure your evidence like this:
            </p>
            <div className="space-y-4">
              {packContents.map((section, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{section.section}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {section.items.map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-xs font-normal">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right md:w-48 shrink-0">
                        <div className="font-medium text-foreground">Purpose</div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Answering Due Diligence</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              When procurement sends a questionnaire, your pack provides the answers:
            </p>
            <div className="space-y-4">
              {procurementQuestions.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">"{item.question}"</div>
                        <div className="text-sm text-muted-foreground">{item.answer}</div>
                      </div>
                      <Badge variant={item.urgency === "High" ? "destructive" : "secondary"} className="shrink-0 h-fit">
                        {item.urgency} Priority
                      </Badge>
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
                    <p className="text-muted-foreground text-sm">{format.useCase}</p>
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
                  <CardTitle className="text-lg">Generate Packs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Software to auto-generate packs from your inventory.
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
                    Template for assessing your own vendors.
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
                    Central storage for all your compliance files.
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
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See Sample Pack", href: "/ai-governance-evidence-packs" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
