import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Menu,
  X,
  LogOut,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

// Grouped navigation for better mobile UX
const navigationGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "AI Systems", href: "/ai-systems", icon: Cpu },
      { name: "Vendors", href: "/vendors", icon: Building2 },
    ],
  },
  {
    label: "Compliance",
    items: [
      { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
      { name: "Controls", href: "/controls", icon: Shield },
      { name: "Evidence", href: "/evidence", icon: FileCheck },
    ],
  },
  {
    label: "Manage",
    items: [
      { name: "Policies", href: "/policies", icon: FileText },
      { name: "Disclosures", href: "/disclosures", icon: FileText },
      { name: "Training", href: "/training", icon: GraduationCap },
    ],
  },
  {
    label: "Activity",
    items: [
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Incidents", href: "/incidents", icon: AlertTriangle },
      { name: "Exports", href: "/exports", icon: Download },
      { name: "Audit Log", href: "/audit-log", icon: Activity },
    ],
  },
];

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  compliance_owner: "Compliance Owner",
  system_owner: "System Owner",
  reviewer: "Reviewer",
  viewer: "Viewer",
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { profile, userRole, signOut } = useAuth();

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const displayRole = ROLE_LABELS[userRole?.role || ""] || "Member";

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 bg-background/95 backdrop-blur-md border-b px-3 sm:px-4 flex items-center justify-between safe-top">
      <Link to="/" className="flex items-center">
        <img src={klarvoLogo} alt="Klarvo" className="h-6 sm:h-7" />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10 tap-target">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[320px] p-0 flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          {/* Swipe indicator */}
          <div className="pt-3 pb-2">
            <div className="swipe-indicator" />
          </div>
          
          {/* User Header - Larger touch area */}
          <div className="flex items-center gap-3 px-4 py-4 border-b bg-muted/30">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary text-base font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base truncate">{profile?.full_name || "User"}</p>
              <p className="text-sm text-muted-foreground">{displayRole}</p>
            </div>
          </div>

          {/* Navigation Groups - Scrollable */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navigationGroups.map((group) => (
              <div key={group.label} className="mb-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="space-y-0.5 px-2">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-all tap-target active:scale-[0.98]",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground/80 hover:bg-muted active:bg-muted"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        <ChevronRight className={cn(
                          "h-4 w-4 opacity-40",
                          isActive && "opacity-70"
                        )} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Actions - Safe area padding */}
          <div className="border-t p-3 space-y-1.5 safe-bottom bg-muted/20">
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-all tap-target active:scale-[0.98]",
                location.pathname === "/settings"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="flex-1">Settings</span>
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-destructive transition-all hover:bg-destructive/10 active:bg-destructive/20 tap-target active:scale-[0.98]"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
