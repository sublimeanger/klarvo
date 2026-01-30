import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  Scale,
  Eye,
  CheckCircle,
  Loader2,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Separator } from "@/components/ui/separator";
import { useAISystem } from "@/hooks/useAISystems";
import { useClassification, useCreateOrUpdateClassification } from "@/hooks/useClassification";
import { useControlLibrary, useInitializeControls } from "@/hooks/useControls";
import { toast } from "sonner";

// Prohibited practices questions (Article 5)
const PROHIBITED_QUESTIONS = [
  {
    id: "PROH-01",
    question: "Does the system use subliminal, manipulative, or deceptive techniques likely to distort behaviour and cause significant harm?",
    helpText: "This includes techniques designed to materially distort a person's behaviour in a way that causes or is likely to cause significant harm.",
  },
  {
    id: "PROH-02", 
    question: "Does it exploit vulnerabilities (age, disability, socio-economic situation) in a way likely to cause significant harm?",
    helpText: "Systems that target vulnerable groups to materially distort their behaviour.",
  },
  {
    id: "PROH-03",
    question: "Does it perform 'social scoring' of individuals for decisions in unrelated contexts?",
    helpText: "Evaluation or classification of natural persons based on social behaviour or personality characteristics.",
  },
  {
    id: "PROH-04",
    question: "Does it assess/predict criminal risk based solely on profiling or personality traits?",
    helpText: "Risk assessment without objective, verifiable facts and not solely based on profiling.",
  },
  {
    id: "PROH-05",
    question: "Does it create/expand facial recognition databases via untargeted scraping?",
    helpText: "Untargeted scraping of facial images from the internet or CCTV footage.",
  },
  {
    id: "PROH-06",
    question: "Does it infer emotions in workplace or education settings?",
    helpText: "Except where it's for medical or safety reasons.",
  },
  {
    id: "PROH-07",
    question: "Does it do biometric categorisation that could reveal sensitive/protected characteristics?",
    helpText: "Categorising individuals based on biometric data to deduce race, political opinions, religion, etc.",
  },
];

// High-risk categories (Annex III)
const HIGH_RISK_QUESTIONS = [
  {
    id: "HR-01",
    question: "Is it used for biometric identification, categorisation, or emotion recognition?",
    category: "biometrics",
  },
  {
    id: "HR-02",
    question: "Is it used in critical infrastructure (energy, transport, water, digital)?",
    category: "critical_infrastructure",
  },
  {
    id: "HR-03",
    question: "Education or vocational training (admissions, scoring, proctoring, learning assessment)?",
    category: "education",
  },
  {
    id: "HR-04",
    question: "Employment / worker management (recruiting, CV filtering, performance, monitoring)?",
    category: "employment",
  },
  {
    id: "HR-05",
    question: "Access to essential services (credit, insurance, housing, healthcare access, benefits)?",
    category: "essential_services",
  },
  {
    id: "HR-06",
    question: "Law enforcement (evidence assessment, risk assessment, investigation support)?",
    category: "law_enforcement",
  },
  {
    id: "HR-07",
    question: "Migration, asylum, border control (visa assessment, risk, identity checks)?",
    category: "migration",
  },
  {
    id: "HR-08",
    question: "Administration of justice or democratic processes?",
    category: "justice",
  },
];

// Transparency questions (Article 50)
const TRANSPARENCY_QUESTIONS = [
  {
    id: "TR-01",
    question: "Does the system interact directly with natural persons (chatbots, virtual assistants)?",
    category: "interaction",
  },
  {
    id: "TR-02",
    question: "Does it generate synthetic audio, image, video, or text content?",
    category: "synthetic_content",
  },
  {
    id: "TR-03",
    question: "Does it generate or manipulate content that could be considered a 'deepfake'?",
    category: "deepfake",
  },
  {
    id: "TR-04",
    question: "Does it generate text published to inform the public on matters of public interest?",
    category: "public_interest_text",
  },
];

const steps = [
  { id: 1, title: "Prohibited Practices", icon: ShieldAlert },
  { id: 2, title: "High-Risk Screening", icon: AlertTriangle },
  { id: 3, title: "Transparency", icon: Eye },
  { id: 4, title: "Result", icon: CheckCircle },
];

type AnswerValue = "yes" | "no" | "unsure" | "";

export default function ClassificationWizard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Answers state
  const [prohibitedAnswers, setProhibitedAnswers] = useState<Record<string, AnswerValue>>({});
  const [highRiskAnswers, setHighRiskAnswers] = useState<Record<string, AnswerValue>>({});
  const [transparencyAnswers, setTransparencyAnswers] = useState<Record<string, AnswerValue>>({});
  const [notes, setNotes] = useState({ prohibited: "", highRisk: "", transparency: "" });

  const { data: system, isLoading: systemLoading } = useAISystem(id);
  const { data: existingClassification } = useClassification(id);
  const saveClassification = useCreateOrUpdateClassification();
  const { data: allControls } = useControlLibrary();
  const initializeControls = useInitializeControls();

  // Initialize from existing classification
  useEffect(() => {
    if (existingClassification) {
      // Could load existing answers here if stored separately
    }
  }, [existingClassification]);

  const progress = (currentStep / steps.length) * 100;

  // Calculate results
  const hasProhibitedIndicator = Object.values(prohibitedAnswers).some(v => v === "yes");
  const hasProhibitedUnsure = Object.values(prohibitedAnswers).some(v => v === "unsure");
  
  const highRiskCategories = Object.entries(highRiskAnswers)
    .filter(([_, v]) => v === "yes")
    .map(([id]) => HIGH_RISK_QUESTIONS.find(q => q.id === id)?.category)
    .filter(Boolean) as string[];
  const isHighRiskCandidate = highRiskCategories.length > 0;
  
  const transparencyCategories = Object.entries(transparencyAnswers)
    .filter(([_, v]) => v === "yes")
    .map(([id]) => TRANSPARENCY_QUESTIONS.find(q => q.id === id)?.category)
    .filter(Boolean) as string[];
  const hasTransparencyObligations = transparencyCategories.length > 0;

  // Determine final risk level
  const calculateRiskLevel = () => {
    if (hasProhibitedIndicator) return "prohibited";
    if (isHighRiskCandidate) return "high_risk";
    if (hasTransparencyObligations) return "limited_risk";
    return "minimal_risk";
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!id) return;

    const riskLevel = calculateRiskLevel();
    const hasVendor = !!system?.vendor_id;
    
    await saveClassification.mutateAsync({
      ai_system_id: id,
      is_ai_system: true,
      prohibited_screening_completed: true,
      has_prohibited_indicators: hasProhibitedIndicator,
      prohibited_notes: notes.prohibited || null,
      high_risk_screening_completed: true,
      is_high_risk_candidate: isHighRiskCandidate,
      high_risk_categories: highRiskCategories.length > 0 ? highRiskCategories : null,
      high_risk_notes: notes.highRisk || null,
      transparency_screening_completed: true,
      has_transparency_obligations: hasTransparencyObligations,
      transparency_categories: transparencyCategories.length > 0 ? transparencyCategories : null,
      risk_level: riskLevel as any,
      confidence_level: hasProhibitedUnsure ? "medium" : "high",
      classification_rationale: `Automated classification based on ${Object.keys(prohibitedAnswers).length + Object.keys(highRiskAnswers).length + Object.keys(transparencyAnswers).length} screening questions.`,
    });

    // Auto-initialize applicable controls based on risk level
    if (allControls && riskLevel !== "prohibited") {
      const applicableControlIds = allControls
        .filter((control) => {
          const appliesTo = control.applies_to;
          if (appliesTo.includes("all")) return true;
          if (riskLevel === "high_risk" && appliesTo.includes("high_risk")) return true;
          if (riskLevel === "limited_risk" && appliesTo.includes("limited_risk")) return true;
          if (hasVendor && appliesTo.includes("vendor_based")) return true;
          return false;
        })
        .map((c) => c.id);

      if (applicableControlIds.length > 0) {
        await initializeControls.mutateAsync({
          aiSystemId: id,
          controlIds: applicableControlIds,
        });
        toast.success(`${applicableControlIds.length} controls initialized based on classification`);
      }
    }

    toast.success("Classification completed!");
    navigate(`/ai-systems/${id}`);
  };

  const renderQuestionGroup = (
    questions: Array<{ id: string; question: string; helpText?: string; category?: string }>,
    answers: Record<string, AnswerValue>,
    setAnswers: (a: Record<string, AnswerValue>) => void
  ) => (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div key={q.id} className="space-y-3">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-muted-foreground">{index + 1}.</span>
            <div className="flex-1">
              <p className="font-medium">{q.question}</p>
              {q.helpText && (
                <p className="text-sm text-muted-foreground mt-1">{q.helpText}</p>
              )}
            </div>
          </div>
          <RadioGroup
            value={answers[q.id] || ""}
            onValueChange={(v) => setAnswers({ ...answers, [q.id]: v as AnswerValue })}
            className="flex gap-4 ml-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${q.id}-yes`} />
              <Label htmlFor={`${q.id}-yes`} className="text-destructive font-medium">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${q.id}-no`} />
              <Label htmlFor={`${q.id}-no`} className="text-success font-medium">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id={`${q.id}-unsure`} />
              <Label htmlFor={`${q.id}-unsure`} className="text-warning font-medium">Unsure</Label>
            </div>
          </RadioGroup>
          {index < questions.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Prohibited Practices Screening</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Article 5 of the EU AI Act prohibits certain AI practices. If any apply, the system cannot be used.
                  </p>
                </div>
              </div>
            </div>
            {renderQuestionGroup(PROHIBITED_QUESTIONS, prohibitedAnswers, setProhibitedAnswers)}
            <div className="space-y-2">
              <Label>Additional notes</Label>
              <Textarea
                value={notes.prohibited}
                onChange={(e) => setNotes({ ...notes, prohibited: e.target.value })}
                placeholder="Any context or clarifications..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning">High-Risk Screening (Annex III)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    These categories require additional compliance obligations under the EU AI Act.
                  </p>
                </div>
              </div>
            </div>
            {renderQuestionGroup(HIGH_RISK_QUESTIONS, highRiskAnswers, setHighRiskAnswers)}
            <div className="space-y-2">
              <Label>Additional notes</Label>
              <Textarea
                value={notes.highRisk}
                onChange={(e) => setNotes({ ...notes, highRisk: e.target.value })}
                placeholder="Any context or clarifications..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-info/20 bg-info/5 p-4">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-info mt-0.5" />
                <div>
                  <p className="font-medium text-info">Transparency Obligations (Article 50)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    These trigger disclosure requirements to users and affected persons.
                  </p>
                </div>
              </div>
            </div>
            {renderQuestionGroup(TRANSPARENCY_QUESTIONS, transparencyAnswers, setTransparencyAnswers)}
            <div className="space-y-2">
              <Label>Additional notes</Label>
              <Textarea
                value={notes.transparency}
                onChange={(e) => setNotes({ ...notes, transparency: e.target.value })}
                placeholder="Any context or clarifications..."
              />
            </div>
          </div>
        );

      case 4:
        const riskLevel = calculateRiskLevel();
        const riskConfig = {
          prohibited: { label: "Prohibited", variant: "prohibited" as const, icon: XCircle, color: "text-risk-prohibited" },
          high_risk: { label: "High-Risk", variant: "high" as const, icon: AlertTriangle, color: "text-risk-high" },
          limited_risk: { label: "Limited Risk", variant: "limited" as const, icon: Eye, color: "text-risk-limited" },
          minimal_risk: { label: "Minimal Risk", variant: "minimal" as const, icon: CheckCircle, color: "text-risk-minimal" },
        };
        const config = riskConfig[riskLevel];

        return (
          <div className="space-y-6">
            {/* Result Summary */}
            <div className={`rounded-lg border p-6 text-center ${
              riskLevel === "prohibited" ? "border-risk-prohibited/30 bg-risk-prohibited/5" :
              riskLevel === "high_risk" ? "border-risk-high/30 bg-risk-high/5" :
              riskLevel === "limited_risk" ? "border-risk-limited/30 bg-risk-limited/5" :
              "border-risk-minimal/30 bg-risk-minimal/5"
            }`}>
              <config.icon className={`h-12 w-12 mx-auto ${config.color}`} />
              <h3 className="text-2xl font-bold mt-4">{config.label}</h3>
              <p className="text-muted-foreground mt-2">
                Based on your answers, this AI system is classified as <strong>{config.label.toLowerCase()}</strong>.
              </p>
            </div>

            {/* Findings Summary */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Prohibited Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasProhibitedIndicator ? (
                    <StatusBadge variant="prohibited" dot>Indicators Found</StatusBadge>
                  ) : hasProhibitedUnsure ? (
                    <StatusBadge variant="warning" dot>Needs Review</StatusBadge>
                  ) : (
                    <StatusBadge variant="success" dot>None Found</StatusBadge>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    High-Risk Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isHighRiskCandidate ? (
                    <div>
                      <StatusBadge variant="high" dot>{highRiskCategories.length} Categories</StatusBadge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {highRiskCategories.join(", ")}
                      </p>
                    </div>
                  ) : (
                    <StatusBadge variant="success" dot>Not High-Risk</StatusBadge>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasTransparencyObligations ? (
                    <div>
                      <StatusBadge variant="limited" dot>Required</StatusBadge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {transparencyCategories.join(", ")}
                      </p>
                    </div>
                  ) : (
                    <StatusBadge variant="success" dot>None Required</StatusBadge>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {riskLevel === "prohibited" && (
                  <p className="text-destructive font-medium">
                    ⚠️ This system should not be deployed. Consult legal counsel immediately.
                  </p>
                )}
                {riskLevel === "high_risk" && (
                  <>
                    <p>• Complete deployer obligations checklist (human oversight, logging, monitoring)</p>
                    <p>• Upload vendor documentation and evidence</p>
                    <p>• Assign competent oversight personnel</p>
                  </>
                )}
                {riskLevel === "limited_risk" && (
                  <>
                    <p>• Implement required transparency disclosures</p>
                    <p>• Upload disclosure evidence (screenshots, notices)</p>
                  </>
                )}
                {riskLevel === "minimal_risk" && (
                  <p>No mandatory obligations, but voluntary codes of conduct are encouraged.</p>
                )}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (systemLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!system) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/ai-systems")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to AI Systems
        </Button>
        <Card className="border-destructive">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">System Not Found</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/ai-systems/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Classify: {system.name}</h1>
          <p className="text-muted-foreground">EU AI Act risk classification wizard</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 text-sm ${
                step.id <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <step.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Screen for prohibited AI practices under Article 5"}
            {currentStep === 2 && "Check if this system falls under high-risk categories (Annex III)"}
            {currentStep === 3 && "Determine transparency and disclosure obligations"}
            {currentStep === 4 && "Review classification result and next steps"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={saveClassification.isPending}>
                {saveClassification.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Classification
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
