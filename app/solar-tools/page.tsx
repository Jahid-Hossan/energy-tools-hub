import { CategoryPage } from "@/components/CategoryPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solar Tools",
  description:
    "Solar array, battery, charging time, and inverter sizing calculators for transparent early-stage planning.",
  alternates: { canonical: "/solar-tools" },
};
export default function SolarToolsPage() {
  return <CategoryPage slug="solar" />;
}
