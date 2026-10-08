import type { Metadata } from "next";
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { Container } from "../component/ui/Container";
import { PageHeader } from "../component/layout/PageHeader";
import { DangerSignGrid } from "../component/urgent/DangerSignGrid";
import { UrgentAlert } from "../component/urgent/UrgentAlert";

export const metadata: Metadata = { title: "When to see a clinician urgently" };

export default function UrgentCarePage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Important"
          title="When to see a clinician urgently"
          description="Most pregnancies go well, but some signs mean you and your baby need help quickly. Read them now so you know what to look for."
        />

        <UrgentAlert />
        <DangerSignGrid />

        <Card className="mt-10 border-sage-100 bg-sage-50">
          <h2 className="text-xl font-bold">Not sure if it is serious?</h2>
          <p className="mt-2 leading-relaxed text-muted">
            It is always okay to go to your clinic and ask. This list does not
            cover every warning sign. If something feels wrong, trust yourself
            and get checked.
          </p>
          <Button href="/plan" variant="secondary" className="mt-5">
            Back to meal planner
          </Button>
        </Card>
      </div>
    </Container>
  );
}
