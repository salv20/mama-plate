import { Ban, TriangleAlert } from "lucide-react";
import { Card } from "../ui/Card";
import { IconBox } from "../ui/IconBox";
import { MOCK_AVOID } from "@/app/lib/mock-plan";

function AvoidList({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: typeof Ban;
  tone: "blush" | "sage";
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <IconBox icon={icon} tone={tone} className="h-10 w-10 rounded-xl" />
        <h3 className="font-bold text-ink">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-500" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AvoidPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AvoidList
        title="Foods to avoid"
        items={MOCK_AVOID.avoid}
        icon={Ban}
        tone="blush"
      />
      <AvoidList
        title="Foods to limit"
        items={MOCK_AVOID.limit}
        icon={TriangleAlert}
        tone="sage"
      />
    </div>
  );
}
