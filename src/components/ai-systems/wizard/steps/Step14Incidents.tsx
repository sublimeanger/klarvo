import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import { PROCESS_STATUS_OPTIONS, YES_NO, SUSPEND_QUICKLY_OPTIONS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step14IncidentsProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

const INTERNAL_NOTIFICATION_OPTIONS = [
  { value: "security", label: "Security" },
  { value: "compliance", label: "Compliance" },
  { value: "legal", label: "Legal" },
  { value: "product", label: "Product" },
  { value: "hr", label: "HR" },
  { value: "leadership", label: "Leadership" },
];

export function Step14Incidents({ data, onChange }: Step14IncidentsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Risk & Incident Handling</p>
          <p className="text-sm text-muted-foreground mt-1">
            Deployers must monitor operation, inform providers/authorities when they 
            suspect risk, suspend use if needed, and report serious incidents.
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Do you have an incident response process for AI-related incidents?"
        options={PROCESS_STATUS_OPTIONS}
        value={data.incident_process_status}
        onChange={(value) => onChange({ incident_process_status: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="AI incident severity levels defined?"
        options={YES_NO}
        value={data.severity_levels_defined}
        onChange={(value) => onChange({ severity_levels_defined: value })}
        layout="horizontal"
      />

      <MultiSelectField
        label="Who is notified internally?"
        options={INTERNAL_NOTIFICATION_OPTIONS}
        value={data.internal_notification_list}
        onChange={(value) => onChange({ internal_notification_list: value })}
      />

      <div className="space-y-2">
        <Label htmlFor="external_notification_requirements">
          Who do you notify externally (if required)?
        </Label>
        <Textarea
          id="external_notification_requirements"
          placeholder="e.g., Vendor, Regulator, Data protection authority, Affected customers..."
          value={data.external_notification_requirements}
          onChange={(e) => onChange({ external_notification_requirements: e.target.value })}
        />
      </div>

      <RadioGroupField
        label="Can you suspend/turn off the system quickly?"
        options={SUSPEND_QUICKLY_OPTIONS}
        value={data.can_suspend_quickly}
        onChange={(value) => onChange({ can_suspend_quickly: value })}
      />

      {data.can_suspend_quickly === "no" && (
        <div className="rounded-lg border border-warning bg-warning/10 p-4">
          <p className="text-sm">
            <strong>Recommendation:</strong> High-risk AI systems should have a clear 
            process to quickly suspend or disable the system in case of safety concerns.
          </p>
        </div>
      )}
    </div>
  );
}
