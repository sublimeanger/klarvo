import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step3OwnershipProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  members: Tables<"profiles">[];
  isFullAssessment: boolean;
}

export function Step3Ownership({ data, onChange, members, isFullAssessment }: Step3OwnershipProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-sm">Primary Owner *</Label>
        <Select
          value={data.primary_owner_id}
          onValueChange={(value) => onChange({ primary_owner_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select owner" />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.full_name || "Unnamed User"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Who is responsible for managing this AI system's compliance?
        </p>
      </div>

      {isFullAssessment && (
        <div className="space-y-2">
          <Label className="text-sm">Backup Owner</Label>
          <Select
            value={data.backup_owner_id}
            onValueChange={(value) => onChange({ backup_owner_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select backup owner (optional)" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.full_name || "Unnamed User"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Secondary contact when primary owner is unavailable
          </p>
        </div>
      )}

      <div className="rounded-lg border border-dashed bg-muted/50 p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          <strong>What happens next:</strong> After creating this system, you'll be able to:
        </p>
        <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
          {!isFullAssessment ? (
            <>
              <li>Run the EU AI Act classification wizard</li>
              <li>Upload vendor documentation and evidence</li>
              <li>Assign controls and track compliance</li>
            </>
          ) : (
            <>
              <li>Review the classification memo</li>
              <li>Complete any auto-generated tasks</li>
              <li>Upload evidence for assigned controls</li>
              <li>Export your compliance pack</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
