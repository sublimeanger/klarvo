import { useState } from "react";
import { logger } from "@/lib/logger";
import { MarketingLayout } from "@/components/marketing";
import { SEOHead } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Loader2, CheckCircle2, BookOpen, Shield, Scale } from "lucide-react";
import { generateSystemSpecificationPDF } from "@/components/exports/SystemSpecificationPDF";
import { toast } from "sonner";

export default function SystemSpec() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateSystemSpecificationPDF();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Klarvo_System_Specification_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsComplete(true);
      toast.success("System Specification PDF downloaded successfully!");
    } catch (error) {
      logger.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const specSections = [
    { icon: BookOpen, title: "Executive Summary & Vision", pages: "3-5" },
    { icon: Scale, title: "Regulatory Framework (EU AI Act)", pages: "6-7" },
    { icon: Shield, title: "AI Engine (5 AI-Powered Features)", pages: "8-10" },
    { icon: FileText, title: "Provider Track (Supply Chain)", pages: "11-12" },
    { icon: FileText, title: "8 Core Modules Detailed", pages: "13-14" },
    { icon: FileText, title: "20-Step Intake Wizard Spec", pages: "15-18" },
    { icon: Shield, title: "Classification Engine", pages: "19-20" },
    { icon: FileText, title: "FRIA Workflow (Article 27)", pages: "21" },
    { icon: Shield, title: "Control Library (50+ Controls)", pages: "22-25" },
    { icon: FileText, title: "Evidence Pack Export Structure", pages: "26" },
    { icon: FileText, title: "Database Schema (47 Tables)", pages: "27-28" },
    { icon: Scale, title: "Pricing & Feature Gating", pages: "29-31" },
    { icon: Shield, title: "Security & Permissions", pages: "32" },
    { icon: FileText, title: "Marketing Infrastructure", pages: "33" },
    { icon: Scale, title: "Production Readiness (89%)", pages: "34-35" },
    { icon: FileText, title: "Implementation Status v2.0", pages: "36-37" },
  ];

  return (
    <MarketingLayout>
      <SEOHead
        title="System Specification Download | Klarvo"
        description="Download the complete Klarvo EU AI Act Compliance Hub system specification document for independent review."
        canonical="/system-spec"
        noindex
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Internal Document • v2.0</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              System Specification
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete product requirements document covering all functionality, 
              AI engine, provider track, regulatory mapping, and 89% production readiness score.
            </p>
          </div>

          <Card className="mb-8 border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Klarvo EU AI Act Compliance Hub v2.0</CardTitle>
              <CardDescription className="text-base">
                37-page comprehensive specification document • 89% Production Ready
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {specSections.map((section, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <section.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">Pages {section.pages}</p>
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
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating PDF...
                      </>
                    ) : isComplete ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Download Again
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
                
                {isComplete && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    ✓ PDF generated successfully. Check your downloads folder.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Document Contents</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              This specification includes regulatory anchors (EU AI Act dates & articles), 
              complete module specifications, wizard field definitions, control library (30+ controls), 
              database schema, pricing tiers, feature gating matrix, and current implementation status.
            </p>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
