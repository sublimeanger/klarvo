import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  FileText,
  GraduationCap,
  Eye,
  Scale,
  Download,
  Clock,
  ArrowRight
} from "lucide-react";

const guides = [
  {
    icon: Building2,
    title: "EU AI Act for SMEs",
    description: "The practical roadmap for small and medium businesses. What you need to do, when, and how to prioritize.",
    href: "/guides/eu-ai-act-for-smes",
    category: "Getting Started",
    readTime: "15 min",
    popular: true,
  },
  {
    icon: FileText,
    title: "AI Inventory Under the EU AI Act",
    description: "How to build and maintain an AI system inventory that meets regulatory requirements.",
    href: "/guides/ai-inventory-eu-ai-act",
    category: "Core Concepts",
    readTime: "10 min",
  },
  {
    icon: AlertTriangle,
    title: "Is This an AI System?",
    description: "Plain-English guidance on determining if your software qualifies as an AI system under the Act.",
    href: "/guides/is-this-an-ai-system",
    category: "Scoping",
    readTime: "8 min",
    popular: true,
  },
  {
    icon: ShieldCheck,
    title: "Prohibited AI Practices (Article 5)",
    description: "What practices are banned, how to screen for them, and what to do if you find issues.",
    href: "/guides/prohibited-ai-practices-article-5",
    category: "Risk",
    readTime: "12 min",
  },
  {
    icon: AlertTriangle,
    title: "High-Risk AI (Annex III)",
    description: "Understanding the 8 high-risk categories and what triggers additional obligations.",
    href: "/guides/high-risk-ai-annex-iii",
    category: "Classification",
    readTime: "12 min",
    popular: true,
  },
  {
    icon: Scale,
    title: "Article 26 Deployer Obligations",
    description: "Operational playbook for deployers of high-risk AI systems: oversight, monitoring, logs, and more.",
    href: "/guides/article-26-deployer-obligations",
    category: "High-Risk",
    readTime: "15 min",
  },
  {
    icon: Eye,
    title: "Article 50 Transparency Obligations",
    description: "What to disclose, where, and how—covering AI interactions, synthetic content, and deepfakes.",
    href: "/guides/article-50-transparency-obligations",
    category: "Transparency",
    readTime: "10 min",
  },
  {
    icon: GraduationCap,
    title: "AI Literacy (Article 4)",
    description: "What 'sufficient AI literacy' means for SMEs and how to build a practical training programme.",
    href: "/guides/ai-literacy-article-4",
    category: "Training",
    readTime: "8 min",
  },
  {
    icon: ShieldCheck,
    title: "FRIA Under Article 27",
    description: "When you need a Fundamental Rights Impact Assessment, who does it, and what good looks like.",
    href: "/guides/fria-article-27",
    category: "High-Risk",
    readTime: "12 min",
  },
  {
    icon: Download,
    title: "Evidence Packs for Procurement",
    description: "How to prepare AI governance documentation that satisfies customer due diligence requests.",
    href: "/guides/evidence-pack-procurement",
    category: "Procurement",
    readTime: "10 min",
  },
];

const categories = ["All", "Getting Started", "Core Concepts", "Classification", "High-Risk", "Transparency", "Training", "Procurement"];

export default function GuidesHub() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Compliance Guides & Articles"
        description="Practical EU AI Act compliance guides for SMEs. Learn about deployer obligations, high-risk AI, transparency requirements, FRIA, and more."
        keywords={["EU AI Act guide", "AI compliance guide", "deployer obligations", "high-risk AI", "Article 26", "Article 50", "FRIA guide", "AI literacy"]}
        canonical="https://klarvo.io/guides"
      />
      <SchemaMarkup schema={breadcrumbSchema} />

      <HeroSection
        badge="Learn"
        title={
          <>
            <span className="text-foreground">EU AI Act</span>
            <br />
            <span className="text-gradient-hero">Compliance Guides</span>
          </>
        }
        subtitle="Practical, plain-English guides to EU AI Act compliance. Written for busy teams who need to understand what to do, not just what the law says."
        variant="centered"
      />

      {/* Category filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.href} to={guide.href} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <guide.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        {guide.popular && (
                          <Badge variant="default">Popular</Badge>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {guide.readTime}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit mb-2">{guide.category}</Badge>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-medium text-primary flex items-center">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Put This Into Practice?"
        subtitle="Klarvo turns these guides into action. Build your inventory, classify risk, and generate evidence packs—all in one platform."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Download Templates", href: "/templates" }}
      />
    </MarketingLayout>
  );
}
