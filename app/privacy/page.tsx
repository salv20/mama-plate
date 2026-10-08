import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Card } from "../component/ui/Card";
import { Container } from "../component/ui/Container";
import { PageHeader } from "../component/layout/PageHeader";
import { LegalSection } from "../component/legal/LegalSection";
import {
  PRIVACY_SECTIONS,
  PRIVACY_SUMMARY,
  PRIVACY_UPDATED,
} from "@/app/lib/content/privacy";
import { site } from "@/app/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Privacy"
          title="Your privacy, in plain words"
          description={`Last updated ${PRIVACY_UPDATED}.`}
        />

        <Card className="mt-10 border-sage-100 bg-sage-50">
          <h2 className="text-xl font-bold">The short version</h2>
          <ul className="mt-4 space-y-3">
            {PRIVACY_SUMMARY.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-sage-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-6 divide-y divide-line">
          {PRIVACY_SECTIONS.map((section) => (
            <LegalSection key={section.title} {...section} />
          ))}
          <section className="py-8">
            <h2 className="text-xl font-bold text-ink">Contact us</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Questions about this page? Email{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-semibold text-blush-700 underline-offset-4 hover:underline"
              >
                {site.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
