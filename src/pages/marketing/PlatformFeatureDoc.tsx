import { useState } from "react";
import { logger } from "@/lib/logger";
import { MarketingLayout } from "@/components/marketing";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Loader2, CheckCircle2, Shield, BookOpen, Scale, Database, Zap, Users } from "lucide-react";
import { generatePlatformFeatureDocPDF } from "@/components/exports/PlatformFeatureDocPDF";
import { toast } from "sonner";

export default function PlatformFeatureDoc() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generatePlatformFeatureDocPDF();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Klarvo_Feature_Function_Reference_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsComplete(true);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      logger.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sections = [
    { icon: BookOpen, title: "Platform Overview & User Roles", section: "Section 1" },
    { icon: Shield, title: "Authentication & Onboarding Flows", section: "Section 2" },
    { icon: Scale, title: "Dashboard (Metrics, Charts, Alerts)", section: "Section 3" },
    { icon: FileText, title: "AI System Inventory (20-Step Wizard)", section: "Section 4" },
    { icon: Shield, title: "Classification Engine (4-Step)", section: "Section 5" },
    { icon: Scale, title: "FRIA Workflow (Article 27)", section: "Section 6" },
    { icon: FileText, title: "Controls & Obligations (50+ Controls)", section: "Section 7" },
    { icon: Database, title: "Evidence Vault & Approvals", section: "Section 8" },
    { icon: Users, title: "Vendors, Policies, Training, Tasks", section: "Sections 9-12" },
    { icon: Shield, title: "Incidents, Disclosures, Exports", section: "Sections 13-15" },
    { icon: Zap, title: "AI Engine (5 Features)", section: "Section 16" },
    { icon: FileText, title: "Provider/Importer/Distributor Tracks", section: "Sections 17-18" },
    { icon: Database, title: "Discovery, Billing, Team, Settings", section: "Sections 19-22" },
    { icon: Shield, title: "Marketing Pages & Security", section: "Sections 23-24" },
    { icon: FileText, title: "Route Map (All Routes)", section: "Appendix A" },
    { icon: Database, title: "Database Tables & Edge Functions", section: "Appendices B-C" },
  ];

  return (
    <MarketingLayout>
      <SEOHead
        title="Platform Feature & Function Reference | Klarvo"
        description="Download the complete Klarvo feature and function reference document for testing protocol development."
        canonical="/platform-doc"
        noindex
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Internal Document • For Testing Protocols</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Feature & Function Reference</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete documentation of all Klarvo features, workflows, field definitions, and technical architecture — designed for QA testers and reviewers.
            </p>
          </div>

          <Card className="mb-8 border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Klarvo — Complete Feature & Function Reference</CardTitle>
              <CardDescription className="text-base">
                24 sections + 3 appendices • All wizard fields documented • Every route mapped
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {sections.map((section, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <section.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.section}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="btn-premium gap-2 min-w-[200px]"
                    onClick={handleDownload}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <><Loader2 className="h-5 w-5 animate-spin" />Generating PDF...</>
                    ) : isComplete ? (
                      <><CheckCircle2 className="h-5 w-5" />Download Again</>
                    ) : (
                      <><Download className="h-5 w-5" />Download PDF</>
                    )}
                  </Button>
                </div>
                {isComplete && (
                  <p className="text-sm text-muted-foreground text-center mt-4">✓ PDF generated successfully. Check your downloads folder.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">What's Inside</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Every feature, workflow, field definition, validation rule, and auto-action documented. Includes the complete 20-step AI system intake wizard, 50+ control library, all export types, 5 AI engine features, provider/importer/distributor tracks, complete route map, database schema, and edge function reference.
            </p>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
