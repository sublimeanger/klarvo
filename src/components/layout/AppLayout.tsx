import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { cn } from "@/lib/utils";

// App version - update on releases
const APP_VERSION = "1.0.0";
const BUILD_DATE = "2026-01-31";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          "flex-1 transition-all duration-300",
          // Desktop: offset by sidebar
          "lg:pl-64",
          // Mobile: offset by header with safe area
          "pt-14 sm:pt-16 lg:pt-0"
        )}
      >
        {/* Reduced padding on mobile, larger on desktop */}
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer with version - smaller on mobile */}
      <footer className={cn(
        "border-t py-3 sm:py-4 text-center text-[10px] sm:text-xs text-muted-foreground",
        "lg:pl-64"
      )}>
        <div className="container mx-auto px-3 sm:px-4">
          Klarvo v{APP_VERSION} · Build {BUILD_DATE}
        </div>
      </footer>
    </div>
  );
}
