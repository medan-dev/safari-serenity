import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function StepBar({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4 mb-10">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2 sm:gap-4 flex-1">
            <div
              className={cn(
                "h-9 w-9 rounded-full grid place-items-center text-sm font-semibold border transition-smooth shrink-0",
                done && "bg-gradient-forest text-primary-foreground border-transparent shadow-elevated",
                active && "bg-gradient-gold text-[var(--accent-foreground)] border-transparent shadow-gold scale-110",
                !done && !active && "bg-card border-border text-muted-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-xs sm:text-sm font-medium hidden sm:inline",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && <div className="h-px bg-border flex-1" />}
          </li>
        );
      })}
    </ol>
  );
}