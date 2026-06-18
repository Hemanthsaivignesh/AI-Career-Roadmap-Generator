import { Rocket } from "lucide-react";

const roles = ["AI Engineer", "Data Scientist", "Full Stack Developer", "DevOps Engineer", "Cybersecurity Analyst"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function SkillForm({ form, setForm, onSubmit, loading, t }) {
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form className="panel p-4" onSubmit={onSubmit}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-ink dark:text-white">{t.builder}</h2>
        <span className="rounded-md bg-saffron/20 px-2 py-1 text-xs font-bold text-ink dark:text-saffron">AI</span>
      </div>
      <div className="grid gap-3">
        <label>
          <span className="label">{t.name}</span>
          <input className="field mt-1" value={form.name} onChange={(event) => update("name", event.target.value)} />
        </label>
        <label>
          <span className="label">{t.email}</span>
          <input className="field mt-1" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>
        <label>
          <span className="label">{t.role}</span>
          <select className="field mt-1" value={form.target_role} onChange={(event) => update("target_role", event.target.value)}>
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="label">{t.skills}</span>
          <textarea
            className="field mt-1 min-h-24"
            placeholder={t.skillsHint}
            value={form.current_skills}
            onChange={(event) => update("current_skills", event.target.value)}
          />
        </label>
        <label>
          <span className="label">{t.level}</span>
          <select className="field mt-1" value={form.experience_level} onChange={(event) => update("experience_level", event.target.value)}>
            {levels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="label">{t.hours}</span>
            <input className="field mt-1" type="number" min="1" max="60" value={form.study_hours_per_week} onChange={(event) => update("study_hours_per_week", event.target.value)} />
          </label>
          <label>
            <span className="label">{t.duration}</span>
            <input className="field mt-1" type="number" min="3" max="52" value={form.target_duration_weeks} onChange={(event) => update("target_duration_weeks", event.target.value)} />
          </label>
        </div>
        <button className="btn-primary mt-2" type="submit" disabled={loading}>
          <Rocket size={17} />
          {loading ? "..." : t.generate}
        </button>
      </div>
    </form>
  );
}
