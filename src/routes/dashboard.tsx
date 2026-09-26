import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { ChannelChart, RevenueChart } from "@/components/dashboard/AnalyticsCharts";
import { CustomerTable } from "@/components/dashboard/CustomerTable";
import { RangeTabs } from "@/components/dashboard/RangeTabs";
import { useApp } from "@/lib/app-store";
import { channelSeries, kpiByRange, revenueSeries, type RangeKey } from "@/data/mockData";
import { currency } from "@/lib/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — MetricFlow" },
      {
        name: "description",
        content:
          "Live MetricFlow dashboard: revenue trends, active subscriptions, conversion rate, channel performance and customer management.",
      },
      { property: "og:title", content: "Analytics Dashboard — MetricFlow" },
      {
        property: "og:description",
        content: "KPI cards, revenue charts and customer management in one workspace.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, customers } = useApp();
  const [range, setRange] = useState<RangeKey>("30D");

  function exportOverview() {
    const k = kpiByRange[range];
    const lines = [
      `MetricFlow analytics report (${range})`,
      `Generated: ${new Date().toLocaleString()}`,
      `Workspace: ${user?.company ?? "Demo workspace"}`,
      "",
      `Total revenue: ${currency(k.revenue)} (${k.revenueDelta}%)`,
      `Active subscriptions: ${k.subs} (${k.subsDelta}%)`,
      `Conversion rate: ${k.conversion}% (${k.conversionDelta}%)`,
      `Active campaigns: ${k.campaigns} (${k.campaignsDelta}%)`,
      `Customer records: ${customers.length}`,
      "",
      "Revenue series",
      ...revenueSeries[range].map((p) => `${p.label}: ${currency(p.revenue)}`),
      "",
      "Channel performance",
      ...channelSeries[range].map((c) => `${c.channel}: ${c.signups} signups, ${currency(c.revenue)}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `metricflow-report-${range.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported", { description: `${range} analytics summary downloaded.` });
  }

  return (
    <div className="flex">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {user ? `Welcome back, ${user.name}` : "Welcome to MetricFlow"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {user
                  ? `Here's how ${user.company} performed over the last ${range === "1Y" ? "12 months" : range === "30D" ? "30 days" : "7 days"}.`
                  : "Sign in to personalize this workspace and save your customer records."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <RangeTabs value={range} onChange={setRange} />
              <Button variant="outline" onClick={exportOverview}>
                <Download className="size-4" /> Export Report
              </Button>
              {!user ? (
                <Button asChild>
                  <Link to="/signin">Sign in</Link>
                </Button>
              ) : null}
            </div>
          </header>

          <KpiCards range={range} />

          <div className="grid gap-6 lg:grid-cols-5">
            <RevenueChart range={range} />
            <ChannelChart range={range} />
          </div>

          <CustomerTable />

          <section id="settings" className="surface-panel rounded-xl p-6">
            <h2 className="text-lg font-semibold tracking-tight">Workspace settings</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Theme preference, session and customer records are stored locally in this browser, so
              your changes persist between visits.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
