import { Link } from "react-router-dom";
import { Rocket, Plus, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeCard() {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="py-8 sm:py-12">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Welcome to Klarvo!
          </h2>
          
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            Start your EU AI Act compliance journey by adding your first AI system. 
            Our guided wizard will help you classify it in under 10 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/ai-systems/new">
                <Plus className="mr-2 h-5 w-5" />
                Add Your First AI System
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link to="/docs/getting-started">
                <BookOpen className="mr-2 h-5 w-5" />
                Read the Guide
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-xs text-muted-foreground mb-3">Quick start checklist:</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link 
                to="/ai-systems/new" 
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Add AI system <ArrowRight className="h-3 w-3" />
              </Link>
              <Link 
                to="/vendors" 
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Add vendors <ArrowRight className="h-3 w-3" />
              </Link>
              <Link 
                to="/policies" 
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Set up policies <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
