import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import {
  BUILT_INTERNALLY_OPTIONS,
  ACQUISITION_METHODS,
  VALUE_CHAIN_ROLES,
  YES_NO,
} from "../constants";
import type { AISystemWizardData } from "../types";

interface Step5ValueChainProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

export function Step5ValueChain({ data, onChange }: Step5ValueChainProps) {
  const showAcquisitionMethod = data.built_internally !== "fully";
  const showProviderQuestion = data.value_chain_role.includes("provider");

  return (
    <div className="space-y-4 sm:space-y-6">
      <RadioGroupField
        label="Is the AI system built by your organisation?"
        options={BUILT_INTERNALLY_OPTIONS}
        value={data.built_internally}
        onChange={(value) => onChange({ built_internally: value })}
      />

      {showAcquisitionMethod && (
        <MultiSelectField
          label="How is it obtained?"
          description="Select all that apply"
          options={ACQUISITION_METHODS}
          value={data.acquisition_method}
          onChange={(value) => onChange({ acquisition_method: value })}
        />
      )}

      <MultiSelectField
        label="Your role in the AI value chain"
        description="Under the EU AI Act, your obligations depend on your role"
        options={VALUE_CHAIN_ROLES}
        value={data.value_chain_role}
        onChange={(value) => onChange({ value_chain_role: value })}
      />

      {showProviderQuestion && (
        <RadioGroupField
          label="Is it offered to external customers?"
          description="Do you sell, license, or make this AI available to third parties?"
          options={YES_NO}
          value={data.is_externally_offered}
          onChange={(value) => onChange({ is_externally_offered: value })}
          layout="horizontal"
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="foundation_model" className="text-sm">Foundation model / Model provider (if any)</Label>
        <Input
          id="foundation_model"
          placeholder="e.g., OpenAI GPT-4, Claude 3, Llama 3"
          value={data.foundation_model}
          onChange={(e) => onChange({ foundation_model: e.target.value })}
        />
        <p className="text-xs sm:text-sm text-muted-foreground">
          The underlying AI model or API used (if known)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract_url" className="text-sm">Contract / Terms link</Label>
        <Input
          id="contract_url"
          type="url"
          placeholder="https://..."
          value={data.contract_url}
          onChange={(e) => onChange({ contract_url: e.target.value })}
        />
        <p className="text-xs sm:text-sm text-muted-foreground">
          Link to vendor contract, terms of service, or internal documentation
        </p>
      </div>

      <div className="rounded-lg border border-dashed bg-muted/50 p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          <strong>Why we ask:</strong> The EU AI Act assigns different obligations based on 
          your role. Deployers (who use AI) have duties like human oversight and monitoring. 
          Providers (who build/sell AI) have more extensive requirements.
        </p>
      </div>
    </div>
  );
}
