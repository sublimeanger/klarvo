import { CheckCircle, Circle, FileText, Package, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ExportEligibilityProps {
  formData: any;
  className?: string;
}

// Define required fields for each export tier
const TIER_REQUIREMENTS = {
  classificationMemo: {
    label: "Classification Memo",
    icon: FileText,
    fields: [
      { key: "name", label: "System name" },
      { key: "summary", label: "Summary" },
      { key: "infers_outputs", label: "Infers outputs" },
      { key: "operates_autonomously", label: "Operates autonomously" },
      { key: "ai_definition_result", label: "AI definition result" },
      { key: "prohibited_manipulation", label: "Prohibited screening" },
      { key: "prohibited_screening_result", label: "Prohibited result" },
      { key: "highrisk_screening_result", label: "High-risk result" },
      { key: "final_classification", label: "Final classification" },
    ],
  },
  evidencePack: {
    label: "Evidence Pack",
    icon: Package,
    fields: [
      // Includes classification memo fields plus:
      { key: "oversight_owner_id", label: "Oversight owner" },
      { key: "oversight_model", label: "Oversight model" },
      { key: "has_automatic_logs", label: "Logging status" },
      { key: "log_retention_period", label: "Log retention" },
      { key: "vendor_id", label: "Vendor info" },
      { key: "processes_personal_data", label: "Data privacy" },
      { key: "training_exists", label: "Training status" },
    ],
  },
  fullCompliance: {
    label: "Full Compliance",
    icon: Scale,
    fields: [
      // Includes evidence pack fields plus:
      { key: "fria_status", label: "FRIA assessment" },
      { key: "incident_process_status", label: "Incident process" },
      { key: "worker_notification_status", label: "Worker notification" },
      { key: "transparency_status", label: "Transparency" },
      { key: "signoff_reviewer_id", label: "Reviewer sign-off" },
      { key: "signoff_date", label: "Sign-off date" },
    ],
  },
};

function checkFieldComplete(formData: Record<string, unknown>, key: string): boolean {
  const value = formData[key];
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

function getTierProgress(
  formData: Record<string, unknown>,
  tierKey: keyof typeof TIER_REQUIREMENTS,
  previousTierComplete: boolean
): { completed: number; total: number; percentage: number; isReady: boolean; missingFields: string[] } {
  const tier = TIER_REQUIREMENTS[tierKey];
  let allFields = [...tier.fields];
  
  // Include previous tier fields
  if (tierKey === "evidencePack") {
    allFields = [...TIER_REQUIREMENTS.classificationMemo.fields, ...tier.fields];
  } else if (tierKey === "fullCompliance") {
    allFields = [
      ...TIER_REQUIREMENTS.classificationMemo.fields,
      ...TIER_REQUIREMENTS.evidencePack.fields,
      ...tier.fields,
    ];
  }
  
  const completedFields = allFields.filter((f) => checkFieldComplete(formData, f.key));
  const missingFields = allFields
    .filter((f) => !checkFieldComplete(formData, f.key))
    .map((f) => f.label);
  
  const percentage = Math.round((completedFields.length / allFields.length) * 100);
  const isReady = completedFields.length === allFields.length;
  
  return {
    completed: completedFields.length,
    total: allFields.length,
    percentage,
    isReady,
    missingFields: missingFields.slice(0, 3), // Show first 3 missing
  };
}

export function ExportEligibility({ formData, className }: ExportEligibilityProps) {
  const memoProgress = getTierProgress(formData, "classificationMemo", true);
  const evidenceProgress = getTierProgress(formData, "evidencePack", memoProgress.isReady);
  const fullProgress = getTierProgress(formData, "fullCompliance", evidenceProgress.isReady);

  const tiers = [
    { key: "classificationMemo" as const, progress: memoProgress, ...TIER_REQUIREMENTS.classificationMemo },
    { key: "evidencePack" as const, progress: evidenceProgress, ...TIER_REQUIREMENTS.evidencePack },
    { key: "fullCompliance" as const, progress: fullProgress, ...TIER_REQUIREMENTS.fullCompliance },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium text-muted-foreground">Export Eligibility</h4>
      <div className="space-y-2">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isReady = tier.progress.isReady;
          
          return (
            <div
              key={tier.key}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                isReady ? "border-success/50 bg-success/5" : "border-border"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isReady ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    isReady ? "text-success" : "text-foreground"
                  )}>
                    {tier.label}
                  </span>
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  isReady ? "text-success" : "text-muted-foreground"
                )}>
                  {isReady ? "Ready" : `${tier.progress.percentage}%`}
                </span>
              </div>
              
              <Progress
                value={tier.progress.percentage}
                className={cn(
                  "h-1.5",
                  isReady && "[&>div]:bg-success"
                )}
              />
              
              {!isReady && tier.progress.missingFields.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Missing: {tier.progress.missingFields.join(", ")}
                  {tier.progress.total - tier.progress.completed > 3 && "..."}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
