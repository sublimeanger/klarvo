import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSendInvite } from "@/hooks/useTeamInvites";
import { Loader2, Mail, Shield } from "lucide-react";
import type { Enums } from "@/integrations/supabase/types";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canInviteAdmin?: boolean;
}

const ROLES: { value: Enums<"app_role">; label: string; description: string }[] = [
  { value: "admin", label: "Admin", description: "Full access including billing and team management" },
  { value: "compliance_owner", label: "Compliance Owner", description: "Manage compliance, policies, and assessments" },
  { value: "system_owner", label: "System Owner", description: "Manage AI systems and vendors" },
  { value: "reviewer", label: "Reviewer", description: "Review and approve assessments" },
  { value: "viewer", label: "Viewer", description: "Read-only access to dashboards" },
];

export function InviteMemberDialog({
  open,
  onOpenChange,
  canInviteAdmin = true,
}: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Enums<"app_role">>("viewer");
  const { mutate: sendInvite, isPending } = useSendInvite();

  const availableRoles = canInviteAdmin
    ? ROLES
    : ROLES.filter((r) => r.value !== "admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sendInvite(
      { email: email.toLowerCase().trim(), role },
      {
        onSuccess: () => {
          setEmail("");
          setRole("viewer");
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Invite Team Member</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Send an invitation to join your organization. They'll receive an email
            with a link to accept.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 sm:h-9"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="role" className="text-xs sm:text-sm">Role</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as Enums<"app_role">)}
              disabled={isPending}
            >
              <SelectTrigger id="role" className="h-10 sm:h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    <div className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-sm">{r.label}</span>
                        <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                          — {r.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="h-10 sm:h-9 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !email.trim()} className="h-10 sm:h-9 w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
