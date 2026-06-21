import {
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Download,
  FileJson,
  Gauge,
  RotateCcw,
  Sparkles
} from "lucide-react";
import CertificationCard from "../components/CertificationCard.jsx";
import ProgressTracker from "../components/ProgressTracker.jsx";
import RoadmapCard from "../components/RoadmapCard.jsx";

export default function Dashboard({ result, onToggle, onDownloadJson, onDownloadPdf, onClear, t }) {
  if (!result) {
    return (
      <main className="empty-state panel relative flex min-h-[680px] overflow-hidden p-6 sm:p-10">
        <div className="empty-orb empty-orb-one" />
        <div className="empty-orb empty-orb-two" />
        <div className="relative m-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-2xl shadow-violet-500/30">
            <Sparkles size={34} />
          </div>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.28em] text-violet-600 dark:text-violet-300">{t.workspaceReady}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-ink dark:text-white sm:text-4xl">{t.emptyTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">{t.empty}</p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            {[
              [Gauge, t.featureGap, t.featureGapText],
              [BookOpenCheck, t.featurePlan, t.featurePlanText],
              [BriefcaseBusiness, t.featurePortfolio, t.featurePortfolioText]
            ].map(([Icon, title, copy]) => (
              <div key={title} className="feature-mini">
                <Icon size={19} />
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const gap = result.skill_gap_analysis;

  return (
    <main className="min-w-0 space-y-5">
      <section className="panel overflow-hidden">
        <div className="result-banner p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow eyebrow-light"><Sparkles size={14} /> {t.personalizedPlan}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">{result.roadmap.timeline}</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white">{gap.target_role}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
                {t.planSummary.replace("{matched}", gap.matched_skills.length).replace("{missing}", gap.missing_skills.length)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="export-button" onClick={onDownloadJson} type="button">
                <FileJson size={16} /> JSON
              </button>
              <button className="export-button" onClick={onDownloadPdf} type="button">
                <Download size={16} /> PDF
              </button>
              <button className="export-button icon-only" onClick={onClear} title={t.startOver} type="button">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label={t.readiness} value={`${gap.readiness_score}%`} note={t.currentMatch} />
            <Stat label={t.skillGaps} value={gap.missing_skills.length} note={t.prioritySkills} />
            <Stat label={t.weeklyPace} value={`${result.roadmap.weekly_milestones?.[0]?.estimated_hours || 0}h`} note={t.perWeek} />
          </div>
        </div>
        <div className="border-t border-slate-200/80 p-5 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="label">{t.skillGap}</p>
              <h3 className="mt-1 text-base font-black text-ink dark:text-white">{t.focusNext}</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">{gap.missing_skills.length} {t.skillsCount}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {gap.missing_skills.length ? gap.missing_skills.map((skill, index) => (
              <span key={skill} className="skill-pill">
                <span>{String(index + 1).padStart(2, "0")}</span>{skill}
              </span>
            )) : (
              <span className="text-sm font-semibold text-emerald-600">{t.noSkillGaps}</span>
            )}
          </div>
        </div>
      </section>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <RoadmapCard roadmap={result.roadmap} progress={result.progress} onToggle={onToggle} t={t} />
        <div className="space-y-5">
          <ProgressTracker progress={result.progress} t={t} />
          <CertificationCard certifications={result.certifications} t={t} />
        </div>
      </div>

      <section className="panel p-5 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="label">{t.proofOfWork}</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-ink dark:text-white">{t.projects}</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">{result.projects.length} {t.portfolioBuilds}</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {result.projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div className="flex items-center justify-between">
                <span className="project-number">0{index + 1}</span>
                <ArrowUpRight className="text-slate-400" size={18} />
              </div>
              <div className="mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">{project.level}</div>
              <h3 className="mt-2 text-base font-black text-slate-900 dark:text-white">{project.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.skills_covered.map((skill) => <span className="tiny-tag" key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, note }) {
  return (
    <div className="banner-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}
