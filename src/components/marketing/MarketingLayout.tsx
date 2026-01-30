import { Outlet } from "react-router-dom";
import { MarketingHeader } from "./MarketingHeader";
import { MarketingFooter } from "./MarketingFooter";
import { SkipToContent } from "@/components/ui/SkipToContent";

interface MarketingLayoutProps {
  children?: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <MarketingHeader />
      <main id="main-content" className="flex-1 pt-16 md:pt-20" tabIndex={-1}>
        {children || <Outlet />}
      </main>
      <MarketingFooter />
    </div>
  );
}
