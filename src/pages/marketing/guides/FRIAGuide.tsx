import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { HubNavigation } from "@/components/marketing/HubNavigation";
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
  Eye,
  BookOpen,
  Target
} from "lucide-react";

const friaElements = [
  {
    element: "(a) Process Description",
    description: "Describe your organization's processes where the AI system will be used, including human oversight arrangements",
    icon: FileText,
    deepDive: "This element requires you to document exactly how AI fits into your business process—what happens before the AI is involved, what the AI does, and what happens after. Include the human oversight design: who reviews AI outputs, at what stage, and with what authority. This isn't just a system description—it's a process description that shows the AI in its operational context.",
    whatToInclude: ["Workflow diagram showing AI's role", "Decision points the AI influences", "Human review steps before/after AI output", "Escalation paths when AI output is uncertain"]
  },
  {
    element: "(b) Duration & Frequency",
    description: "Specify how long and how often the AI system will be used",
    icon: Clock,
    deepDive: "Capture the expected deployment duration (indefinite, pilot period, seasonal), frequency of use (continuous, daily, weekly, ad-hoc), and scale of impact (how many people are affected per period). This helps assessors understand the scope of potential impact—a system used once a month on 10 people is very different from one running continuously on thousands.",
    whatToInclude: ["Expected deployment timeline", "Usage frequency and patterns", "Number of people affected per period", "Any planned scaling"]
  },
  {
    element: "(c) Affected Persons",
    description: "Identify categories of people likely to be affected, including vulnerable groups",
    icon: Users,
    deepDive: "List all categories of people whose rights could be affected: customers, employees, job candidates, students, patients, benefit recipients, etc. Pay special attention to vulnerable groups—children, elderly, disabled persons, economically disadvantaged, digitally illiterate. For each group, describe how they'll be informed about the AI system's use and any accessibility considerations.",
    whatToInclude: ["All affected person categories", "Vulnerable group identification", "Information/notification plan", "Accessibility measures"]
  },
  {
    element: "(d) Potential Harms",
    description: "Assess risks to fundamental rights—non-discrimination, privacy, due process, access to services",
    icon: AlertTriangle,
    deepDive: "This is the core of the FRIA. Map potential harms across fundamental rights categories: non-discrimination/fairness, privacy and data protection, freedom of expression, worker rights, due process and contestability, access to essential services, and safety/wellbeing. For each identified risk, assess likelihood (Low/Medium/High) and severity (Low/Medium/High). Provide evidence supporting your assessment.",
    whatToInclude: ["Risk identification per rights category", "Likelihood and severity ratings", "Supporting evidence for assessments", "Historical data or precedent where available"]
  },
  {
    element: "(e) Human Oversight",
    description: "Detail oversight design, competence requirements, and authority to intervene",
    icon: Eye,
    deepDive: "Document specifically how human oversight mitigates the identified risks. This should be concrete: name the oversight model (HITL/HOTL/HOOTL), describe what competence/training oversight personnel have, and confirm they have authority to intervene or stop the system. This element connects to Article 26(2) deployer obligations—your FRIA oversight design should align with your operational oversight plan.",
    whatToInclude: ["Oversight model and design", "Competence/training requirements", "Authority to intervene/stop", "Oversight evidence (training records, role assignments)"]
  },
  {
    element: "(f) Mitigation & Governance",
    description: "Describe mitigation measures, governance arrangements, and complaint mechanisms",
    icon: Shield,
    deepDive: "Map specific mitigations to each key risk identified in element (d). Document governance arrangements (who is responsible for ongoing oversight, review cadence, escalation paths). Describe complaint mechanisms—how can affected persons challenge AI-influenced decisions? Include a monitoring plan and specify what would trigger a reassessment of the FRIA.",
    whatToInclude: ["Risk-to-mitigation mapping", "Governance structure and responsibilities", "Complaint/appeal mechanism", "Monitoring plan and reassessment triggers"]
  },
];

const triggerConditions = [
  {
    trigger: "Public body deploying high-risk AI",
    applies: "Any public authority or body governed by public law",
    action: "FRIA required before first use",
    examples: "Government agencies, municipalities, public healthcare, public education, law enforcement"
  },
  {
    trigger: "Private entity providing public services",
    applies: "Organizations providing public services using high-risk AI",
    action: "FRIA required before first use",
    examples: "Private healthcare providers, outsourced social services, private entities operating critical infrastructure"
  },
  {
    trigger: "Credit scoring / creditworthiness assessment",
    applies: "Any entity using AI for credit decisions (Annex III, point 5(b))",
    action: "FRIA required before first use",
    examples: "Banks, fintech companies, lending platforms, buy-now-pay-later services"
  },
  {
    trigger: "Health/life insurance risk assessment",
    applies: "AI systems for risk assessment in life and health insurance (Annex III, point 5(a))",
    action: "FRIA required before first use",
    examples: "Insurance companies, insurtech platforms, health insurance providers"
  },
];

const updateTriggers = [
  "Material change to the AI system (model update, new version, changed parameters)",
  "Change in affected groups or scale (new user segments, geographic expansion)",
  "New deployment context or use case (different department, different decisions)",
  "Significant incident or risk identified (bias detected, harm reported)",
  "Regulatory guidance updates (new interpretive guidance from authorities)",
];

const faqQuestions = [
  {
    question: "What is a FRIA under the EU AI Act?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required by Article 27 for certain deployers of high-risk AI systems. It assesses the impact on fundamental rights before the system is put into use and includes six elements: process description, duration/frequency, affected persons, potential harms, human oversight measures, and mitigation/governance arrangements."
  },
  {
    question: "Who needs to conduct a FRIA?",
    answer: "Public bodies deploying high-risk AI, private entities providing public services with high-risk AI, deployers of credit scoring systems (Annex III, point 5(b)), and deployers of health/life insurance risk assessment AI (Annex III, point 5(a)) must conduct FRIAs."
  },
  {
    question: "When must a FRIA be completed?",
    answer: "The FRIA must be completed prior to putting the high-risk AI system into use. You cannot deploy first and assess later. It's also a living document that must be updated when relevant circumstances change."
  },
  {
    question: "Do we need to notify anyone of the FRIA results?",
    answer: "In most cases, you must notify the relevant market surveillance authority of the FRIA results using a prescribed template. Some exemptions may apply—for example, where disclosure would compromise security or law enforcement operations."
  },
  {
    question: "How does FRIA relate to DPIA?",
    answer: "FRIA and DPIA (Data Protection Impact Assessment) are complementary. Article 27 explicitly allows leveraging relevant information from an existing DPIA to avoid duplication. FRIA covers broader fundamental rights beyond data protection—non-discrimination, due process, worker rights, access to services."
  },
  {
    question: "Can I do FRIA and DPIA together?",
    answer: "Yes, and the regulation encourages it. Where both a DPIA (under GDPR) and FRIA (under EU AI Act) are required, you can conduct them as a combined assessment. The FRIA adds fundamental rights dimensions that DPIA doesn't typically cover—fairness, contestability, worker rights, access to services."
  },
  {
    question: "How long does a FRIA take?",
    answer: "Using Klarvo's guided workflow, a FRIA can be completed in 2-4 hours for a straightforward system. Complex deployments with multiple affected groups, high severity risks, or extensive mitigation requirements may take longer. The key is thoroughness—rushing a FRIA defeats its purpose."
  }
];

export default function FRIAGuide() {
  const articleSchema = createArticleSchema({
    headline: "FRIA Article 27: Fundamental Rights Impact Assessment Guide",
    description: "Understand when a FRIA is required under EU AI Act Article 27, what it must include, and how to maintain it. Complete guide for high-risk AI deployers.",
    datePublished: "2025-01-24",
    dateModified: "2026-02-28"
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
                18 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              FRIA: Fundamental Rights Impact Assessment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Article 27 requires certain deployers to assess AI impact on fundamental rights before use. Here's who needs one, what to include, how to keep it current, and how FRIA relates to DPIA—with practical examples.
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

      {/* Who Needs FRIA — expanded */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Who Needs a FRIA?</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              FRIA doesn't apply to all high-risk AI deployers. It's triggered by specific deployer characteristics combined with specific AI use cases.
            </p>
            <div className="space-y-4">
              {triggerConditions.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Building className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{item.trigger}</div>
                        <div className="text-sm text-muted-foreground mb-2">{item.applies}</div>
                        <div className="text-xs text-muted-foreground mb-2">Examples: {item.examples}</div>
                        <Badge variant="secondary">{item.action}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Not sure if FRIA applies to you?</strong> Klarvo's intake wizard automatically evaluates FRIA trigger conditions based on your answers about deployment context (Step 13: public authority check) and risk classification (Step 6: Annex III screening). If FRIA is required, the workflow is created with a single click.
              </p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/tools/high-risk-checker-annex-iii">
                  Start with High-Risk Checker <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FRIA Elements — expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">The Six Required Elements — In Depth</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Article 27 specifies six elements (a)–(f) that every FRIA must include. Here's what each requires with practical guidance.
            </p>
            <div className="space-y-6">
              {friaElements.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-8 w-8 text-primary" />
                      <CardTitle className="text-lg">{item.element}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.deepDive}</p>
                    <div>
                      <p className="text-sm font-medium mb-2">What to include:</p>
                      <ul className="space-y-1">
                        {item.whatToInclude.map((inc, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-primary shrink-0 mt-1" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRIA vs DPIA — expanded */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">FRIA & DPIA: Working Together</h2>
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>DPIA (GDPR Article 35)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Focus:</strong> Personal data processing risks</p>
                  <p><strong>Rights examined:</strong> Data protection, privacy, consent</p>
                  <p><strong>Trigger:</strong> High-risk personal data processing</p>
                  <p><strong>Framework:</strong> GDPR Article 35(7)</p>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <Scale className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>FRIA (EU AI Act Article 27)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Focus:</strong> Broader fundamental rights impacts</p>
                  <p><strong>Rights examined:</strong> Non-discrimination, due process, worker rights, freedom of expression, safety, access to services</p>
                  <p><strong>Trigger:</strong> Specific deployer types + high-risk AI</p>
                  <p><strong>Framework:</strong> Article 27(a)-(f)</p>
                </CardContent>
              </Card>
            </div>
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Article 27 explicitly states that where a DPIA has already been carried out, the FRIA should complement it—you can use relevant information from the DPIA to avoid duplication. Klarvo lets you link completed DPIAs directly to your FRIA and import relevant findings. Where both apply, consider conducting them as a combined assessment to save effort while ensuring complete coverage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timing & Updates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Timing & Updates</h2>
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Before First Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The FRIA must be performed <strong>prior to putting the AI system into use</strong>. You cannot deploy first and assess later—this is a pre-deployment requirement.
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
                    The FRIA must be <strong>updated when appropriate</strong>—it's a living document. Klarvo's change management triggers reassessment prompts when material changes are detected.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="font-semibold mb-4">What triggers a FRIA update?</h3>
              <div className="space-y-2">
                {updateTriggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                    <span className="text-sm">{trigger}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What To Do Next */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What To Do Next</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Download Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Free FRIA template aligned with Article 27(a)-(f) requirements.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/fria-template">Get Template <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Use FRIA Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Guided 7-step workflow with PDF report generation and risk matrix management.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/fria-software">FRIA Software <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Read Deployer Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Understand all 8 Article 26 deployer obligations that complement FRIA.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/article-26-deployer-obligations">Article 26 Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
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

      <RelatedContent currentHref="/guides/fria-article-27" title="Related Resources" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
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
