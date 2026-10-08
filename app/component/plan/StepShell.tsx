export function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 leading-relaxed text-muted">{description}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}
