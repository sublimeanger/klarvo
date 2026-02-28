import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
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
  Database,
  Shield,
  BookOpen,
  RefreshCw
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

const inventoryFields = [
  { category: "Identity & Ownership", fields: "Name, internal ID, primary owner, backup owner, department, status (Idea/Pilot/Live/Retired)" },
  { category: "Deployment Scope", fields: "EU/UK/US regions, EU country list, internal user groups, affected persons, customer-facing flag" },
  { category: "Value Chain Role", fields: "Deployer/Provider/Importer/Distributor, vendor name, foundation model, contract links" },
  { category: "AI Definition Test", fields: "Infers outputs? Autonomous operation? Adaptive? Technical approach? Conclusion with rationale" },
  { category: "Purpose & Use Case", fields: "Category, workflow description, output type, human involvement model, usage frequency, impact scale" },
  { category: "Data & Privacy", fields: "Personal data, special categories, minors, data sources, retention periods, DPIA status" },
  { category: "Oversight & Logging", fields: "Oversight model (HITL/HOTL/HOOTL), SOP status, monitoring plan, log retention, export capability" },
  { category: "Risk Screening", fields: "Prohibited practices (8 checks), high-risk Annex III (9 categories), transparency (6 scenarios)" },
];

const faqQuestions = [
  {
    question: "What is an AI inventory?",
    answer: "An AI inventory is a register of all AI systems used or deployed by an organization. Under the EU AI Act, maintaining an inventory is essential for tracking obligations, evidencing compliance, and supporting governance processes."
  },
  {
    question: "What should an AI inventory include?",
    answer: "A comprehensive AI inventory includes: system name and purpose, vendor and model information, affected persons, data types processed, human oversight arrangements, risk classification, linked evidence, and ownership details. Klarvo's wizard captures over 80 structured fields across 20 steps."
  },
  {
    question: "Is an AI inventory required by the EU AI Act?",
    answer: "While the EU AI Act doesn't explicitly mandate a single 'register', it requires organizations to track and document AI systems, their risk levels, and associated obligations across multiple articles (Articles 4, 5, 9, 13, 26, 27, and 50). An inventory is the practical way to meet these requirements systematically."
  },
  {
    question: "How is Klarvo different from a spreadsheet inventory?",
    answer: "Klarvo provides automated classification, evidence attachment, approval workflows, version history, and audit-ready exports. Spreadsheets lack classification logic, can't link evidence to controls, have no approval workflows, and become unmanageable as your AI portfolio grows. When you export from Klarvo, the output is a professional compliance pack—not a CSV."
  },
  {
    question: "Can I import my existing AI inventory?",
    answer: "Yes. Klarvo supports CSV import for existing inventories. We'll map your columns to our fields and help you enhance records with classification and evidence."
  },
  {
    question: "What happens when I add a new AI system?",
    answer: "Klarvo automatically creates tasks: complete classification, upload vendor documentation, assign oversight owner, add transparency notice (if user-facing), and sets a default review date 90 days out. If classification results in high-risk, additional tasks are generated for Article 26 deployer duties."
  },
  {
    question: "How does the 'AI system definition test' work?",
    answer: "The wizard includes a structured questionnaire based on the European Commission's guidelines for determining whether something qualifies as an 'AI system' under the Act. You answer questions about inference, autonomy, adaptiveness, and technical approach. The conclusion—in-scope, out-of-scope, or needs review—is stored with rationale, reviewer, and confidence level."
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
              <div className="text-3xl font-bold text-primary">80+</div>
              <div className="text-sm text-muted-foreground">structured fields</div>
            </div>
          </div>
        </div>
      </section>

      {/* What the EU AI Act Requires */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What the EU AI Act Requires You to Track</h2>
              <p className="text-lg text-muted-foreground">
                The EU AI Act doesn't ask for a simple list. It expects structured, traceable documentation across multiple dimensions—from who is affected by the system to what human oversight is in place and whether the system adapts after deployment. Here's what Klarvo captures for each AI system:
              </p>
            </div>
            <div className="space-y-4">
              {inventoryFields.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{item.category}</div>
                    <div className="text-sm text-muted-foreground">{item.fields}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Every field maps to a specific regulatory requirement. Nothing is captured without purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
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

      {/* From Spreadsheet to System-of-Record */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Migration</Badge>
              <h2 className="text-3xl font-bold mb-4">From Spreadsheet to System-of-Record</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Spreadsheet Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• No classification logic—you guess the risk level</p>
                  <p>• Evidence lives in separate folders, email threads, or shared drives</p>
                  <p>• No version history when systems or classifications change</p>
                  <p>• No approval workflows—anyone can edit anything</p>
                  <p>• Exporting for audit means manually compiling documents</p>
                  <p>• Becomes unmanageable past 5–10 AI systems</p>
                  <p>• No automated tasks, reminders, or review schedules</p>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Klarvo System-of-Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Automated classification with Article 5, Annex III, and Article 50 screening</p>
                  <p>• Evidence attached directly to systems and controls with metadata</p>
                  <p>• Full version history with change rationale and reviewer sign-off</p>
                  <p>• Role-based permissions and evidence approval workflows</p>
                  <p>• One-click export produces professional PDF/ZIP evidence packs</p>
                  <p>• Scales from 1 to 75+ AI systems with the same workflow</p>
                  <p>• Auto-generated tasks, review dates, and renewal reminders</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/compare/klarvo-vs-spreadsheets">
                  See Full Comparison <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After You Add a System */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Happens After You Add a System</h2>
              <p className="text-lg text-muted-foreground">
                Klarvo doesn't just store data—it creates a compliance workflow around every AI system.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Auto-generated tasks</div>
                  <p className="text-sm text-muted-foreground">Complete classification, upload vendor docs, assign oversight owner, add transparency notice, review in 90 days.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">If classified high-risk</div>
                  <p className="text-sm text-muted-foreground">Auto-generates the full Article 26 deployer obligations checklist: human oversight, logging retention, monitoring, incident reporting, worker notification, and FRIA trigger check.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">If transparency obligations apply</div>
                  <p className="text-sm text-muted-foreground">Creates tasks for AI interaction disclosure, synthetic content marking, deepfake labelling, or public-interest text disclosure—depending on what your system does.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Template</Badge>
            <h2 className="text-3xl font-bold mb-4">Start with Our AI Inventory Template</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download our free spreadsheet template to get started. When you're ready, import it into Klarvo for automated tracking, classification, and evidence linking.
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

      <RelatedContent currentHref="/ai-inventory-software" title="Related Resources" />

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
