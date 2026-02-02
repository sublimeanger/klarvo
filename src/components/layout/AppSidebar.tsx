import { Link, useLocation, useNavigate } from "react-router-dom";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.svg";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Cpu,
  Building2,
  ClipboardCheck,
  FileCheck,
  FileText,
  GraduationCap,
  CheckSquare,
  AlertTriangle,
  Download,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Activity,
  Package,
  Factory,
  Truck,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Systems", href: "/ai-systems", icon: Cpu },
  { name: "Discovery", href: "/discovery", icon: Sparkles },
  { name: "Vendors", href: "/vendors", icon: Building2 },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "Controls", href: "/controls", icon: Shield },
  { name: "Evidence", href: "/evidence", icon: FileCheck },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Disclosures", href: "/disclosures", icon: FileText },
  { name: "Training", href: "/training", icon: GraduationCap },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Exports", href: "/exports", icon: Download },
  { name: "Audit Log", href: "/audit-log", icon: Activity },
];

type OperatorNavItem = {
  name: string;
  href: string;
  icon: typeof Package;
  addonKey: "provider" | "importer_distributor";
};

const providerNavigation: OperatorNavItem[] = [
  { name: "Provider Track", href: "/provider-track", icon: Package, addonKey: "provider" },
  { name: "Importer Track", href: "/provider-track/importer-verification", icon: Factory, addonKey: "importer_distributor" },
  { name: "Distributor Track", href: "/provider-track/distributor-verification", icon: Truck, addonKey: "importer_distributor" },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  compliance_owner: "Compliance Owner",
  system_owner: "System Owner",
  reviewer: "Reviewer",
  viewer: "Viewer",
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { profile, userRole, signOut } = useAuth();
  const { 
    canAccessProviderTrack, 
    canAccessImporterDistributorTrack,
    canPurchaseProviderTrack,
    canPurchaseImporterDistributor,
  } = useOperatorTrackAccess();

  // Compute user display info
  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";
  const displayName = profile?.full_name || "User";
  const displayRole = ROLE_LABELS[userRole?.role || ""] || "Member";

  const getOperatorAccess = (addonKey: "provider" | "importer_distributor") => {
    if (addonKey === "provider") {
      return { hasAccess: canAccessProviderTrack, canPurchase: canPurchaseProviderTrack };
    }
    return { hasAccess: canAccessImporterDistributorTrack, canPurchase: canPurchaseImporterDistributor };
  };

  const handleLockedClick = () => {
    navigate("/settings/billing");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/login", { replace: true });
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link to="/" className="flex items-center gap-3">
          {collapsed ? (
            <img 
              src="/favicon.png" 
              alt="Klarvo" 
              className="h-9 w-9 rounded-lg"
            />
          ) : (
            <img 
              src={klarvoLogo} 
              alt="Klarvo" 
              className="h-7"
            />
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/dashboard" && location.pathname === "/");
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* Provider Track Section */}
        <div className="pt-4">
          {!collapsed && (
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Market Access
            </p>
          )}
          {collapsed && <Separator className="my-2" />}
          <TooltipProvider delayDuration={0}>
            {providerNavigation.map((item) => {
              const isActive = location.pathname === item.href ||
                location.pathname.startsWith(item.href + "/");
              const { hasAccess, canPurchase } = getOperatorAccess(item.addonKey);
              const isLocked = !hasAccess;

              if (isLocked) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleLockedClick}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          "text-sidebar-foreground/40 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground/60"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.name}</span>
                            <Lock className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p className="font-medium">Add-on Required</p>
                      <p className="text-xs text-muted-foreground">
                        {canPurchase 
                          ? "Purchase this add-on to unlock." 
                          : "Upgrade your plan to access add-ons."}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </TooltipProvider>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t p-3">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent/50"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{displayRole}</p>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
