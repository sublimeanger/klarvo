import { MessageSquareQuote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OBJECTION_HANDLING } from "@/lib/billing-constants";

export function ObjectionCards() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Common Questions We Hear</h2>
        <p className="text-muted-foreground">
          Here's how we think about these concerns
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {OBJECTION_HANDLING.slice(0, 6).map((item, index) => (
          <Card
            key={index}
            className="relative overflow-hidden bg-surface-1 border-border/50 hover:border-primary/30 transition-colors group"
          >
            <CardContent className="p-5 sm:p-6">
              <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquareQuote className="h-12 w-12 text-primary" />
              </div>
              
              <p className="font-medium text-foreground mb-3 pr-8">
                {item.objection}
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.response}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
