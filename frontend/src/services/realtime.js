export const getRealtimeUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const url = new URL(apiUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/ws/roadmaps";
  return url.toString();
};
