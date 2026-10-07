"use client";

import { useState } from "react";

export function ToolFAQSection({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const id = `faq-answer-${index}`;
          return (
            <div
              key={index}
              className="rounded-2xl border border-[var(--line)] bg-white p-5"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={id}
                className="flex w-full items-center justify-between text-left font-bold focus:outline-none"
              >
                <span className="text-lg">{faq.question}</span>
                <span
                  className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--green)]"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div id={id} className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
