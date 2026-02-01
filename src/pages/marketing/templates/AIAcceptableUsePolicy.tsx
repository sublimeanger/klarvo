import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ArrowRight,
  FileText,
  Shield,
  Users
} from "lucide-react";

const policySections = [
  {
    title: "Purpose & Scope",
    items: ["Policy objectives", "Who it applies to", "What AI systems are covered", "Definitions"]
  },
  {
    title: "Permitted Uses",
    items: ["Approved AI tools list", "Approved use cases", "Approval process for new tools", "Personal vs business use"]
  },
  {
    title: "Prohibited Uses",
    items: ["Prohibited practices (Article 5)", "Data restrictions", "Output restrictions", "Misuse examples"]
  },
  {
    title: "Responsibilities",
    items: ["User responsibilities", "Manager responsibilities", "AI owner responsibilities", "Compliance team role"]
  },
  {
    title: "Data & Privacy",
    items: ["Data input guidelines", "Personal data handling", "Confidential information", "Third-party data"]
  },
  {
    title: "Governance",
    items: ["Oversight requirements", "Incident reporting", "Policy violations", "Review schedule"]
  },
];

const faqQuestions = [
  {
    question: "Why do we need an AI acceptable use policy?",
    answer: "An AI acceptable use policy helps ensure AI tools are used responsibly, in compliance with the EU AI Act, and aligned with company values. It protects both the organization and individuals from misuse."
  },
  {
    question: "Who should this policy apply to?",
    answer: "The policy should apply to all employees, contractors, and third parties who use AI tools on behalf of the organization, whether for internal operations or customer-facing purposes."
  },
  {
    question: "How often should the policy be reviewed?",
    answer: "Review the policy at least annually, or whenever there are significant changes to AI tools, regulations, or organizational use of AI. The EU AI Act timeline may trigger updates."
  },
  {
    question: "How do we enforce this policy?",
    answer: "Enforcement typically includes training, acknowledgement requirements, monitoring, and clear consequences for violations. Link it to your existing HR policies and disciplinary procedures."
  }
];

const howToSteps = [
  { name: "Download the template", text: "Get the editable policy template in your preferred format." },
  { name: "Customize for your org", text: "Add your company name, approved tools, and specific use cases." },
  { name: "Legal review", text: "Have legal/compliance review for jurisdiction-specific requirements." },
  { name: "Communicate", text: "Roll out to staff with training and acknowledgement tracking." },
  { name: "Track compliance", text: "Use Klarvo to track acknowledgements and policy versions." },
];

export default function AIAcceptableUsePolicy() {
  const howToSchema = createHowToSchema({
    name: "How to Create an AI Acceptable Use Policy",
    description: "Step-by-step guide to creating and implementing an AI acceptable use policy for your organization.",
    steps: howToSteps,
    totalTime: "PT2H"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "AI Acceptable Use Policy", url: "https://klarvo.io/templates/ai-acceptable-use-policy" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Acceptable Use Policy Template - Free Download"
        description="Free AI acceptable use policy template for organizations. Covers permitted uses, prohibited practices, data handling, and EU AI Act alignment."
        keywords={["AI acceptable use policy", "AI policy template", "AI governance policy", "AI use policy", "generative AI policy"]}
        canonical="https://klarvo.io/templates/ai-acceptable-use-policy"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Template</Badge>
              <Badge variant="outline">Essential</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Acceptable Use Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Editable policy template covering approved AI tools, prohibited uses, data handling, and governance. Aligned with EU AI Act requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="AI Acceptable Use Policy"
                templateSlug="ai-acceptable-use-policy"
                fileName="ai-acceptable-use-policy.pdf"
                buttonText="Download Policy Template"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/signup">
                  Track in Klarvo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {policySections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {item}
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

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Literacy Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Learn about AI literacy requirements under Article 4.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/guides/ai-literacy-article-4">Read Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Prohibited Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Screen your AI uses against Article 5.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/tools/prohibited-practices-screening">Run Screening <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Training Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Track policy acknowledgements and training.</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/templates/ai-literacy-training-tracker">Get Tracker <ArrowRight className="ml-1 h-4 w-4" /></Link>
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
        title="Manage Policies with Klarvo"
        subtitle="Version, approve, and track acknowledgements for all your AI policies in one place."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
