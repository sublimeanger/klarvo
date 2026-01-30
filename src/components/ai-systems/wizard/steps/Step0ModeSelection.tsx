import { Card } from "@/components/ui/card";
import { Clock, FileCheck } from "lucide-react";
import type { WizardMode } from "../types";
import { cn } from "@/lib/utils";

interface Step0ModeSelectionProps {
  value: WizardMode;
  onChange: (mode: WizardMode) => void;
}

export function Step0ModeSelection({ value, onChange }: Step0ModeSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">How would you like to add this AI system?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the assessment depth based on your needs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card
          className={cn(
            "p-6 cursor-pointer transition-all hover:shadow-md",
            value === "quick_capture"
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "hover:border-primary/50"
          )}
          onClick={() => onChange("quick_capture")}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Capture</h4>
              <p className="text-sm text-muted-foreground">
                Add essential details in 2-4 minutes. Tasks will be created to complete 
                the full assessment later.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>~2-4 minutes</span>
              </div>
            </div>
          </div>
        </Card>

        <Card
          className={cn(
            "p-6 cursor-pointer transition-all hover:shadow-md",
            value === "full_assessment"
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "hover:border-primary/50"
          )}
          onClick={() => onChange("full_assessment")}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-success/10 p-3">
              <FileCheck className="h-6 w-6 text-success" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Full Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Complete EU AI Act regulatory classification with all required fields. 
                Generates classification memo and action plan.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>~15-20 minutes</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {value === "full_assessment" && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Full Assessment includes:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>AI system definition test (in-scope/out-of-scope)</li>
            <li>Prohibited practices screening (Article 5)</li>
            <li>High-risk classification (Annex III)</li>
            <li>Transparency obligations review (Article 50)</li>
            <li>Human oversight & logging requirements</li>
            <li>FRIA trigger assessment</li>
            <li>Classification memo generation</li>
          </ul>
        </div>
      )}
    </div>
  );
}
