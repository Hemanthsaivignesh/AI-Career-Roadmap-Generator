import { Languages, Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, language, setLanguage, t }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-cloud/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-lg font-black text-ink dark:text-white">{t.appName}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900">
            <Languages size={16} />
            <select
              className="bg-transparent text-sm outline-none dark:text-white"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
            </select>
          </label>
          <button className="btn-soft" onClick={() => setDarkMode(!darkMode)} title="Theme">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
