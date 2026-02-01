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
  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData ? (iconMap[currentStepData.icon] || Cpu) : Cpu;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Clean progress bar - works on all screens */}
      <Progress value={progress} className="h-2" />
      
      {/* Mobile: Simple step counter with current step info */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <IconComponent className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{currentStepData?.title}</p>
            <p className="text-xs text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>
        <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
      </div>
      
      {/* Desktop: Step indicators - only show on larger screens */}
      <div className="hidden sm:flex justify-between items-center overflow-x-auto pb-2 gap-1">
        {steps.slice(0, 8).map((step, idx) => {
          const StepIcon = iconMap[step.icon] || Cpu;
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
              <StepIcon className={cn(
                "h-4 w-4 shrink-0",
                isActive && "text-primary",
                isCompleted && "text-success"
              )} />
              <span className="hidden md:inline">{step.title}</span>
            </div>
          );
        })}
        {steps.length > 8 && (
          <span className="text-xs text-muted-foreground">+{steps.length - 8} more</span>
        )}
      </div>
      
      {/* Desktop step counter */}
      <div className="hidden sm:block text-sm text-muted-foreground">
        Step {currentStep + 1} of {steps.length}
        {steps.length > 8 && (
          <span className="ml-2">• {currentStepData?.title}</span>
        )}
      </div>
    </div>
  );
}
