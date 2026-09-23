import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CalculatorClient } from "@/components/CalculatorClient";
import { Header } from "@/components/Header";
import { getCategory, getTool, tools } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  return tool
    ? {
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
        <div className="ad-slot my-10">Advertisement space</div>
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
