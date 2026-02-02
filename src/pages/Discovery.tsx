import { useState } from "react";
import { 
  Bot, 
  Cloud, 
  Filter, 
  Search, 
  CheckSquare, 
  X, 
  Plus,
  RefreshCw,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DiscoveredToolCard,
  WorkspaceConnectionCard,
  ConnectWorkspaceCard,
  DiscoveryStats,
} from "@/components/discovery";
import {
  useDiscoveredTools,
  useWorkspaceConnections,
  useBulkUpdateDiscoveredTools,
  type DiscoveredTool,
} from "@/hooks/useDiscovery";
import { useAddons } from "@/hooks/useAddons";
import { AddonLockedPage } from "@/components/billing/AddonLockedPage";
import { toast } from "sonner";

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: connections, isLoading: connectionsLoading } = useWorkspaceConnections();
  const { data: tools, isLoading: toolsLoading } = useDiscoveredTools(
    statusFilter === "all" ? undefined : (statusFilter as DiscoveredTool["status"])
  );
  const bulkUpdate = useBulkUpdateDiscoveredTools();
  const { hasAddon, isLoading: addonsLoading } = useAddons();

  // Check if addon is enabled
  const hasDiscoveryAddon = hasAddon("shadow_ai_discovery");

  // Filter tools by search
  const filteredTools = tools?.filter((tool) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.tool_name.toLowerCase().includes(query) ||
      tool.vendor_name?.toLowerCase().includes(query) ||
      tool.matched_pattern?.category?.toLowerCase().includes(query)
    );
  });

  const handleSelectTool = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredTools?.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTools?.map((t) => t.id)));
    }
  };

  const handleBulkDismiss = () => {
    if (selectedIds.size === 0) return;
    bulkUpdate.mutate({
      ids: Array.from(selectedIds),
      status: "dismissed",
      dismiss_reason: "Bulk dismissed",
    });
    setSelectedIds(new Set());
  };

  const handleBulkReview = () => {
    if (selectedIds.size === 0) return;
    bulkUpdate.mutate({
      ids: Array.from(selectedIds),
      status: "reviewed",
    });
    setSelectedIds(new Set());
  };

  const handleConnectWorkspace = (provider: "google_workspace" | "microsoft_365") => {
    // In a full implementation, this would initiate OAuth flow
    toast.info(`${provider === "google_workspace" ? "Google Workspace" : "Microsoft 365"} OAuth integration coming soon`);
  };

  // Show locked page if addon not enabled
  if (!addonsLoading && !hasDiscoveryAddon) {
    return (
      <AddonLockedPage
        addonId="shadow_ai_discovery"
        title="Shadow AI Discovery"
        description="Automatically detect AI tools across your organization by connecting to Google Workspace or Microsoft 365. Includes pattern matching against 50+ known AI services, one-click add to inventory, and periodic re-scans."
      />
    );
  }

  const activeConnections = connections?.filter((c) => c.status === "active") || [];
  const hasGoogleWorkspace = connections?.some((c) => c.provider === "google_workspace");
  const hasM365 = connections?.some((c) => c.provider === "microsoft_365");

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Shadow AI Discovery
          </h1>
          <p className="text-muted-foreground">
            Automatically detect AI tools used across your organization
          </p>
        </div>
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Discovered Tools
            {tools && tools.filter(t => t.status === "pending").length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {tools.filter(t => t.status === "pending").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Connections
          </TabsTrigger>
        </TabsList>

        {/* Discovered Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          {/* Stats */}
          <DiscoveryStats />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="added_to_inventory">Added to Inventory</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border">
              <span className="text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleBulkReview}>
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark Reviewed
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkDismiss}>
                  <X className="h-4 w-4 mr-2" />
                  Dismiss
                </Button>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedIds(new Set())}
                className="ml-auto"
              >
                Clear Selection
              </Button>
            </div>
          )}

          {/* Tools List */}
          {toolsLoading ? (
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="h-32" />
                </Card>
              ))}
            </div>
          ) : filteredTools && filteredTools.length > 0 ? (
            <div className="space-y-4">
              {statusFilter === "pending" && filteredTools.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  {selectedIds.size === filteredTools.length ? "Deselect All" : "Select All"}
                </Button>
              )}
              <div className="grid gap-4">
                {filteredTools.map((tool) => (
                  <DiscoveredToolCard
                    key={tool.id}
                    tool={tool}
                    selected={selectedIds.has(tool.id)}
                    onSelect={statusFilter === "pending" ? (s) => handleSelectTool(tool.id, s) : undefined}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No tools found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {activeConnections.length === 0
                    ? "Connect a workspace to start discovering AI tools"
                    : "No tools match your current filters"}
                </p>
                {activeConnections.length === 0 && (
                  <Button onClick={() => handleConnectWorkspace("google_workspace")}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Connect Workspace
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Existing Connections */}
            {connections?.map((connection) => (
              <WorkspaceConnectionCard
                key={connection.id}
                connection={connection}
                onTriggerScan={() => toast.info("Scan triggered")}
              />
            ))}

            {/* Add New Connections */}
            {!hasGoogleWorkspace && (
              <ConnectWorkspaceCard
                provider="google_workspace"
                onConnect={() => handleConnectWorkspace("google_workspace")}
              />
            )}
            {!hasM365 && (
              <ConnectWorkspaceCard
                provider="microsoft_365"
                onConnect={() => handleConnectWorkspace("microsoft_365")}
              />
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">How Discovery Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Connect</strong> — Link your Google Workspace or Microsoft 365 admin account
              </p>
              <p>
                <strong>2. Scan</strong> — We check installed apps, OAuth grants, and marketplace apps for AI tools
              </p>
              <p>
                <strong>3. Review</strong> — Detected tools appear in your queue with risk indicators
              </p>
              <p>
                <strong>4. Add</strong> — One-click add tools to your AI system inventory for compliance tracking
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
