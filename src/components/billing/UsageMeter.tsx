import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface UsageMeterProps {
  /** Current usage value */
  current: number;
  /** Maximum limit */
  limit: number;
  /** Label for the resource (e.g., "AI systems", "Storage") */
  label: string;
  /** Unit suffix for display (e.g., "GB", empty for counts) */
  unit?: string;
  /** Warning threshold percentage (default 80) */
  warningThreshold?: number;
  /** Callback when upgrade is clicked */
  onUpgrade?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function UsageMeter({
  current,
  limit,
  label,
  unit = '',
  warningThreshold = 80,
  onUpgrade,
  className,
}: UsageMeterProps) {
  const isUnlimited = limit === Infinity;
  const percentage = isUnlimited ? 0 : Math.min(100, (current / limit) * 100);
  const isWarning = percentage >= warningThreshold;
  const isExceeded = percentage >= 100;

  const formatValue = (value: number) => {
    if (value === Infinity) return 'Unlimited';
    if (unit === 'GB' && value >= 1000) {
      return `${(value / 1000).toFixed(1)} TB`;
    }
    return `${value}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className={cn(
          "tabular-nums",
          isExceeded && "text-destructive font-medium",
          isWarning && !isExceeded && "text-warning font-medium"
        )}>
          {formatValue(current)} / {formatValue(limit)}
        </span>
      </div>
      
      {!isUnlimited && (
        <Progress 
          value={percentage} 
          className={cn(
            "h-2",
            isExceeded && "[&>div]:bg-destructive",
            isWarning && !isExceeded && "[&>div]:bg-warning"
          )}
        />
      )}
      
      {isWarning && !isExceeded && onUpgrade && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-warning flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            You're at {Math.round(percentage)}% of your limit
          </span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={onUpgrade}>
            Upgrade
          </Button>
        </div>
      )}
      
      {isExceeded && onUpgrade && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-destructive flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Limit reached
          </span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive" onClick={onUpgrade}>
            Upgrade now
          </Button>
        </div>
      )}
    </div>
  );
}

interface UsageMeterCompactProps {
  /** Current usage value */
  current: number;
  /** Maximum limit */
  limit: number;
  /** Label for the resource */
  label: string;
  /** Additional CSS classes */
  className?: string;
}

export function UsageMeterCompact({
  current,
  limit,
  label,
  className,
}: UsageMeterCompactProps) {
  const isUnlimited = limit === Infinity;
  const percentage = isUnlimited ? 0 : Math.min(100, (current / limit) * 100);
  const isWarning = percentage >= 80;
  const isExceeded = percentage >= 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className={cn(
        "text-xs font-medium tabular-nums",
        isExceeded && "text-destructive",
        isWarning && !isExceeded && "text-warning"
      )}>
        {current}/{isUnlimited ? '∞' : limit}
      </span>
      {!isUnlimited && (
        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              isExceeded ? "bg-destructive" : isWarning ? "bg-warning" : "bg-primary"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
