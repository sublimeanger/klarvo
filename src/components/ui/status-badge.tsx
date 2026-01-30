import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
        // Risk levels
        prohibited: "bg-risk-prohibited/10 text-risk-prohibited",
        high: "bg-risk-high/10 text-risk-high",
        limited: "bg-risk-limited/10 text-risk-limited",
        minimal: "bg-risk-minimal/10 text-risk-minimal",
        // Status types
        draft: "bg-muted text-muted-foreground",
        pending: "bg-warning/10 text-warning",
        approved: "bg-success/10 text-success",
        rejected: "bg-destructive/10 text-destructive",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

export function StatusBadge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "destructive" && "bg-destructive",
            variant === "info" && "bg-info",
            variant === "prohibited" && "bg-risk-prohibited",
            variant === "high" && "bg-risk-high",
            variant === "limited" && "bg-risk-limited",
            variant === "minimal" && "bg-risk-minimal",
            variant === "draft" && "bg-muted-foreground",
            variant === "pending" && "bg-warning",
            variant === "approved" && "bg-success",
            variant === "rejected" && "bg-destructive",
            (!variant || variant === "default") && "bg-secondary-foreground"
          )}
        />
      )}
      {children}
    </span>
  );
}
