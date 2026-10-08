"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { fadeUp, stagger } from "@/app/lib/motion";
import { HeroVisual } from "@/app/HeroVisual";

const points = ["Free to use", "No sign up", "Nothing you enter is saved"];

export function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-16 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <Badge tone="sage">
              <ShieldCheck className="h-3.5 w-3.5" />
              Private and free
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Meal ideas for a healthy pregnancy, planned around you.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Tell us your stage, any allergies and what you can spend. Get a
            simple day of familiar foods and a clear list of what to avoid.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button href="/plan" size="lg">
              Plan my day
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/#how-it-works" size="lg" variant="secondary">
              How it works
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
          >
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage-600" strokeWidth={3} />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <HeroVisual />
      </Container>
    </section>
  );
}
