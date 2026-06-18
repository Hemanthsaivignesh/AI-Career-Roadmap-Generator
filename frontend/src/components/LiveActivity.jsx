import { Activity, Wifi, WifiOff } from "lucide-react";

export default function LiveActivity({ connected, events, t }) {
  return (
    <section className="panel p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-ember" size={19} />
          <h2 className="text-base font-bold text-ink dark:text-white">{t.liveActivity}</h2>
        </div>
        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${connected ? "bg-mint/10 text-mint" : "bg-slate-200 text-slate-500 dark:bg-slate-800"}`}>
          {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
          {connected ? t.live : t.offline}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.waitingForEvents}</p>
        ) : (
          events.slice(0, 5).map((event) => (
            <div key={event.id} className="rounded-md border border-slate-200 p-2 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{event.message}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{event.time}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
