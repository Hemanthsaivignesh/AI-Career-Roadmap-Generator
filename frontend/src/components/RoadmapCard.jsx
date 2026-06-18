import { CheckCircle2, Circle } from "lucide-react";

export default function RoadmapCard({ roadmap, progress, onToggle, t }) {
  const milestones = roadmap?.weekly_milestones || [];

  return (
    <section className="panel p-4">
      <h2 className="mb-3 text-base font-bold text-ink dark:text-white">{t.roadmap}</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {(roadmap?.stages || []).map((stage) => (
          <div key={stage.level} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
            <div className="text-sm font-black text-ember">{stage.level}</div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{stage.focus}</div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{stage.topics?.join(" / ")}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 max-h-96 space-y-2 overflow-auto pr-1">
        {milestones.map((item) => {
          const done = progress?.items?.[item.id] ?? item.completed;
          return (
            <button
              key={item.id}
              className="flex w-full items-start gap-3 rounded-md border border-slate-200 p-3 text-left transition hover:border-mint dark:border-slate-800"
              onClick={() => onToggle(item.id, !done)}
              type="button"
            >
              {done ? <CheckCircle2 className="mt-0.5 text-mint" size={18} /> : <Circle className="mt-0.5 text-slate-400" size={18} />}
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Week {item.week}: {item.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.topics?.join(", ")} • {item.estimated_hours}h</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
