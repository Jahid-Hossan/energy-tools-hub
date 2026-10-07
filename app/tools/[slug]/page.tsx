import {
  BatteryCalculatorContent,
  type BatteryCalculatorSlug,
} from "@/components/BatteryCalculatorContent";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CalculatorClient } from "@/components/CalculatorClient";
import {
  ElectricalCalculatorContent,
  type ElectricalCalculatorSlug,
} from "@/components/ElectricalCalculatorContent";
import {
  GeneratorCalculatorContent,
  type GeneratorCalculatorSlug,
} from "@/components/GeneratorCalculatorContent";
import { Header } from "@/components/Header";
import { WattsToAmpsContent } from "@/components/WattsToAmpsContent";
import { siteConfig } from "@/lib/site";
import { getCategory, getTool, tools } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WebApplicationJsonLd } from "@/components/WebApplicationJsonLd";
import { FAQPageJsonLd } from "@/components/FAQPageJsonLd";

const electricalSeo: Record<string, { title: string; description: string }> = {
  "watts-to-amps-calculator": {
    title: "Watts to Amps Calculator - Free Online Calculator",
    description:
      "Convert watts to amps for DC and AC systems. Calculate instantly with our free tool.",
  },
  "amps-to-watts-calculator": {
    title: "Amps to Watts Calculator - Free Online Calculator",
    description:
      "Convert amps to watts for DC and AC systems. Calculate instantly with our free tool.",
  },
  "volts-amps-watts-calculator": {
    title: "Volts, Amps & Watts Calculator - Free Online Calculator",
    description:
      "Solve for volts, amps, or watts in DC and AC systems. Calculate instantly with our free tool.",
  },
  "appliance-wattage-calculator": {
    title: "Appliance Wattage Calculator - Free Online Calculator",
    description:
      "Estimate appliance wattage for home backup or off-grid sizing. Calculate instantly with our free tool.",
  },
  "kwh-calculator": {
    title: "kWh Calculator - Free Online Calculator",
    description:
      "Calculate daily and period energy use in kWh. Calculate instantly with our free tool.",
  },
  "electricity-cost-calculator": {
    title: "Electricity Cost Calculator - Free Online Calculator",
    description:
      "Estimate electricity cost based on your energy use and rate. Calculate instantly with our free tool.",
  },
};
const batterySeo: Record<string, { title: string; description: string }> = {
  "battery-runtime-calculator": {
    title: "Battery Runtime Calculator - Free Online Calculator",
    description:
      "Estimate battery backup time from capacity and load. Calculate instantly with our free tool.",
  },
  "battery-capacity-calculator": {
    title: "Battery Capacity Calculator - Free Online Calculator",
    description:
      "Find the right battery amp-hours for your load and runtime. Calculate instantly with our free tool.",
  },
  "ah-to-wh-calculator": {
    title: "Ah to Wh Calculator - Free Online Calculator",
    description:
      "Convert battery amp-hours to nominal watt-hours. Calculate instantly with our free tool.",
  },
  "wh-to-ah-calculator": {
    title: "Wh to Ah Calculator - Free Online Calculator",
    description:
      "Convert battery watt-hours to amp-hours at a specific voltage. Calculate instantly with our free tool.",
  },
  "battery-charging-time-calculator": {
    title: "Battery Charge Time Calculator - Free Online Calculator",
    description:
      "Estimate charging time based on battery and charger specs. Calculate instantly with our free tool.",
  },
};
const generatorSeo: Record<string, { title: string; description: string }> = {
  "generator-size-calculator": {
    title: "Generator Size Calculator - Free Online Calculator",
    description:
      "Find the right generator size for your running and starting loads. Calculate instantly with our free tool.",
  },
  "generator-wattage-calculator": {
    title: "Generator Wattage Calculator - Free Online Calculator",
    description:
      "Compare generator running and starting wattage against loads. Calculate instantly with our free tool.",
  },
  "generator-runtime-calculator": {
    title: "Generator Runtime Calculator - Free Online Calculator",
    description:
      "Estimate generator runtime based on fuel capacity and load. Calculate instantly with our free tool.",
  },
  "generator-fuel-consumption-calculator": {
    title: "Generator Fuel Calculator - Free Online Calculator",
    description:
      "Estimate generator fuel consumption for a given runtime. Calculate instantly with our free tool.",
  },
};

function isElectricalContentSlug(
  slug: string,
): slug is ElectricalCalculatorSlug {
  return slug in electricalSeo;
}
function isBatteryContentSlug(slug: string): slug is BatteryCalculatorSlug {
  return slug in batterySeo;
}
function isGeneratorContentSlug(slug: string): slug is GeneratorCalculatorSlug {
  return slug in generatorSeo;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  const seo = electricalSeo[slug] ?? batterySeo[slug] ?? generatorSeo[slug];
  return tool
    ? seo
      ? {
          title: seo.title,
          description: seo.description,
          alternates: {
            canonical: `${siteConfig.url}/tools/${tool.slug}`,
          },
          openGraph: {
            title: seo.title,
            description: seo.description,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            type: "website",
          },
        }
      : {
          title: tool.name,
          description: `${tool.description} Free online calculator with transparent assumptions.`,
          alternates: { canonical: `/tools/${tool.slug}` },
        }
    : {};
}
export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <div className="site-grid min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          {
            name: getCategory(tool.category)?.name ?? tool.category,
            path: getCategory(tool.category)?.path ?? "/tools",
          },
          { name: tool.name, path: `/tools/${tool.slug}` },
        ]}
      />
      <WebApplicationJsonLd
        name={tool.name}
        description={tool.description}
        url={`${siteConfig.url}/tools/${tool.slug}`}
      />
      <FAQPageJsonLd
        faqs={[
          {
            question: "Is this calculator free?",
            answer: "Yes, it is completely free to use.",
          },
          { question: "Do I need to sign up?", answer: "No sign up is required." },
          {
            question: "How accurate is this calculator?",
            answer: "It provides estimates based on standard electrical formulas.",
          },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <nav className="mb-8 text-sm text-[var(--ink-muted)]">
          <Link href="/">Home</Link> <span className="mx-2">/</span>{" "}
          <Link href={getCategory(tool.category)?.path ?? "/tools"}>
            {getCategory(tool.category)?.name ?? tool.category}
          </Link>{" "}
          <span className="mx-2">/</span> {tool.name}
        </nav>
        <div className="max-w-3xl">
          <p className="eyebrow">{tool.category} tool</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">
            {tool.name}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--ink-muted)]">
            {tool.description}
          </p>
        </div>
        <div className="my-10">
          <CalculatorClient tool={tool} />
        </div>
        {tool.slug === "watts-to-amps-calculator" && <WattsToAmpsContent />}
        {isElectricalContentSlug(tool.slug) && (
          <ElectricalCalculatorContent slug={tool.slug} />
        )}
        {isBatteryContentSlug(tool.slug) && (
          <BatteryCalculatorContent slug={tool.slug} />
        )}
        {isGeneratorContentSlug(tool.slug) && (
          <GeneratorCalculatorContent slug={tool.slug} />
        )}
        <section className="grid gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Important assumptions</h2>
            <p className="mt-3 leading-7 text-[var(--ink-muted)]">
              This is a planning estimate, not a guarantee of performance. Real
              equipment varies with temperature, age, power quality, duty cycle,
              wiring, and manufacturer specifications.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Related calculators</h2>
            <div className="mt-3 grid gap-2">
              {tools
                .filter(
                  (item) =>
                    item.category === tool.category && item.slug !== tool.slug,
                )
                .slice(0, 4)
                .map((item) => (
                  <Link
                    className="font-bold text-[var(--green)]"
                    key={item.slug}
                    href={`/tools/${item.slug}`}
                  >
                    {item.name} →
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
