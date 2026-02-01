import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupFieldProps {
  label: string;
  description?: string;
  helpText?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  layout?: "vertical" | "horizontal";
}

export function RadioGroupField({
  label,
  description,
  helpText,
  options,
  value,
  onChange,
  className,
  layout = "vertical",
}: RadioGroupFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Label className="text-sm font-medium leading-relaxed">{label}</Label>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={cn(
          layout === "horizontal" ? "flex flex-wrap gap-2 sm:gap-4" : "space-y-2"
        )}
      >
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-3 sm:p-3.5 text-left transition-all tap-target w-full",
              "hover:border-primary/50 active:scale-[0.99]",
              value === option.value
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border"
            )}
            onClick={() => onChange(option.value)}
          >
            <RadioGroupItem 
              value={option.value} 
              id={option.value} 
              className="mt-0.5 h-5 w-5 shrink-0" 
            />
            <div className="space-y-0.5 min-w-0">
              <Label htmlFor={option.value} className="cursor-pointer font-normal text-sm leading-tight block">
                {option.label}
              </Label>
              {option.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{option.description}</p>
              )}
            </div>
          </button>
        ))}
      </RadioGroup>

      {helpText && (
        <p className="text-xs text-muted-foreground italic">{helpText}</p>
      )}
    </div>
  );
}
