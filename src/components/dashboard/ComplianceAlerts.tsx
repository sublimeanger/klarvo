import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  FileCheck, 
  Shield, 
  Building2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { useComplianceAlerts, ComplianceAlert, AlertSeverity } from "@/hooks/useComplianceAlerts";
import { cn } from "@/lib/utils";

const MAX_ALERTS_PER_SECTION = 5;

const severityConfig: Record<AlertSeverity, { 
  icon: typeof AlertTriangle; 
  label: string; 
  color: string;
  bgColor: string;
}> = {
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  warning: {
    icon: AlertCircle,
    label: "Warning",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  info: {
    icon: Info,
    label: "Upcoming",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
};

const typeIcons: Record<string, typeof Shield> = {
  attestation: Building2,
  evidence: FileCheck,
  control: Shield,
  task: CheckSquare,
};

interface AlertItemProps {
  alert: ComplianceAlert;
}

function AlertItem({ alert }: AlertItemProps) {
  const Icon = typeIcons[alert.type] || AlertCircle;
  const config = severityConfig[alert.severity];
  
  return (
    <Link 
      to={alert.linkTo}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <div className={cn("rounded-lg p-2", config.bgColor)}>
        <Icon className={cn("h-4 w-4", config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
          {alert.title}
        </p>
        <p className="text-xs text-muted-foreground">{alert.description}</p>
        {alert.relatedEntity && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {alert.relatedEntity.type === "vendor" ? "Vendor" : "AI System"}: {alert.relatedEntity.name}
          </p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
    </Link>
  );
}

interface AlertSectionProps {
  severity: AlertSeverity;
  alerts: ComplianceAlert[];
  defaultOpen?: boolean;
}

function AlertSection({ severity, alerts, defaultOpen = false }: AlertSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = severityConfig[severity];
  const Icon = config.icon;
  
  if (alerts.length === 0) return null;
  
  const displayAlerts = alerts.slice(0, MAX_ALERTS_PER_SECTION);
  const remainingCount = alerts.length - MAX_ALERTS_PER_SECTION;
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.color)} />
            <span className="font-medium text-sm">{config.label}</span>
            <StatusBadge 
              variant={severity === "critical" ? "destructive" : severity === "warning" ? "warning" : "info"}
            >
              {alerts.length}
            </StatusBadge>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pl-2">
        {displayAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
        {remainingCount > 0 && (
          <p className="text-xs text-muted-foreground pl-3 py-2">
            + {remainingCount} more {severity} alert{remainingCount !== 1 ? "s" : ""}
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ComplianceAlerts() {
  const { 
    alerts, 
    criticalCount, 
    warningCount, 
    infoCount, 
    totalCount, 
    isLoading 
  } = useComplianceAlerts();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const criticalAlerts = alerts.filter(a => a.severity === "critical");
  const warningAlerts = alerts.filter(a => a.severity === "warning");
  const infoAlerts = alerts.filter(a => a.severity === "info");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Attention Required
          </CardTitle>
          <CardDescription>
            {totalCount > 0 
              ? `${totalCount} item${totalCount !== 1 ? "s" : ""} need${totalCount === 1 ? "s" : ""} your attention`
              : "All compliance items are on track"
            }
          </CardDescription>
        </div>
        {totalCount > 0 && (
          <StatusBadge 
            variant={criticalCount > 0 ? "destructive" : warningCount > 0 ? "warning" : "info"}
          >
            {totalCount} alert{totalCount !== 1 ? "s" : ""}
          </StatusBadge>
        )}
      </CardHeader>
      <CardContent>
        {totalCount === 0 ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-medium text-success">All systems go!</p>
              <p className="text-xs text-muted-foreground">
                No expiring attestations, evidence, or overdue reviews
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <AlertSection 
              severity="critical" 
              alerts={criticalAlerts} 
              defaultOpen={true} 
            />
            <AlertSection 
              severity="warning" 
              alerts={warningAlerts} 
              defaultOpen={criticalAlerts.length === 0} 
            />
            <AlertSection 
              severity="info" 
              alerts={infoAlerts} 
              defaultOpen={criticalAlerts.length === 0 && warningAlerts.length === 0} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
