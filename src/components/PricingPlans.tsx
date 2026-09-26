import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/mockData";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export function PricingPlans() {
  const { startTrial, trialActive, trialPlan } = useApp();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "relative flex flex-col transition-transform duration-300 hover:-translate-y-1",
            plan.highlight && "border-primary elevated",
          )}
        >
          {plan.highlight ? (
            <Badge className="absolute -top-3 left-6">Most popular</Badge>
          ) : null}
          <CardHeader>
            <CardTitle className="text-lg">{plan.name}</CardTitle>
            <CardDescription>{plan.tagline}</CardDescription>
            <div className="pt-3">
              <span className="text-4xl font-semibold tracking-tight">${plan.price}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-6">
            <ul className="space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={plan.highlight ? "default" : "outline"}
              onClick={() => {
                startTrial(plan.name);
                toast.success(`7-day ${plan.name} trial started`, {
                  description: "No card required. Upgrade any time from the banner.",
                });
              }}
            >
              <Sparkles className="size-4" />
              {trialActive && trialPlan === plan.name ? "Trial active" : "Start 7-Day Free Trial"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
