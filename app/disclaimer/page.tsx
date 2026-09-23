import { Header } from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important limitations and safety guidance for Energy Tools Hub calculator estimates.",
  alternates: { canonical: "/disclaimer" },
};
export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow">Safety first</p>
        <h1 className="mt-2 text-5xl font-black">Disclaimer</h1>
        <p className="mt-6 leading-8 text-[var(--ink-muted)]">
          Results are estimates for planning and educational use. They do not
          replace manufacturer documentation, a licensed electrician, an
          engineer, or applicable codes and permits. Verify all equipment and
          installation decisions with a qualified professional.
        </p>
      </main>
    </>
  );
}
