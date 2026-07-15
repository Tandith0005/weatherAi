import { apiClient } from "./axios";

const getWeather = async (lat: number, lon: number, days: number = 7) => {
  try {
    const response = await apiClient.get("/weather", {
      params: {
        lat,
        lon,
        days,
        ai: true,
        units: "metric",
        lang: "en",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

const getUsage = async () => {
  try {
    const response = await apiClient.get("/usage");
    return response.data;
  } catch (error) {
    console.error("Error fetching usage:", error);
    throw error;
  }
};

const analyzeTree = async (formData: FormData) => {
  try {
    const response = await apiClient.post("/trees/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing tree:", error);
    throw error;
  }
};

export const weatherApi = {
  getWeather,
  getUsage,
  analyzeTree,
};