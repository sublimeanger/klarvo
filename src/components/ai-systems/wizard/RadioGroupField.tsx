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
    <div className={cn("space-y-2 sm:space-y-3", className)}>
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
          <div
            key={option.value}
            className={cn(
              "flex items-start space-x-2 sm:space-x-3 rounded-lg border p-2 sm:p-3 cursor-pointer transition-colors",
              value === option.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onChange(option.value)}
          >
            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
            <div className="space-y-1">
              <Label htmlFor={option.value} className="cursor-pointer font-normal">
                {option.label}
              </Label>
              {option.description && (
                <p className="text-xs text-muted-foreground">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>

      {helpText && (
        <p className="text-xs text-muted-foreground italic">{helpText}</p>
      )}
    </div>
  );
}
