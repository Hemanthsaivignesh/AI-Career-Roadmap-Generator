import { Clock3, GraduationCap, Mail, Rocket, UserRound, WandSparkles } from "lucide-react";

const roles = ["AI Engineer", "Data Scientist", "Full Stack Developer", "DevOps Engineer", "Cybersecurity Analyst"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function SkillForm({ form, setForm, onSubmit, loading, t }) {
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form className="panel overflow-hidden p-5" onSubmit={onSubmit}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="label">{t.stepTwo}</p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-ink dark:text-white">{t.builder}</h2>
        </div>
        <span className="ai-chip"><WandSparkles size={14} /> AI</span>
      </div>
      <div className="grid gap-3">
        <label>
          <span className="label">{t.name}</span>
          <div className="input-shell mt-1">
            <UserRound size={17} />
            <input required value={form.name} placeholder={t.nameHint} onChange={(event) => update("name", event.target.value)} />
          </div>
        </label>
        <label>
          <span className="label">{t.email}</span>
          <div className="input-shell mt-1">
            <Mail size={17} />
            <input required type="email" value={form.email} placeholder="you@example.com" onChange={(event) => update("email", event.target.value)} />
          </div>
        </label>
        <label>
          <span className="label">{t.role}</span>
          <div className="input-shell mt-1">
            <GraduationCap size={17} />
            <select value={form.target_role} onChange={(event) => update("target_role", event.target.value)}>
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
          <span className="label">{t.skills}</span>
          <textarea
            className="field mt-1 min-h-24 resize-none"
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
            <div className="input-shell mt-1">
              <Clock3 size={17} />
              <input type="number" min="1" max="60" value={form.study_hours_per_week} onChange={(event) => update("study_hours_per_week", event.target.value)} />
            </div>
          </label>
          <label>
            <span className="label">{t.duration}</span>
            <div className="input-shell mt-1">
              <input type="number" min="3" max="52" value={form.target_duration_weeks} onChange={(event) => update("target_duration_weeks", event.target.value)} />
              <span className="text-xs font-bold text-slate-400">{t.weeksShort}</span>
            </div>
          </label>
        </div>
        <button className="btn-primary mt-2 w-full" type="submit" disabled={loading}>
          <Rocket size={17} />
          {loading ? t.generating : t.generate}
        </button>
        <p className="text-center text-[11px] leading-5 text-slate-400">{t.privacyNote}</p>
      </div>
    </form>
  );
}
