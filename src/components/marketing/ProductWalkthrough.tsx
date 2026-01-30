import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pause, Play, Cpu, Shield, FileCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalkthroughStep } from "./WalkthroughStep";
import { prefersReducedMotion } from "@/lib/animations";

const STEPS = [
  {
    icon: Cpu,
    title: "Add Your AI Systems",
    description: "Use our guided wizard to document each AI system. Quick capture takes just 2-4 minutes per system.",
  },
  {
    icon: Shield,
    title: "Automatic Classification",
    description: "Our engine screens for prohibited practices, checks Annex III categories, and assigns risk levels automatically.",
  },
  {
    icon: FileCheck,
    title: "Close the Gaps",
    description: "Follow the auto-generated checklist. Upload evidence, assign owners, and track progress to compliance.",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Generate professional PDF reports and ZIP bundles. Ready for auditors, boards, or customers in one click.",
  },
];

const AUTO_ADVANCE_DELAY = 6000; // 6 seconds per step

interface ProductWalkthroughProps {
  className?: string;
}

export function ProductWalkthrough({ className }: ProductWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();

  // Intersection Observer to start animations when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isInView || isPaused || reducedMotion) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ADVANCE_DELAY);

    return () => clearInterval(timer);
  }, [isInView, isPaused, reducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView]);

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % STEPS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  }, []);

  const goToStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  const CurrentIcon = STEPS[currentStep].icon;

  return (
    <section
      ref={containerRef}
      className={cn("py-24 px-4 bg-surface-1", className)}
      aria-label="How It Works product walkthrough"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get from zero to compliant in four simple steps
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mockup Display */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -z-10" />
              
              {/* Step mockups */}
              {STEPS.map((_, index) => (
                <WalkthroughStep
                  key={index}
                  stepIndex={index}
                  isActive={currentStep === index}
                />
              ))}
            </div>
          </div>

          {/* Step Info & Controls */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Progress Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              {STEPS.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={cn(
                    "relative h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    currentStep === index
                      ? "w-8 bg-primary"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                  aria-current={currentStep === index ? "step" : undefined}
                >
                  {currentStep === index && !isPaused && !reducedMotion && (
                    <span 
                      className="absolute inset-0 bg-primary/50 rounded-full animate-ping"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div 
              className="text-center lg:text-left"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CurrentIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {STEPS[currentStep].title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                {STEPS[currentStep].description}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                aria-label="Previous step"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? "Play auto-advance" : "Pause auto-advance"}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Next step"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Step Quick Links */}
            <div className="hidden lg:flex flex-col gap-2">
              {STEPS.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200",
                      currentStep === index
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground"
                    )}
                  >
                    <StepIcon className={cn(
                      "h-4 w-4 flex-shrink-0",
                      currentStep === index ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
