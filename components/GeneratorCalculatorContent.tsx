import Link from "next/link";

export type GeneratorCalculatorSlug =
  | "generator-size-calculator"
  | "generator-wattage-calculator"
  | "generator-runtime-calculator"
  | "generator-fuel-consumption-calculator";
type Faq = { question: string; answer: string };

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

function SizeContent() {
  const faqs = [
    {
      question: "What are running watts?",
      answer:
        "Running watts are the continuous load used while an appliance operates normally.",
    },
    {
      question: "What is the starting surge?",
      answer:
        "Starting surge is the applicable extra demand above running watts when a selected load starts. Motors, pumps, compressors, and similar equipment can require more at startup.",
    },
    {
      question: "How does the calculator apply headroom?",
      answer:
        "It multiplies total running watts by 1 plus the entered headroom percentage. The current default is 20%.",
    },
    {
      question: "Does the result guarantee a generator will work?",
      answer:
        "No. Verify generator nameplate running and peak ratings, appliance labels, voltage requirements, and installation details with the manufacturer and a qualified professional.",
    },
  ];
  return (
    <Shell labelledBy="generator-size-guide">
      <p className="eyebrow">Generator sizing guide</p>
      <h2 id="generator-size-guide" className="mt-2 text-3xl font-black">
        How this generator size estimate works
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        The load builder keeps continuous running demand separate from starting
        demand. Add the appliances you expect to run, edit their values from
        equipment labels when available, and use the headroom field as an
        explicit planning assumption.
      </p>
      <h3 className="mt-10 text-2xl font-black">Current sizing logic</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          running load = running watts × quantity
        </p>
        <p className="mt-2 font-mono text-sm">
          total running watts = sum of all running loads
        </p>
        <p className="mt-2 font-mono text-sm">
          surge delta = max(0, starting watts − running watts) × quantity
        </p>
        <p className="mt-2 font-mono text-sm">
          running capacity = total running watts × (1 + headroom ÷ 100)
        </p>
        <p className="mt-2 font-mono text-sm">
          estimated peak = total running watts + largest surge delta
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          The current implementation uses the largest applicable row surge,
          rather than adding every appliance&apos;s starting wattage together.
          It assumes identical selected loads in a row may start together.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        The wattages below are illustrative planning examples, not universal
        appliance specifications. Check actual nameplates or manufacturer
        documentation.
      </p>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">
            Refrigerator + lights/fans:
          </strong>{" "}
          using illustrative 180 W running/600 W starting for a refrigerator and
          300 W for lights/fans gives 480 W total running, a 420 W largest surge
          delta, 576 W running capacity with 20% headroom, and a 900 W estimated
          peak.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">
            Refrigerator + water pump + lights/fans:
          </strong>{" "}
          using illustrative 180/600 W, 1,000/3,000 W, and 300 W values gives
          1,480 W total running, a 2,000 W largest surge delta, 1,776 W running
          capacity with 20% headroom, and a 3,480 W estimated peak.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Running versus peak ratings</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">
            Illustrative generator sizing concepts
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Requirement</th>
              <th className="px-4 py-3">What it represents</th>
              <th className="px-4 py-3">What to verify</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--line)]">
              <th className="px-4 py-3">Running/continuous watts</th>
              <td className="px-4 py-3">Normal combined load</td>
              <td className="px-4 py-3">Generator rated running output</td>
            </tr>
            <tr>
              <th className="px-4 py-3">Starting/peak watts</th>
              <td className="px-4 py-3">Temporary startup requirement</td>
              <td className="px-4 py-3">
                Generator peak output and appliance startup data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Generator nameplates distinguish rated running output from peak or
        starting output. This calculator is a planning estimate and does not
        guarantee compatibility, safe home connection, or performance under
        every load combination.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
          {
            href: "/tools/generator-wattage-calculator",
            label: "Generator Wattage Calculator",
          },
          {
            href: "/tools/generator-runtime-calculator",
            label: "Generator Runtime Calculator",
          },
          {
            href: "/tools/solar-inverter-size-calculator",
            label: "Solar Inverter Size Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function WattageContent() {
  const faqs = [
    {
      question: "What does this Generator Wattage Calculator calculate?",
      answer:
        "It accepts running watts, starting watts, and safety headroom. It reports running watts with headroom, the starting surge requirement, and estimated peak watts.",
    },
    {
      question: "Does this calculator use volts, amps, phase, or power factor?",
      answer:
        "No. Those are not inputs in the current Generator Wattage Calculator. Enter running and starting watt values from the equipment or load information.",
    },
    {
      question: "How is the starting surge calculated?",
      answer:
        "The calculator uses max(0, starting watts − running watts). It does not add all starting watt values together.",
    },
    {
      question: "Does the result replace generator nameplate information?",
      answer:
        "No. Compare the estimate with the generator&apos;s rated running and peak outputs and confirm the load requirements with equipment documentation.",
    },
  ];
  return (
    <Shell labelledBy="generator-wattage-guide">
      <p className="eyebrow">Generator wattage guide</p>
      <h2 id="generator-wattage-guide" className="mt-2 text-3xl font-black">
        Compare running and starting watts
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        This page documents the current calculator exactly. It does not
        calculate watts from volts, amps, phase, or power factor; its inputs are
        running watts, starting watts, and safety headroom.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          starting surge = max(0, starting watts − running watts)
        </p>
        <p className="mt-2 font-mono text-sm">
          running capacity = running watts × (1 + headroom ÷ 100)
        </p>
        <p className="mt-2 font-mono text-sm">
          estimated peak = running watts + starting surge
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">
            Resistive-style load:
          </strong>{" "}
          1,500 running watts and 1,500 starting watts produce 0 W starting
          surge. With 20% headroom, the running capacity estimate is 1,800 W and
          estimated peak is 1,500 W.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">
            Motor-style load:
          </strong>{" "}
          800 running watts and 2,000 starting watts produce a 1,200 W starting
          surge. With 20% headroom, the running capacity estimate is 960 W and
          estimated peak is 2,000 W.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Practical considerations</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Calculated watts are only one part of generator loading. Startup timing,
        motor characteristics, voltage requirements, load balance, and the
        generator&apos;s nameplate ratings also matter. Use equipment labels
        when available and keep continuous and peak ratings separate.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/generator-size-calculator",
            label: "Generator Size Calculator",
          },
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
          {
            href: "/tools/watts-to-amps-calculator",
            label: "Watts to Amps Calculator",
          },
        ]}
      />
    </Shell>
  );
}

function RuntimeContent() {
  const faqs = [
    {
      question: "What formula does the runtime calculator use?",
      answer: "Runtime equals fuel available divided by fuel consumption rate.",
    },
    {
      question: "Why does load affect actual runtime?",
      answer:
        "A generator engine normally consumes fuel differently at different load percentages. This calculator asks for a consumption rate, so use a rate that matches the generator model and operating condition when possible.",
    },
    {
      question: "What happens if the rate is zero?",
      answer:
        "The current implementation returns zero rather than displaying an infinite runtime.",
    },
    {
      question: "Is the runtime guaranteed?",
      answer:
        "No. Fuel type, load, engine condition, temperature, environment, and manufacturer data can change actual runtime.",
    },
  ];
  return (
    <Shell labelledBy="generator-runtime-guide">
      <p className="eyebrow">Generator runtime guide</p>
      <h2 id="generator-runtime-guide" className="mt-2 text-3xl font-black">
        Estimate runtime from fuel and consumption rate
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        The current calculator uses two inputs: fuel available in gallons and
        fuel consumption rate in gallons per hour. It does not infer a universal
        rate from generator size or load.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          runtime hours = fuel gallons ÷ fuel gallons per hour
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          A zero or invalid rate returns zero in the current utility so the page
          never reports infinite runtime.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Example 1:</strong> 5
          gallons ÷ 0.5 gallons per hour = 10 hours.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Example 2:</strong> 12
          gallons ÷ 0.75 gallons per hour = 16 hours.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">
        What changes actual runtime?
      </h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Load percentage, generator efficiency, engine condition, fuel type,
        temperature, altitude, maintenance, and the manufacturer&apos;s
        fuel-consumption data can all affect real runtime. Use a model-specific
        rate rather than treating these examples as universal performance
        claims.
      </p>
      <h3 className="mt-10 text-2xl font-black">
        Illustrative reference table
      </h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">
            Mathematically derived runtime examples
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Fuel available</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Estimated runtime</th>
            </tr>
          </thead>
          <tbody>
            {[
              [5, 0.5],
              [12, 0.75],
              [20, 1],
            ].map(([fuel, rate]) => (
              <tr
                key={`${fuel}-${rate}`}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th className="px-4 py-3">{fuel} gal</th>
                <td className="px-4 py-3">{rate} gal/hr</td>
                <td className="px-4 py-3">{(fuel / rate).toFixed(1)} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/generator-fuel-consumption-calculator",
            label: "Generator Fuel Consumption Calculator",
          },
          {
            href: "/tools/generator-size-calculator",
            label: "Generator Size Calculator",
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

function FuelContent() {
  const faqs = [
    {
      question: "What does this calculator estimate?",
      answer:
        "It estimates total fuel used by multiplying an entered fuel consumption rate by operating time.",
    },
    {
      question: "What inputs are used?",
      answer:
        "The current calculator uses fuel consumption rate in gallons per hour and operating time in hours.",
    },
    {
      question: "Is the rate universal?",
      answer:
        "No. Consumption depends on generator model, size, fuel type, load, and operating conditions. Use manufacturer data or a measured rate when possible.",
    },
    {
      question: "Why might actual fuel use differ?",
      answer:
        "Load changes, engine condition, temperature, environment, maintenance, and operating duration can all affect real consumption.",
    },
  ];
  return (
    <Shell labelledBy="generator-fuel-guide">
      <p className="eyebrow">Generator fuel guide</p>
      <h2 id="generator-fuel-guide" className="mt-2 text-3xl font-black">
        Estimate fuel use from a consumption rate
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        The current calculator estimates fuel consumed over an operating period.
        Enter a consumption rate from the generator documentation or a measured
        condition rather than relying on an invented universal constant.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula and inputs</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">
          fuel gallons = fuel rate gallons per hour × operating hours
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          The calculator accepts only fuel consumption rate and operating time.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Example 1:</strong> 0.5
          gal/hr × 8 hours = 4 gallons estimated.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Example 2:</strong> 0.75
          gal/hr × 12 hours = 9 gallons estimated.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">
        Estimated versus real consumption
      </h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        A manufacturer-rated rate may describe a specific load or test
        condition. Real consumption changes with generator load, generator size,
        fuel type, engine condition, temperature, environment, and operating
        duration. This page does not invent or assume a fuel-efficiency
        constant.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/generator-runtime-calculator",
            label: "Generator Runtime Calculator",
          },
          {
            href: "/tools/generator-size-calculator",
            label: "Generator Size Calculator",
          },
          {
            href: "/tools/generator-wattage-calculator",
            label: "Generator Wattage Calculator",
          },
        ]}
      />
    </Shell>
  );
}

export function GeneratorCalculatorContent({
  slug,
}: {
  slug: GeneratorCalculatorSlug;
}) {
  if (slug === "generator-size-calculator") return <SizeContent />;
  if (slug === "generator-wattage-calculator") return <WattageContent />;
  if (slug === "generator-runtime-calculator") return <RuntimeContent />;
  return <FuelContent />;
}
