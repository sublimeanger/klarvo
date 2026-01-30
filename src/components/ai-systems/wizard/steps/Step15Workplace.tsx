import { Briefcase } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import { NOTIFICATION_STATUS_OPTIONS } from "../constants";
import type { AISystemWizardData } from "../types";

interface Step15WorkplaceProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  hasWorkplaceImpact: boolean;
  isHighRisk: boolean;
}

export function Step15Workplace({ 
  data, 
  onChange, 
  hasWorkplaceImpact, 
  isHighRisk 
}: Step15WorkplaceProps) {
  const showNotificationQuestion = hasWorkplaceImpact && isHighRisk;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border bg-muted/50 p-3 sm:p-4 flex gap-2 sm:gap-3">
        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium">Workplace-Specific Obligations</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Deployers who are employers must inform workers/representatives before 
            using a high-risk AI system at work.
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-3 sm:p-4">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium">Used in workplace context?</span>
          <span className={`text-xs sm:text-sm font-medium ${hasWorkplaceImpact ? "text-warning" : "text-muted-foreground"}`}>
            {hasWorkplaceImpact ? "Yes" : "No"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Based on your earlier answer about workplace impact
        </p>
      </div>

      <div className="rounded-lg border p-3 sm:p-4">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium">High-risk candidate?</span>
          <span className={`text-xs sm:text-sm font-medium ${isHighRisk ? "text-warning" : "text-muted-foreground"}`}>
            {isHighRisk ? "Yes" : "No"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Based on your high-risk screening result
        </p>
      </div>

      {showNotificationQuestion ? (
        <>
          <RadioGroupField
            label="Worker notification prepared?"
            description="Have you prepared notification to inform workers about this AI system?"
            options={NOTIFICATION_STATUS_OPTIONS}
            value={data.worker_notification_status}
            onChange={(value) => onChange({ worker_notification_status: value })}
          />

          {data.worker_notification_status === "not_started" && (
            <div className="rounded-lg border border-warning bg-warning/10 p-3 sm:p-4">
              <p className="text-xs sm:text-sm">
                <strong>Action required:</strong> For high-risk AI systems used in the 
                workplace, you must inform workers/representatives before deployment.
                A task will be created to prepare this notification.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-lg border border-dashed bg-muted/50 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Worker notification is not required because:
          </p>
          <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
            {!hasWorkplaceImpact && <li>This system is not used in the workplace context</li>}
            {!isHighRisk && <li>This system is not classified as high-risk</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
