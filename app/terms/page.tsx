import { Header } from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using the free Energy Tools Hub calculators and informational estimates.",
  alternates: { canonical: "/terms" },
};
export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow">Terms</p>
        <h1 className="mt-2 text-5xl font-black">Terms of Use</h1>
        <p className="mt-6 leading-8 text-[var(--ink-muted)]">
          Energy Tools Hub provides informational estimates without warranties.
          You are responsible for checking inputs, interpreting outputs, and
          obtaining qualified advice for any installation or purchasing
          decision.
        </p>
      </main>
    </>
  );
}
