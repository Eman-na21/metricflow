import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, ShieldCheck, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingPlans } from "@/components/PricingPlans";
import { kpiByRange } from "@/data/mockData";
import { currency, number } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MetricFlow — Business Intelligence for SaaS Teams" },
      {
        name: "description",
        content:
          "Track revenue, subscriptions, conversion and campaign performance in one live MetricFlow workspace. Start a 7-day free trial.",
      },
      { property: "og:title", content: "MetricFlow — Business Intelligence for SaaS Teams" },
      {
        property: "og:description",
        content: "One workspace for revenue trends, subscriber health and channel attribution.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: BarChart3,
    title: "Revenue intelligence",
    body: "Recognized revenue, churned MRR and expansion tracked across every billing cycle.",
  },
  {
    icon: Workflow,
    title: "Channel attribution",
    body: "See which campaigns actually convert, from first touch to paid subscription.",
  },
  {
    icon: Zap,
    title: "Real-time cohorts",
    body: "Filter subscribers by status and plan instantly, with no query language required.",
  },
  {
    icon: ShieldCheck,
    title: "Governed by default",
    body: "Role-based access, audit trails and SSO on every Enterprise workspace.",
  },
];

function Landing() {
  const k = kpiByRange["30D"];

  return (
    <main>
      <section className="hero-glow relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
          <Badge variant="secondary" className="mb-6">
            New: campaign attribution across 5 channels
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            The analytics layer your <span className="brand-gradient-text">SaaS revenue</span> runs on
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            MetricFlow unifies billing, product and marketing data into one dashboard so your team
            can answer revenue questions in seconds — not sprints.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/pricing">
                Start 7-day free trial <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">View live dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="metrics" className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { label: "Revenue tracked / month", value: currency(k.revenue) },
            { label: "Active subscriptions", value: number(k.subs) },
            { label: "Average conversion rate", value: `${k.conversion}%` },
            { label: "Campaigns monitored", value: number(k.campaigns) },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Built for operators, not analysts</h2>
          <p className="mt-3 text-muted-foreground">
            Every surface in MetricFlow is designed for the daily revenue review: fast filters,
            clear deltas and exports your finance team can actually use.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <f.icon className="size-5" />
                </span>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription>{f.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Simple, scalable pricing</h2>
            <p className="mt-3 text-muted-foreground">
              Every plan starts with a 7-day free trial. No credit card required.
            </p>
          </div>
          <PricingPlans />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Card className="elevated">
          <CardContent className="flex flex-wrap items-center justify-between gap-6 p-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                See your numbers in the live dashboard
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore KPI cards, revenue trends and customer management with sample SaaS data.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Open dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
