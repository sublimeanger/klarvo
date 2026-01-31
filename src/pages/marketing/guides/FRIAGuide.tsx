import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  Scale,
  Users,
  Shield,
  AlertTriangle,
  FileText,
  Download,
  CheckCircle,
  RefreshCw,
  Building,
  Eye
} from "lucide-react";

const friaElements = [
  {
    element: "(a) Process Description",
    description: "Describe your organization's processes where the AI system will be used, including human oversight arrangements",
    icon: FileText
  },
  {
    element: "(b) Duration & Frequency",
    description: "Specify how long and how often the AI system will be used",
    icon: Clock
  },
  {
    element: "(c) Affected Persons",
    description: "Identify categories of people likely to be affected, including vulnerable groups",
    icon: Users
  },
  {
    element: "(d) Potential Harms",
    description: "Assess risks to fundamental rights—non-discrimination, privacy, due process, access to services",
    icon: AlertTriangle
  },
  {
    element: "(e) Human Oversight",
    description: "Detail oversight design, competence requirements, and authority to intervene",
    icon: Eye
  },
  {
    element: "(f) Mitigation & Governance",
    description: "Describe mitigation measures, governance arrangements, and complaint mechanisms",
    icon: Shield
  },
];

const triggerConditions = [
  {
    trigger: "Public body deploying high-risk AI",
    applies: "Any public authority or body governed by public law",
    action: "FRIA required before first use"
  },
  {
    trigger: "Private entity providing public services",
    applies: "Organizations providing public services using high-risk AI",
    action: "FRIA required before first use"
  },
  {
    trigger: "Credit scoring systems",
    applies: "Systems evaluating creditworthiness of natural persons",
    action: "FRIA required before first use"
  },
  {
    trigger: "Life/health insurance risk assessment",
    applies: "AI systems for risk assessment in life and health insurance",
    action: "FRIA required before first use"
  },
];

const updateTriggers = [
  "Material change to the AI system",
  "Change in affected groups or scale",
  "New deployment context or use case",
  "Significant incident or risk identified",
  "Regulatory guidance updates",
];

const faqQuestions = [
  {
    question: "What is a FRIA under the EU AI Act?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required by Article 27 for certain deployers of high-risk AI systems. It assesses the impact on fundamental rights before the system is put into use and includes process description, affected persons, risks, oversight, and mitigation measures."
  },
  {
    question: "Who needs to conduct a FRIA?",
    answer: "Public bodies deploying high-risk AI, private entities providing public services with high-risk AI, and deployers of credit scoring or life/health insurance risk assessment systems must conduct FRIAs."
  },
  {
    question: "When must a FRIA be completed?",
    answer: "The FRIA must be completed prior to putting the high-risk AI system into use. It's not a one-time exercise—you must update it when relevant circumstances change."
  },
  {
    question: "Do we need to notify anyone of the FRIA results?",
    answer: "Yes, in most cases you must notify the market surveillance authority of the FRIA results using a prescribed template, unless an exemption applies."
  },
  {
    question: "How does FRIA relate to DPIA?",
    answer: "FRIA and DPIA (Data Protection Impact Assessment) are complementary. Article 27 explicitly allows leveraging relevant information from an existing DPIA to avoid duplication."
  }
];

export default function FRIAGuide() {
  const articleSchema = createArticleSchema({
    headline: "FRIA Article 27: Fundamental Rights Impact Assessment Guide",
    description: "Understand when a FRIA is required under EU AI Act Article 27, what it must include, and how to maintain it. Complete guide for high-risk AI deployers.",
    datePublished: "2025-01-24",
    dateModified: "2025-01-31"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "FRIA Guide", url: "https://klarvo.io/guides/fria-article-27" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="FRIA Article 27: EU AI Act Impact Assessment Guide"
        description="Complete guide to Fundamental Rights Impact Assessments under EU AI Act Article 27. Learn who needs FRIA, what to include, and when to update."
        keywords={["FRIA EU AI Act", "Article 27 AI Act", "fundamental rights impact assessment", "high-risk AI assessment", "AI impact assessment"]}
        canonical="https://klarvo.io/guides/fria-article-27"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <Badge variant="outline">High-Risk AI</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                12 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              FRIA: Fundamental Rights Impact Assessment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Article 27 requires certain deployers to assess AI impact on fundamental rights before use. Here's who needs one, what to include, and how to keep it current.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/templates/fria-template">
                  <Download className="mr-2 h-5 w-5" />
                  Download FRIA Template
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/fria-software">
                  FRIA Software
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs FRIA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Needs a FRIA?</h2>
            <div className="space-y-4">
              {triggerConditions.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Building className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{item.trigger}</div>
                        <div className="text-sm text-muted-foreground mb-2">{item.applies}</div>
                        <Badge variant="secondary">{item.action}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Not sure if you need a FRIA?</strong> Use our High-Risk Checker tool to assess your systems, then check if FRIA trigger conditions apply.
              </p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/tools/high-risk-checker-annex-iii">
                  Run High-Risk Checker <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FRIA Elements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">The Six Required Elements</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Article 27 specifies six elements (a)–(f) that every FRIA must include:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {friaElements.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{item.element}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timing Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Timing & Updates</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Before First Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The FRIA must be performed <strong>prior to putting the AI system into use</strong>. You cannot deploy first and assess later.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <RefreshCw className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Ongoing Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The FRIA must be <strong>updated when appropriate</strong>—it's a living document, not a one-time checkbox.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Update Triggers</h3>
              <div className="space-y-2">
                {updateTriggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>{trigger}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DPIA Linkage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">FRIA & DPIA: Working Together</h2>
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Scale className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Leverage Existing Work</h3>
                    <p className="text-muted-foreground mb-4">
                      Article 27 explicitly states that where a Data Protection Impact Assessment (DPIA) has already been carried out, the FRIA should complement it—you can use relevant information from the DPIA to avoid duplication.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This means your GDPR compliance work feeds directly into EU AI Act compliance. Klarvo links DPIA references directly to your FRIA workflow.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notification Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notification Requirements</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <FileText className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Market Surveillance Authority</h3>
                    <p className="text-muted-foreground mb-4">
                      In most cases, you must notify the relevant market surveillance authority of the FRIA results using a prescribed template. Some exemptions apply—check the specific requirements for your jurisdiction.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/templates/fria-template">
                        <Download className="mr-2 h-4 w-4" />
                        Get FRIA Template
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">FRIA Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Downloadable template aligned with Article 27 requirements.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/fria-template">
                      Download <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">High-Risk Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Understand Annex III categories and deployer obligations.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/high-risk-ai-annex-iii">
                      Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Scale className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">FRIA Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Guided FRIA workflow with PDF export.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/fria-software">
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
        title="Conduct Your FRIA with Confidence"
        subtitle="Klarvo's FRIA workflow guides you through all six elements and generates audit-ready PDF reports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Download Template", href: "/templates/fria-template" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
