import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AINode {
  id: string;
  name: string;
  risk: "minimal" | "limited" | "high" | "prohibited";
  x: number;
  y: number;
  delay: number;
}

const nodes: AINode[] = [
  { id: "1", name: "Customer Chatbot", risk: "limited", x: 15, y: 25, delay: 0 },
  { id: "2", name: "CV Screening Tool", risk: "high", x: 75, y: 20, delay: 0.3 },
  { id: "3", name: "Fraud Detection", risk: "high", x: 25, y: 65, delay: 0.6 },
  { id: "4", name: "Content Generator", risk: "minimal", x: 80, y: 70, delay: 0.9 },
  { id: "5", name: "Analytics Dashboard", risk: "minimal", x: 50, y: 45, delay: 0.2 },
];

const riskConfig = {
  minimal: {
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    icon: CheckCircle,
    label: "Minimal Risk",
  },
  limited: {
    color: "bg-amber-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    icon: AlertTriangle,
    label: "Limited Risk",
  },
  high: {
    color: "bg-orange-500",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    icon: Shield,
    label: "High Risk",
  },
  prohibited: {
    color: "bg-red-500",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    icon: XCircle,
    label: "Prohibited",
  },
};

function NodeCard({ node, isVisible }: { node: AINode; isVisible: boolean }) {
  const config = riskConfig[node.risk];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transitionDelay: `${node.delay}s`,
      }}
    >
      {/* Connection lines (decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-20">
          <circle
            cx="50%"
            cy="50%"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
        </svg>
      </div>

      {/* Card */}
      <div
        className={cn(
          "relative px-4 py-3 rounded-xl border-2 shadow-lg backdrop-blur-sm bg-white/90",
          config.borderColor,
          "hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
        )}
      >
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-px rounded-xl opacity-0 hover:opacity-100 transition-opacity blur-sm -z-10",
            config.color
          )}
        />

        <div className="flex items-center gap-2.5">
          <div className={cn("p-1.5 rounded-lg", config.bgColor)}>
            <Icon className={cn("h-4 w-4", config.textColor)} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground whitespace-nowrap">
              {node.name}
            </p>
            <p className={cn("text-xs font-medium", config.textColor)}>
              {config.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AIClassificationViz() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="heroGrid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" className="fill-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Decorative connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(161, 94%, 30%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(161, 94%, 30%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(161, 94%, 30%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Connection paths */}
        <path
          d="M 15% 25% Q 35% 35% 50% 45%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "0.5s" }}
        />
        <path
          d="M 75% 20% Q 60% 30% 50% 45%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "0.7s" }}
        />
        <path
          d="M 25% 65% Q 35% 55% 50% 45%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "0.9s" }}
        />
        <path
          d="M 80% 70% Q 65% 60% 50% 45%"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "1.1s" }}
        />
      </svg>

      {/* Center hub */}
      <div
        className={cn(
          "absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transition-all duration-700",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )}
      >
        {/* Pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        </div>

        {/* Center icon */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 flex items-center justify-center">
          <Shield className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* AI System nodes */}
      {nodes.map((node) => (
        <NodeCard key={node.id} node={node} isVisible={isVisible} />
      ))}

      {/* Floating particles (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
