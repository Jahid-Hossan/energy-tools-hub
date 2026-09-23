"use client";

import { appliances, type Appliance } from "@/data/appliances";
import {
  calculateGeneratorSizing,
  round,
  type GeneratorLoad,
} from "@/lib/calculations";
import { useMemo, useState } from "react";

type LoadRow = Appliance & { id: number; quantity: number; custom?: boolean };
type CustomDraft = {
  name: string;
  quantity: string;
  runningWatts: string;
  startingWatts: string;
};

const firstLoads: LoadRow[] = appliances
  .slice(0, 2)
  .map((appliance, index) => ({ ...appliance, id: index + 1, quantity: 1 }));
const emptyCustom: CustomDraft = {
  name: "",
  quantity: "1",
  runningWatts: "",
  startingWatts: "",
};

function numberValue(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function wattsInput(
  label: string,
  value: number,
  onChange: (value: number) => void,
) {
  return (
    <label className="block text-xs font-bold text-[var(--ink-muted)]">
      {label}
      <span className="relative mt-1 block">
        <input
          aria-label={label}
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(numberValue(event.target.value))}
          className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 pr-9 font-normal text-[var(--foreground)] focus:border-[var(--green)]"
        />
        <span className="pointer-events-none absolute right-3 top-2 text-xs text-[var(--ink-muted)]">
          W
        </span>
      </span>
    </label>
  );
}

function ResultMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail?: string;
}) {
  return (
    <div className="border-b border-white/15 pb-4 last:border-0 last:pb-0">
      <p className="text-xs font-bold tracking-[.08em] text-white/65">
        {label}
      </p>
      <p className="mt-1 text-3xl font-black">{round(value)} W</p>
      {detail && (
        <p className="mt-1 text-xs leading-5 text-white/65">{detail}</p>
      )}
    </div>
  );
}

export function GeneratorSizeCalculator() {
  const [loads, setLoads] = useState<LoadRow[]>(firstLoads);
  const [search, setSearch] = useState("");
  const [headroom, setHeadroom] = useState(20);
  const [customDraft, setCustomDraft] = useState<CustomDraft>(emptyCustom);
  const [showCustom, setShowCustom] = useState(false);
  const [nextId, setNextId] = useState(3);
  const filteredAppliances = useMemo(
    () =>
      appliances.filter((appliance) =>
        appliance.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );
  const result = calculateGeneratorSizing(
    loads satisfies GeneratorLoad[],
    headroom,
  );

  function addPreset(appliance: Appliance) {
    setLoads((current) => [
      ...current,
      { ...appliance, id: nextId, quantity: 1 },
    ]);
    setNextId((current) => current + 1);
  }
  function updateLoad(id: number, changes: Partial<LoadRow>) {
    setLoads((current) =>
      current.map((load) => (load.id === id ? { ...load, ...changes } : load)),
    );
  }
  function addCustom() {
    if (!customDraft.name.trim()) return;
    setLoads((current) => [
      ...current,
      {
        id: nextId,
        name: customDraft.name.trim(),
        category: "Custom",
        quantity: numberValue(customDraft.quantity),
        runningWatts: numberValue(customDraft.runningWatts),
        startingWatts: numberValue(customDraft.startingWatts),
        custom: true,
      },
    ]);
    setNextId((current) => current + 1);
    setCustomDraft(emptyCustom);
    setShowCustom(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <section
        className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7"
        aria-labelledby="load-builder-heading"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Load builder</p>
            <h2 id="load-builder-heading" className="mt-1 text-2xl font-black">
              What needs to run?
            </h2>
          </div>
          <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-bold text-[var(--ink-muted)]">
            {loads.length} load{loads.length === 1 ? "" : "s"}
          </span>
        </div>
        <label className="mt-6 block text-sm font-bold">
          Search appliances
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try refrigerator or pump"
            className="mt-2 w-full rounded-xl border border-[var(--line)] px-4 py-3 font-normal focus:border-[var(--green)]"
          />
        </label>
        <div
          className="mt-3 flex max-h-36 flex-wrap gap-2 overflow-y-auto"
          aria-label="Appliance presets"
        >
          {filteredAppliances.map((appliance) => (
            <button
              type="button"
              key={appliance.name}
              onClick={() => addPreset(appliance)}
              className="rounded-full border border-[var(--line)] px-3 py-2 text-left text-xs font-bold hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              + {appliance.name}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {loads.map((load) => (
            <div
              key={load.id}
              className="rounded-xl border border-[var(--line)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{load.name}</p>
                  <p className="mt-1 text-xs text-[var(--ink-muted)]">
                    {load.custom
                      ? "Custom input"
                      : load.labelRequired
                        ? "Enter equipment label values"
                        : "Preset planning estimate"}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${load.name}`}
                  onClick={() =>
                    setLoads((current) =>
                      current.filter((item) => item.id !== load.id),
                    )
                  }
                  className="text-xs font-bold text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label className="block text-xs font-bold text-[var(--ink-muted)]">
                  Quantity
                  <input
                    aria-label={`${load.name} quantity`}
                    type="number"
                    min="0"
                    value={load.quantity}
                    onChange={(event) =>
                      updateLoad(load.id, {
                        quantity: numberValue(event.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 font-normal text-[var(--foreground)]"
                  />
                </label>
                {wattsInput("Running watts", load.runningWatts, (value) =>
                  updateLoad(load.id, { runningWatts: value }),
                )}
                {wattsInput("Starting watts", load.startingWatts, (value) =>
                  updateLoad(load.id, { startingWatts: value }),
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowCustom((current) => !current)}
            className="rounded-full bg-[var(--green)] px-4 py-2 text-sm font-bold text-white"
          >
            + Add custom appliance
          </button>
          <button
            type="button"
            onClick={() => addPreset(appliances[0])}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold"
          >
            + Add appliance
          </button>
        </div>
        {showCustom && (
          <div className="mt-5 rounded-xl border border-[var(--green)] bg-[var(--background)] p-4">
            <p className="font-bold">Custom appliance</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold text-[var(--ink-muted)]">
                Name
                <input
                  value={customDraft.name}
                  onChange={(event) =>
                    setCustomDraft({ ...customDraft, name: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 font-normal"
                />
              </label>
              <label className="text-xs font-bold text-[var(--ink-muted)]">
                Quantity
                <input
                  type="number"
                  min="0"
                  value={customDraft.quantity}
                  onChange={(event) =>
                    setCustomDraft({
                      ...customDraft,
                      quantity: event.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 font-normal"
                />
              </label>
              {(["runningWatts", "startingWatts"] as const).map((key) => (
                <label
                  key={key}
                  className="text-xs font-bold text-[var(--ink-muted)]"
                >
                  {key === "runningWatts" ? "Running watts" : "Starting watts"}
                  <input
                    type="number"
                    min="0"
                    value={customDraft[key]}
                    onChange={(event) =>
                      setCustomDraft({
                        ...customDraft,
                        [key]: event.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 font-normal"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={addCustom}
              className="primary-button mt-4 rounded-full px-4 py-2 text-sm font-bold"
            >
              Add to load list
            </button>
          </div>
        )}
        <label className="mt-6 block max-w-xs text-sm font-bold">
          Safety headroom
          <span className="relative mt-2 block">
            <input
              type="number"
              min="0"
              value={headroom}
              onChange={(event) => setHeadroom(numberValue(event.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 pr-10 font-normal focus:border-[var(--green)]"
            />
            <span className="pointer-events-none absolute right-4 top-3 text-sm text-[var(--ink-muted)]">
              %
            </span>
          </span>
        </label>
        <p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">
          Use equipment label values when available. Preset appliance values are
          planning estimates only.
        </p>
      </section>
      <aside
        className="self-start rounded-2xl bg-[var(--green-dark)] p-6 text-white lg:sticky lg:top-6"
        aria-live="polite"
      >
        <p className="eyebrow !text-[var(--yellow)]">
          Generator sizing summary
        </p>
        <div className="mt-6 space-y-5">
          <ResultMetric
            label="TOTAL RUNNING LOAD"
            value={result.totalRunningWatts}
          />
          <ResultMetric
            label="LARGEST STARTING SURGE REQUIREMENT"
            value={result.largestStartingSurgeWatts}
            detail="Largest starting watt delta, adjusted for that row's quantity."
          />
          <ResultMetric
            label="RUNNING CAPACITY WITH HEADROOM"
            value={result.runningCapacityWithHeadroom}
            detail={`${round(headroom)}% safety headroom assumption.`}
          />
          <ResultMetric
            label="ESTIMATED PEAK REQUIREMENT"
            value={result.estimatedPeakWatts}
            detail="Continuous load plus the largest applicable startup surge."
          />
        </div>
        <p className="mt-7 border-t border-white/20 pt-5 text-sm font-bold leading-6">
          The generator&apos;s running/continuous rating must support the
          continuous load. Its starting/peak rating must also support startup
          surge.
        </p>
        <p className="mt-4 text-xs leading-5 text-white/65">
          This assumes identical selected loads may start at the same time.
          Actual equipment startup characteristics vary. Running and peak
          ratings differ, and 120V/240V requirements matter. Home connection and
          transfer equipment must follow manufacturer instructions and
          applicable electrical requirements. Consult a qualified electrician
          for home connection questions.
        </p>
      </aside>
    </div>
  );
}
