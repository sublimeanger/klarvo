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
  Bell,
  FileText,
  RefreshCw,
  Shield,
  AlertTriangle,
  BookOpen,
  Download
} from "lucide-react";

const features = [
  {
    title: "Role-Based Assignment",
    description: "Assign different training tiers to operators, reviewers, and general staff automatically. When a user is assigned 'AI operator' for a system, advanced training is auto-assigned.",
    icon: Users
  },
  {
    title: "Completion Tracking",
    description: "See who's completed what, who's overdue, and who needs reminders. Dashboard shows completion percentages by role, department, and AI system.",
    icon: CheckCircle
  },
  {
    title: "Automatic Reminders",
    description: "Email notifications for incomplete training and upcoming re-certification deadlines. Configurable escalation: reminder → manager notification → compliance alert.",
    icon: Bell
  },
  {
    title: "Audit-Ready Reports",
    description: "Export completion reports as evidence for auditors and procurement. Reports include: who completed, when, what material, quiz scores (if applicable), and attestation status.",
    icon: FileText
  },
  {
    title: "Annual Refresh",
    description: "Automatic re-certification scheduling keeps training current. Set annual or quarterly refresh cycles. Track version changes in training materials.",
    icon: RefreshCw
  },
  {
    title: "Policy Acknowledgement",
    description: "Track AI acceptable use policy sign-offs alongside training completion. Combine training + policy attestation into a single evidence export for auditors.",
    icon: Shield
  },
];

const trainingTiers = [
  {
    tier: "All Staff AI Basics",
    audience: "Everyone in the organization",
    content: "What AI is, how the company uses it, approved tools, AI acceptable use policy, how to report concerns, basic understanding of EU AI Act obligations",
    duration: "30-60 mins",
    article4Reference: "Article 4 requires measures ensuring 'sufficient AI literacy' of staff dealing with AI. This tier covers baseline awareness for all employees."
  },
  {
    tier: "AI Tool Operators",
    audience: "Staff who directly use AI systems in their daily work",
    content: "System-specific training, oversight procedures, escalation protocols, logging requirements, data input quality checks, output review processes, incident reporting",
    duration: "2-4 hours",
    article4Reference: "Article 4 and Article 26(7) require that persons assigned human oversight have the necessary competence, training, and authority. Operators need system-specific depth."
  },
  {
    tier: "High-Risk AI Operators",
    audience: "Staff operating high-risk AI systems (e.g., HR screening, credit scoring)",
    content: "All operator content plus: Annex III category awareness, deployer obligations under Article 26, human oversight authority, suspension procedures, serious incident recognition, log review protocols",
    duration: "4-6 hours",
    article4Reference: "Deployers of high-risk AI must ensure oversight staff have competence and authority proportionate to the risk level and potential impact on affected persons."
  },
  {
    tier: "Reviewers & Approvers",
    audience: "Compliance owners, classification reviewers, sign-off authorities",
    content: "Classification methodology, evidence assessment, FRIA oversight, audit preparation, regulatory updates, governance reporting",
    duration: "4-6 hours",
    article4Reference: "Those responsible for classification decisions and compliance sign-off need deeper understanding of the regulatory framework, Annex III criteria, and Article 27 FRIA requirements."
  },
];

const faqQuestions = [
  {
    question: "What is AI literacy under Article 4?",
    answer: "Article 4 of the EU AI Act requires providers and deployers to take measures to ensure 'sufficient AI literacy' of their staff and other persons dealing with the operation and use of AI systems on their behalf. This must take into account the technical knowledge, experience, education, and training of those persons, as well as the context and the persons or groups on which the AI system is to be used."
  },
  {
    question: "When do AI literacy requirements apply?",
    answer: "AI literacy obligations under Article 4 applied from 2 February 2025. This is one of the earliest EU AI Act obligations to take effect. Organisations should already have measures in place."
  },
  {
    question: "What training should we provide?",
    answer: "The EU AI Act doesn't prescribe specific training curricula. Instead, it requires 'sufficient' literacy proportionate to the role. At minimum: AI basics for all staff, system-specific training for operators (especially for high-risk systems), and governance training for reviewers/approvers. The key is that training is documented, role-appropriate, and regularly refreshed."
  },
  {
    question: "How do we prove compliance with Article 4?",
    answer: "Keep records of: what training was provided (materials, content, duration), who completed it (per role and department), when they completed it, any assessment results, and policy acknowledgements. Klarvo's Training Tracker generates all of this as an exportable evidence report linked to your Article 4 control (LIT-01, LIT-02, LIT-03 in our control library)."
  },
  {
    question: "Do staff need external certification?",
    answer: "No. The EU AI Act does not require external certification or accredited courses. Internal training programmes with documented completion are sufficient, provided they are appropriate to the role and context. What matters is that you can demonstrate the training was relevant, delivered, and tracked."
  },
  {
    question: "How often should training be refreshed?",
    answer: "The Act doesn't specify a refresh frequency, but best practice is annual re-certification for all tiers, with ad-hoc updates when systems change, new AI tools are deployed, or regulatory guidance is updated. Klarvo automates refresh scheduling and sends reminders before certifications expire."
  },
  {
    question: "What about contractors and third parties?",
    answer: "Article 4 covers 'other persons dealing with the operation and use of AI systems on their behalf'—this includes contractors, temporary staff, and outsourced teams who operate AI systems for you. They should receive appropriate training, and completion should be tracked as evidence."
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
        keywords={["AI literacy training tracker", "Article 4 AI Act", "AI training compliance", "EU AI Act training", "AI literacy software", "AI literacy programme"]}
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
              Article 4 requires "sufficient AI literacy" for staff operating AI systems. Track who's trained, send reminders, and export audit-ready reports—all linked to your AI system inventory.
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

      {/* What Counts as AI Literacy */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Counts as "Sufficient AI Literacy"?</h2>
              <p className="text-lg text-muted-foreground">
                Article 4 doesn't prescribe a specific curriculum. Instead, it requires organisations to take "measures" that ensure sufficient literacy, considering three factors:
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Factor 1: The Person's Background
                </h3>
                <p className="text-muted-foreground">
                  Technical knowledge, experience, education, and existing training. A software engineer operating an ML pipeline needs different training than a recruiter using an AI screening tool. The obligation is proportionate—not everyone needs the same depth.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Factor 2: The Context of Use
                </h3>
                <p className="text-muted-foreground">
                  What the AI system does, how it's used in the organisation's workflows, and what decisions it influences. Using ChatGPT for internal brainstorming requires less training depth than using an AI system for credit scoring or employment decisions that directly affect people's lives.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Factor 3: The Affected Persons
                </h3>
                <p className="text-muted-foreground">
                  Who is impacted by the AI system's outputs—customers, employees, job candidates, students, patients, or the general public. When vulnerable groups are affected (minors, elderly, disabled persons), the literacy standard is higher because mistakes carry greater consequences.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 border border-primary/30 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">
                <strong>Klarvo's approach:</strong> We map training tiers to these three factors. When you add an AI system to your inventory and assign operators, Klarvo auto-suggests the appropriate training tier based on the system's classification, affected groups, and the operator's role. This ensures proportionate, defensible training coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
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
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Tiers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Role-Based Training Tiers</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Different roles need different training depths. Here's the framework Klarvo uses, aligned with Article 4's proportionality principle:
            </p>
            <div className="space-y-4">
              {trainingTiers.map((tier, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{tier.tier}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1"><strong>Audience:</strong> {tier.audience}</div>
                        <div className="text-sm mb-2"><strong>Covers:</strong> {tier.content}</div>
                        <div className="text-xs text-muted-foreground italic">{tier.article4Reference}</div>
                      </div>
                      <div className="text-sm shrink-0">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Add Training</h3>
                  <p className="text-sm text-muted-foreground">Upload training materials (PDF, video links) or link to external courses. Optionally add quiz questions.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Assign by Role</h3>
                  <p className="text-sm text-muted-foreground">Match training tiers to staff roles. Auto-assign when users are added as AI system operators.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Track & Remind</h3>
                  <p className="text-sm text-muted-foreground">Monitor completion by person, role, and department. Automatic reminders until complete.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Export Reports</h3>
                  <p className="text-sm text-muted-foreground">Generate audit-ready completion evidence linked to LIT-01, LIT-02, LIT-03 controls.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Evidence Auditors Expect */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Evidence Auditors Expect for Article 4</h2>
              <p className="text-lg text-muted-foreground">
                When auditors or procurement teams ask about AI literacy, they want to see structured records—not a vague statement that "we train our staff."
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Training programme documentation</div>
                  <p className="text-xs text-muted-foreground">What training exists, what it covers, and how tiers map to roles</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Completion records per person</div>
                  <p className="text-xs text-muted-foreground">Who completed, when, which training module, and any assessment results</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Policy acknowledgements</div>
                  <p className="text-xs text-muted-foreground">AI acceptable use policy sign-offs with timestamps</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Re-certification schedule</div>
                  <p className="text-xs text-muted-foreground">Proof that training is refreshed regularly, not a one-time exercise</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Coverage by AI system</div>
                  <p className="text-xs text-muted-foreground">Which staff operate which AI systems and what training they received for each</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Contractor/third-party coverage</div>
                  <p className="text-xs text-muted-foreground">Evidence that external parties operating AI on your behalf are also trained</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Klarvo exports all of this as a single evidence report linked to your AI literacy controls (LIT-01, LIT-02, LIT-03).
            </p>
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
                  <CardTitle className="text-lg">AI Literacy Guide (Article 4)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deep dive into Article 4 requirements with practical implementation steps and real-world examples.
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
                  <CardTitle className="text-lg">AI Acceptable Use Policy Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ready-to-use policy template for staff AI usage. Track acknowledgements alongside training completion.
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
