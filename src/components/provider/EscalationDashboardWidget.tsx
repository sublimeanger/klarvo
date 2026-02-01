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
      <Card className="rounded-xl">
        <CardHeader className="pb-2 p-3 sm:p-6">
          <Skeleton className="h-4 sm:h-5 w-40" />
          <Skeleton className="h-3 sm:h-4 w-60" />
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.escalatedCount === 0) {
    return (
      <Card className="border-primary/20 bg-primary/5 rounded-xl">
        <CardHeader className="pb-2 p-3 sm:p-6">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <CardTitle className="text-sm sm:text-base">Role Escalation Status</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">Article 25 monitoring</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
              All Clear
            </Badge>
            <span className="text-xs sm:text-sm">No escalation triggers detected</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/30 bg-destructive/5 rounded-xl">
      <CardHeader className="pb-2 p-3 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
          <CardTitle className="text-sm sm:text-base">Role Escalation Alert</CardTitle>
          <Badge variant="destructive" className="text-xs">{data.escalatedCount}</Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm">Article 25 triggers detected</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5 sm:space-y-3 p-3 sm:p-6 pt-0 sm:pt-0">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {data.escalatedCount} AI system{data.escalatedCount > 1 ? "s" : ""} may require 
          Provider obligations due to rebranding or modification.
        </p>
        
        <div className="space-y-1.5 sm:space-y-2">
          {data.escalatedSystems.slice(0, 3).map((system) => (
            <div 
              key={system.id}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-background border gap-2"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">{system.name}</span>
              </div>
              <div className="flex gap-1 shrink-0">
                {system.hasRebranded && (
                  <Badge variant="outline" className="text-[10px] sm:text-xs">Rebranded</Badge>
                )}
                {system.hasModified && (
                  <Badge variant="outline" className="text-[10px] sm:text-xs">Modified</Badge>
                )}
              </div>
            </div>
          ))}
          {data.escalatedCount > 3 && (
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
              +{data.escalatedCount - 3} more systems
            </p>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full h-10" asChild>
          <Link to="/provider-track">
            Review Provider Obligations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
