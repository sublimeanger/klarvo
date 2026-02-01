import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, FileCheck, Sparkles } from "lucide-react";
import type { WizardMode } from "../types";
import { cn } from "@/lib/utils";
import { NaturalLanguageIntake } from "../NaturalLanguageIntake";
import type { ExtractedSystemData } from "@/hooks/useAISystemIntake";

interface Step0ModeSelectionProps {
  value: WizardMode;
  onChange: (mode: WizardMode) => void;
  onAIExtract?: (data: Partial<ExtractedSystemData>) => void;
}

export function Step0ModeSelection({ value, onChange, onAIExtract }: Step0ModeSelectionProps) {
  const [showAIIntake, setShowAIIntake] = useState(false);

  const handleAIExtracted = (data: Partial<ExtractedSystemData>) => {
    onAIExtract?.(data);
    setShowAIIntake(false);
  };

  if (showAIIntake) {
    return (
      <NaturalLanguageIntake 
        onDataExtracted={handleAIExtracted}
        onClose={() => setShowAIIntake(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">How would you like to add this AI system?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the assessment depth based on your needs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* AI-Powered Quick Start */}
        <Card
          className={cn(
            "p-6 cursor-pointer transition-all hover:shadow-md border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5",
            "hover:border-primary/50 hover:ring-2 hover:ring-primary/20"
          )}
          onClick={() => setShowAIIntake(true)}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-gradient-to-r from-primary to-accent p-3">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">AI-Powered Quick Start</h4>
              <p className="text-sm text-muted-foreground">
                Describe your AI system in plain language and let AI extract the details automatically.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Recommended</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Capture */}
        <Card
          className={cn(
            "p-6 cursor-pointer transition-all hover:shadow-md",
            value === "quick_capture"
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "hover:border-primary/50"
          )}
          onClick={() => onChange("quick_capture")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Capture</h4>
              <p className="text-sm text-muted-foreground">
                Add essential details in 2-4 minutes. Tasks will be created to complete 
                the full assessment later.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>~2-4 minutes</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Full Assessment */}
        <Card
          className={cn(
            "p-6 cursor-pointer transition-all hover:shadow-md",
            value === "full_assessment"
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "hover:border-primary/50"
          )}
          onClick={() => onChange("full_assessment")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-success/10 p-3">
              <FileCheck className="h-6 w-6 text-success" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Full Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Complete EU AI Act regulatory classification with all required fields.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
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
