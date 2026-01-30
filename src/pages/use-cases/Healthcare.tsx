import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  Stethoscope,
  Brain,
  Scan,
  Pill,
  FileSearch
} from "lucide-react";
import { Link } from "react-router-dom";

const healthcareAITools = [
  {
    icon: Scan,
    title: "Medical Imaging AI",
    description: "AI that analyzes X-rays, MRIs, CT scans to detect diseases or abnormalities.",
    regulation: "MDR + AI Act"
  },
  {
    icon: Stethoscope,
    title: "Clinical Decision Support",
    description: "Systems that recommend diagnoses, treatments, or care pathways based on patient data.",
    regulation: "MDR + AI Act"
  },
  {
    icon: Brain,
    title: "Mental Health AI",
    description: "Chatbots and apps for mental health screening, therapy support, or crisis intervention.",
    regulation: "MDR + AI Act"
  },
  {
    icon: Pill,
    title: "Drug Discovery AI",
    description: "AI used in pharmaceutical research, clinical trial design, and drug development.",
    regulation: "Varies"
  }
];

const regulatoryLandscape = [
  {
    title: "Medical Device Regulation (MDR)",
    description: "Most healthcare AI qualifies as a medical device under EU MDR 2017/745. The AI Act adds AI-specific requirements on top."
  },
  {
    title: "Dual Compliance Pathway",
    description: "If your AI is a medical device, it's automatically high-risk under AI Act Article 6(1). Both regulations apply."
  },
  {
    title: "Notified Body Involvement",
    description: "High-risk healthcare AI requires conformity assessment, often involving a Notified Body for both MDR and AI Act."
  }
];

const features = [
  "Medical device classification guidance",
  "MDR + AI Act dual compliance workflows",
  "Clinical AI documentation templates",
  "FRIA templates for healthcare context",
  "Patient safety and rights protection",
  "Clinical validation evidence tracking",
  "Notified Body documentation support",
  "Healthcare vendor due diligence"
];

export default function HealthcareUseCase() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 border-rose-200 dark:border-rose-800">
                <Heart className="h-3 w-3 mr-1" />
                Healthcare & Life Sciences
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Healthcare{" "}
                <span className="text-gradient">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI in healthcare is among the most heavily regulated. The EU AI Act adds 
                new requirements on top of existing Medical Device Regulation (MDR). 
                Navigate both with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Book Healthcare Demo</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-600" />
                    Dual Regulation Alert
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Most healthcare AI is covered by BOTH the EU AI Act AND the Medical 
                    Device Regulation (MDR). Article 6(1) makes AI that's a safety component 
                    of a regulated product automatically high-risk.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Key implications:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Extended timeline (Aug 2027 for Annex I products)</li>
                      <li>• Notified Body assessment often required</li>
                      <li>• Technical documentation must satisfy both</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare AI Tools */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Healthcare AI Under Regulation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From diagnostics to drug discovery, healthcare AI faces the most complex regulatory landscape.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthcareAITools.map((tool, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-rose-300 dark:hover:border-rose-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <tool.icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <Badge variant="outline" className="mb-3">{tool.regulation}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Landscape */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Understanding the Regulatory Landscape
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Healthcare AI compliance requires understanding how multiple regulations interact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {regulatoryLandscape.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-2">
                    <FileSearch className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built for Healthcare Complexity
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Klarvo understands that healthcare AI compliance isn't just about the AI Act. 
                Our platform helps you document compliance across multiple regulatory frameworks.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/30 border-rose-200 dark:border-rose-800">
                <CardHeader>
                  <CardTitle>Extended Timeline Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Healthcare AI that's part of a medical device (Annex I) may have until 
                    <strong> August 2, 2027</strong> for full compliance—but don't wait. 
                    Building documentation now means less scramble later.
                  </p>
                  <Button asChild>
                    <Link to="/resources">
                      Healthcare Compliance Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Patient Safety Starts With Compliance
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Healthcare AI has the potential to save lives—but only if deployed safely 
            and responsibly. Start your compliance journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/demo">Book Healthcare Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
