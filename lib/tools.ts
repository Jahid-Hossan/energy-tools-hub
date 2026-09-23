export type ToolCategory = "generator" | "electrical" | "battery" | "solar";
export type Tool = { slug: string; name: string; category: ToolCategory; description: string; formula: string; unit: string };
export const categories = [
  { slug: "generator", path: "/generator-tools", name: "Generator Tools", icon: "⚡", description: "Plan capacity, loads, fuel use, and runtime with clear headroom." },
  { slug: "electrical", path: "/electrical-tools", name: "Electrical Tools", icon: "◌", description: "Convert watts, amps, volts, energy, and cost without hidden assumptions." },
  { slug: "battery", path: "/battery-tools", name: "Battery Tools", icon: "▣", description: "Estimate usable energy, runtime, capacity, and charging time." },
  { slug: "solar", path: "/solar-tools", name: "Solar Tools", icon: "☼", description: "Solar planning tools are coming next. The architecture is ready." },
] as const;
export const tools: Tool[] = [
  ["generator-size-calculator", "Generator Size Calculator", "generator", "Estimate generator capacity from running loads and startup surge.", "capacity = running load + largest surge delta, with headroom", "W"],
  ["generator-wattage-calculator", "Generator Wattage Calculator", "generator", "Compare running watts with starting watts for a generator load.", "running capacity = running watts; peak = running watts + starting surge", "W"],
  ["generator-runtime-calculator", "Generator Runtime Calculator", "generator", "Estimate runtime from fuel on hand and a user-entered consumption rate.", "runtime = fuel available ÷ fuel consumption rate", "hours"],
  ["generator-fuel-consumption-calculator", "Generator Fuel Consumption Calculator", "generator", "Estimate fuel use from a user-entered consumption rate and operating time.", "fuel = fuel rate × hours", "gal"],
  ["watts-to-amps-calculator", "Watts to Amps Calculator", "electrical", "Convert electrical power to current for DC, single-phase, or three-phase systems.", "I = P ÷ (V × PF) for single-phase; I = P ÷ (√3 × V × PF) for three-phase", "A"],
  ["amps-to-watts-calculator", "Amps to Watts Calculator", "electrical", "Convert current into watts for DC, single-phase, or three-phase systems.", "P = V × I × PF for single-phase; P = √3 × V × I × PF for three-phase", "W"],
  ["volts-amps-watts-calculator", "Volts Amps Watts Calculator", "electrical", "Solve for the missing volts, amps, or watts value.", "P = V × I × PF, with √3 for three-phase AC", "W"],
  ["appliance-wattage-calculator", "Appliance Wattage Calculator", "electrical", "Estimate appliance watts from voltage, current, power factor, and system type.", "P = V × I × PF, with √3 for three-phase AC", "W"],
  ["kwh-calculator", "kWh Calculator", "electrical", "Calculate daily and period energy use from load and schedule.", "kWh = W × hours × days / 1000", "kWh"],
  ["electricity-cost-calculator", "Electricity Cost Calculator", "electrical", "Estimate daily, selected-period, and annual electricity cost using an editable rate.", "cost = kWh × price per kWh", "$"],
  ["battery-runtime-calculator", "Battery Runtime Calculator", "battery", "Estimate usable battery runtime from capacity, load, and efficiency.", "runtime = usable Wh / load W", "hours"],
  ["battery-capacity-calculator", "Battery Capacity Calculator", "battery", "Estimate nominal battery capacity needed for a target runtime.", "Ah = load W × hours ÷ (volts × DoD × efficiency)", "Ah"],
  ["ah-to-wh-calculator", "Ah to Wh Calculator", "battery", "Convert amp-hours into stored watt-hours.", "Wh = Ah × volts", "Wh"],
  ["wh-to-ah-calculator", "Wh to Ah Calculator", "battery", "Convert watt-hours into amp-hours at a selected voltage.", "Ah = Wh / volts", "Ah"],
  ["battery-charging-time-calculator", "Battery Charging Time Calculator", "battery", "Estimate charging time with charging efficiency and charger power.", "hours = battery Wh / charger W / efficiency", "hours"],
].map(([slug, name, category, description, formula, unit]) => ({ slug, name, category: category as ToolCategory, description, formula, unit }));
export function getTool(slug: string) { return tools.find((tool) => tool.slug === slug); }
export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }
