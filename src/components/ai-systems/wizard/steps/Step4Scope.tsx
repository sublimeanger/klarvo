import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  DEPLOYMENT_REGIONS,
  EU_COUNTRIES,
  INTERNAL_USER_GROUPS,
  AFFECTED_GROUPS,
  YES_NO,
} from "../constants";
import type { AISystemWizardData } from "../types";

interface Step4ScopeProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

export function Step4Scope({ data, onChange }: Step4ScopeProps) {
  const showEuCountries = data.deployment_regions.includes("eu");

  return (
    <div className="space-y-4 sm:space-y-6">
      <MultiSelectField
        label="Where is this system deployed?"
        description="Select all regions where this AI system is used"
        options={DEPLOYMENT_REGIONS}
        value={data.deployment_regions}
        onChange={(value) => onChange({ deployment_regions: value })}
      />

      {showEuCountries && (
        <div className="space-y-2">
          <Label className="text-sm">EU Countries</Label>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            Select specific EU countries where the system is deployed
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto border rounded-lg p-2 sm:p-3">
            {EU_COUNTRIES.map((country) => (
              <label
                key={country}
                className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.eu_countries.includes(country)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange({ eu_countries: [...data.eu_countries, country] });
                    } else {
                      onChange({ eu_countries: data.eu_countries.filter(c => c !== country) });
                    }
                  }}
                  className="rounded border-input"
                />
                {country}
              </label>
            ))}
          </div>
        </div>
      )}

      <MultiSelectField
        label="Who uses it internally?"
        description="Which teams or roles use this AI system?"
        options={INTERNAL_USER_GROUPS}
        value={data.internal_user_groups}
        onChange={(value) => onChange({ internal_user_groups: value })}
      />

      <MultiSelectField
        label="Who is affected by its outputs?"
        description="Whose lives, rights, or decisions are impacted by this system?"
        options={AFFECTED_GROUPS}
        value={data.affected_groups}
        onChange={(value) => onChange({ affected_groups: value })}
      />

      <RadioGroupField
        label="Is it customer-facing?"
        description="Does the AI system interact directly with or affect customers?"
        options={YES_NO}
        value={data.is_customer_facing}
        onChange={(value) => onChange({ is_customer_facing: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it impact workplace decisions or monitoring?"
        description="E.g., performance management, hiring, scheduling, surveillance"
        helpText="Workplace use affects deployer duties like worker notification for high-risk AI."
        options={YES_NO}
        value={data.has_workplace_impact}
        onChange={(value) => onChange({ has_workplace_impact: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it influence decisions with legal or similarly significant effects?"
        description="E.g., credit decisions, benefits eligibility, employment, access to services"
        options={YES_NO}
        value={data.has_legal_effects}
        onChange={(value) => onChange({ has_legal_effects: value })}
        layout="horizontal"
      />

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm">Summary in one sentence *</Label>
        <Textarea
          id="summary"
          placeholder="e.g., An AI chatbot that answers customer support queries and can escalate to human agents"
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          className="min-h-[70px] sm:min-h-[80px]"
        />
        <p className="text-xs sm:text-sm text-muted-foreground">
          Briefly describe what this system does and who it affects
        </p>
      </div>
    </div>
  );
}
