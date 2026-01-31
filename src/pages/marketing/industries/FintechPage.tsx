import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Landmark,
  CreditCard,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const fintechUseCases = [
  {
    title: "Credit Scoring & Lending Decisions",
    risk: "High-Risk",
    description: "AI systems that evaluate creditworthiness or determine access to credit fall under Annex III high-risk category.",
    obligations: ["Article 26 deployer obligations", "Human oversight with authority to override", "Logging for 6+ months", "Transparency to applicants"]
  },
  {
    title: "Insurance Risk Assessment",
    risk: "High-Risk",
    description: "AI used for insurance pricing, claims assessment, or underwriting decisions.",
    obligations: ["Risk assessment documentation", "Non-discrimination monitoring", "Explainability requirements", "FRIA if significant impact"]
  },
  {
    title: "Fraud Detection",
    risk: "Limited Risk",
    description: "AI systems for fraud detection typically don't fall into high-risk unless they significantly impact service access.",
    obligations: ["Transparency if customer-facing", "Documentation of purpose", "Monitoring for bias"]
  },
  {
    title: "Customer Service Chatbots",
    risk: "Limited Risk",
    description: "AI chatbots for customer support require transparency disclosure under Article 50.",
    obligations: ["Disclose AI interaction", "Mark synthetic content", "Escalation to human available"]
  },
];

const faqQuestions = [
  {
    question: "Is credit scoring AI high-risk under the EU AI Act?",
    answer: "Yes. AI systems used to evaluate creditworthiness or determine access to credit are explicitly listed in Annex III as high-risk, requiring full compliance with deployer obligations under Article 26."
  },
  {
    question: "What about robo-advisors and wealth management AI?",
    answer: "Robo-advisors providing investment recommendations are typically limited risk unless they make autonomous decisions affecting access to essential services. Transparency obligations apply for AI interactions."
  },
  {
    question: "How does DORA interact with the EU AI Act for fintech?",
    answer: "DORA (Digital Operational Resilience Act) and the EU AI Act are complementary. DORA focuses on ICT risk management while the AI Act addresses AI-specific risks. Financial services firms need to comply with both."
  },
  {
    question: "When do these obligations apply to fintech companies?",
    answer: "Most obligations apply from 2 August 2026, but prohibited practices and AI literacy requirements applied from 2 February 2025. Credit scoring and insurance AI should prepare now."
  }
];

export default function FintechPage() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for Fintech & Financial Services",
    description: "Complete guide to EU AI Act compliance for fintech companies. Credit scoring, insurance AI, fraud detection, and robo-advisors.",
    datePublished: "2025-01-20",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Industries", url: "https://klarvo.io/industries" },
      { name: "Fintech", url: "https://klarvo.io/industries/fintech-credit-ai-act" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act for Fintech & Credit Scoring - Compliance Guide"
        description="EU AI Act compliance guide for fintech. Credit scoring, insurance AI, fraud detection are high-risk under Annex III. Learn deployer obligations."
        keywords={["fintech AI Act", "credit scoring AI", "insurance AI compliance", "financial services AI regulation", "Annex III credit"]}
        canonical="https://klarvo.io/industries/fintech-credit-ai-act"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="destructive">High-Risk</Badge>
              <Badge variant="outline">Annex III</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EU AI Act for Fintech & Financial Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Credit scoring and insurance AI are high-risk under Annex III. Financial services deploying AI for lending, underwriting, or customer decisions face significant compliance obligations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/high-risk-checker-annex-iii">
                  Check Your AI Systems
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/article-26-checklist">
                  Get Deployer Checklist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-warning bg-warning/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <Landmark className="h-8 w-8 text-warning shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Credit & Insurance AI is High-Risk</h3>
                    <p className="text-muted-foreground">
                      The EU AI Act explicitly lists AI used to "evaluate the creditworthiness of natural persons" and AI for "risk assessment and pricing in relation to life and health insurance" as high-risk under Annex III.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Fintech AI Use Cases</h2>
            <div className="space-y-6">
              {fintechUseCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{useCase.title}</CardTitle>
                          <Badge variant={useCase.risk === "High-Risk" ? "destructive" : "secondary"}>
                            {useCase.risk}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-14">
                    <p className="text-sm font-medium mb-2">Key Obligations:</p>
                    <ul className="space-y-1">
                      {useCase.obligations.map((obligation, i) => (
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
        title="Prepare Your Fintech for Compliance"
        subtitle="Klarvo helps financial services companies classify, document, and evidence AI compliance."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Industries", href: "/industries" }}
      />
    </MarketingLayout>
  );
}
