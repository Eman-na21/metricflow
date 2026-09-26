export type CustomerStatus = "Active" | "Pending" | "Cancelled";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: CustomerStatus;
  mrr: number;
  joined: string;
};

export type RangeKey = "7D" | "30D" | "1Y";

export const revenueSeries: Record<RangeKey, { label: string; revenue: number; churn: number }[]> = {
  "7D": [
    { label: "Mon", revenue: 18420, churn: 1210 },
    { label: "Tue", revenue: 19980, churn: 980 },
    { label: "Wed", revenue: 21740, churn: 1340 },
    { label: "Thu", revenue: 20510, churn: 1105 },
    { label: "Fri", revenue: 24880, churn: 1420 },
    { label: "Sat", revenue: 17260, churn: 860 },
    { label: "Sun", revenue: 16140, churn: 790 },
  ],
  "30D": [
    { label: "Week 1", revenue: 128400, churn: 7300 },
    { label: "Week 2", revenue: 141250, churn: 6980 },
    { label: "Week 3", revenue: 137900, churn: 8210 },
    { label: "Week 4", revenue: 158630, churn: 7640 },
  ],
  "1Y": [
    { label: "Jan", revenue: 412000, churn: 28400 },
    { label: "Feb", revenue: 438500, churn: 26100 },
    { label: "Mar", revenue: 465200, churn: 30500 },
    { label: "Apr", revenue: 451800, churn: 29800 },
    { label: "May", revenue: 502300, churn: 27400 },
    { label: "Jun", revenue: 534700, churn: 31200 },
    { label: "Jul", revenue: 561900, churn: 29900 },
    { label: "Aug", revenue: 548200, churn: 33100 },
    { label: "Sep", revenue: 597400, churn: 30200 },
    { label: "Oct", revenue: 624100, churn: 28800 },
    { label: "Nov", revenue: 681500, churn: 32600 },
    { label: "Dec", revenue: 742900, churn: 31400 },
  ],
};

export const channelSeries: Record<RangeKey, { channel: string; signups: number; revenue: number }[]> = {
  "7D": [
    { channel: "Organic", signups: 184, revenue: 21400 },
    { channel: "Paid Search", signups: 142, revenue: 18950 },
    { channel: "Email", signups: 98, revenue: 11240 },
    { channel: "Referral", signups: 76, revenue: 9840 },
    { channel: "Social", signups: 63, revenue: 6120 },
  ],
  "30D": [
    { channel: "Organic", signups: 812, revenue: 96400 },
    { channel: "Paid Search", signups: 634, revenue: 81250 },
    { channel: "Email", signups: 421, revenue: 48900 },
    { channel: "Referral", signups: 318, revenue: 41600 },
    { channel: "Social", signups: 264, revenue: 27350 },
  ],
  "1Y": [
    { channel: "Organic", signups: 9840, revenue: 1184000 },
    { channel: "Paid Search", signups: 7420, revenue: 962500 },
    { channel: "Email", signups: 5130, revenue: 578400 },
    { channel: "Referral", signups: 3860, revenue: 502100 },
    { channel: "Social", signups: 3140, revenue: 331700 },
  ],
};

export const kpiByRange: Record<
  RangeKey,
  { revenue: number; revenueDelta: number; subs: number; subsDelta: number; conversion: number; conversionDelta: number; campaigns: number; campaignsDelta: number }
> = {
  "7D": { revenue: 138930, revenueDelta: 6.4, subs: 4128, subsDelta: 2.1, conversion: 3.9, conversionDelta: 0.4, campaigns: 12, campaignsDelta: 9.1 },
  "30D": { revenue: 566180, revenueDelta: 12.8, subs: 4312, subsDelta: 5.7, conversion: 4.2, conversionDelta: 0.8, campaigns: 18, campaignsDelta: 12.5 },
  "1Y": { revenue: 6560500, revenueDelta: 34.2, subs: 4890, subsDelta: 28.4, conversion: 4.6, conversionDelta: -0.3, campaigns: 46, campaignsDelta: 21.7 },
};

export const initialCustomers: Customer[] = [
  
  { id: "c-1012", name: "Eman seid", email: "emans@gmail.com", company: "Eman thech solution", plan: "Starter", status: "Pending", mrr: 49, joined: "2026-05-12" },
 
];

export const plans = [
  {
    name: "Starter",
    price: 49,
    tagline: "For small teams shipping their first dashboards.",
    features: ["Up to 5 data sources", "3 team seats", "30-day data retention", "Email support"],
    highlight: false,
  },
  {
    name: "Pro",
    price: 249,
    tagline: "For growth teams that live in analytics all day.",
    features: ["Unlimited data sources", "25 team seats", "12-month retention", "Custom dashboards", "Priority support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 1290,
    tagline: "For organizations with governance and scale needs.",
    features: ["Unlimited everything", "SSO & SCIM", "Audit logs & SLAs", "Dedicated success manager"],
    highlight: false,
  },
] as const;
