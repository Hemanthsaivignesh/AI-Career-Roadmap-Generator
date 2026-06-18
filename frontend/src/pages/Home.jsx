import GoalSelector from "../components/GoalSelector.jsx";
import SkillForm from "../components/SkillForm.jsx";

export default function Home({ form, setForm, onSubmit, loading, t }) {
  return (
    <aside className="space-y-4">
      <GoalSelector selected={form.target_role} onSelect={(role) => setForm((current) => ({ ...current, target_role: role }))} />
      <SkillForm form={form} setForm={setForm} onSubmit={onSubmit} loading={loading} t={t} />
    </aside>
  );
}
