import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  CreditCard,
  Save,
  Loader2,
  User,
  Shield,
  Trash2,
  MoreHorizontal,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization, useUpdateOrganization } from "@/hooks/useOrganization";
import { useTeamMembers, useUpdateMemberRole, useRemoveMember } from "@/hooks/useTeamMembers";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import type { Enums } from "@/integrations/supabase/types";

const INDUSTRY_SECTORS = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "government", label: "Government & Public Sector" },
  { value: "legal", label: "Legal Services" },
  { value: "media", label: "Media & Entertainment" },
  { value: "other", label: "Other" },
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501+", label: "501+ employees" },
];

const ROLES: { value: Enums<"app_role">; label: string; description: string }[] = [
  { value: "admin", label: "Admin", description: "Full access" },
  { value: "compliance_owner", label: "Compliance Owner", description: "Manage compliance" },
  { value: "system_owner", label: "System Owner", description: "Manage AI systems" },
  { value: "reviewer", label: "Reviewer", description: "Review & approve" },
  { value: "viewer", label: "Viewer", description: "View only" },
];

export default function GeneralSettings() {
  const { user, userRole, refreshProfile } = useAuth();
  const { data: org, isLoading: orgLoading } = useOrganization();
  const { data: members, isLoading: membersLoading } = useTeamMembers();
  const updateOrg = useUpdateOrganization();
  const updateRole = useUpdateMemberRole();
  const removeMember = useRemoveMember();

  const [orgName, setOrgName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const isAdmin = userRole?.role === "admin";

  useEffect(() => {
    if (org) {
      setOrgName(org.name || "");
      setIndustrySector(org.industry_sector || "");
      setCompanySize(org.company_size || "");
    }
  }, [org]);

  const handleSaveOrg = async () => {
    await updateOrg.mutateAsync({
      name: orgName,
      industry_sector: industrySector || null,
      company_size: companySize || null,
    });
    refreshProfile();
  };

  const handleRoleChange = async (userId: string, role: Enums<"app_role">) => {
    await updateRole.mutateAsync({ userId, role });
  };

  const handleRemoveMember = async () => {
    if (memberToRemove) {
      await removeMember.mutateAsync(memberToRemove);
      setMemberToRemove(null);
    }
  };

  const getRoleBadgeVariant = (role: Enums<"app_role">) => {
    switch (role) {
      case "admin":
        return "default";
      case "compliance_owner":
        return "secondary";
      case "system_owner":
        return "outline";
      default:
        return "outline";
    }
  };

  if (orgLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage organization and team settings
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-4 sm:space-y-6">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="organization" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Organization</span>
            <span className="sm:hidden">Org</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="billing" asChild>
            <Link to="/settings/billing" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Billing
            </Link>
          </TabsTrigger>
        </TabsList>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Your organization name"
                  disabled={!isAdmin}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Sector</Label>
                  <Select
                    value={industrySector}
                    onValueChange={setIndustrySector}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry..." />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_SECTORS.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select
                    value={companySize}
                    onValueChange={setCompanySize}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size..." />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isAdmin && (
                <Button
                  onClick={handleSaveOrg}
                  disabled={updateOrg.isPending}
                  className="mt-4"
                >
                  {updateOrg.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              {membersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : members && members.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      {isAdmin && <TableHead className="w-12"></TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-muted p-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {member.full_name || "Unnamed User"}
                              </p>
                              {member.id === user?.id && (
                                <span className="text-xs text-muted-foreground">
                                  (You)
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {isAdmin && member.id !== user?.id ? (
                            <Select
                              value={member.user_role?.role || "viewer"}
                              onValueChange={(value) =>
                                handleRoleChange(member.id, value as Enums<"app_role">)
                              }
                            >
                              <SelectTrigger className="w-[160px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ROLES.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    <div className="flex items-center gap-2">
                                      <Shield className="h-3 w-3" />
                                      {role.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant={getRoleBadgeVariant(member.user_role?.role || "viewer")}>
                              {ROLES.find((r) => r.value === member.user_role?.role)?.label || "Viewer"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(member.created_at).toLocaleDateString()}
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            {member.id !== user?.id && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => setMemberToRemove(member.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove from organization
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Overview of what each role can do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ROLES.map((role) => (
                  <div key={role.value} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">{role.label}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {role.value === "admin" && "Full access to all features, settings, and team management"}
                      {role.value === "compliance_owner" && "Manage compliance, policies, assessments, and evidence"}
                      {role.value === "system_owner" && "Manage AI systems, vendors, and related tasks"}
                      {role.value === "reviewer" && "Review and approve assessments and evidence"}
                      {role.value === "viewer" && "View-only access to dashboards and reports"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>
      </Tabs>

      {/* Remove Member Dialog */}
      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the member from your organization. They will lose access
              to all organization data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
