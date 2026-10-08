import { TriangleAlert } from "lucide-react";

export function UrgentAlert() {
  return (
    <div className="mt-10 flex gap-4 rounded-3xl bg-blush-600 p-6 text-white sm:p-8">
      <TriangleAlert className="mt-1 h-6 w-6 shrink-0" />
      <div>
        <h2 className="text-xl font-bold">
          If you notice any of these signs, go now
        </h2>
        <p className="mt-2 leading-relaxed text-blush-100">
          Go to the nearest hospital or health centre straight away. Do not wait
          for your next appointment, and do not wait to see if it gets better.
        </p>
      </div>
    </div>
  );
}
