import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Addon } from "@/lib/billing-constants";

interface AddonCardProps {
  addon: Addon;
  onAdd?: () => void;
}

export function AddonCard({ addon, onAdd }: AddonCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{addon.name}</CardTitle>
        <CardDescription className="min-h-[60px]">{addon.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold">€{addon.priceMonthly}</span>
            <span className="text-muted-foreground">/mo</span>
            {addon.priceDetails && (
              <p className="text-xs text-muted-foreground">{addon.priceDetails}</p>
            )}
          </div>
          {onAdd && (
            <Button variant="outline" size="sm" onClick={onAdd}>
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
