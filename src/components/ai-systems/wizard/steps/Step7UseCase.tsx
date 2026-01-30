import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  PURPOSE_CATEGORIES,
  OUTPUT_ACTION_TYPES,
  OUTPUT_DESTINATIONS,
  HUMAN_INVOLVEMENT_OPTIONS,
  USAGE_FREQUENCIES,
} from "../constants";
import type { AISystemWizardData } from "../types";

interface Step7UseCaseProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

export function Step7UseCase({ data, onChange }: Step7UseCaseProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-sm">Primary purpose category</Label>
        <Select
          value={data.purpose_category}
          onValueChange={(value) => onChange({ purpose_category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workflow_description" className="text-sm">Describe the workflow it's used in</Label>
        <Textarea
          id="workflow_description"
          placeholder="Describe how this AI system fits into your business process..."
          value={data.workflow_description}
          onChange={(e) => onChange({ workflow_description: e.target.value })}
          className="min-h-[80px] sm:min-h-[100px]"
        />
      </div>

      <RadioGroupField
        label="Does it recommend, decide, or automate actions?"
        options={OUTPUT_ACTION_TYPES}
        value={data.output_action_type}
        onChange={(value) => onChange({ output_action_type: value })}
      />

      <MultiSelectField
        label="Where are outputs used?"
        options={OUTPUT_DESTINATIONS}
        value={data.output_destinations}
        onChange={(value) => onChange({ output_destinations: value })}
      />

      <RadioGroupField
        label="Human involvement"
        description="How are humans involved in the AI system's operation?"
        options={HUMAN_INVOLVEMENT_OPTIONS}
        value={data.human_involvement}
        onChange={(value) => onChange({ human_involvement: value })}
      />

      {data.human_involvement && data.human_involvement !== "hootl" && (
        <div className="space-y-2">
          <Label htmlFor="override_capability" className="text-sm">Who can override outputs?</Label>
          <Textarea
            id="override_capability"
            placeholder="Describe what step, who is involved, and how they can intervene..."
            className="min-h-[70px]"
            value={data.override_capability}
            onChange={(e) => onChange({ override_capability: e.target.value })}
          />
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm">Frequency of use</Label>
          <Select
            value={data.usage_frequency}
            onValueChange={(value) => onChange({ usage_frequency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {USAGE_FREQUENCIES.map((freq) => (
                <SelectItem key={freq.value} value={freq.value}>
                  {freq.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="impact_scale" className="text-sm">Scale of impact (people/month)</Label>
          <Input
            id="impact_scale"
            type="number"
            placeholder="e.g., 1000"
            value={data.impact_scale || ""}
            onChange={(e) => onChange({ impact_scale: e.target.value ? parseInt(e.target.value) : null })}
          />
          <p className="text-xs sm:text-sm text-muted-foreground">
            Approximate number of people affected monthly
          </p>
        </div>
      </div>
    </div>
  );
}
