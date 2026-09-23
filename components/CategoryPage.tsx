import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Header } from "@/components/Header";
import { categories, tools } from "@/lib/tools";
import Link from "next/link";

export function CategoryPage({
  slug,
}: {
  slug: (typeof categories)[number]["slug"];
}) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return null;
  const categoryTools = tools.filter((tool) => tool.category === category.slug);
  const isSolar = category.slug === "solar";
  return (
    <div className="site-grid min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: category.name, path: category.path },
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
          <span>{category.name}</span>
        </nav>
        <p className="eyebrow">Tool library</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight">
          {category.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--ink-muted)]">
          {category.description}
        </p>
        {isSolar && (
          <div className="mt-8 max-w-3xl rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="text-2xl font-black">Solar tools are being added</h2>
            <p className="mt-3 leading-7 text-[var(--ink-muted)]">
              We are building solar calculators around transparent assumptions
              for panel output, battery storage, inverter sizing, and peak sun
              hours. No placeholder calculator links are shown until those tools
              are implemented.
            </p>
          </div>
        )}
        <div className="ad-slot my-10">Advertisement space</div>
        {categoryTools.length > 0 ? (
          <>
            <h2 className="mb-5 text-2xl font-black">
              Available {category.name.toLowerCase()}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-2xl border border-[var(--line)] bg-white p-6 hover:border-[var(--green)]"
                >
                  <p className="text-sm font-bold text-[var(--green)]">
                    {tool.unit}
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{tool.name}</h3>
                  <p className="mt-2 leading-7 text-[var(--ink-muted)]">
                    {tool.description}
                  </p>
                  <span className="mt-5 inline-block font-bold text-[var(--green)]">
                    Open calculator →
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="max-w-2xl leading-7 text-[var(--ink-muted)]">
            There are no published {category.name.toLowerCase()} yet. Check back
            as this category grows.
          </p>
        )}
      </main>
    </div>
  );
}
