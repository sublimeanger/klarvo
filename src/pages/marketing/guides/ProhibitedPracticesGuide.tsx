import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  XCircle,
  AlertTriangle,
  Shield
} from "lucide-react";

const prohibitedPractices = [
  {
    title: "Harmful Manipulation/Deception",
    article: "5(1)(a)",
    description: "AI systems using subliminal, manipulative, or deceptive techniques that distort behavior and cause significant harm.",
    examples: ["Dark patterns designed to manipulate purchasing decisions causing financial harm", "Systems exploiting cognitive biases to influence political views harmfully"],
    notCovered: ["Standard marketing personalization", "Transparent recommendation systems"]
  },
  {
    title: "Exploitation of Vulnerabilities",
    article: "5(1)(b)",
    description: "AI exploiting vulnerabilities due to age, disability, or social/economic situation causing significant harm.",
    examples: ["Predatory lending AI targeting financially distressed individuals", "Gambling AI targeting addiction-prone users"],
    notCovered: ["Accessibility features for disabled users", "Age-appropriate content filtering"]
  },
  {
    title: "Social Scoring",
    article: "5(1)(c)",
    description: "Evaluating/classifying people based on social behavior for unrelated decisions leading to detrimental treatment.",
    examples: ["Denying insurance based on social media activity", "Employment decisions based on personal lifestyle choices"],
    notCovered: ["Credit scoring based on financial history", "Background checks for relevant roles"]
  },
  {
    title: "Criminal Risk Profiling",
    article: "5(1)(d)",
    description: "Predicting criminal offense risk based solely on profiling or personality traits (not actual criminal behavior).",
    examples: ["Pre-crime prediction based on demographics", "Risk scoring based purely on personality assessments"],
    notCovered: ["Recidivism assessment based on criminal history", "Evidence-based risk assessment in justice"]
  },
  {
    title: "Facial Recognition Database Scraping",
    article: "5(1)(e)",
    description: "Creating/expanding facial recognition databases through untargeted scraping of images from internet or CCTV.",
    examples: ["Scraping social media for facial recognition training", "Mass CCTV capture for identity databases"],
    notCovered: ["User-uploaded photos with consent", "Targeted law enforcement with warrants"]
  },
  {
    title: "Workplace/Education Emotion Inference",
    article: "5(1)(f)",
    description: "Inferring emotions in workplace or educational settings (with limited medical/safety exceptions).",
    examples: ["Monitoring employee emotions during meetings", "Assessing student engagement via emotional analysis"],
    notCovered: ["Medical emotion detection for safety", "Driver fatigue detection for transport safety"]
  },
  {
    title: "Sensitive Biometric Categorisation",
    article: "5(1)(g)",
    description: "Categorising people based on biometric data to infer protected characteristics.",
    examples: ["Determining race or religion from facial features", "Inferring sexual orientation from biometric analysis"],
    notCovered: ["Age verification for content access", "Gender-neutral health diagnostics"]
  },
  {
    title: "Real-time Remote Biometric ID",
    article: "5(1)(h)",
    description: "Real-time remote biometric identification in public spaces for law enforcement (with narrow exceptions).",
    examples: ["Mass surveillance facial recognition in city centers", "Real-time identification at public events"],
    notCovered: ["Post-event investigation with authorization", "Border control with appropriate safeguards"]
  },
];

const faqQuestions = [
  {
    question: "When did prohibited practice rules apply?",
    answer: "Prohibited practice rules applied from 2 February 2025, making this one of the earliest enforcement dates in the EU AI Act. Organizations should have already ceased any prohibited uses."
  },
  {
    question: "What are the penalties for prohibited practices?",
    answer: "Violations of prohibited practices face the highest penalties under the AI Act: up to €35 million or 7% of annual worldwide turnover, whichever is higher."
  },
  {
    question: "How do I know if my AI system is prohibited?",
    answer: "Use our prohibited practices screening tool to check your systems. If any indicators are found, stop using the system immediately and seek legal advice. When in doubt, err on the side of caution."
  },
  {
    question: "Are there any exceptions to prohibited practices?",
    answer: "Some narrow exceptions exist, particularly for law enforcement uses under strict conditions. However, these are very limited and typically require judicial authorization and specific circumstances."
  }
];

export default function ProhibitedPracticesGuide() {
  const articleSchema = createArticleSchema({
    headline: "Prohibited AI Practices (Article 5): Complete Guide",
    description: "Comprehensive guide to EU AI Act Article 5 prohibited practices. Understand the 8 banned AI uses including manipulation, social scoring, and biometric identification.",
    datePublished: "2025-01-10",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "Prohibited Practices", url: "https://klarvo.io/guides/prohibited-ai-practices-article-5" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Prohibited AI Practices (Article 5) - EU AI Act Guide"
        description="Complete guide to EU AI Act Article 5 prohibited practices. Learn about the 8 banned AI uses: manipulation, social scoring, criminal profiling, biometric identification, and more."
        keywords={["prohibited AI practices", "Article 5", "banned AI", "EU AI Act prohibited", "social scoring", "biometric identification", "AI manipulation"]}
        canonical="https://klarvo.io/guides/prohibited-ai-practices-article-5"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="destructive">Critical</Badge>
              <Badge variant="outline">Article 5</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prohibited AI Practices (Article 5)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The EU AI Act bans 8 categories of AI practices outright. These rules applied from 2 February 2025 and carry the highest penalties. Know what's banned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/tools/prohibited-practices-screening">
                  Screen Your AI Systems
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/signup">
                  Document Compliance
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
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">These Rules Apply Now</h3>
                    <p className="text-muted-foreground">
                      Prohibited practice rules applied from <strong>2 February 2025</strong>. If you're using AI systems that fall into these categories, you must stop immediately. Penalties can reach €35 million or 7% of global turnover.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The 8 Prohibited Practices</h2>
            <div className="space-y-6">
              {prohibitedPractices.map((practice, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{practice.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">Art. {practice.article}</Badge>
                        </div>
                        <p className="text-muted-foreground">{practice.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="ml-14">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-destructive mb-2">Prohibited examples:</p>
                        <ul className="space-y-1">
                          {practice.examples.map((ex, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <XCircle className="h-3 w-3 text-destructive shrink-0 mt-1" />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-success mb-2">Not covered (likely OK):</p>
                        <ul className="space-y-1">
                          {practice.notCovered.map((ex, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Shield className="h-3 w-3 text-success shrink-0 mt-1" />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
        title="Screen Your AI Systems Now"
        subtitle="Use our free screening tool to check for prohibited practices and document your compliance."
        primaryCta={{ label: "Run Screening", href: "/tools/prohibited-practices-screening" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
      />
    </MarketingLayout>
  );
}
