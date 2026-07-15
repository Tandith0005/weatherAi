"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { demoResponse } from "../components/constants/demoResponse";
import Hero from "../components/hero/Hero";
import { getWeatherCondition } from "../lib/weatherConstants";
import { WeatherData } from "../components/interface/weatherInterface";
import HourlyWeather from "../components/weather/hourlyWeather";
import DailyWeather from "../components/weather/DailyWeather";
import AISummary from "../components/weather/AISummary";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // const data = await weatherApi.getWeather(lat, lon, 7);
        // setWeather(data);
        setWeather(demoResponse);
      } catch (error) {
        toast.error("Failed to fetch weather data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      fetchWeather(-1.2921, 36.8219); // fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // User denied permission
        fetchWeather(-1.2921, 36.8219);
      },
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!weather) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with Current Weather */}
      <Hero weather={weather} />

      {/* Hourly Forecast Section */}
      <HourlyWeather weather={weather} />

      {/* Daily Forecast Section */}
      <DailyWeather weather={weather} />
      
      {/* AI Summary */}
      <AISummary weather={weather} />
    </div>
  );
}