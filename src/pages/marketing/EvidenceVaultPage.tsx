import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  FolderOpen,
  Upload,
  Link2,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Users,
  Search,
  Download,
  Bell,
  AlertTriangle
} from "lucide-react";

const features = [
  {
    title: "Upload & Organize",
    description: "Drag-and-drop evidence files organized by AI system, control, or policy. Attach metadata: uploaded by, date, status, confidentiality, retention, and tags.",
    icon: Upload
  },
  {
    title: "Link to Controls",
    description: "Attach evidence directly to control implementations for end-to-end traceability. When an auditor asks 'show me proof of human oversight,' the evidence is one click away.",
    icon: Link2
  },
  {
    title: "Approval Workflows",
    description: "Route evidence for review and approval before marking as accepted. Track who approved, when, and with what notes. Essential for high-risk system governance.",
    icon: CheckCircle
  },
  {
    title: "Expiry Tracking",
    description: "Set validity periods on evidence. Get alerts 30 days before expiry. Automatic renewal tasks ensure compliance never goes stale—vendor contracts, training certs, and security docs stay current.",
    icon: Clock
  },
  {
    title: "Audit-Ready Exports",
    description: "Export linked evidence as part of your governance evidence pack. Every file gets a unique evidence ID (EV-001) that maps to specific controls in the export.",
    icon: Download
  },
  {
    title: "Search & Filter",
    description: "Find evidence by type, AI system, control, status, uploader, or date. Full-text search across document names and tags. No more digging through shared drives.",
    icon: Search
  },
];

const evidenceTypes = [
  { type: "Vendor Documentation", examples: "DPAs, security whitepapers, model cards, SOC 2 reports, AI Act statements" },
  { type: "Internal Policies", examples: "AI acceptable use policy, human oversight procedures, incident response playbooks" },
  { type: "Training Records", examples: "Completion logs, training materials, quiz results, policy acknowledgements, attestations" },
  { type: "Risk Assessments", examples: "FRIA reports, DPIA documents, internal risk reviews, classification memos" },
  { type: "Monitoring Reports", examples: "Performance dashboards, drift reports, bias test results, KPI tracking screenshots" },
  { type: "Transparency Notices", examples: "AI disclosure copy, UI screenshots, synthetic content labels, deepfake notices" },
  { type: "Incident Records", examples: "Incident postmortems, support tickets, containment actions, authority notifications" },
  { type: "Contracts & Procurement", examples: "Vendor contracts, renewal dates, SLA documents, due diligence questionnaire responses" },
];

const workflowSteps = [
  { step: "Upload", description: "Drag files or paste URLs into the vault. Files are stored securely with automatic metadata extraction." },
  { step: "Classify", description: "Tag by evidence type, link to AI system(s) and specific controls. Set confidentiality level (internal/shareable-with-auditor)." },
  { step: "Approve", description: "Route for review if the evidence requires sign-off. Approver adds notes and timestamps the acceptance." },
  { step: "Track", description: "Set expiry dates for time-sensitive evidence. Get renewal alerts and auto-created refresh tasks." },
  { step: "Export", description: "Evidence is automatically included in evidence packs with unique IDs and full metadata." },
];

const faqQuestions = [
  {
    question: "Why do I need a dedicated evidence vault?",
    answer: "The EU AI Act requires traceable evidence for compliance claims across multiple articles—Article 26 deployer duties, Article 4 training records, Article 12 logging, Article 50 transparency notices. Evidence scattered across email, shared drives, and chat threads is impossible to audit. A vault centralises everything with metadata, approval status, and direct links to the controls it supports."
  },
  {
    question: "What evidence does the EU AI Act expect?",
    answer: "It depends on your classification. For all systems: AI definition test results, classification rationale, and governance records. For high-risk deployers: human oversight SOPs, training completions, monitoring reports, log retention proof, incident records, worker notifications, and vendor due diligence. For transparency obligations: disclosure screenshots and synthetic content marking evidence."
  },
  {
    question: "How does evidence linking work?",
    answer: "Each piece of evidence can be attached to one or more AI systems, specific controls from the control library, tasks, or policies. When you generate an evidence pack, Klarvo traces from controls → linked evidence → metadata, producing a numbered evidence index that auditors can verify."
  },
  {
    question: "What happens when evidence expires?",
    answer: "Klarvo sends alerts 30 days before expiry. It auto-creates a renewal task assigned to the original uploader. Expired evidence is flagged in your audit readiness dashboard and evidence pack. This ensures vendor contracts, training certifications, and security reports are always current."
  },
  {
    question: "Can I request evidence from colleagues?",
    answer: "Yes. The 'evidence request' feature lets you ask a specific person to upload a specific type of evidence for a specific system or control. They receive a notification, and the request is tracked until fulfilled."
  },
  {
    question: "Is evidence access controlled?",
    answer: "Yes. Role-based permissions determine who can upload, view, approve, and export evidence. Evidence can be marked as internal-only or shareable-with-auditor. Approval workflows ensure proper governance before evidence is accepted."
  }
];

export default function EvidenceVaultPage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo Evidence Vault",
    description: "Centralized compliance evidence storage with approval workflows, expiry tracking, and audit-ready exports for EU AI Act compliance.",
    applicationCategory: "BusinessApplication",
    offers: { price: "99", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Product", url: "https://klarvo.io/features" },
      { name: "Evidence Vault", url: "https://klarvo.io/evidence-vault-software" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Compliance Evidence Vault | Klarvo"
        description="Centralized evidence storage for EU AI Act compliance. Upload, organize, approve evidence with expiry tracking and audit-ready exports."
        keywords={["compliance evidence vault", "evidence management", "AI compliance evidence", "audit evidence storage", "EU AI Act evidence", "evidence tracking software"]}
        canonical="https://klarvo.io/evidence-vault-software"
        ogType="website"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Product</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Compliance Evidence Vault
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All your AI governance evidence in one place. Upload, organize, approve—and export audit-ready packs when you need them. Never scramble for documents again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">
                  See All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Documents Get Lost */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Compliance Evidence Gets Lost</h2>
              <p className="text-lg text-muted-foreground">
                Most organisations already have the evidence they need—it's just scattered across tools, folders, and people. Without a central vault, compliance becomes a scavenger hunt.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Vendor SOC 2 reports in email attachments</div>
                  <p className="text-xs text-muted-foreground">Nobody remembers which email, which version, or whether it's expired.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Training completions in HR systems</div>
                  <p className="text-xs text-muted-foreground">Disconnected from the AI system they relate to. No one links them to Article 4 obligations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Oversight SOPs in shared drives</div>
                  <p className="text-xs text-muted-foreground">Version-controlled by filename ("v3_FINAL_v2"). No approval record. No link to the AI system.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Transparency screenshots on someone's desktop</div>
                  <p className="text-xs text-muted-foreground">Undated, unlinked, and lost when they leave the company.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">What You Can Store</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              The vault supports all evidence types needed for EU AI Act compliance across Articles 4, 5, 12, 26, 27, and 50:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {evidenceTypes.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{item.type}</div>
                    <div className="text-xs text-muted-foreground">{item.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Lifecycle */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Compliance Evidence Lifecycle</h2>
              <p className="text-lg text-muted-foreground">
                Compliance isn't a one-time exercise. Evidence has a lifecycle—it's created, reviewed, approved, used in exports, and eventually expires and needs renewal. Klarvo manages every stage.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {workflowSteps.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2 text-sm">{item.step}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Use a Vault?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Audit-Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    When auditors ask "show me evidence of human oversight for this AI system," it's one click—not a 3-day scramble through email, shared drives, and Slack messages. Every piece of evidence is tagged, linked, and exportable.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Never Expire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Get alerts before evidence expires. Automatic renewal tasks keep compliance current. Your audit readiness score reflects evidence freshness—so you always know where you stand.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Controlled Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Role-based permissions and approval workflows ensure proper governance. System owners upload, compliance owners approve, and auditors get read-only access via secure links.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FolderOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Evidence Packs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export vault contents as professional audit packs with numbered evidence indices.
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
                  <Link2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Control Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Link evidence directly to control implementations across 60+ controls in 9 categories.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/features">
                      See Controls <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
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

      <CTASection
        title="Centralize Your Compliance Evidence"
        subtitle="Upload, organize, and export audit-ready documentation from one vault."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
