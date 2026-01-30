import { MarketingLayout } from "@/components/marketing/MarketingLayout";
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
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

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

export default function EnterpriseUseCase() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="outline">
              <Building2 className="h-3 w-3 mr-1" />
              Enterprise
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI Governance at{" "}
              <span className="text-gradient">Scale</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              When you have hundreds of AI systems, dozens of stakeholders, and board-level 
              visibility requirements—you need more than a compliance tool. You need a 
              governance platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/demo">
                  Schedule Enterprise Demo
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for organizations that need robust security, scalability, and integration.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-destructive font-bold text-sm">!</span>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Challenge</div>
                        <div className="font-medium">{item.challenge}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Klarvo Solution</div>
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
      <section className="py-20 bg-muted/30">
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
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/30 border-primary-200 dark:border-primary-800">
                <CardHeader>
                  <CardTitle>Enterprise Plan</CardTitle>
                  <CardDescription>Custom pricing for your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">Custom</div>
                  <p className="text-muted-foreground">
                    Pricing based on your specific requirements, scale, and support needs.
                  </p>
                  <Button className="w-full" size="lg" asChild>
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
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Scale AI Governance?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Let's discuss how Klarvo can support your organization's unique compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/demo">
                Schedule Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
