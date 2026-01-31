import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Globe,
  Code,
  CheckCircle,
  FileText,
  Shield
} from "lucide-react";

const saasScenarios = [
  {
    title: "AI-Powered SaaS Products",
    role: "Provider",
    description: "If you build AI into your SaaS product, you may be a provider under the AI Act with additional obligations.",
    obligations: ["Conformity assessment (if high-risk)", "Technical documentation", "Quality management system", "Post-market monitoring"]
  },
  {
    title: "Using Third-Party AI APIs",
    role: "Deployer",
    description: "If you integrate AI APIs (OpenAI, Anthropic, etc.) into your product, you're typically a deployer.",
    obligations: ["Use according to instructions", "Human oversight where required", "Transparency to end users", "Vendor due diligence"]
  },
  {
    title: "AI for Internal Operations",
    role: "Deployer",
    description: "Using AI tools for internal purposes (HR, support, analytics) makes you a deployer.",
    obligations: ["Inventory AI systems", "Classify risk levels", "Implement required controls", "AI literacy for staff"]
  },
  {
    title: "Selling into EU Markets",
    role: "Provider/Deployer",
    description: "SaaS companies with EU customers need to evidence AI governance for procurement.",
    obligations: ["Evidence packs for customers", "Contractual AI clauses", "Customer transparency support", "Incident notification paths"]
  },
];

const faqQuestions = [
  {
    question: "Are SaaS companies providers or deployers?",
    answer: "It depends. If you build AI into your product, you're likely a provider. If you use third-party AI in your operations or product, you're typically a deployer. Many SaaS companies are both."
  },
  {
    question: "What do EU customers expect from SaaS vendors?",
    answer: "Enterprise customers increasingly ask for AI governance evidence packs. They want to see your AI inventory, risk classifications, transparency practices, and incident processes."
  },
  {
    question: "Do US-based SaaS companies need to comply?",
    answer: "If your SaaS product uses AI and has EU customers, EU AI Act obligations apply. The regulation has extraterritorial reach for AI systems that affect people in the EU."
  },
  {
    question: "How should we handle AI in procurement questionnaires?",
    answer: "Prepare an AI governance evidence pack covering: which AI you use, how it's classified, what controls are in place, and how you handle incidents. Klarvo generates these packs automatically."
  }
];

export default function SaaSPage() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for SaaS Companies",
    description: "EU AI Act compliance guide for SaaS companies. Provider vs deployer obligations, customer evidence packs, and selling AI into EU markets.",
    datePublished: "2025-01-18",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Industries", url: "https://klarvo.io/industries" },
      { name: "SaaS", url: "https://klarvo.io/industries/saas-ai-act" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act for SaaS Companies - Compliance Guide"
        description="EU AI Act compliance for SaaS. Understand provider vs deployer obligations, customer evidence packs, and selling AI products into EU markets."
        keywords={["SaaS AI Act", "software AI compliance", "AI provider obligations", "selling AI to EU", "SaaS AI governance"]}
        canonical="https://klarvo.io/industries/saas-ai-act"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>SaaS</Badge>
              <Badge variant="outline">Provider & Deployer</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EU AI Act for SaaS Companies
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              SaaS companies building or using AI need to understand their obligations. Whether you're a provider, deployer, or both—and how to evidence compliance to customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Your Inventory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/vendor-due-diligence-questionnaire">
                  See Customer Questions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">SaaS AI Scenarios</h2>
            <div className="space-y-6">
              {saasScenarios.map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{scenario.title}</CardTitle>
                          <Badge variant="outline">{scenario.role}</Badge>
                        </div>
                        <p className="text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-14">
                    <p className="text-sm font-medium mb-2">Key Obligations:</p>
                    <ul className="space-y-1">
                      {scenario.obligations.map((obligation, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {obligation}
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

      {/* Evidence Pack Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Evidence Packs</h2>
          <p className="text-center text-muted-foreground mb-8">
            Enterprise customers increasingly require AI governance documentation. Klarvo helps you generate audit-ready packs.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="py-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI Inventory</h3>
                <p className="text-sm text-muted-foreground">Complete list of AI systems with classifications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Controls Evidence</h3>
                <p className="text-sm text-muted-foreground">Documented oversight and governance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">How you handle disclosures and data</p>
              </CardContent>
            </Card>
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
        title="Win EU Deals with AI Governance"
        subtitle="Klarvo helps SaaS companies build and evidence AI compliance for customer confidence."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Industries", href: "/industries" }}
      />
    </MarketingLayout>
  );
}
