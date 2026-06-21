import { Bot, Braces, CloudCog, DatabaseZap, ShieldCheck } from "lucide-react";

const goals = [
  { name: "AI Engineer", icon: Bot, tone: "violet" },
  { name: "Data Scientist", icon: DatabaseZap, tone: "cyan" },
  { name: "Full Stack Developer", icon: Braces, tone: "amber" },
  { name: "DevOps Engineer", icon: CloudCog, tone: "emerald" },
  { name: "Cybersecurity Analyst", icon: ShieldCheck, tone: "rose" }
];

export default function GoalSelector({ selected, onSelect }) {
  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="label">Step 01</p>
          <h2 className="mt-1 text-sm font-black text-ink dark:text-white">Choose your destination</h2>
        </div>
        <span className="text-xs font-bold text-slate-400">5 paths</span>
      </div>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-1">
        {goals.map(({ name, icon: Icon, tone }) => (
          <button
            key={name}
            className={`goal-card ${selected === name ? "is-selected" : ""}`}
            onClick={() => onSelect(name)}
            type="button"
          >
            <span className={`goal-icon goal-${tone}`}><Icon size={18} /></span>
            <span className="min-w-0 flex-1 truncate text-left text-xs font-bold sm:text-sm">{name}</span>
            <span className="goal-check">{selected === name ? "✓" : "→"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
