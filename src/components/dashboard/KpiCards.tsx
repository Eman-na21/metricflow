import { TrendingDown, TrendingUp, DollarSign, Users, Target, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currency, number, percent } from "@/lib/format";
import { kpiByRange, type RangeKey } from "@/data/mockData";

export function KpiCards({ range }: { range: RangeKey }) {
  const k = kpiByRange[range];

  const cards = [
    {
      label: "Total Revenue",
      value: currency(k.revenue),
      delta: k.revenueDelta,
      icon: DollarSign,
    },
    {
      label: "Active Subscriptions",
      value: number(k.subs),
      delta: k.subsDelta,
      icon: Users,
    },
    {
      label: "Conversion Rate",
      value: `${k.conversion.toFixed(1)}%`,
      delta: k.conversionDelta,
      icon: Target,
    },
    {
      label: "Active Campaigns",
      value: number(k.campaigns),
      delta: k.campaignsDelta,
      icon: Megaphone,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const up = card.delta >= 0;
        const Trend = up ? TrendingUp : TrendingDown;
        return (
          <Card
            key={card.label}
            className="group transition-all duration-300 hover:-translate-y-0.5 hover:elevated"
          >
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <card.icon className="size-4" />
                </span>
              </div>
              <div className="text-2xl font-semibold tracking-tight">{card.value}</div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  up ? "text-success" : "text-destructive",
                )}
              >
                <Trend className="size-3.5" />
                {percent(card.delta)}
                <span className="text-muted-foreground">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
