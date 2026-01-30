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
  YES_NO_UNSURE,
  YES_NO_UNKNOWN,
  OUTPUT_TYPES,
  TECHNICAL_APPROACHES,
  AI_DEFINITION_RESULTS,
  CONFIDENCE_LEVELS,
} from "../constants";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step6AIDefinitionProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  members: Tables<"profiles">[];
}

export function Step6AIDefinition({ data, onChange, members }: Step6AIDefinitionProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 mb-4">
        <p className="text-sm font-medium">Is this an "AI system" under the EU AI Act?</p>
        <p className="text-sm text-muted-foreground mt-1">
          The Commission has published guidelines to help determine whether something qualifies 
          as an "AI system." This assessment helps establish if the Act applies.
        </p>
      </div>

      <RadioGroupField
        label="Does the system infer outputs from inputs to achieve objectives?"
        description="Does it generate predictions, content, recommendations, or decisions without being explicitly programmed for each case?"
        options={YES_NO_UNSURE}
        value={data.infers_outputs}
        onChange={(value) => onChange({ infers_outputs: value })}
      />

      <MultiSelectField
        label="What types of outputs does it produce?"
        options={OUTPUT_TYPES}
        value={data.output_types}
        onChange={(value) => onChange({ output_types: value })}
      />

      <RadioGroupField
        label="Does it operate with some autonomy?"
        description="Not purely manual rules executed by a person"
        options={YES_NO_UNSURE}
        value={data.operates_autonomously}
        onChange={(value) => onChange({ operates_autonomously: value })}
      />

      <RadioGroupField
        label="Does it adapt or learn after deployment?"
        description="Can the system's behavior change based on new data or feedback?"
        options={YES_NO_UNKNOWN}
        value={data.adapts_after_deployment}
        onChange={(value) => onChange({ adapts_after_deployment: value })}
      />

      <MultiSelectField
        label="What approach/technique is used?"
        options={TECHNICAL_APPROACHES}
        value={data.technical_approach}
        onChange={(value) => onChange({ technical_approach: value })}
      />

      <div className="border-t pt-6 mt-6">
        <h4 className="font-medium mb-4">Conclusion</h4>

        <RadioGroupField
          label="AI system definition conclusion"
          options={AI_DEFINITION_RESULTS}
          value={data.ai_definition_result}
          onChange={(value) => onChange({ ai_definition_result: value })}
        />

        <div className="space-y-2 mt-4">
          <Label htmlFor="ai_definition_rationale">Rationale</Label>
          <Textarea
            id="ai_definition_rationale"
            placeholder="Explain why you reached this conclusion..."
            value={data.ai_definition_rationale}
            onChange={(e) => onChange({ ai_definition_rationale: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="space-y-2">
            <Label>Reviewer</Label>
            <Select
              value={data.ai_definition_reviewer_id}
              onValueChange={(value) => onChange({ ai_definition_reviewer_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reviewer" />
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

          <div className="space-y-2">
            <Label>Confidence level</Label>
            <Select
              value={data.ai_definition_confidence}
              onValueChange={(value) => onChange({ ai_definition_confidence: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select confidence" />
              </SelectTrigger>
              <SelectContent>
                {CONFIDENCE_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {data.ai_definition_result === "likely_not" && (
        <div className="rounded-lg border border-warning bg-warning/10 p-4">
          <p className="text-sm font-medium text-warning-foreground">
            If this is "Likely NOT an AI system," you may still want to track it in 
            your inventory, but EU AI Act obligations may not apply.
          </p>
        </div>
      )}
    </div>
  );
}
