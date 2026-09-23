import { CategoryPage } from "@/components/CategoryPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Electrical Tools",
  description:
    "Free watts, amps, volts, kWh, and electricity cost calculators for US users.",
  alternates: { canonical: "/electrical-tools" },
};
export default function ElectricalToolsPage() {
  return <CategoryPage slug="electrical" />;
}
