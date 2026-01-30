import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { cn } from "@/lib/utils";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <MarketingLayout>
      <div className="section-padding bg-surface-1">
        <div className="container-narrow">
          <div className="mb-12">
            <h1 className="display-md mb-4">{title}</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
