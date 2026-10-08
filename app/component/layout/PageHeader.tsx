import { Badge } from "../ui/Badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header>
      <Badge>{eyebrow}</Badge>
      <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
      {children}
    </header>
  );
}
