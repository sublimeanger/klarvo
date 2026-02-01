import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  FileText,
  Scale
} from "lucide-react";

const friaSections = [
  { title: "Overview & Scope", description: "FRIA title, linked AI system, assessment owner, deployment timeline" },
  { title: "Process Description", description: "Deployer's process, intended purpose, decision points, human oversight" },
  { title: "Affected Persons", description: "Categories of affected persons, vulnerable groups, notification methods" },
  { title: "Risk Assessment", description: "Fundamental rights risks, likelihood, severity, evidence" },
  { title: "Human Oversight", description: "Oversight design, competence, intervention authority" },
  { title: "Mitigation Measures", description: "Risk mitigations, governance, complaint mechanism, monitoring" },
  { title: "Approval", description: "Conclusion, approvers, notification requirements" },
];

const faqQuestions = [
  {
    question: "When is a FRIA required under the EU AI Act?",
    answer: "A Fundamental Rights Impact Assessment is required under Article 27 for public bodies and certain private entities providing public services when deploying high-risk AI systems listed in Annex III."
  },
  {
    question: "What must a FRIA include?",
    answer: "A FRIA must include: (a) process description, (b) time period and frequency, (c) categories of affected persons, (d) risks of harm to fundamental rights, (e) human oversight measures, and (f) mitigation measures with governance arrangements."
  },
  {
    question: "When must a FRIA be completed?",
    answer: "The FRIA must be completed before first use of the high-risk AI system. It must also be updated when there are material changes to the AI system or context of use."
  },
  {
    question: "Do I need to notify authorities about my FRIA?",
    answer: "In certain cases, FRIA results must be notified to the market surveillance authority. Specific exemptions may apply. Check with your legal team for your specific situation."
  }
];

const howToSteps = [
  { name: "Determine if FRIA is required", text: "Check if you're a public body or provide public services and are deploying high-risk AI under Annex III." },
  { name: "Gather information", text: "Collect details about the AI system, its purpose, affected groups, and existing documentation." },
  { name: "Assess risks", text: "Identify potential harms to fundamental rights with likelihood and severity ratings." },
  { name: "Document mitigations", text: "Map your mitigation measures to each identified risk." },
  { name: "Get approval", text: "Have appropriate stakeholders review and approve the FRIA." },
  { name: "Notify if required", text: "Submit notification to market surveillance authority if applicable." },
];

export default function FRIATemplate() {
  const howToSchema = createHowToSchema({
    name: "How to Complete a FRIA for EU AI Act Compliance",
    description: "Step-by-step guide to completing a Fundamental Rights Impact Assessment using our template.",
    steps: howToSteps,
    totalTime: "PT2H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "FRIA Template", url: "https://klarvo.io/templates/fria-template" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Free FRIA Template - Article 27 EU AI Act"
        description="Download our free Fundamental Rights Impact Assessment (FRIA) template for EU AI Act Article 27 compliance. Includes all required sections and guidance."
        keywords={["FRIA template", "fundamental rights impact assessment", "Article 27 template", "EU AI Act FRIA", "FRIA document template"]}
        canonical="https://klarvo.io/templates/fria-template"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="destructive">High-Risk</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              FRIA Template
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Fundamental Rights Impact Assessment template aligned with EU AI Act Article 27 requirements.
            </p>
            <div className="flex items-center gap-2 p-4 bg-warning/10 rounded-lg mb-8">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
              <span className="text-sm">Required for certain deployers of high-risk AI systems before first use</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="FRIA Template"
                templateSlug="fria"
                fileName="fria-template.pdf"
                buttonText="Download FRIA Template"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/fria-software">
                  Use FRIA Software
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Template Sections</h2>
            <div className="space-y-4">
              {friaSections.map((section, index) => (
                <div key={index} className="flex gap-4 p-4 bg-background rounded-lg shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">FRIA Guide</CardTitle>
                  <CardDescription>Learn when FRIA is required and how to do it properly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/guides/fria-article-27">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">High-Risk Checker</CardTitle>
                  <CardDescription>Check if your AI system is high-risk under Annex III.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/tools/high-risk-checker-annex-iii">Run Checker <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Scale className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">FRIA Software</CardTitle>
                  <CardDescription>Automate your FRIA workflow with Klarvo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/fria-software">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
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
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need FRIA Workflow Automation?"
        subtitle="Klarvo's FRIA module guides you through every step with PDF report generation."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
