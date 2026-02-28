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
  ClipboardList,
  Scale,
  CheckCircle,
  BookOpen
} from "lucide-react";

const friaSteps = [
  {
    step: "1",
    title: "Overview & Scope",
    description: "Define the FRIA scope, link to existing DPIA, and capture deployment context. If a DPIA has been completed, you can leverage its findings to avoid duplication.",
  },
  {
    step: "2",
    title: "Process Description — Article 27(a)",
    description: "Document the deployer's process where AI is used, the intended purpose, decision points affected, and human oversight arrangements within that process.",
  },
  {
    step: "3",
    title: "Time Period & Frequency — Article 27(b)",
    description: "Capture expected deployment duration, frequency of use, and scale of impact (people affected per period).",
  },
  {
    step: "4",
    title: "Affected Persons — Article 27(c)",
    description: "Identify categories of persons likely affected, vulnerable groups present, how affected persons will be informed, and accessibility considerations.",
  },
  {
    step: "5",
    title: "Risk Identification — Article 27(d)",
    description: "Map potential harms by fundamental rights category—non-discrimination, privacy, freedom of expression, worker rights, due process, access to essential services, safety—with likelihood and severity ratings.",
  },
  {
    step: "6",
    title: "Human Oversight — Article 27(e)",
    description: "Document oversight design, competence/training of oversight personnel, and authority to intervene or stop the system.",
  },
  {
    step: "7",
    title: "Mitigation & Governance — Article 27(f)",
    description: "Map mitigations to each identified risk, document governance arrangements, complaint mechanisms, monitoring plans, and reassessment triggers.",
  },
];

const friaOutputs = [
  "Professional FRIA report (PDF) aligned with the Article 27 template structure",
  "One-page FRIA result summary for leadership or board reporting",
  "Auto-generated mitigation tasks with owners and due dates",
  "Risk-to-mitigation mapping matrix",
  "Evidence attachment points for each assessment section",
  "Notification readiness check for market surveillance authority",
];

const faqQuestions = [
  {
    question: "What is a FRIA under the EU AI Act?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required under Article 27 for certain deployers of high-risk AI systems. It assesses the impact on fundamental rights before first use and must be updated when circumstances change. It complements (but does not replace) a DPIA under GDPR."
  },
  {
    question: "Who needs to do a FRIA?",
    answer: "FRIA is required for public bodies and certain private entities providing public services when deploying high-risk AI systems listed in Annex III. It also applies to deployers of high-risk AI systems used for specific purposes like creditworthiness assessment or health/life insurance pricing."
  },
  {
    question: "When must a FRIA be completed?",
    answer: "FRIA must be completed before first use of the high-risk AI system. It must also be updated when there are material changes to the system, its context of use, or the groups of people affected."
  },
  {
    question: "What should a FRIA include?",
    answer: "Article 27 specifies six elements: (a) process description, (b) time period and frequency of use, (c) categories of affected persons, (d) risks of harm to fundamental rights, (e) human oversight measures, and (f) mitigation measures with governance and complaint mechanisms."
  },
  {
    question: "Do I need to notify authorities about my FRIA?",
    answer: "In certain cases, FRIA results must be notified to the market surveillance authority using a specified template. Exemptions may apply—for example, where disclosure would compromise security or law enforcement operations."
  },
  {
    question: "How is FRIA different from DPIA?",
    answer: "A DPIA (Data Protection Impact Assessment) under GDPR focuses on personal data processing risks and data subject rights. A FRIA under the EU AI Act assesses broader fundamental rights impacts—non-discrimination, due process, worker rights, access to services—beyond just data protection. Where both apply, Article 27 allows leveraging DPIA findings, and Klarvo lets you link completed DPIAs directly to your FRIA."
  },
  {
    question: "Can Klarvo generate the FRIA report automatically?",
    answer: "Yes. Once you complete the 7-step FRIA workflow, Klarvo generates a professional PDF report structured around Article 27(a)-(f), plus a one-page summary. It also creates mitigation tasks with owners and due dates."
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

      {/* When Is FRIA Required — decision tree prose */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">When Is a FRIA Required?</h2>
              <p className="text-lg text-muted-foreground">
                Not every AI system requires a FRIA. The obligation applies to specific deployer categories using high-risk AI systems. Here's how to determine if FRIA applies to you:
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Public Bodies
                </h3>
                <p className="text-muted-foreground mb-2">
                  If you are a public authority or body governed by public law deploying a high-risk AI system listed in Annex III, you must complete a FRIA before first use. This includes government agencies, municipalities, public healthcare providers, public education institutions, and law enforcement bodies using AI for decision-support.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Private Entities Providing Public Services
                </h3>
                <p className="text-muted-foreground mb-2">
                  Private organisations that provide public services—such as private healthcare providers, outsourced social services, or private entities operating critical infrastructure on behalf of the state—are also subject to FRIA requirements when deploying relevant high-risk AI systems.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Specific Annex III Use Cases
                </h3>
                <p className="text-muted-foreground mb-2">
                  FRIA also applies to deployers of high-risk AI systems used for creditworthiness assessment or credit scoring (Annex III point 5(b)), and health or life insurance risk assessment and pricing (Annex III point 5(a)). These apply regardless of whether the deployer is a public or private entity.
                </p>
              </div>
              <div className="p-6 border border-primary/30 rounded-lg bg-primary/5">
                <h3 className="font-semibold text-lg mb-3">Klarvo automates this check</h3>
                <p className="text-muted-foreground">
                  When you complete the AI system intake wizard, Klarvo automatically evaluates FRIA trigger conditions based on your answers about deployment context, affected persons, and Annex III categories. If FRIA is required, the workflow is created with a single click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRIA Workflow Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">7-Step FRIA Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each step maps directly to Article 27(a)-(f) requirements. Our guided questions ensure nothing is missed.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {friaSteps.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-background rounded-lg">
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

      {/* FRIA vs DPIA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">FRIA vs DPIA: What's the Difference?</h2>
              <p className="text-lg text-muted-foreground">
                Both are impact assessments, but they serve different regulatory purposes and examine different types of risk. Understanding the distinction is critical for avoiding duplication while ensuring full coverage.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    DPIA (GDPR Article 35)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Focus:</strong> Personal data processing risks</p>
                  <p><strong>Rights examined:</strong> Data protection, privacy, consent</p>
                  <p><strong>Trigger:</strong> High-risk personal data processing</p>
                  <p><strong>Regulator:</strong> Data Protection Authority</p>
                  <p><strong>Framework:</strong> GDPR Article 35(7)</p>
                  <p><strong>Output:</strong> Risk assessment + mitigation for data processing</p>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    FRIA (EU AI Act Article 27)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Focus:</strong> Broader fundamental rights impacts</p>
                  <p><strong>Rights examined:</strong> Non-discrimination, due process, worker rights, freedom of expression, safety, access to services</p>
                  <p><strong>Trigger:</strong> High-risk AI deployment by specific entities</p>
                  <p><strong>Regulator:</strong> Market surveillance authority</p>
                  <p><strong>Framework:</strong> Article 27(a)-(f)</p>
                  <p><strong>Output:</strong> Impact assessment + human oversight + mitigations</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Where both apply, Article 27 explicitly allows leveraging DPIA findings. Klarvo lets you link completed DPIAs to your FRIA and import relevant findings to avoid repeating work.
            </p>
          </div>
        </div>
      </section>

      {/* What FRIA Produces */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Klarvo's FRIA Produces</h2>
              <p className="text-lg text-muted-foreground">
                Complete your FRIA workflow and receive audit-ready outputs immediately:
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {friaOutputs.map((output, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{output}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Guided Questions</CardTitle>
                <CardDescription>
                  Answer structured questions aligned with Article 27(a)-(f) requirements. Each question explains why it's asked and what evidence is expected.
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
                  Map risks to fundamental rights categories with likelihood and severity ratings. Attach supporting evidence to each risk assessment.
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
                  Generate a professional FRIA report ready for regulators and auditors, structured around the Article 27 template with approver sign-off.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Template CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Template</Badge>
            <h2 className="text-3xl font-bold mb-4">Start with Our FRIA Template</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download our free FRIA template to understand the requirements. When ready, use Klarvo for workflow automation, risk matrix management, and professional report generation.
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

      {/* Cross-linking */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Related Tools & Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/eu-ai-act-compliance-software" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Full Compliance Platform</h3>
                    <p className="text-sm text-muted-foreground">See how FRIA fits into the complete compliance workflow.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/evidence-vault-software" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Evidence Vault</h3>
                    <p className="text-sm text-muted-foreground">Store FRIA evidence alongside all compliance artifacts.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/ai-literacy-training-tracker" className="group">
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Training Tracker</h3>
                    <p className="text-sm text-muted-foreground">Track AI literacy training required alongside FRIA obligations.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Guides: <Link to="/guides/fria-article-27" className="text-primary hover:underline">FRIA Guide</Link> · <Link to="/guides/high-risk-ai-classification" className="text-primary hover:underline">High-Risk Classification</Link> · <Link to="/templates/fria-template" className="text-primary hover:underline">Free FRIA Template</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Complete Your FRIA Today"
        subtitle="Start free. Our guided workflow makes FRIA completion straightforward."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
