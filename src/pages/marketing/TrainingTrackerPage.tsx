import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createSoftwareApplicationSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle,
  Download,
  Bell,
  FileText,
  BarChart,
  RefreshCw,
  Calendar,
  Shield
} from "lucide-react";

const features = [
  {
    title: "Role-Based Assignment",
    description: "Assign different training tiers to operators, reviewers, and general staff automatically.",
    icon: Users
  },
  {
    title: "Completion Tracking",
    description: "See who's completed what, who's overdue, and who needs reminders.",
    icon: CheckCircle
  },
  {
    title: "Automatic Reminders",
    description: "Email notifications for incomplete training and upcoming re-certification.",
    icon: Bell
  },
  {
    title: "Audit-Ready Reports",
    description: "Export completion reports as evidence for auditors and procurement.",
    icon: FileText
  },
  {
    title: "Annual Refresh",
    description: "Automatic re-certification scheduling keeps training current.",
    icon: RefreshCw
  },
  {
    title: "Policy Acknowledgement",
    description: "Track AI acceptable use policy sign-offs alongside training.",
    icon: Shield
  },
];

const trainingTiers = [
  {
    tier: "All Staff Basics",
    audience: "Everyone in the organization",
    content: "AI fundamentals, company policy, approved tools, reporting concerns",
    duration: "30-60 mins"
  },
  {
    tier: "AI Operators",
    audience: "Staff who directly use AI systems",
    content: "System-specific training, oversight procedures, escalation, logging",
    duration: "2-4 hours"
  },
  {
    tier: "Reviewers/Approvers",
    audience: "Compliance owners, sign-off authorities",
    content: "Classification review, evidence assessment, FRIA oversight",
    duration: "4-6 hours"
  },
];

const faqQuestions = [
  {
    question: "What is AI literacy under Article 4?",
    answer: "Article 4 requires providers and deployers to ensure 'sufficient AI literacy' of staff dealing with AI systems. This means training appropriate to their role—operators need more depth than general staff."
  },
  {
    question: "When do AI literacy requirements apply?",
    answer: "AI literacy obligations applied from 2 February 2025. Organizations should already have measures in place."
  },
  {
    question: "What training should we provide?",
    answer: "At minimum: AI basics for all staff, system-specific training for operators, and deeper governance training for reviewers. Our guide covers role-based requirements in detail."
  },
  {
    question: "How do we prove compliance?",
    answer: "Keep records of training completion, materials used, and policy acknowledgements. Klarvo's Training Tracker generates audit-ready reports automatically."
  },
  {
    question: "Do staff need external certification?",
    answer: "No. The EU AI Act doesn't require external certification. Internal training programmes with documented completion are sufficient."
  }
];

export default function TrainingTrackerPage() {
  const softwareSchema = createSoftwareApplicationSchema({
    name: "Klarvo AI Literacy Training Tracker",
    description: "Track AI literacy training for EU AI Act Article 4 compliance. Role-based assignment, completion tracking, automatic reminders, and audit-ready reports.",
    applicationCategory: "BusinessApplication",
    offers: { price: "99", priceCurrency: "EUR" }
  });

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "AI Literacy Training Tracker", url: "https://klarvo.io/ai-literacy-training-tracker" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="AI Literacy Training Tracker | Klarvo"
        description="Track AI literacy training for EU AI Act Article 4 compliance. Role-based assignment, automatic reminders, and audit-ready completion reports."
        keywords={["AI literacy training tracker", "Article 4 AI Act", "AI training compliance", "EU AI Act training", "AI literacy software"]}
        canonical="https://klarvo.io/ai-literacy-training-tracker"
        ogType="website"
      />
      <SchemaMarkup schema={[softwareSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge>Product</Badge>
              <Badge variant="destructive">Article 4 Applies Now</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Literacy Training Tracker
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Article 4 requires "sufficient AI literacy." Track who's trained, send reminders, and export audit-ready reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/guides/ai-literacy-article-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Read Article 4 Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Role-Based Training Tiers</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Different roles need different training depths. Here's the framework:
            </p>
            <div className="space-y-4">
              {trainingTiers.map((tier, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{tier.tier}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{tier.audience}</div>
                        <div className="text-sm">{tier.content}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground">Duration</div>
                        <div className="font-medium">{tier.duration}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Add Training</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload materials or link external courses
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Assign by Role</h3>
                  <p className="text-sm text-muted-foreground">
                    Match training tiers to staff roles
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Track & Remind</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor completion, send automatic reminders
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Export Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate audit-ready completion evidence
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Literacy Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep dive into Article 4 requirements and practical implementation.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/guides/ai-literacy-article-4">
                      Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AI Acceptable Use Policy</CardTitle>
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
              <div key={index} className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start Tracking AI Literacy Today"
        subtitle="Article 4 applies now. Get compliant with role-based training and audit-ready reports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "Read Article 4 Guide", href: "/guides/ai-literacy-article-4" }}
        variant="gradient"
      />
    </MarketingLayout>
  );
}
