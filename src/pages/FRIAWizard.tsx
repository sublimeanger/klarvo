import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Scale,
  Users,
  ShieldAlert,
  FileCheck,
  AlertTriangle,
  ClipboardCheck,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAISystem } from "@/hooks/useAISystems";
import { useFRIA, useCreateFRIA, useUpdateFRIA, useCompleteFRIA, type FRIARisk } from "@/hooks/useFRIA";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import { useAuth } from "@/contexts/AuthContext";
import { logFRIAEvent } from "@/lib/auditLogger";

const STEPS = [
  { id: 1, title: "Overview", icon: FileCheck },
  { id: 2, title: "Process", icon: Settings },
  { id: 3, title: "Scope", icon: Users },
  { id: 4, title: "Risks", icon: ShieldAlert },
  { id: 5, title: "Oversight", icon: Scale },
  { id: 6, title: "Mitigation", icon: ClipboardCheck },
  { id: 7, title: "Approval", icon: CheckCircle },
];

const AFFECTED_CATEGORIES = [
  { id: "customers", label: "Customers" },
  { id: "employees", label: "Employees" },
  { id: "job_candidates", label: "Job Candidates" },
  { id: "students", label: "Students" },
  { id: "patients", label: "Patients" },
  { id: "general_public", label: "General Public" },
  { id: "minors", label: "Minors" },
  { id: "vulnerable_groups", label: "Vulnerable Groups" },
];

const RISK_CATEGORIES = [
  { id: "discrimination", label: "Non-discrimination / Fairness" },
  { id: "privacy", label: "Privacy & Data Protection" },
  { id: "expression", label: "Freedom of Expression" },
  { id: "worker_rights", label: "Worker Rights" },
  { id: "due_process", label: "Due Process / Contestability" },
  { id: "essential_services", label: "Access to Essential Services" },
  { id: "safety", label: "Safety / Wellbeing" },
];

const REASSESSMENT_TRIGGERS = [
  { id: "model_change", label: "Model/algorithm change" },
  { id: "use_case_change", label: "New use case" },
  { id: "vendor_change", label: "Vendor change" },
  { id: "incident", label: "Incident occurs" },
  { id: "regulation_change", label: "Regulatory change" },
  { id: "annual_review", label: "Annual review" },
];

export default function FRIAWizard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [title, setTitle] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [isFirstUse, setIsFirstUse] = useState(true);
  const [hasDPIA, setHasDPIA] = useState<boolean | null>(null);
  
  const [processDescription, setProcessDescription] = useState("");
  const [intendedPurpose, setIntendedPurpose] = useState("");
  const [decisionPoints, setDecisionPoints] = useState("");
  const [oversightDescription, setOversightDescription] = useState("");
  
  const [deploymentDuration, setDeploymentDuration] = useState("");
  const [usageFrequency, setUsageFrequency] = useState("");
  const [affectedScale, setAffectedScale] = useState("");
  const [affectedCategories, setAffectedCategories] = useState<string[]>([]);
  const [hasVulnerableGroups, setHasVulnerableGroups] = useState<boolean | null>(null);
  const [notificationMethod, setNotificationMethod] = useState("");
  
  const [risks, setRisks] = useState<FRIARisk[]>([]);
  
  const [oversightDesign, setOversightDesign] = useState("");
  const [oversightCompetence, setOversightCompetence] = useState("");
  const [hasIntervention, setHasIntervention] = useState<boolean | null>(null);
  
  const [mitigationMeasures, setMitigationMeasures] = useState("");
  const [governanceArrangements, setGovernanceArrangements] = useState("");
  const [complaintMechanism, setComplaintMechanism] = useState("");
  const [monitoringPlan, setMonitoringPlan] = useState("");
  const [reassessmentTriggers, setReassessmentTriggers] = useState<string[]>([]);
  
  const [finalConclusion, setFinalConclusion] = useState<"approve" | "approve_with_mitigations" | "do_not_deploy" | null>(null);
  const [notifyAuthority, setNotifyAuthority] = useState(false);

  const { data: system, isLoading: systemLoading } = useAISystem(id);
  const { data: existingFRIA, isLoading: friaLoading } = useFRIA(id);
  const { members } = useOrgMembers();
  const createFRIA = useCreateFRIA();
  const updateFRIA = useUpdateFRIA();
  const completeFRIA = useCompleteFRIA();
  const { profile, user } = useAuth();

  // Initialize from existing FRIA
  useEffect(() => {
    if (existingFRIA) {
      setTitle(existingFRIA.title || "");
      setOwnerId(existingFRIA.assessment_owner_id || "");
      setExpectedDate(existingFRIA.expected_deployment_date || "");
      setIsFirstUse(existingFRIA.is_first_use ?? true);
      setHasDPIA(existingFRIA.has_existing_dpia);
      setProcessDescription(existingFRIA.process_description || "");
      setIntendedPurpose(existingFRIA.intended_purpose || "");
      setDecisionPoints(existingFRIA.decision_points || "");
      setOversightDescription(existingFRIA.human_oversight_description || "");
      setDeploymentDuration(existingFRIA.deployment_duration || "");
      setUsageFrequency(existingFRIA.usage_frequency || "");
      setAffectedScale(existingFRIA.affected_scale_per_month?.toString() || "");
      setAffectedCategories(existingFRIA.affected_categories || []);
      setHasVulnerableGroups(existingFRIA.has_vulnerable_groups);
      setNotificationMethod(existingFRIA.affected_notification_method || "");
      setRisks(existingFRIA.identified_risks as FRIARisk[] || []);
      setOversightDesign(existingFRIA.oversight_design || "");
      setOversightCompetence(existingFRIA.oversight_competence || "");
      setHasIntervention(existingFRIA.has_intervention_authority);
      setMitigationMeasures(existingFRIA.mitigation_measures || "");
      setGovernanceArrangements(existingFRIA.governance_arrangements || "");
      setComplaintMechanism(existingFRIA.complaint_mechanism || "");
      setMonitoringPlan(existingFRIA.monitoring_plan || "");
      setReassessmentTriggers(existingFRIA.reassessment_triggers || []);
    } else if (system) {
      setTitle(`FRIA - ${system.name}`);
    }
  }, [existingFRIA, system]);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = async () => {
    // Save progress
    if (existingFRIA) {
      await saveProgress();
    } else if (currentStep === 1 && title) {
      // Create FRIA on first next
      const result = await createFRIA.mutateAsync({
        ai_system_id: id!,
        title,
      });
      if (result) {
        // Update with additional data
        await updateFRIA.mutateAsync({
          id: result.id,
          assessment_owner_id: ownerId || null,
          expected_deployment_date: expectedDate || null,
          is_first_use: isFirstUse,
          has_existing_dpia: hasDPIA,
          status: "in_progress",
        });
      }
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveProgress = async () => {
    if (!existingFRIA) return;

    await updateFRIA.mutateAsync({
      id: existingFRIA.id,
      title,
      assessment_owner_id: ownerId || null,
      expected_deployment_date: expectedDate || null,
      is_first_use: isFirstUse,
      has_existing_dpia: hasDPIA,
      process_description: processDescription || null,
      intended_purpose: intendedPurpose || null,
      decision_points: decisionPoints || null,
      human_oversight_description: oversightDescription || null,
      deployment_duration: deploymentDuration || null,
      usage_frequency: usageFrequency || null,
      affected_scale_per_month: affectedScale ? parseInt(affectedScale) : null,
      affected_categories: affectedCategories.length > 0 ? affectedCategories : null,
      has_vulnerable_groups: hasVulnerableGroups,
      affected_notification_method: notificationMethod || null,
      identified_risks: risks.length > 0 ? risks : null,
      oversight_design: oversightDesign || null,
      oversight_competence: oversightCompetence || null,
      has_intervention_authority: hasIntervention,
      mitigation_measures: mitigationMeasures || null,
      governance_arrangements: governanceArrangements || null,
      complaint_mechanism: complaintMechanism || null,
      monitoring_plan: monitoringPlan || null,
      reassessment_triggers: reassessmentTriggers.length > 0 ? reassessmentTriggers : null,
    });
  };

  const handleComplete = async () => {
    if (!existingFRIA || !finalConclusion) return;

    await saveProgress();
    await completeFRIA.mutateAsync({
      id: existingFRIA.id,
      final_conclusion: finalConclusion,
      notify_authority: notifyAuthority,
    });

    // Log audit event
    if (profile?.organization_id && id) {
      logFRIAEvent(
        profile.organization_id,
        user?.id,
        "fria.completed",
        existingFRIA.id,
        existingFRIA.title,
        id,
        finalConclusion
      );
    }

    toast.success("FRIA completed successfully!");
    navigate(`/ai-systems/${id}`);
  };

  const addRisk = () => {
    setRisks([...risks, { category: "", description: "", likelihood: "medium", severity: "medium" }]);
  };

  const updateRisk = (index: number, field: keyof FRIARisk, value: string) => {
    const updated = [...risks];
    updated[index] = { ...updated[index], [field]: value };
    setRisks(updated);
  };

  const removeRisk = (index: number) => {
    setRisks(risks.filter((_, i) => i !== index));
  };

  if (systemLoading || friaLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!system) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">AI System not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/ai-systems/${id}`)} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-semibold truncate">Fundamental Rights Impact Assessment</h1>
          <p className="text-sm sm:text-base text-muted-foreground truncate">{system.name} • Article 27</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-muted-foreground">Step {currentStep} of {STEPS.length}</span>
          <span className="font-medium">{STEPS[currentStep - 1].title}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between overflow-x-auto pb-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isComplete = step.id < currentStep;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-1 shrink-0 ${
                  isActive ? "text-primary" : isComplete ? "text-success" : "text-muted-foreground"
                }`}
              >
                <div className={`rounded-full p-1.5 sm:p-2 ${
                  isActive ? "bg-primary/10" : isComplete ? "bg-success/10" : "bg-muted"
                }`}>
                  {isComplete ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Icon className="h-3 w-3 sm:h-4 sm:w-4" />}
                </div>
                <span className="text-[10px] sm:text-xs hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Overview */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">FRIA Overview</CardTitle>
                <CardDescription>
                  Basic information about this Fundamental Rights Impact Assessment
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assessment Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., FRIA - HR Recruitment AI"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Assessment Owner</Label>
                  <Select value={ownerId} onValueChange={setOwnerId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.full_name || "Unnamed"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Expected Deployment Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Is this the first use of this AI system?</Label>
                  <RadioGroup
                    value={isFirstUse ? "yes" : "no"}
                    onValueChange={(v) => setIsFirstUse(v === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="first-yes" />
                      <Label htmlFor="first-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="first-no" />
                      <Label htmlFor="first-no">No (update/reassessment)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Has a DPIA been completed that can be leveraged?</Label>
                  <RadioGroup
                    value={hasDPIA === null ? "" : hasDPIA ? "yes" : "no"}
                    onValueChange={(v) => setHasDPIA(v === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="dpia-yes" />
                      <Label htmlFor="dpia-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="dpia-no" />
                      <Label htmlFor="dpia-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Process Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Process Description</CardTitle>
                <CardDescription>
                  Describe how the AI system is used in your organization's processes
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="process">Describe the deployer's process where AI is used *</Label>
                  <Textarea
                    id="process"
                    value={processDescription}
                    onChange={(e) => setProcessDescription(e.target.value)}
                    placeholder="Describe the business process and how the AI system fits into it..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Intended purpose in that process *</Label>
                  <Textarea
                    id="purpose"
                    value={intendedPurpose}
                    onChange={(e) => setIntendedPurpose(e.target.value)}
                    placeholder="What specific goal does the AI system serve?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="decisions">Decision points affected</Label>
                  <Textarea
                    id="decisions"
                    value={decisionPoints}
                    onChange={(e) => setDecisionPoints(e.target.value)}
                    placeholder="What decisions are influenced by the AI system's outputs?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oversight-desc">Human oversight in the process</Label>
                  <Textarea
                    id="oversight-desc"
                    value={oversightDescription}
                    onChange={(e) => setOversightDescription(e.target.value)}
                    placeholder="How do humans review, validate, or override AI outputs?"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Scope - Duration, Frequency, Affected Persons */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Scope & Affected Persons</CardTitle>
                <CardDescription>
                  Define the scale, frequency, and who is affected by this AI system
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Deployment Duration</Label>
                    <Select value={deploymentDuration} onValueChange={setDeploymentDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3_months">3 months</SelectItem>
                        <SelectItem value="6_months">6 months</SelectItem>
                        <SelectItem value="1_year">1 year</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequency of Use</Label>
                    <Select value={usageFrequency} onValueChange={setUsageFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="continuous">Continuous</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="ad_hoc">Ad hoc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale">Estimated people affected per month</Label>
                  <Input
                    id="scale"
                    type="number"
                    value={affectedScale}
                    onChange={(e) => setAffectedScale(e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categories of persons affected</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {AFFECTED_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={cat.id}
                          checked={affectedCategories.includes(cat.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAffectedCategories([...affectedCategories, cat.id]);
                            } else {
                              setAffectedCategories(affectedCategories.filter((c) => c !== cat.id));
                            }
                          }}
                        />
                        <Label htmlFor={cat.id} className="text-sm font-normal">{cat.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Are vulnerable groups present?</Label>
                  <RadioGroup
                    value={hasVulnerableGroups === null ? "" : hasVulnerableGroups ? "yes" : "no"}
                    onValueChange={(v) => setHasVulnerableGroups(v === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="vuln-yes" />
                      <Label htmlFor="vuln-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="vuln-no" />
                      <Label htmlFor="vuln-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification">How will affected persons be informed?</Label>
                  <Textarea
                    id="notification"
                    value={notificationMethod}
                    onChange={(e) => setNotificationMethod(e.target.value)}
                    placeholder="Describe the notification approach..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Risks */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Risks of Harm</CardTitle>
                <CardDescription>
                  Identify potential harms to fundamental rights
                </CardDescription>
              </div>

              <div className="space-y-4">
                {risks.map((risk, index) => (
                  <div key={index} className="rounded-lg border p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Risk {index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeRisk(index)}>
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Risk Category</Label>
                      <Select value={risk.category} onValueChange={(v) => updateRisk(index, "category", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {RISK_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={risk.description}
                        onChange={(e) => updateRisk(index, "description", e.target.value)}
                        placeholder="Describe the potential harm..."
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Likelihood</Label>
                        <Select value={risk.likelihood} onValueChange={(v) => updateRisk(index, "likelihood", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Severity</Label>
                        <Select value={risk.severity} onValueChange={(v) => updateRisk(index, "severity", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={addRisk} className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Add Risk
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Human Oversight */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Human Oversight Measures</CardTitle>
                <CardDescription>
                  Describe the human oversight controls in place
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oversight-design">Oversight Design *</Label>
                  <Textarea
                    id="oversight-design"
                    value={oversightDesign}
                    onChange={(e) => setOversightDesign(e.target.value)}
                    placeholder="How is human oversight structured? Who reviews AI outputs?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competence">Oversight Competence/Training *</Label>
                  <Textarea
                    id="competence"
                    value={oversightCompetence}
                    onChange={(e) => setOversightCompetence(e.target.value)}
                    placeholder="What training do oversight personnel receive?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Does oversight have authority to intervene/stop?</Label>
                  <RadioGroup
                    value={hasIntervention === null ? "" : hasIntervention ? "yes" : "no"}
                    onValueChange={(v) => setHasIntervention(v === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="intervene-yes" />
                      <Label htmlFor="intervene-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="intervene-no" />
                      <Label htmlFor="intervene-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Mitigation & Governance */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Mitigation & Governance</CardTitle>
                <CardDescription>
                  Define mitigations, governance, and monitoring
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mitigation">Mitigation Measures *</Label>
                  <Textarea
                    id="mitigation"
                    value={mitigationMeasures}
                    onChange={(e) => setMitigationMeasures(e.target.value)}
                    placeholder="What measures are in place to mitigate identified risks?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="governance">Governance Arrangements</Label>
                  <Textarea
                    id="governance"
                    value={governanceArrangements}
                    onChange={(e) => setGovernanceArrangements(e.target.value)}
                    placeholder="What governance structures oversee this AI system?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint">Complaint Mechanism *</Label>
                  <Textarea
                    id="complaint"
                    value={complaintMechanism}
                    onChange={(e) => setComplaintMechanism(e.target.value)}
                    placeholder="How can affected persons lodge complaints?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monitoring">Monitoring Plan</Label>
                  <Textarea
                    id="monitoring"
                    value={monitoringPlan}
                    onChange={(e) => setMonitoringPlan(e.target.value)}
                    placeholder="How will you monitor for ongoing compliance?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>What triggers a reassessment?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {REASSESSMENT_TRIGGERS.map((trigger) => (
                      <div key={trigger.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={trigger.id}
                          checked={reassessmentTriggers.includes(trigger.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setReassessmentTriggers([...reassessmentTriggers, trigger.id]);
                            } else {
                              setReassessmentTriggers(reassessmentTriggers.filter((t) => t !== trigger.id));
                            }
                          }}
                        />
                        <Label htmlFor={trigger.id} className="text-sm font-normal">{trigger.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Approval */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="text-lg mb-2">Final Approval</CardTitle>
                <CardDescription>
                  Review and approve the FRIA assessment
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="font-medium mb-2">Assessment Summary</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Identified Risks</dt>
                      <dd>{risks.length}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Affected Categories</dt>
                      <dd>{affectedCategories.length}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Vulnerable Groups</dt>
                      <dd>{hasVulnerableGroups ? "Yes" : "No"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Intervention Authority</dt>
                      <dd>{hasIntervention ? "Yes" : "No"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-2">
                  <Label>Final Conclusion *</Label>
                  <RadioGroup
                    value={finalConclusion || ""}
                    onValueChange={(v) => setFinalConclusion(v as typeof finalConclusion)}
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="approve" id="approve" />
                      <Label htmlFor="approve" className="flex-1 cursor-pointer">
                        <span className="font-medium text-success">Approve</span>
                        <p className="text-sm text-muted-foreground">Deploy as planned</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="approve_with_mitigations" id="approve-mit" />
                      <Label htmlFor="approve-mit" className="flex-1 cursor-pointer">
                        <span className="font-medium text-warning">Approve with Mitigations</span>
                        <p className="text-sm text-muted-foreground">Deploy after implementing required mitigations</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem value="do_not_deploy" id="deny" />
                      <Label htmlFor="deny" className="flex-1 cursor-pointer">
                        <span className="font-medium text-destructive">Do Not Deploy</span>
                        <p className="text-sm text-muted-foreground">Risks are too high, do not proceed</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notify"
                    checked={notifyAuthority}
                    onCheckedChange={(checked) => setNotifyAuthority(checked === true)}
                  />
                  <Label htmlFor="notify" className="text-sm">
                    Notify market surveillance authority (if required)
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1}
          className="h-11 sm:h-10 px-4"
        >
          <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4" />
          <span className="hidden xs:inline">Back</span>
        </Button>

        {currentStep === STEPS.length ? (
          <Button
            onClick={handleComplete}
            disabled={!finalConclusion || completeFRIA.isPending}
            className="h-11 sm:h-10 px-4 flex-1 sm:flex-initial"
          >
            {completeFRIA.isPending ? (
              <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-1.5 sm:mr-2 h-4 w-4" />
            )}
            <span className="hidden sm:inline">Complete FRIA</span>
            <span className="sm:hidden">Complete</span>
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            disabled={currentStep === 1 && !title}
            className="h-11 sm:h-10 px-4 flex-1 sm:flex-initial"
          >
            Next
            <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
