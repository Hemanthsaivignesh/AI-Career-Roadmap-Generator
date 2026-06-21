import { Award, ExternalLink } from "lucide-react";

export default function CertificationCard({ certifications, t }) {
  return (
    <section className="panel p-5">
      <div>
        <p className="label">{t.credentials}</p>
        <h2 className="mt-1 text-lg font-black text-ink dark:text-white">{t.certifications}</h2>
      </div>
      <div className="mt-4 grid gap-2.5">
        {(certifications || []).map((cert, index) => (
          <a className="cert-row" href={cert.website} key={cert.name} rel="noreferrer" target="_blank">
            <span className={`cert-icon cert-${index % 3}`}><Award size={17} /></span>
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-xs text-slate-800 dark:text-slate-100">{cert.name}</strong>
              <small className="mt-0.5 block truncate text-[10px] font-semibold text-slate-400">{cert.provider} · {cert.difficulty}</small>
            </span>
            <ExternalLink className="shrink-0 text-slate-400" size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}
