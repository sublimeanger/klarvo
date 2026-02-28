import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { ContentBreadcrumb } from "@/components/marketing/ContentBreadcrumb";
import { HubNavigation } from "@/components/marketing/HubNavigation";
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
  Download,
  Shield,
  Search,
  Scale
} from "lucide-react";

const timeline = [
  { date: "1 Aug 2024", event: "EU AI Act entered into force", status: "past", desc: "The law became official." },
  { date: "2 Feb 2025", event: "Prohibited practices + AI literacy obligations apply", status: "current", desc: "Deadline passed. Bans on harmful AI and staff training rules are now live." },
  { date: "2 Aug 2025", event: "GPAI + governance rules apply", status: "future", desc: "Rules for General Purpose AI models and national authorities kick in." },
  { date: "2 Aug 2026", event: "Most obligations apply (including high-risk)", status: "future", desc: "The big deadline. High-risk deployer duties, transparency, and FRIA rules apply." },
  { date: "2 Aug 2027", event: "Extended transition for Annex I", status: "future", desc: "For AI embedded in products already regulated (cars, medical devices, toys)." },
];

const priorityActions = [
  {
    priority: 1,
    title: "Build Your AI Inventory",
    description: "You can't manage what you don't know. Survey your departments to find every AI tool in use—from ChatGPT to HR screening software. Create a central register.",
    link: "/templates/ai-inventory-template",
    linkText: "Get Inventory Template"
  },
  {
    priority: 2,
    title: "Screen for Prohibited Practices",
    description: "This applies NOW. Check that none of your AI systems perform banned activities (e.g., social scoring, emotion inference in the workplace). If they do, stop using them.",
    link: "/tools/prohibited-practices-screening",
    linkText: "Run Screening Tool"
  },
  {
    priority: 3,
    title: "Address AI Literacy",
    description: "This also applies NOW. Ensure staff have 'sufficient AI literacy'. Roll out a basic training module and an AI Acceptable Use Policy.",
    link: "/guides/ai-literacy-article-4",
    linkText: "Read AI Literacy Guide"
  },
  {
    priority: 4,
    title: "Classify Risk Levels",
    description: "Use Annex III criteria to tag each system in your inventory: Minimal, Limited, or High-Risk. This tells you what to do next.",
    link: "/tools/high-risk-checker-annex-iii",
    linkText: "Run Risk Checker"
  },
  {
    priority: 5,
    title: "Check Transparency Requirements",
    description: "Identify systems needing Article 50 disclosures (chatbots, deepfakes). Prepare the notices now so you're ready.",
    link: "/tools/transparency-obligation-checker",
    linkText: "Check Transparency"
  },
];

const smeMistakes = [
  {
    mistake: "\"We don't use AI\"",
    reality: "Most SMEs use AI without realizing it—embedded in SaaS tools, HR platforms, marketing software, or cybersecurity tools. Shadow AI is a major risk.",
    icon: Search
  },
  {
    mistake: "\"It's the vendor's problem\"",
    reality: "If you use (deploy) the system, you have legal obligations (Article 26). You cannot contract out your regulatory liability to a vendor.",
    icon: Shield
  },
  {
    mistake: "\"We'll deal with it in 2026\"",
    reality: "Prohibited practices and literacy rules are already live. Auditors and customers are starting to ask questions now. Waiting creates a massive backlog.",
    icon: Clock
  },
  {
    mistake: "\"We need expensive lawyers\"",
    reality: "For most SMEs, compliance is an operational task, not a legal one. Good documentation, policies, and standard processes (using tools like Klarvo) are often sufficient.",
    icon: Scale
  }
];

const faqQuestions = [
  {
    question: "Does the EU AI Act apply to SMEs?",
    answer: "Yes. The Act applies to all organizations using or deploying AI systems in the EU, regardless of size. While some fines are capped lower for SMEs, the obligations for high-risk systems are largely the same as for enterprises."
  },
  {
    question: "What if we only use standard software like ChatGPT?",
    answer: "If you use ChatGPT (General Purpose AI) for business, you need to ensure staff are trained (AI literacy), have a policy in place, and if you integrate it into customer-facing bots, you must disclose it (transparency). It is likely NOT high-risk, but minimal compliance is still required."
  },
  {
    question: "What happens if we don't comply?",
    answer: "Fines can be steep—up to €35M or 7% of turnover for prohibited practices. But the more immediate risk for SMEs is commercial: enterprise customers will refuse to buy from you if you can't prove AI governance, and investors will see it as a due diligence red flag."
  },
  {
    question: "How much does compliance cost?",
    answer: "It depends on your AI usage. If you have no high-risk systems, the cost is minimal—mainly staff time for training and inventory maintenance. If you deploy high-risk AI, you will need budget for conformity assessments, monitoring, and potentially external audit."
  }
];

export default function EUAIActForSMEs() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for SMEs: The Practical Roadmap",
    description: "A practical guide for small and medium businesses to comply with the EU AI Act. Covers timelines, priorities, and step-by-step actions.",
    datePublished: "2025-01-15",
    dateModified: "2026-02-28"
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
        keywords={["EU AI Act SME", "EU AI Act small business", "AI compliance guide SME", "EU AI Act guide", "AI regulation SME", "AI Act roadmap"]}
        canonical="https://klarvo.io/guides/eu-ai-act-for-smes"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />
      {/* Breadcrumb */}
      <section className="pt-8 pb-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContentBreadcrumb currentHref="/guides/eu-ai-act-for-smes" />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-8 md:py-16">
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
              The regulation is massive, but for most SMEs, compliance boils down to 5 key steps. Here is your practical roadmap to getting compliant without drowning in paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/templates/ai-inventory-template">
                  <Download className="mr-2 h-5 w-5" />
                  Download SME Starter Kit
                </Link>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Your Timeline</h2>
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
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{item.date}</div>
                      {item.status === "current" && (
                        <Badge variant="default" className="text-xs">Current Focus</Badge>
                      )}
                    </div>
                    <div className="font-medium">{item.event}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                  </div>
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
              Forget the 400-page legal text. Focus on these five steps to get 80% of the way there.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Common SME Mistakes</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {smeMistakes.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-destructive" />
                      {item.mistake}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {item.reality}
                    </p>
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

      {/* Related Content */}
      <RelatedContent 
        currentHref="/guides/eu-ai-act-for-smes" 
        title="Continue Learning" 
      />

      {/* Hub Navigation */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <HubNavigation />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Get Compliant?"
        subtitle="Klarvo helps SMEs achieve EU AI Act compliance without expensive consultants. Start with our free inventory tool."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Guides", href: "/guides" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
