import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, RelatedContent, ContentBreadcrumb, HubNavigation, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle,
  ArrowRight,
  Table,
  Shield
} from "lucide-react";

const templateFields = [
  { category: "Identity", fields: ["System name", "Internal ID", "Owner", "Department", "Status"] },
  { category: "Purpose", fields: ["Use case description", "Affected groups", "Decision type", "Human involvement"] },
  { category: "Technical", fields: ["Vendor/provider", "Model type", "Data sources", "Adapts after deployment"] },
  { category: "Classification", fields: ["Risk level", "High-risk category", "Transparency requirements"] },
  { category: "Governance", fields: ["Oversight owner", "Review date", "Evidence links", "Training status"] },
];

const howToSteps = [
  { name: "Download the template", text: "Click the download button to get the spreadsheet in your preferred format (Excel or Google Sheets)." },
  { name: "Add your AI systems", text: "Create one row per AI system. Start with the most critical or highest-risk systems." },
  { name: "Complete required fields", text: "Fill in identity, purpose, and technical details. Don't worry about classification yet." },
  { name: "Classify risk levels", text: "Use our classification guide or the Klarvo checker tool to determine risk levels." },
  { name: "Link evidence", text: "Add links to vendor documentation, policies, and screenshots in the evidence columns." },
  { name: "Import to Klarvo", text: "When ready, import your spreadsheet into Klarvo for automated tracking and exports." },
];

const faqQuestions = [
  {
    question: "What fields are required in an AI inventory?",
    answer: "At minimum: system name, owner, purpose, affected groups, vendor (if applicable), risk classification, and human oversight arrangements. Our template includes all EU AI Act recommended fields."
  },
  {
    question: "How often should I update my AI inventory?",
    answer: "Review your inventory quarterly at minimum. Update immediately when: adding new AI systems, changing vendors, modifying use cases, or after any material system changes."
  },
  {
    question: "Can I import this template into Klarvo?",
    answer: "Yes! Klarvo supports CSV import. We'll map your columns automatically and help you enhance records with classification logic and evidence attachment."
  },
  {
    question: "Is this template compliant with EU AI Act requirements?",
    answer: "This template captures all fields recommended by the EU AI Act for deployers. It's based on Article 26 requirements and European Commission guidance."
  }
];

export default function AIInventoryTemplate() {
  const howToSchema = createHowToSchema({
    name: "How to Create an AI Inventory for EU AI Act Compliance",
    description: "Step-by-step guide to building your AI system inventory using our free template.",
    steps: howToSteps,
    totalTime: "PT30M"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "AI Inventory Template", url: "https://klarvo.io/templates/ai-inventory-template" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Free AI Inventory Template - EU AI Act"
        description="Download our free AI inventory template for EU AI Act compliance. Track all AI systems with required fields for classification, evidence, and governance."
        keywords={["AI inventory template", "AI register template", "EU AI Act inventory", "AI system register", "AI asset inventory template"]}
        canonical="https://klarvo.io/templates/ai-inventory-template"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <section className="pt-8 pb-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContentBreadcrumb currentHref="/templates/ai-inventory-template" />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="outline">Most Popular</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Inventory Template
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Free spreadsheet template to document all your AI systems with EU AI Act required fields. 
              Download now, or import directly into Klarvo for automated tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="AI Inventory Template"
                templateSlug="ai-inventory"
                fileName="ai-inventory-template.xlsx"
                buttonText="Download Template (Excel)"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/signup">
                  Import to Klarvo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templateFields.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.fields.map((field) => (
                        <li key={field} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {field}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Use This Template</h2>
            <div className="space-y-4">
              {howToSteps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.name}</h3>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
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
              <Card>
                <CardHeader>
                  <Table className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Inventory Guide</CardTitle>
                  <CardDescription>Learn best practices for building your inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/guides/ai-inventory-eu-ai-act">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Risk Checker Tool</CardTitle>
                  <CardDescription>Classify your AI systems automatically.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/tools/high-risk-checker-annex-iii">Run Checker <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Inventory Software</CardTitle>
                  <CardDescription>Automate your inventory with Klarvo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/ai-inventory-software">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
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

      {/* Hub Navigation */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <HubNavigation />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for Automated Compliance?"
        subtitle="Import your inventory into Klarvo for classification, evidence linking, and audit-ready exports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
