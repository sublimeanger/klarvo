import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  User,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "AI Systems", href: "/ai-systems", icon: Cpu },
  { name: "Vendors", href: "/vendors", icon: Building2 },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "Controls", href: "/controls", icon: Shield },
  { name: "Evidence", href: "/evidence", icon: FileCheck },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Training", href: "/training", icon: GraduationCap },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Exports", href: "/exports", icon: Download },
  { name: "Audit Log", href: "/audit-log", icon: Activity },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src="/favicon.png" alt="Klarvo" className="h-8 w-8 rounded-lg" />
        <span className="font-semibold">Klarvo</span>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{profile?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground">Compliance Manager</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t p-3 space-y-1">
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  location.pathname === "/settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
