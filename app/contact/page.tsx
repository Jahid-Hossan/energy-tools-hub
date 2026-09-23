import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Energy Tools Hub with corrections, source suggestions, or partnership questions.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 text-5xl font-black">Contact Energy Tools Hub</h1>
        <p className="mt-6 leading-8 text-[var(--ink-muted)]">
          For corrections, source suggestions, or partnership questions, email
          {siteConfig.contactEmail}. Please do not send private electrical
          installation details or emergency requests.
        </p>
      </main>
    </>
  );
}
