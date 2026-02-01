import { Link } from "react-router-dom";
import { Clock, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TRIAL_CONFIG, PLANS } from "@/lib/billing-constants";

interface TrialBannerProps {
  /** Days remaining in trial */
  daysRemaining: number;
  /** Whether to show as full banner or compact */
  variant?: 'banner' | 'compact';
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Callback when upgrade is clicked */
  onUpgrade?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function TrialBanner({
  daysRemaining,
  variant = 'banner',
  onDismiss,
  onUpgrade,
  className,
}: TrialBannerProps) {
  const isUrgent = daysRemaining <= TRIAL_CONFIG.warningDaysBefore;
  const plan = PLANS[TRIAL_CONFIG.plan];

  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs",
        isUrgent ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary",
        className
      )}>
        <Clock className="h-3 w-3" />
        <span>Trial: {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</span>
        {onUpgrade && (
          <Button 
            variant="link" 
            size="sm" 
            className="h-auto p-0 text-xs underline"
            onClick={onUpgrade}
          >
            Upgrade
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "relative flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border gap-3",
      isUrgent ? "bg-warning/5 border-warning/30" : "bg-primary/5 border-primary/20",
      className
    )}>
      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
        <div className={cn(
          "p-1.5 sm:p-2 rounded-full shrink-0",
          isUrgent ? "bg-warning/10" : "bg-primary/10"
        )}>
          <Clock className={cn(
            "h-3.5 w-3.5 sm:h-4 sm:w-4",
            isUrgent ? "text-warning" : "text-primary"
          )} />
        </div>
        <div>
          <p className="font-medium text-xs sm:text-sm">
            {isUrgent 
              ? `Your trial ends in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`
              : `${daysRemaining} days left in your ${plan.name} trial`
            }
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {isUrgent 
              ? 'Upgrade now to keep approvals, auditor links, and unlimited exports'
              : 'You have full access to Growth features during your trial'
            }
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 ml-7 sm:ml-0">
        <Button size="sm" onClick={onUpgrade} className="h-9 text-xs sm:text-sm">
          Upgrade to {plan.name}
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
        {onDismiss && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface TrialEndedBannerProps {
  /** Callback when upgrade is clicked */
  onUpgrade?: () => void;
  /** Callback when "Continue on Free" is clicked */
  onContinueFree?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function TrialEndedBanner({
  onUpgrade,
  onContinueFree,
  className,
}: TrialEndedBannerProps) {
  return (
    <div className={cn(
      "p-4 sm:p-6 rounded-xl border bg-card text-center",
      className
    )}>
      <div className="inline-flex p-2.5 sm:p-3 rounded-full bg-muted mb-3 sm:mb-4">
        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
      </div>
      
      <h3 className="text-base sm:text-lg font-semibold mb-2">Your trial has ended</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
        Your workspace has been moved to Free. Upgrade to keep unlimited exports, approvals, and auditor links.
      </p>
      
      <div className="flex flex-col gap-2 sm:gap-3">
        <Button onClick={onUpgrade} className="h-11 w-full">
          Upgrade to keep Growth features
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onContinueFree} className="h-10 w-full">
          Continue on Free
        </Button>
      </div>
    </div>
  );
}

interface TrialChecklistProps {
  /** Completion status for each checklist item */
  progress: {
    addSystems: number;
    completeClassification: number;
    uploadEvidence: number;
    exportPack: number;
  };
  /** Additional CSS classes */
  className?: string;
}

export function TrialChecklist({ progress, className }: TrialChecklistProps) {
  const checklistItems = [
    { 
      id: 'add_systems', 
      label: 'Add 3 AI systems', 
      current: progress.addSystems, 
      target: TRIAL_CONFIG.checklist[0].target 
    },
    { 
      id: 'complete_classification', 
      label: 'Complete classification for 1', 
      current: progress.completeClassification, 
      target: TRIAL_CONFIG.checklist[1].target 
    },
    { 
      id: 'upload_evidence', 
      label: 'Upload 5 evidence files', 
      current: progress.uploadEvidence, 
      target: TRIAL_CONFIG.checklist[2].target 
    },
    { 
      id: 'export_pack', 
      label: 'Export an evidence pack', 
      current: progress.exportPack, 
      target: TRIAL_CONFIG.checklist[3].target 
    },
  ];

  const completedCount = checklistItems.filter(item => item.current >= item.target).length;
  const overallProgress = (completedCount / checklistItems.length) * 100;

  return (
    <div className={cn("p-3 sm:p-4 rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h4 className="font-medium text-xs sm:text-sm">Trial Checklist</h4>
        <span className="text-[10px] sm:text-xs text-muted-foreground">
          {completedCount}/{checklistItems.length} complete
        </span>
      </div>
      
      <Progress value={overallProgress} className="h-1 sm:h-1.5 mb-3 sm:mb-4" />
      
      <ul className="space-y-1.5 sm:space-y-2">
        {checklistItems.map((item) => {
          const isComplete = item.current >= item.target;
          return (
            <li key={item.id} className="flex items-center gap-2 text-xs sm:text-sm">
              <div className={cn(
                "flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border",
                isComplete ? "bg-success border-success" : "border-muted-foreground/30"
              )}>
                {isComplete && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-success-foreground" />}
              </div>
              <span className={cn(
                isComplete && "line-through text-muted-foreground"
              )}>
                {item.label}
              </span>
              {!isComplete && item.current > 0 && (
                <span className="text-[10px] sm:text-xs text-muted-foreground ml-auto">
                  {item.current}/{item.target}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
