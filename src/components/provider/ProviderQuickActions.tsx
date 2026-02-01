import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Shield, 
  Database, 
  FolderCheck, 
  ClipboardCheck, 
  Stamp,
  MapPin,
  Activity,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

const quickActions = [
  {
    title: "Technical Documentation",
    description: "Annex IV structured documentation",
    icon: FileText,
    href: "/provider-track/technical-docs",
    article: "Article 11"
  },
  {
    title: "Risk Management",
    description: "Risk register and mitigation",
    icon: Shield,
    href: "/provider-track/risk-management",
    article: "Article 9"
  },
  {
    title: "Data Governance",
    description: "Dataset registry and controls",
    icon: Database,
    href: "/provider-track/data-governance",
    article: "Article 10"
  },
  {
    title: "Quality Management",
    description: "QMS document library",
    icon: FolderCheck,
    href: "/provider-track/qms",
    article: "Article 17"
  },
  {
    title: "Conformity Assessment",
    description: "Assessment workflow",
    icon: ClipboardCheck,
    href: "/provider-track/conformity",
    article: "Article 43"
  },
  {
    title: "EU Declaration",
    description: "Declaration of Conformity",
    icon: Stamp,
    href: "/provider-track/declaration",
    article: "Annex V"
  },
  {
    title: "CE Marking",
    description: "Marking evidence",
    icon: MapPin,
    href: "/provider-track/ce-marking",
    article: "Article 48"
  },
  {
    title: "EU Registration",
    description: "Database registration",
    icon: Database,
    href: "/provider-track/registration",
    article: "Article 49"
  },
  {
    title: "Post-Market Monitoring",
    description: "Monitoring plan",
    icon: Activity,
    href: "/provider-track/monitoring",
    article: "Article 72"
  },
  {
    title: "Serious Incidents",
    description: "Incident reporting",
    icon: AlertTriangle,
    href: "/provider-track/serious-incidents",
    article: "Article 73"
  }
];

export function ProviderQuickActions() {
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Provider Obligations</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              to={action.href}
              className="group flex items-start gap-2.5 sm:gap-3 rounded-xl border p-2.5 sm:p-3 transition-colors hover:bg-accent active:bg-accent/80 min-h-[56px]"
            >
              <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 shrink-0">
                <action.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-0.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-medium text-xs sm:text-sm truncate">{action.title}</p>
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{action.description}</p>
                <p className="text-[10px] sm:text-xs text-primary">{action.article}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
