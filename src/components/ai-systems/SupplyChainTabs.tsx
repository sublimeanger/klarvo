import { Link } from "react-router-dom";
import { 
  Package, 
  Truck, 
  ShoppingCart, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Scale,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useImporterVerification } from "@/hooks/useImporterVerification";
import { useDistributorVerification } from "@/hooks/useDistributorVerification";
import { useRoleEscalation } from "@/hooks/useRoleEscalation";
import { RoleEscalationAlert } from "@/components/provider/RoleEscalationAlert";
import { useAuth } from "@/contexts/AuthContext";

interface SupplyChainTabsProps {
  aiSystemId: string;
  valueChainRole: string[] | string | null;
}

const STATUS_CONFIG = {
  not_started: { label: "Not Started", variant: "secondary" as const, icon: Clock },
  in_progress: { label: "In Progress", variant: "secondary" as const, icon: Clock },
  compliant: { label: "Compliant", variant: "default" as const, icon: CheckCircle },
  non_compliant: { label: "Non-Compliant", variant: "destructive" as const, icon: AlertTriangle },
  blocked: { label: "Blocked", variant: "destructive" as const, icon: AlertTriangle },
  escalated: { label: "Escalated", variant: "destructive" as const, icon: Scale },
};

function getCompletionPercentage(data: Record<string, boolean | null> | null): number {
  if (!data) return 0;
  const entries = Object.entries(data);
  const completed = entries.filter(([_, v]) => v === true).length;
  return entries.length > 0 ? Math.round((completed / entries.length) * 100) : 0;
}

export function SupplyChainTabs({ aiSystemId, valueChainRole }: SupplyChainTabsProps) {
  const { profile } = useAuth();
  const roles = Array.isArray(valueChainRole) ? valueChainRole : valueChainRole ? [valueChainRole] : [];
  
  const isProvider = roles.includes("provider");
  const isImporter = roles.includes("importer");
  const isDistributor = roles.includes("distributor");
  const isDeployer = roles.includes("deployer") || roles.length === 0;

  const { data: importerVerification, isLoading: loadingImporter } = useImporterVerification(
    isImporter ? aiSystemId : undefined
  );
  const { data: distributorVerification, isLoading: loadingDistributor } = useDistributorVerification(
    isDistributor ? aiSystemId : undefined
  );
  const { data: escalation } = useRoleEscalation(aiSystemId);

  // If only deployer, don't show this section
  if (!isProvider && !isImporter && !isDistributor) {
    return null;
  }

  const hasEscalation = escalation?.overallStatus === "escalated";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Supply Chain Compliance
        </CardTitle>
        <CardDescription>
          Role-specific obligations under Articles 16-27
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Escalation Alert */}
        {hasEscalation && (
          <div className="mb-4">
            <RoleEscalationAlert aiSystemId={aiSystemId} showFullDetails />
          </div>
        )}

        <Tabs defaultValue={isProvider ? "provider" : isImporter ? "importer" : "distributor"}>
          <TabsList className="grid w-full grid-cols-3">
            {isProvider && (
              <TabsTrigger value="provider" className="gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Provider</span>
              </TabsTrigger>
            )}
            {isImporter && (
              <TabsTrigger value="importer" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Importer</span>
              </TabsTrigger>
            )}
            {isDistributor && (
              <TabsTrigger value="distributor" className="gap-2">
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Distributor</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Provider Tab */}
          {isProvider && (
            <TabsContent value="provider" className="mt-4 space-y-4">
              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-primary" />
                      Provider Obligations (Articles 16-22)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Full compliance required including technical documentation, 
                      conformity assessment, and CE marking.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" asChild>
                    <Link to="/provider-track">
                      Go to Provider Track
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Importer Tab */}
          {isImporter && (
            <TabsContent value="importer" className="mt-4 space-y-4">
              {loadingImporter ? (
                <Skeleton className="h-32 w-full" />
              ) : importerVerification ? (
                <ImporterStatusCard verification={importerVerification} aiSystemId={aiSystemId} />
              ) : (
                <EmptyVerificationCard 
                  role="importer" 
                  articleRef="Article 23"
                  aiSystemId={aiSystemId}
                />
              )}
            </TabsContent>
          )}

          {/* Distributor Tab */}
          {isDistributor && (
            <TabsContent value="distributor" className="mt-4 space-y-4">
              {loadingDistributor ? (
                <Skeleton className="h-32 w-full" />
              ) : distributorVerification ? (
                <DistributorStatusCard 
                  verification={distributorVerification} 
                  aiSystemId={aiSystemId}
                  hasEscalation={hasEscalation}
                />
              ) : (
                <EmptyVerificationCard 
                  role="distributor" 
                  articleRef="Article 24"
                  aiSystemId={aiSystemId}
                />
              )}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ImporterStatusCard({ verification, aiSystemId }: { 
  verification: any; 
  aiSystemId: string;
}) {
  const status = STATUS_CONFIG[verification.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.not_started;
  const completion = getCompletionPercentage(verification.verification_data as Record<string, boolean | null>);
  const StatusIcon = status.icon;

  return (
    <div className="p-4 rounded-lg border bg-muted/50">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
            Importer Verification (Article 23)
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={status.variant}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {completion}% complete
            </span>
          </div>
        </div>
      </div>
      
      {verification.provider_name && (
        <div className="mt-3 text-sm">
          <span className="text-muted-foreground">Provider:</span>{" "}
          <span className="font-medium">{verification.provider_name}</span>
        </div>
      )}

      <div className="mt-4">
        <Button size="sm" variant="outline" asChild>
          <Link to="/provider-track/importer-verification">
            View Verification Checklist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DistributorStatusCard({ verification, aiSystemId, hasEscalation }: { 
  verification: any; 
  aiSystemId: string;
  hasEscalation: boolean;
}) {
  const status = STATUS_CONFIG[verification.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.not_started;
  const completion = getCompletionPercentage(verification.verification_data as Record<string, boolean | null>);
  const StatusIcon = status.icon;

  return (
    <div className="p-4 rounded-lg border bg-muted/50">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            Distributor Verification (Article 24)
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={hasEscalation ? "destructive" : status.variant}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {hasEscalation ? "Escalated to Provider" : status.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {completion}% complete
            </span>
          </div>
        </div>
      </div>

      {(verification.has_rebranded || verification.has_modified) && (
        <div className="mt-3 flex gap-2">
          {verification.has_rebranded && (
            <Badge variant="outline" className="text-xs border-destructive/50 text-destructive">
              Rebranded
            </Badge>
          )}
          {verification.has_modified && (
            <Badge variant="outline" className="text-xs border-destructive/50 text-destructive">
              Modified
            </Badge>
          )}
        </div>
      )}

      <div className="mt-4">
        <Button size="sm" variant="outline" asChild>
          <Link to="/provider-track/distributor-verification">
            View Verification Checklist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function EmptyVerificationCard({ role, articleRef, aiSystemId }: {
  role: "importer" | "distributor";
  articleRef: string;
  aiSystemId: string;
}) {
  const Icon = role === "importer" ? ShoppingCart : Truck;
  const link = role === "importer" 
    ? "/provider-track/importer-verification" 
    : "/provider-track/distributor-verification";

  return (
    <div className="p-4 rounded-lg border border-dashed bg-muted/30 text-center">
      <Icon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
      <h4 className="font-medium">
        {role === "importer" ? "Importer" : "Distributor"} Verification
      </h4>
      <p className="text-sm text-muted-foreground mt-1">
        Complete your {articleRef} verification checklist
      </p>
      <Button size="sm" className="mt-4" asChild>
        <Link to={link}>
          Start Verification
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
