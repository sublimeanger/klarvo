import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText,
  Image,
  Palette,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import { useState } from "react";

const brandColors = [
  { name: "Primary", value: "#4338CA", class: "bg-primary" },
  { name: "Primary Light", value: "#6366F1", class: "bg-[hsl(237_91%_72%)]" },
  { name: "Primary Dark", value: "#3730A3", class: "bg-[hsl(232_80%_40%)]" },
];

const logoUsageDos = [
  "Use the full-color logo on light backgrounds",
  "Use the white logo on dark or colored backgrounds",
  "Maintain clear space around the logo equal to the height of the 'K'",
];

const logoUsageDonts = [
  "Don't stretch, rotate, or alter the logo in any way",
  "Don't use the logo at sizes smaller than 24px height",
  "Don't place the logo on busy or low-contrast backgrounds",
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
      <HeroSection
        badge="Press Kit"
        title={
          <>
            <span className="text-foreground">Brand</span>{" "}
            <span className="text-gradient-hero">Assets</span>
          </>
        }
        subtitle="Everything you need to write about Klarvo—logos, brand guidelines, and company information."
        variant="centered"
        showTrustBadges={false}
      />

      {/* Logo Downloads */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Image className="h-3 w-3 mr-1" />
              Downloads
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Logo & Assets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download our logo in various formats. Please follow our usage guidelines.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Primary Logo
                </CardTitle>
                <CardDescription>
                  Full-color logo for light backgrounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-100 rounded-xl p-8 flex items-center justify-center mb-4 min-h-[120px] border">
                  <div className="text-3xl font-bold text-primary">Klarvo</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:border-primary/50">
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:border-primary/50">
                    <Download className="mr-2 h-4 w-4" />
                    SVG
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  White Logo
                </CardTitle>
                <CardDescription>
                  For dark or colored backgrounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 flex items-center justify-center mb-4 min-h-[120px] shadow-lg shadow-primary/20">
                  <div className="text-3xl font-bold text-white">Klarvo</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:border-primary/50">
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:border-primary/50">
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
            <Badge variant="outline" className="mb-4">
              <Palette className="h-3 w-3 mr-1" />
              Colors
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Brand Colors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our primary color palette. Click to copy hex values.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center max-w-2xl mx-auto">
            {brandColors.map((color, i) => (
              <button
                key={i}
                onClick={() => copyColor(color.value)}
                className="group text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              >
                <div 
                  className={`w-28 h-28 rounded-2xl ${color.class} mb-3 shadow-xl group-hover:scale-105 transition-transform flex items-center justify-center`}
                >
                  {copiedColor === color.value ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : (
                    <Copy className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="text-sm font-medium">{color.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{color.value}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Guidelines */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Guidelines
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Usage Guidelines</h2>
              <p className="text-muted-foreground">
                Please follow these guidelines when using our brand assets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-success/30 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-success flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Do
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {logoUsageDos.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <X className="h-5 w-5" />
                    Don't
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {logoUsageDonts.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <FileText className="h-3 w-3 mr-1" />
                About
              </Badge>
              <h2 className="text-3xl font-bold mb-4">About Klarvo</h2>
              <p className="text-muted-foreground">
                Company boilerplate for press releases and articles.
              </p>
            </div>
            
            <Card className="glass-card border-border/50">
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
                  Learn more at <a href="https://klarvo.io" className="text-primary hover:underline font-medium">klarvo.io</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-xl mx-auto glass-premium border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Press Inquiries</h2>
              <p className="text-muted-foreground mb-6">
                For press inquiries, interviews, or additional materials, please contact 
                our communications team.
              </p>
              <Button size="lg" className="btn-premium" asChild>
                <a href="mailto:press@klarvo.io">
                  Contact Press Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  );
}
