export default function GoalSelector({ selected, onSelect }) {
  const goals = ["AI Engineer", "Data Scientist", "Full Stack Developer", "DevOps Engineer", "Cybersecurity Analyst"];

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
      {goals.map((goal) => (
        <button
          key={goal}
          className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
            selected === goal
              ? "border-mint bg-mint text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-mint dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
          onClick={() => onSelect(goal)}
          type="button"
        >
          {goal}
        </button>
      ))}
    </div>
  );
}
