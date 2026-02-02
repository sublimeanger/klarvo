import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  KeyRound,
  LogOut,
  Sparkles,
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
import { AIPrivacySettings } from "@/components/settings/AIPrivacySettings";
import { InviteMemberDialog, PendingInvitesList } from "@/components/team";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Enums } from "@/integrations/supabase/types";
import { UserPlus } from "lucide-react";

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
  const navigate = useNavigate();
  const { user, userRole, refreshProfile, profile, signOut } = useAuth();
  const { data: org, isLoading: orgLoading } = useOrganization();
  const { data: members, isLoading: membersLoading } = useTeamMembers();
  const updateOrg = useUpdateOrganization();
  const updateRole = useUpdateMemberRole();
  const removeMember = useRemoveMember();

  const [orgName, setOrgName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  
  // Account settings state
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const isAdmin = userRole?.role === "admin";

  useEffect(() => {
    if (org) {
      setOrgName(org.name || "");
      setIndustrySector(org.industry_sector || "");
      setCompanySize(org.company_size || "");
    }
  }, [org]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsUpdatingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);
      
      if (error) throw error;
      await refreshProfile();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile", { description: error.message });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // Verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        toast.error("Current password is incorrect");
        setIsUpdatingPassword(false);
        return;
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error("Failed to update password", { description: error.message });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/login", { replace: true });
  };

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

      <Tabs defaultValue="account" className="space-y-4 sm:space-y-6">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="account" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Account
          </TabsTrigger>
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
          <TabsTrigger value="ai-privacy" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">AI & Privacy</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
          <TabsTrigger value="billing" asChild>
            <Link to="/settings/billing" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Billing
            </Link>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 sm:space-y-6">
          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Profile</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted h-10 sm:h-9"
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Contact support to change your email address
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="full-name" className="text-xs sm:text-sm">Full Name</Label>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="h-10 sm:h-9"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isUpdatingProfile}
                className="w-full sm:w-auto h-10 sm:h-9"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <KeyRound className="h-4 w-4 sm:h-5 sm:w-5" />
                Change Password
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="current-password" className="text-xs sm:text-sm">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-10 sm:h-9"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="new-password" className="text-xs sm:text-sm">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-10 sm:h-9"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="confirm-password" className="text-xs sm:text-sm">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-10 sm:h-9"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full sm:w-auto h-10 sm:h-9"
              >
                {isUpdatingPassword ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="mr-2 h-4 w-4" />
                )}
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Sign Out</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Sign out of your account on this device
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
              <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto h-10 sm:h-9">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-4 sm:space-y-6">
          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Organization Profile</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="org-name" className="text-xs sm:text-sm">Organization Name</Label>
                <Input
                  id="org-name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Your organization name"
                  disabled={!isAdmin}
                  className="h-10 sm:h-9"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="industry" className="text-xs sm:text-sm">Industry Sector</Label>
                  <Select
                    value={industrySector}
                    onValueChange={setIndustrySector}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="h-10 sm:h-9">
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

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="size" className="text-xs sm:text-sm">Company Size</Label>
                  <Select
                    value={companySize}
                    onValueChange={setCompanySize}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="h-10 sm:h-9">
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
                  className="mt-3 sm:mt-4 w-full sm:w-auto h-10 sm:h-9"
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

        {/* AI & Privacy Tab */}
        <TabsContent value="ai-privacy">
          <AIPrivacySettings />
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4 sm:space-y-6">
          <Card className="rounded-xl">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 space-y-0 p-3 sm:p-6">
              <div>
                <CardTitle className="text-base sm:text-lg">Team Members</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage your team and their access levels
                </CardDescription>
              </div>
              {(isAdmin || userRole?.role === "compliance_owner") && (
                <Button onClick={() => setInviteDialogOpen(true)} className="w-full sm:w-auto h-10 sm:h-9">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
              {membersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : members && members.length > 0 ? (
                <>
                  {/* Mobile Cards */}
                  <div className="space-y-3 md:hidden">
                    {members.map((member) => (
                      <div key={member.id} className="rounded-lg border bg-card p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-muted p-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {member.full_name || "Unnamed User"}
                                {member.id === user?.id && (
                                  <span className="text-xs text-muted-foreground ml-1">(You)</span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Joined {new Date(member.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {isAdmin && member.id !== user?.id && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setMemberToRemove(member.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          {isAdmin && member.id !== user?.id ? (
                            <Select
                              value={member.user_role?.role || "viewer"}
                              onValueChange={(value) =>
                                handleRoleChange(member.id, value as Enums<"app_role">)
                              }
                            >
                              <SelectTrigger className="h-8">
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
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block">
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
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found
                </div>
              )}
            </CardContent>
          </Card>
          {/* Pending Invitations */}
          {(isAdmin || userRole?.role === "compliance_owner") && (
            <Card className="rounded-xl">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Pending Invitations</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Invitations waiting to be accepted
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                <PendingInvitesList />
              </CardContent>
            </Card>
          )}

          <Card className="rounded-xl">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Role Permissions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Overview of what each role can do
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ROLES.map((role) => (
                  <div key={role.value} className="rounded-xl border p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      <h4 className="font-medium text-sm sm:text-base">{role.label}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
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

          {/* Invite Member Dialog */}
          <InviteMemberDialog
            open={inviteDialogOpen}
            onOpenChange={setInviteDialogOpen}
            canInviteAdmin={isAdmin}
          />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>
      </Tabs>

      {/* Remove Member Dialog */}
      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the member from your organization. They will lose access
              to all organization data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
