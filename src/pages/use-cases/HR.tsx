import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Video,
  Brain,
  FileSearch,
  Scale
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead, SchemaMarkup, createBreadcrumbSchema } from "@/components/seo";

const hrAITools = [
  {
    icon: FileSearch,
    title: "Resume Screening",
    description: "AI that filters and ranks candidates based on qualifications—often classified as high-risk under Annex III.",
    risk: "High Risk"
  },
  {
    icon: Video,
    title: "Video Interview Analysis",
    description: "Tools that assess candidates via facial expression, tone, or word choice analysis.",
    risk: "High Risk"
  },
  {
    icon: Brain,
    title: "Psychometric Testing",
    description: "AI-powered personality and cognitive assessments used in hiring decisions.",
    risk: "High Risk"
  },
  {
    icon: UserCheck,
    title: "Performance Analytics",
    description: "Systems that monitor employee performance, predict attrition, or recommend terminations.",
    risk: "High Risk"
  }
];

const complianceRequirements = [
  {
    title: "Human Oversight",
    description: "Qualified HR professionals must review AI recommendations before making final decisions."
  },
  {
    title: "Transparency Notices",
    description: "Candidates must be informed when AI is used in the recruitment process."
  },
  {
    title: "Bias Monitoring",
    description: "Regular testing for discriminatory outcomes across protected characteristics."
  },
  {
    title: "Worker Notification",
    description: "Employees must be informed before workplace AI systems are deployed."
  },
  {
    title: "Logging & Records",
    description: "Maintain logs of AI-assisted decisions for at least 6 months."
  },
  {
    title: "FRIA Requirements",
    description: "Fundamental Rights Impact Assessment for high-risk HR AI systems."
  }
];

const features = [
  "Pre-built templates for HR AI documentation",
  "High-risk classification guidance for recruitment tools",
  "Transparency notice generators for candidates",
  "Worker notification templates",
  "Human oversight plan templates",
  "Bias monitoring checklist integration",
  "FRIA workflow for HR-specific impacts",
  "Vendor due diligence for HR tech providers"
];

const breadcrumbSchema = createBreadcrumbSchema({
  items: [
    { name: "Home", url: "https://klarvo.io" },
    { name: "HR & Recruitment", url: "https://klarvo.io/use-cases/hr" }
  ]
});

export default function HRUseCase() {
  return (
    <MarketingLayout>
      <SEOHead
        title="HR & Recruitment AI Compliance - High-Risk AI Management"
        description="EU AI Act compliance for HR AI tools. Resume screening, video interviews, and psychometric testing are high-risk. Get compliant now."
        keywords={["HR AI compliance", "recruitment AI regulation", "high-risk AI HR", "hiring AI EU AI Act"]}
        canonical="https://klarvo.io/use-cases/hr"
      />
      <SchemaMarkup schema={[breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Floating orbs - amber themed for warning */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 px-4 py-2 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300 dark:border-amber-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                High-Risk AI Category
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                HR & Recruitment{" "}
                <span className="text-gradient-hero">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI in hiring and people management is specifically listed as high-risk 
                under the EU AI Act (Annex III, Point 4). Get compliant before the 
                August 2026 deadline.
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
              <Card className="glass-premium border-amber-200/50 dark:border-amber-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <AlertTriangle className="h-5 w-5" />
                    EU AI Act Alert
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Article 6 and Annex III explicitly classify AI systems used in 
                    "employment, workers management and access to self-employment" as high-risk.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">This includes AI for:</div>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {[
                        "Recruitment and candidate screening",
                        "Performance evaluation",
                        "Promotion and termination decisions",
                        "Task allocation and monitoring"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
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

      {/* HR AI Tools */}
      <section className="py-20 bg-surface-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Common HR AI Tools That Need Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These widely-used HR technologies are likely classified as high-risk under the EU AI Act.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hrAITools.map((tool, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/10">
                      <tool.icon className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                    </div>
                    <Badge variant="destructive" className="mb-3">{tool.risk}</Badge>
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

      {/* Compliance Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                What You Need to Do
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                High-risk HR AI systems come with specific deployer obligations. 
                Klarvo helps you implement and document all of them.
              </p>
              
              <div className="space-y-4">
                {complianceRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{req.title}</div>
                      <div className="text-sm text-muted-foreground">{req.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="sticky top-24 glass-premium">
                <CardHeader>
                  <CardTitle>HR Compliance Features</CardTitle>
                  <CardDescription>
                    Purpose-built tools for HR and recruitment AI compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/30 transition-colors">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <Button className="w-full btn-premium" asChild>
                      <Link to="/auth/signup">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Don't Wait Until August 2026"
        subtitle="HR AI systems have some of the strictest requirements under the EU AI Act. Start building your compliance foundation today."
        primaryCta={{ label: "Start Free Trial", href: "/auth/signup" }}
        secondaryCta={{ label: "HR Compliance Guide", href: "/resources" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
