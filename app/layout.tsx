import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Energy Tools Hub | Free Energy Calculators",
    template: "%s | Energy Tools Hub",
  },
  description:
    "Fast, transparent calculators for generators, electrical loads, batteries, and solar planning.",
  openGraph: {
    title: "Energy Tools Hub",
    description:
      "Free, practical energy calculators for US households and projects.",
    type: "website",
    url: siteConfig.url,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
