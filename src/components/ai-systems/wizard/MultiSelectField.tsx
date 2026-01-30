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
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors",
              value.includes(option.value)
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => handleToggle(option.value)}
          >
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <Label className="cursor-pointer font-normal">{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
