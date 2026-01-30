import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ShieldX } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import { YES_NO_UNSURE, PROHIBITED_SCREENING_RESULTS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step8ProhibitedProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

const PROHIBITED_QUESTIONS = [
  {
    field: "prohibited_manipulation" as const,
    label: "Does the system use subliminal, manipulative, or deceptive techniques likely to distort behaviour and cause significant harm?",
  },
  {
    field: "prohibited_exploitation" as const,
    label: "Does it exploit vulnerabilities (age, disability, socio-economic situation) in a way likely to cause significant harm?",
  },
  {
    field: "prohibited_social_scoring" as const,
    label: "Does it do 'social scoring' of individuals for unrelated context decisions?",
  },
  {
    field: "prohibited_criminal_profiling" as const,
    label: "Does it assess/predict risk of an individual committing criminal offences based solely on profiling/personality traits?",
  },
  {
    field: "prohibited_facial_scraping" as const,
    label: "Does it create/expand facial recognition databases via untargeted scraping (internet/CCTV)?",
  },
  {
    field: "prohibited_emotion_inference" as const,
    label: "Does it infer emotions of people in a workplace or education institution?",
  },
  {
    field: "prohibited_biometric_categorisation" as const,
    label: "Does it do biometric categorisation that could reveal sensitive/protected characteristics?",
  },
  {
    field: "prohibited_realtime_biometric" as const,
    label: "Does it use real-time remote biometric identification in publicly accessible spaces for law enforcement purposes?",
  },
];

export function Step8Prohibited({ data, onChange }: Step8ProhibitedProps) {
  const hasAnyYesOrUnsure = PROHIBITED_QUESTIONS.some(
    (q) => data[q.field] === "yes" || data[q.field] === "unsure"
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 flex gap-3">
        <ShieldX className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Prohibited Practices Screening (Article 5)</p>
          <p className="text-sm text-muted-foreground mt-1">
            The EU AI Act prohibits certain AI practices. If any apply, the system cannot 
            be deployed in the EU without legal review and potential redesign.
          </p>
        </div>
      </div>

      {PROHIBITED_QUESTIONS.map((question) => (
        <RadioGroupField
          key={question.field}
          label={question.label}
          options={YES_NO_UNSURE}
          value={data[question.field]}
          onChange={(value) => onChange({ [question.field]: value })}
          layout="horizontal"
        />
      ))}

      {hasAnyYesOrUnsure && (
        <div className="space-y-2">
          <Label htmlFor="prohibited_screening_notes">
            Describe context & safeguards
          </Label>
          <Textarea
            id="prohibited_screening_notes"
            placeholder="If any answer is Yes or Unsure, describe the context and any safeguards in place..."
            value={data.prohibited_screening_notes}
            onChange={(e) => onChange({ prohibited_screening_notes: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      )}

      <div className="border-t pt-6">
        <RadioGroupField
          label="Prohibited practices screening conclusion"
          options={PROHIBITED_SCREENING_RESULTS}
          value={data.prohibited_screening_result}
          onChange={(value) => onChange({ prohibited_screening_result: value })}
        />
      </div>

      {data.prohibited_screening_result === "potential_prohibited" && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <div>
            <p className="text-sm font-medium text-destructive">
              Potential prohibited practice detected
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              This system will be blocked until legal review is completed. A task will 
              be created for your compliance team.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
