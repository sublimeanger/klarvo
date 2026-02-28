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
  Shield,
  Zap,
  Euro,
  Clock,
  Target,
  Scale,
  FileText
} from "lucide-react";

const comparisonPoints = [
  {
    feature: "AI-Specific Controls",
    trust: "Generic GRC controls—you adapt them yourself",
    klarvo: "EU AI Act Article 26, 27, 50 controls built-in",
    advantage: "klarvo"
  },
  {
    feature: "FRIA Workflow",
    trust: "Build your own assessment template",
    klarvo: "Guided Article 27 FRIA with PDF export",
    advantage: "klarvo"
  },
  {
    feature: "Annex III Classification",
    trust: "Manual interpretation of categories",
    klarvo: "Automated high-risk screening wizard",
    advantage: "klarvo"
  },
  {
    feature: "Deployer Obligations Checklist",
    trust: "Create your own checklist",
    klarvo: "Auto-generated per system classification",
    advantage: "klarvo"
  },
  {
    feature: "Setup Time",
    trust: "Weeks of configuration",
    klarvo: "Hours—start classifying on day one",
    advantage: "klarvo"
  },
  {
    feature: "SME Pricing",
    trust: "$20K+ annually (enterprise-first)",
    klarvo: "€99/month Starter tier",
    advantage: "klarvo"
  },
  {
    feature: "Breadth of Frameworks",
    trust: "SOC 2, ISO, GDPR, HIPAA, and more",
    klarvo: "EU AI Act focus (ISO 42001 coming)",
    advantage: "trust"
  },
  {
    feature: "Security Certifications",
    trust: "Full SOC 2 / ISO 27001 workflows",
    klarvo: "AI governance only (partner for SOC 2)",
    advantage: "trust"
  },
];

const useCases = [
  {
    scenario: "You need EU AI Act compliance quickly",
    recommendation: "Klarvo",
    reason: "Purpose-built for AI Act with faster time-to-value"
  },
  {
    scenario: "You already use a GRC platform for SOC 2/ISO",
    recommendation: "Keep both",
    reason: "Use Klarvo for AI-specific workflows, existing tool for security"
  },
  {
    scenario: "You're an SME with limited budget",
    recommendation: "Klarvo",
    reason: "Enterprise GRC tools are priced for large organizations"
  },
  {
    scenario: "You need one tool for all compliance frameworks",
    recommendation: "GRC Platform",
    reason: "Broader framework coverage, but expect AI Act gaps"
  },
];

const faqQuestions = [
  {
    question: "How does Klarvo compare to Vanta, Drata, or OneTrust?",
    answer: "These platforms excel at security compliance (SOC 2, ISO 27001, GDPR) with broad framework coverage. Klarvo is purpose-built for EU AI Act compliance with AI-specific workflows—Article 26 deployer checklists, FRIA assessments, and Annex III classification—that generic GRC tools don't provide out of the box."
  },
  {
    question: "Can I use Klarvo alongside my existing GRC tool?",
    answer: "Yes. Many organizations use Klarvo for AI-specific governance while keeping their existing GRC platform for security certifications. The tools are complementary—Klarvo handles AI Act, your GRC handles SOC 2/ISO."
  },
  {
    question: "Why can't I just add AI controls to my existing GRC platform?",
    answer: "You can, but you'll need to: (1) interpret the EU AI Act yourself, (2) build custom control frameworks, (3) create FRIA templates, (4) design classification workflows. Klarvo does this out of the box with regulatory-aligned controls."
  },
  {
    question: "Is Klarvo enterprise-ready?",
    answer: "Yes. Klarvo offers SSO, role-based permissions, audit logs, and multi-workspace support on Pro and Enterprise tiers. The difference is we're SME-accessible first—you don't need a $20K budget to get started."
  },
  {
    question: "Will Klarvo expand to other frameworks?",
    answer: "Yes. ISO/IEC 42001 (AI Management System) control mapping is on the roadmap. Our focus is AI governance depth rather than breadth across all compliance domains."
  }
];

export default function KlarvoVsTrustPlatforms() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act Compliance: Klarvo vs GRC Platforms",
    description: "Compare Klarvo with trust platforms like Vanta, Drata, and OneTrust. See why AI-specific controls matter for EU AI Act compliance.",
    datePublished: "2025-01-27",
    dateModified: "2026-02-28"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Compare", url: "https://klarvo.io/compare" },
      { name: "Klarvo vs Trust Platforms", url: "https://klarvo.io/compare/klarvo-vs-trust-platforms" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act: Klarvo vs GRC/Trust Platforms"
        description="Compare Klarvo with Vanta, Drata, OneTrust for EU AI Act compliance. See why AI-specific controls, FRIA workflows, and SME pricing matter."
        keywords={["EU AI Act vs GRC", "Klarvo vs Vanta", "AI compliance vs trust platforms", "EU AI Act software comparison", "AI governance tools"]}
        canonical="https://klarvo.io/compare/klarvo-vs-trust-platforms"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">Comparison</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EU AI Act: Specialist vs Generic GRC
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generic trust platforms handle SOC 2 brilliantly. But for EU AI Act, you need AI-specific workflows. Here's the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start with Klarvo
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

      {/* The Core Difference */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Core Difference</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-muted-foreground mb-2" />
                  <CardTitle>Generic GRC Platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Broad framework coverage (SOC 2, ISO, GDPR)</li>
                    <li>• You interpret EU AI Act requirements</li>
                    <li>• Build your own AI controls and templates</li>
                    <li>• Enterprise pricing ($20K+ annually)</li>
                    <li>• Weeks of initial configuration</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="flex items-center gap-2">
                    Klarvo <Badge>AI-First</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      EU AI Act controls built-in
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Guided FRIA, classification, Article 26 checklists
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Ready-to-use templates and workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      SME-accessible pricing (€99/month)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Start classifying systems on day one
                    </li>
                  </ul>
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
                    <th className="text-left p-4 font-semibold">Generic GRC</th>
                    <th className="text-left p-4 font-semibold">
                      <span className="text-primary">Klarvo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{point.feature}</td>
                      <td className="p-4">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          {point.advantage === "trust" ? (
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive/50 shrink-0 mt-0.5" />
                          )}
                          <span className="text-sm">{point.trust}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          {point.advantage === "klarvo" ? (
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive/50 shrink-0 mt-0.5" />
                          )}
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

      {/* When to Use What */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">When to Use What</h2>
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{useCase.scenario}</div>
                        <div className="text-sm text-muted-foreground">{useCase.reason}</div>
                      </div>
                      <Badge variant={useCase.recommendation === "Klarvo" ? "default" : "secondary"} className="shrink-0">
                        {useCase.recommendation}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Klarvo for AI Act</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Faster Time-to-Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Start classifying AI systems on day one. No weeks of framework configuration.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Scale className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Regulatory Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Controls map directly to Articles 5, 26, 27, 50, and Annex III. No interpretation needed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Euro className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>SME-Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Start free, scale to €99/month. Not $20K+ enterprise contracts.
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

      <CTASection
        title="Ready for AI-Specific Compliance?"
        subtitle="Get EU AI Act controls, FRIA workflows, and classification automation out of the box."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "See Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
