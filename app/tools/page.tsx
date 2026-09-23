import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Header } from "@/components/Header";
import { categories, tools } from "@/lib/tools";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "All Tools",
  description:
    "Browse every available Energy Tools Hub calculator grouped by category.",
  alternates: { canonical: "/tools" },
};
export default function AllToolsPage() {
  return (
    <div className="site-grid min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "All Tools", path: "/tools" },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <nav
          className="mb-8 text-sm text-[var(--ink-muted)]"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <span>All Tools</span>
        </nav>
        <p className="eyebrow">Calculator directory</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight">All Tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--ink-muted)]">
          Every published calculator in one place, grouped by the kind of energy
          question you are solving.
        </p>
        {categories.map((category) => {
          const categoryTools = tools.filter(
            (tool) => tool.category === category.slug,
          );
          return (
            <section key={category.slug} className="mt-12">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-3xl font-black">{category.name}</h2>
                <Link
                  className="text-sm font-bold text-[var(--green)]"
                  href={category.path}
                >
                  View category →
                </Link>
              </div>
              {categoryTools.length > 0 ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="rounded-2xl border border-[var(--line)] bg-white p-5 hover:border-[var(--green)]"
                    >
                      <h3 className="text-xl font-black">{tool.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </main>
    </div>
  );
}
