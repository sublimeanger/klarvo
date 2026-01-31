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
  FileSearch, 
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  RefreshCw
} from "lucide-react";

const questions = [
  {
    id: "infers",
    question: "Does the system infer outputs from inputs to achieve objectives?",
    help: "Does it produce predictions, recommendations, decisions, or content that weren't explicitly programmed for each specific input?",
  },
  {
    id: "outputs",
    question: "What types of outputs does it produce?",
    help: "Consider: predictions, recommendations, decisions, classifications, generated content, scores, or other derived outputs.",
    isMultiple: true,
    options: ["Predictions", "Recommendations", "Decisions", "Classifications", "Generated content", "Scores", "None of the above"],
  },
  {
    id: "autonomy",
    question: "Does it operate with some autonomy (not purely manual rules)?",
    help: "Does it make decisions or produce outputs without a human explicitly defining the logic for each case?",
  },
  {
    id: "learning",
    question: "Does it use machine learning, deep learning, or statistical approaches?",
    help: "Consider: neural networks, LLMs, supervised/unsupervised learning, optimization algorithms, or statistical models.",
  },
];

const faqQuestions = [
  {
    question: "What is the EU AI Act definition of an AI system?",
    answer: "Under the EU AI Act, an 'AI system' is a machine-based system designed to operate with varying levels of autonomy, that may exhibit adaptiveness after deployment, and that infers from inputs to generate outputs such as predictions, recommendations, decisions, or content."
  },
  {
    question: "Why does the AI system definition matter?",
    answer: "If your software qualifies as an AI system, it falls under the EU AI Act's scope and may have associated obligations depending on its risk classification. If it's not an AI system, the Act doesn't apply."
  },
  {
    question: "What if I'm unsure whether my system is AI?",
    answer: "The European Commission has published guidance to help interpret the definition. For borderline cases, document your reasoning and consider seeking legal advice. Klarvo can store your rationale for audit purposes."
  },
  {
    question: "Are all software systems with algorithms AI systems?",
    answer: "No. Traditional rule-based systems, simple automation, or basic calculations typically don't qualify as AI systems under the Act. The key factors are inference capability and some degree of autonomy."
  }
];

export default function AIDefinitionChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const faqSchema = createFAQSchema({ questions: faqQuestions });
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://klarvo.io" },
      { name: "Tools", url: "https://klarvo.io/tools" },
      { name: "AI System Definition Checker", url: "https://klarvo.io/tools/ai-system-definition-checker" }
    ]
  });

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const getResult = () => {
    const yesCount = Object.values(answers).filter(a => a === "yes").length;
    const hasOutputs = answers.outputs && answers.outputs !== "None of the above";
    
    if (yesCount >= 3 && hasOutputs) {
      return { status: "likely", label: "Likely an AI System", color: "destructive" };
    } else if (yesCount >= 2 || hasOutputs) {
      return { status: "review", label: "Needs Review", color: "warning" };
    }
    return { status: "unlikely", label: "Likely Not an AI System", color: "success" };
  };

  const result = getResult();

  return (
    <MarketingLayout>
      <SEOHead
        title="AI System Definition Checker - EU AI Act"
        description="Free tool to check if your software qualifies as an 'AI system' under the EU AI Act definition. Get instant results with documentation."
        keywords={["AI system definition", "EU AI Act definition", "is this AI", "AI system checker", "AI Act scope"]}
        canonical="https://klarvo.io/tools/ai-system-definition-checker"
      />
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Free Tool</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI System Definition Checker
            </h1>
            <p className="text-xl text-muted-foreground">
              Determine if your software qualifies as an "AI system" under the EU AI Act definition.
            </p>
          </div>
        </div>
      </section>

      {/* Checker Tool */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileSearch className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Definition Check</CardTitle>
                    <CardDescription>Answer a few questions about your system</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!showResult ? (
                  <div className="space-y-6">
                    {/* Progress */}
                    <div className="flex gap-2">
                      {questions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary/50" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Question */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{questions[currentStep].question}</h3>
                      <p className="text-sm text-muted-foreground">{questions[currentStep].help}</p>
                      
                      <RadioGroup
                        value={answers[questions[currentStep].id] || ""}
                        onValueChange={handleAnswer}
                        className="space-y-3"
                      >
                        {questions[currentStep].isMultiple ? (
                          questions[currentStep].options?.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option}>{option}</Label>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="unsure" id="unsure" />
                              <Label htmlFor="unsure">Unsure</Label>
                            </div>
                          </>
                        )}
                      </RadioGroup>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!answers[questions[currentStep].id]}
                      >
                        {currentStep === questions.length - 1 ? "Get Result" : "Next"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-center">
                    {/* Result Icon */}
                    <div className="flex justify-center">
                      {result.status === "likely" && (
                        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                          <AlertCircle className="h-10 w-10 text-destructive" />
                        </div>
                      )}
                      {result.status === "review" && (
                        <div className="h-20 w-20 rounded-full bg-warning/10 flex items-center justify-center">
                          <AlertCircle className="h-10 w-10 text-warning" />
                        </div>
                      )}
                      {result.status === "unlikely" && (
                        <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle className="h-10 w-10 text-success" />
                        </div>
                      )}
                    </div>

                    {/* Result */}
                    <div>
                      <Badge variant={result.color as any} className="mb-2 text-lg px-4 py-1">
                        {result.label}
                      </Badge>
                      <p className="text-muted-foreground mt-4">
                        {result.status === "likely" && 
                          "Based on your answers, this system likely qualifies as an AI system under the EU AI Act. You should proceed with risk classification."}
                        {result.status === "review" && 
                          "Some indicators suggest this could be an AI system, but further review is recommended. Consider consulting the Commission's guidance."}
                        {result.status === "unlikely" && 
                          "Based on your answers, this system likely does not qualify as an AI system under the EU AI Act. Document your rationale for audit purposes."}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button variant="outline" onClick={reset}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Result
                      </Button>
                      {result.status !== "unlikely" && (
                        <Button asChild>
                          <Link to="/tools/high-risk-checker-annex-iii">
                            Check Risk Level
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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
        title="Need Full Compliance Management?"
        subtitle="Save your definition results in Klarvo and proceed with classification, evidence, and exports."
        primaryCta={{ label: "Start Free", href: "/auth/signup" }}
        secondaryCta={{ label: "See All Tools", href: "/tools" }}
      />
    </MarketingLayout>
  );
}
