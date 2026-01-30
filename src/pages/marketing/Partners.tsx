import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  ArrowRight,
  CheckCircle2,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Headphones,
  Gift,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const partnerTypes = [
  {
    icon: Award,
    title: "Reseller Partners",
    description: "Sell Klarvo to your clients and earn competitive commissions on every deal.",
    benefits: [
      "Up to 30% revenue share",
      "Deal registration protection",
      "Sales enablement resources",
      "Co-branded materials"
    ]
  },
  {
    icon: Handshake,
    title: "Consulting Partners",
    description: "Complement your advisory services with Klarvo's platform for client implementations.",
    benefits: [
      "Implementation partner certification",
      "Referral commissions",
      "Priority support for clients",
      "Joint marketing opportunities"
    ]
  },
  {
    icon: TrendingUp,
    title: "Technology Partners",
    description: "Build integrations that connect Klarvo with your platform or services.",
    benefits: [
      "API access and documentation",
      "Technical support for integration",
      "Co-marketing on integration launch",
      "Listing in our marketplace"
    ]
  }
];

const partnerBenefits = [
  {
    icon: Gift,
    title: "Competitive Commissions",
    description: "Earn up to 30% on referred and closed deals, with recurring commissions on renewals."
  },
  {
    icon: BookOpen,
    title: "Sales Enablement",
    description: "Access pitch decks, sandbox environments, case studies, and competitive battlecards."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Partner-only support channel with faster response times and escalation paths."
  },
  {
    icon: Users,
    title: "Co-Marketing",
    description: "Joint webinars, case studies, and content collaboration to grow together."
  }
];

export default function Partners() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <HeroSection
        badge="Partner Program"
        title={
          <>
            <span className="text-foreground">Grow With</span>{" "}
            <span className="text-gradient-hero">Klarvo</span>
          </>
        }
        subtitle="Join our partner ecosystem and help organizations achieve EU AI Act compliance. Earn competitive commissions while making a difference."
        primaryCta={{ label: "Become a Partner", href: "/contact" }}
        variant="centered"
        showTrustBadges={false}
      />

      {/* Partner Types */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Partnership Options
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that fits your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnerTypes.map((type, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                    <type.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {type.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-start gap-2 group/item">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover/item:bg-primary/30 transition-colors">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Gift className="h-3 w-3 mr-1" />
              Benefits
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Partner Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invest in our partners' success with resources, support, and incentives.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partnerBenefits.map((benefit, i) => (
              <Card key={i} className="group text-center hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 border-border/50">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Partner?"
        subtitle="Fill out our partner application form and our team will be in touch within 48 hours to discuss next steps."
        primaryCta={{ label: "Apply Now", href: "/contact" }}
        secondaryCta={{ label: "Partner Resources", href: "/resources" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
