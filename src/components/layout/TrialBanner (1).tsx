import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/app-store";
import { toast } from "sonner";

export function TrialBanner() {
  const { trialActive, trialPlan, endTrial } = useApp();
  const [open, setOpen] = useState(false);

  if (!trialActive) return null;

  return (
    <>
      <div className="w-full bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-sm sm:px-6">
          
          <span>
            Your 7-day free trial is active. Upgrade to Pro for unlimited access.
            {trialPlan ? ` (Current trial: ${trialPlan})` : ""}
          </span>
          <Button
            size="sm"
            variant="secondary"
            className="h-7"
            onClick={() => setOpen(true)}
          >
            Upgrade Now
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to MetricFlow Pro</DialogTitle>
            <DialogDescription>
              Unlimited data sources, 25 seats, 12-month retention and priority support for
              $249/month. Your remaining trial days are credited to the first invoice.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Unlimited dashboards and saved views</li>
            <li>• Automated weekly revenue digests</li>
            <li>• Campaign attribution across all channels</li>
          </ul>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Stay on trial
            </Button>
            <Button
              onClick={() => {
                endTrial();
                setOpen(false);
                toast.success("Upgraded to Pro", {
                  description: "Your workspace now has unlimited access.",
                });
              }}
            >
              Confirm upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
