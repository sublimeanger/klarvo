import { formatDistanceToNow } from "date-fns";
import { 
  Activity, 
  CheckCircle2, 
  FileCheck, 
  AlertTriangle, 
  Shield, 
  Building2,
  Plus,
  Edit,
  Trash2,
  Link,
  UserCheck,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditLogEntry, ActionType } from "@/hooks/useAuditLog";
import { cn } from "@/lib/utils";

const actionConfig: Record<ActionType, { 
  icon: typeof Activity; 
  label: string; 
  color: string;
}> = {
  "ai_system.created": { icon: Plus, label: "AI System created", color: "text-success" },
  "ai_system.updated": { icon: Edit, label: "AI System updated", color: "text-primary" },
  "ai_system.deleted": { icon: Trash2, label: "AI System deleted", color: "text-destructive" },
  "classification.created": { icon: Shield, label: "Classification created", color: "text-success" },
  "classification.updated": { icon: Shield, label: "Classification updated", color: "text-primary" },
  "control.status_changed": { icon: ClipboardCheck, label: "Control status changed", color: "text-primary" },
  "evidence.uploaded": { icon: FileCheck, label: "Evidence uploaded", color: "text-success" },
  "evidence.linked": { icon: Link, label: "Evidence linked", color: "text-primary" },
  "evidence.approved": { icon: UserCheck, label: "Evidence approved", color: "text-success" },
  "task.created": { icon: Plus, label: "Task created", color: "text-primary" },
  "task.completed": { icon: CheckCircle2, label: "Task completed", color: "text-success" },
  "incident.created": { icon: AlertTriangle, label: "Incident reported", color: "text-warning" },
  "incident.resolved": { icon: CheckCircle2, label: "Incident resolved", color: "text-success" },
  "vendor.created": { icon: Building2, label: "Vendor added", color: "text-primary" },
  "attestation.added": { icon: FileCheck, label: "Attestation added", color: "text-success" },
  "fria.created": { icon: Shield, label: "FRIA started", color: "text-primary" },
  "fria.completed": { icon: CheckCircle2, label: "FRIA completed", color: "text-success" },
};

interface ActivityItemProps {
  entry: AuditLogEntry;
  showEntity?: boolean;
}

function ActivityItem({ entry, showEntity = true }: ActivityItemProps) {
  const config = actionConfig[entry.action_type] || { 
    icon: Activity, 
    label: entry.action_type, 
    color: "text-muted-foreground" 
  };
  const Icon = config.icon;
  const userName = entry.user?.full_name || "System";
  
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className={cn("rounded-full p-1.5 bg-muted", config.color)}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{userName}</span>
          {" "}
          <span className="text-muted-foreground">{config.label.toLowerCase()}</span>
          {showEntity && entry.entity_name && (
            <>
              {" "}
              <span className="font-medium">{entry.entity_name}</span>
            </>
          )}
        </p>
        {entry.details && Object.keys(entry.details).length > 0 && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {formatDetails(entry.details)}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

function formatDetails(details: Record<string, any>): string {
  const parts: string[] = [];
  
  if (details.old_status && details.new_status) {
    parts.push(`${details.old_status} → ${details.new_status}`);
  }
  if (details.risk_level) {
    parts.push(`Risk: ${details.risk_level}`);
  }
  if (details.control_code) {
    parts.push(`Control: ${details.control_code}`);
  }
  
  return parts.join(" • ") || JSON.stringify(details).slice(0, 50);
}

interface ActivityFeedProps {
  entries: AuditLogEntry[];
  isLoading?: boolean;
  title?: string;
  description?: string;
  showEntity?: boolean;
  maxHeight?: string;
  emptyMessage?: string;
}

export function ActivityFeed({
  entries,
  isLoading = false,
  title = "Activity",
  description,
  showEntity = true,
  maxHeight = "400px",
  emptyMessage = "No activity yet",
}: ActivityFeedProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            {emptyMessage}
          </p>
        ) : (
          <ScrollArea style={{ maxHeight }}>
            <div className="pr-4">
              {entries.map((entry) => (
                <ActivityItem key={entry.id} entry={entry} showEntity={showEntity} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
