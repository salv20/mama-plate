import { Card } from "../ui/Card";
import { Reveal } from "../motion/Reveal";
import { DANGER_SIGNS } from "@/app/lib/content/danger-signs";

export function DangerSignGrid() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2">
      {DANGER_SIGNS.map((sign, index) => (
        <li key={sign.title}>
          <Reveal delay={(index % 2) * 0.08} className="h-full">
            <Card className="h-full p-5">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blush-600" />
                <div>
                  <h3 className="font-bold text-ink">{sign.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {sign.detail}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
