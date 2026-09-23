import { CategoryPage } from "@/components/CategoryPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solar Tools",
  description:
    "Solar planning resources from Energy Tools Hub, with calculators being added as they are ready.",
  alternates: { canonical: "/solar-tools" },
};
export default function SolarToolsPage() {
  return <CategoryPage slug="solar" />;
}
