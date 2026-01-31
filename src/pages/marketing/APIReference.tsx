import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  BookOpen,
  FileJson,
  Webhook,
  Key,
  Copy,
  Terminal,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";

const apiEndpoints = [
  {
    method: "GET",
    path: "/api/v1/ai-systems",
    description: "List all AI systems in your organization"
  },
  {
    method: "POST",
    path: "/api/v1/ai-systems",
    description: "Create a new AI system record"
  },
  {
    method: "GET",
    path: "/api/v1/ai-systems/{id}",
    description: "Get details of a specific AI system"
  },
  {
    method: "PUT",
    path: "/api/v1/ai-systems/{id}",
    description: "Update an AI system record"
  },
  {
    method: "DELETE",
    path: "/api/v1/ai-systems/{id}",
    description: "Delete an AI system record"
  },
  {
    method: "GET",
    path: "/api/v1/ai-systems/{id}/classification",
    description: "Get classification details for an AI system"
  },
  {
    method: "GET",
    path: "/api/v1/evidence",
    description: "List all evidence files"
  },
  {
    method: "POST",
    path: "/api/v1/evidence",
    description: "Upload a new evidence file"
  },
  {
    method: "GET",
    path: "/api/v1/vendors",
    description: "List all vendors"
  },
  {
    method: "GET",
    path: "/api/v1/controls",
    description: "List all controls and their status"
  },
  {
    method: "GET",
    path: "/api/v1/tasks",
    description: "List all compliance tasks"
  },
  {
    method: "GET",
    path: "/api/v1/exports/{type}",
    description: "Generate and download export packs"
  }
];

const features = [
  {
    icon: Zap,
    title: "RESTful API",
    description: "Standard REST endpoints with JSON responses. Easy to integrate with any programming language."
  },
  {
    icon: Lock,
    title: "OAuth 2.0 Authentication",
    description: "Secure authentication using industry-standard OAuth 2.0 with API keys and tokens."
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Real-time notifications for events like classification changes, evidence uploads, and task updates."
  },
  {
    icon: FileJson,
    title: "Comprehensive Responses",
    description: "Rich JSON responses with all the data you need, including nested relationships."
  }
];

const codeExample = `// Example: List all AI systems
const response = await fetch('https://api.klarvo.io/v1/ai-systems', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const { data } = await response.json();
// data = [{ id: "...", name: "...", classification: {...} }, ...]`;

const webhookExample = `// Webhook payload example
{
  "event": "classification.updated",
  "timestamp": "2025-01-30T10:30:00Z",
  "data": {
    "ai_system_id": "abc123",
    "risk_level": "high_risk_candidate",
    "classified_by": "user@company.com"
  }
}`;

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "API Reference", url: "https://klarvo.io/api" }
  ]
});

const webPageSchema = createWebPageSchema({
  name: "API Reference - Developer Documentation",
  description: "Klarvo REST API documentation. Full CRUD access, webhooks, and OAuth 2.0 authentication for AI compliance integration.",
  url: "https://klarvo.io/api",
  datePublished: "2025-01-01",
  dateModified: "2025-01-31"
});

export default function APIReference() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <MarketingLayout>
      <SEOHead
        title="API Reference - Developer Documentation"
        description="Klarvo REST API documentation. Full CRUD access, webhooks, and OAuth 2.0 authentication for AI compliance integration."
        keywords={["Klarvo API", "REST API", "compliance API", "developer docs", "API integration"]}
        canonical="https://klarvo.io/api"
      />
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="API Reference"
        title={
          <>
            <span className="text-foreground">Build with the</span>{" "}
            <span className="text-gradient-hero">Klarvo API</span>
          </>
        }
        subtitle="Integrate Klarvo into your workflows with our comprehensive REST API. Full CRUD access, real-time webhooks, and OAuth 2.0 authentication."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Features */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <Card key={i} className="group text-center hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 border-border/50">
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

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Terminal className="h-3 w-3 mr-1" />
                Quick Start
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Authenticate with your API key and start making requests
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Code Example */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      JavaScript / Node.js
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(codeExample)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-background/80 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-muted-foreground">{codeExample}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* Webhook Example */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Webhook className="h-5 w-5 text-primary" />
                      Webhook Payload
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(webhookExample)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-background/80 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-muted-foreground">{webhookExample}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints Reference */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <BookOpen className="h-3 w-3 mr-1" />
                Endpoints
              </Badge>
              <h2 className="text-3xl font-bold mb-4">API Endpoints</h2>
              <p className="text-muted-foreground">
                Complete list of available API endpoints
              </p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {apiEndpoints.map((endpoint, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                    >
                      <Badge
                        className={`font-mono text-xs w-16 justify-center ${
                          endpoint.method === "GET"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            : endpoint.method === "POST"
                            ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                            : endpoint.method === "PUT"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                            : "bg-red-500/10 text-red-600 border-red-500/30"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono text-foreground flex-1">
                        {endpoint.path}
                      </code>
                      <span className="text-sm text-muted-foreground hidden sm:block">
                        {endpoint.description}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-premium border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="outline" className="mb-4">
                      <Key className="h-3 w-3 mr-1" />
                      Authentication
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Secure API Access
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Klarvo uses OAuth 2.0 with API keys for secure authentication. 
                      Generate keys from your dashboard and include them in request headers.
                    </p>
                    <div className="space-y-3">
                      {[
                        "API keys with scoped permissions",
                        "Rotate keys without downtime",
                        "Audit log of all API calls",
                        "Rate limiting to prevent abuse"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background/80 rounded-xl p-6 font-mono text-sm border border-border/50">
                    <div className="text-muted-foreground mb-2">Header</div>
                    <div className="text-primary">Authorization:</div>
                    <div className="pl-4">Bearer sk_live_...</div>
                    <div className="mt-4 text-muted-foreground text-xs">
                      Include this header in all API requests
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
        title="Ready to Integrate?"
        subtitle="Contact us to request API access and get your developer credentials."
        primaryCta={{ label: "Request API Access", href: "/contact" }}
        secondaryCta={{ label: "View Documentation", href: "/docs" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
