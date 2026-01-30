import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";
import { MultiSelectField } from "../MultiSelectField";
import { RadioGroupField } from "../RadioGroupField";
import { YES_NO_UNKNOWN, YES_NO, RETENTION_PERIODS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step13LoggingProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  isHighRisk: boolean;
}

const LOG_ACCESS_ROLES = [
  { value: "system_owner", label: "System Owner" },
  { value: "security", label: "Security Team" },
  { value: "compliance", label: "Compliance Team" },
  { value: "vendor", label: "Vendor" },
  { value: "other", label: "Other" },
];

export function Step13Logging({ data, onChange, isHighRisk }: Step13LoggingProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border bg-muted/50 p-3 sm:p-4 flex gap-2 sm:gap-3">
        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium">Logging & Record-Keeping</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            High-risk AI systems must have logging capability. Deployers must keep logs 
            under their control for at least six months (unless other law differs).
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Does the system generate automatic logs?"
        options={YES_NO_UNKNOWN}
        value={data.has_automatic_logs}
        onChange={(value) => onChange({ has_automatic_logs: value })}
        layout="horizontal"
      />

      {data.has_automatic_logs === "yes" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="log_storage_location" className="text-sm">Where are logs stored?</Label>
            <Input
              id="log_storage_location"
              placeholder="e.g., Vendor system, Internal database, SIEM"
              value={data.log_storage_location}
              onChange={(e) => onChange({ log_storage_location: e.target.value })}
            />
          </div>

          <MultiSelectField
            label="Who has access to logs?"
            options={LOG_ACCESS_ROLES}
            value={data.log_access_roles}
            onChange={(value) => onChange({ log_access_roles: value })}
          />

          <div className="space-y-2">
            <Label className="text-sm">Log retention period</Label>
            <Select
              value={data.log_retention_period}
              onValueChange={(value) => onChange({ log_retention_period: value })}
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
        </>
      )}

      <RadioGroupField
        label="Can you export logs on demand?"
        options={YES_NO_UNKNOWN}
        value={data.can_export_logs}
        onChange={(value) => onChange({ can_export_logs: value })}
        layout="horizontal"
      />

      {isHighRisk && (
        <div className="border-t pt-4 sm:pt-6">
          <RadioGroupField
            label="Confirm minimum retention ≥ 6 months (if under deployer control)"
            description="For high-risk AI systems, logs must be retained for at least 6 months"
            options={YES_NO}
            value={data.log_retention_6_months_confirmed}
            onChange={(value) => onChange({ log_retention_6_months_confirmed: value })}
            layout="horizontal"
          />

          {data.log_retention_6_months_confirmed === "no" && (
            <div className="rounded-lg border border-warning bg-warning/10 p-3 sm:p-4 mt-4">
              <p className="text-xs sm:text-sm">
                <strong>Action required:</strong> Log retention must be extended to at 
                least 6 months for high-risk AI systems where logs are under your control.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
