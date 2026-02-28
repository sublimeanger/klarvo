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
  CheckCircle,
  Download,
  Users,
  Eye,
  Database,
  AlertTriangle,
  FileText,
  Bell,
  Shield,
  Scale
} from "lucide-react";

const obligations = [
  {
    icon: FileText,
    title: "Use According to Instructions",
    article: "Article 26(1)",
    description: "Deployers must use high-risk AI systems in accordance with the instructions of use accompanying the system.",
    deepDive: "This isn't just 'read the manual.' You need to obtain the provider's instructions for use, create internal standard operating procedures (SOPs) based on them, train your operators on correct usage, and document adherence. If your vendor doesn't provide instructions for use—that's a red flag. Under the EU AI Act, providers of high-risk AI must supply these. Ask your vendor explicitly.",
    whatToDo: [
      "Obtain the provider's instructions for use",
      "Create internal SOPs based on these instructions",
      "Train operators on correct usage",
      "Document adherence to instructions"
    ],
    practicalExample: "If you use an AI hiring tool, the vendor should provide instructions on how to use it correctly—what decisions it should inform, what it shouldn't automate, and how to interpret results. Your internal SOP should reflect these instructions and add your own context."
  },
  {
    icon: Users,
    title: "Human Oversight",
    article: "Article 26(2)",
    description: "Assign human oversight to persons who have the necessary competence, training, and authority.",
    deepDive: "This is arguably the most important deployer obligation. You must designate specific, named individuals who (a) understand the AI system well enough to spot problems, (b) have been trained on its operation and limitations, and (c) have the actual authority to intervene or stop the system. 'Authority' means they can override AI decisions and pause the system without needing approval from management—bureaucratic delays could cause harm.",
    whatToDo: [
      "Designate oversight owner for each system",
      "Document competence requirements",
      "Provide necessary training",
      "Grant authority to intervene and stop the system"
    ],
    practicalExample: "For an AI credit scoring tool, the oversight person should understand how the model makes decisions, be trained to recognise potential bias, and have the authority to override any individual credit decision or pause the system if they suspect systematic issues."
  },
  {
    icon: Database,
    title: "Input Data Management",
    article: "Article 26(4)",
    description: "Where deployers control input data, ensure it is relevant and sufficiently representative.",
    deepDive: "If you provide or control the data that goes into the AI system, you're responsible for its quality. This means checking that input data is relevant to the system's purpose, representative of the population it serves (not biased), and accurate. If you use a vendor's AI with your own customer data, you control that input data.",
    whatToDo: [
      "Document what input data you control",
      "Establish data quality checks",
      "Monitor for bias and representativeness",
      "Keep records of data quality measures"
    ],
    practicalExample: "If you feed your company's employee data into an AI performance evaluation tool, you must ensure the data is accurate, complete, and doesn't systematically disadvantage certain groups. Regularly audit the input data for quality and representativeness."
  },
  {
    icon: Eye,
    title: "Monitoring",
    article: "Article 26(5)",
    description: "Monitor the operation of the high-risk AI system based on the instructions of use.",
    deepDive: "Monitoring means actively watching how the AI system performs in practice—not just deploying it and forgetting about it. You need a monitoring plan that specifies what KPIs to track (accuracy, fairness, complaints, edge cases), what thresholds trigger escalation, and how often reviews happen. The monitoring plan should align with the provider's instructions for use.",
    whatToDo: [
      "Create monitoring plan per provider instructions",
      "Establish KPIs and thresholds",
      "Schedule regular monitoring reviews",
      "Document monitoring activities"
    ],
    practicalExample: "For an AI customer support chatbot classified as high-risk, monitor: resolution accuracy, escalation rate, customer complaints mentioning AI, demographic fairness in outcomes, and any edge cases where the AI gave harmful or incorrect responses."
  },
  {
    icon: AlertTriangle,
    title: "Risk Reporting & Suspension",
    article: "Article 26(5)",
    description: "Inform the provider/distributor and suspend use if you identify risks to health, safety, or fundamental rights.",
    deepDive: "If your monitoring reveals risks—systematic bias, harmful decisions, safety concerns—you must take action immediately. First, inform the provider (or distributor) of the risk. If the risk is serious, suspend use of the system until the issue is resolved. You can't keep using a system you know is causing harm just because suspension would be inconvenient.",
    whatToDo: [
      "Create escalation procedures",
      "Define suspension criteria",
      "Establish provider communication channels",
      "Document incidents and responses"
    ],
    practicalExample: "If your AI hiring tool consistently ranks candidates from certain demographics lower, that's a risk signal. Your escalation procedure should specify: (1) flag to compliance, (2) notify the vendor, (3) suspend automated screening pending investigation, (4) switch to manual review."
  },
  {
    icon: Bell,
    title: "Serious Incident Reporting",
    article: "Article 26(5)",
    description: "Report serious incidents to the provider and relevant market surveillance authorities.",
    deepDive: "A 'serious incident' is one where the AI system caused or contributed to death, serious health harm, serious damage to property or environment, or serious fundamental rights violations. When this happens, you must report to both the provider and the relevant national market surveillance authority. Time is critical—create procedures in advance so you're not scrambling during a crisis.",
    whatToDo: [
      "Define what constitutes a serious incident",
      "Create incident reporting procedures",
      "Identify relevant authorities",
      "Keep incident records"
    ],
    practicalExample: "If an AI-driven emergency triage system misclassifies a critical patient, causing delayed treatment and serious harm—that's a serious incident requiring reporting to both the provider and the health authority."
  },
  {
    icon: Database,
    title: "Log Retention",
    article: "Article 26(6)",
    description: "Keep logs automatically generated by the AI system under your control for at least 6 months.",
    deepDive: "This obligation applies to logs that are 'under your control'—meaning logs stored on your systems, accessible through your dashboard, or exportable from your vendor's platform. The minimum retention is 6 months, but other laws (e.g., data protection) may require different periods. Ensure you can actually access and export these logs—ask your vendor about log export capabilities during procurement.",
    whatToDo: [
      "Identify what logs are generated",
      "Ensure 6-month minimum retention",
      "Establish access controls",
      "Enable log export capability"
    ],
    practicalExample: "If your AI hiring platform generates logs of every screening decision (candidate ID, score, factors, timestamp), you must retain these for at least 6 months. Verify with your vendor that you can export these logs on demand."
  },
  {
    icon: Users,
    title: "Workplace Notification",
    article: "Article 26(7)",
    description: "If you're an employer using high-risk AI in the workplace, inform workers and their representatives.",
    deepDive: "This obligation is specific to employers deploying high-risk AI that affects workers—performance monitoring, task allocation, scheduling, hiring. You must inform workers (and their representatives, such as works councils or unions) before deployment. The notification should explain what the system does, how it affects them, and what human oversight is in place. This is a pre-deployment obligation—notify before you switch on.",
    whatToDo: [
      "Identify workplace AI uses",
      "Draft worker notification",
      "Communicate before deployment",
      "Document notification"
    ],
    practicalExample: "Before deploying an AI tool that monitors employee productivity or allocates tasks, send a clear notification to all affected employees and their representatives. Use our worker notification template to ensure you cover all required points."
  },
];

const faqQuestions = [
  {
    question: "Who is a 'deployer' under the EU AI Act?",
    answer: "A deployer is any natural or legal person, public authority, agency, or other body using an AI system under its authority, except where the AI system is used in the course of a personal non-professional activity. Most SMEs that use AI tools are deployers."
  },
  {
    question: "When do Article 26 obligations apply?",
    answer: "Article 26 obligations apply to deployers of high-risk AI systems. Most will apply from 2 August 2026, though you should prepare now. AI systems in regulated products (Annex I) have an extended transition until August 2027."
  },
  {
    question: "What's the difference between provider and deployer obligations?",
    answer: "Providers (developers/manufacturers) have obligations around design, documentation, conformity assessment, and post-market monitoring. Deployers (users) have obligations around use, oversight, monitoring, incidents, and worker notification. Some organisations may be both—if you build AI for internal use, you may have provider obligations too."
  },
  {
    question: "Do I need to do a FRIA as a deployer?",
    answer: "FRIA (Fundamental Rights Impact Assessment) is required for certain deployers—specifically public bodies and some private entities providing public services—before deploying certain high-risk AI systems. Credit scoring and health/life insurance AI also triggers FRIA regardless of entity type."
  },
  {
    question: "What if my vendor doesn't provide instructions for use?",
    answer: "Under the EU AI Act, providers of high-risk AI systems are required to supply instructions for use. If your vendor cannot provide these, it may indicate the system hasn't been designed with EU AI Act compliance in mind. Raise this in your vendor due diligence and consider whether the system is appropriate for high-risk deployment."
  },
  {
    question: "How do I assign 'competent' human oversight?",
    answer: "Competence means the person understands how the AI system works, knows its limitations, can interpret its outputs correctly, has been trained on oversight procedures, and has practical authority to intervene. Document the competence requirements for each role and ensure training records support the assignment."
  },
  {
    question: "What logs do I need to retain for 6 months?",
    answer: "The 6-month retention applies to 'automatically generated' logs that are 'under your control.' This typically includes decision logs, input/output records, user interaction logs, and system performance data. Ask your vendor what logging is available and ensure you can export and store these logs for the required period."
  }
];

export default function Article26Guide() {
  const articleSchema = createArticleSchema({
    headline: "Article 26 Deployer Obligations: Operational Playbook",
    description: "Complete guide to EU AI Act Article 26 deployer obligations for high-risk AI systems. Covers oversight, monitoring, logs, incidents, and workplace notification.",
    datePublished: "2025-01-20",
    dateModified: "2026-02-28"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "Article 26 Deployer Obligations", url: "https://klarvo.io/guides/article-26-deployer-obligations" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Article 26 Deployer Obligations - EU AI Act Guide"
        description="Complete guide to Article 26 deployer obligations for high-risk AI systems. Covers human oversight, monitoring, log retention, incident reporting, and worker notification."
        keywords={["Article 26 EU AI Act", "deployer obligations", "high-risk AI obligations", "AI deployer requirements", "EU AI Act deployer"]}
        canonical="https://klarvo.io/guides/article-26-deployer-obligations"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <Badge variant="destructive">High-Risk</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                20 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Article 26 Deployer Obligations
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The operational playbook for deployers of high-risk AI systems. What you must do, who owns it, what evidence you need, and practical examples for every obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/templates/article-26-checklist">
                  <Download className="mr-2 h-5 w-5" />
                  Get Article 26 Checklist
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/tools/high-risk-checker-annex-iii">
                  Check if High-Risk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Who Is This Guide For?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              If you <strong>use</strong> high-risk AI systems in your organisation—as opposed to building them—you're a deployer. Article 26 is your primary compliance obligation under the EU AI Act. It applies to any organisation deploying AI in <Link to="/guides/high-risk-ai-annex-iii" className="text-primary hover:underline">Annex III categories</Link>: employment, credit scoring, education, essential services, biometrics, and more.
            </p>
            <p className="text-muted-foreground mb-6">
              Most SMEs are deployers. Even if your vendor built the AI, <em>you</em> bear deployer obligations. You can't outsource compliance by saying "the vendor handles it." You must actively oversee, monitor, and evidence how you use the system.
            </p>
            <div className="p-4 border border-primary/30 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">
                <strong>Not sure if your systems are high-risk?</strong> Run our <Link to="/tools/high-risk-checker-annex-iii" className="text-primary hover:underline">High-Risk Checker</Link> first. Article 26 only applies to high-risk AI systems. If your systems are classified as minimal or limited risk, your obligations are lighter (mainly <Link to="/guides/article-50-transparency-obligations" className="text-primary hover:underline">transparency</Link> and <Link to="/guides/ai-literacy-article-4" className="text-primary hover:underline">AI literacy</Link>).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Obligations — expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">The 8 Deployer Obligations — In Depth</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Article 26 sets out specific requirements for anyone deploying high-risk AI systems. Here's what each means in practice.
            </p>
            <div className="space-y-8">
              {obligations.map((obligation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <obligation.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-xl">{obligation.title}</CardTitle>
                          <Badge variant="outline">{obligation.article}</Badge>
                        </div>
                        <p className="text-muted-foreground">{obligation.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{obligation.deepDive}</p>
                    <div>
                      <h4 className="font-semibold mb-3">What to do:</h4>
                      <ul className="grid gap-2 md:grid-cols-2">
                        {obligation.whatToDo.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Practical example:</p>
                      <p className="text-sm text-muted-foreground">{obligation.practicalExample}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  <CardTitle className="text-lg">Get the Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Download the Article 26 deployer obligations checklist template—one per high-risk system.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/article-26-checklist">Download Checklist <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Build Oversight Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Use our human oversight plan template to document competence, training, and authority.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/human-oversight-plan">Get Template <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Scale className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Check FRIA Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Determine if you also need a Fundamental Rights Impact Assessment under Article 27.</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/fria-article-27">FRIA Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
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

      <RelatedContent currentHref="/guides/article-26-deployer-obligations" title="Related Resources" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
        </div>
      </section>

      <CTASection
        title="Automate Your Article 26 Compliance"
        subtitle="Klarvo auto-generates deployer checklists, tracks evidence for each obligation, and produces audit-ready packs."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
