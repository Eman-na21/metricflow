import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Customer, CustomerStatus } from "@/data/mockData";

type Draft = Omit<Customer, "id">;

const empty: Draft = {
  name: "",
  email: "",
  company: "",
  plan: "Starter",
  status: "Pending",
  mrr: 49,
  joined: new Date().toISOString().slice(0, 10),
};

export function CustomerDialog({
  open,
  onOpenChange,
  customer,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
  onSubmit: (draft: Draft) => void;
}) {
  const [draft, setDraft] = useState<Draft>(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (customer) {
      const { id: _id, ...rest } = customer;
      setDraft(rest);
    } else {
      setDraft({ ...empty, joined: new Date().toISOString().slice(0, 10) });
    }
  }, [open, customer]);

  function handleSave() {
    if (!draft.name.trim() || !draft.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(draft.email)) {
      setError("Enter a valid email address.");
      return;
    }
    onSubmit({ ...draft, name: draft.name.trim(), email: draft.email.trim() });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit customer" : "Add customer"}</DialogTitle>
          <DialogDescription>
            {customer
              ? "Update subscriber details and billing status."
              : "Create a new subscriber record in your workspace."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Jordan Avery"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              placeholder="jordan@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={draft.company}
              onChange={(e) => setDraft({ ...draft, company: e.target.value })}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label>Plan</Label>
            <Select
              value={draft.plan}
              onValueChange={(plan) => setDraft({ ...draft, plan: plan as Customer["plan"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={draft.status}
              onValueChange={(status) => setDraft({ ...draft, status: status as CustomerStatus })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mrr">Monthly revenue (USD)</Label>
            <Input
              id="mrr"
              type="number"
              min={0}
              value={draft.mrr}
              onChange={(e) => setDraft({ ...draft, mrr: Number(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joined">Joined</Label>
            <Input
              id="joined"
              type="date"
              value={draft.joined}
              onChange={(e) => setDraft({ ...draft, joined: e.target.value })}
            />
          </div>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{customer ? "Save changes" : "Add customer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
