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
  CheckCircle,
  XCircle,
  HelpCircle,
  Bot,
  Brain,
  Settings,
  FileText,
  Sparkles,
  Search,
  Code
} from "lucide-react";

const definitionCriteria = [
  {
    criterion: "1. Infers outputs from inputs",
    description: "The system generates predictions, recommendations, decisions, or content based on input data. It doesn't just retrieve data or perform fixed calculations—it creates something new or derives a result that wasn't explicitly programmed.",
    icon: Brain,
    deepDive: "Inference is the key differentiator. Traditional software follows a fixed path: if X, then Y. AI systems learn, optimise, or reason to determine Y. Even simple machine learning models infer relationships in data. Generative AI infers the next word or pixel. If the system's output isn't strictly determined by a pre-written rule but derived from a model or algorithm, it infers."
  },
  {
    criterion: "2. Achieves explicit or implicit objectives",
    description: "The system is designed to accomplish specific goals—whether stated (explicit) or learned/optimised (implicit).",
    icon: Sparkles,
    deepDive: "Explicit objectives are goals set by the human designer (e.g., 'sort emails into spam and inbox'). Implicit objectives are what the system learns to do to maximise a reward function (e.g., 'keep the user engaged on the platform'). This distinguishes AI from general-purpose tools like a blank spreadsheet, which has no inherent objective until a user gives it one."
  },
  {
    criterion: "3. Operates with varying levels of autonomy",
    description: "The system functions with some independence from human involvement. It isn't purely manual rule execution—it takes initiative or operates without constant human guidance.",
    icon: Bot,
    deepDive: "Autonomy is a spectrum. A spam filter that automatically moves emails is autonomous. A robotic arm that plans its own path to pick up an object is autonomous. A system that simply waits for a human command to perform a fixed calculation (like a calculator) is not autonomous. The AI Act covers systems that automate decisions or actions in the physical or virtual world."
  },
];

const examples = [
  {
    name: "Customer Support Chatbot",
    isAI: true,
    reason: "Infers responses using NLP/LLM; operates autonomously to answer queries.",
    category: "Likely AI System",
    detail: "Modern chatbots using LLMs or intent recognition are definitely AI. Older 'decision tree' bots that only offer clickable buttons might be borderline but are increasingly rare."
  },
  {
    name: "ML-based Fraud Detection",
    isAI: true,
    reason: "Infers fraudulent patterns from transaction history; predicts risk scores.",
    category: "Likely AI System",
    detail: "Classic high-risk candidate if it denies services. It learns what fraud looks like rather than following fixed rules."
  },
  {
    name: "CV Screening Tool",
    isAI: true,
    reason: "Ranks candidates based on learned patterns from past hiring data.",
    category: "Likely AI System",
    detail: "Uses inference to match candidate skills to job descriptions. Often high-risk (Annex III)."
  },
  {
    name: "Excel Formula Sheet",
    isAI: false,
    reason: "Deterministic calculations. Input A always leads to Output B via fixed formula.",
    category: "Likely Not AI",
    detail: "Standard software. Even complex macros are typically rule-based, not inferential."
  },
  {
    name: "Rule-Based Inventory Alert",
    isAI: false,
    reason: "If stock < 10, send email. No inference, purely rule execution.",
    category: "Likely Not AI",
    detail: "Simple automation script. However, if it uses demand forecasting to predict *when* stock will run out, that is AI."
  },
  {
    name: "Basic Search Bar",
    isAI: false,
    reason: "Matches keywords exactly. No ranking optimisation or personalization.",
    category: "Likely Not AI",
    detail: "Database lookup. But search *engines* that rank results based on user behaviour or relevance models ARE AI systems."
  }
];

const greyAreas = [
  {
    system: "Advanced Analytics Dashboards",
    verdict: "It depends.",
    consideration: "If it just visualises past data (descriptive analytics), it's not AI. If it forecasts future trends or recommends actions (predictive/prescriptive analytics), it likely is AI. Look for the 'prediction' element."
  },
  {
    system: "Robotic Process Automation (RPA)",
    verdict: "Usually not AI, but evolving.",
    consideration: "Traditional RPA ('screen scraping' and macro recording) mimics human clicks based on fixed rules—not AI. 'Intelligent RPA' that handles unstructured documents (invoices) using OCR and NLP is AI."
  },
  {
    system: "Search Engines",
    verdict: "Likely AI.",
    consideration: "Modern search engines don't just match keywords. They use ranking algorithms (Recommender Systems) to infer relevance. This qualifies them as AI systems under the Act."
  },
  {
    system: "Statistical Models (Regression)",
    verdict: "Context matters.",
    consideration: "A simple linear regression in Excel might not be 'AI'. But a sophisticated statistical model used for automated credit scoring or risk prediction typically falls under the AI definition due to its inferential nature and impact."
  },
];

const faqQuestions = [
  {
    question: "What is the EU AI Act definition of an AI system?",
    answer: "Under Article 3(1), an AI system is a machine-based system designed to operate with varying levels of autonomy, that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."
  },
  {
    question: "Why does the AI system definition matter?",
    answer: "The definition is the gateway to the regulation. If your software isn't an 'AI system', the EU AI Act doesn't apply (though GDPR and other laws still do). If it IS an AI system, you must determine its risk level and comply with relevant obligations. Getting this determination right prevents over-compliance (doing too much) or non-compliance (ignoring rules)."
  },
  {
    question: "Are chatbots always AI systems?",
    answer: "Almost always. Modern chatbots use Natural Language Processing (NLP) or Large Language Models (LLMs) to infer meaning and generate responses. Only very simple, rigid 'button-based' decision tree bots might escape the definition, but even these are often borderline. Treat chatbots as AI systems subject to Article 50 transparency rules."
  },
  {
    question: "Is RPA (Robotic Process Automation) an AI system?",
    answer: "Basic RPA that strictly follows rules ('if invoice received, open PDF, copy field A to field B') is typically not AI. However, 'Intelligent Automation' or RPA enhanced with AI skills (like document understanding, sentiment analysis, or probabilistic decision making) DOES qualify as AI."
  },
  {
    question: "How do we document our AI system determination?",
    answer: "You should create a written assessment for each system. Record the system name, describe its function, evaluate it against the 3 criteria (inference, objectives, autonomy), state your conclusion, and have it signed off by a reviewer. Klarvo's AI Definition Checker tool automates this process and produces a timestamped memo for your records."
  }
];

export default function AIDefinitionGuide() {
  const articleSchema = createArticleSchema({
    headline: "Is This an AI System? Understanding the EU AI Act Definition",
    description: "Learn how to determine if your systems qualify as AI under the EU AI Act. Covers the official definition, examples, edge cases, and documentation requirements.",
    datePublished: "2025-01-22",
    dateModified: "2026-02-28"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "AI System Definition", url: "https://klarvo.io/guides/is-this-an-ai-system" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Is This an AI System? EU AI Act Definition Guide"
        description="Determine if your systems qualify as AI under the EU AI Act. Learn the official definition, see examples, and understand edge cases."
        keywords={["AI system definition EU AI Act", "is this an AI system", "EU AI Act scope", "AI definition", "AI system criteria", "OECD AI definition"]}
        canonical="https://klarvo.io/guides/is-this-an-ai-system"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                10 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Is This an AI System?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The first question in EU AI Act compliance: does your system even qualify as "AI"? The definition is broader than you might think—but specific enough to exclude standard software. Here's how to tell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/ai-system-definition-checker">
                  <Settings className="mr-2 h-5 w-5" />
                  Run Definition Checker
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/guides/eu-ai-act-for-smes">
                  Read SME Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Definition */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Official Definition</h2>
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4 font-serif">
                  "A machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                  — EU AI Act, Article 3(1)
                </p>
              </CardContent>
            </Card>
            <p className="mt-6 text-muted-foreground text-center">
              This definition is aligned with the OECD definition to ensure international consistency. It focuses on <strong>inference</strong>, <strong>autonomy</strong>, and <strong>objectives</strong> rather than specific technologies (like "deep learning"). This makes it future-proof—it covers today's LLMs and tomorrow's innovations.
            </p>
          </div>
        </div>
      </section>

      {/* Three Key Criteria — Expanded */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Three Key Criteria</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              For a system to be regulated as AI, it generally must meet all three of these criteria:
            </p>
            <div className="space-y-6">
              {definitionCriteria.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.criterion}</CardTitle>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-16">
                    <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                      {item.deepDive}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Software vs. AI: Practical Examples</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Likely AI Systems</h3>
                </div>
                {examples.filter(e => e.isAI).map((example, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="font-medium mb-1">{example.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{example.reason}</div>
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        {example.detail}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-6 w-6 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">Likely Standard Software</h3>
                </div>
                {examples.filter(e => !e.isAI).map((example, index) => (
                  <Card key={index} className="border-l-4 border-l-muted">
                    <CardContent className="p-4">
                      <div className="font-medium mb-1">{example.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{example.reason}</div>
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        {example.detail}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edge Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Grey Areas & Edge Cases</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Technology evolves faster than definitions. Here's how to handle common borderline cases.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {greyAreas.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.system}</CardTitle>
                      <Badge variant="outline">{item.verdict}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.consideration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-6 bg-warning/5 rounded-lg border border-warning/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-warning" />
                When in doubt, classify and document
              </h3>
              <p className="text-muted-foreground text-sm">
                If a system is borderline, it is safer to document your reasoning than to ignore it. Use the "Needs Review" status in Klarvo. If the system is high-impact, treat it as AI to be safe. If it's low-impact, the compliance burden is minimal anyway (transparency), so acknowledging it as AI isn't a disaster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Document */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Document Your Decision</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              For every system in your software inventory, you should record whether it is AI or not. This "negative assurance" proves you've done your due diligence.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>What to Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>System Identity:</strong> Name, ID, vendor, version</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>Assessment Date:</strong> When you checked it</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>Reviewer:</strong> Who made the decision</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>Criteria Check:</strong> Yes/No for Inference, Objectives, Autonomy</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>Conclusion:</strong> AI / Not AI / Needs Review</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span><strong>Rationale:</strong> 1-2 sentences explaining why</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Use Our Checker Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Klarvo's AI Definition Checker walks you through the 3 criteria with guided explanations. It generates a PDF memo you can save as proof of assessment.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/tools/ai-system-definition-checker">
                      Run Definition Checker
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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

      <RelatedContent currentHref="/guides/is-this-an-ai-system" title="Related Resources" />

      <CTASection
        title="Not Sure if Your System is AI?"
        subtitle="Use our free Definition Checker tool to assess your systems and generate documentation."
        primaryCta={{ label: "Run the Checker", href: "/tools/ai-system-definition-checker" }}
        secondaryCta={{ label: "Download Inventory Template", href: "/templates/ai-inventory-template" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
