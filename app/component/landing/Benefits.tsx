import { Lock, ShoppingBasket, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "../ui/Container";
import { IconBox } from "../ui/IconBox";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const benefits = [
  {
    icon: ShoppingBasket,
    tone: "blush",
    title: "Familiar foods",
    text: "Meals built from foods you already know and can find in the market.",
  },
  {
    icon: ShieldCheck,
    tone: "sage",
    title: "Allergy aware",
    text: "Pick the foods you cannot eat and they stay out of your plan.",
  },
  {
    icon: Wallet,
    tone: "sage",
    title: "Fits your budget",
    text: "Choose a budget level and get meals that match it.",
  },
  {
    icon: Lock,
    tone: "blush",
    title: "Private by design",
    text: "Your answers stay in your browser. We do not save them.",
  },
] as const;

export function Benefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-20 border-y border-line bg-white py-20 sm:py-24"
    >
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Why it helps"
            title="Simple, familiar and built for real life"
            description="No complicated charts or foods you cannot find. Just clear ideas for each day."
          />
        </Reveal>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {benefits.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className="flex gap-4"
            >
              <IconBox icon={item.icon} tone={item.tone} />
              <div>
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
