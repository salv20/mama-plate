import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";

export function CtaBanner() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-blush-600 px-6 py-14 text-center text-white sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blush-500/50"
            />
            <div
              aria-hidden
              className="absolute -bottom-12 -right-8 h-48 w-48 rounded-[2.5rem] bg-blush-700/40"
            />

            <div className="relative">
              <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to plan today&apos;s meals?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-blush-100">
                It takes about a minute. Nothing you enter is saved.
              </p>
              <Button href="/plan" variant="inverse" size="lg" className="mt-8">
                Plan my day
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
