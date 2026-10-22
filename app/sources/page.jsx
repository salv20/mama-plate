import { ExternalLink } from "lucide-react";
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { Container } from "../component/ui/Container";
import { PageHeader } from "../component/layout/PageHeader";
import { getSources } from "@/app/lib/meal-planner/data";

export default function SourcesPage() {
  const sources = [...getSources()].sort((a, b) => b.year - a.year);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Sources"
          title="Sources & references"
          description="Every meal idea and food to avoid in Mama Plate is based on the national and international guidelines below."
        />

        <ul className="mt-4 space-y-4">
          {sources.map((source) => (
            <li key={source.id}>
              <Card>
                <p className="text-sm font-semibold text-muted">
                  {source.publisher} · {source.year}
                </p>
                <h2 className="mt-1 text-lg font-bold leading-snug">
                  {source.title}
                </h2>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blush-700 underline-offset-4 hover:underline"
                >
                  Read the source
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Card>
            </li>
          ))}
        </ul>

        <Card className="mt-10 border-sage-100 bg-sage-50">
          <h2 className="text-xl font-bold">A note on using this site</h2>
          <p className="mt-2 leading-relaxed text-muted">
            Mama Plate gives general nutrition education. It does not replace
            advice from your doctor or midwife, so check with them about your
            own needs.
          </p>
          <Button href="/plan" variant="secondary" className="mt-5">
            Plan my day
          </Button>
        </Card>
      </div>
    </Container>
  );
}
