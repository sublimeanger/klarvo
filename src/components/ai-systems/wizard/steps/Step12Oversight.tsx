import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  HUMAN_INVOLVEMENT_OPTIONS,
  YES_NO,
  PROCESS_STATUS_OPTIONS,
  SOP_STATUS_OPTIONS,
  MONITORING_METRICS,
} from "../constants";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step12OversightProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  members: Tables<"profiles">[];
}

export function Step12Oversight({ data, onChange, members }: Step12OversightProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 flex gap-3">
        <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Human Oversight & Operating Model</p>
          <p className="text-sm text-muted-foreground mt-1">
            High-risk AI systems require competent human oversight with authority to 
            intervene. This section captures your oversight arrangements.
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Oversight model"
        options={HUMAN_INVOLVEMENT_OPTIONS}
        value={data.oversight_model}
        onChange={(value) => onChange({ oversight_model: value })}
      />

      <div className="space-y-2">
        <Label>Oversight owner (named person)</Label>
        <Select
          value={data.oversight_owner_id}
          onValueChange={(value) => onChange({ oversight_owner_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select oversight owner" />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.full_name || "Unnamed User"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RadioGroupField
        label="Does the oversight owner have authority to pause/stop use?"
        options={YES_NO}
        value={data.has_stop_authority}
        onChange={(value) => onChange({ has_stop_authority: value })}
        layout="horizontal"
      />

      <div className="space-y-2">
        <Label htmlFor="competence_requirements">
          Required training/competence for operators
        </Label>
        <Textarea
          id="competence_requirements"
          placeholder="Describe the skills, training, or qualifications required..."
          value={data.competence_requirements}
          onChange={(e) => onChange({ competence_requirements: e.target.value })}
        />
      </div>

      <RadioGroupField
        label="Are operators trained today?"
        options={PROCESS_STATUS_OPTIONS}
        value={data.operators_trained}
        onChange={(value) => onChange({ operators_trained: value })}
        layout="horizontal"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Oversight SOP exists?</Label>
          <Select
            value={data.oversight_sop_status}
            onValueChange={(value) => onChange({ oversight_sop_status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {SOP_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Monitoring plan exists?</Label>
          <Select
            value={data.monitoring_plan_status}
            onValueChange={(value) => onChange({ monitoring_plan_status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {SOP_STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <MultiSelectField
        label="What do you monitor?"
        options={MONITORING_METRICS}
        value={data.monitoring_metrics}
        onChange={(value) => onChange({ monitoring_metrics: value })}
      />
    </div>
  );
}
