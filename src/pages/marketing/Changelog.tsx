import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Bug, 
  Wrench,
  Zap,
  ArrowRight
} from "lucide-react";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createWebPageSchema } from "@/components/seo";

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
      return <Sparkles className="h-4 w-4 text-primary" />;
    case "fix":
      return <Bug className="h-4 w-4 text-amber-500" />;
    case "improvement":
      return <Wrench className="h-4 w-4 text-blue-500" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "feature":
      return <Badge className="bg-primary/20 text-primary border-primary/30">New Feature</Badge>;
    case "fix":
      return <Badge className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">Bug Fix</Badge>;
    case "improvement":
      return <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">Improvement</Badge>;
    default:
      return <Badge variant="secondary">{type}</Badge>;
  }
};

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Changelog", url: "https://klarvo.io/changelog" }
  ]
});

const webPageSchema = createWebPageSchema({
  name: "Changelog - Latest Updates & Features",
  description: "See what's new in Klarvo. Latest features, improvements, and bug fixes for the EU AI Act compliance platform.",
  url: "https://klarvo.io/changelog",
  datePublished: "2025-01-01",
  dateModified: "2025-01-31"
});

export default function Changelog() {
  return (
    <MarketingLayout>
      <SEOHead
        title="Changelog - Latest Updates & Features"
        description="See what's new in Klarvo. Latest features, improvements, and bug fixes for the EU AI Act compliance platform."
        keywords={["Klarvo changelog", "product updates", "new features", "release notes"]}
        canonical="https://klarvo.io/changelog"
      />
      <SchemaMarkup schema={[breadcrumbSchema, webPageSchema]} />

      {/* Hero Section */}
      <HeroSection
        badge="Changelog"
        title={
          <>
            <span className="text-foreground">What's</span>{" "}
            <span className="text-gradient-hero">New</span>
          </>
        }
        subtitle="Stay up to date with the latest features, improvements, and fixes in Klarvo."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Releases */}
      <section className="py-16 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Animated line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />
              
              {releases.map((release, i) => (
                <div key={i} className="relative pl-14 pb-12 last:pb-0 group">
                  {/* Node */}
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    {getTypeIcon(release.type)}
                  </div>
                  
                  <Card className="border-border/50 hover:border-primary/30 transition-colors hover:shadow-lg">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono bg-muted/50">v{release.version}</Badge>
                        {getTypeBadge(release.type)}
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>
                      <CardTitle className="text-xl">{release.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {release.changes.map((change, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-muted-foreground mb-6">
                Get notified when we ship new features and improvements.
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
