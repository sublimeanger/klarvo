import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { HubNavigation } from "@/components/marketing/HubNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ArrowRight,
  Building,
  Shield,
  FileText,
  Bell
} from "lucide-react";

const questionnaireCategories = [
  {
    icon: Building,
    title: "Vendor Profile",
    questions: [
      "Company legal name and jurisdiction",
      "AI system name and version",
      "Contact for AI governance queries",
      "Contract renewal date"
    ]
  },
  {
    icon: FileText,
    title: "AI System Details",
    questions: [
      "System purpose and functionality",
      "Risk classification (vendor's assessment)",
      "Instructions for use availability",
      "Model provider (if using third-party models)"
    ]
  },
  {
    icon: Shield,
    title: "Compliance Documentation",
    questions: [
      "EU AI Act compliance statement",
      "Technical documentation availability",
      "Conformity assessment status",
      "CE marking status (if high-risk)"
    ]
  },
  {
    icon: Bell,
    title: "Transparency & Support",
    questions: [
      "Transparency disclosures supported",
      "Logging capabilities and export",
      "Incident notification process",
      "Support for deployer obligations"
    ]
  },
];

const faqQuestions = [
  {
    question: "Why do I need to do due diligence on AI vendors?",
    answer: "As a deployer, you have obligations under Article 26 even when using vendor AI systems. Due diligence helps ensure your vendor can support your compliance requirements and provides necessary documentation."
  },
  {
    question: "What should I ask AI vendors about EU AI Act compliance?",
    answer: "Key areas include: their risk classification, availability of instructions for use, logging/export capabilities, incident notification processes, and what transparency disclosures they support."
  },
  {
    question: "When should I conduct vendor due diligence?",
    answer: "Conduct due diligence before procurement, at contract renewal, and when there are significant changes to the AI system or regulations. Annual reviews are recommended."
  },
  {
    question: "What if my vendor can't answer these questions?",
    answer: "This is a red flag. Vendors should be able to provide basic compliance information. Consider this in your risk assessment and procurement decisions."
  }
];

const howToSteps = [
  { name: "Send questionnaire", text: "Send the due diligence questionnaire to your AI vendor's compliance or product team." },
  { name: "Review responses", text: "Evaluate responses against your compliance requirements." },
  { name: "Request documentation", text: "Ask for copies of key documents: instructions for use, technical docs, compliance statements." },
  { name: "Document findings", text: "Record your due diligence findings and any gaps identified." },
  { name: "Track renewals", text: "Set reminders to refresh due diligence at contract renewal." },
];

export default function VendorDueDiligence() {
  const howToSchema = createHowToSchema({
    name: "How to Conduct AI Vendor Due Diligence",
    description: "Step-by-step guide to conducting due diligence on AI vendors for EU AI Act compliance.",
    steps: howToSteps,
    totalTime: "PT1H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "Vendor Due Diligence", url: "https://klarvo.io/templates/vendor-due-diligence-questionnaire" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Vendor Due Diligence Questionnaire - Free Template"
        description="Free AI vendor due diligence questionnaire for EU AI Act compliance. Covers vendor profile, compliance documentation, logging, and incident support."
        keywords={["AI vendor due diligence", "AI vendor questionnaire", "AI procurement checklist", "vendor compliance questionnaire", "AI vendor assessment"]}
        canonical="https://klarvo.io/templates/vendor-due-diligence-questionnaire"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="outline">Procurement</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Vendor Due Diligence Questionnaire
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive questionnaire to assess AI vendor compliance with EU AI Act requirements. Send to vendors before procurement or at renewal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="Vendor Due Diligence Questionnaire"
                templateSlug="vendor-due-diligence"
                fileName="vendor-due-diligence-questionnaire.pdf"
                buttonText="Download Questionnaire"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <a href="https://app.klarvo.io/auth/signup">
                  Track in Klarvo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Questionnaire Sections</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {questionnaireCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.questions.map((question, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {question}
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

      <RelatedContent currentHref="/templates/vendor-due-diligence-questionnaire" title="Related Resources" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
        </div>
      </section>

      <CTASection
        title="Centralize Your Vendor Management"
        subtitle="Klarvo tracks all your AI vendors, their documentation, and renewal dates in one place."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
