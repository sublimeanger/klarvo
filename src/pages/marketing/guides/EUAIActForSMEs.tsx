import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  Calendar,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Download
} from "lucide-react";

const timeline = [
  { date: "1 Aug 2024", event: "EU AI Act entered into force", status: "past" },
  { date: "2 Feb 2025", event: "Prohibited practices + AI literacy obligations apply", status: "current" },
  { date: "2 Aug 2025", event: "GPAI + governance rules apply", status: "future" },
  { date: "2 Aug 2026", event: "Most obligations apply (including high-risk)", status: "future" },
  { date: "2 Aug 2027", event: "Extended transition for some Annex I high-risk AI", status: "future" },
];

const priorityActions = [
  {
    priority: 1,
    title: "Build Your AI Inventory",
    description: "Document every AI system you use or deploy. This is the foundation of compliance.",
    link: "/templates/ai-inventory-template",
    linkText: "Get Inventory Template"
  },
  {
    priority: 2,
    title: "Screen for Prohibited Practices",
    description: "Check that none of your AI uses fall under Article 5 prohibited practices (applies now).",
    link: "/tools/prohibited-practices-screening",
    linkText: "Run Screening Tool"
  },
  {
    priority: 3,
    title: "Address AI Literacy",
    description: "Ensure staff using AI have sufficient understanding (Article 4 applies now).",
    link: "/guides/ai-literacy-article-4",
    linkText: "Read AI Literacy Guide"
  },
  {
    priority: 4,
    title: "Classify Risk Levels",
    description: "Determine which systems are high-risk under Annex III.",
    link: "/tools/high-risk-checker-annex-iii",
    linkText: "Run Risk Checker"
  },
  {
    priority: 5,
    title: "Check Transparency Requirements",
    description: "Identify Article 50 disclosure obligations for AI interactions and synthetic content.",
    link: "/tools/transparency-obligation-checker",
    linkText: "Check Transparency"
  },
];

const faqQuestions = [
  {
    question: "Does the EU AI Act apply to SMEs?",
    answer: "Yes. The EU AI Act applies to all organizations using or deploying AI systems in the EU, regardless of size. However, SMEs benefit from some lighter requirements and support measures."
  },
  {
    question: "What should SMEs do first?",
    answer: "Start by building an AI inventory—documenting all AI systems you use. Then screen for prohibited practices (applies now), ensure AI literacy, and classify risk levels."
  },
  {
    question: "What are the current deadlines?",
    answer: "Prohibited practices and AI literacy requirements applied from 2 February 2025. Broader obligations including high-risk requirements apply from 2 August 2026."
  },
  {
    question: "Do we need to hire consultants?",
    answer: "Not necessarily. Tools like Klarvo are designed to help SMEs achieve compliance without expensive consultants. Start with our free templates and guided workflows."
  }
];

export default function EUAIActForSMEs() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for SMEs: The Practical Roadmap",
    description: "A practical guide for small and medium businesses to comply with the EU AI Act. Covers timelines, priorities, and step-by-step actions.",
    datePublished: "2025-01-15",
    dateModified: "2025-01-31"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "EU AI Act for SMEs", url: "https://klarvo.io/guides/eu-ai-act-for-smes" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act for SMEs: Practical Compliance Guide"
        description="The practical EU AI Act compliance guide for SMEs. Learn what you need to do, when, and how to prioritize your AI governance efforts."
        keywords={["EU AI Act SME", "EU AI Act small business", "AI compliance guide SME", "EU AI Act guide", "AI regulation SME"]}
        canonical="https://klarvo.io/guides/eu-ai-act-for-smes"
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
                15 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EU AI Act for SMEs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The practical roadmap for small and medium businesses. What you need to do, when, and how to prioritize—without the legal jargon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download SME Starter Kit
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/signup">
                  Start with Klarvo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Deadlines</h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-lg ${
                    item.status === "current" ? "bg-primary/10 border-2 border-primary" :
                    item.status === "past" ? "bg-muted" : "bg-background"
                  }`}
                >
                  <div className="shrink-0">
                    {item.status === "past" && <CheckCircle className="h-6 w-6 text-success" />}
                    {item.status === "current" && <AlertTriangle className="h-6 w-6 text-primary" />}
                    {item.status === "future" && <Calendar className="h-6 w-6 text-muted-foreground" />}
                  </div>
                  <div>
                    <div className="font-semibold">{item.date}</div>
                    <div className="text-sm text-muted-foreground">{item.event}</div>
                  </div>
                  {item.status === "current" && (
                    <Badge variant="default" className="ml-auto">Current</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priority Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Your Priority Actions</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Focus on these five steps to get compliant efficiently.
            </p>
            <div className="space-y-6">
              {priorityActions.map((action) => (
                <Card key={action.priority}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                        {action.priority}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                        <p className="text-muted-foreground mb-3">{action.description}</p>
                        <Button asChild variant="link" className="p-0 h-auto">
                          <Link to={action.link}>
                            {action.linkText}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What SMEs Get Wrong */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Mistakes to Avoid</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    "We don't use AI"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Many SMEs use AI without realizing it—chatbots, recommendation systems, automated screening tools. Audit your software stack carefully.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    "It's the vendor's problem"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As a deployer, you have obligations too—especially for high-risk systems. You can't outsource compliance entirely to your vendor.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    "We'll deal with it in 2026"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Prohibited practices and AI literacy requirements already apply. Don't wait—start your inventory and screening now.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    "We need expensive lawyers"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    While legal advice helps for complex cases, most SME compliance can be achieved with the right tools and templates.
                  </p>
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
        title="Ready to Get Compliant?"
        subtitle="Klarvo helps SMEs achieve EU AI Act compliance without expensive consultants."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
