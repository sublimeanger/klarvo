import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/-/g, " ");
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1) || "Page";

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight capitalize">{formattedName}</h1>
        <p className="text-muted-foreground">
          This module is coming soon
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Under Construction</h2>
          <p className="text-muted-foreground text-center max-w-md">
            The {formattedName.toLowerCase()} module is being built. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
