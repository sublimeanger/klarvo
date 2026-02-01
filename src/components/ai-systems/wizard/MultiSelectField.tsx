import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectFieldProps {
  label: string;
  description?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function MultiSelectField({
  label,
  description,
  options,
  value,
  onChange,
  className,
}: MultiSelectFieldProps) {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Label className="text-sm font-medium leading-relaxed">{label}</Label>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 sm:p-3.5 text-left transition-all tap-target",
              "hover:border-primary/50 active:scale-[0.98]",
              value.includes(option.value)
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border"
            )}
            onClick={() => handleToggle(option.value)}
          >
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              className="shrink-0 h-5 w-5"
            />
            <Label className="cursor-pointer font-normal text-sm leading-tight">
              {option.label}
            </Label>
          </button>
        ))}
      </div>
    </div>
  );
}
