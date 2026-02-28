import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  ArrowRight,
  MapPin,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Globe
} from "lucide-react";

const openPositions = [
  { title: "Senior Full-Stack Engineer", department: "Engineering", location: "Remote (EU)", type: "Full-time" },
  { title: "Product Manager", department: "Product", location: "Remote (EU)", type: "Full-time" },
  { title: "Customer Success Manager", department: "Customer Success", location: "Remote (EU)", type: "Full-time" },
  { title: "Content Marketing Manager", department: "Marketing", location: "Remote (EU)", type: "Full-time" }
];

const benefits = [
  { icon: Globe, title: "Remote-First", description: "Work from anywhere in the EU." },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and wellness stipend." },
  { icon: BookOpen, title: "Learning Budget", description: "€1,500/year for professional development." },
  { icon: Coffee, title: "Flexible Hours", description: "Work when you're most productive." },
  { icon: Zap, title: "Latest Tools", description: "Best-in-class hardware and software." },
  { icon: Briefcase, title: "Equity Options", description: "Share in the company's success." }
];

export default function Careers() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Careers", url: "https://klarvo.io/careers" }
    ]
  });

  const webPageSchema = createWebPageSchema({
    name: "Careers at Klarvo - Join Our Team",
    description: "Join Klarvo and help build the future of AI governance. Remote-first culture, competitive benefits, and meaningful work.",
    url: "https://klarvo.io/careers",
    datePublished: "2025-01-01",
    dateModified: "2026-02-28"
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Careers at Klarvo - Join Our Team"
        description="Join Klarvo and help build the future of AI governance. Remote-first culture, competitive benefits, and meaningful work."
        keywords={["Klarvo careers", "AI compliance jobs", "remote jobs EU", "startup jobs"]}
        canonical="https://klarvo.io/careers"
      />
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />

      <HeroSection
        badge="We're Hiring"
        title={<><span className="text-foreground">Join the</span> <span className="text-gradient-hero">Klarvo Team</span></>}
        subtitle="Help us build the future of AI governance. We're looking for passionate people who want to make AI compliance accessible to everyone."
        primaryCta={{ label: "View Open Positions", href: "#openings" }}
        variant="centered"
        showTrustBadges={false}
      />

      {/* Benefits */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <benefit.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-center text-muted-foreground mb-4">The positions listed below are indicative of the roles we're looking to fill.</p>
          <p className="text-center text-muted-foreground mb-12">Don't see a perfect fit? Email <a href="mailto:careers@klarvo.io" className="text-primary hover:underline">careers@klarvo.io</a> to discuss current openings.</p>
          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position, i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-all hover:border-primary/30">
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{position.department}</Badge>
                      <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{position.location}</Badge>
                      <Badge variant="outline">{position.type}</Badge>
                    </div>
                  </div>
                  <Button className="shrink-0" asChild>
                    <a href={`mailto:careers@klarvo.io?subject=Application: ${position.title}`}>
                      Apply <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-6">Send us your CV at careers@klarvo.io</p>
          <Button size="lg" asChild>
            <a href="mailto:careers@klarvo.io">Send Your CV <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}
