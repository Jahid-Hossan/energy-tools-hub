import { Header } from "@/components/Header";
import { categories, tools } from "@/lib/tools";
import Link from "next/link";

export default function Home() {
  return (
    <div className="site-grid min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <section className="grid gap-10 py-16 md:grid-cols-[1.15fr_.85fr] md:items-end md:py-24">
          <div>
            <p className="eyebrow">Practical energy math, made clear</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-7xl">
              Know what your power system can really do.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
              Free calculators for generator sizing, electrical conversions,
              battery runtime, and solar planning. Built around visible
              assumptions and useful answers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/generator-size-calculator"
                className="primary-button rounded-full px-6 py-3 font-bold"
              >
                Size a generator <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#tools"
                className="rounded-full border border-[var(--line)] bg-white px-6 py-3 font-bold"
              >
                Explore all tools
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--green-dark)] p-7 text-white shadow-[8px_8px_0_var(--yellow)]">
            <p className="eyebrow !text-[var(--yellow)]">
              A better starting point
            </p>
            <p className="mt-5 text-3xl font-black leading-tight">
              Inputs you can see. Results you can check.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="border-t border-white/20 pt-3">
                <strong className="block text-2xl">15</strong> calculators
              </div>
              <div className="border-t border-white/20 pt-3">
                <strong className="block text-2xl">4</strong> tool families
              </div>
            </div>
          </div>
        </section>
        <section id="tools">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="eyebrow">Choose a starting point</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Tools for the job at hand
              </h2>
            </div>
            <span className="hidden text-sm text-[var(--ink-muted)] sm:block">
              No account required
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={category.path}
                className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-xl text-[var(--green)] transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-black">{category.name}</h3>
                <p className="mt-2 max-w-sm leading-7 text-[var(--ink-muted)]">
                  {category.description}
                </p>
                <p className="mt-5 text-sm font-bold text-[var(--green)]">
                  {
                    tools.filter((tool) => tool.category === category.slug)
                      .length
                  }{" "}
                  calculators
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-16 border-t border-[var(--line)] pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="eyebrow">Built for clarity</p>
              <h2 className="mt-2 text-2xl font-black">No mystery numbers.</h2>
            </div>
            <p className="leading-7 text-[var(--ink-muted)]">
              Every result keeps the formula, assumptions, and units close by.
              Defaults are estimates, and editable wherever real-world equipment
              varies.
            </p>
            <p className="leading-7 text-[var(--ink-muted)]">
              Use these tools to plan and compare. Always confirm equipment
              requirements with manufacturer documentation and a qualified
              professional.
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Energy Tools Hub</span>
          <div className="flex gap-4">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
