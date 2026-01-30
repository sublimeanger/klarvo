import { MarketingLayout } from "@/components/marketing/MarketingLayout";
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
  FileText,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const availableIntegrations = [
  {
    name: "Jira",
    category: "Project Management",
    description: "Sync compliance tasks with Jira issues and track progress across teams.",
    status: "available",
    icon: "🎫"
  },
  {
    name: "Slack",
    category: "Communication",
    description: "Get notifications, reminders, and alerts delivered to your Slack channels.",
    status: "available",
    icon: "💬"
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    description: "Receive compliance updates and collaborate within Microsoft Teams.",
    status: "available",
    icon: "👥"
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    description: "Import documents from Google Drive and sync with Google Calendar.",
    status: "available",
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

export default function Integrations() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Puzzle className="h-4 w-4" />
              Integrations
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Connect Klarvo to Your{" "}
              <span className="text-gradient">Workflow</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Integrate Klarvo with the tools you already use—project management, 
              communication, and GRC platforms—for seamless compliance workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {integrationFeatures.map((feature, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
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

      {/* Available Integrations */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect these integrations today to streamline your compliance workflow.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {availableIntegrations.map((integration, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{integration.icon}</div>
                  <Badge variant="outline" className="mb-2">{integration.category}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {integration.description}
                  </p>
                  <Badge className="bg-success/20 text-success border-success/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're constantly expanding our integration ecosystem. Request early access below.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {comingSoonIntegrations.map((integration, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 opacity-80 hover:opacity-100">
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
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/30 border-primary-200 dark:border-primary-800">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Build Custom Integrations
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Need something specific? Our REST API gives you full access to 
                      Klarvo's data and functionality for custom integrations.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Full CRUD operations on all resources
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Webhooks for real-time events
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        OAuth 2.0 authentication
                      </div>
                    </div>
                    <Button asChild>
                      <Link to="/contact">
                        Request API Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="bg-background/80 rounded-lg p-4 font-mono text-sm">
                      <div className="text-muted-foreground">// Example API call</div>
                      <div className="text-primary">GET</div>
                      <div>/api/v1/ai-systems</div>
                      <div className="mt-2 text-muted-foreground">// Returns all AI systems</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Tool?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're always adding new integrations. Let us know what you need and 
            we'll prioritize accordingly.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Request an Integration
            </Link>
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}
