import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Service } from "@/lib/billing-constants";

interface ServiceCardProps {
  service: Service;
  onContact?: () => void;
}

export function ServiceCard({ service, onContact }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-lg">{service.name}</CardTitle>
            <CardDescription className="mt-1">{service.description}</CardDescription>
          </div>
          <span className="text-lg font-semibold whitespace-nowrap shrink-0">{service.price}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-1 flex-1">
          {service.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        {onContact && (
          <Button variant="outline" size="sm" className="mt-4" onClick={onContact}>
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
