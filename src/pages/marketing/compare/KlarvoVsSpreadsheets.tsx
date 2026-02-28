import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Shield,
  Clock,
  Users,
  RefreshCw,
  Download,
  AlertTriangle
} from "lucide-react";

const comparisonPoints = [
  {
    feature: "Audit Trail",
    spreadsheet: "No history of who changed what",
    klarvo: "Full audit log of every action",
    critical: true
  },
  {
    feature: "Classification Automation",
    spreadsheet: "Manual lookup of Annex III categories",
    klarvo: "Guided wizard with automatic risk flagging",
    critical: true
  },
  {
    feature: "Evidence Linking",
    spreadsheet: "Paste file paths or hyperlinks",
    klarvo: "Direct upload with approval workflows",
    critical: true
  },
  {
    feature: "Evidence Expiry Tracking",
    spreadsheet: "Manual calendar reminders",
    klarvo: "Automatic expiry alerts and renewal tasks",
    critical: true
  },
  {
    feature: "Export Quality",
    spreadsheet: "Print to PDF (formatting issues)",
    klarvo: "Professional PDF/ZIP evidence packs",
    critical: false
  },
  {
    feature: "Change Triggers",
    spreadsheet: "Manual reassessment tracking",
    klarvo: "Automatic prompts on material changes",
    critical: true
  },
  {
    feature: "Collaboration",
    spreadsheet: "Version conflicts, no role controls",
    klarvo: "Multi-user with role-based permissions",
    critical: false
  },
  {
    feature: "Obligations Mapping",
    spreadsheet: "Separate checklist documents",
    klarvo: "Auto-generated per system classification",
    critical: true
  },
];

const migrationSteps = [
  {
    step: 1,
    title: "Export Your Current Inventory",
    description: "Download your spreadsheet as CSV"
  },
  {
    step: 2,
    title: "Map Columns",
    description: "Match your fields to Klarvo's inventory structure"
  },
  {
    step: 3,
    title: "Import & Validate",
    description: "Klarvo flags missing data and suggests next steps"
  },
  {
    step: 4,
    title: "Run Classification",
    description: "Use the wizard to classify each system properly"
  },
];

const faqQuestions = [
  {
    question: "Why can't I just use Excel or Google Sheets for AI inventory?",
    answer: "Spreadsheets lack audit trails, automated classification, evidence linking, and expiry tracking—all critical for demonstrating EU AI Act compliance. When an auditor asks 'who classified this and when?' a spreadsheet can't answer."
  },
  {
    question: "What's wrong with spreadsheets for compliance?",
    answer: "Three main issues: no audit history (who changed what, when), no automated workflows (evidence expiry, reassessment triggers), and no structured exports (professional evidence packs). Auditors expect traceability."
  },
  {
    question: "Can I import my existing spreadsheet into Klarvo?",
    answer: "Yes. Export your spreadsheet as CSV, map columns to Klarvo's inventory fields, and import. Klarvo will flag missing data and guide you through completing each system's profile."
  },
  {
    question: "How much time will I save with Klarvo vs spreadsheets?",
    answer: "Typical savings: 60% reduction in initial inventory time (guided wizard vs blank cells), 80% reduction in audit prep (one-click exports vs manual compilation), and elimination of missed deadlines (automatic reminders)."
  },
  {
    question: "Is Klarvo affordable for small teams?",
    answer: "Yes. Klarvo starts free for up to 2 AI systems. The Starter tier at €99/month covers up to 10 systems—far less than the cost of an audit failure or procurement rejection."
  }
];

export default function KlarvoVsSpreadsheets() {
  const articleSchema = createArticleSchema({
    headline: "AI Inventory: Spreadsheets vs Dedicated Software",
    description: "Compare spreadsheet-based AI inventories with purpose-built software. See why audit trails, automation, and evidence packs matter for EU AI Act compliance.",
    datePublished: "2025-01-26",
    dateModified: "2026-02-28"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Compare", url: "https://klarvo.io/compare" },
      { name: "Klarvo vs Spreadsheets", url: "https://klarvo.io/compare/klarvo-vs-spreadsheets" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Inventory: Spreadsheets vs Software Comparison"
        description="Compare spreadsheet-based AI inventories with Klarvo. See why audit trails, classification automation, and evidence packs matter for EU AI Act compliance."
        keywords={["AI inventory spreadsheet vs software", "Excel AI inventory", "AI inventory tool", "EU AI Act spreadsheet", "AI compliance software"]}
        canonical="https://klarvo.io/compare/klarvo-vs-spreadsheets"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Comparison</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Inventory: Spreadsheets vs Klarvo
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Most companies start with a spreadsheet. Here's why that becomes a problem—and how to upgrade without starting over.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://app.klarvo.io/auth/signup">
                  Import Your Spreadsheet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/ai-inventory-template">
                  <Download className="mr-2 h-5 w-5" />
                  Get Free Template
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Spreadsheet Problem</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-destructive/30">
                <CardHeader>
                  <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle>No Audit Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When an auditor asks "who classified this system and when?"—a spreadsheet can't answer.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-destructive/30">
                <CardHeader>
                  <Clock className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle>No Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Evidence expiry, reassessment triggers, and review reminders require manual tracking.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-destructive/30">
                <CardHeader>
                  <FileSpreadsheet className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle>Poor Exports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Printing a spreadsheet to PDF doesn't produce a professional evidence pack.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-left p-4 font-semibold">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Spreadsheet
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Klarvo
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {point.feature}
                          {point.critical && (
                            <Badge variant="destructive" className="text-xs">Critical</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <XCircle className="h-4 w-4 text-destructive shrink-0" />
                          <span className="text-sm">{point.spreadsheet}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm">{point.klarvo}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Path */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Easy Migration Path</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Already have a spreadsheet? Import it in four steps:
            </p>
            <div className="grid gap-6 md:grid-cols-4">
              {migrationSteps.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Time Savings</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">60%</div>
                  <div className="text-muted-foreground">Faster initial inventory</div>
                  <div className="text-sm text-muted-foreground mt-2">Guided wizard vs blank cells</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">80%</div>
                  <div className="text-muted-foreground">Less audit prep time</div>
                  <div className="text-sm text-muted-foreground mt-2">One-click exports vs manual compilation</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">0</div>
                  <div className="text-muted-foreground">Missed deadlines</div>
                  <div className="text-sm text-muted-foreground mt-2">Automatic reminders vs manual tracking</div>
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
        title="Ready to Upgrade from Spreadsheets?"
        subtitle="Import your existing inventory and get audit-ready compliance in days, not months."
        primaryCta={{ label: "Start Free Import", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "Download Template First", href: "/templates/ai-inventory-template" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
