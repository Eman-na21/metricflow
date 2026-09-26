import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { channelSeries, revenueSeries, type RangeKey } from "@/data/mockData";
import { currency } from "@/lib/format";

const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-popover-foreground)",
  fontSize: "12px",
};

const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

export function RevenueChart({ range }: { range: RangeKey }) {
  const data = revenueSeries[range];

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>
          Recognized revenue against churned MRR for the selected range.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height={320} debounce={50}>
            <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} tickFormatter={(v: number) => currency(v, true)} width={64} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, name: string) => [currency(value), name]}
                cursor={{ stroke: "var(--color-border)" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#revFill)"
                activeDot={{ r: 5 }}
              />
              <Area
                type="monotone"
                dataKey="churn"
                name="Churned MRR"
                stroke="var(--color-chart-5)"
                strokeWidth={2}
                fill="transparent"
                strokeDasharray="5 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChannelChart({ range }: { range: RangeKey }) {
  const data = channelSeries[range];

  return (
    <Card id="channels" className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Marketing Channels</CardTitle>
        <CardDescription>Signups and attributed revenue by acquisition channel.</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height={320} debounce={50}>
            <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="channel" {...axisProps} interval={0} angle={-12} dy={8} height={48} />
              <YAxis yAxisId="left" {...axisProps} width={48} />
              <YAxis
                yAxisId="right"
                orientation="right"
                {...axisProps}
                width={56}
                tickFormatter={(v: number) => currency(v, true)}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
                formatter={(value: number, name: string) =>
                  name === "Revenue" ? [currency(value), name] : [value, name]
                }
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                yAxisId="left"
                dataKey="signups"
                name="Signups"
                fill="var(--color-chart-1)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                name="Revenue"
                fill="var(--color-chart-2)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
