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
    title: "Watts to Amps Calculator - Free Online Calculator",
    description:
      "Convert watts to amps instantly with our free online calculator. Get accurate DC, AC, and three-phase results. Try it now.",
  },
  "amps-to-watts-calculator": {
    title: "Amps to Watts Calculator - Free & Instant Conversion",
    description:
      "Convert amps to watts instantly with our free online calculator. Enter voltage and current to get accurate wattage results. No sign-up required.",
  },
  "volts-amps-watts-calculator": {
    title: "Volts, Amps & Watts Calculator - Free Online Tool",
    description:
      "Solve for volts, amps, or watts instantly with our free online calculator. Easy electrical conversions for any system. Start calculating now.",
  },
  "appliance-wattage-calculator": {
    title: "Appliance Wattage Calculator - Free Online Calculator",
    description:
      "Estimate appliance wattage instantly with our free online calculator. Perfect for sizing generators or planning energy use. Get your estimate today.",
  },
  "kwh-calculator": {
    title: "kWh Calculator - Free Online Energy Calculator",
    description:
      "Calculate daily and period energy use in kWh instantly with our free online calculator. Estimate your electricity consumption. Try it now.",
  },
  "electricity-cost-calculator": {
    title: "Electricity Cost Calculator - Free Online Calculator",
    description:
      "Estimate electricity costs instantly with our free online calculator. Enter your energy use and utility rate to see your expenses. Start now.",
  },
};
const batterySeo: Record<string, { title: string; description: string }> = {
  "battery-runtime-calculator": {
    title: "Battery Runtime Calculator - Free Online Calculator",
    description:
      "Estimate battery runtime instantly with our free online calculator. Input capacity and load for accurate backup time estimates. Try it for free.",
  },
  "battery-capacity-calculator": {
    title: "Battery Capacity Calculator - Free Online Calculator",
    description:
      "Size your battery capacity instantly with our free online calculator. Find the right amp-hours for your load and runtime needs. Start calculating.",
  },
  "ah-to-wh-calculator": {
    title: "Ah to Wh Calculator - Free Online Calculator",
    description:
      "Convert battery amp-hours to watt-hours instantly with our free online calculator. Perfect for comparing battery sizes. Try it now.",
  },
  "wh-to-ah-calculator": {
    title: "Wh to Ah Calculator - Free Online Calculator",
    description:
      "Convert battery watt-hours to amp-hours instantly with our free online calculator. Easy and accurate battery sizing. Start your conversion.",
  },
  "battery-charging-time-calculator": {
    title: "Battery Charge Time Calculator - Free Online Tool",
    description:
      "Estimate battery charging time instantly with our free online calculator. Input battery capacity and charger specs to get started. Try it now.",
  },
};
const generatorSeo: Record<string, { title: string; description: string }> = {
  "generator-size-calculator": {
    title: "Generator Size Calculator - Free Online Calculator",
    description:
      "Find the right generator size instantly with our free online calculator. Estimate running and starting watts for your appliances. Start sizing.",
  },
  "generator-wattage-calculator": {
    title: "Generator Wattage Calculator - Free Online Calculator",
    description:
      "Calculate generator wattage requirements instantly with our free online calculator. Ensure you have enough power for your needs. Try it for free.",
  },
  "generator-runtime-calculator": {
    title: "Generator Runtime Calculator - Free Online Calculator",
    description:
      "Estimate generator runtime instantly with our free online calculator. Input fuel capacity and consumption rate for accurate results. Try it now.",
  },
  "generator-fuel-consumption-calculator": {
    title: "Generator Fuel Calculator - Free Online Calculator",
    description:
      "Estimate generator fuel consumption instantly with our free online calculator. Plan your fuel needs accurately. Start calculating today.",
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
