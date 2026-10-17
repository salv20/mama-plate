export function EmptySlotCard({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-blush-200 bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-blush-600">{label}</p>
      <p className="mt-3 leading-relaxed text-muted">
        No meal fits your choices for this one. Please ask your clinician or midwife for ideas.
      </p>
    </div>
  );
}
