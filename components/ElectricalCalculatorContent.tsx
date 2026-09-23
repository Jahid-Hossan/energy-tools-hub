import Link from "next/link";

type Faq = { question: string; answer: string };
export type ElectricalCalculatorSlug =
  | "amps-to-watts-calculator"
  | "volts-amps-watts-calculator"
  | "appliance-wattage-calculator"
  | "kwh-calculator"
  | "electricity-cost-calculator";

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
function ContentShell({
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

function AmpsToWattsContent() {
  const faqs = [
    {
      question: "How do I convert amps to watts?",
      answer:
        "Multiply amps by volts for DC. For single-phase AC, multiply amps by volts and power factor. For three-phase AC, multiply amps by √3, line-to-line volts, and power factor.",
    },
    {
      question: "Why does power factor affect watts?",
      answer:
        "AC power factor represents how effectively current is converted into real power. A lower power factor means the same current and voltage produce fewer real watts.",
    },
    {
      question: "What voltage does the three-phase formula use?",
      answer: "This page treats the three-phase input as line-to-line voltage.",
    },
    {
      question: "Can I use this result as an equipment rating?",
      answer:
        "Use it as a calculation estimate. Confirm equipment nameplate data, system type, voltage, and manufacturer requirements before making an installation decision.",
    },
  ];
  return (
    <ContentShell labelledBy="amps-to-watts-guide">
      <p className="eyebrow">Amps to watts guide</p>
      <h2 id="amps-to-watts-guide" className="mt-2 text-3xl font-black">
        How to convert amps to watts
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Watts describe real electrical power. Amps describe current. To convert
        current into power, combine the current with voltage and, for AC
        systems, power factor and phase configuration.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formulas by system type</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">DC</h4>
          <p className="mt-2 font-mono text-sm">W = V × A</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">Single-phase AC</h4>
          <p className="mt-2 font-mono text-sm">W = V × A × PF</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">Three-phase AC</h4>
          <p className="mt-2 font-mono text-sm">W = √3 × V × A × PF</p>
        </div>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">DC:</strong> 10 A × 120 V
          = 1,200 W.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Single-phase AC:</strong>{" "}
          10 A × 120 V × 0.8 PF = 960 W.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Three-phase AC:</strong>{" "}
          √3 × 10 A × 240 V × 0.9 PF ≈ 3,741 W.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Quick reference at PF = 1</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">
            Watts from common current and voltage combinations
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Amps</th>
              <th className="px-4 py-3">120 V single-phase</th>
              <th className="px-4 py-3">240 V single-phase</th>
            </tr>
          </thead>
          <tbody>
            {[5, 10, 15, 20].map((amps) => (
              <tr
                key={amps}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th scope="row" className="px-4 py-3">
                  {amps} A
                </th>
                <td className="px-4 py-3">{amps * 120} W</td>
                <td className="px-4 py-3">{amps * 240} W</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="mt-10 text-2xl font-black">Practical uses and limits</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        This conversion helps compare a current reading with a known voltage,
        estimate load power, and cross-check equipment documentation. It does
        not establish wiring, breaker, or connection requirements.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/watts-to-amps-calculator",
            label: "Watts to Amps Calculator",
          },
          {
            href: "/tools/volts-amps-watts-calculator",
            label: "Volts Amps Watts Calculator",
          },
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
        ]}
      />
    </ContentShell>
  );
}

function VoltsAmpsWattsContent() {
  const faqs = [
    {
      question: "What is the basic volts, amps, and watts relationship?",
      answer:
        "For a simple DC or unity-power-factor case, power equals voltage multiplied by current: P = V × I.",
    },
    {
      question: "How do I solve for volts?",
      answer:
        "When power and current are known, divide power by current: V = P ÷ I.",
    },
    {
      question: "How do I solve for amps?",
      answer:
        "When power and voltage are known, divide power by voltage: I = P ÷ V.",
    },
    {
      question: "When do AC calculations need power factor?",
      answer:
        "Use power factor for AC loads when it is relevant or available from the equipment documentation. Three-phase AC also uses the √3 phase factor in this calculator.",
    },
  ];
  return (
    <ContentShell labelledBy="volts-amps-watts-guide">
      <p className="eyebrow">Electrical relationship guide</p>
      <h2 id="volts-amps-watts-guide" className="mt-2 text-3xl font-black">
        How volts, amps, and watts relate
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Voltage is electrical potential, amps are current, and watts are real
        power. This calculator lets you choose the unknown and keeps the other
        values visible so the relationship is easy to check.
      </p>
      <h3 className="mt-10 text-2xl font-black">Core formulas</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">Find power</h4>
          <p className="mt-2 font-mono text-sm">P = V × I</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">Find voltage</h4>
          <p className="mt-2 font-mono text-sm">V = P ÷ I</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h4 className="font-black">Find current</h4>
          <p className="mt-2 font-mono text-sm">I = P ÷ V</p>
        </div>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Power:</strong> 120 V ×
          10 A = 1,200 W.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Voltage:</strong> 1,500 W
          ÷ 12.5 A = 120 V.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Current:</strong> 2,400 W
          ÷ 120 V = 20 A.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">AC considerations</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        For AC loads, select the appropriate system type and provide power
        factor when applicable. Single-phase AC uses P = V × I × PF. Three-phase
        AC uses P = √3 × V × I × PF, with line-to-line voltage as the input
        assumption.
      </p>
      <h3 className="mt-10 text-2xl font-black">Practical uses</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Use the relationship to check a nameplate, translate a known load into
        current, estimate power from a current measurement, or cross-check
        another electrical calculation. Results are estimates and should be
        checked against equipment documentation.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/watts-to-amps-calculator",
            label: "Watts to Amps Calculator",
          },
          {
            href: "/tools/amps-to-watts-calculator",
            label: "Amps to Watts Calculator",
          },
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
        ]}
      />
    </ContentShell>
  );
}

function ApplianceWattageContent() {
  const faqs = [
    {
      question: "What are running watts?",
      answer:
        "Running watts are the power an appliance uses while operating normally.",
    },
    {
      question: "What are startup or surge watts?",
      answer:
        "Startup watts are the temporary additional demand some motor-driven or compressor-based equipment can require when starting.",
    },
    {
      question: "Should I use this estimate instead of an appliance label?",
      answer:
        "No. Use the appliance nameplate or manufacturer documentation when available. This calculator estimates wattage from voltage, current, power factor, and system type.",
    },
    {
      question: "How does appliance wattage relate to generator sizing?",
      answer:
        "Running wattage contributes to the continuous load, while startup demand may affect the peak requirement. Generator sizing should keep those requirements separate.",
    },
  ];
  return (
    <ContentShell labelledBy="appliance-wattage-guide">
      <p className="eyebrow">Appliance planning guide</p>
      <h2 id="appliance-wattage-guide" className="mt-2 text-3xl font-black">
        Estimate appliance wattage from electrical values
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Enter the voltage and current from an appliance nameplate when
        available. For AC equipment, the system type and power factor affect the
        estimate. A nameplate value is more useful than a generic household
        assumption.
      </p>
      <h3 className="mt-10 text-2xl font-black">
        Running watts and startup watts
      </h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="sr-only">
            Difference between running and startup wattage
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Meaning</th>
              <th className="px-4 py-3">Where it matters</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--line)]">
              <th className="px-4 py-3">Running watts</th>
              <td className="px-4 py-3">Normal operating demand</td>
              <td className="px-4 py-3">
                Continuous generator or inverter load
              </td>
            </tr>
            <tr>
              <th className="px-4 py-3">Startup/surge watts</th>
              <td className="px-4 py-3">Temporary starting demand</td>
              <td className="px-4 py-3">
                Motors, compressors, pumps, and similar loads
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="mt-10 text-2xl font-black">Formula and examples</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        For DC, watts = volts × amps. For single-phase AC, watts = volts × amps
        × power factor. For three-phase AC, watts = √3 × volts × amps × power
        factor.
      </p>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">DC example:</strong> 12 V
          × 5 A = 60 W.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">
            Single-phase AC example:
          </strong>{" "}
          120 V × 10 A × 0.8 PF = 960 W.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Practical planning</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Use this page to translate measured or labeled electrical values into
        watts before comparing loads. Do not treat a generic estimate as a
        universal manufacturer specification or as proof that a generator,
        inverter, wiring system, or transfer setup is compatible.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/generator-size-calculator",
            label: "Generator Size Calculator",
          },
          {
            href: "/tools/solar-inverter-size-calculator",
            label: "Solar Inverter Size Calculator",
          },
          {
            href: "/tools/volts-amps-watts-calculator",
            label: "Volts Amps Watts Calculator",
          },
        ]}
      />
    </ContentShell>
  );
}

function KwhContent() {
  const faqs = [
    {
      question: "What is the difference between watts and kWh?",
      answer:
        "Watts measure instantaneous power. A kilowatt-hour measures energy used over time.",
    },
    {
      question: "How do I calculate kWh?",
      answer:
        "Multiply watts by hours and divide by 1,000. For repeated daily use, multiply by the number of days in the selected period.",
    },
    {
      question: "How do I estimate monthly energy?",
      answer:
        "Enter the daily hours and the number of days in your period. The calculator multiplies watts × hours per day × days ÷ 1,000.",
    },
    {
      question: "Does kWh tell me the appliance's peak power?",
      answer:
        "No. kWh measures accumulated energy and does not describe startup or instantaneous power demand.",
    },
  ];
  return (
    <ContentShell labelledBy="kwh-guide">
      <p className="eyebrow">Energy use guide</p>
      <h2 id="kwh-guide" className="mt-2 text-3xl font-black">
        Understand watts, kilowatts, and kWh
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        Watts describe power at a moment in time. Kilowatts are watts divided by
        1,000. A kilowatt-hour, or kWh, measures how much energy a load uses
        over a period.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">kWh = (watts × hours) ÷ 1,000</p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          For a repeated daily load, multiply the daily result by the number of
          days in the selected period.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Daily:</strong> A 1,000 W
          load used for 2 hours uses (1,000 × 2) ÷ 1,000 = 2 kWh.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">30-day period:</strong>{" "}
          The same load used 2 hours daily uses 2 × 30 = 60 kWh.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Example energy table</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="sr-only">
            Example energy usage by power and daily hours
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Load</th>
              <th className="px-4 py-3">Hours/day</th>
              <th className="px-4 py-3">Daily kWh</th>
            </tr>
          </thead>
          <tbody>
            {[
              [100, 8],
              [500, 4],
              [1000, 2],
            ].map(([watts, hours]) => (
              <tr
                key={`${watts}-${hours}`}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th className="px-4 py-3">{watts} W</th>
                <td className="px-4 py-3">{hours}</td>
                <td className="px-4 py-3">
                  {((watts * hours) / 1000).toFixed(2)} kWh
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="mt-10 text-2xl font-black">Practical uses</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        Use kWh estimates to compare schedules, understand energy use over a
        billing period, and provide the energy input for an electricity-cost
        estimate. The result is not an instantaneous wattage or startup rating.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          {
            href: "/tools/electricity-cost-calculator",
            label: "Electricity Cost Calculator",
          },
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
        ]}
      />
    </ContentShell>
  );
}

function ElectricityCostContent() {
  const faqs = [
    {
      question: "How is electricity cost calculated?",
      answer:
        "Multiply energy used in kWh by the electricity rate in dollars per kWh.",
    },
    {
      question: "What rate should I enter?",
      answer:
        "Enter the rate shown on your utility bill or plan. Rates vary by provider, location, time, and billing structure.",
    },
    {
      question: "Why might my actual bill be different?",
      answer:
        "Bills can include taxes, fixed fees, tiers, demand charges, delivery charges, minimums, and other utility-specific adjustments that are outside this simple estimate.",
    },
    {
      question: "Can I estimate a monthly cost?",
      answer:
        "Yes. Enter average watts, hours per day, and the number of days in your period, then enter the applicable rate.",
    },
  ];
  return (
    <ContentShell labelledBy="electricity-cost-guide">
      <p className="eyebrow">Electricity cost guide</p>
      <h2 id="electricity-cost-guide" className="mt-2 text-3xl font-black">
        Estimate electricity cost from kWh and your rate
      </h2>
      <p className="mt-4 leading-7 text-[var(--ink-muted)]">
        This calculator first estimates energy use from power and time, then
        applies your electricity rate. Enter your own rate instead of treating a
        default as universal.
      </p>
      <h3 className="mt-10 text-2xl font-black">Formula</h3>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-5">
        <p className="font-mono text-sm">cost = kWh × electricity rate</p>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          The page estimates kWh from watts × hours per day × days ÷ 1,000
          before multiplying by the rate.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
      <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Daily:</strong> 1,000 W
          used for 2 hours is 2 kWh. At $0.18/kWh, the estimate is $0.36 per
          day.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">30-day period:</strong> 2
          kWh daily for 30 days is 60 kWh. At $0.18/kWh, the energy-only
          estimate is $10.80.
        </p>
      </div>
      <h3 className="mt-10 text-2xl font-black">Example rate table</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">
            Example costs for 60 kWh at different entered rates
          </caption>
          <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3">Selected-period energy</th>
              <th className="px-4 py-3">Entered rate</th>
              <th className="px-4 py-3">Estimated energy cost</th>
            </tr>
          </thead>
          <tbody>
            {[0.15, 0.18, 0.25].map((rate) => (
              <tr
                key={rate}
                className="border-b border-[var(--line)] last:border-0"
              >
                <th className="px-4 py-3">60 kWh</th>
                <td className="px-4 py-3">${rate.toFixed(2)}/kWh</td>
                <td className="px-4 py-3">${(60 * rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="mt-10 text-2xl font-black">Limitations</h3>
      <p className="mt-3 leading-7 text-[var(--ink-muted)]">
        This is an energy-only estimate. Actual utility bills may include taxes,
        fixed service fees, tiered rates, demand charges, delivery charges,
        minimums, and other plan-specific items.
      </p>
      <FaqSection faqs={faqs} />
      <Related
        links={[
          { href: "/tools/kwh-calculator", label: "kWh Calculator" },
          {
            href: "/tools/appliance-wattage-calculator",
            label: "Appliance Wattage Calculator",
          },
          {
            href: "/tools/battery-runtime-calculator",
            label: "Battery Runtime Calculator",
          },
        ]}
      />
    </ContentShell>
  );
}

export function ElectricalCalculatorContent({
  slug,
}: {
  slug: ElectricalCalculatorSlug;
}) {
  if (slug === "amps-to-watts-calculator") return <AmpsToWattsContent />;
  if (slug === "volts-amps-watts-calculator") return <VoltsAmpsWattsContent />;
  if (slug === "appliance-wattage-calculator")
    return <ApplianceWattageContent />;
  if (slug === "kwh-calculator") return <KwhContent />;
  return <ElectricityCostContent />;
}
