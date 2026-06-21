import { Flame, Target, Trophy } from "lucide-react";

export default function ProgressTracker({ progress, t }) {
  const percentage = progress?.percentage || 0;
  const completed = progress?.completed || 0;
  const total = progress?.total || 0;

  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="label">{t.momentum}</p>
          <h2 className="mt-1 text-lg font-black text-ink dark:text-white">{t.progress}</h2>
        </div>
        <span className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-300"><Flame size={19} /></span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className="progress-ring" style={{ "--progress": `${percentage * 3.6}deg` }}>
          <div>
            <strong>{percentage}%</strong>
            <span>{t.done}</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="metric-line">
            <span><Target size={14} /> {t.completed}</span>
            <strong>{completed}/{total}</strong>
          </div>
          <div className="metric-line">
            <span><Trophy size={14} /> {t.remaining}</span>
            <strong>{progress?.remaining_tasks?.length || 0}</strong>
          </div>
        </div>
      </div>
      <p className="mt-5 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
        {percentage === 100 ? t.completedMessage : t.progressMessage}
      </p>
    </section>
  );
}
