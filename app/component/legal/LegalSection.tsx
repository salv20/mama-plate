export function LegalSection({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <section className="py-4">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      {body.map((paragraph) => (
        <p key={paragraph} className="mt-2 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
