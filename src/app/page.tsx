"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Hero from "../components/hero/Hero";
import { WeatherData } from "../components/interface/weatherInterface";
import HourlyWeather from "../components/weather/hourlyWeather";
import DailyWeather from "../components/weather/DailyWeather";
import AISummary from "../components/weather/AISummary";
import CitySearch from "../components/weather/CitySearch";
import { weatherApi } from "../lib/weatherApi";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  // Use useCallback to memoize the function
  const fetchWeather = useCallback(async (lat: number, lon: number, cityName?: string) => {
    try {
      setIsSearching(true);
      const data = await weatherApi.getWeather(lat, lon, 7);
      setWeather(data);
      if (cityName) {
        setSelectedCity(cityName);
      }
    } catch (error) {
      toast.error("Failed to fetch weather data");
      console.error(error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  const handleCitySelect = (lat: number, lon: number, cityName: string) => {
    fetchWeather(lat, lon, cityName);
  };

  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
        toast.success("📍 Location detected!");
      },
      () => {
        toast.error("Location permission denied. Please search for a city.");
      }
    );
  }, [fetchWeather]);

  // Initial load 
  useEffect(() => {
    const initializeWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // User denied permission - use fallback (Nairobi, Kenya)
            toast.error("Location permission denied. Using default location.");
            fetchWeather(-1.2921, 36.8219, "Nairobi, Kenya");
          }
        );
      } else {
        // Geolocation not supported - use fallback
        fetchWeather(-1.2921, 36.8219, "Nairobi, Kenya");
      }
    };

    initializeWeather();
  }, [fetchWeather]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-96 flex-col gap-4">
        <p className="text-muted">No weather data available</p>
        <button
          onClick={() => handleUseCurrentLocation()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* City Search Section */}
      <section className="pt-4">
        <div className="text-center mb-6">
          <h2 className="md:text-5xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">
            Weather Anywhere
          </h2>
        </div>
        <CitySearch
          onCitySelect={handleCitySelect}
          onUseCurrentLocation={handleUseCurrentLocation}
          isLoading={isSearching}
          defaultCity={selectedCity}
        />
      </section>

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