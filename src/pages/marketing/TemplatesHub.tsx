import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createFAQSchema } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ClipboardCheck, 
  Shield, 
  Users, 
  Building, 
  FileWarning,
  Download,
  ArrowRight
} from "lucide-react";

const templates = [
  {
    icon: FileText,
    title: "AI Inventory Template",
    description: "Complete spreadsheet template to document all AI systems with EU AI Act required fields.",
    href: "/templates/ai-inventory-template",
    category: "Core",
    popular: true,
  },
  {
    icon: Shield,
    title: "FRIA Template",
    description: "Fundamental Rights Impact Assessment template aligned with Article 27 requirements.",
    href: "/templates/fria-template",
    category: "High-Risk",
    popular: true,
  },
  {
    icon: ClipboardCheck,
    title: "Article 26 Deployer Checklist",
    description: "Comprehensive checklist for high-risk AI deployer obligations under Article 26.",
    href: "/templates/article-26-checklist",
    category: "High-Risk",
    popular: true,
  },
  {
    icon: Users,
    title: "Article 50 Disclosure Templates",
    description: "Ready-to-use disclosure copy for AI interactions, synthetic content, and deepfakes.",
    href: "/templates/article-50-disclosure-templates",
    category: "Transparency",
  },
  {
    icon: FileText,
    title: "AI Acceptable Use Policy",
    description: "Internal policy template for governing AI use across your organization.",
    href: "/templates/ai-acceptable-use-policy",
    category: "Governance",
  },
  {
    icon: Users,
    title: "Human Oversight Plan Template",
    description: "Document your human oversight arrangements for high-risk AI systems.",
    href: "/templates/human-oversight-plan-template",
    category: "High-Risk",
  },
  {
    icon: Building,
    title: "Vendor Due Diligence Questionnaire",
    description: "Questions to ask AI vendors about their EU AI Act compliance and documentation.",
    href: "/templates/vendor-due-diligence-questionnaire",
    category: "Procurement",
  },
  {
    icon: FileWarning,
    title: "AI Incident Register Template",
    description: "Log and track AI-related incidents with severity levels and corrective actions.",
    href: "/templates/ai-incident-register-template",
    category: "Operations",
  },
];

const faqQuestions = [
  {
    question: "Are these templates free to use?",
    answer: "Yes, all templates are free to download and use. You can also import them directly into Klarvo for automated tracking, evidence attachment, and export functionality."
  },
  {
    question: "Do these templates cover all EU AI Act requirements?",
    answer: "These templates cover the most common deployer obligations under the EU AI Act, including inventory, classification, transparency, and high-risk requirements. For complex scenarios, we recommend using Klarvo's full platform."
  },
  {
    question: "Can I customize these templates?",
    answer: "Absolutely. All templates are fully editable. When you import them into Klarvo, you can customize fields, add your branding, and adapt them to your specific needs."
  },
  {
    question: "How often are templates updated?",
    answer: "We update templates whenever the European Commission publishes new guidance or clarifications. Klarvo users receive automatic updates."
  }
];

export default function TemplatesHub() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" }
    ]
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  return (
    <MarketingLayout>
      <SEOHead
        title="Free EU AI Act Compliance Templates"
        description="Download free EU AI Act compliance templates: AI inventory, FRIA, Article 26 checklist, transparency notices, and more. Import directly into Klarvo."
        keywords={["EU AI Act template", "AI inventory template", "FRIA template", "Article 26 checklist", "AI compliance templates", "AI governance templates"]}
        canonical="https://klarvo.io/templates"
      />
      <SchemaMarkup schema={[breadcrumbSchema, faqSchema]} />

      <HeroSection
        badge="Free Templates"
        title={
          <>
            <span className="text-foreground">EU AI Act Compliance</span>
            <br />
            <span className="text-gradient-hero">Templates & Checklists</span>
          </>
        }
        subtitle="Download free, ready-to-use templates for AI inventory, FRIA, deployer checklists, and more. Start compliant today—import into Klarvo for automated tracking."
        variant="centered"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.href} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <template.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      {template.popular && (
                        <Badge variant="default">Popular</Badge>
                      )}
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={template.href}>
                      <Download className="mr-2 h-4 w-4" />
                      Get Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want Automated Compliance?"
        subtitle="Import templates into Klarvo for version control, evidence attachment, approval workflows, and audit-ready exports."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
      />
    </MarketingLayout>
  );
}
