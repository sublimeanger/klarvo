import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  ListChecks, 
  Scale, 
  Shield, 
  GraduationCap,
  Building2,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ComplianceRecommendation } from "@/hooks/useComplianceRecommendations";

interface RecommendationCardProps {
  recommendation: ComplianceRecommendation;
  onDismiss?: () => void;
  onCreateTask?: () => void;
  showSystemLink?: boolean;
}

const priorityConfig: Record<number, { label: string; variant: "destructive" | "warning" | "info" | "minimal" }> = {
  1: { label: "Critical", variant: "destructive" },
  2: { label: "High", variant: "warning" },
  3: { label: "Medium", variant: "info" },
  4: { label: "Low", variant: "minimal" },
  5: { label: "Optional", variant: "minimal" },
};

const actionTypeIcons: Record<string, typeof Shield> = {
  task: ListChecks,
  evidence: FileText,
  control: Shield,
  classification: AlertTriangle,
  fria: Scale,
  training: GraduationCap,
  vendor: Building2,
};

export function RecommendationCard({
  recommendation,
  onDismiss,
  onCreateTask,
  showSystemLink = false,
}: RecommendationCardProps) {
  const priority = priorityConfig[recommendation.priority] || priorityConfig[3];
  const ActionIcon = actionTypeIcons[recommendation.action_type] || ListChecks;

  return (
    <div className="group relative flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      {/* Icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <ActionIcon className="h-4 w-4 text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-medium leading-tight">{recommendation.title}</h4>
            <StatusBadge variant={priority.variant} className="text-[10px] px-1.5 py-0">
              {priority.label}
            </StatusBadge>
          </div>
          
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={onDismiss}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Dismiss</span>
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {recommendation.description}
        </p>

        {/* Confidence indicator */}
        {recommendation.confidence_score !== null && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>{Math.round(recommendation.confidence_score * 100)}% confidence</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {onCreateTask && recommendation.action_type !== "task" && (
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={onCreateTask}>
              Create Task
            </Button>
          )}
          
          {recommendation.action_path && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
              <Link to={recommendation.action_path}>
                Go to {recommendation.action_type}
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
