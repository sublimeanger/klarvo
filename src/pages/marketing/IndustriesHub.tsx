import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Landmark,
  HeartPulse,
  Briefcase,
  ArrowRight
} from "lucide-react";

const industries = [
  {
    icon: Users,
    title: "HR & Recruitment",
    description: "AI in hiring is high-risk under Annex III. Get compliant with Article 26 obligations for CV screening, interview tools, and performance systems.",
    href: "/industries/hr-recruitment-ai-act",
    badge: "High-Risk",
    popular: true,
  },
  {
    icon: Landmark,
    title: "Fintech & Credit",
    description: "Credit scoring and insurance AI falls under high-risk. Ensure your models meet deployer obligations and transparency requirements.",
    href: "/industries/fintech-credit-ai-act",
    badge: "High-Risk",
  },
  {
    icon: Briefcase,
    title: "SaaS Companies",
    description: "Selling AI-powered products into the EU? Get your evidence packs ready for customer procurement questionnaires.",
    href: "/industries/saas-ai-act",
    badge: "Procurement",
    popular: true,
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Medical AI faces both EU AI Act and MDR requirements. Navigate the intersection with confidence.",
    href: "/use-cases/healthcare",
    badge: "Regulated",
  },
];

export default function IndustriesHub() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Industries", url: "https://klarvo.io/industries" }
    ]
  });

  const webPageSchema = createWebPageSchema({
    name: "EU AI Act Compliance by Industry",
    description: "Industry-specific EU AI Act compliance guides for HR, Fintech, SaaS, and Healthcare. Understand your obligations and get compliant faster.",
    url: "https://klarvo.io/industries",
    datePublished: "2025-01-01",
    dateModified: "2025-01-31"
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act Compliance by Industry"
        description="Industry-specific EU AI Act compliance guides for HR, Fintech, SaaS, and Healthcare. Understand your obligations and get compliant faster."
        keywords={["EU AI Act HR", "AI Act fintech", "AI Act SaaS", "AI Act healthcare", "industry AI compliance", "sector AI regulation"]}
        canonical="https://klarvo.io/industries"
      />
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />

      <HeroSection
        badge="By Industry"
        title={
          <>
            <span className="text-foreground">EU AI Act Compliance</span>
            <br />
            <span className="text-gradient-hero">For Your Sector</span>
          </>
        }
        subtitle="Different industries face different AI Act obligations. Find guidance tailored to your sector's specific requirements and risk profiles."
        variant="centered"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6">
            {industries.map((industry) => (
              <Link key={industry.href} to={industry.href} className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <industry.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {industry.title}
                          </CardTitle>
                          <Badge variant={industry.badge === "High-Risk" ? "destructive" : "outline"}>
                            {industry.badge}
                          </Badge>
                          {industry.popular && (
                            <Badge variant="default">Popular</Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">{industry.description}</CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get Industry-Specific Guidance"
        subtitle="Klarvo's classification engine automatically applies the right obligations based on your AI use case and industry context."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Features", href: "/features" }}
      />
    </MarketingLayout>
  );
}
