import { GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  STAFF_ROLES,
  PROCESS_STATUS_OPTIONS,
  TRAINING_COMPLETION_STATUS,
} from "../constants";
import type { AISystemWizardData } from "../types";

interface Step17TrainingProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

export function Step17Training({ data, onChange }: Step17TrainingProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border bg-muted/50 p-3 sm:p-4 flex gap-2 sm:gap-3">
        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium">Training & AI Literacy (Article 4)</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Providers and deployers must take measures to ensure sufficient AI literacy 
            of staff and others operating AI on their behalf.
          </p>
        </div>
      </div>

      <MultiSelectField
        label="Staff roles that operate or rely on this system"
        options={STAFF_ROLES}
        value={data.staff_roles}
        onChange={(value) => onChange({ staff_roles: value })}
      />

      <RadioGroupField
        label="AI literacy training exists for these roles?"
        options={PROCESS_STATUS_OPTIONS}
        value={data.training_exists}
        onChange={(value) => onChange({ training_exists: value })}
        layout="horizontal"
      />

      {data.training_exists && data.training_exists !== "no" && (
        <div className="space-y-2">
          <Label className="text-sm">Training completion status</Label>
          <Select
            value={data.training_completion_status}
            onValueChange={(value) => onChange({ training_completion_status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {TRAINING_COMPLETION_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {data.training_exists === "no" && (
        <div className="rounded-lg border border-warning bg-warning/10 p-3 sm:p-4">
          <p className="text-xs sm:text-sm">
            <strong>Recommendation:</strong> AI literacy training should be provided 
            to all staff operating or relying on AI systems. A task will be created 
            to develop a training program.
          </p>
        </div>
      )}

      <div className="rounded-lg border border-dashed bg-muted/50 p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          <strong>Training recommendations by role:</strong>
        </p>
        <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
          <li><strong>All staff:</strong> AI basics awareness</li>
          <li><strong>Operators:</strong> System-specific training</li>
          <li><strong>Reviewers/Approvers:</strong> Oversight and decision-making training</li>
          <li><strong>Managers:</strong> Governance and compliance training</li>
        </ul>
      </div>
    </div>
  );
}
