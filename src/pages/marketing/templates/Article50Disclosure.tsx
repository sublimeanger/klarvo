import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection, TemplateDownloadGate } from "@/components/marketing";
import { SEOHead, SchemaMarkup, createHowToSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Image,
  Video,
  FileText
} from "lucide-react";

const disclosureTypes = [
  {
    icon: MessageSquare,
    title: "AI Interaction Disclosure",
    trigger: "When people interact directly with an AI system",
    example: "Chatbots, virtual assistants, AI customer support",
    template: "You are interacting with an AI system. A human representative is available upon request."
  },
  {
    icon: Image,
    title: "Synthetic Content Marking",
    trigger: "When AI generates or manipulates images, audio, or video",
    example: "AI-generated images, voice synthesis, video creation",
    template: "This content was generated/modified using AI technology."
  },
  {
    icon: Video,
    title: "Deepfake Disclosure",
    trigger: "When content has been artificially generated/manipulated to appear authentic",
    example: "Face swaps, voice cloning, synthetic media",
    template: "This media has been artificially generated or manipulated."
  },
  {
    icon: FileText,
    title: "AI-Generated Text Disclosure",
    trigger: "When AI generates text published on matters of public interest",
    example: "AI-written articles, news summaries, public information",
    template: "This text was generated with the assistance of AI."
  },
];

const faqQuestions = [
  {
    question: "What is Article 50 of the EU AI Act?",
    answer: "Article 50 sets out transparency obligations for AI systems. It requires disclosures when people interact with AI, when AI generates synthetic content, for deepfakes, and for AI-generated text on public interest matters."
  },
  {
    question: "When must I disclose AI interaction?",
    answer: "You must inform people that they're interacting with an AI system before or at the first interaction, unless it's obvious from context that they're dealing with AI."
  },
  {
    question: "How should synthetic content be marked?",
    answer: "Synthetic content must be marked in a machine-readable format that indicates it was artificially generated or manipulated. The marking should be detectable and interoperable."
  },
  {
    question: "Are there exceptions to disclosure requirements?",
    answer: "Yes. Disclosures may not be required if the AI nature is obvious to a reasonably well-informed person, or for creative/artistic uses where disclosure would undermine the work."
  }
];

const howToSteps = [
  { name: "Identify disclosure triggers", text: "Review your AI systems for Article 50 scenarios: interaction, synthetic content, deepfakes, public text." },
  { name: "Select appropriate templates", text: "Choose disclosure templates that match your use case and user context." },
  { name: "Implement disclosures", text: "Add disclosures to your UI, content, or metadata as appropriate." },
  { name: "Document compliance", text: "Screenshot or record your disclosures as evidence for audit." },
];

export default function Article50Disclosure() {
  const howToSchema = createHowToSchema({
    name: "How to Implement Article 50 Transparency Disclosures",
    description: "Step-by-step guide to implementing EU AI Act Article 50 transparency obligations.",
    steps: howToSteps,
    totalTime: "PT30M"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Templates", url: "https://klarvo.io/templates" },
      { name: "Article 50 Disclosure Templates", url: "https://klarvo.io/templates/article-50-disclosure-templates" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Article 50 Disclosure Templates - EU AI Act"
        description="Free Article 50 transparency disclosure templates for AI interactions, synthetic content, deepfakes, and AI-generated text. Copy-paste ready."
        keywords={["Article 50 disclosure", "AI transparency template", "synthetic content disclosure", "AI disclosure template", "EU AI Act transparency"]}
        canonical="https://klarvo.io/templates/article-50-disclosure-templates"
      />
      <SchemaMarkup schema={[howToSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Free Templates</Badge>
              <Badge variant="outline">Article 50</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Article 50 Disclosure Templates
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready-to-use transparency disclosure templates for AI interactions, synthetic content, deepfakes, and AI-generated text. Copy, customize, and deploy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TemplateDownloadGate
                templateName="Article 50 Disclosure Templates"
                templateSlug="article-50-disclosure"
                fileName="article-50-disclosure-templates.pdf"
                buttonText="Download All Templates"
                buttonSize="lg"
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/tools/transparency-obligation-checker">
                  Check Your Requirements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Templates */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Disclosure Templates</h2>
            <div className="space-y-6">
              {disclosureTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <type.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription>{type.trigger}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">Example use cases:</span>
                      <p className="text-sm text-muted-foreground">{type.example}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <span className="text-sm font-medium block mb-2">Template:</span>
                      <p className="text-sm font-mono">{type.template}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Copy Template
                    </Button>
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
        title="Manage All Your Disclosures in One Place"
        subtitle="Klarvo tracks which AI systems need disclosures and stores your evidence."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
