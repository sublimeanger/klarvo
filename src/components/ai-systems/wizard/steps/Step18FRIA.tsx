import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroupField } from "../RadioGroupField";
import { FRIA_STATUS_OPTIONS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step18FRIAProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  isHighRisk: boolean;
  isPublicAuthority: boolean;
  aiSystemId?: string;
}

export function Step18FRIA({ 
  data, 
  onChange, 
  isHighRisk, 
  isPublicAuthority,
  aiSystemId 
}: Step18FRIAProps) {
  const navigate = useNavigate();

  // FRIA is typically required for public authorities/services deploying high-risk AI
  const friaRequired = isHighRisk && isPublicAuthority;
  const friaTriggerStatus = friaRequired ? "required" : "not_required";

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 flex gap-3">
        <Scale className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">FRIA Trigger Check</p>
          <p className="text-sm text-muted-foreground mt-1">
            A Fundamental Rights Impact Assessment (FRIA) is required in certain cases, 
            particularly for public bodies deploying high-risk AI systems.
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">High-risk candidate?</span>
          <span className={`text-sm font-medium ${isHighRisk ? "text-warning" : "text-muted-foreground"}`}>
            {isHighRisk ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">FRIA trigger conditions met?</span>
          <span className={`text-sm font-medium ${friaRequired ? "text-warning" : "text-muted-foreground"}`}>
            {friaRequired ? "Yes" : "No"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Based on high-risk status and public authority/service classification
        </p>
      </div>

      <RadioGroupField
        label="FRIA status"
        options={FRIA_STATUS_OPTIONS}
        value={data.fria_status || (friaRequired ? "" : "not_required")}
        onChange={(value) => onChange({ 
          fria_status: value,
          fria_trigger_status: friaTriggerStatus
        })}
      />

      {friaRequired && data.fria_status !== "completed" && (
        <div className="rounded-lg border border-warning bg-warning/10 p-4">
          <p className="text-sm mb-3">
            <strong>FRIA required:</strong> A Fundamental Rights Impact Assessment must 
            be completed before deploying this high-risk AI system.
          </p>
          {aiSystemId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/assessments/fria/new?systemId=${aiSystemId}`)}
            >
              Create FRIA Now
            </Button>
          )}
        </div>
      )}

      {!friaRequired && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            FRIA is not required because:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            {!isHighRisk && <li>This system is not classified as high-risk</li>}
            {!isPublicAuthority && <li>Your organization is not a public authority or public service provider</li>}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            You may still choose to complete a FRIA voluntarily as a best practice.
          </p>
        </div>
      )}
    </div>
  );
}
