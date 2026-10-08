"use client";

import { useState } from "react";
import {
  HelpCircle,
  HeartHandshake,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const faqs = [
  {
    id: 0,
    question: "Are donations tax-deductible?",
    answer:
      "Yes, all contributions made directly through our official payment portal qualify for tax deduction where applicable. You will receive a formal receipt via email immediately after donating.",
    icon: HelpCircle,
  },
  {
    id: 1,
    question: "Where does my money go?",
    answer:
      "Your donation directly funds our digital platform development, medical expert reviews of our nutrition data, and outreach efforts to bring free resources to expecting families.",
    icon: HeartHandshake,
  },
  {
    id: 2,
    question: "Can I cancel a monthly recurring donation?",
    answer:
      "Absolutely. You can manage or cancel your recurring contribution at any time through the link provided in your initial receipt or by emailing support@example.com.",
    icon: RefreshCw,
  },
];

export const DonationFaq = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-20 border-t border-line pt-12">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-block rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold text-blush-800">
          Got Questions?
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
        {faqs.map((faq) => {
          const isOpen = openIndex === faq.id;
          const Icon = faq.icon;

          return (
            <div
              key={faq.id}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-blush-300 bg-white shadow-sm ring-1 ring-blush-200"
                  : "border-line bg-slate-50/50 hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-slate-900 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blush-50 text-blush-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>
                </div>

                {/* Animated Toggle Indicator */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 border-blush-700 bg-blush-700 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {/* Collapsible Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-5 pl-16">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationFaq;
