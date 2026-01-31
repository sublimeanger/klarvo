import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  CreditCard,
  Scale,
  Globe,
  Vote,
  Shield
} from "lucide-react";

const annexIIICategories = [
  {
    icon: Users,
    title: "Biometrics",
    description: "Remote biometric identification and biometric categorisation of natural persons",
    examples: ["Facial recognition for identification", "Biometric categorisation systems", "Emotion recognition in certain contexts"]
  },
  {
    icon: Building,
    title: "Critical Infrastructure",
    description: "AI as safety components in management/operation of critical infrastructure",
    examples: ["Energy grid management", "Water supply systems", "Transport infrastructure", "Digital infrastructure"]
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description: "AI used in education and vocational training contexts",
    examples: ["Student assessment and scoring", "Admissions decisions", "Exam proctoring", "Learning progress evaluation"]
  },
  {
    icon: Briefcase,
    title: "Employment & Workers",
    description: "AI in employment, worker management, and self-employment access",
    examples: ["CV screening and recruitment", "Interview analysis", "Performance evaluation", "Task allocation", "Workforce monitoring"]
  },
  {
    icon: CreditCard,
    title: "Essential Services",
    description: "AI affecting access to essential private and public services",
    examples: ["Credit scoring", "Insurance pricing", "Emergency services dispatch", "Healthcare access", "Social benefits eligibility"]
  },
  {
    icon: Scale,
    title: "Law Enforcement",
    description: "AI used by law enforcement authorities",
    examples: ["Evidence assessment", "Risk of offending/reoffending", "Lie detection (polygraph)", "Criminal profiling"]
  },
  {
    icon: Globe,
    title: "Migration & Border",
    description: "AI in migration, asylum, and border control",
    examples: ["Visa application assessment", "Border patrol systems", "Asylum claim processing", "Security risk assessment"]
  },
  {
    icon: Vote,
    title: "Justice & Democracy",
    description: "AI in justice administration and democratic processes",
    examples: ["Case outcome research", "Judicial decision support", "Election-related systems", "Democratic process influence detection"]
  },
];

const faqQuestions = [
  {
    question: "What makes an AI system 'high-risk'?",
    answer: "An AI system is high-risk if it falls into one of the Annex III categories (biometrics, employment, credit, etc.) or is a safety component of a product covered by EU harmonization legislation (e.g., medical devices, vehicles)."
  },
  {
    question: "When do high-risk obligations apply?",
    answer: "Most high-risk AI obligations apply from 2 August 2026. However, for AI systems that are safety components of products already covered by EU law (Annex I), there's an extended transition until 2 August 2027."
  },
  {
    question: "What are the main deployer obligations for high-risk AI?",
    answer: "Deployers must: use systems according to instructions, assign competent human oversight, ensure input data relevance, monitor operation, report risks and incidents, keep logs for 6+ months, and inform workers (where applicable)."
  },
  {
    question: "Do I need a FRIA for high-risk AI?",
    answer: "A Fundamental Rights Impact Assessment (FRIA) is required for public bodies and certain private entities using high-risk AI, particularly those affecting individuals' rights. Use our FRIA tool to check your requirements."
  },
  {
    question: "How do I know if my AI is high-risk?",
    answer: "Use our High-Risk Checker tool to assess your AI systems against Annex III categories. The tool asks targeted questions to determine if your use case triggers high-risk classification."
  }
];

export default function HighRiskGuide() {
  const articleSchema = createArticleSchema({
    headline: "High-Risk AI Systems (Annex III): Complete Guide",
    description: "Comprehensive guide to EU AI Act high-risk AI classification. Learn about Annex III categories, deployer obligations, and how to determine if your AI is high-risk.",
    datePublished: "2025-01-12",
    dateModified: "2025-01-30",
    author: "Klarvo Compliance Team"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "High-Risk AI", url: "https://klarvo.io/guides/high-risk-ai-annex-iii" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="High-Risk AI Systems (Annex III) - EU AI Act Guide"
        description="Complete guide to EU AI Act high-risk AI classification. Learn about the 8 Annex III categories including employment, credit, education, and how to comply with deployer obligations."
        keywords={["high-risk AI", "Annex III", "EU AI Act high-risk", "AI risk classification", "deployer obligations", "AI compliance"]}
        canonical="https://klarvo.io/guides/high-risk-ai-annex-iii"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Guide</Badge>
              <Badge variant="outline">Annex III</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              High-Risk AI Systems (Annex III)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The EU AI Act defines 8 categories of high-risk AI in Annex III. If your AI falls into these categories, you have specific obligations as a deployer. Here's what you need to know.
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

      {/* Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Understanding High-Risk Classification</h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                High-risk AI systems are those that pose significant risks to health, safety, or fundamental rights. The EU AI Act identifies these through two mechanisms:
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Annex III Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Eight specific use-case areas defined in the Act: biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, and justice/democracy.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Safety Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    AI systems that are safety components of products already covered by EU harmonization legislation (medical devices, machinery, vehicles, etc.).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The 8 Annex III Categories</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {annexIIICategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">Examples:</span>
                      <ul className="mt-1 space-y-1">
                        {category.examples.map((ex, i) => (
                          <li key={i} className="text-muted-foreground flex items-center gap-2">
                            <Shield className="h-3 w-3 text-primary shrink-0" />
                            {ex}
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

      {/* Key Obligations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Key Deployer Obligations</h2>
            <Card>
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-4">If you deploy high-risk AI, you must:</p>
                    <ul className="space-y-3">
                      {[
                        "Use the system according to provider instructions",
                        "Assign human oversight to competent persons with authority to intervene",
                        "Ensure input data is relevant and representative (if under your control)",
                        "Monitor the system's operation and inform provider of risks",
                        "Keep logs under your control for at least 6 months",
                        "Inform workers before using AI that affects them",
                        "Report serious incidents to providers and authorities",
                        "Complete a FRIA if you're a public body or provide public services"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        title="Manage High-Risk AI Compliance"
        subtitle="Klarvo helps you classify, control, and evidence compliance for all your high-risk AI systems."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
      />
    </MarketingLayout>
  );
}
