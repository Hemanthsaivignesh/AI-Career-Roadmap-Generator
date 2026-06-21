import { ArrowDown, BrainCircuit, ChartNoAxesCombined, Sparkles, Target } from "lucide-react";
import GoalSelector from "../components/GoalSelector.jsx";
import LiveActivity from "../components/LiveActivity.jsx";
import SkillForm from "../components/SkillForm.jsx";

export default function Home({ form, setForm, onSubmit, loading, result, connected, events, t }) {
  if (result !== undefined) {
    return (
      <section className="hero-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 px-6 py-8 shadow-panel backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-9 sm:py-10">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="relative grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="eyebrow">
              <Sparkles size={15} />
              {t.heroEyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-ink dark:text-white sm:text-5xl lg:text-6xl">
              {t.heroTitle} <span className="gradient-text">{t.heroHighlight}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t.heroDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="btn-primary"
                onClick={() => document.getElementById("roadmap-workspace")?.scrollIntoView({ behavior: "smooth" })}
                type="button"
              >
                {result ? t.continuePlan : t.buildPlan}
                <ArrowDown size={17} />
              </button>
              <div className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <span className="status-dot" />
                {t.localAiFallback}
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="orbit-card">
              <div className="orbit-line" />
              <div className="orbit-node orbit-node-one"><BrainCircuit size={22} /></div>
              <div className="orbit-node orbit-node-two"><Target size={22} /></div>
              <div className="orbit-node orbit-node-three"><ChartNoAxesCombined size={22} /></div>
              <div className="relative z-10 mx-auto flex aspect-square max-w-[260px] flex-col items-center justify-center rounded-full border border-white/70 bg-white/80 p-8 text-center shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-600 dark:text-violet-300">{t.yourPath}</span>
                <strong className="mt-3 text-2xl font-black text-ink dark:text-white">{form.target_role}</strong>
                <span className="mt-2 text-sm text-slate-500">{form.target_duration_weeks} {t.weeks}</span>
                <div className="mt-5 flex -space-x-2">
                  {["01", "02", "03", "04"].map((item) => (
                    <span key={item} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[10px] font-bold text-white dark:border-slate-900">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <aside className="space-y-4">
      <GoalSelector selected={form.target_role} onSelect={(role) => setForm((current) => ({ ...current, target_role: role }))} />
      <SkillForm form={form} setForm={setForm} onSubmit={onSubmit} loading={loading} t={t} />
      <div className="hidden xl:block">
        <LiveActivity connected={connected} events={events || []} t={t} />
      </div>
    </aside>
  );
}
