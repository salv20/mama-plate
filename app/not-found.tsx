import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import { Button } from "./component/ui/Button";
import { Container } from "./component/ui/Container";
import { Float } from "./component/motion/Float";
import { Reveal } from "./component/motion/Reveal";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <Float>
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blush-100 text-blush-600">
          <Leaf className="h-9 w-9" />
        </span>
      </Float>

      <Reveal y={12} className="mt-8">
        <p className="text-sm font-bold uppercase tracking-wider text-blush-600">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          We could not find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          The link may be broken, or the page may have moved. Let us get you
          back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Go to home
          </Button>
          <Button href="/plan" size="lg" variant="secondary">
            Plan my day
          </Button>
        </div>
      </Reveal>
    </Container>
  );
}
