import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AppLayout() {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <AppSidebar />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarCollapsed ? "pl-[72px]" : "pl-64"
        )}
      >
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
