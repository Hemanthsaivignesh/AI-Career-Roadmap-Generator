import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import LiveActivity from "./components/LiveActivity.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { generateRoadmap, updateProgress } from "./services/api.js";
import { getRealtimeUrl } from "./services/realtime.js";
import { translations } from "./i18n.js";

const initialForm = {
  name: "Portfolio Builder",
  email: "portfolio@example.com",
  current_skills: "Python, SQL",
  experience_level: "Beginner",
  target_role: "AI Engineer",
  study_hours_per_week: 8,
  target_duration_weeks: 12
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [liveEvents, setLiveEvents] = useState([]);
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    const socket = new WebSocket(getRealtimeUrl());

    socket.onopen = () => setRealtimeConnected(true);
    socket.onclose = () => setRealtimeConnected(false);
    socket.onerror = () => setRealtimeConnected(false);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message || t.realtimeConnected;

      setLiveEvents((current) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          type: data.type,
          message,
          time: new Date().toLocaleTimeString()
        },
        ...current
      ].slice(0, 8));

      if (data.type === "progress_updated" && data.progress) {
        setResult((current) => {
          if (!current || current.id !== data.roadmap_id) return current;
          return { ...current, progress: data.progress };
        });
      }
    };

    return () => socket.close();
  }, [t.realtimeConnected]);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setToast("");
    try {
      const payload = {
        ...form,
        current_skills: form.current_skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        study_hours_per_week: Number(form.study_hours_per_week),
        target_duration_weeks: Number(form.target_duration_weeks)
      };
      const data = await generateRoadmap(payload);
      setResult(data);
      setToast(t.defaultToast);
    } catch (error) {
      setToast(error?.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const toggleProgress = async (milestoneId, completed) => {
    if (!result?.id) return;
    const nextProgress = await updateProgress({ roadmap_id: result.id, milestone_id: milestoneId, completed });
    setResult((current) => ({ ...current, progress: nextProgress }));
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "career-roadmap.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${t.appName}: ${result.skill_gap_analysis.target_role}`, 14, 18);
    doc.setFontSize(11);
    doc.text(`Progress: ${result.progress.percentage}%`, 14, 28);
    result.roadmap.weekly_milestones.slice(0, 18).forEach((item, index) => {
      doc.text(`${item.week}. ${item.title}`, 14, 40 + index * 8);
    });
    doc.save("career-roadmap.pdf");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-cloud text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[360px_1fr]">
          <div className="space-y-4">
            <Home form={form} setForm={setForm} onSubmit={submit} loading={loading} t={t} />
            <LiveActivity connected={realtimeConnected} events={liveEvents} t={t} />
          </div>
          <Dashboard result={result} onToggle={toggleProgress} onDownloadJson={downloadJson} onDownloadPdf={downloadPdf} t={t} />
        </div>
        {toast && (
          <div className="fixed bottom-4 right-4 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white shadow-panel dark:bg-white dark:text-ink">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
