import { Award, ExternalLink } from "lucide-react";

export default function CertificationCard({ certifications, t }) {
  return (
    <section className="panel p-4">
      <h2 className="mb-3 text-base font-bold text-ink dark:text-white">{t.certifications}</h2>
      <div className="grid gap-3">
        {(certifications || []).map((cert) => (
          <a
            className="rounded-md border border-slate-200 p-3 transition hover:border-ember dark:border-slate-800"
            href={cert.website}
            key={cert.name}
            rel="noreferrer"
            target="_blank"
          >
            <div className="flex items-start justify-between gap-2">
              <Award className="text-saffron" size={19} />
              <ExternalLink className="text-slate-400" size={15} />
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">{cert.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{cert.provider} • {cert.difficulty} • {cert.estimated_cost}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
