import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  FileText,
  Image,
  Palette,
  ArrowRight,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";

const brandColors = [
  { name: "Primary", value: "#4338CA", class: "bg-primary" },
  { name: "Primary Light", value: "#6366F1", class: "bg-primary-400" },
  { name: "Primary Dark", value: "#3730A3", class: "bg-primary-700" },
];

const logoUsage = [
  "Use the full-color logo on light backgrounds",
  "Use the white logo on dark or colored backgrounds",
  "Maintain clear space around the logo equal to the height of the 'K'",
  "Don't stretch, rotate, or alter the logo in any way",
  "Don't use the logo at sizes smaller than 24px height",
  "Don't place the logo on busy or low-contrast backgrounds"
];

export default function Press() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColor(value);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
              Press Kit
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Brand{" "}
              <span className="text-gradient">Assets</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to write about Klarvo—logos, brand guidelines, 
              and company information.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Logo & Assets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download our logo in various formats. Please follow our usage guidelines.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Primary Logo
                </CardTitle>
                <CardDescription>
                  Full-color logo for light backgrounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-4 min-h-[120px]">
                  <div className="text-3xl font-bold text-primary">Klarvo</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    SVG
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  White Logo
                </CardTitle>
                <CardDescription>
                  For dark or colored backgrounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary rounded-lg p-8 flex items-center justify-center mb-4 min-h-[120px]">
                  <div className="text-3xl font-bold text-white">Klarvo</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    SVG
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Brand Colors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our primary color palette. Click to copy hex values.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center max-w-2xl mx-auto">
            {brandColors.map((color, i) => (
              <button
                key={i}
                onClick={() => copyColor(color.value)}
                className="group text-center"
              >
                <div 
                  className={`w-24 h-24 rounded-xl ${color.class} mb-2 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center`}
                >
                  {copiedColor === color.value ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : (
                    <Copy className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="text-sm font-medium">{color.name}</div>
                <div className="text-xs text-muted-foreground">{color.value}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Guidelines */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Usage Guidelines</h2>
              <p className="text-muted-foreground">
                Please follow these guidelines when using our brand assets.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {logoUsage.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${i < 3 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                        <span className="text-xs font-bold">{i < 3 ? "✓" : "✕"}</span>
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">About Klarvo</h2>
              <p className="text-muted-foreground">
                Company boilerplate for press releases and articles.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Klarvo</strong> is the EU AI Act compliance platform 
                  designed for organizations of all sizes. Founded in 2024, Klarvo helps companies 
                  inventory their AI systems, classify risk levels, implement required controls, 
                  and generate audit-ready evidence packs—all in one platform.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With the EU AI Act entering force, organizations across Europe face new obligations 
                  around AI governance, transparency, and risk management. Klarvo democratizes 
                  compliance by providing SMEs with the same caliber of tools previously available 
                  only to large enterprises with dedicated compliance teams.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Learn more at <a href="https://klarvo.io" className="text-primary hover:underline">klarvo.io</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Press Inquiries</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            For press inquiries, interviews, or additional materials, please contact 
            our communications team.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:press@klarvo.io">
              Contact Press Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}
