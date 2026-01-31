import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema, createHowToSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  Database,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Download,
  List,
  Shield,
  RefreshCw,
  Settings
} from "lucide-react";

const inventoryFields = [
  { field: "System Name & ID", description: "Unique identifier for tracking across your organization", required: true },
  { field: "Business Owner", description: "The person accountable for compliance decisions", required: true },
  { field: "Vendor/Provider", description: "Who built it—internal, SaaS, API, or open-source", required: true },
  { field: "Purpose & Use Case", description: "What decision or output does it influence?", required: true },
  { field: "Affected Groups", description: "Customers, employees, candidates, students, etc.", required: true },
  { field: "Deployment Region", description: "EU countries where the system is used", required: true },
  { field: "Risk Classification", description: "Minimal, limited, high-risk, or prohibited", required: true },
  { field: "Human Oversight", description: "HITL, HOTL, or HOOTL model", required: false },
  { field: "Data Types Processed", description: "Personal data, special categories, minors", required: false },
  { field: "Logging & Retention", description: "Where logs are stored and for how long", required: false },
];

const commonMistakes = [
  {
    mistake: "Only listing 'obvious' AI",
    reality: "Chatbots, recommendation engines, automated screening tools are all AI. Audit your entire software stack.",
    icon: AlertTriangle
  },
  {
    mistake: "Using spreadsheets without audit trails",
    reality: "Excel doesn't capture who changed what and when—critical for compliance evidence.",
    icon: FileText
  },
  {
    mistake: "Set-and-forget mentality",
    reality: "AI systems evolve. Your inventory needs regular review triggers for model updates, new use cases, and vendor changes.",
    icon: RefreshCw
  },
  {
    mistake: "No ownership assignment",
    reality: "Every system needs a named business owner. 'IT' or 'The team' isn't good enough.",
    icon: Users
  },
];

const howToSteps = [
  { name: "Identify all AI systems", text: "Audit your software stack for any system that infers outputs from inputs—chatbots, ML models, recommendation engines, automated decision-making tools." },
  { name: "Gather system information", text: "For each system, document the vendor, purpose, affected groups, deployment regions, and data types processed." },
  { name: "Assign ownership", text: "Designate a business owner for each system who is accountable for compliance decisions." },
  { name: "Classify risk levels", text: "Use the Annex III criteria to determine if each system is minimal, limited, or high-risk." },
  { name: "Document controls", text: "Record human oversight models, logging capabilities, and operational procedures." },
  { name: "Establish review cadence", text: "Set triggers for quarterly reviews, model updates, and vendor changes to keep the inventory current." },
];

const faqQuestions = [
  {
    question: "What is an AI system inventory under the EU AI Act?",
    answer: "An AI system inventory is a documented register of all AI systems your organization uses or deploys. It captures essential information like system purpose, risk classification, ownership, and compliance status—forming the foundation of EU AI Act compliance."
  },
  {
    question: "Why is an AI inventory the first step in compliance?",
    answer: "You can't classify, control, or evidence compliance for systems you don't know about. The inventory is your single source of truth that enables all other compliance activities—from prohibited practice screening to high-risk deployer obligations."
  },
  {
    question: "What fields should an AI inventory capture?",
    answer: "At minimum: system name, owner, vendor, purpose, affected groups, deployment regions, risk classification, and human oversight model. Additional fields like data types, logging, and transparency requirements help with Article 26 and 50 obligations."
  },
  {
    question: "How often should we update the AI inventory?",
    answer: "Review quarterly at minimum. Additionally, update immediately when there are model changes, new use cases, vendor updates, or material changes that could affect risk classification."
  },
  {
    question: "Can we use a spreadsheet for our AI inventory?",
    answer: "While spreadsheets work initially, they lack audit trails, automated classification, and evidence linking. Purpose-built tools like Klarvo provide these features essential for demonstrating compliance to auditors."
  }
];

export default function AIInventoryGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Inventory for EU AI Act Compliance: Complete Guide",
    description: "Learn how to build and maintain an AI system inventory for EU AI Act compliance. Covers required fields, common mistakes, and best practices.",
    datePublished: "2025-01-20",
    dateModified: "2025-01-31"
  });

  const howToSchema = createHowToSchema({
    name: "How to Build an AI System Inventory",
    description: "Step-by-step guide to creating a compliant AI inventory for the EU AI Act",
    steps: howToSteps,
    totalTime: "PT2H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "AI Inventory Guide", url: "https://klarvo.io/guides/ai-inventory-eu-ai-act" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Inventory for EU AI Act: Complete Guide"
        description="Build a compliant AI system inventory for the EU AI Act. Learn what fields to capture, common mistakes to avoid, and how to maintain your register."
        keywords={["AI inventory EU AI Act", "AI system register", "AI inventory template", "EU AI Act inventory", "AI system documentation"]}
        canonical="https://klarvo.io/guides/ai-inventory-eu-ai-act"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                12 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Inventory for EU AI Act Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your AI inventory is the foundation of compliance. Learn what to capture, how to maintain it, and the mistakes that trip up most organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/templates/ai-inventory-template">
                  <Download className="mr-2 h-5 w-5" />
                  Download Inventory Template
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/ai-inventory-software">
                  Try Inventory Software
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Your AI Inventory Matters</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Database className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Single Source of Truth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You can't classify, control, or evidence compliance for systems you don't know about.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Risk Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See which systems are high-risk, which need transparency notices, and where gaps exist.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Audit Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When regulators or customers ask, your inventory is the first thing they'll want to see.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fields to Capture */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Essential Fields to Capture</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A compliant AI inventory needs these data points for each system.
            </p>
            <div className="space-y-3">
              {inventoryFields.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                >
                  <div className="shrink-0 mt-0.5">
                    {item.required ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Settings className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2">
                      {item.field}
                      {item.required && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/templates/ai-inventory-template">
                  <Download className="mr-2 h-4 w-4" />
                  Get the Full Template
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Build - Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Build Your Inventory</h2>
            <div className="space-y-6">
              {howToSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{step.name}</h3>
                        <p className="text-muted-foreground">{step.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Mistakes to Avoid</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {commonMistakes.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-destructive" />
                      {item.mistake}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.reality}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <List className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Inventory Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Downloadable spreadsheet with all required fields.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/ai-inventory-template">
                      Download Template <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Definition Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Not sure if it's an AI system? Use our checker.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/tools/ai-system-definition-checker">
                      Check Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Inventory Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Automated inventory with audit trails and exports.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/ai-inventory-software">
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
        title="Ready to Build Your AI Inventory?"
        subtitle="Klarvo automates inventory management with guided intake, classification, and audit-ready exports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Download Template", href: "/templates/ai-inventory-template" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
