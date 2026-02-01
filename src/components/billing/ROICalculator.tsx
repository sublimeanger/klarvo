import { useState, useMemo } from "react";
import { Calculator, Clock, Coins, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Estimated time savings per AI system per month when using the platform
const HOURS_SAVED_PER_SYSTEM = 4;
// Average hourly rate for compliance/ops work (EUR)
const HOURLY_RATE = 75;
// Estimated consultancy cost per system for initial compliance setup
const CONSULTANCY_COST_PER_SYSTEM = 2500;

export function ROICalculator() {
  const [aiSystems, setAiSystems] = useState(5);
  const [currentHoursPerMonth, setCurrentHoursPerMonth] = useState(20);

  const calculations = useMemo(() => {
    // Time savings
    const hoursSavedPerMonth = Math.min(
      currentHoursPerMonth,
      aiSystems * HOURS_SAVED_PER_SYSTEM
    );
    const hoursSavedPerYear = hoursSavedPerMonth * 12;
    
    // Cost savings vs manual work
    const annualTimeSavings = hoursSavedPerYear * HOURLY_RATE;
    
    // Cost comparison vs consultancy
    const consultancyCost = aiSystems * CONSULTANCY_COST_PER_SYSTEM;
    
    // Estimated platform cost (using Growth pricing as reference)
    const platformAnnualCost = 3490; // Growth annual
    
    // Net savings
    const netSavingsVsConsultancy = consultancyCost - platformAnnualCost;
    
    // Payback period in months
    const monthlySavings = annualTimeSavings / 12;
    const monthlyPlatformCost = platformAnnualCost / 12;
    const paybackMonths = monthlySavings > 0 
      ? Math.ceil(monthlyPlatformCost / (monthlySavings / 12 + (consultancyCost / 12)))
      : 12;

    return {
      hoursSavedPerMonth,
      hoursSavedPerYear,
      annualTimeSavings,
      consultancyCost,
      platformAnnualCost,
      netSavingsVsConsultancy,
      paybackMonths: Math.min(paybackMonths, 12),
    };
  }, [aiSystems, currentHoursPerMonth]);

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-surface-1 to-background border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Value Estimator</CardTitle>
            <p className="text-sm text-muted-foreground">
              See potential time and cost savings
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Sliders */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">AI systems to track</label>
              <Badge variant="secondary" className="font-mono">
                {aiSystems}
              </Badge>
            </div>
            <Slider
              value={[aiSystems]}
              onValueChange={([value]) => setAiSystems(value)}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Tools, features, or use-cases that need classification
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Current compliance hours/month</label>
              <Badge variant="secondary" className="font-mono">
                {currentHoursPerMonth}h
              </Badge>
            </div>
            <Slider
              value={[currentHoursPerMonth]}
              onValueChange={([value]) => setCurrentHoursPerMonth(value)}
              min={5}
              max={80}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Time spent on AI governance, documentation, audits
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl bg-background border border-border/50 text-center group hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
              {calculations.hoursSavedPerYear}h
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              hours saved per year
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background border border-border/50 text-center group hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
              €{calculations.annualTimeSavings.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              estimated annual savings
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background border border-border/50 text-center group hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
              €{calculations.netSavingsVsConsultancy.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              saved vs. consultancy setup
            </p>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Estimates based on {HOURS_SAVED_PER_SYSTEM}h saved per system/month at €{HOURLY_RATE}/hr 
          and €{CONSULTANCY_COST_PER_SYSTEM.toLocaleString()} typical consultancy cost per system. 
          Your actual results may vary.
        </p>
      </CardContent>
    </Card>
  );
}
