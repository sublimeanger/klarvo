import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import { YES_NO_UNSURE, HIGHRISK_SCREENING_RESULTS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step9HighRiskProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

const HIGHRISK_QUESTIONS = [
  {
    field: "highrisk_biometric" as const,
    label: "Is it used for biometric identification, categorisation, or similar?",
  },
  {
    field: "highrisk_critical_infrastructure" as const,
    label: "Is it used in critical infrastructure or safety-related contexts (energy, transport, utilities, etc.)?",
  },
  {
    field: "highrisk_education" as const,
    label: "Education or vocational training (admissions, scoring, proctoring, access decisions)?",
  },
  {
    field: "highrisk_employment" as const,
    label: "Employment / worker management / access to self-employment (recruiting, CV filtering, performance, monitoring, scheduling)?",
  },
  {
    field: "highrisk_essential_services" as const,
    label: "Access to essential services (credit scoring, insurance, housing, healthcare access, benefits)?",
  },
  {
    field: "highrisk_law_enforcement" as const,
    label: "Law enforcement or public security (evidence assessment, risk assessment, investigation support)?",
  },
  {
    field: "highrisk_migration" as const,
    label: "Migration, asylum, border control (visa assessment, risk, identity checks)?",
  },
  {
    field: "highrisk_justice" as const,
    label: "Administration of justice or democratic processes (court support, case triage, election-related systems)?",
  },
  {
    field: "highrisk_safety_component" as const,
    label: "Is it a safety component of a regulated product (e.g., medical device, vehicle, machinery) subject to EU product legislation?",
  },
];

export function Step9HighRisk({ data, onChange }: Step9HighRiskProps) {
  const hasAnyYesOrUnsure = HIGHRISK_QUESTIONS.some(
    (q) => data[q.field] === "yes" || data[q.field] === "unsure"
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border border-warning/50 bg-warning/5 p-3 sm:p-4 flex gap-2 sm:gap-3">
        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium">High-Risk Screening (Annex III)</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Annex III of the EU AI Act lists high-risk AI system categories. High-risk 
            systems have additional obligations including human oversight, logging, 
            monitoring, and potentially FRIA requirements.
          </p>
        </div>
      </div>

      {HIGHRISK_QUESTIONS.map((question) => (
        <RadioGroupField
          key={question.field}
          label={question.label}
          options={YES_NO_UNSURE}
          value={data[question.field]}
          onChange={(value) => onChange({ [question.field]: value })}
          layout="horizontal"
        />
      ))}

      <div className="space-y-2">
        <Label htmlFor="highrisk_screening_notes" className="text-sm">Notes / Rationale</Label>
        <Textarea
          id="highrisk_screening_notes"
          placeholder="Add any context or explanation for your answers..."
          value={data.highrisk_screening_notes}
          onChange={(e) => onChange({ highrisk_screening_notes: e.target.value })}
          className="min-h-[70px] sm:min-h-[80px]"
        />
      </div>

      <div className="border-t pt-4 sm:pt-6">
        <RadioGroupField
          label="High-risk screening result"
          options={HIGHRISK_SCREENING_RESULTS}
          value={data.highrisk_screening_result}
          onChange={(value) => onChange({ highrisk_screening_result: value })}
        />
      </div>

      {(data.highrisk_screening_result === "high_risk_annex_iii" || 
        data.highrisk_screening_result === "high_risk_product") && (
        <div className="rounded-lg border border-warning bg-warning/10 p-3 sm:p-4">
          <p className="text-xs sm:text-sm font-medium">
            High-risk classification will trigger additional requirements:
          </p>
          <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
            <li>Human oversight and monitoring obligations</li>
            <li>Log retention for at least 6 months</li>
            <li>Incident reporting procedures</li>
            <li>Worker notification (if workplace use)</li>
            <li>Possible FRIA requirement</li>
          </ul>
        </div>
      )}
    </div>
  );
}
