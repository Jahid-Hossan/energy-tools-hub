import Link from "next/link";

type Faq = { question: string; answer: string };
export type BatteryCalculatorSlug =
  | "battery-runtime-calculator"
  | "battery-capacity-calculator"
  | "ah-to-wh-calculator"
  | "wh-to-ah-calculator"
  | "battery-charging-time-calculator";

function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <h3 className="mt-10 text-2xl font-black">Frequently asked questions</h3>
      <div className="mt-4 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h4 className="font-black">{faq.question}</h4>
            <p className="mt-2 leading-7 text-[var(--ink-muted)]">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--green)]">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label} →
        </Link>
      ))}
    </div>
  );
}
function Shell({
  children,
  labelledBy,
}: {
  children: React.ReactNode;
  labelledBy: string;
}) {
  return (
    <section
      className="mt-12 border-t border-[var(--line)] pt-10"
      aria-labelledby={labelledBy}
    >
      <div className="max-w-3xl">{children}</div>
    </section>
  );
}

function RuntimeContent() {
  const faqs = [
    {
      question: "What does battery runtime depend on?",
      answer:
        "The estimate depends on battery amp-hours, voltage, depth of discharge, inverter efficiency, and connected load in watts.",
    },
    {
      question: "Why is usable capacity less than the battery label?",
      answer:
        "The calculation reduces nominal stored energy by the selected depth of discharge and inverter efficiency assumptions.",
    },
    {
      question: "Why can real runtime be different?",
      answer:
        "Chemistry, age, temperature, discharge rate, inverter behavior, wiring losses, and manufacturer limits can change real performance.",
    },
    {
      question: "Does a higher voltage always mean longer runtime?",
      answer:
        "Voltage changes the watt-hours represented by a given Ah rating. Runtime also depends on the connected load and the usable fraction of the battery.",
    },
  ];
  return (
    <Shell labelledBy="battery-runtime-guide">
      <p className="eyebrow">Battery runtime guide</p>
      <h2 id="battery-runtime-guide" className="mt-2 text-3xl font-black">
        Estimate runtime from usable battery energy
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        This calculator estimates how long a connected load may run from a
        battery after accounting for voltage, depth of discharge, and inverter
        efficiency. It is a planning estimate, not a guaranteed runtime.
      </p>
      <h3 className="mt-10 text-2xl font-black">How the calculation works</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Amp-hours describe charge capacity, while watt-hours describe energy.
        The calculator first estimates usable energy, then divides by the
        connected load.
      </p>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          usable Wh = Ah × V × DoD × inverter efficiency
        </p>
        <p className="mt-2 font-mono text-sm">runtime = usable Wh ÷ load W</p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Small load:</strong> 100
          Ah × 12 V × 80% DoD × 90% efficiency = 864 usable Wh. At 100 W, the
          estimate is 8.64 hours.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Larger load:</strong> 100
          Ah × 12 V × 80% DoD × 90% efficiency = 864 usable Wh. At 500 W, the
          estimate is about 1.73 hours.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Practical considerations</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Battery chemistry, age, temperature, discharge rate, inverter
        efficiency, wiring, battery-management limits, and manufacturer
        recommendations can all change actual runtime. Keep the assumptions
        visible and use equipment documentation when available.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/battery-capacity-calculator",
            label: "Battery Capacity Calculator",
          },
          { href: "/tools/ah-to-wh-calculator", label: "Ah to Wh Calculator" },
          {
            href: "/tools/solar-battery-size-calculator",
            label: "Solar Battery Size Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function CapacityContent() {
  const faqs = [
    {
      question: "How do I estimate required battery capacity?",
      answer:
        "Multiply the connected load by the desired runtime, then divide by voltage, depth of discharge, and inverter efficiency.",
    },
    {
      question: "Why is the answer in Ah instead of Wh?",
      answer:
        "The calculator reports nominal amp-hour capacity at the selected system voltage. Watt-hours can be found by multiplying Ah by volts.",
    },
    {
      question: "Should I add practical margin?",
      answer:
        "Yes. The result is a planning estimate. Real systems may need additional margin for temperature, aging, load variation, conversion losses, and manufacturer limits.",
    },
    {
      question: "Does the result guarantee a battery will work?",
      answer:
        "No. Confirm chemistry, voltage, continuous current, surge current, temperature range, and manufacturer requirements before selecting equipment.",
    },
  ];
  return (
    <Shell labelledBy="battery-capacity-guide">
      <p className="eyebrow">Battery capacity guide</p>
      <h2 id="battery-capacity-guide" className="mt-2 text-3xl font-black">
        Estimate the battery capacity needed for a load
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Use the connected load and desired runtime to estimate nominal battery
        capacity. The calculator accounts for system voltage, selected DoD, and
        inverter efficiency.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula and variables</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          Ah = load W × runtime hours ÷ (V × DoD × efficiency)
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          Load is in watts, runtime is in hours, voltage is in volts, and DoD
          and efficiency are fractions between 0 and 1 internally.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Small backup:</strong>{" "}
          100 W for 8 hours at 12 V, 80% DoD, and 90% efficiency requires about
          74.07 Ah.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Larger system:</strong>{" "}
          1,000 W for 4 hours at 48 V, 80% DoD, and 90% efficiency requires
          about 115.74 Ah.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Planning margin</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Treat the result as a starting point. Battery aging, temperature, peak
        loads, inverter behavior, and limits on the chosen chemistry can reduce
        usable performance. A practical design review should include margin and
        manufacturer data.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
          { href: "/tools/wh-to-ah-calculator", label: "Wh to Ah Calculator" },
          {
            href: "/tools/solar-battery-size-calculator",
            label: "Solar Battery Size Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function AhToWhContent() {
  const faqs = [
    {
      question: "Why is voltage required for Ah to Wh?",
      answer:
        "Amp-hours measure charge, not energy by themselves. Voltage is required because watt-hours equal amp-hours multiplied by volts.",
    },
    {
      question: "Are two batteries with the same Ah rating equivalent?",
      answer:
        "Not necessarily. A 100 Ah battery at 12 V stores a different nominal amount of energy than a 100 Ah battery at 24 V or 48 V.",
    },
    {
      question: "Does this include depth of discharge?",
      answer:
        "No. This is a nominal conversion. Depth of discharge, efficiency, and chemistry are separate application assumptions.",
    },
    { question: "What is the formula?", answer: "Wh = Ah × V." },
  ];
  return (
    <Shell labelledBy="ah-to-wh-guide">
      <p className="eyebrow">Battery energy conversion</p>
      <h2 id="ah-to-wh-guide" className="mt-2 text-3xl font-black">
        Convert amp-hours to watt-hours
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Amp-hours describe charge capacity. Watt-hours describe nominal stored
        energy. Voltage connects the two measurements, so the same Ah rating can
        represent different energy at different system voltages.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">Wh = Ah × V</p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">12 V system:</strong> 100
          Ah × 12 V = 1,200 Wh.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">24 V system:</strong> 100
          Ah × 24 V = 2,400 Wh. The Ah rating is the same, but the nominal
          energy is different.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Reference table</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">
            Nominal watt-hours for a 100 Ah battery at common voltages
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Voltage</th>
              <th className="px-4 py-3">Nominal energy</th>
            </tr>
          </thead>
          <tbody>
            {[12, 24, 48].map((volts) => (
              <tr
                key={volts}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th className="px-4 py-3">100 Ah</th>
                <td className="px-4 py-3">{volts} V</td>
                <td className="px-4 py-3">{100 * volts} Wh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        These are nominal values before depth-of-discharge and efficiency
        limits.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          { href: "/tools/wh-to-ah-calculator", label: "Wh to Ah Calculator" },
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
          {
            href: "/tools/solar-battery-size-calculator",
            label: "Solar Battery Size Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function WhToAhContent() {
  const faqs = [
    {
      question: "Why does voltage matter when converting Wh to Ah?",
      answer:
        "Amp-hours are charge capacity, while watt-hours are energy. Dividing Wh by voltage gives the corresponding Ah at that voltage.",
    },
    { question: "What is the formula?", answer: "Ah = Wh ÷ V." },
    {
      question: "Does the result show usable battery capacity?",
      answer:
        "No. It is a nominal conversion and does not subtract depth-of-discharge or efficiency losses.",
    },
    {
      question: "How does this relate to Ah to Wh?",
      answer:
        "The two calculators are inverse conversions: Ah to Wh multiplies by voltage, while Wh to Ah divides by voltage.",
    },
  ];
  return (
    <Shell labelledBy="wh-to-ah-guide">
      <p className="eyebrow">Battery capacity conversion</p>
      <h2 id="wh-to-ah-guide" className="mt-2 text-3xl font-black">
        Convert watt-hours to amp-hours
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Watt-hours tell you how much nominal energy is represented. Amp-hours
        describe charge capacity at a particular voltage. Voltage is essential
        because the same Wh value maps to different Ah values at 12 V, 24 V, or
        48 V.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">Ah = Wh ÷ V</p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">12 V:</strong> 1,200 Wh ÷
          12 V = 100 Ah.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">24 V:</strong> 2,400 Wh ÷
          24 V = 100 Ah. The energy and voltage both doubled, so the Ah result
          stayed the same.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Reference table</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">
            Amp-hours for 2400 watt-hours at common voltages
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Energy</th>
              <th className="px-4 py-3">Voltage</th>
              <th className="px-4 py-3">Equivalent capacity</th>
            </tr>
          </thead>
          <tbody>
            {[12, 24, 48].map((volts) => (
              <tr
                key={volts}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th className="px-4 py-3">2,400 Wh</th>
                <td className="px-4 py-3">{volts} V</td>
                <td className="px-4 py-3">{(2400 / volts).toFixed(1)} Ah</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        This conversion does not account for chemistry, DoD, or conversion
        efficiency.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          { href: "/tools/ah-to-wh-calculator", label: "Ah to Wh Calculator" },
          {
            href: "/tools/battery-capacity-calculator",
            label: "Battery Capacity Calculator",
          },
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function ChargingContent() {
  const faqs = [
    {
      question: "What charging formula does the calculator use?",
      answer:
        "It converts battery capacity to watt-hours, then divides by panel or charger power multiplied by charging efficiency: hours = (Ah × V) ÷ (power W × efficiency).",
    },
    {
      question: "Why is charging time not perfectly linear?",
      answer:
        "Panel output changes with sunlight and temperature, while charge controllers, batteries, and chargers may reduce power as the battery approaches full.",
    },
    {
      question: "What happens near full charge?",
      answer:
        "A BMS or charger may taper current near full state of charge, making real charging time longer than the theoretical estimate.",
    },
    {
      question: "Is the result an exact charging time?",
      answer:
        "No. Treat it as a planning estimate and confirm charge limits and behavior with the battery and charger documentation.",
    },
  ];
  return (
    <Shell labelledBy="battery-charging-guide">
      <p className="eyebrow">Battery charging guide</p>
      <h2 id="battery-charging-guide" className="mt-2 text-3xl font-black">
        Estimate battery charging time
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        The calculator estimates charging time from battery capacity, voltage,
        available charger or panel power, and charging efficiency. It assumes a
        simplified full-charge calculation rather than promising an exact field
        result.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula and variables</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">Wh = Ah × V</p>
        <p className="mt-2 font-mono text-sm">
          charging hours = Wh ÷ (power W × efficiency)
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          The current calculator uses charger or panel power in watts, not
          charging current in amps.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Example 1:</strong> 100
          Ah × 12 V = 1,200 Wh. With 300 W and 80% efficiency, 1,200 ÷ (300 ×
          0.8) = 5 hours theoretically.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Example 2:</strong> 200
          Ah × 24 V = 4,800 Wh. With 1,000 W and 90% efficiency, 4,800 ÷ (1,000
          × 0.9) ≈ 5.33 hours theoretically.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">
        Theoretical versus real charging time
      </h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Solar charging varies with sunlight, panel output, shading, temperature,
        and controller behavior. A BMS or charger may slow charging near full
        state of charge. Battery temperature limits, maximum charge current,
        wiring, and equipment losses can also extend the real time.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/solar-charge-time-calculator",
            label: "Solar Charge Time Calculator",
          },
          { href: "/tools/ah-to-wh-calculator", label: "Ah to Wh Calculator" },
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
        ]}
      />
    </Shell>
  );
}

export function BatteryCalculatorContent({
  slug,
}: {
  slug: BatteryCalculatorSlug;
}) {
  if (slug === "battery-runtime-calculator") return <RuntimeContent />;
  if (slug === "battery-capacity-calculator") return <CapacityContent />;
  if (slug === "ah-to-wh-calculator") return <AhToWhContent />;
  if (slug === "wh-to-ah-calculator") return <WhToAhContent />;
  return <ChargingContent />;
}
