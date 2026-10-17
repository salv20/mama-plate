import { InlineNote } from "../ui/InlineNote";
import type { PlanOk } from "@/app/lib/meal-planner/types";

// Honest messages about this plan: draft content, missing options, unusual answers.
export function PlanNotices({
  plan,
  noContent,
}: {
  plan: PlanOk;
  noContent: boolean;
}) {
  const hasDraft = plan.items.some((item) => item.meal.status === "DRAFT");

  const messages = [
    ...(noContent ? ["No approved meal content is available yet."] : []),
    ...(hasDraft
      ? [
          "Draft content for testing. A clinician has not reviewed these meals yet.",
        ]
      : []),
    ...plan.notices,
    ...plan.unmetRules.map((rule) => rule.message),
  ];

  return (
    <div>
      {messages.map((message) => (
        <InlineNote key={message}>{message}</InlineNote>
      ))}
    </div>
  );
}
