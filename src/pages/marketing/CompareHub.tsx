import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileSpreadsheet, 
  Building,
  ArrowRight,
  Check,
  X
} from "lucide-react";

const comparisons = [
  {
    icon: FileSpreadsheet,
    title: "Klarvo vs Spreadsheets",
    description: "Why dedicated AI compliance software beats spreadsheets for EU AI Act governance.",
    href: "/compare/klarvo-vs-spreadsheets",
    popular: true,
  },
  {
    icon: Building,
    title: "Klarvo vs Trust Platforms",
    description: "How purpose-built AI compliance differs from general GRC and trust management platforms.",
    href: "/compare/klarvo-vs-trust-platforms",
  },
];

export default function CompareHub() {
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Compare", url: "https://klarvo.io/compare" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Compare Klarvo - EU AI Act Compliance Software Comparison"
        description="Compare Klarvo with spreadsheets and enterprise GRC platforms. See why purpose-built AI compliance software is better for EU AI Act governance."
        keywords={["AI compliance software comparison", "Klarvo vs spreadsheets", "AI governance tool comparison", "EU AI Act software comparison"]}
        canonical="https://klarvo.io/compare"
      />
      <SchemaMarkup schema={breadcrumbSchema} />

      <HeroSection
        badge="Compare"
        title={
          <>
            <span className="text-foreground">Why Choose</span>
            <br />
            <span className="text-gradient-hero">Klarvo?</span>
          </>
        }
        subtitle="See how purpose-built AI compliance software compares to spreadsheets and general GRC platforms."
        variant="centered"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {comparisons.map((comparison) => (
              <Link key={comparison.href} to={comparison.href} className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <comparison.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {comparison.title}
                          </CardTitle>
                          {comparison.popular && (
                            <Badge variant="default">Popular</Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">{comparison.description}</CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick comparison table */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Spreadsheets</th>
                  <th className="text-center py-4 px-4">GRC Platforms</th>
                  <th className="text-center py-4 px-4 bg-primary/5">Klarvo</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { feature: "AI-specific classification logic", spreadsheet: false, grc: false, klarvo: true },
                  { feature: "Article 26 deployer checklist", spreadsheet: false, grc: false, klarvo: true },
                  { feature: "FRIA workflow & reports", spreadsheet: false, grc: false, klarvo: true },
                  { feature: "Evidence vault with approvals", spreadsheet: false, grc: true, klarvo: true },
                  { feature: "Audit-ready PDF exports", spreadsheet: false, grc: "Partial", klarvo: true },
                  { feature: "Free tier available", spreadsheet: true, grc: false, klarvo: true },
                  { feature: "Setup time", spreadsheet: "Weeks", grc: "Months", klarvo: "Hours" },
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.spreadsheet === "boolean" ? (
                        row.spreadsheet ? <Check className="h-5 w-5 text-success mx-auto" /> : <X className="h-5 w-5 text-destructive mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{row.spreadsheet}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.grc === "boolean" ? (
                        row.grc ? <Check className="h-5 w-5 text-success mx-auto" /> : <X className="h-5 w-5 text-destructive mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{row.grc}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary/5">
                      {typeof row.klarvo === "boolean" ? (
                        row.klarvo ? <Check className="h-5 w-5 text-success mx-auto" /> : <X className="h-5 w-5 text-destructive mx-auto" />
                      ) : (
                        <span className="font-medium text-primary">{row.klarvo}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection
        title="See Klarvo in Action"
        subtitle="Start free. Get your first AI system classified in under 10 minutes."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See Features", href: "/features" }}
      />
    </MarketingLayout>
  );
}
