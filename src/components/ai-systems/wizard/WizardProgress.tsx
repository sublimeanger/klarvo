import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { WizardStep } from "./types";
import {
  Settings, Cpu, Building2, User, Globe, GitBranch, HelpCircle, Workflow,
  ShieldX, AlertTriangle, Eye, Database, Users, FileText, AlertCircle,
  Briefcase, Building, GraduationCap, Scale, CheckCircle, Check
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings, Cpu, Building2, User, Globe, GitBranch, HelpCircle, Workflow,
  ShieldX, AlertTriangle, Eye, Database, Users, FileText, AlertCircle,
  Briefcase, Building, GraduationCap, Scale, CheckCircle, Check
};

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
  className?: string;
}

export function WizardProgress({ steps, currentStep, className }: WizardProgressProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Show a limited number of step indicators on mobile
  const visibleSteps = steps.length <= 6 ? steps : [
    steps[0],
    ...(currentStep > 2 ? [{ ...steps[currentStep - 1], id: currentStep - 1 }] : []),
    steps[currentStep],
    ...(currentStep < steps.length - 2 ? [{ ...steps[currentStep + 1], id: currentStep + 1 }] : []),
    steps[steps.length - 1],
  ].filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i);

  return (
    <div className={cn("space-y-4", className)}>
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between items-center overflow-x-auto pb-2">
        {(steps.length <= 8 ? steps : visibleSteps).map((step) => {
          const IconComponent = iconMap[step.icon] || Cpu;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-1.5 text-xs whitespace-nowrap px-1",
                isActive && "text-primary font-medium",
                isCompleted && "text-muted-foreground",
                !isActive && !isCompleted && "text-muted-foreground/50"
              )}
            >
              <IconComponent className={cn(
                "h-4 w-4 shrink-0",
                isActive && "text-primary",
                isCompleted && "text-success"
              )} />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          );
        })}
      </div>
      
      <div className="text-sm text-muted-foreground">
        Step {currentStep + 1} of {steps.length}
        {steps.length > 6 && (
          <span className="ml-2">• {steps[currentStep]?.title}</span>
        )}
      </div>
    </div>
  );
}
