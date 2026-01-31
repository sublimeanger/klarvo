import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  BarChart3,
  GitBranch,
  Globe,
  Layers,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const enterpriseFeatures = [
  {
    icon: Users,
    title: "Multi-Team Workspaces",
    description: "Organize AI systems by department, business unit, or subsidiary with granular role-based access control."
  },
  {
    icon: Lock,
    title: "SSO & Advanced Security",
    description: "SAML/OIDC single sign-on, EU data residency, and enterprise-grade security certifications."
  },
  {
    icon: BarChart3,
    title: "Executive Dashboards",
    description: "Board-ready reporting, audit readiness scores, and compliance trend analytics across the organization."
  },
  {
    icon: GitBranch,
    title: "API & Integrations",
    description: "Connect Klarvo to your existing GRC stack, ticketing systems, and CI/CD pipelines."
  },
  {
    icon: Globe,
    title: "Multi-Framework Support",
    description: "Map controls to ISO 42001, NIST AI RMF, and other frameworks alongside EU AI Act."
  },
  {
    icon: Layers,
    title: "Unlimited Scale",
    description: "Document hundreds of AI systems, manage thousands of evidence files, and support unlimited users."
  }
];

const enterpriseCapabilities = [
  "Dedicated customer success manager",
  "Custom implementation and onboarding",
  "Priority support with SLA guarantees",
  "Custom control library configuration",
  "White-label export packs with your branding",
  "Quarterly compliance review sessions",
  "Early access to new features",
  "Legal and regulatory advisory (partner network)"
];

const complianceChallenges = [
  {
    challenge: "Hundreds of AI systems across departments",
    solution: "Centralized inventory with department tagging and bulk import"
  },
  {
    challenge: "Multiple stakeholders need different views",
    solution: "Role-based access with separate compliance, legal, and executive views"
  },
  {
    challenge: "Existing GRC tools don't cover AI specifically",
    solution: "Purpose-built for AI Act with API integrations to your existing stack"
  },
  {
    challenge: "Board and auditors need professional documentation",
    solution: "One-click export packs that look like top-tier consultancy deliverables"
  }
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Enterprise", url: "https://klarvo.io/use-cases/enterprise" }
  ]
});

export default function EnterpriseUseCase() {
  return (
    <MarketingLayout>
      <SEOHead
        title="Enterprise AI Governance - EU AI Act Compliance at Scale"
        description="AI governance for enterprises. Multi-team workspaces, SSO, executive dashboards, and API integrations for large-scale EU AI Act compliance."
        keywords={["enterprise AI governance", "AI compliance at scale", "multi-team compliance", "corporate AI Act"]}
        canonical="https://klarvo.io/use-cases/enterprise"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/30 bg-primary/5">
              <Building2 className="h-4 w-4 mr-2 text-primary" />
              Enterprise
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI Governance at{" "}
              <span className="text-gradient-hero">Scale</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              When you have hundreds of AI systems, dozens of stakeholders, and board-level 
              visibility requirements—you need more than a compliance tool. You need a 
              governance platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-premium" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Enterprise-Grade
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for Organizations at Scale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Robust security, scalability, and integration capabilities for large organizations.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Enterprise Challenges, Solved
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the complexities of large-scale AI governance.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {complianceChallenges.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                        <span className="text-destructive font-bold text-lg">!</span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-destructive mb-1 uppercase tracking-wider">Challenge</div>
                        <div className="font-medium">{item.challenge}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-success mb-1 uppercase tracking-wider">Solution</div>
                        <div className="text-foreground">{item.solution}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                White-Glove Enterprise Support
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our enterprise customers get more than software—they get a partnership. 
                From implementation to ongoing optimization, we're with you every step.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {enterpriseCapabilities.map((capability, i) => (
                  <div key={i} className="flex items-start gap-2 group">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/30 transition-colors">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="glass-premium border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise Plan</CardTitle>
                  <CardDescription>Custom pricing for your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-5xl font-bold text-gradient">Custom</div>
                  <p className="text-muted-foreground">
                    Pricing based on your specific requirements, scale, and support needs.
                  </p>
                  <Button className="w-full btn-premium" size="lg" asChild>
                    <Link to="/contact">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Scale AI Governance?"
        subtitle="Let's discuss how Klarvo can support your organization's unique compliance requirements."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
