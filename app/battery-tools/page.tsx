import { CategoryPage } from "@/components/CategoryPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Battery Tools",
  description:
    "Free battery runtime, capacity, Ah to Wh, Wh to Ah, and charging time calculators.",
  alternates: { canonical: "/battery-tools" },
};
export default function BatteryToolsPage() {
  return <CategoryPage slug="battery" />;
}
