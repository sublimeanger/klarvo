import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Bug, 
  Wrench,
  Zap
} from "lucide-react";

const releases = [
  {
    version: "1.3.0",
    date: "January 28, 2025",
    type: "feature",
    title: "AI System Comparison & PDF Export",
    changes: [
      "Compare up to 3 AI systems side-by-side",
      "Generate comparison report PDFs",
      "Visual progress indicators for controls and evidence"
    ]
  },
  {
    version: "1.2.0",
    date: "January 20, 2025",
    type: "feature",
    title: "Enhanced Dashboard Analytics",
    changes: [
      "Audit readiness score with weighted categories",
      "Compliance trend charts",
      "Department risk distribution heatmap",
      "Improved classification breakdown visualization"
    ]
  },
  {
    version: "1.1.0",
    date: "January 12, 2025",
    type: "feature",
    title: "FRIA Workflow & Export Pack",
    changes: [
      "Complete FRIA wizard aligned with Article 27",
      "Fundamental Rights Impact Assessment PDF export",
      "Risk identification and mitigation tracking",
      "Approval workflow for FRIA completion"
    ]
  },
  {
    version: "1.0.1",
    date: "January 5, 2025",
    type: "fix",
    title: "Bug Fixes & Performance Improvements",
    changes: [
      "Fixed evidence upload progress indicator",
      "Improved wizard step navigation on mobile",
      "Resolved duplicate task creation issue",
      "Performance optimizations for large inventories"
    ]
  },
  {
    version: "1.0.0",
    date: "December 15, 2024",
    type: "feature",
    title: "Initial Release",
    changes: [
      "AI System Inventory with 20-step wizard",
      "Risk classification engine",
      "Control library with implementation tracking",
      "Evidence vault with approval workflows",
      "Policy templates and version history",
      "Training and AI literacy tracking",
      "One-click PDF/ZIP export packs"
    ]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Sparkles className="h-4 w-4" />;
    case "fix":
      return <Bug className="h-4 w-4" />;
    case "improvement":
      return <Wrench className="h-4 w-4" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "feature":
      return <Badge className="bg-primary/20 text-primary border-primary/30">New Feature</Badge>;
    case "fix":
      return <Badge variant="outline">Bug Fix</Badge>;
    case "improvement":
      return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800">Improvement</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

export default function Changelog() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Changelog
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              What's{" "}
              <span className="text-gradient">New</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay up to date with the latest features, improvements, and fixes in Klarvo.
            </p>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              {releases.map((release, i) => (
                <div key={i} className="relative pl-12 pb-12 last:pb-0">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    {getTypeIcon(release.type)}
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono">v{release.version}</Badge>
                        {getTypeBadge(release.type)}
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>
                      <CardTitle className="text-xl">{release.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {release.changes.map((change, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get notified when we ship new features and improvements.
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
