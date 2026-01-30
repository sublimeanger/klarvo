import { MarketingLayout } from "@/components/marketing/MarketingLayout";
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
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

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

export default function FintechUseCase() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                <CreditCard className="h-3 w-3 mr-1" />
                Financial Services
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Fintech & Banking{" "}
                <span className="text-gradient">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI for credit scoring, insurance pricing, and access to essential services 
                is high-risk under the EU AI Act. Navigate the intersection of AI regulation 
                and financial services compliance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Book Fintech Demo</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-emerald-600" />
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
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Life and health insurance risk assessment</li>
                      <li>• Access to essential private services</li>
                      <li>• Emergency services dispatch</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fintech AI Tools */}
      <section className="py-20 bg-muted/30">
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
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <tool.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <Badge variant={tool.risk === "High Risk" ? "destructive" : "secondary"} className="mb-3">
                    {tool.risk}
                  </Badge>
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

      {/* Compliance Considerations */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Compliance Considerations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding how the EU AI Act intersects with existing financial regulation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {complianceConsiderations.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-950/30">
                    <div className="text-sm font-medium text-primary mb-1">Implication</div>
                    <div className="text-sm text-muted-foreground">{item.implication}</div>
                  </div>
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
                Purpose-Built for Financial Services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Klarvo understands that fintech operates in a complex regulatory environment. 
                Our platform helps you layer AI Act compliance on top of your existing frameworks.
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
              <Card>
                <CardContent className="p-8">
                  <Lock className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Security First</h3>
                  <p className="text-muted-foreground mb-6">
                    Financial data requires the highest security standards. Klarvo offers 
                    EU data residency, encryption at rest and in transit, and SOC 2 Type II 
                    compliance (coming soon).
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/security">Learn About Security</Link>
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
          <Scale className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Compliance That Scales With Your Business
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            From startups to established banks, Klarvo helps financial services 
            organizations document and manage AI compliance efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/use-cases/enterprise">Enterprise Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
