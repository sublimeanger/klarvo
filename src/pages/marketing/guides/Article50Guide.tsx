import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  MessageSquare,
  Image,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const transparencyTypes = [
  {
    icon: MessageSquare,
    title: "AI Interaction Disclosure",
    obligation: "Inform people they are interacting with an AI system",
    who: "Deployers of AI systems that interact directly with people",
    when: "Before or at the first interaction",
    exception: "Not required if obvious from context that it's AI",
    example: "Chatbots must display 'You are chatting with an AI assistant'"
  },
  {
    icon: Image,
    title: "Synthetic Content Marking",
    obligation: "Mark AI-generated content in a machine-readable format",
    who: "Providers of AI systems that generate synthetic content",
    when: "At the time of generation/output",
    exception: "Assistive functions, no substantial editing, or obvious AI nature",
    example: "AI image generator embeds metadata indicating AI creation"
  },
  {
    icon: Video,
    title: "Deepfake Disclosure",
    obligation: "Disclose that content has been artificially generated/manipulated",
    who: "Deployers who publish deepfakes",
    when: "At the point of publication/distribution",
    exception: "Creative/artistic works where disclosure would undermine the work",
    example: "Video with synthetic face swap must be labeled as manipulated"
  },
  {
    icon: FileText,
    title: "AI-Generated Text Disclosure",
    obligation: "Disclose AI-generation for text on public interest matters",
    who: "Deployers publishing AI-generated text on public interest topics",
    when: "At the point of publication",
    exception: "When human editorial review exists and editor takes responsibility",
    example: "AI-written news summary must indicate AI involvement"
  },
];

const faqQuestions = [
  {
    question: "What is Article 50 of the EU AI Act?",
    answer: "Article 50 establishes transparency obligations for certain AI systems. It requires disclosures when people interact with AI, when AI generates synthetic content, for deepfakes, and for AI-generated text published on public interest matters."
  },
  {
    question: "When did Article 50 obligations apply?",
    answer: "Transparency obligations under Article 50 apply from 2 August 2026, as part of the broader application date for most AI Act obligations."
  },
  {
    question: "Who is responsible for Article 50 compliance?",
    answer: "Responsibilities are split: providers must enable transparency (e.g., marking capabilities), while deployers must implement disclosures to end users. Both have obligations depending on the scenario."
  },
  {
    question: "What are the penalties for non-compliance?",
    answer: "Violations of transparency obligations can result in fines up to €15 million or 3% of annual worldwide turnover, whichever is higher. This is lower than fines for prohibited practices but still significant."
  },
  {
    question: "How should I implement AI interaction disclosure?",
    answer: "Disclosure should be clear, prominent, and provided before or at first interaction. Common approaches include chatbot welcome messages, UI labels, or voice announcements for phone systems."
  }
];

export default function Article50Guide() {
  const articleSchema = createArticleSchema({
    headline: "Article 50 Transparency Obligations: Complete Guide",
    description: "Comprehensive guide to EU AI Act Article 50 transparency requirements covering AI interaction disclosure, synthetic content marking, deepfake disclosure, and AI-generated text.",
    datePublished: "2025-01-15",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "Article 50 Transparency", url: "https://klarvo.io/guides/article-50-transparency-obligations" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Article 50 Transparency Obligations - EU AI Act Guide"
        description="Complete guide to EU AI Act Article 50 transparency requirements. Learn about AI interaction disclosure, synthetic content marking, deepfake disclosure, and AI-generated text obligations."
        keywords={["Article 50", "AI transparency", "EU AI Act transparency", "synthetic content disclosure", "AI disclosure requirements", "deepfake disclosure"]}
        canonical="https://klarvo.io/guides/article-50-transparency-obligations"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge>Guide</Badge>
              <Badge variant="outline">Article 50</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Article 50 Transparency Obligations
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The complete guide to EU AI Act transparency requirements. Understand when and how to disclose AI use to your users, customers, and the public.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/transparency-obligation-checker">
                  Check Your Obligations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/article-50-disclosure-templates">
                  Get Disclosure Templates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">What is Article 50?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Article 50 of the EU AI Act establishes transparency obligations to ensure people know when they're interacting with AI or viewing AI-generated content. These requirements aim to protect fundamental rights and enable informed decision-making.
              </p>
              <Card className="mb-8">
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-2">Key Timeline</p>
                      <p className="text-sm text-muted-foreground">
                        Most Article 50 obligations apply from <strong>2 August 2026</strong>. However, organizations should prepare now to ensure systems and processes are ready.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Four Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The Four Transparency Scenarios</h2>
            <div className="space-y-8">
              {transparencyTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <type.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Obligation</p>
                        <p className="text-sm text-muted-foreground">{type.obligation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Who</p>
                        <p className="text-sm text-muted-foreground">{type.who}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">When</p>
                        <p className="text-sm text-muted-foreground">{type.when}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Exception</p>
                        <p className="text-sm text-muted-foreground">{type.exception}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Example</p>
                      <p className="text-sm text-muted-foreground">{type.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
        title="Track Your Transparency Compliance"
        subtitle="Klarvo identifies which AI systems need disclosures and helps you evidence compliance."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
      />
    </MarketingLayout>
  );
}
