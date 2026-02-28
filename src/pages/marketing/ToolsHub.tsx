import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createFAQSchema } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileSearch, 
  AlertTriangle, 
  Eye, 
  ShieldAlert,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const tools = [
  {
    icon: FileSearch,
    title: "AI System Definition Checker",
    description: "Determine if your software qualifies as an 'AI system' under the EU AI Act definition.",
    href: "/tools/ai-system-definition-checker",
    category: "Scoping",
    popular: true,
    benefits: ["Clear in-scope/out-of-scope result", "Rationale you can document", "Save as classification memo"],
  },
  {
    icon: AlertTriangle,
    title: "Annex III High-Risk Checker",
    description: "Check if your AI system falls into a high-risk category under Annex III of the EU AI Act.",
    href: "/tools/high-risk-checker-annex-iii",
    category: "Classification",
    popular: true,
    benefits: ["Covers all 8 Annex III categories", "Get your Article 26 checklist", "Automatic FRIA trigger check"],
  },
  {
    icon: Eye,
    title: "Transparency Obligations Checker",
    description: "Identify which Article 50 transparency obligations apply to your AI system.",
    href: "/tools/transparency-obligation-checker",
    category: "Transparency",
    popular: true,
    benefits: ["Check all 4 disclosure scenarios", "Generate disclosure copy", "Get evidence requirements"],
  },
  {
    icon: ShieldAlert,
    title: "Prohibited Practices Screening",
    description: "Screen your AI use case against Article 5 prohibited practices before deployment.",
    href: "/tools/prohibited-practices-screening",
    category: "Risk",
    benefits: ["8 prohibition checks", "Escalation guidance", "Legal review trigger"],
  },
];

const faqQuestions = [
  {
    question: "Are these tools free to use?",
    answer: "Yes, all compliance checking tools are free. Results can be saved and imported into Klarvo for ongoing tracking and documentation."
  },
  {
    question: "How accurate are the results?",
    answer: "These tools are based on the published EU AI Act text and European Commission guidance. For complex edge cases, we recommend review by a qualified legal professional."
  },
  {
    question: "Can I save and export the results?",
    answer: "Yes. Each tool generates a result you can download as a PDF memo. Klarvo users can save results directly to their AI system records."
  },
  {
    question: "Do you update the tools when regulations change?",
    answer: "Absolutely. We monitor European Commission guidance and update our tools accordingly. The prohibited practices and AI literacy obligations applied from February 2025."
  }
];

export default function ToolsHub() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Tools", url: "https://klarvo.io/tools" }
    ]
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  return (
    <MarketingLayout>
      <SEOHead
        title="Free EU AI Act Compliance Tools & Checkers"
        description="Free AI compliance tools: AI system definition checker, high-risk Annex III checker, Article 50 transparency checker, and prohibited practices screening."
        keywords={["AI system definition checker", "high-risk AI checker", "Article 50 checker", "prohibited AI practices screening", "EU AI Act tools", "AI compliance checker"]}
        canonical="https://klarvo.io/tools"
      />
      <SchemaMarkup schema={[breadcrumbSchema, faqSchema]} />

      <HeroSection
        badge="Free Tools"
        title={
          <>
            <span className="text-foreground">EU AI Act</span>
            <br />
            <span className="text-gradient-hero">Compliance Checkers</span>
          </>
        }
        subtitle="Free interactive tools to check your AI systems against EU AI Act requirements. Get instant results with documentation you can use."
        variant="centered"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.href} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <tool.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      {tool.popular && (
                        <Badge variant="default">Popular</Badge>
                      )}
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {tool.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link to={tool.href}>
                      Run Checker
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">How The Checkers Work</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Answer a few questions about your AI system. Get an instant result with rationale.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">1</div>
              <h3 className="font-semibold">Answer Questions</h3>
              <p className="text-sm text-muted-foreground">Simple yes/no questions about your AI system's use case and capabilities.</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">2</div>
              <h3 className="font-semibold">Get Your Result</h3>
              <p className="text-sm text-muted-foreground">Instant classification with clear rationale based on EU AI Act criteria.</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">3</div>
              <h3 className="font-semibold">Document & Act</h3>
              <p className="text-sm text-muted-foreground">Download your result as a memo or import into Klarvo for tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Related Resources */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-6">Explore More Resources</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/guides" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                Compliance Guides
              </Link>
              <Link to="/templates" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                Free Templates
              </Link>
              <Link to="/samples" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                Sample Outputs
              </Link>
              <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                Blog
              </Link>
              <Link to="/eu-ai-act" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                Regulation Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Full Compliance Management?"
        subtitle="Tools are great for checking. Klarvo gives you the full system: inventory, evidence vault, approvals, and audit-ready exports."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
      />
    </MarketingLayout>
  );
}
