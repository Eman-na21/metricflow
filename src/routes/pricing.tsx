import { createFileRoute } from "@tanstack/react-router";
import { PricingPlans } from "@/components/PricingPlans";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & 7-Day Free Trial — MetricFlow" },
      {
        name: "description",
        content:
          "Compare MetricFlow Starter, Pro and Enterprise plans. Every plan includes a 7-day free trial with no credit card required.",
      },
      { property: "og:title", content: "Pricing & 7-Day Free Trial — MetricFlow" },
      {
        property: "og:description",
        content: "Starter, Pro and Enterprise analytics plans with a 7-day free trial.",
      },
    ],
  }),
  component: Pricing,
});

const faqs = [
  {
    q: "What happens after the 7-day trial?",
    a: "Your workspace stays available in read-only mode until you pick a plan. Nothing is charged automatically and no card is required to start.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrades apply immediately with prorated billing, and downgrades take effect at the end of the current cycle.",
  },
  {
    q: "Do you support data exports?",
    a: "Every plan can export filtered customer and revenue reports as CSV directly from the dashboard.",
  },
  {
    q: "Is SSO available?",
    a: "SSO, SCIM provisioning and audit logs are included on the Enterprise plan.",
  },
];

function Pricing() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Pricing that scales with revenue</h1>
        <p className="mt-4 text-muted-foreground">
          Start on any plan with a 7-day free trial. Upgrade, downgrade or cancel whenever your
          reporting needs change.
        </p>
      </div>

      <div className="mt-12">
        <PricingPlans />
      </div>

      <section id="faq" className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
