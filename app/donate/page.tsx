import Link from "next/link";
import { Container } from "../component/ui/Container";
import { DonationForm } from "../component/donate/DonationForm";
import DonationFaq from "../component/donate/DonationFaq";

export const metadata = {
  title: "Support Our Mission | Donate",
  description:
    "Help us keep maternal and pregnancy nutrition resources free and accessible for all mothers.",
};

export default function DonatePage() {
  return (
    <main className="bg-slate-50 py-12 ">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blush-100 px-3.5 py-1 text-xs font-semibold text-blush-700">
            Make an Impact
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl">
            Empower Healthy Beginnings for <br className="hidden sm:block" />{" "}
            Every Mother
          </h1>
          <p className="mt-2 leading-relaxed text-muted sm:text-lg font-semibold italic">
            We are dedicated to offering accessible, evidence-based nutrition
            education during pregnancy. Your support ensures that every mother
            gets the vital guidance she deserves, free of charge.
          </p>
        </div>

        <DonationForm />

        <DonationFaq />

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            &larr; Return to main site
          </Link>
        </div>
      </Container>
    </main>
  );
}
