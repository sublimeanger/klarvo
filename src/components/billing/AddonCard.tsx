import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Addon } from "@/lib/billing-constants";

interface AddonCardProps {
  addon: Addon;
  onAdd?: () => void;
}

export function AddonCard({ addon, onAdd }: AddonCardProps) {
  return (
    <Card className="flex flex-col rounded-xl">
      <CardHeader className="pb-2 p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg">{addon.name}</CardTitle>
        <CardDescription className="min-h-[48px] sm:min-h-[60px] text-xs sm:text-sm">{addon.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end p-3 sm:p-6 pt-0 sm:pt-0">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-lg sm:text-xl font-semibold">€{addon.priceMonthly}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
            {addon.priceDetails && (
              <p className="text-[10px] sm:text-xs text-muted-foreground">{addon.priceDetails}</p>
            )}
          </div>
          {onAdd && (
            <Button variant="outline" size="sm" onClick={onAdd} className="h-10 px-4">
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
