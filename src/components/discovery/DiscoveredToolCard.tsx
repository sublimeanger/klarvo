import { useState } from "react";
import {
  Bot,
  Check,
  X,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Users,
  Clock,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { type DiscoveredTool, useUpdateDiscoveredTool } from "@/hooks/useDiscovery";
import { formatDistanceToNow } from "date-fns";

interface DiscoveredToolCardProps {
  tool: DiscoveredTool;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

function getCategoryColor(category: string | null): string {
  switch (category) {
    case "llm":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "code_assist":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "image_gen":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
    case "content":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "meeting":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    case "sales":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "hr":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getRiskBadge(riskLevel: string | null) {
  switch (riskLevel) {
    case "high-risk_candidate":
      return <StatusBadge variant="destructive" dot>High-Risk Candidate</StatusBadge>;
    case "limited":
      return <StatusBadge variant="pending" dot>Limited Risk</StatusBadge>;
    case "minimal":
      return <StatusBadge variant="success" dot>Minimal Risk</StatusBadge>;
    default:
      return null;
  }
}

export function DiscoveredToolCard({ tool, selected, onSelect }: DiscoveredToolCardProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDismissDialog, setShowDismissDialog] = useState(false);
  const [dismissReason, setDismissReason] = useState("");
  const [systemName, setSystemName] = useState(tool.tool_name);

  const updateTool = useUpdateDiscoveredTool();

  const handleAddToInventory = () => {
    // In a full implementation, this would create an AI system and link it
    updateTool.mutate({
      id: tool.id,
      status: "added_to_inventory",
    });
    setShowAddDialog(false);
  };

  const handleDismiss = () => {
    updateTool.mutate({
      id: tool.id,
      status: "dismissed",
      dismiss_reason: dismissReason,
    });
    setShowDismissDialog(false);
    setDismissReason("");
  };

  const handleMarkReviewed = () => {
    updateTool.mutate({
      id: tool.id,
      status: "reviewed",
    });
  };

  const pattern = tool.matched_pattern;

  return (
    <>
      <Card className={`transition-all ${selected ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {onSelect && (
              <Checkbox
                checked={selected}
                onCheckedChange={onSelect}
                className="mt-1"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tool.tool_name}</h3>
                    {tool.vendor_name && (
                      <p className="text-sm text-muted-foreground">{tool.vendor_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {tool.status === "pending" && (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowAddDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Inventory
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleMarkReviewed}>
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Reviewed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setShowDismissDialog(true)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Dismiss
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Pattern info */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {pattern?.category && (
                  <Badge variant="secondary" className={getCategoryColor(pattern.category)}>
                    {pattern.category.replace("_", " ")}
                  </Badge>
                )}
                {pattern?.typical_risk_level && getRiskBadge(pattern.typical_risk_level)}
                {tool.detection_confidence < 1 && (
                  <Badge variant="outline" className="text-muted-foreground">
                    {Math.round(tool.detection_confidence * 100)}% match
                  </Badge>
                )}
              </div>

              {/* Purpose */}
              {pattern?.typical_purpose && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {pattern.typical_purpose}
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                {tool.user_count && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tool.user_count} users
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last seen {formatDistanceToNow(new Date(tool.last_seen_at), { addSuffix: true })}
                </span>
                {tool.detected_source && (
                  <Badge variant="outline" className="text-xs">
                    {tool.detected_source.replace("_", " ")}
                  </Badge>
                )}
              </div>

              {/* High-risk warning */}
              {pattern?.typical_risk_level === "high-risk_candidate" && (
                <div className="flex items-start gap-2 mt-3 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    This tool may require EU AI Act compliance assessment. Consider adding to inventory for proper classification.
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add to Inventory Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to AI System Inventory</DialogTitle>
            <DialogDescription>
              Create an AI system entry for {tool.tool_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">System Name</Label>
              <Input
                id="name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
              />
            </div>
            {pattern && (
              <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                <p><strong>Vendor:</strong> {pattern.vendor_name}</p>
                <p><strong>Category:</strong> {pattern.category}</p>
                {pattern.typical_risk_level && (
                  <p><strong>Typical Risk:</strong> {pattern.typical_risk_level}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToInventory} disabled={updateTool.isPending}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Inventory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dismiss Dialog */}
      <Dialog open={showDismissDialog} onOpenChange={setShowDismissDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss {tool.tool_name}</DialogTitle>
            <DialogDescription>
              Why are you dismissing this tool from discovery?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="e.g., Not an AI tool, already tracked elsewhere, not used by our organization..."
              value={dismissReason}
              onChange={(e) => setDismissReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDismissDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDismiss}
              disabled={updateTool.isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
