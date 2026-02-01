import { useState } from "react";
import { format, formatDistanceToNow, isPast } from "date-fns";
import { 
  Link2, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  XCircle, 
  Clock, 
  Eye, 
  Shield,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useAuditorLinks, 
  useCreateAuditorLink, 
  useDeactivateAuditorLink,
  useDeleteAuditorLink 
} from "@/hooks/useAuditorLinks";
import { useAISystems } from "@/hooks/useAISystems";
import { toast } from "sonner";

function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [aiSystemId, setAiSystemId] = useState<string>("");
  const [expiresInDays, setExpiresInDays] = useState("30");
  
  const { systems: aiSystems } = useAISystems();
  const createLink = useCreateAuditorLink();

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name for this link");
      return;
    }

    await createLink.mutateAsync({
      name: name.trim(),
      description: description.trim() || undefined,
      ai_system_id: aiSystemId || null,
      expires_in_days: parseInt(expiresInDays, 10),
    });

    setOpen(false);
    setName("");
    setDescription("");
    setAiSystemId("");
    setExpiresInDays("30");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Auditor Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Auditor Link</DialogTitle>
          <DialogDescription>
            Generate a time-limited, read-only link for external auditors to access compliance documentation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Link Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Q1 2025 Audit - External Auditor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional notes about this link..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai-system">AI System (Optional)</Label>
            <Select value={aiSystemId} onValueChange={setAiSystemId}>
              <SelectTrigger>
                <SelectValue placeholder="All systems (organization-wide)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All systems</SelectItem>
                {aiSystems?.map((system) => (
                  <SelectItem key={system.id} value={system.id}>
                    {system.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Leave blank to grant access to all AI systems in your organization.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expires">Link Expires In</Label>
            <Select value={expiresInDays} onValueChange={setExpiresInDays}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={createLink.isPending}>
            {createLink.isPending ? "Creating..." : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LinkCard({ link }: { link: ReturnType<typeof useAuditorLinks>["data"][number] }) {
  const [copied, setCopied] = useState(false);
  const deactivate = useDeactivateAuditorLink();
  const deleteLink = useDeleteAuditorLink();
  
  const isExpired = isPast(new Date(link.expires_at));
  const isInactive = !link.is_active || isExpired;

  // In production, this would be a real URL
  const fullUrl = `${window.location.origin}/audit/${link.token}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={isInactive ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">{link.name}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {isExpired ? (
              <Badge variant="destructive">Expired</Badge>
            ) : !link.is_active ? (
              <Badge variant="secondary">Deactivated</Badge>
            ) : (
              <Badge variant="default" className="bg-primary">Active</Badge>
            )}
          </div>
        </div>
        {link.description && (
          <CardDescription>{link.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Link URL */}
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-md bg-muted px-3 py-2 text-sm font-mono truncate">
            {fullUrl}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={isInactive}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Scope</p>
            <p className="font-medium">
              {link.ai_system?.name || "All AI Systems"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Access Count</p>
            <p className="font-medium flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {link.access_count}
              {link.max_access_count && ` / ${link.max_access_count}`}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Expires</p>
            <p className="font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {isExpired 
                ? `Expired ${formatDistanceToNow(new Date(link.expires_at))} ago`
                : formatDistanceToNow(new Date(link.expires_at), { addSuffix: true })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">
              {format(new Date(link.created_at), "PP")}
            </p>
          </div>
        </div>

        {/* Actions */}
        {!isInactive && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => deactivate.mutate(link.id)}
              disabled={deactivate.isPending}
            >
              <XCircle className="h-3 w-3" />
              Deactivate
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 text-destructive">
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Auditor Link?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the link. Anyone with the URL will no longer be able to access it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteLink.mutate(link.id)}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AuditorLinksPanel() {
  const { data: links, isLoading } = useAuditorLinks();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const activeLinks = links?.filter(l => l.is_active && !isPast(new Date(l.expires_at))) || [];
  const inactiveLinks = links?.filter(l => !l.is_active || isPast(new Date(l.expires_at))) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Auditor Portal Links</h2>
          <p className="text-sm text-muted-foreground">
            Share time-limited, read-only access to compliance documentation with external auditors.
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      {links?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Link2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="font-medium text-muted-foreground">No auditor links yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create a link to share compliance evidence with external auditors
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {activeLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Active Links ({activeLinks.length})</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {activeLinks.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            </div>
          )}

          {inactiveLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Expired/Deactivated ({inactiveLinks.length})</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {inactiveLinks.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
