import { Card } from "./component/ui/Card";
import { Badge } from "./component/ui/Badge";

const meals = [
  { slot: "Breakfast", name: "Pap with plain moi moi", dot: "bg-blush-500" },
  { slot: "Lunch", name: "Stewed beans with plantain", dot: "bg-sage-600" },
  {
    slot: "Dinner",
    name: "Rice, tomato stew and vegetables",
    dot: "bg-blush-500",
  },
];

// A static preview of the result screen, shown in the hero.
export function PlanPreviewCard() {
  return (
    <Card className="p-6 shadow-[0_20px_40px_-20px_rgba(43,31,39,0.25)] sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-ink">Today&apos;s plan</h2>
        <Badge tone="sage">Second trimester</Badge>
      </div>

      <ul className="mt-5 space-y-3">
        {meals.map((meal) => (
          <li
            key={meal.slot}
            className="flex items-center gap-4 rounded-2xl bg-cream p-4"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meal.dot}`} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {meal.slot}
              </p>
              <p className="mt-0.5 font-semibold text-ink">{meal.name}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
        Avoids <span className="font-semibold text-ink">groundnut</span> and{" "}
        <span className="font-semibold text-ink">egg</span>
      </p>
    </Card>
  );
}
