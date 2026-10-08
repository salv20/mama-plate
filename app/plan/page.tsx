import type { Metadata } from "next";
import { PlanWizard } from "../component/plan/Container";
import { Container } from "../component/ui/Container";

export const metadata: Metadata = { title: "Plan my day" };

export default function PlanPage() {
  return (
    <Container className="py-10 sm:py-16">
      <PlanWizard />
    </Container>
  );
}
