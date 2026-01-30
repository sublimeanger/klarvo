import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AISystemWizardData } from "../types";

interface Step20DoneProps {
  data: AISystemWizardData;
  onReset: () => void;
  createdSystemId?: string;
}

export function Step20Done({ data, onReset, createdSystemId }: Step20DoneProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 rounded-full bg-success/10 p-4">
        <CheckCircle className="h-10 w-10 text-success" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        {data.wizard_mode === "full_assessment" 
          ? "Assessment Complete!" 
          : "AI System Added!"}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        <strong>{data.name}</strong> has been added to your inventory
        {data.wizard_mode === "full_assessment" && (
          <> with full EU AI Act classification. Tasks have been created for any outstanding actions.</>
        )}
        {data.wizard_mode === "quick_capture" && (
          <>. You can now classify it and start tracking compliance.</>
        )}
      </p>

      {data.wizard_mode === "full_assessment" && (
        <div className="rounded-lg border bg-muted/50 p-4 mb-6 text-left max-w-md">
          <p className="text-sm font-medium mb-2">Next steps:</p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Review the classification memo</li>
            <li>Complete any auto-generated tasks</li>
            <li>Upload evidence for assigned controls</li>
            <li>Export your compliance pack when ready</li>
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate("/ai-systems")}>
          View Inventory
        </Button>
        {createdSystemId && (
          <Button variant="outline" onClick={() => navigate(`/ai-systems/${createdSystemId}`)}>
            View System Details
          </Button>
        )}
        <Button onClick={onReset}>
          Add Another
        </Button>
      </div>
    </div>
  );
}
