import type { RangeKey } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ranges: RangeKey[] = ["7D", "30D", "1Y"];

export function RangeTabs({
  value,
  onChange,
}: {
  value: RangeKey;
  onChange: (range: RangeKey) => void;
}) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1" role="group" aria-label="Time range">
      {ranges.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onChange(r)}
          aria-pressed={value === r}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground",
            value === r && "bg-background text-foreground shadow-sm",
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
