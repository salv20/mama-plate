import { ClipboardList, HeartPulse, Utensils } from "lucide-react";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { IconBox } from "../ui/IconBox";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const steps = [
  {
    icon: HeartPulse,
    title: "Tell us about you",
    text: "Your stage of pregnancy, any allergies and a budget that feels right.",
  },
  {
    icon: Utensils,
    title: "Get your day of meals",
    text: "Five simple meals and snacks made from familiar, affordable foods.",
  },
  {
    icon: ClipboardList,
    title: "Know what to avoid",
    text: "A clear list of foods to avoid or limit, with a reminder to ask your clinician.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-10 sm:py-14 ">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Your plan in about a minute"
            description="Four quick questions, then your day of meals."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <IconBox icon={step.icon} />
                <p className="mt-4 text-sm font-bold text-blush-600">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 leading-relaxed text-muted font-semibold">
                  {step.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
