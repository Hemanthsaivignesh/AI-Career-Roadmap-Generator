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
  name: "",
  email: "",
  current_skills: "Python, SQL",
  experience_level: "Beginner",
  target_role: "AI Engineer",
  study_hours_per_week: 8,
  target_duration_weeks: 12
};

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("career-atlas-language") || "en");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("career-atlas-theme") === "dark");
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("career-atlas-form");
    return saved ? { ...initialForm, ...JSON.parse(saved) } : initialForm;
  });
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem("career-atlas-roadmap");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [liveEvents, setLiveEvents] = useState([]);
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    localStorage.setItem("career-atlas-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("career-atlas-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("career-atlas-form", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    if (result) {
      localStorage.setItem("career-atlas-roadmap", JSON.stringify(result));
    }
  }, [result]);

  useEffect(() => {
    let socket;
    let reconnectTimer;

    const connect = () => {
      socket = new WebSocket(getRealtimeUrl());
      socket.onopen = () => setRealtimeConnected(true);
      socket.onclose = () => {
        setRealtimeConnected(false);
        reconnectTimer = window.setTimeout(connect, 4000);
      };
      socket.onerror = () => setRealtimeConnected(false);
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message = data.message || t.realtimeConnected;

        setLiveEvents((current) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            type: data.type,
            message,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
    };

    connect();
    return () => {
      window.clearTimeout(reconnectTimer);
      socket?.close();
    };
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
      window.setTimeout(() => {
        document.getElementById("roadmap-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      setToast(error?.response?.data?.detail || t.backendError);
    } finally {
      setLoading(false);
    }
  };

  const toggleProgress = async (milestoneId, completed) => {
    if (!result?.id) return;
    try {
      const nextProgress = await updateProgress({ roadmap_id: result.id, milestone_id: milestoneId, completed });
      setResult((current) => ({ ...current, progress: nextProgress }));
    } catch {
      setToast(t.backendError);
    }
  };

  const clearRoadmap = () => {
    setResult(null);
    localStorage.removeItem("career-atlas-roadmap");
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
      <div className="app-shell min-h-screen bg-cloud text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          <Home
            form={form}
            setForm={setForm}
            onSubmit={submit}
            loading={loading}
            result={result}
            t={t}
          />
          <div id="roadmap-workspace" className="mt-6 grid scroll-mt-24 gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
            <Home
              form={form}
              setForm={setForm}
              onSubmit={submit}
              loading={loading}
              connected={realtimeConnected}
              events={liveEvents}
              t={t}
            />
            <Dashboard
              result={result}
              onToggle={toggleProgress}
              onDownloadJson={downloadJson}
              onDownloadPdf={downloadPdf}
              onClear={clearRoadmap}
              connected={realtimeConnected}
              events={liveEvents}
              t={t}
            />
          </div>
          <div className="mt-5 xl:hidden">
            <LiveActivity connected={realtimeConnected} events={liveEvents} t={t} />
          </div>
        </div>
        {toast && (
          <button
            className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl bg-ink px-5 py-3 text-left text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-ink"
            onClick={() => setToast("")}
            type="button"
          >
            {toast}
          </button>
        )}
      </div>
    </div>
  );
}
