import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertCircle,
  Clock
} from "lucide-react";

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

export default function Status() {
  const allOperational = services.every(s => s.status === "operational");

  return (
    <MarketingLayout>
      {/* Status Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className={`absolute inset-0 ${allOperational ? "bg-gradient-to-br from-success/10 via-background to-success/5" : "bg-gradient-to-br from-warning/10 via-background to-warning/5"}`} />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${allOperational ? "bg-success/20 text-success" : "bg-warning/20 text-warning"} text-sm font-medium mb-6`}>
              {allOperational ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {allOperational ? "All Systems Operational" : "Partial Outage"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              System Status
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Current status of Klarvo services and infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            
            <div className="space-y-3">
              {services.map((service, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex items-center justify-between">
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Uptime (Last 90 Days)</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 90 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-8 bg-success rounded-sm"
                      title={`Day ${90 - i}: 100% uptime`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>90 days ago</span>
                  <span className="font-medium text-foreground">99.99% uptime</span>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
            
            {recentIncidents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No incidents reported in the last 90 days.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {recentIncidents.map((incident, i) => (
                  <Card key={i}>
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Subscribe to receive notifications about scheduled maintenance and incidents.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 px-4 rounded-md border border-input bg-background text-sm"
            />
            <button className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
