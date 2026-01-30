import { MarketingLayout } from "@/components/marketing/MarketingLayout";
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

export default function HRUseCase() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100/50 dark:from-primary-950/30 dark:via-background dark:to-primary-900/20" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-6 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                High-Risk AI Category
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                HR & Recruitment{" "}
                <span className="text-gradient">AI Compliance</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                AI in hiring and people management is specifically listed as high-risk 
                under the EU AI Act (Annex III, Point 4). Get compliant before the 
                August 2026 deadline.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Book HR Demo</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
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
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Recruitment and candidate screening</li>
                      <li>• Performance evaluation</li>
                      <li>• Promotion and termination decisions</li>
                      <li>• Task allocation and monitoring</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* HR AI Tools */}
      <section className="py-20 bg-muted/30">
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
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-amber-300 dark:hover:border-amber-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <tool.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <Badge variant="destructive" className="mb-3">{tool.risk}</Badge>
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
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">{req.title}</div>
                      <div className="text-sm text-muted-foreground">{req.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>HR Compliance Features</CardTitle>
                  <CardDescription>
                    Purpose-built tools for HR and recruitment AI compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full" asChild>
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
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't Wait Until August 2026
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            HR AI systems have some of the strictest requirements under the EU AI Act. 
            Start building your compliance foundation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/resources">HR Compliance Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
