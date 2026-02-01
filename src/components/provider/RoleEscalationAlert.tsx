import { AlertTriangle, ArrowRight, FileWarning, Scale, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRoleEscalation, type EscalationCheck } from "@/hooks/useRoleEscalation";
import { Link } from "react-router-dom";

interface RoleEscalationAlertProps {
  aiSystemId: string;
  showFullDetails?: boolean;
}

const TRIGGER_LABELS: Record<string, string> = {
  rebranding: "Rebranding under own name/trademark",
  substantial_modification: "Substantial modification made",
  name_trademark_change: "Name or trademark change",
  intended_purpose_change: "Intended purpose modified",
  software_update_substantial: "Substantial software update",
};

export function RoleEscalationAlert({ aiSystemId, showFullDetails = false }: RoleEscalationAlertProps) {
  const { data: escalation, isLoading } = useRoleEscalation(aiSystemId);

  if (isLoading || !escalation) return null;

  const isEscalated = escalation.overallStatus === "escalated";
  const needsReview = escalation.overallStatus === "review_needed";

  if (!isEscalated && !needsReview) return null;

  if (!showFullDetails) {
    // Compact alert for lists/cards
    return (
      <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-sm font-medium">
          Article 25 Escalation
        </AlertTitle>
        <AlertDescription className="text-xs">
          {isEscalated 
            ? "This organization may be considered a Provider under Article 25."
            : "Review needed for compliance status."
          }
        </AlertDescription>
      </Alert>
    );
  }

  // Full details view
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/20">
            <Scale className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              Article 25 Role Escalation
              <Badge variant="destructive">Critical</Badge>
            </CardTitle>
            <CardDescription>
              Legal obligations may have changed
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current vs Escalated Role */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-background border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Current Role</p>
            <Badge variant="secondary">{escalation.currentRole}</Badge>
          </div>
          <ArrowRight className="h-5 w-5 text-destructive" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Escalated To</p>
            <Badge variant="destructive">{escalation.escalatedRole || "Provider"}</Badge>
          </div>
        </div>

        {/* Triggers Detected */}
        {escalation.distributorCheck?.isTriggered && (
          <EscalationDetails check={escalation.distributorCheck} role="Distributor" />
        )}

        {escalation.importerCheck?.isTriggered && (
          <EscalationDetails check={escalation.importerCheck} role="Importer" />
        )}

        {/* Action Required */}
        <div className="pt-2 border-t">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Required Actions as Provider
          </h4>
          <ul className="space-y-2">
            {(escalation.distributorCheck?.requiredActions || []).slice(0, 5).map((action, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                {action}
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link to="/provider-track">
              Go to Provider Track
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EscalationDetails({ check, role }: { check: EscalationCheck; role: string }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="triggers" className="border rounded-lg px-4">
        <AccordionTrigger className="py-3 hover:no-underline">
          <div className="flex items-center gap-2 text-left">
            <FileWarning className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium">
              {role} Escalation Triggers ({check.triggers.length})
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {check.explanation}
            </p>
            <div className="space-y-2">
              {check.triggers.map((trigger) => (
                <div 
                  key={trigger}
                  className="flex items-center gap-2 p-2 rounded bg-destructive/10 text-sm"
                >
                  <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                  <span>{TRIGGER_LABELS[trigger] || trigger}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Reference: {check.articleReference}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Compact badge for use in tables/lists
export function EscalationBadge({ aiSystemId }: { aiSystemId: string }) {
  const { data: escalation } = useRoleEscalation(aiSystemId);

  if (!escalation || escalation.overallStatus === "clear") return null;

  return (
    <Badge 
      variant="destructive" 
      className="text-xs gap-1"
    >
      <AlertTriangle className="h-3 w-3" />
      Art. 25
    </Badge>
  );
}
