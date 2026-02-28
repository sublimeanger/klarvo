import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema, createHowToSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
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
  Settings,
  Search,
  Globe,
  Lock
} from "lucide-react";

const inventoryFields = [
  { 
    category: "Core Identity",
    icon: Database,
    fields: [
      { name: "System Name & ID", desc: "Internal name and unique reference ID (e.g., AI-001)" },
      { name: "Status", desc: "Idea, Pilot, Live, or Retired" },
      { name: "Department", desc: "Business unit responsible (e.g., HR, Marketing)" },
      { name: "Business Owner", desc: "Person accountable for the system" }
    ]
  },
  { 
    category: "Deployment Scope",
    icon: Globe,
    fields: [
      { name: "Deployment Regions", desc: "EU countries, UK, US, etc." },
      { name: "Internal Users", desc: "Which teams use it (e.g., Recruiters)" },
      { name: "Affected Persons", desc: "Who is impacted (e.g., Candidates, Customers)" },
      { name: "Scale", desc: "Approximate number of people affected" }
    ]
  },
  { 
    category: "Risk & Compliance",
    icon: Shield,
    fields: [
      { name: "Risk Level", desc: "Minimal, Limited, High-Risk, or Prohibited" },
      { name: "Prohibited Check", desc: "Result of Article 5 screening" },
      { name: "High-Risk Category", desc: "Annex III category if applicable" },
      { name: "Transparency Status", desc: "Article 50 obligations triggered?" }
    ]
  },
  { 
    category: "Technical & Vendor",
    icon: Settings,
    fields: [
      { name: "Role", desc: "Deployer, Provider, or Importer" },
      { name: "Vendor Name", desc: "Company providing the system" },
      { name: "Model Details", desc: "Foundation model used (e.g., GPT-4)" },
      { name: "Integration Type", desc: "API, SaaS, or On-premise" }
    ]
  }
];

const commonMistakes = [
  {
    mistake: "Only listing 'obvious' AI",
    reality: "Companies often miss embedded AI: chatbots in helpdesk software, screening tools in ATS, or generative features in office suites. You need to audit your software stack, not just 'AI projects'.",
    icon: Search
  },
  {
    mistake: "Using spreadsheets without version control",
    reality: "Compliance requires an audit trail. If a system changes from 'pilot' to 'live', you need a record of when and who approved it. Spreadsheets overwrite history; they don't track it.",
    icon: FileText
  },
  {
    mistake: "Set-and-forget mentality",
    reality: "An inventory is a living document. AI systems evolve—vendors update models, use cases expand. You need a review cadence (e.g., quarterly) to keep data accurate.",
    icon: RefreshCw
  },
  {
    mistake: "No clear ownership",
    reality: "Every system needs a named human owner. 'IT Department' is not an owner. You need a specific person accountable for compliance decisions.",
    icon: Users
  },
];

const howToSteps = [
  { name: "1. Discover & Audit", text: "Survey department heads and check software procurement records. Look for tools doing prediction, recommendation, content generation, or automated decisioning." },
  { name: "2. Centralise Data", text: "Create a single register. Start with our free template or use Klarvo's software. Capture the 'Core Identity' fields first." },
  { name: "3. Assign Ownership", text: "For each system, designate a primary business owner. This person will be responsible for answering classification questions." },
  { name: "4. Classify Risk", text: "Run each system through prohibited practice screening and high-risk classification. Tag them clearly: 'Minimal', 'High-Risk', etc." },
  { name: "5. Gap Analysis", text: "For high-risk systems, identifying missing controls (e.g., 'Missing human oversight SOP'). For transparency cases, check for disclosures." },
  { name: "6. Maintain", text: "Set a quarterly review cadence. Ask owners: 'Has the use case changed? Has the vendor updated the model?'" },
];

const faqQuestions = [
  {
    question: "What is an AI system inventory under the EU AI Act?",
    answer: "An AI system inventory is a documented register of all AI systems your organization uses or deploys. While the Act doesn't explicitly use the word 'inventory' in every article, maintaining one is the only practical way to demonstrate compliance with Article 9 (risk management), Article 4 (literacy), and Article 26 (deployer obligations)."
  },
  {
    question: "Is an AI inventory mandatory?",
    answer: "Effectively, yes. You cannot comply with the EU AI Act without knowing what AI systems you have. High-risk deployers specifically must keep logs and documentation. Public authorities must register high-risk systems in an EU database—which requires inventory data."
  },
  {
    question: "What systems should be included?",
    answer: "Include ALL AI systems, regardless of risk level. Even 'minimal risk' systems like spam filters or inventory predictors should be listed to prove you assessed them. Don't forget embedded AI in third-party SaaS tools (e.g., Zoom AI summaries, Salesforce Einstein)."
  },
  {
    question: "How detailed does it need to be?",
    answer: "It depends on the risk. For minimal risk systems, a name, owner, and brief description is often sufficient. For high-risk systems, you need detailed technical documentation, logging capabilities, oversight plans, and vendor instructions."
  },
  {
    question: "Can we use Excel?",
    answer: "For very small companies with 1-2 systems, Excel is a starting point. However, it lacks version history, evidence linking, and automated risk classification logic. As you scale, a dedicated governance platform (like Klarvo) becomes necessary to manage the complexity and evidence requirements."
  }
];

export default function AIInventoryGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Inventory for EU AI Act Compliance: Complete Guide",
    description: "Learn how to build and maintain an AI system inventory for EU AI Act compliance. Covers required fields, common mistakes, and best practices.",
    datePublished: "2025-01-20",
    dateModified: "2026-02-28"
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
        keywords={["AI inventory EU AI Act", "AI system register", "AI inventory template", "EU AI Act inventory", "AI system documentation", "AI governance register"]}
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
              You can't govern what you can't see. Your AI inventory is the foundation of compliance. Learn what to capture, how to maintain it, and the mistakes that trip up most organizations.
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
                  <p className="text-muted-foreground text-sm">
                    In a decentralized organisation, different teams buy different tools. Without a central inventory, you have "Shadow AI"—unmanaged risks hiding in departments. The inventory brings visibility.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Risk Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Which systems are high-risk? Which need transparency notices? Which process personal data? You can't answer these questions without a structured list of systems and their attributes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Audit Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    When regulators or customers ask about your AI governance, your inventory is Exhibit A. It proves you have a handle on your AI landscape and aren't flying blind.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fields to Capture - Expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Essential Fields to Capture</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A compliant AI inventory needs structured data points. Here is the schema we recommend:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {inventoryFields.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <category.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.fields.map((field, i) => (
                        <li key={i} className="flex flex-col gap-1">
                          <span className="font-semibold text-sm">{field.name}</span>
                          <span className="text-xs text-muted-foreground">{field.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Want this structure pre-built?
              </p>
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

      <RelatedContent currentHref="/guides/ai-inventory-eu-ai-act" title="More Guides" />

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
