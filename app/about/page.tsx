import { Header } from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Energy Tools Hub presents practical energy estimates and visible assumptions.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow">About</p>
        <h1 className="mt-2 text-5xl font-black">
          Useful answers for real projects.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--ink-muted)]">
          Energy Tools Hub is a US-focused reference for estimating household
          electrical loads, generator sizing, battery runtime, and related
          energy questions. We keep inputs visible and explain assumptions so
          you can make better first-pass decisions.
        </p>
      </main>
    </>
  );
}
