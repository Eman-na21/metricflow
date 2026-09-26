import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </span>
            <span className="font-semibold tracking-tight">MetricFlow</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Revenue, retention and campaign intelligence for modern SaaS teams.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h3 className="font-medium">Product</h3>
          <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link to="/pricing" className="block text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link to="/signin" className="block text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <h3 className="font-medium">Platform</h3>
          <Link
            to="/"
            hash="features"
            className="block text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            to="/"
            hash="metrics"
            className="block text-muted-foreground hover:text-foreground"
          >
            Live metrics
          </Link>
          <Link
            to="/pricing"
            hash="faq"
            className="block text-muted-foreground hover:text-foreground"
          >
            FAQ
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <h3 className="font-medium">Trial</h3>
          <p className="text-muted-foreground">
            7 days free on every plan. No card required, cancel any time.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MetricFlow Analytics. All rights reserved.
      </div>
    </footer>
  );
}
