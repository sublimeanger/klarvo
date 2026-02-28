import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
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
  FileSearch,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createArticleSchema, createFAQSchema } from "@/components/seo";

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
    description: "Most healthcare AI qualifies as a medical device under EU MDR 2017/745. The AI Act adds AI-specific requirements on top.",
    icon: FileSearch
  },
  {
    title: "Dual Compliance Pathway",
    description: "If your AI is a medical device, it's automatically high-risk under AI Act Article 6(1). Both regulations apply.",
    icon: Shield
  },
  {
    title: "Notified Body Involvement",
    description: "High-risk healthcare AI requires conformity assessment, often involving a Notified Body for both MDR and AI Act.",
    icon: CheckCircle2
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

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Healthcare", url: "https://klarvo.io/use-cases/healthcare" }
  ]
});

const articleSchema = createArticleSchema({
  headline: "Healthcare AI Compliance - EU AI Act & MDR",
  description: "Navigate EU AI Act and MDR compliance for healthcare AI. Medical imaging, clinical decision support, and diagnostic AI governance.",
  datePublished: "2025-01-25",
  dateModified: "2025-01-31"
});

const faqSchema = createFAQSchema({
  questions: [
    { question: "Does healthcare AI need to comply with both EU AI Act and MDR?", answer: "Yes. Most healthcare AI qualifies as a medical device under MDR and is automatically high-risk under AI Act Article 6(1). Both regulations apply simultaneously." },
    { question: "What is the compliance timeline for healthcare AI?", answer: "Healthcare AI that's part of a medical device (Annex I product) may have until August 2027 for full compliance, but preparation should start now." },
    { question: "Is a Notified Body required for healthcare AI?", answer: "Often yes. High-risk healthcare AI typically requires conformity assessment involving a Notified Body for both MDR and AI Act requirements." }
  ]
});

export default function HealthcareUseCase() {
  return (
    <MarketingLayout>
      <SEOHead
        title="Healthcare AI Compliance - EU AI Act & MDR"
        description="Navigate EU AI Act and MDR compliance for healthcare AI. Medical imaging, clinical decision support, and diagnostic AI governance."
        keywords={["healthcare AI compliance", "medical AI regulation", "MDR AI Act", "clinical AI governance"]}
        canonical="https://klarvo.io/use-cases/healthcare"
      />
      <SchemaMarkup schema={[breadcrumbSchema, articleSchema, faqSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs - rose themed */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 px-4 py-2 bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300 dark:border-rose-700">
                <Heart className="h-4 w-4 mr-2" />
                Healthcare & Life Sciences
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Healthcare{" "}
                <span className="text-gradient-hero">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI in healthcare is among the most heavily regulated. The EU AI Act adds 
                new requirements on top of existing Medical Device Regulation (MDR). 
                Navigate both with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-premium" asChild>
                  <a href="https://app.klarvo.io/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">See How It Works</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="glass-premium border-rose-200/50 dark:border-rose-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
                    <AlertTriangle className="h-5 w-5" />
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
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {[
                        "Extended timeline (Aug 2027 for Annex I products)",
                        "Notified Body assessment often required",
                        "Technical documentation must satisfy both"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare AI Tools */}
      <section className="py-20 bg-surface-1">
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
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/10">
                      <tool.icon className="h-7 w-7 text-rose-600 dark:text-rose-400" />
                    </div>
                    <Badge variant="outline" className="mb-3">{tool.regulation}</Badge>
                    <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
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
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Regulatory Landscape
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Understanding the Dual Compliance Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Healthcare AI compliance requires understanding how multiple regulations interact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {regulatoryLandscape.map((item, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow border-border/50 hover:border-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
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
      <section className="py-20 bg-surface-1">
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
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/30 transition-colors">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="glass-premium border-rose-200/30 dark:border-rose-800/30">
                <CardHeader>
                  <CardTitle>Extended Timeline Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Healthcare AI that's part of a medical device (Annex I) may have until 
                    <strong className="text-foreground"> August 2, 2027</strong> for full compliance—but don't wait. 
                    Building documentation now means less scramble later.
                  </p>
                  <Button className="btn-premium" asChild>
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
      <CTASection
        title="Patient Safety Starts With Compliance"
        subtitle="Healthcare AI has the potential to save lives—but only if deployed safely and responsibly. Start your compliance journey today."
        primaryCta={{ label: "Start Free Trial", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "Learn More", href: "/features" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
