import { CategoryPage } from "@/components/CategoryPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Generator Tools",
  description:
    "Free generator sizing, wattage, runtime, and fuel consumption calculators.",
  alternates: { canonical: "/generator-tools" },
};
export default function GeneratorToolsPage() {
  return <CategoryPage slug="generator" />;
}
