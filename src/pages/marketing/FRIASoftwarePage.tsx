import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileCheck, 
  Users,
  AlertTriangle,
  ArrowRight,
  Target,
  ClipboardList
} from "lucide-react";

const friaSteps = [
  {
    step: "1",
    title: "Overview & Scope",
    description: "Define the FRIA scope, link to existing DPIA, and capture deployment context.",
  },
  {
    step: "2",
    title: "Process Description",
    description: "Document the deployer's process, decision points, and human oversight arrangements.",
  },
  {
    step: "3",
    title: "Affected Persons",
    description: "Identify categories of affected persons, vulnerable groups, and notification methods.",
  },
  {
    step: "4",
    title: "Risk Identification",
    description: "Map potential harms by fundamental rights category with likelihood and severity ratings.",
  },
  {
    step: "5",
    title: "Human Oversight",
    description: "Document oversight design, competence requirements, and intervention authority.",
  },
  {
    step: "6",
    title: "Mitigation Measures",
    description: "Map mitigations to identified risks with governance and complaint mechanisms.",
  },
  {
    step: "7",
    title: "Approval & Notification",
    description: "Capture approver sign-off and authority notification requirements.",
  },
];

const faqQuestions = [
  {
    question: "What is a FRIA under the EU AI Act?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required under Article 27 for certain deployers of high-risk AI systems. It assesses the impact on fundamental rights before first use and must be updated when circumstances change."
  },
  {
    question: "Who needs to do a FRIA?",
    answer: "FRIA is required for public bodies and certain private entities providing public services when deploying high-risk AI systems. Specific triggers are defined in Article 27 of the EU AI Act."
  },
  {
    question: "When must a FRIA be completed?",
    answer: "FRIA must be completed before first use of the high-risk AI system. It must also be updated when there are material changes to the system or context of use."
  },
  {
    question: "What should a FRIA include?",
    answer: "A FRIA must include: process description, time period and frequency of use, affected persons, risks of harm to fundamental rights, human oversight measures, and mitigation measures with governance arrangements."
  },
  {
    question: "Do I need to notify authorities about my FRIA?",
    answer: "In certain cases, FRIA results must be notified to the market surveillance authority using a specified template. Exemptions may apply in some circumstances."
  }
];

export default function FRIASoftwarePage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo - FRIA Software",
    description: "Fundamental Rights Impact Assessment (FRIA) software for EU AI Act Article 27 compliance. Guided 7-step workflow with PDF report generation.",
    applicationCategory: "BusinessApplication",
    offers: { price: "0", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "FRIA Software", url: "https://klarvo.io/fria-software" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="FRIA Software - Article 27 EU AI Act"
        description="FRIA software for EU AI Act Article 27 compliance. Guided 7-step workflow to complete your Fundamental Rights Impact Assessment with PDF export."
        keywords={["FRIA software", "fundamental rights impact assessment", "Article 27 FRIA", "EU AI Act FRIA", "FRIA template", "FRIA automation"]}
        canonical="https://klarvo.io/fria-software"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="FRIA Software"
        title={
          <>
            <span className="text-foreground">Fundamental Rights</span>
            <br />
            <span className="text-gradient-hero">Impact Assessment</span>
          </>
        }
        subtitle="Complete your Article 27 FRIA with a guided 7-step workflow. Generate audit-ready reports that satisfy regulatory requirements."
        variant="centered"
      />

      {/* When You Need FRIA */}
      <section className="py-8 border-b bg-warning/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span className="font-medium">FRIA is required before deploying certain high-risk AI systems under Article 27</span>
          </div>
        </div>
      </section>

      {/* FRIA Workflow Steps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">7-Step FRIA Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our guided workflow ensures you capture everything Article 27 requires.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {friaSteps.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Guided Questions</CardTitle>
                <CardDescription>
                  Answer structured questions aligned with Article 27(a)-(f) requirements.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Risk Matrix</CardTitle>
                <CardDescription>
                  Map risks to fundamental rights categories with likelihood and severity ratings.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>PDF Report</CardTitle>
                <CardDescription>
                  Generate a professional FRIA report ready for regulators and auditors.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Template CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Template</Badge>
            <h2 className="text-3xl font-bold mb-4">Start with Our FRIA Template</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download our free FRIA template to understand the requirements. When ready, use Klarvo for workflow automation and report generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/templates/fria-template">
                  Get FRIA Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/guides/fria-article-27">
                  Read the FRIA Guide
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
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Complete Your FRIA Today"
        subtitle="Start free. Our guided workflow makes FRIA completion straightforward."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
