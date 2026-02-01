import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTeamInvites, useRevokeInvite } from "@/hooks/useTeamInvites";
import {
  Clock,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Loader2,
  XCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Enums } from "@/integrations/supabase/types";

const ROLE_LABELS: Record<Enums<"app_role">, string> = {
  admin: "Admin",
  compliance_owner: "Compliance Owner",
  system_owner: "System Owner",
  reviewer: "Reviewer",
  viewer: "Viewer",
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    variant: "outline" as const,
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    variant: "default" as const,
    icon: CheckCircle2,
  },
  expired: {
    label: "Expired",
    variant: "secondary" as const,
    icon: AlertCircle,
  },
  revoked: {
    label: "Revoked",
    variant: "destructive" as const,
    icon: XCircle,
  },
};

interface PendingInvitesListProps {
  showAll?: boolean;
}

export function PendingInvitesList({ showAll = false }: PendingInvitesListProps) {
  const { data: invites, isLoading } = useTeamInvites();
  const { mutate: revokeInvite, isPending: isRevoking } = useRevokeInvite();

  const filteredInvites = showAll
    ? invites
    : invites?.filter((i) => i.status === "pending");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!filteredInvites || filteredInvites.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No pending invitations</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filteredInvites.map((invite) => {
          const statusConfig = STATUS_CONFIG[invite.status];
          const StatusIcon = statusConfig.icon;
          const isExpired = new Date(invite.expires_at) < new Date();

          return (
            <div key={invite.id} className="rounded-xl border bg-card p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {ROLE_LABELS[invite.role]}
                    </p>
                  </div>
                </div>
                {invite.status === "pending" && !isExpired && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => revokeInvite(invite.id)}
                        disabled={isRevoking}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Revoke
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <Badge variant={statusConfig.variant} className="gap-1">
                  <StatusIcon className="h-3 w-3" />
                  {isExpired && invite.status === "pending" ? "Expired" : statusConfig.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Sent {formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvites.map((invite) => {
              const statusConfig = STATUS_CONFIG[invite.status];
              const StatusIcon = statusConfig.icon;
              const isExpired = new Date(invite.expires_at) < new Date();

              return (
                <TableRow key={invite.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {invite.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ROLE_LABELS[invite.role]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig.variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {isExpired && invite.status === "pending" ? "Expired" : statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(invite.expires_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    {invite.status === "pending" && !isExpired && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => revokeInvite(invite.id)}
                            disabled={isRevoking}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Revoke invitation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
