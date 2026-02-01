import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS, type PlanId } from "@/lib/billing-constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type FeatureValue = boolean | string | number;

interface FeatureRow {
  feature: string;
  tooltip?: string;
  values: Record<PlanId, FeatureValue>;
}

interface FeatureCategory {
  name: string;
  features: FeatureRow[];
}

const COMPARISON_DATA: FeatureCategory[] = [
  {
    name: "Core",
    features: [
      {
        feature: "AI systems included",
        values: { free: 1, starter: 10, growth: 25, pro: 100, enterprise: "Unlimited" },
      },
      {
        feature: "Users",
        values: { free: "1", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
      },
      {
        feature: "Evidence storage",
        values: { free: "1 GB", starter: "50 GB", growth: "250 GB", pro: "1 TB", enterprise: "Custom" },
      },
      {
        feature: "Overage rate (per extra system)",
        values: { free: "-", starter: "€12/mo", growth: "€9/mo", pro: "€6/mo", enterprise: "Custom" },
      },
    ],
  },
  {
    name: "AI Inventory & Classification",
    features: [
      {
        feature: "AI system intake wizard",
        values: { free: true, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Classification memo + rationale",
        values: { free: true, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Prohibited practices screening",
        values: { free: true, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "High-risk screening (Annex III)",
        values: { free: true, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Transparency obligations check",
        values: { free: true, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Obligations checklist",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Classification version history",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Controls & Evidence",
    features: [
      {
        feature: "Control library (Article 26)",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Gap checklist per system",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Task plan with owners & dates",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Evidence vault",
        values: { free: "Basic", starter: "Full", growth: "Full", pro: "Full", enterprise: "Full" },
      },
      {
        feature: "Evidence approval workflows",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Policy version history",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Templates & Policies",
    features: [
      {
        feature: "AI acceptable use policy",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Human oversight plan template",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Transparency disclosure templates",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Vendor due diligence checklist",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Custom templates",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
    ],
  },
  {
    name: "Exports & Sharing",
    features: [
      {
        feature: "PDF exports",
        values: { free: "Watermarked", starter: "Clean", growth: "Clean", pro: "Clean", enterprise: "Branded" },
      },
      {
        feature: "ZIP evidence packs",
        values: { free: "Watermarked", starter: "Clean", growth: "Clean", pro: "Clean", enterprise: "Branded" },
      },
      {
        feature: "Auditor share links",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Advanced Compliance",
    features: [
      {
        feature: "FRIA workflow & reports",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
      {
        feature: "Incident register",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
      {
        feature: "Monitoring events",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
      {
        feature: "Change management triggers",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Dashboards & Reporting",
    features: [
      {
        feature: "Org-wide dashboards",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Readiness score",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Evidence expiry tracking",
        values: { free: false, starter: false, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Advanced analytics",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Integrations & API",
    features: [
      {
        feature: "Email reminders",
        values: { free: false, starter: true, growth: true, pro: true, enterprise: true },
      },
      {
        feature: "Jira/Asana sync",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
      {
        feature: "Evidence email ingestion",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
      {
        feature: "API access",
        values: { free: false, starter: false, growth: false, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: "Enterprise",
    features: [
      {
        feature: "Multi-workspace / subsidiaries",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
      {
        feature: "SSO (SAML/OIDC)",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
      {
        feature: "SCIM provisioning",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
      {
        feature: "Data residency options",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
      {
        feature: "Dedicated onboarding",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
      {
        feature: "SLA support",
        values: { free: false, starter: false, growth: false, pro: false, enterprise: true },
      },
    ],
  },
];

const PLAN_ORDER: PlanId[] = ["free", "starter", "growth", "pro", "enterprise"];

function renderValue(value: FeatureValue): React.ReactNode {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-success mx-auto" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />
    );
  }
  if (value === "-") {
    return <Minus className="h-4 w-4 text-muted-foreground/50 mx-auto" />;
  }
  return <span className="text-sm">{value}</span>;
}

export function PlanComparisonTable() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Compare All Features</h2>
        <p className="text-muted-foreground">See exactly what's included in each plan</p>
      </div>

      <div className="relative overflow-x-auto rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[280px] sticky left-0 bg-muted/50 z-10">Feature</TableHead>
              {PLAN_ORDER.map((planId) => (
                <TableHead key={planId} className="text-center min-w-[100px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{PLANS[planId].name}</span>
                    {PLANS[planId].popular && (
                      <Badge variant="default" className="text-[10px] px-1.5 py-0">
                        Popular
                      </Badge>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPARISON_DATA.map((category) => (
              <>
                <TableRow key={category.name} className="bg-muted/30">
                  <TableCell
                    colSpan={PLAN_ORDER.length + 1}
                    className="font-semibold text-sm py-2 sticky left-0 bg-muted/30 z-10"
                  >
                    {category.name}
                  </TableCell>
                </TableRow>
                {category.features.map((row, index) => (
                  <TableRow key={`${category.name}-${index}`}>
                    <TableCell className="sticky left-0 bg-background z-10 text-sm">
                      {row.feature}
                    </TableCell>
                    {PLAN_ORDER.map((planId) => (
                      <TableCell
                        key={planId}
                        className={cn(
                          "text-center",
                          PLANS[planId].popular && "bg-primary/5"
                        )}
                      >
                        {renderValue(row.values[planId])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
