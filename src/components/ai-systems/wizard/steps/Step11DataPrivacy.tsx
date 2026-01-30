import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "lucide-react";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  YES_NO_UNKNOWN,
  DATA_SOURCES,
  DATA_CONTROL_OPTIONS,
  RETENTION_PERIODS,
  DPIA_STATUS_OPTIONS,
} from "../constants";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step11DataPrivacyProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  members: Tables<"profiles">[];
}

export function Step11DataPrivacy({ data, onChange, members }: Step11DataPrivacyProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 flex gap-3">
        <Database className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Data & Privacy</p>
          <p className="text-sm text-muted-foreground mt-1">
            These questions help ensure GDPR alignment and identify data governance 
            requirements for the AI system.
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Does it process personal data?"
        options={YES_NO_UNKNOWN}
        value={data.processes_personal_data}
        onChange={(value) => onChange({ processes_personal_data: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it process special category data (health, biometrics, etc.)?"
        options={YES_NO_UNKNOWN}
        value={data.special_category_data}
        onChange={(value) => onChange({ special_category_data: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it involve children/minors?"
        options={YES_NO_UNKNOWN}
        value={data.involves_minors}
        onChange={(value) => onChange({ involves_minors: value })}
        layout="horizontal"
      />

      <MultiSelectField
        label="Data sources"
        options={DATA_SOURCES}
        value={data.data_sources}
        onChange={(value) => onChange({ data_sources: value })}
      />

      <RadioGroupField
        label="Is input data under deployer control?"
        options={DATA_CONTROL_OPTIONS}
        value={data.data_under_control}
        onChange={(value) => onChange({ data_under_control: value })}
        layout="horizontal"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Data retention period for inputs</Label>
          <Select
            value={data.input_retention_period}
            onValueChange={(value) => onChange({ input_retention_period: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {RETENTION_PERIODS.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Data retention period for outputs</Label>
          <Select
            value={data.output_retention_period}
            onValueChange={(value) => onChange({ output_retention_period: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {RETENTION_PERIODS.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>DPIA status</Label>
        <Select
          value={data.dpia_status}
          onValueChange={(value) => onChange({ dpia_status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {DPIA_STATUS_OPTIONS.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {data.dpia_status === "completed" && (
        <div className="space-y-2">
          <Label htmlFor="dpia_url">Link/upload DPIA</Label>
          <Input
            id="dpia_url"
            type="url"
            placeholder="https://..."
            value={data.dpia_url}
            onChange={(e) => onChange({ dpia_url: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Privacy owner (DPO or responsible person)</Label>
        <Select
          value={data.privacy_owner_id}
          onValueChange={(value) => onChange({ privacy_owner_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select privacy owner" />
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
    </div>
  );
}
