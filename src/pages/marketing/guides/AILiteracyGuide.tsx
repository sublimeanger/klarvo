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
  RefreshCw,
  Scale
} from "lucide-react";

const roleBasedTraining = [
  {
    role: "All Staff (General Awareness)",
    content: "What is AI? Company AI policy. Approved tools vs Shadow AI. How to spot AI output. Risks of data leakage. How to report concerns.",
    duration: "30-60 mins",
    frequency: "Annual + Onboarding",
    importance: "Foundation for organisational compliance."
  },
  {
    role: "AI Operators / Users",
    content: "Specific system instructions (SOPs). Understanding system limitations. Human oversight duties. Incident reporting. Output verification.",
    duration: "2-4 hours",
    frequency: "Before use + Annual",
    importance: "Critical for Article 26 compliance."
  },
  {
    role: "Reviewers & Approvers",
    content: "Risk classification methodology. Evidence requirements. FRIA oversight. Vendor due diligence. Sign-off accountability.",
    duration: "4-6 hours",
    frequency: "Before role + Annual",
    importance: "Ensures governance decisions are sound."
  },
  {
    role: "HR & Recruitment",
    content: "High-risk employment AI obligations. Bias detection. Worker notification duties. Data minimization in hiring.",
    duration: "2-3 hours",
    frequency: "Before use + Annual",
    importance: "High-risk category focus (Annex III)."
  },
  {
    role: "Leadership & Board",
    content: "Strategic AI risks. Governance framework. Liability & penalties. Compliance status reporting.",
    duration: "1-2 hours",
    frequency: "Quarterly Briefings",
    importance: "Accountability at the top."
  },
];

const evidenceTypes = [
  { type: "Training Logs", description: "Dated records of who completed what module. Must track completion status.", essential: true },
  { type: "Training Materials", description: "Copies of the actual slides, videos, or documents used. Auditors need to verify content quality.", essential: true },
  { type: "Policy Acknowledgements", description: "Signed confirmations that staff have read and understood the AI Acceptable Use Policy.", essential: true },
  { type: "Quiz Results", description: "Assessment scores demonstrating comprehension, not just attendance.", essential: false },
  { type: "Role Assignments", description: "Documentation linking specific users to 'Operator' roles for specific AI systems.", essential: false },
  { type: "Refresh Schedules", description: "Calendar proving that training is ongoing, not a one-off event.", essential: false },
];

const programStructure = [
  {
    step: 1,
    title: "Assess Needs",
    description: "Identify user groups. Who operates high-risk AI? Who just uses ChatGPT? Map roles to risks."
  },
  {
    step: 2,
    title: "Define Tiers",
    description: "Create 3-4 training levels (e.g., Basics, Operator, Advanced). Don't overwhelm general staff with technical details."
  },
  {
    step: 3,
    title: "Develop Content",
    description: "Create or curate content. Include your specific internal policies—generic AI training isn't enough."
  },
  {
    step: 4,
    title: "Deploy & Track",
    description: "Roll out via LMS or compliance platform. Track completion rigorously. Chase non-compliance."
  },
  {
    step: 5,
    title: "Refresh",
    description: "AI changes fast. Update content annually. Re-certify staff to ensure skills stay current."
  },
];

const faqQuestions = [
  {
    question: "What is AI literacy under Article 4 of the EU AI Act?",
    answer: "Article 4 requires providers and deployers to take measures to ensure sufficient AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf. It must be proportionate to the context and the persons' role."
  },
  {
    question: "When do AI literacy obligations apply?",
    answer: "AI literacy obligations applied from 2 February 2025. Unlike high-risk obligations which come later, this is an early requirement. Organizations should already have measures in place."
  },
  {
    question: "What does 'sufficient AI literacy' mean?",
    answer: "It means staff have enough understanding to use AI systems appropriately, recognize limitations, follow oversight procedures, and escalate concerns. A data scientist needs different literacy than a call center agent—it's about competence for the specific role."
  },
  {
    question: "Do we need external certification?",
    answer: "No. The EU AI Act does not require external certification or accredited courses. Internal training programmes are sufficient if they are documented, relevant, and effectively delivered."
  },
  {
    question: "What about contractors?",
    answer: "Article 4 covers 'other persons dealing with the operation... on their behalf'. If contractors operate your AI systems, you must ensure they are literate too. Include this in vendor/contractor onboarding."
  }
];

export default function AILiteracyGuide() {
  const articleSchema = createArticleSchema({
    headline: "AI Literacy & Article 4: Training Requirements Guide",
    description: "Understand EU AI Act Article 4 AI literacy requirements. Learn what 'sufficient literacy' means, how to structure role-based training, and how to evidence compliance.",
    datePublished: "2025-01-23",
    dateModified: "2026-02-28"
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
        keywords={["AI literacy EU AI Act", "Article 4 AI Act", "AI training requirements", "AI literacy training", "EU AI Act training", "staff AI training"]}
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
              "Sufficient AI literacy" is now a legal requirement. Here's how to define it for your organization, train your staff, and prove you've done it.
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
                <p className="text-lg italic mb-4 font-serif">
                  "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context in which the AI systems are to be used, and considering the persons or groups of persons on whom the AI systems are to be used."
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                  — EU AI Act, Article 4
                </p>
              </CardContent>
            </Card>
            <div className="mt-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  Already in Force
                </p>
                <p className="text-sm text-muted-foreground">
                  AI literacy obligations applied from <strong>2 February 2025</strong>. Unlike high-risk obligations that have a grace period, this applies now. If you haven't started training, you are behind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Training */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Role-Based Training Tiers</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Compliance isn't "one size fits all". A receptionist needs different training than a data scientist. Here is a compliant tier structure:
            </p>
            <div className="space-y-4">
              {roleBasedTraining.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{item.role}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{item.content}</p>
                        <div className="text-xs text-muted-foreground italic">
                          Why: {item.importance}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-sm md:w-48 shrink-0 md:border-l md:pl-6">
                        <div>
                          <div className="text-muted-foreground text-xs uppercase font-semibold">Duration</div>
                          <div className="font-medium">{item.duration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs uppercase font-semibold">Frequency</div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">How to Build Your Programme</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:justify-center">
              {programStructure.map((item) => (
                <Card key={item.step} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GraduationCap className="h-24 w-24" />
                  </div>
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
            <h2 className="text-3xl font-bold mb-4 text-center">What Evidence Auditors Expect</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              If you didn't document it, it didn't happen. You need traceable proof of literacy.
            </p>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Tools to Help</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Training Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Software to track completions, send reminders, and generate audit reports.
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
                    Template policy for staff AI usage. Track acknowledgements as evidence.
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
                    Broader guide for SMEs on all AI Act obligations.
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

      <RelatedContent currentHref="/guides/ai-literacy-article-4" title="More Guides" />

      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <HubNavigation />
        </div>
      </section>

      <CTASection
        title="Start Tracking AI Literacy"
        subtitle="Don't use spreadsheets. Klarvo automates training assignment, tracking, and evidence generation."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "Get Training Tracker", href: "/ai-literacy-training-tracker" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
