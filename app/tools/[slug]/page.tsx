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

const electricalSeo: Record<string, { title: string; description: string }> = {
  "watts-to-amps-calculator": {
    title: "Watts to Amps Calculator: DC, AC, and Three-Phase",
    description:
      "Convert watts to amps for DC, single-phase AC, and three-phase AC systems with power factor guidance and worked examples.",
  },
  "amps-to-watts-calculator": {
    title: "Amps to Watts Calculator: DC, AC, and Three-Phase",
    description:
      "Convert amps to watts for DC, single-phase AC, and three-phase AC systems with power factor formulas and practical examples.",
  },
  "volts-amps-watts-calculator": {
    title: "Volts, Amps, and Watts Calculator",
    description:
      "Solve for volts, amps, or watts with clear electrical formulas for DC, single-phase AC, and three-phase AC systems.",
  },
  "appliance-wattage-calculator": {
    title: "Appliance Wattage Calculator",
    description:
      "Estimate appliance watts from voltage, current, power factor, and system type while keeping nameplate data and startup demand in context.",
  },
  "kwh-calculator": {
    title: "kWh Calculator: Calculate Energy Use",
    description:
      "Calculate daily and period energy use in kWh from watts, hours per day, and the number of days.",
  },
  "electricity-cost-calculator": {
    title: "Electricity Cost Calculator",
    description:
      "Estimate daily, period, and annualized electricity cost from energy use and your entered utility rate.",
  },
};
const batterySeo: Record<string, { title: string; description: string }> = {
  "battery-runtime-calculator": {
    title: "Battery Runtime Calculator",
    description:
      "Estimate battery runtime from amp-hours, voltage, connected load, depth of discharge, and inverter efficiency.",
  },
  "battery-capacity-calculator": {
    title: "Battery Capacity Calculator",
    description:
      "Estimate the nominal battery capacity needed for a load and target runtime using voltage, DoD, and efficiency assumptions.",
  },
  "ah-to-wh-calculator": {
    title: "Ah to Wh Calculator",
    description:
      "Convert battery amp-hours to nominal watt-hours using voltage, with examples for common system voltages.",
  },
  "wh-to-ah-calculator": {
    title: "Wh to Ah Calculator",
    description:
      "Convert nominal watt-hours to amp-hours at a selected battery voltage with practical reference examples.",
  },
  "battery-charging-time-calculator": {
    title: "Battery Charging Time Calculator",
    description:
      "Estimate theoretical battery charging time from capacity, voltage, charger power, and charging efficiency.",
  },
};
const generatorSeo: Record<string, { title: string; description: string }> = {
  "generator-size-calculator": {
    title: "Generator Size Calculator",
    description:
      "Estimate generator running capacity and startup requirements from selected loads, quantities, and safety headroom.",
  },
  "generator-wattage-calculator": {
    title: "Generator Wattage Calculator",
    description:
      "Compare running watts, starting watts, safety headroom, and estimated peak demand for a generator load.",
  },
  "generator-runtime-calculator": {
    title: "Generator Runtime Calculator",
    description:
      "Estimate generator runtime from fuel available and an entered model-specific fuel consumption rate.",
  },
  "generator-fuel-consumption-calculator": {
    title: "Generator Fuel Consumption Calculator",
    description:
      "Estimate fuel used from a generator fuel consumption rate and operating time.",
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
