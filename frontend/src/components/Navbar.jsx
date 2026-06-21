import { Compass, Languages, Moon, Sparkles, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, language, setLanguage, t }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-cloud/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="logo-mark">
            <Compass size={22} />
            <Sparkles className="absolute -right-1 -top-1 text-amber-300" size={12} />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-ink dark:text-white sm:text-lg">{t.appName}</h1>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 md:inline-flex">
            {t.freeWorkspace}
          </span>
          <label className="control-button">
            <Languages size={16} />
            <select
              aria-label="Language"
              className="max-w-20 bg-transparent text-sm font-semibold outline-none dark:text-white"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </label>
          <button className="control-button" onClick={() => setDarkMode(!darkMode)} title={t.theme} type="button">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
