import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AppLayout() {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "min-h-screen transition-all duration-300",
          // Desktop: offset by sidebar
          "lg:pl-64",
          // Mobile: offset by header
          "pt-16 lg:pt-0"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
