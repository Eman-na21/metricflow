import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Megaphone,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard" as const, hash: "", active: true },
  { label: "Customers", icon: Users, to: "/dashboard" as const, hash: "customers" },
  { label: "Campaigns", icon: Megaphone, to: "/dashboard" as const, hash: "channels" },
  { label: "Billing", icon: CreditCard, to: "/pricing" as const, hash: "" },
  { label: "Settings", icon: Settings, to: "/dashboard" as const, hash: "settings" },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="rounded-xl border border-sidebar-border bg-background p-4 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <LifeBuoy className="size-4 text-primary" /> Need a hand?
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Our analytics engineers help you model your first cohort report.
          </p>
        </div>
      </div>
    </aside>
  );
}
