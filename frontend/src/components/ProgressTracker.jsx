import { Target } from "lucide-react";

export default function ProgressTracker({ progress, t }) {
  const percentage = progress?.percentage || 0;
  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink dark:text-white">{t.progress}</h2>
        <Target className="text-mint" size={20} />
      </div>
      <div className="mt-4 text-4xl font-black text-ink dark:text-white">{percentage}%</div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-mint transition-all" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {progress?.completed || 0}/{progress?.total || 0} · {t.remaining}: {progress?.remaining_tasks?.length || 0}
      </p>
    </section>
  );
}
