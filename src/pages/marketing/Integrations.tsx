import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Puzzle, 
  ArrowRight,
  CheckCircle2,
  Zap,
  RefreshCw,
  Database,
  MessageSquare,
  Calendar,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";

const plannedIntegrations = [
  {
    name: "Jira",
    category: "Project Management",
    description: "Sync compliance tasks with Jira issues and track progress across teams.",
    icon: "🎫"
  },
  {
    name: "Slack",
    category: "Communication",
    description: "Get notifications, reminders, and alerts delivered to your Slack channels.",
    icon: "💬"
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    description: "Receive compliance updates and collaborate within Microsoft Teams.",
    icon: "👥"
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    description: "Import documents from Google Drive and sync with Google Calendar.",
    icon: "📁"
  }
];

const comingSoonIntegrations = [
  {
    name: "ServiceNow",
    category: "IT Service Management",
    description: "Connect AI governance to your ServiceNow workflows.",
    icon: "🔧"
  },
  {
    name: "OneTrust",
    category: "Privacy Management",
    description: "Link AI systems to your privacy program and DPIAs.",
    icon: "🛡️"
  },
  {
    name: "Workday",
    category: "HR Systems",
    description: "Track AI literacy training completion from Workday.",
    icon: "👔"
  },
  {
    name: "Salesforce",
    category: "CRM",
    description: "Document customer-facing AI systems from Salesforce.",
    icon: "☁️"
  }
];

const integrationFeatures = [
  {
    icon: Zap,
    title: "Real-Time Sync",
    description: "Changes in Klarvo automatically reflect in connected systems and vice versa."
  },
  {
    icon: RefreshCw,
    title: "Bidirectional Updates",
    description: "Update task status, add evidence, or modify records from either platform."
  },
  {
    icon: Database,
    title: "Secure Data Transfer",
    description: "All integrations use encrypted connections with OAuth 2.0 authentication."
  }
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Integrations", url: "https://klarvo.io/integrations" }
  ]
});

const webPageSchema = createWebPageSchema({
  name: "Integrations - Connect Your Compliance Workflow",
  description: "Integrate Klarvo with Jira, Slack, Teams, and more. Seamlessly connect EU AI Act compliance to your existing tools and workflows.",
  url: "https://klarvo.io/integrations",
  datePublished: "2025-01-01",
  dateModified: "2026-02-28"
});

export default function Integrations() {
  return (
    <MarketingLayout>
      <SEOHead
        title="Integrations - Connect Your Compliance Workflow"
        description="Integrate Klarvo with Jira, Slack, Teams, and more. Seamlessly connect EU AI Act compliance to your existing tools and workflows."
        keywords={["Klarvo integrations", "compliance integrations", "Jira AI compliance", "Slack compliance notifications"]}
        canonical="https://klarvo.io/integrations"
      />
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="Integrations"
        title={
          <>
            <span className="text-foreground">Connect Klarvo to Your</span>{" "}
            <span className="text-gradient-hero">Workflow</span>
          </>
        }
        subtitle="Integrate Klarvo with the tools you already use—project management, communication, and GRC platforms—for seamless compliance workflows."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Integration Features */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {integrationFeatures.map((feature, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-1 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planned Integrations */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Calendar className="h-3 w-3 mr-1" />
              On the Roadmap
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Planned Integrations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building integrations with the tools you already use. Let us know which integrations matter most to you.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {plannedIntegrations.map((integration, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 border-border/50">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{integration.icon}</div>
                  <Badge variant="outline" className="mb-2">{integration.category}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {integration.description}
                  </p>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Calendar className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-3xl font-bold mb-4">On the Roadmap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're constantly expanding our integration ecosystem. Request early access below.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {comingSoonIntegrations.map((integration, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 border-border/50">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                    {integration.icon}
                  </div>
                  <Badge variant="secondary" className="mb-2">{integration.category}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {integration.description}
                  </p>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-premium border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="outline" className="mb-4">
                      <Zap className="h-3 w-3 mr-1" />
                      Developer API
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Developer API
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Need programmatic access? A REST API for custom integrations is on our roadmap. 
                      Contact us to discuss your needs and get early access.
                    </p>
                    <div className="space-y-2 mb-6">
                      {[
                        "Full CRUD operations on all resources",
                        "Webhooks for real-time events",
                        "OAuth 2.0 authentication"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm group">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{item} <Badge variant="outline" className="ml-1 text-xs">Planned</Badge></span>
                        </div>
                      ))}
                    </div>
                    <Button className="btn-premium" asChild>
                      <Link to="/contact">
                        Request Early Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="bg-background/80 rounded-xl p-6 font-mono text-sm border border-border/50">
                      <div className="text-muted-foreground">// Example API call</div>
                      <div className="text-primary mt-2">GET</div>
                      <div>/api/v1/ai-systems</div>
                      <div className="mt-4 text-muted-foreground">// Returns all AI systems</div>
                      <div className="mt-2 text-xs text-muted-foreground/60">Response: 200 OK</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Don't See Your Tool?"
        subtitle="We're always adding new integrations. Let us know what you need and we'll prioritize accordingly."
        primaryCta={{ label: "Request an Integration", href: "/contact" }}
        secondaryCta={{ label: "View All Features", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
