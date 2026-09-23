import { Header } from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for Energy Tools Hub and its free calculators.",
  alternates: { canonical: "/privacy" },
};
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow">Privacy</p>
        <h1 className="mt-2 text-5xl font-black">Privacy Policy</h1>
        <p className="mt-6 leading-8 text-[var(--ink-muted)]">
          This placeholder policy will be updated before analytics, advertising,
          or contact collection is enabled. The calculators currently work
          without registration.
        </p>
      </main>
    </>
  );
}
