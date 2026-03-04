import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { CTASection } from "@/components/marketing/CTASection";
import { SEOHead, SchemaMarkup, createFAQSchema, createBreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

const prohibitedPractices = [
  {
    id: "manipulation",
    title: "Harmful Manipulation/Deception",
    question: "Does the system use subliminal, manipulative, or deceptive techniques likely to distort behavior and cause significant harm?",
    article: "Article 5(1)(a)"
  },
  {
    id: "exploitation",
    title: "Exploitation of Vulnerabilities",
    question: "Does it exploit vulnerabilities (age, disability, social/economic situation) in ways likely to cause significant harm?",
    article: "Article 5(1)(b)"
  },
  {
    id: "socialscoring",
    title: "Social Scoring",
    question: "Does it evaluate/classify people based on social behavior for unrelated decisions leading to detrimental treatment?",
    article: "Article 5(1)(c)"
  },
  {
    id: "criminal",
    title: "Criminal Risk Profiling",
    question: "Does it assess/predict criminal offense risk based solely on profiling or personality traits?",
    article: "Article 5(1)(d)"
  },
  {
    id: "facialdb",
    title: "Facial Recognition Database",
    question: "Does it create/expand facial recognition databases through untargeted scraping of images?",
    article: "Article 5(1)(e)"
  },
  {
    id: "emotion",
    title: "Workplace/Education Emotion Inference",
    question: "Does it infer emotions in workplace or educational settings (except for medical/safety purposes)?",
    article: "Article 5(1)(f)"
  },
  {
    id: "biometric",
    title: "Sensitive Biometric Categorisation",
    question: "Does it categorise people based on biometric data to infer race, political opinions, religion, sexual orientation, etc.?",
    article: "Article 5(1)(g)"
  },
  {
    id: "realtime",
    title: "Real-time Remote Biometric ID",
    question: "Does it use real-time remote biometric identification in publicly accessible spaces for law enforcement?",
    article: "Article 5(1)(h)"
  },
];

const faqQuestions = [
  {
    question: "What happens if I have a prohibited AI practice?",
    answer: "Prohibited AI practices are banned under the EU AI Act. If any of these apply, you must stop using the AI system immediately and seek legal advice. These are the most serious violations under the Act."
  },
  {
    question: "When did prohibited practice rules apply?",
    answer: "The prohibition on these practices applied from 2 February 2025, making this one of the earliest enforcement dates in the EU AI Act timeline."
  },
  {
    question: "What if I'm unsure about an answer?",
    answer: "If you're uncertain, answer 'Unsure' and seek clarification from legal counsel or compliance experts. It's better to investigate thoroughly than to assume compliance."
  }
];

export default function ProhibitedPracticesScreening() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const hasYes = Object.values(answers).some(v => v === "yes");
  const hasUnsure = Object.values(answers).some(v => v === "unsure");
  const allAnswered = Object.keys(answers).length === prohibitedPractices.length;
  const allNo = allAnswered && !hasYes && !hasUnsure;

  const faqSchema = createFAQSchema({ questions: faqQuestions });

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Tools", url: "https://klarvo.io/tools" },
      { name: "Prohibited Practices Screening", url: "https://klarvo.io/tools/prohibited-practices-screening" }
    ]
  });

  return (
    <MarketingLayout>
      <SEOHead
        title="Prohibited AI Practices Screening Tool - Article 5"
        description="Screen your AI systems against EU AI Act Article 5 prohibited practices. Check for manipulation, exploitation, social scoring, and other banned uses."
        keywords={["prohibited AI practices", "Article 5 checker", "banned AI uses", "EU AI Act prohibited", "AI compliance screening"]}
        canonical="https://klarvo.io/tools/prohibited-practices-screening"
      />
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="destructive">Critical</Badge>
              <Badge variant="outline">Article 5</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prohibited Practices Screening
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Screen your AI systems against the 8 prohibited practices under Article 5. These rules applied from 2 February 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Screening */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {prohibitedPractices.map((practice, index) => (
              <Card key={practice.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">{practice.article}</Badge>
                      </div>
                      <CardDescription className="text-base">{practice.question}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-6 sm:pl-16">
                  <RadioGroup
                    value={answers[practice.id] || ""}
                    onValueChange={(value) => setAnswer(practice.id, value)}
                    className="flex flex-wrap gap-4 sm:gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${practice.id}-no`} />
                      <Label htmlFor={`${practice.id}-no`}>No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${practice.id}-yes`} />
                      <Label htmlFor={`${practice.id}-yes`}>Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id={`${practice.id}-unsure`} />
                      <Label htmlFor={`${practice.id}-unsure`}>Unsure</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Screening Result</h2>
            
            {!allAnswered ? (
              <Card className="bg-muted/30">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Answer all questions above to see your screening result.</p>
                </CardContent>
              </Card>
            ) : hasYes ? (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="h-8 w-8 text-destructive shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-destructive mb-2">Potential Prohibited Practice Detected</h3>
                      <p className="text-muted-foreground mb-4">
                        Your answers indicate a potential prohibited practice. You must stop using this AI system and seek legal advice immediately.
                      </p>
                      <Button variant="destructive" asChild>
                        <a href="https://app.klarvo.io/auth/signup">
                          Get Compliance Support
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : hasUnsure ? (
              <Card className="border-warning bg-warning/5">
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-8 w-8 text-warning shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Review Required</h3>
                      <p className="text-muted-foreground mb-4">
                        Some answers are uncertain. Document your analysis and seek legal review before proceeding.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="https://app.klarvo.io/auth/signup">
                          Document in Klarvo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-success bg-success/5">
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-8 w-8 text-success shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">No Prohibited Indicators Found</h3>
                      <p className="text-muted-foreground mb-4">
                        Based on your answers, this AI system does not appear to involve prohibited practices. Document this screening for your records.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button asChild>
                          <Link to="/tools/high-risk-checker-annex-iii">
                            Check High-Risk Status
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href="https://app.klarvo.io/auth/signup">Save to Klarvo</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
        title="Document Your Compliance Screening"
        subtitle="Klarvo stores all your screening results with audit trails."
        primaryCta={{ label: "Start Free", href: "https://app.klarvo.io/auth/signup" }}
        secondaryCta={{ label: "See All Tools", href: "/tools" }}
      />
    </MarketingLayout>
  );
}
