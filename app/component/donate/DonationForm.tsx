"use client";

import { useState } from "react";

const predefinedAmounts = [10, 25, 50, 100, 250];

const impactTiers = [
  {
    amount: "$25",
    title: "Sponsor a Meal Plan",
    description:
      "Provides customized, trimester-specific daily meal planning guides for expectant mothers in need.",
  },
  {
    amount: "$50",
    title: "Educational Resources",
    description:
      "Funds the creation of evidence-based, medically verified nutrition breakdown charts and guides.",
  },
  {
    amount: "$100",
    title: "Community Reach",
    description:
      "Expands access to our digital tools to underserved healthcare clinics and maternal care centers.",
  },
];

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAmountChange = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
      {/* Donation Form Card */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
        <h2 className="text-xl font-bold ">Choose Your Contribution</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a frequency and an amount to donate.
        </p>

        <form
          className="mt-6 flex flex-col gap-6"
          action="/api/checkout"
          method="POST"
        >
          {/* Frequency Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Donation Frequency
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center justify-center rounded-lg border border-line p-3 text-sm font-semibold text-slate-700 transition-colors has-[:checked]:border-blush-700 has-[:checked]:bg-blush-50 has-[:checked]:text-blush-700">
                <input
                  type="radio"
                  name="frequency"
                  value="one-time"
                  className="sr-only"
                  defaultChecked
                />
                One-Time
              </label>
              <label className="flex cursor-pointer items-center justify-center rounded-lg border border-line p-3 text-sm font-semibold text-slate-700 transition-colors has-[:checked]:border-blush-700 has-[:checked]:bg-blush-50 has-[:checked]:text-blush-700">
                <input
                  type="radio"
                  name="frequency"
                  value="monthly"
                  className="sr-only"
                />
                Monthly
              </label>
            </div>
          </div>

          {/* Amount Selection Grid */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Select Amount (USD)
            </label>
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {predefinedAmounts.map((amt) => (
                <label
                  key={amt}
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-line p-3 text-sm font-semibold text-slate-700 transition-colors has-[:checked]:border-blush-700 has-[:checked]:bg-blush-50 has-[:checked]:text-blush-700"
                >
                  <input
                    type="radio"
                    name="amount"
                    value={amt}
                    className="sr-only"
                    checked={selectedAmount === amt}
                    onChange={() => handleAmountChange(amt)}
                  />
                  ${amt}
                </label>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <label
              htmlFor="custom-amount"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Or Custom Amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                $
              </div>
              <input
                type="number"
                name="customAmount"
                id="custom-amount"
                min="1"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
                className="block w-full rounded-lg border border-line py-2.5 pl-7 pr-4 text-sm  placeholder-slate-400 outline-none focus:border-line focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Donor Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-xs font-semibold text-slate-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                required
                className="mt-1 block w-full rounded-lg border border-line p-2.5 text-sm  focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-xs font-semibold text-slate-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                required
                className="mt-1 block w-full rounded-lg border border-line p-2.5 text-sm  focus:outline-none focus:ring-0"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-lg border border-line p-2.5 text-sm  focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blush-700 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blush-700 focus:ring-offset-2"
          >
            Proceed to Secure Payment (${selectedAmount || customAmount || 0})
          </button>

          <p className="text-center text-xs text-slate-500">
            🔒 Secure 256-bit SSL encrypted payment processing.
          </p>
        </form>
      </div>

      {/* Impact Sidebar */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold ">Your Impact</h2>
          <p className="mt-2 text-sm text-slate-600">
            Every dollar contributes directly to creating evidence-based
            nutritional guides for mothers worldwide.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            {impactTiers.map((tier) => (
              <div key={tier.amount} className="flex items-start gap-4">
                <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-blush-100 text-sm font-bold text-blush-700">
                  {tier.amount}
                </div>
                <div>
                  <h3 className="text-sm font-semibold ">{tier.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Support Box */}
        <div className="rounded-2xl border border-line bg-slate-900 p-6 text-white shadow-sm sm:p-8">
          <h3 className="text-lg font-bold">
            Need assistance with your donation?
          </h3>
          <p className="mt-2 text-xs text-slate-200">
            For bank transfers, corporate sponsorships, or donor inquiries,
            contact our team directly.
          </p>
          <a
            href="mailto:salvationamoke@gmail.com"
            className="mt-4 inline-block text-xs font-semibold text-blush-200 underline underline-offset-2 hover:text-white"
          >
            Contact salvationamoke@gmail.com &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
