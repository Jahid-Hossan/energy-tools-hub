import Link from "next/link";
export default function NotFound() {
  return (
    <main className="site-grid flex min-h-screen items-center justify-center px-5">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="mt-3 text-5xl font-black">That route does not exist.</h1>
        <p className="mt-5 leading-7 text-[var(--ink-muted)]">
          Use one of these working starting points to find the calculator or
          tool family you need.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="primary-button rounded-full px-5 py-3 font-bold"
            href="/"
          >
            Home
          </Link>
          <Link
            className="rounded-full border border-[var(--line)] bg-white px-5 py-3 font-bold"
            href="/tools"
          >
            All Tools
          </Link>
          <Link
            className="rounded-full border border-[var(--line)] bg-white px-5 py-3 font-bold"
            href="/generator-tools"
          >
            Generator Tools
          </Link>
          <Link
            className="rounded-full border border-[var(--line)] bg-white px-5 py-3 font-bold"
            href="/electrical-tools"
          >
            Electrical Tools
          </Link>
          <Link
            className="rounded-full border border-[var(--line)] bg-white px-5 py-3 font-bold"
            href="/battery-tools"
          >
            Battery Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
