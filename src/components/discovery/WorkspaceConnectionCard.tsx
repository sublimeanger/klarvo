import {
  Cloud,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  type WorkspaceConnection, 
  useDisconnectWorkspace,
  useInitiateOAuth,
  useTriggerScan,
} from "@/hooks/useDiscovery";
import { formatDistanceToNow } from "date-fns";

interface WorkspaceConnectionCardProps {
  connection: WorkspaceConnection;
  onTriggerScan?: () => void;
}

function getProviderInfo(provider: WorkspaceConnection["provider"]) {
  switch (provider) {
    case "google_workspace":
      return {
        name: "Google Workspace",
        icon: "🔵",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      };
    case "microsoft_365":
      return {
        name: "Microsoft 365",
        icon: "🟠",
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      };
  }
}

function getStatusBadge(status: WorkspaceConnection["status"]) {
  switch (status) {
    case "active":
      return <StatusBadge variant="success" dot>Connected</StatusBadge>;
    case "disconnected":
      return <StatusBadge variant="draft" dot>Disconnected</StatusBadge>;
    case "error":
      return <StatusBadge variant="destructive" dot>Error</StatusBadge>;
    case "pending":
      return <StatusBadge variant="pending" dot>Pending</StatusBadge>;
  }
}

export function WorkspaceConnectionCard({ connection, onTriggerScan }: WorkspaceConnectionCardProps) {
  const providerInfo = getProviderInfo(connection.provider);
  const disconnect = useDisconnectWorkspace();
  const triggerScan = useTriggerScan();

  const handleScan = () => {
    triggerScan.mutate(connection.id);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg text-2xl ${providerInfo.color}`}>
              {providerInfo.icon}
            </div>
            <div>
              <CardTitle className="text-base">{providerInfo.name}</CardTitle>
              {connection.domain && (
                <CardDescription>{connection.domain}</CardDescription>
              )}
            </div>
          </div>
          {getStatusBadge(connection.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {connection.error_message && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{connection.error_message}</span>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            Connected {formatDistanceToNow(new Date(connection.connected_at), { addSuffix: true })}
          </p>
          {connection.last_scan_at && (
            <p>
              Last scan {formatDistanceToNow(new Date(connection.last_scan_at), { addSuffix: true })}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {connection.status === "active" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleScan}
              disabled={triggerScan.isPending}
              className="flex-1"
            >
              {triggerScan.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Scan Now
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Disconnect {providerInfo.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove the connection and stop future scans. Discovered tools will remain in your review queue.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => disconnect.mutate(connection.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

interface ConnectWorkspaceCardProps {
  provider: "google_workspace" | "microsoft_365";
  onConnect: () => void;
}

export function ConnectWorkspaceCard({ provider, onConnect }: ConnectWorkspaceCardProps) {
  const providerInfo = getProviderInfo(provider);
  const initiateOAuth = useInitiateOAuth();

  const handleConnect = () => {
    initiateOAuth.mutate(provider);
  };

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className={`p-3 rounded-xl text-3xl ${providerInfo.color} mb-4`}>
          {providerInfo.icon}
        </div>
        <h3 className="font-medium mb-1">Connect {providerInfo.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Automatically discover AI tools in your organization
        </p>
        <Button onClick={handleConnect} disabled={initiateOAuth.isPending}>
          {initiateOAuth.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Cloud className="h-4 w-4 mr-2" />
          )}
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
