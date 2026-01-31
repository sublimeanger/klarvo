import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  PiggyBank,
  Scale,
  FileSearch,
  Lock,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema, createArticleSchema, createFAQSchema } from "@/components/seo";

const fintechAITools = [
  {
    icon: CreditCard,
    title: "Credit Scoring",
    description: "AI that assesses creditworthiness and determines loan eligibility—explicitly high-risk under Annex III.",
    risk: "High Risk"
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Real-time transaction monitoring and fraud prevention systems with automated blocking.",
    risk: "Varies"
  },
  {
    icon: TrendingUp,
    title: "Algorithmic Trading",
    description: "Automated investment decisions and portfolio management using AI predictions.",
    risk: "Contextual"
  },
  {
    icon: PiggyBank,
    title: "Insurance Underwriting",
    description: "AI-driven risk assessment for insurance pricing and coverage decisions.",
    risk: "High Risk"
  }
];

const complianceConsiderations = [
  {
    title: "Credit & Insurance Decisions",
    description: "AI used to evaluate creditworthiness or set insurance premiums is explicitly listed as high-risk in Annex III.",
    implication: "Full deployer obligations apply, including FRIA, human oversight, and logging."
  },
  {
    title: "Essential Services Access",
    description: "AI that determines access to essential financial services (bank accounts, loans) triggers high-risk classification.",
    implication: "Transparency to affected persons and contestability mechanisms required."
  },
  {
    title: "Existing Regulation Overlap",
    description: "Financial services are already heavily regulated (MiFID II, PSD2, etc.). The AI Act adds AI-specific requirements on top.",
    implication: "Integrated compliance approach needed—Klarvo helps map AI Act to existing frameworks."
  }
];

const features = [
  "Credit scoring AI classification templates",
  "High-risk deployer obligation workflows",
  "FRIA templates for financial services context",
  "Transparency notice generators for customers",
  "Human oversight documentation for lending decisions",
  "Logging and auditability evidence collection",
  "Vendor due diligence for fintech providers",
  "Multi-framework mapping (AI Act + existing regulation)"
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "Fintech", url: "https://klarvo.io/use-cases/fintech" }
  ]
});

const articleSchema = createArticleSchema({
  headline: "Fintech & Banking AI Compliance - Credit Scoring & Fraud Detection",
  description: "EU AI Act compliance for financial services AI. Credit scoring, fraud detection, and algorithmic trading governance made simple.",
  datePublished: "2025-01-25",
  dateModified: "2025-01-31"
});

const faqSchema = createFAQSchema({
  questions: [
    { question: "Is credit scoring AI high-risk under the EU AI Act?", answer: "Yes. AI systems used to evaluate creditworthiness or establish credit scores are explicitly listed as high-risk in Annex III, Point 5 of the EU AI Act." },
    { question: "Does the EU AI Act apply on top of existing financial regulations?", answer: "Yes. The AI Act adds AI-specific requirements on top of existing regulations like MiFID II, PSD2, and insurance regulations. An integrated compliance approach is needed." },
    { question: "What about fraud detection AI?", answer: "Fraud detection AI risk classification varies by use case. Systems that determine access to essential services may be high-risk, while internal security tools may have lighter obligations." }
  ]
});

export default function FintechUseCase() {
  return (
    <MarketingLayout>
      <SEOHead
        title="Fintech & Banking AI Compliance - Credit Scoring & Fraud Detection"
        description="EU AI Act compliance for financial services AI. Credit scoring, fraud detection, and algorithmic trading governance made simple."
        keywords={["fintech AI compliance", "credit scoring regulation", "banking AI governance", "fraud detection AI Act"]}
        canonical="https://klarvo.io/use-cases/fintech"
      />
      <SchemaMarkup schema={[breadcrumbSchema, articleSchema, faqSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs - emerald themed */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 px-4 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Financial Services
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Fintech & Banking{" "}
                <span className="text-gradient-hero">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI for credit scoring, insurance pricing, and access to essential services 
                is high-risk under the EU AI Act. Navigate the intersection of AI regulation 
                and financial services compliance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-premium" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">See How It Works</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="glass-premium border-emerald-200/50 dark:border-emerald-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                    <AlertTriangle className="h-5 w-5" />
                    Annex III, Point 5
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    "AI systems intended to be used to evaluate the creditworthiness of 
                    natural persons or establish their credit score" are explicitly 
                    classified as high-risk.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Also covers AI for:</div>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {[
                        "Life and health insurance risk assessment",
                        "Access to essential private services",
                        "Emergency services dispatch"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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

      {/* Fintech AI Tools */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Financial AI Systems Under Scrutiny
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These common fintech AI applications require careful compliance consideration.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fintechAITools.map((tool, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10">
                      <tool.icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <Badge variant={tool.risk === "High Risk" ? "destructive" : "secondary"} className="mb-3">
                      {tool.risk}
                    </Badge>
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

      {/* Compliance Considerations */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Key Considerations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Understanding the Regulatory Intersection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How the EU AI Act intersects with existing financial regulation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {complianceConsiderations.map((item, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">Implication</div>
                    <div className="text-sm text-muted-foreground">{item.implication}</div>
                  </div>
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
                Purpose-Built for Financial Services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Klarvo understands that fintech operates in a complex regulatory environment. 
                Our platform helps you layer AI Act compliance on top of your existing frameworks.
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
              <Card className="glass-premium">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Security First</h3>
                  <p className="text-muted-foreground mb-6">
                    Financial data requires the highest security standards. Klarvo offers 
                    EU data residency, encryption at rest and in transit, and SOC 2 Type II 
                    compliance (coming soon).
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/security">
                      Learn About Security
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
        title="Compliance That Scales With Your Business"
        subtitle="From startups to established banks, Klarvo helps financial services organizations document and manage AI compliance efficiently."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "Enterprise Options", href: "/use-cases/enterprise" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
