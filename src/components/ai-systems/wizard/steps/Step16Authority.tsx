import { Building } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import { YES_NO, REGISTRATION_STATUS_OPTIONS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step16AuthorityProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  isHighRisk: boolean;
}

export function Step16Authority({ data, onChange, isHighRisk }: Step16AuthorityProps) {
  const showRegistration = 
    (data.is_public_authority === "yes" || data.provides_public_service === "yes") && 
    isHighRisk;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 flex gap-3">
        <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Public Authority Registration</p>
          <p className="text-sm text-muted-foreground mt-1">
            There are registration requirements and an EU database for certain high-risk 
            AI systems. Public authorities have specific responsibilities.
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Are you a public authority / body governed by public law?"
        options={YES_NO}
        value={data.is_public_authority}
        onChange={(value) => onChange({ is_public_authority: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Are you providing a public service (private entity providing public services)?"
        options={YES_NO}
        value={data.provides_public_service}
        onChange={(value) => onChange({ provides_public_service: value })}
        layout="horizontal"
      />

      {showRegistration ? (
        <>
          <RadioGroupField
            label="Registration status"
            description="For high-risk AI systems used by public authorities"
            options={REGISTRATION_STATUS_OPTIONS}
            value={data.registration_status}
            onChange={(value) => onChange({ registration_status: value })}
          />

          {data.registration_status === "not_registered" && (
            <div className="rounded-lg border border-warning bg-warning/10 p-4">
              <p className="text-sm">
                <strong>Action required:</strong> Public authorities deploying high-risk 
                AI systems may need to register in the EU database. A task will be 
                created to review registration requirements.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-lg border border-dashed bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            EU database registration is typically not required because:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            {data.is_public_authority !== "yes" && data.provides_public_service !== "yes" && (
              <li>Your organization is not a public authority or public service provider</li>
            )}
            {!isHighRisk && <li>This system is not classified as high-risk</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
