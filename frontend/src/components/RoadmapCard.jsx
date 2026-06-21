import { Check, CheckCircle2, Circle, Clock3, Layers3 } from "lucide-react";

export default function RoadmapCard({ roadmap, progress, onToggle, t }) {
  const milestones = roadmap?.weekly_milestones || [];

  return (
    <section className="panel min-w-0 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label">{t.learningJourney}</p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-ink dark:text-white">{t.roadmap}</h2>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          <Layers3 size={14} /> {milestones.length} {t.milestones}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {(roadmap?.stages || []).map((stage, index) => (
          <div key={stage.level} className={`stage-card stage-${index + 1}`}>
            <div className="flex items-center justify-between">
              <span className="stage-index">0{index + 1}</span>
              <span className="text-[10px] font-black uppercase tracking-wider opacity-60">{stage.estimated_completion}</span>
            </div>
            <div className="mt-5 text-xs font-black uppercase tracking-[0.16em]">{stage.level}</div>
            <div className="mt-1 text-sm font-bold">{stage.focus}</div>
            <p className="mt-3 line-clamp-2 text-xs leading-5 opacity-70">{stage.topics?.join(" · ")}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h3 className="text-sm font-black text-ink dark:text-white">{t.weeklyMissions}</h3>
        <span className="text-xs font-semibold text-slate-400">{t.clickToComplete}</span>
      </div>
      <div className="roadmap-list mt-3 max-h-[540px] space-y-2.5 overflow-auto pr-1">
        {milestones.map((item, index) => {
          const done = progress?.items?.[item.id] ?? item.completed;
          return (
            <button
              key={item.id}
              className={`milestone-row ${done ? "is-done" : ""}`}
              onClick={() => onToggle(item.id, !done)}
              type="button"
            >
              <span className="milestone-week">{String(item.week).padStart(2, "0")}</span>
              <span className={`milestone-check ${done ? "is-done" : ""}`}>
                {done ? <Check size={15} /> : <Circle size={15} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-800 dark:text-slate-100">{item.title}</span>
                <span className="mt-1 block truncate text-xs text-slate-500 dark:text-slate-400">{item.topics?.join(" · ")}</span>
              </span>
              <span className="hidden items-center gap-1 text-xs font-bold text-slate-400 sm:flex">
                <Clock3 size={13} /> {item.estimated_hours}h
              </span>
              {done && <CheckCircle2 className="text-emerald-500" size={18} />}
            </button>
          );
        })}
      </div>
    </section>
  );
}
