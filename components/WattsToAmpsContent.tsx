import Link from "next/link";

const faqs = [
  {
    question: "How do I convert watts to amps?",
    answer:
      "Divide watts by volts for DC. For single-phase AC, divide watts by volts multiplied by power factor. For three-phase AC, divide watts by the square root of 3, volts, and power factor.",
  },
  {
    question: "What power factor should I use?",
    answer:
      "Use the power factor from the equipment documentation when available. Resistive loads are often close to 1, while motors, compressors, and other inductive loads can have lower power factors.",
  },
  {
    question: "Does the three-phase calculation use line-to-line voltage?",
    answer:
      "Yes. This calculator treats the three-phase AC voltage input as line-to-line voltage.",
  },
  {
    question: "Is the result a guaranteed equipment rating?",
    answer:
      "No. The result is a planning calculation. Confirm nameplate information, system voltage, power factor, and installation requirements with the equipment documentation and a qualified professional.",
  },
];

export function WattsToAmpsContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <section
      className="mt-12 border-t border-[var(--line)] pt-10"
      aria-labelledby="watts-to-amps-guide"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl">
        <p className="eyebrow">Watts to amps guide</p>
        <h2 id="watts-to-amps-guide" className="mt-2 text-3xl font-black">
          How to convert watts to amps
        </h2>
        <p className="mt-4 leading-7 text-[var(--ink-muted)]">
          Amps measure current. The current needed by a load depends on its
          power, voltage, system type, and, for AC equipment, power factor.
          Choose the matching system type in the calculator and use equipment
          nameplate values when available.
        </p>
        <h3 className="mt-10 text-2xl font-black">Formulas</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <h4 className="font-black">DC</h4>
            <p className="mt-2 font-mono text-sm">Amps = Watts ÷ Volts</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
              DC does not use AC power factor.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <h4 className="font-black">Single-phase AC</h4>
            <p className="mt-2 font-mono text-sm">
              Amps = Watts ÷ (Volts × PF)
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
              PF is power factor, from 0.01 to 1 in the calculator.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <h4 className="font-black">Three-phase AC</h4>
            <p className="mt-2 font-mono text-sm">
              Amps = Watts ÷ (√3 × Volts × PF)
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
              The voltage input is line-to-line voltage.
            </p>
          </div>
        </div>
        <h3 className="mt-10 text-2xl font-black">Worked examples</h3>
        <div className="mt-4 space-y-3 leading-7 text-[var(--ink-muted)]">
          <p>
            <strong className="text-[var(--foreground)]">DC:</strong> 1,200 W ÷
            120 V = 10 A.
          </p>
          <p>
            <strong className="text-[var(--foreground)]">
              Single-phase AC:
            </strong>{" "}
            1,200 W ÷ (120 V × 0.8 PF) = 12.5 A.
          </p>
          <p>
            <strong className="text-[var(--foreground)]">
              Three-phase AC:
            </strong>{" "}
            6,000 W ÷ (√3 × 240 V × 0.9 PF) ≈ 16.0 A.
          </p>
        </div>
        <h3 className="mt-10 text-2xl font-black">
          Watts-to-amps reference table
        </h3>
        <p className="mt-3 leading-7 text-[var(--ink-muted)]">
          These examples assume PF = 1. The 240 V three-phase column uses 240 V
          line-to-line voltage.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">
              Current in amps for common wattages and voltage systems
            </caption>
            <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
              <tr>
                <th className="px-4 py-3 font-bold">Watts</th>
                <th className="px-4 py-3 font-bold">120 V DC</th>
                <th className="px-4 py-3 font-bold">120 V single-phase</th>
                <th className="px-4 py-3 font-bold">240 V single-phase</th>
                <th className="px-4 py-3 font-bold">240 V three-phase</th>
              </tr>
            </thead>
            <tbody>
              {[100, 500, 1000, 1500, 3000].map((watts) => (
                <tr
                  key={watts}
                  className="border-b border-[var(--line)] last:border-0"
                >
                  <th scope="row" className="px-4 py-3 font-bold">
                    {watts.toLocaleString()} W
                  </th>
                  <td className="px-4 py-3">{(watts / 120).toFixed(2)} A</td>
                  <td className="px-4 py-3">{(watts / 120).toFixed(2)} A</td>
                  <td className="px-4 py-3">{(watts / 240).toFixed(2)} A</td>
                  <td className="px-4 py-3">
                    {(watts / (Math.sqrt(3) * 240)).toFixed(2)} A
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-10 text-2xl font-black">When power factor matters</h3>
        <p className="mt-3 leading-7 text-[var(--ink-muted)]">
          Power factor matters for AC loads because not all current contributes
          directly to real power. Use the manufacturer&apos;s value for motors,
          compressors, pumps, air conditioners, and other inductive or
          electronic loads. If no value is available, treat the result as an
          estimate rather than assuming the equipment will match the table.
        </p>
        <h3 className="mt-10 text-2xl font-black">Common applications</h3>
        <p className="mt-3 leading-7 text-[var(--ink-muted)]">
          This conversion is useful when checking appliance nameplates,
          estimating circuit current for a known load, comparing generator or
          inverter loads, and translating solar or battery system power into
          approximate current. It does not determine safe wiring, breaker, or
          home-connection requirements.
        </p>
        <h3 className="mt-10 text-2xl font-black">
          Frequently asked questions
        </h3>
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
        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--green)]">
          <Link href="/tools/amps-to-watts-calculator">
            Amps to Watts Calculator →
          </Link>
          <Link href="/tools/volts-amps-watts-calculator">
            Volts Amps Watts Calculator →
          </Link>
          <Link href="/tools/appliance-wattage-calculator">
            Appliance Wattage Calculator →
          </Link>
        </div>
      </div>
    </section>
  );
}
