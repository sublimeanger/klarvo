import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createArticleSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { RelatedContent } from "@/components/marketing/RelatedContent";
import { HubNavigation } from "@/components/marketing/HubNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  BookOpen,
  Target,
  RefreshCw
} from "lucide-react";

const roleBasedTraining = [
  {
    role: "All Staff",
    content: "AI basics, company AI policy, what AI tools are approved, how to report concerns",
    duration: "30-60 mins",
    frequency: "Annual + onboarding"
  },
  {
    role: "AI Operators",
    content: "System-specific training, oversight procedures, when to escalate, logging requirements",
    duration: "2-4 hours",
    frequency: "Before use + annual"
  },
  {
    role: "Reviewers/Approvers",
    content: "Classification review, evidence assessment, FRIA oversight, sign-off responsibilities",
    duration: "4-6 hours",
    frequency: "Before role + annual"
  },
  {
    role: "HR/Recruitment",
    content: "AI in hiring obligations, Article 26 deployer duties, worker notification, bias awareness",
    duration: "2-3 hours",
    frequency: "Before use + annual"
  },
  {
    role: "Leadership/Board",
    content: "AI governance overview, risk exposure, compliance status, strategic implications",
    duration: "1-2 hours",
    frequency: "Quarterly briefings"
  },
];

const evidenceTypes = [
  { type: "Training completion records", description: "Dated logs showing who completed what training", essential: true },
  { type: "Training materials", description: "Slides, videos, or documents used for training", essential: true },
  { type: "Attendance records", description: "Sign-in sheets or LMS records", essential: true },
  { type: "Policy acknowledgements", description: "Signed acceptance of AI acceptable use policy", essential: true },
  { type: "Quiz/assessment results", description: "Evidence of comprehension testing", essential: false },
  { type: "Role assignments", description: "Documentation of who operates which systems", essential: false },
  { type: "Refresh schedules", description: "Calendar of upcoming re-certification", essential: false },
];

const programStructure = [
  {
    step: 1,
    title: "Define Training Tiers",
    description: "Map roles to training requirements. Not everyone needs the same depth—operators need more than general staff."
  },
  {
    step: 2,
    title: "Develop Content",
    description: "Create or curate materials for each tier. Include your AI policy, system-specific procedures, and regulatory context."
  },
  {
    step: 3,
    title: "Deploy & Track",
    description: "Roll out training with completion tracking. Use an LMS or simple spreadsheet—just ensure you can prove who completed what."
  },
  {
    step: 4,
    title: "Refresh Regularly",
    description: "Set annual re-certification requirements. Update content when systems change or regulations evolve."
  },
];

const faqQuestions = [
  {
    question: "What is AI literacy under Article 4 of the EU AI Act?",
    answer: "Article 4 requires providers and deployers to take measures to ensure sufficient AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training, and the context in which the AI systems are used."
  },
  {
    question: "When do AI literacy obligations apply?",
    answer: "AI literacy obligations applied from 2 February 2025. Organizations should already have measures in place or be actively implementing them."
  },
  {
    question: "What does 'sufficient AI literacy' mean?",
    answer: "It means staff have enough understanding to use AI systems appropriately, recognize limitations, follow oversight procedures, and escalate concerns. The level varies by role—operators need more depth than general staff."
  },
  {
    question: "How do we evidence AI literacy compliance?",
    answer: "Keep records of training completion, materials used, policy acknowledgements, and role assignments. Klarvo's Training module automates this tracking and generates audit-ready reports."
  },
  {
    question: "Do we need external certification?",
    answer: "The EU AI Act doesn't require external certification. Internal training programmes with documented completion are sufficient, though external courses can supplement your programme."
  }
];

export default function AILiteracyGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Literacy & Article 4: Training Requirements Guide",
    description: "Understand EU AI Act Article 4 AI literacy requirements. Learn what 'sufficient literacy' means, how to structure role-based training, and how to evidence compliance.",
    datePublished: "2025-01-23",
    dateModified: "2025-01-31"
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Guides", url: "https://klarvo.io/guides" },
      { name: "AI Literacy Guide", url: "https://klarvo.io/guides/ai-literacy-article-4" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Literacy & Article 4: EU AI Act Training Guide"
        description="Understand EU AI Act Article 4 AI literacy requirements. Learn what training staff need, how to structure programmes, and how to evidence compliance."
        keywords={["AI literacy EU AI Act", "Article 4 AI Act", "AI training requirements", "AI literacy training", "EU AI Act training"]}
        canonical="https://klarvo.io/guides/ai-literacy-article-4"
        ogType="article"
      />
      <SchemaMarkup schema={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge>Guide</Badge>
              <Badge variant="destructive">Applies Now</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                10 min read
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Literacy & Article 4
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your staff need "sufficient AI literacy" to use AI systems compliantly. Here's what that means in practice and how to build an evidence trail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/ai-literacy-training-tracker">
                  <Download className="mr-2 h-5 w-5" />
                  Get Training Tracker
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates/ai-acceptable-use-policy">
                  AI Use Policy Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirement */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">The Article 4 Requirement</h2>
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4">
                  "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context in which the AI systems are to be used, and considering the persons or groups of persons on whom the AI systems are to be used."
                </p>
                <p className="text-sm text-muted-foreground">
                  — EU AI Act, Article 4
                </p>
              </CardContent>
            </Card>
            <div className="mt-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-destructive mb-2">
                <AlertTriangle className="h-5 w-5" />
                Already in Force
              </div>
              <p className="text-sm text-muted-foreground">
                AI literacy obligations applied from 2 February 2025. If you haven't started, begin immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Training */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Role-Based Training Requirements</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Different roles need different depths of training. Here's a practical breakdown:
            </p>
            <div className="space-y-4">
              {roleBasedTraining.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{item.role}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">{item.content}</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Duration</div>
                          <div className="font-medium">{item.duration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Frequency</div>
                          <div className="font-medium">{item.frequency}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programme Structure */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Building Your Programme</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {programStructure.map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What Evidence to Keep</h2>
            <div className="space-y-3">
              {evidenceTypes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                >
                  <div className="shrink-0 mt-0.5">
                    {item.essential ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2">
                      {item.type}
                      {item.essential && (
                        <Badge variant="secondary" className="text-xs">Essential</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Training Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track completions, send reminders, generate reports.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/ai-literacy-training-tracker">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Use Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Template policy for staff AI usage and responsibilities.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/templates/ai-acceptable-use-policy">
                      Get Template <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">SME Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete EU AI Act roadmap for small businesses.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/eu-ai-act-for-smes">
                      Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent currentHref="/guides/ai-literacy-article-4" title="Related Resources" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
        </div>
      </section>

      <CTASection
        title="Track AI Literacy Compliance"
        subtitle="Klarvo's Training module automates completion tracking, sends reminders, and generates audit-ready reports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Get Training Tracker", href: "/ai-literacy-training-tracker" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
