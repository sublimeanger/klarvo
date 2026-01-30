import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Check, 
  Cpu, 
  Shield, 
  FileCheck, 
  Download,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Upload,
  User
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface WalkthroughStepProps {
  stepIndex: number;
  isActive: boolean;
}

// Step 1: Wizard Form Mockup
function WizardMockup({ isActive }: { isActive: boolean }) {
  const [visibleFields, setVisibleFields] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setVisibleFields(0);
      return;
    }
    
    const interval = setInterval(() => {
      setVisibleFields(prev => (prev < 4 ? prev + 1 : prev));
    }, 400);
    
    return () => clearInterval(interval);
  }, [isActive]);

  const fields = [
    { label: "AI System Name", value: "Customer Support Bot" },
    { label: "Department", value: "Customer Success" },
    { label: "Primary Owner", value: "Sarah Chen" },
    { label: "Deployment Region", value: "EU (Germany, France)" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Add AI System</span>
        <StatusBadge variant="info" size="sm">Step 1 of 20</StatusBadge>
      </div>
      
      {fields.map((field, index) => (
        <div
          key={field.label}
          className={cn(
            "transition-all duration-300",
            index < visibleFields 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-2"
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <label className="text-xs text-muted-foreground mb-1 block">
            {field.label}
          </label>
          <div className="bg-surface-2 border border-border rounded-md px-3 py-2 text-sm">
            {field.value}
          </div>
        </div>
      ))}
      
      <div className={cn(
        "pt-2 transition-all duration-300",
        visibleFields >= 4 ? "opacity-100" : "opacity-0"
      )}>
        <Progress value={20} className="h-1.5" />
        <p className="text-xs text-muted-foreground mt-1">20% complete</p>
      </div>
    </div>
  );
}

// Step 2: Classification Result Mockup
function ClassificationMockup({ isActive }: { isActive: boolean }) {
  const [showResult, setShowResult] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
  useEffect(() => {
    if (!isActive) {
      setShowResult(false);
      setShowCategories(false);
      return;
    }
    
    const timer1 = setTimeout(() => setShowResult(true), 300);
    const timer2 = setTimeout(() => setShowCategories(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Classification Result</span>
      </div>
      
      <div className={cn(
        "p-4 rounded-lg border-2 transition-all duration-500",
        showResult 
          ? "opacity-100 scale-100 border-risk-limited bg-risk-limited/5" 
          : "opacity-0 scale-95 border-border"
      )}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Risk Level</span>
          <StatusBadge variant="limited" size="lg">Limited Risk</StatusBadge>
        </div>
        <p className="text-xs text-muted-foreground">
          Transparency obligations apply under Article 50
        </p>
      </div>
      
      <div className={cn(
        "space-y-2 transition-all duration-500",
        showCategories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Screening Complete
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            No prohibited practices
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Not high-risk (Annex III)
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
            <AlertTriangle className="h-3 w-3" />
            Disclosure required
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Gap Checklist Mockup
function ChecklistMockup({ isActive }: { isActive: boolean }) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  
  useEffect(() => {
    if (!isActive) {
      setCheckedItems([]);
      return;
    }
    
    const items = [0, 1, 2];
    items.forEach((item, index) => {
      setTimeout(() => {
        setCheckedItems(prev => [...prev, item]);
      }, 500 + index * 600);
    });
  }, [isActive]);

  const gaps = [
    { label: "Upload transparency notice", owner: "Marketing" },
    { label: "Assign oversight owner", owner: "Legal" },
    { label: "Complete AI literacy training", owner: "All staff" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Gap Checklist</span>
        <StatusBadge variant="warning" size="sm">3 items</StatusBadge>
      </div>
      
      {gaps.map((gap, index) => (
        <div
          key={gap.label}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
            checkedItems.includes(index)
              ? "bg-success/5 border-success/30"
              : "bg-surface-2 border-border"
          )}
        >
          <div className={cn(
            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            checkedItems.includes(index)
              ? "bg-success border-success"
              : "border-muted-foreground/30"
          )}>
            {checkedItems.includes(index) && (
              <Check className="h-3 w-3 text-success-foreground animate-scale-in" />
            )}
          </div>
          <div className="flex-1">
            <p className={cn(
              "text-sm transition-all duration-300",
              checkedItems.includes(index) && "line-through text-muted-foreground"
            )}>
              {gap.label}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              {gap.owner}
            </p>
          </div>
          {checkedItems.includes(index) && (
            <Upload className="h-4 w-4 text-success animate-fade-in" />
          )}
        </div>
      ))}
      
      <div className="pt-2">
        <Progress 
          value={(checkedItems.length / gaps.length) * 100} 
          className="h-1.5"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {checkedItems.length} of {gaps.length} completed
        </p>
      </div>
    </div>
  );
}

// Step 4: Export Pack Mockup
function ExportMockup({ isActive }: { isActive: boolean }) {
  const [showDocs, setShowDocs] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  useEffect(() => {
    if (!isActive) {
      setShowDocs(false);
      setDownloading(false);
      return;
    }
    
    const timer1 = setTimeout(() => setShowDocs(true), 300);
    const timer2 = setTimeout(() => setDownloading(true), 1200);
    const timer3 = setTimeout(() => setDownloading(false), 2200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive]);

  const docs = [
    { name: "Classification_Memo.pdf", size: "24 KB" },
    { name: "Evidence_Pack.zip", size: "2.1 MB" },
    { name: "FRIA_Report.pdf", size: "156 KB" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Download className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Export Pack</span>
        <StatusBadge variant="success" size="sm">Ready</StatusBadge>
      </div>
      
      <div className="space-y-2">
        {docs.map((doc, index) => (
          <div
            key={doc.name}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border transition-all duration-300",
              showDocs ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.size}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
      
      <Button 
        className={cn(
          "w-full mt-4 transition-all duration-300",
          downloading && "animate-pulse"
        )}
        disabled={downloading}
      >
        {downloading ? (
          <>Generating...</>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </>
        )}
      </Button>
    </div>
  );
}

export function WalkthroughStep({ stepIndex, isActive }: WalkthroughStepProps) {
  const mockups = [
    <WizardMockup isActive={isActive} />,
    <ClassificationMockup isActive={isActive} />,
    <ChecklistMockup isActive={isActive} />,
    <ExportMockup isActive={isActive} />,
  ];

  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl min-h-[320px]",
        isActive ? "animate-fade-in" : "hidden"
      )}
    >
      {mockups[stepIndex]}
    </div>
  );
}
