"use client";

import { GeneratorSizeCalculator } from "@/components/GeneratorSizeCalculator";
import {
  ahToWh,
  ampsToWatts,
  batteryCapacity,
  batteryChargingTime,
  batteryRuntime,
  electricityCost,
  energyKwh,
  generatorFuelConsumption,
  generatorRuntime,
  generatorWattage,
  round,
  solveVoltsAmpsWatts,
  wattsToAmps,
  whToAh,
  type ElectricalMode,
} from "@/lib/calculations";
import type { Tool } from "@/lib/tools";
import { useState } from "react";

type Values = Record<string, string>;
const defaults: Values = {
  watts: "1500",
  volts: "120",
  amps: "10",
  pf: "0.9",
  mode: "single-phase-ac",
  hours: "8",
  days: "30",
  rate: "0.18",
  runningWatts: "1500",
  startingWatts: "3000",
  headroom: "20",
  fuel: "5",
  fuelRate: "0.5",
  ah: "100",
  wh: "1200",
  load: "500",
  dod: "80",
  efficiency: "90",
  charger: "500",
  unknown: "watts",
};

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
function NumericField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <span className="relative mt-2 block">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) =>
            onChange(String(numberValue(event.target.value)))
          }
          className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 pr-14 font-normal focus:border-[var(--green)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-3 text-sm text-[var(--ink-muted)]">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 font-normal focus:border-[var(--green)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
function ResultPanel({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--green-dark)] p-6 text-white">
      <p className="eyebrow !text-[var(--yellow)]">{title}</p>
      <p className="mt-3 break-words text-5xl font-black tracking-tight">
        {value}
      </p>
      <p className="mt-8 border-t border-white/20 pt-5 text-sm leading-6 text-white/75">
        {detail}
      </p>
    </div>
  );
}
function FormShell({
  children,
  note,
}: {
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      {note && (
        <p className="mt-6 text-sm leading-6 text-[var(--ink-muted)]">{note}</p>
      )}
    </div>
  );
}
function modeOptions() {
  return [
    { value: "dc", label: "DC" },
    { value: "single-phase-ac", label: "Single-phase AC" },
    { value: "three-phase-ac", label: "Three-phase AC" },
  ];
}

function GenericCalculator({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Values>(defaults);
  const set = (key: string) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));
  const n = (key: string) => numberValue(values[key] ?? "0");
  const mode = values.mode as ElectricalMode;
  const pf = Math.min(1, Math.max(0.01, n("pf")));
  const percentageFraction = (key: string) =>
    Math.min(100, Math.max(0, n(key))) / 100;

  if (tool.slug === "generator-wattage-calculator") {
    const result = generatorWattage(
      n("runningWatts"),
      n("startingWatts"),
      n("headroom"),
    );
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Starting watts represent the additional surge above running watts. Use equipment label values when available; generator running and peak ratings are separate.">
          <NumericField
            label="Running watts"
            value={values.runningWatts}
            onChange={set("runningWatts")}
            suffix="W"
          />
          <NumericField
            label="Starting watts"
            value={values.startingWatts}
            onChange={set("startingWatts")}
            suffix="W"
          />
          <NumericField
            label="Safety headroom"
            value={values.headroom}
            onChange={set("headroom")}
            suffix="%"
          />
        </FormShell>
        <ResultPanel
          title="Generator wattage estimate"
          value={`${round(result.runningCapacityWithHeadroom)} W running`}
          detail={`Starting surge requirement: ${round(result.startingSurgeWatts)} W. Estimated peak requirement: ${round(result.estimatedPeakWatts)} W. These are planning estimates, not an installation guarantee.`}
        />
      </div>
    );
  }
  if (tool.slug === "generator-runtime-calculator") {
    const result = generatorRuntime(n("fuel"), n("fuelRate"));
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Fuel consumption varies by generator model, fuel type, load, and operating conditions. Enter a model-specific rate; no universal rate is assumed.">
          <NumericField
            label="Fuel available"
            value={values.fuel}
            onChange={set("fuel")}
            suffix="gal"
          />
          <NumericField
            label="Fuel consumption rate"
            value={values.fuelRate}
            onChange={set("fuelRate")}
            suffix="gal/hr"
          />
        </FormShell>
        <ResultPanel
          title="Estimated runtime"
          value={`${round(result)} hours`}
          detail="Runtime = fuel available ÷ fuel consumption rate. A zero rate returns zero until a valid rate is entered."
        />
      </div>
    );
  }
  if (tool.slug === "generator-fuel-consumption-calculator") {
    const result = generatorFuelConsumption(n("fuelRate"), n("hours"));
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Enter the consumption rate from the generator model documentation or a measured operating condition.">
          <NumericField
            label="Fuel consumption rate"
            value={values.fuelRate}
            onChange={set("fuelRate")}
            suffix="gal/hr"
          />
          <NumericField
            label="Operating time"
            value={values.hours}
            onChange={set("hours")}
            suffix="hours"
          />
        </FormShell>
        <ResultPanel
          title="Estimated fuel use"
          value={`${round(result, 2)} gal`}
          detail="Fuel use = fuel consumption rate × operating time. Actual use changes with load and conditions."
        />
      </div>
    );
  }
  if (tool.slug === "watts-to-amps-calculator") {
    const result = wattsToAmps(n("watts"), n("volts"), pf, mode);
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="For three-phase AC, voltage is treated as line-to-line voltage. DC uses PF = 1; AC power factor is limited to 0.01–1.">
          <NumericField
            label="Power"
            value={values.watts}
            onChange={set("watts")}
            suffix="W"
          />
          <NumericField
            label={
              mode === "three-phase-ac" ? "Voltage (line-to-line)" : "Voltage"
            }
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
          <SelectField
            label="System type"
            value={values.mode}
            onChange={set("mode")}
            options={modeOptions()}
          />
          {mode !== "dc" && (
            <NumericField
              label="Power factor"
              value={values.pf}
              onChange={(value) =>
                set("pf")(String(Math.min(1, numberValue(value))))
              }
            />
          )}
        </FormShell>
        <ResultPanel
          title="Calculated current"
          value={`${round(result)} A`}
          detail={`I = P ÷ (${mode === "three-phase-ac" ? "√3 × " : ""}V × PF).`}
        />
      </div>
    );
  }
  if (tool.slug === "amps-to-watts-calculator") {
    const result = ampsToWatts(n("amps"), n("volts"), pf, mode);
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="For three-phase AC, voltage is treated as line-to-line voltage. DC uses PF = 1; AC power factor is limited to 0.01–1.">
          <NumericField
            label="Current"
            value={values.amps}
            onChange={set("amps")}
            suffix="A"
          />
          <NumericField
            label={
              mode === "three-phase-ac" ? "Voltage (line-to-line)" : "Voltage"
            }
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
          <SelectField
            label="System type"
            value={values.mode}
            onChange={set("mode")}
            options={modeOptions()}
          />
          {mode !== "dc" && (
            <NumericField
              label="Power factor"
              value={values.pf}
              onChange={(value) =>
                set("pf")(String(Math.min(1, numberValue(value))))
              }
            />
          )}
        </FormShell>
        <ResultPanel
          title="Calculated power"
          value={`${round(result)} W`}
          detail={`P = ${mode === "three-phase-ac" ? "√3 × " : ""}V × I × PF.`}
        />
      </div>
    );
  }
  if (tool.slug === "volts-amps-watts-calculator") {
    const result = solveVoltsAmpsWatts({
      watts: n("watts"),
      volts: n("volts"),
      amps: n("amps"),
      powerFactor: pf,
      mode,
      unknown: values.unknown as "watts" | "volts" | "amps",
    });
    const unknown = values.unknown;
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Choose one unknown. For three-phase AC, voltage is line-to-line voltage.">
          <SelectField
            label="Calculate"
            value={unknown}
            onChange={set("unknown")}
            options={[
              { value: "watts", label: "Watts" },
              { value: "volts", label: "Volts" },
              { value: "amps", label: "Amps" },
            ]}
          />
          {unknown !== "watts" && (
            <NumericField
              label="Power"
              value={values.watts}
              onChange={set("watts")}
              suffix="W"
            />
          )}
          {unknown !== "volts" && (
            <NumericField
              label="Voltage"
              value={values.volts}
              onChange={set("volts")}
              suffix="V"
            />
          )}
          {unknown !== "amps" && (
            <NumericField
              label="Current"
              value={values.amps}
              onChange={set("amps")}
              suffix="A"
            />
          )}
          <SelectField
            label="System type"
            value={values.mode}
            onChange={set("mode")}
            options={modeOptions()}
          />
          {mode !== "dc" && (
            <NumericField
              label="Power factor"
              value={values.pf}
              onChange={(value) =>
                set("pf")(String(Math.min(1, numberValue(value))))
              }
            />
          )}
        </FormShell>
        <ResultPanel
          title={`Calculated ${unknown}`}
          value={`${round(result)} ${unknown === "watts" ? "W" : unknown === "volts" ? "V" : "A"}`}
          detail="The result uses the selected system type and power factor."
        />
      </div>
    );
  }
  if (tool.slug === "appliance-wattage-calculator") {
    const result = ampsToWatts(n("amps"), n("volts"), pf, mode);
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Use appliance nameplate voltage and current when available. For three-phase AC, voltage is line-to-line voltage.">
          <NumericField
            label="Current"
            value={values.amps}
            onChange={set("amps")}
            suffix="A"
          />
          <NumericField
            label="Voltage"
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
          <SelectField
            label="System type"
            value={values.mode}
            onChange={set("mode")}
            options={modeOptions()}
          />
          {mode !== "dc" && (
            <NumericField
              label="Power factor"
              value={values.pf}
              onChange={(value) =>
                set("pf")(String(Math.min(1, numberValue(value))))
              }
            />
          )}
        </FormShell>
        <ResultPanel
          title="Estimated appliance wattage"
          value={`${round(result)} W`}
          detail="Wattage = voltage × current × power factor, with √3 for three-phase AC."
        />
      </div>
    );
  }
  if (
    tool.slug === "kwh-calculator" ||
    tool.slug === "electricity-cost-calculator"
  ) {
    const dailyKwh = energyKwh(n("watts"), n("hours"));
    const periodKwh = energyKwh(n("watts"), n("hours"), n("days"));
    if (tool.slug === "kwh-calculator")
      return (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <FormShell note="Energy = watts × hours per day × days ÷ 1000. The selected period is the number of days entered.">
            <NumericField
              label="Power"
              value={values.watts}
              onChange={set("watts")}
              suffix="W"
            />
            <NumericField
              label="Hours per day"
              value={values.hours}
              onChange={set("hours")}
              suffix="hours"
            />
            <NumericField
              label="Days"
              value={values.days}
              onChange={set("days")}
              suffix="days"
            />
          </FormShell>
          <ResultPanel
            title="Energy use"
            value={`${round(periodKwh, 2)} kWh`}
            detail={`Daily energy: ${round(dailyKwh, 2)} kWh. Selected period: ${round(n("days"))} days.`}
          />
        </div>
      );
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Cost = energy in kWh × your electricity rate. Rates vary by utility and plan; enter the rate from your bill.">
          <NumericField
            label="Power"
            value={values.watts}
            onChange={set("watts")}
            suffix="W"
          />
          <NumericField
            label="Hours per day"
            value={values.hours}
            onChange={set("hours")}
            suffix="hours"
          />
          <NumericField
            label="Days"
            value={values.days}
            onChange={set("days")}
            suffix="days"
          />
          <NumericField
            label="Electricity rate"
            value={values.rate}
            onChange={set("rate")}
            suffix="$/kWh"
          />
        </FormShell>
        <ResultPanel
          title="Electricity cost"
          value={`$${round(electricityCost(periodKwh, n("rate")), 2)}`}
          detail={`Daily energy cost: $${round(electricityCost(dailyKwh, n("rate")), 2)}. Annualized estimate: $${round(electricityCost(dailyKwh, n("rate")) * 365, 2)}.`}
        />
      </div>
    );
  }
  if (tool.slug === "battery-runtime-calculator") {
    const result = batteryRuntime(
      n("ah"),
      n("volts"),
      n("load"),
      percentageFraction("dod"),
      percentageFraction("efficiency"),
    );
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="Runtime = usable battery Wh ÷ connected load. DoD and inverter efficiency are explicit estimates, not guarantees of real-world performance.">
          <NumericField
            label="Battery capacity"
            value={values.ah}
            onChange={set("ah")}
            suffix="Ah"
          />
          <NumericField
            label="Voltage"
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
          <NumericField
            label="Connected load"
            value={values.load}
            onChange={set("load")}
            suffix="W"
          />
          <NumericField
            label="Depth of discharge"
            value={values.dod}
            onChange={(value) =>
              set("dod")(String(Math.min(100, numberValue(value))))
            }
            suffix="%"
          />
          <NumericField
            label="Inverter efficiency"
            value={values.efficiency}
            onChange={(value) =>
              set("efficiency")(String(Math.min(100, numberValue(value))))
            }
            suffix="%"
          />
        </FormShell>
        <ResultPanel
          title="Estimated battery runtime"
          value={`${round(result)} hours`}
          detail={`Usable energy: ${round(n("ah") * n("volts") * percentageFraction("dod") * percentageFraction("efficiency"), 1)} Wh.`}
        />
      </div>
    );
  }
  if (tool.slug === "battery-capacity-calculator") {
    const result = batteryCapacity(
      n("load"),
      n("hours"),
      n("volts"),
      percentageFraction("dod"),
      percentageFraction("efficiency"),
    );
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="This estimates nominal Ah capacity needed for the target load and runtime after DoD and efficiency assumptions.">
          <NumericField
            label="Connected load"
            value={values.load}
            onChange={set("load")}
            suffix="W"
          />
          <NumericField
            label="Target runtime"
            value={values.hours}
            onChange={set("hours")}
            suffix="hours"
          />
          <NumericField
            label="Voltage"
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
          <NumericField
            label="Depth of discharge"
            value={values.dod}
            onChange={(value) =>
              set("dod")(String(Math.min(100, numberValue(value))))
            }
            suffix="%"
          />
          <NumericField
            label="Inverter efficiency"
            value={values.efficiency}
            onChange={(value) =>
              set("efficiency")(String(Math.min(100, numberValue(value))))
            }
            suffix="%"
          />
        </FormShell>
        <ResultPanel
          title="Required nominal capacity"
          value={`${round(result)} Ah`}
          detail="Capacity = load × hours ÷ (volts × DoD × efficiency)."
        />
      </div>
    );
  }
  if (tool.slug === "ah-to-wh-calculator") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="This is nominal stored energy before application-specific DoD or conversion losses.">
          <NumericField
            label="Battery capacity"
            value={values.ah}
            onChange={set("ah")}
            suffix="Ah"
          />
          <NumericField
            label="Voltage"
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
        </FormShell>
        <ResultPanel
          title="Stored energy"
          value={`${round(ahToWh(n("ah"), n("volts")))} Wh`}
          detail="Wh = volts × amp-hours."
        />
      </div>
    );
  }
  if (tool.slug === "wh-to-ah-calculator") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <FormShell note="This is a nominal conversion and does not account for DoD, efficiency, or battery chemistry.">
          <NumericField
            label="Stored energy"
            value={values.wh}
            onChange={set("wh")}
            suffix="Wh"
          />
          <NumericField
            label="Voltage"
            value={values.volts}
            onChange={set("volts")}
            suffix="V"
          />
        </FormShell>
        <ResultPanel
          title="Battery capacity"
          value={`${round(whToAh(n("wh"), n("volts")))} Ah`}
          detail="Ah = watt-hours ÷ volts."
        />
      </div>
    );
  }
  const result = batteryChargingTime(
    n("ah"),
    n("volts"),
    n("charger"),
    percentageFraction("efficiency"),
  );
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <FormShell note="Charging time = battery watt-hours ÷ charger watts ÷ charging efficiency. This estimates a full charge from empty; tapering and charger behavior can increase actual time.">
        <NumericField
          label="Battery capacity"
          value={values.ah}
          onChange={set("ah")}
          suffix="Ah"
        />
        <NumericField
          label="Voltage"
          value={values.volts}
          onChange={set("volts")}
          suffix="V"
        />
        <NumericField
          label="Charger power"
          value={values.charger}
          onChange={set("charger")}
          suffix="W"
        />
        <NumericField
          label="Charging efficiency"
          value={values.efficiency}
          onChange={(value) =>
            set("efficiency")(String(Math.min(100, numberValue(value))))
          }
          suffix="%"
        />
      </FormShell>
      <ResultPanel
        title="Estimated charging time"
        value={`${round(result)} hours`}
        detail={`Battery energy: ${round(ahToWh(n("ah"), n("volts")), 1)} Wh. Charging efficiency: ${round(Math.min(100, n("efficiency")))}%.`}
      />
    </div>
  );
}

export function CalculatorClient({ tool }: { tool: Tool }) {
  return tool.slug === "generator-size-calculator" ? (
    <GeneratorSizeCalculator />
  ) : (
    <GenericCalculator tool={tool} />
  );
}
