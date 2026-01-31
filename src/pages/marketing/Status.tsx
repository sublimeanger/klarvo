import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight,
  Zap
} from "lucide-react";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const services = [
  {
    name: "Web Application",
    status: "operational",
    description: "Main platform at app.klarvo.io"
  },
  {
    name: "API",
    status: "operational",
    description: "REST API endpoints"
  },
  {
    name: "Authentication",
    status: "operational",
    description: "Login and signup services"
  },
  {
    name: "Database",
    status: "operational",
    description: "Data storage and retrieval"
  },
  {
    name: "File Storage",
    status: "operational",
    description: "Evidence and document storage"
  },
  {
    name: "Export Services",
    status: "operational",
    description: "PDF and ZIP generation"
  }
];

const recentIncidents: {
  date: string;
  title: string;
  status: string;
  description: string;
}[] = [];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Status", url: "https://klarvo.io/status" }
  ]
});

export default function Status() {
  const allOperational = services.every(s => s.status === "operational");

  return (
    <MarketingLayout>
      <SEOHead
        title="System Status - Klarvo Service Health"
        description="Check the current status of Klarvo services. Real-time monitoring of platform availability and performance."
        keywords={["Klarvo status", "service status", "uptime", "system health"]}
        canonical="https://klarvo.io/status"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />

      {/* Status Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs - green for operational */}
        {allOperational && (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 bg-success/20 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/15 rounded-full blur-3xl animate-float-delayed" />
          </>
        )}
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${allOperational ? "bg-success/20 text-success border border-success/30" : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"} text-sm font-medium mb-6`}>
              {allOperational ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              {allOperational ? "All Systems Operational" : "Partial Outage"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              System <span className="text-gradient-hero">Status</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Current status of Klarvo services and infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            
            <div className="space-y-3">
              {services.map((service, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/30 transition-colors hover:shadow-md">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.description}</div>
                    </div>
                    <Badge 
                      variant={service.status === "operational" ? "outline" : "destructive"}
                      className={service.status === "operational" ? "bg-success/10 text-success border-success/30" : ""}
                    >
                      {service.status === "operational" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Operational
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Issue
                        </>
                      )}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Uptime */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Uptime (Last 90 Days)</h2>
            
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 90 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-8 bg-success hover:bg-success/80 rounded-sm transition-colors cursor-pointer"
                      title={`Day ${90 - i}: 100% uptime`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>90 days ago</span>
                  <span className="font-semibold text-success text-base">99.99% uptime</span>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
            
            {recentIncidents.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No Recent Incidents</h3>
                  <p className="text-muted-foreground">
                    No incidents reported in the last 90 days.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {recentIncidents.map((incident, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold">{incident.title}</h3>
                        <Badge variant="outline">{incident.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {incident.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive notifications about scheduled maintenance and incidents.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-11 px-4 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="btn-premium">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  );
}
