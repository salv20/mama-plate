import { Check, HeartHandshake } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { IconBox } from "../ui/IconBox";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const points = [
  "Every tip shows where it comes from and when it was last reviewed.",
  "General nutrition education only. It never diagnoses or replaces your clinician.",
  "If something is not right, it points you to a clinician straight away.",
];

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-20 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Safety first"
            title="Here to support your clinic visits, not replace them"
          />
          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-muted">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <Card className="border-sage-100 bg-sage-50 p-6 sm:p-8">
            <IconBox icon={HeartHandshake} tone="sage" className="bg-white" />
            <h3 className="mt-2 text-2xl font-bold text-ink">
              Know the danger signs
            </h3>
            <p className="mt-3 leading-relaxed font-semibold text-muted">
              Some symptoms need a clinician right away. Read the signs now so
              you know what to look for.
            </p>
            <Button href="/urgent-care" variant="secondary" className="mt-4">
              See the danger signs
            </Button>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
