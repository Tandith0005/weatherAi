import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://api.weather-ai.co/v1";
const API_KEY = process.env.WEATHER_API_KEY;

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);