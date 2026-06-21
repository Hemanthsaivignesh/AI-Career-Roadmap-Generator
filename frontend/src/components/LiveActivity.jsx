import { Activity, Radio, WifiOff } from "lucide-react";

export default function LiveActivity({ connected, events, t }) {
  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="label">{t.systemPulse}</p>
          <h2 className="mt-1 flex items-center gap-2 text-sm font-black text-ink dark:text-white">
            <Activity className="text-violet-500" size={17} /> {t.liveActivity}
          </h2>
        </div>
        <span className={`connection-chip ${connected ? "is-live" : ""}`}>
          {connected ? <Radio size={12} /> : <WifiOff size={12} />}
          {connected ? t.live : t.offline}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center text-xs leading-5 text-slate-400 dark:border-slate-800">
            {t.waitingForEvents}
          </div>
        ) : (
          events.slice(0, 4).map((event) => (
            <div key={event.id} className="event-row">
              <span className="event-dot" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold text-slate-700 dark:text-slate-200">{event.message}</span>
                <span className="text-[10px] text-slate-400">{event.time}</span>
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
