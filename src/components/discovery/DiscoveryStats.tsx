import { Bot, CheckCircle, Clock, XCircle, Plus } from "lucide-react";
import { useDiscoveryStats } from "@/hooks/useDiscovery";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryStats() {
  const { data: stats, isLoading } = useDiscoveryStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-card border">
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const items = [
    {
      label: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Reviewed",
      value: stats.reviewed,
      icon: CheckCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Added to Inventory",
      value: stats.added,
      icon: Plus,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Dismissed",
      value: stats.dismissed,
      icon: XCircle,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="p-4 rounded-xl bg-card border">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
