import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText,
  Eye,
  Shield
} from "lucide-react";

const hrAIExamples = [
  { name: "CV/Resume Screening", risk: "High-Risk", reason: "Annex III.4(a)" },
  { name: "Interview Scheduling AI", risk: "Minimal", reason: "Administrative only" },
  { name: "Video Interview Analysis", risk: "High-Risk", reason: "Annex III.4(a) + emotion" },
  { name: "Performance Monitoring", risk: "High-Risk", reason: "Annex III.4(b)" },
  { name: "Shift Scheduling AI", risk: "Potential High-Risk", reason: "Annex III.4(b)" },
  { name: "Chatbot for Candidate FAQs", risk: "Limited Risk", reason: "Art 50 disclosure" },
];

const obligations = [
  {
    title: "Use According to Instructions",
    description: "Ensure AI tools are used per vendor documentation. Train recruiters on proper usage."
  },
  {
    title: "Human Oversight",
    description: "All AI-assisted hiring decisions must have meaningful human review. Document who reviews and how."
  },
  {
    title: "Worker Notification",
    description: "If using AI for existing employees, inform them and their representatives before deployment."
  },
  {
    title: "Transparency",
    description: "Candidates should know when AI is being used in the hiring process."
  },
];

const faqQuestions = [
  {
    question: "Is CV screening AI high-risk under the EU AI Act?",
    answer: "Yes. AI systems used for recruitment or selection of candidates, including CV filtering and automated screening, are classified as high-risk under Annex III.4(a)."
  },
  {
    question: "Do we need to tell candidates we use AI in hiring?",
    answer: "Yes. Under Article 26(7), if you use high-risk AI in employment contexts, you must inform workers. Additionally, Article 50 transparency requirements may apply for AI interactions."
  },
  {
    question: "What about AI interview tools?",
    answer: "AI used to assess candidates in interviews is high-risk. Video interview tools that analyze emotions or behaviour are particularly scrutinized and may trigger prohibited practices if not carefully deployed."
  },
  {
    question: "We just use AI for scheduling—is that high-risk?",
    answer: "Simple scheduling automation is typically not high-risk. However, if the AI influences who gets interviews or prioritizes candidates, it may fall under Annex III.4(a)."
  }
];

export default function HRRecruitmentPage() {
  const articleSchema = createArticleSchema({
    headline: "EU AI Act for HR & Recruitment",
    description: "How the EU AI Act affects HR teams using AI for recruitment, screening, and employee management. Understand your high-risk obligations.",
    datePublished: "2025-01-25",
    dateModified: "2026-02-28"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Industries", url: "https://klarvo.io/industries" },
      { name: "HR & Recruitment", url: "https://klarvo.io/industries/hr-recruitment-ai-act" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="EU AI Act for HR & Recruitment"
        description="How the EU AI Act affects HR teams using AI for recruitment, screening, and employee management. CV screening, interview tools, and performance monitoring are high-risk."
        keywords={["EU AI Act HR", "AI recruitment high-risk", "CV screening AI", "HR AI compliance", "hiring AI regulation"]}
        canonical="https://klarvo.io/industries/hr-recruitment-ai-act"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      <HeroSection
        badge="Industry: HR & Recruitment"
        title={
          <>
            <span className="text-foreground">AI in Hiring is</span>
            <br />
            <span className="text-gradient-hero">High-Risk</span>
          </>
        }
        subtitle="CV screening, interview analysis, and performance monitoring AI are high-risk under Annex III. Here's what HR teams need to know."
        variant="centered"
        heroVariant="gradient-warm"
        secondaryCta={{ label: "See Samples", href: "/samples" }}
      />

      {/* Risk Alert */}
      <section className="py-8 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-medium">Most HR AI tools are classified as high-risk under EU AI Act Annex III.4</span>
          </div>
        </div>
      </section>

      {/* Common HR AI Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common HR AI Tools & Their Risk Level</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">AI Tool</th>
                    <th className="text-center py-4 px-4">Risk Level</th>
                    <th className="text-left py-4 px-4">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {hrAIExamples.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={item.risk === "High-Risk" ? "destructive" : item.risk === "Potential High-Risk" ? "secondary" : "outline"}>
                          {item.risk}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Key Obligations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Key Obligations</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {obligations.map((obligation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      {obligation.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{obligation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get Started</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Inventory Your HR AI</CardTitle>
                  <CardDescription>Document all AI tools used in recruitment and HR processes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/templates/ai-inventory-template">Get Template <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Check Risk Levels</CardTitle>
                  <CardDescription>Confirm which tools are high-risk under Annex III.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/tools/high-risk-checker-annex-iii">Run Checker <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Eye className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Article 26 Checklist</CardTitle>
                  <CardDescription>Get your deployer obligations checklist for high-risk systems.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/templates/article-26-checklist">Get Checklist <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get Your HR AI Compliant"
        subtitle="Klarvo helps HR teams inventory, classify, and manage AI compliance—without the legal complexity."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Industries", href: "/industries" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
