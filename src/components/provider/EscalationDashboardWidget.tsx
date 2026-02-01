import { AlertTriangle, ArrowRight, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationEscalationStatus } from "@/hooks/useRoleEscalation";
import { Link } from "react-router-dom";

export function EscalationDashboardWidget() {
  const { data, isLoading } = useOrganizationEscalationStatus();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.escalatedCount === 0) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Role Escalation Status</CardTitle>
          </div>
          <CardDescription>Article 25 monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-primary">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
              All Clear
            </Badge>
            <span className="text-sm">No escalation triggers detected</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-base">Role Escalation Alert</CardTitle>
          <Badge variant="destructive">{data.escalatedCount}</Badge>
        </div>
        <CardDescription>Article 25 triggers detected</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {data.escalatedCount} AI system{data.escalatedCount > 1 ? "s" : ""} may require 
          Provider obligations due to rebranding or modification.
        </p>
        
        <div className="space-y-2">
          {data.escalatedSystems.slice(0, 3).map((system) => (
            <div 
              key={system.id}
              className="flex items-center justify-between p-2 rounded bg-background border"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-destructive" />
                <span className="text-sm font-medium">{system.name}</span>
              </div>
              <div className="flex gap-1">
                {system.hasRebranded && (
                  <Badge variant="outline" className="text-xs">Rebranded</Badge>
                )}
                {system.hasModified && (
                  <Badge variant="outline" className="text-xs">Modified</Badge>
                )}
              </div>
            </div>
          ))}
          {data.escalatedCount > 3 && (
            <p className="text-xs text-muted-foreground text-center">
              +{data.escalatedCount - 3} more systems
            </p>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/provider-track">
            Review Provider Obligations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
