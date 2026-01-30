import { useState } from "react";
import { format } from "date-fns";
import {
  History,
  RotateCcw,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  GitCompare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  usePolicyVersions,
  useRollbackPolicy,
  type PolicyVersion,
  type Policy,
} from "@/hooks/usePolicies";
import { cn } from "@/lib/utils";

interface PolicyVersionHistoryProps {
  policy: Policy;
}

export function PolicyVersionHistory({ policy }: PolicyVersionHistoryProps) {
  const { data: versions = [], isLoading } = usePolicyVersions(policy.id);
  const rollbackPolicy = useRollbackPolicy();
  
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [rollbackTarget, setRollbackTarget] = useState<PolicyVersion | null>(null);
  const [diffVersion, setDiffVersion] = useState<PolicyVersion | null>(null);

  const handleRollback = async () => {
    if (!rollbackTarget) return;
    await rollbackPolicy.mutateAsync({
      policyId: policy.id,
      version: rollbackTarget,
    });
    setRollbackTarget(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <History className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            No version history yet. Versions are saved when you edit the policy.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Version History</span>
        <Badge variant="secondary" className="ml-auto">
          {versions.length} version{versions.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="space-y-2">
        {versions.map((version, index) => (
          <Collapsible
            key={version.id}
            open={expandedVersion === version.id}
            onOpenChange={(open) => setExpandedVersion(open ? version.id : null)}
          >
            <Card className={cn(
              "transition-colors",
              expandedVersion === version.id && "ring-1 ring-primary/20"
            )}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer py-3 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        v{version.version_number}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">
                          {version.change_summary || "Version saved"}
                        </CardTitle>
                        <CardDescription className="text-xs flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {version.creator?.full_name || "Unknown"}
                          <span className="text-muted-foreground">·</span>
                          {format(new Date(version.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedVersion === version.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="space-y-3">
                    <div className="rounded-lg bg-muted/50 p-3 text-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{version.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {version.status}
                        </Badge>
                      </div>
                      {version.description && (
                        <p className="text-muted-foreground text-xs mb-2">
                          {version.description}
                        </p>
                      )}
                      {version.content && (
                        <div className="max-h-32 overflow-y-auto text-xs text-muted-foreground font-mono whitespace-pre-wrap border-t pt-2 mt-2">
                          {version.content.slice(0, 500)}
                          {version.content.length > 500 && "..."}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDiffVersion(version);
                        }}
                      >
                        <GitCompare className="h-4 w-4 mr-1" />
                        Compare
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRollbackTarget(version);
                        }}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Rollback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {/* Rollback Confirmation Dialog */}
      <Dialog open={!!rollbackTarget} onOpenChange={() => setRollbackTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Rollback to Version {rollbackTarget?.version_number}
            </DialogTitle>
            <DialogDescription>
              This will restore the policy to the state it was in at version {rollbackTarget?.version_number}.
              The current version will be saved in history before rolling back.
            </DialogDescription>
          </DialogHeader>
          {rollbackTarget && (
            <div className="py-4">
              <div className="rounded-lg border p-3 text-sm">
                <p className="font-medium">{rollbackTarget.name}</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Saved on {format(new Date(rollbackTarget.created_at), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRollbackTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleRollback} disabled={rollbackPolicy.isPending}>
              {rollbackPolicy.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Rollback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diff View Dialog */}
      <Dialog open={!!diffVersion} onOpenChange={() => setDiffVersion(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Compare Versions
            </DialogTitle>
            <DialogDescription>
              Version {diffVersion?.version_number} vs Current (v{policy.version})
            </DialogDescription>
          </DialogHeader>
          {diffVersion && (
            <div className="flex-1 overflow-auto py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">v{diffVersion.version_number} (Previous)</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(diffVersion.created_at), "PP")}
                    </span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium text-sm">{diffVersion.name}</p>
                    {diffVersion.description && (
                      <p className="text-xs text-muted-foreground mt-1">{diffVersion.description}</p>
                    )}
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {diffVersion.content || "(No content)"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge>v{policy.version} (Current)</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(policy.updated_at), "PP")}
                    </span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium text-sm">{policy.name}</p>
                    {policy.description && (
                      <p className="text-xs text-muted-foreground mt-1">{policy.description}</p>
                    )}
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {policy.content || "(No content)"}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDiffVersion(null)}>
              Close
            </Button>
            {diffVersion && (
              <Button
                onClick={() => {
                  setDiffVersion(null);
                  setRollbackTarget(diffVersion);
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Rollback to This Version
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
