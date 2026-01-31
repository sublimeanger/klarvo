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
  Sparkles
} from "lucide-react";

const definitionCriteria = [
  {
    criterion: "Infers outputs from inputs",
    description: "The system generates predictions, recommendations, decisions, or content based on input data",
    icon: Brain
  },
  {
    criterion: "Achieves explicit or implicit objectives",
    description: "It's designed to accomplish specific goals—whether stated or learned",
    icon: Sparkles
  },
  {
    criterion: "Operates with varying levels of autonomy",
    description: "Functions with some independence, not purely manual rule execution",
    icon: Bot
  },
];

const examples = [
  {
    name: "Customer Support Chatbot",
    isAI: true,
    reason: "Infers responses from customer queries using NLP/ML models",
    category: "Likely AI System"
  },
  {
    name: "ML-based Fraud Detection",
    isAI: true,
    reason: "Uses machine learning to predict fraudulent transactions",
    category: "Likely AI System"
  },
  {
    name: "Recommendation Engine",
    isAI: true,
    reason: "Infers preferences to suggest products/content",
    category: "Likely AI System"
  },
  {
    name: "CV Screening Tool",
    isAI: true,
    reason: "Ranks or filters candidates using learned patterns",
    category: "Likely AI System"
  },
  {
    name: "Simple If-Then Automation",
    isAI: false,
    reason: "Executes predetermined rules without inference",
    category: "Likely Not AI"
  },
  {
    name: "Basic Search Filters",
    isAI: false,
    reason: "Keyword matching without learning or inference",
    category: "Likely Not AI"
  },
  {
    name: "Spreadsheet Formulas",
    isAI: false,
    reason: "Deterministic calculations, no autonomous behavior",
    category: "Likely Not AI"
  },
  {
    name: "Static Decision Trees",
    isAI: false,
    reason: "Fixed logic defined by humans, no adaptation",
    category: "Likely Not AI"
  },
];

const greyAreas = [
  {
    system: "Advanced Analytics Dashboards",
    consideration: "If they use statistical models to predict or infer, they may qualify. Pure aggregation doesn't."
  },
  {
    system: "Robotic Process Automation (RPA)",
    consideration: "Basic RPA is rule-based, but 'intelligent' RPA with ML components likely qualifies."
  },
  {
    system: "Search Engines",
    consideration: "Ranking algorithms that learn from behavior are AI systems; simple keyword matching is not."
  },
  {
    system: "Spell Checkers",
    consideration: "Basic dictionary lookup is not AI; ML-based grammar correction is."
  },
];

const faqQuestions = [
  {
    question: "What is the EU AI Act definition of an AI system?",
    answer: "Under the EU AI Act, an AI system is a machine-based system that infers from inputs to generate outputs (predictions, recommendations, decisions, or content) for explicit or implicit objectives, operating with varying levels of autonomy."
  },
  {
    question: "Why does the AI system definition matter?",
    answer: "If a system qualifies as an AI system under the Act, it triggers compliance obligations—from transparency requirements to high-risk controls. Systems outside the definition don't require AI Act compliance."
  },
  {
    question: "Are chatbots AI systems?",
    answer: "Most modern chatbots that use NLP or LLM technology are AI systems because they infer responses from input. Simple FAQ bots with fixed responses may not qualify."
  },
  {
    question: "Is RPA (Robotic Process Automation) an AI system?",
    answer: "Basic RPA that follows fixed rules is typically not an AI system. However, 'intelligent' RPA that uses ML to make decisions or adapt behavior likely qualifies."
  },
  {
    question: "How do we document our AI system determination?",
    answer: "Record the assessment date, reviewer, the criteria evaluated, your conclusion (AI system / not AI system / needs review), and the rationale. Klarvo's AI Definition Checker generates this documentation automatically."
  }
];

export default function AIDefinitionGuide() {
  const articleSchema = createArticleSchema({
    headline: "Is This an AI System? Understanding the EU AI Act Definition",
    description: "Learn how to determine if your systems qualify as AI under the EU AI Act. Covers the official definition, examples, edge cases, and documentation requirements.",
    datePublished: "2025-01-22",
    dateModified: "2025-01-31"
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
        keywords={["AI system definition EU AI Act", "is this an AI system", "EU AI Act scope", "AI definition", "AI system criteria"]}
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
              The first question in EU AI Act compliance: does your system even qualify as "AI"? Here's how to tell—with examples and edge cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/ai-system-definition-checker">
                  <Settings className="mr-2 h-5 w-5" />
                  Run the Definition Checker
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
                <p className="text-lg italic mb-4">
                  "A machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."
                </p>
                <p className="text-sm text-muted-foreground">
                  — EU AI Act, Article 3(1)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Key Criteria */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Three Key Criteria</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A system is likely an AI system if it meets all three criteria:
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {definitionCriteria.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <item.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{item.criterion}</CardTitle>
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

      {/* Examples */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Examples: AI vs Not AI</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Likely AI Systems
                </h3>
                <div className="space-y-3">
                  {examples.filter(e => e.isAI).map((example, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="font-medium">{example.name}</div>
                        <div className="text-sm text-muted-foreground">{example.reason}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                  Likely Not AI Systems
                </h3>
                <div className="space-y-3">
                  {examples.filter(e => !e.isAI).map((example, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="font-medium">{example.name}</div>
                        <div className="text-sm text-muted-foreground">{example.reason}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grey Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Edge Cases & Grey Areas</h2>
            <div className="space-y-4">
              {greyAreas.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <HelpCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">{item.system}</div>
                        <div className="text-muted-foreground">{item.consideration}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2">When in doubt, document your reasoning</h3>
              <p className="text-muted-foreground">
                The Commission has published guidance to help interpret the definition. When a system is borderline, document your assessment with clear rationale. Our Definition Checker tool helps you do this systematically.
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>What to Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• System name and description</li>
                    <li>• Assessment date and reviewer</li>
                    <li>• Criteria evaluation (3 key questions)</li>
                    <li>• Conclusion: AI system / Not AI / Needs review</li>
                    <li>• Rationale for the decision</li>
                    <li>• Confidence level (High/Medium/Low)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Use Our Checker Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our AI Definition Checker walks you through the criteria and generates a documented assessment memo automatically.
                  </p>
                  <Button asChild>
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
