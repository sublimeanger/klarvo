import { MarketingLayout } from "@/components/marketing/MarketingLayout";
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
  Gift
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
    description: "Access pitch decks, demo environments, case studies, and competitive battlecards."
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
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Handshake className="h-4 w-4" />
              Partner Program
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Grow With{" "}
              <span className="text-gradient">Klarvo</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Join our partner ecosystem and help organizations achieve EU AI Act 
              compliance. Earn competitive commissions while making a difference.
            </p>
            
            <Button size="lg" asChild>
              <Link to="/contact">
                Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that fits your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnerTypes.map((type, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Partner Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invest in our partners' success with resources, support, and incentives.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partnerBenefits.map((benefit, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Partner?
              </h2>
              <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                Fill out our partner application form and our team will be in touch 
                within 48 hours to discuss next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/resources">Partner Resources</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  );
}
