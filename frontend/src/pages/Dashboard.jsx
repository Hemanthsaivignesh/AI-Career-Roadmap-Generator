import { Download, FileJson } from "lucide-react";
import CertificationCard from "../components/CertificationCard.jsx";
import ProgressTracker from "../components/ProgressTracker.jsx";
import RoadmapCard from "../components/RoadmapCard.jsx";

export default function Dashboard({ result, onToggle, onDownloadJson, onDownloadPdf, t }) {
  if (!result) {
    return (
      <main className="panel flex min-h-96 items-center justify-center p-6 text-center text-slate-500 dark:text-slate-400">
        {t.empty}
      </main>
    );
  }

  const gap = result.skill_gap_analysis;

  return (
    <main className="space-y-4">
      <section className="panel p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="label">{t.skillGap}</p>
            <h2 className="mt-1 text-2xl font-black text-ink dark:text-white">{gap.target_role}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {gap.matched_skills.length} matched / {gap.missing_skills.length} missing / {gap.readiness_score}% {t.ready}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-soft" onClick={onDownloadJson}>
              <FileJson size={16} />
              {t.downloadJson}
            </button>
            <button className="btn-soft" onClick={onDownloadPdf}>
              <Download size={16} />
              {t.downloadPdf}
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {gap.missing_skills.map((skill) => (
            <span key={skill} className="rounded-md bg-ember/10 px-2 py-1 text-xs font-bold text-ember">
              {skill}
            </span>
          ))}
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <RoadmapCard roadmap={result.roadmap} progress={result.progress} onToggle={onToggle} t={t} />
        <div className="space-y-4">
          <ProgressTracker progress={result.progress} t={t} />
          <CertificationCard certifications={result.certifications} t={t} />
        </div>
      </div>
      <section className="panel p-4">
        <h2 className="mb-3 text-base font-bold text-ink dark:text-white">{t.projects}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {result.projects.map((project) => (
            <div key={project.title} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
              <div className="text-xs font-bold uppercase text-mint">{project.level}</div>
              <h3 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">{project.title}</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{project.description}</p>
              <p className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {project.skills_covered.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
