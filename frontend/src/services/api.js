import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000
});

export const generateRoadmap = async (payload) => {
  const { data } = await api.post("/generate-roadmap", payload);
  return data;
};

export const analyzeSkills = async (payload) => {
  const { data } = await api.post("/analyze-skills", payload);
  return data;
};

export const updateProgress = async (payload) => {
  const { data } = await api.post("/progress", payload);
  return data;
};

export default api;
