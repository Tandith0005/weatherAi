"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  WiThermometer,
  WiWindy,
  WiCloudy,
  WiRain,
  WiDayCloudy,
} from "react-icons/wi";
import { FaClock } from "react-icons/fa";
import { weatherApi } from "../lib/weatherApi";

interface WeatherData {
  lat: number;
  lon: number;
  units: string;
  days: number;
  current: {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  daily: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    precipitation: number;
    weathercode: number;
  }>;
  hourly: Array<{
    time: string;
    temp: number;
    precipitation: number;
    weathercode: number;
  }>;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const data = await weatherApi.getWeather(lat, lon, 7);
        setWeather(data);
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

  // Weather code to condition mapping
  const getWeatherCondition = (code: number) => {
    const conditions: { [key: number]: { label: string; icon: string } } = {
      0: { label: "Clear", icon: "☀️" },
      1: { label: "Mostly Clear", icon: "🌤️" },
      2: { label: "Partly Cloudy", icon: "⛅" },
      3: { label: "Cloudy", icon: "☁️" },
      45: { label: "Fog", icon: "🌫️" },
      48: { label: "Fog", icon: "🌫️" },
      51: { label: "Light Drizzle", icon: "🌦️" },
      53: { label: "Drizzle", icon: "🌧️" },
      55: { label: "Heavy Drizzle", icon: "🌧️" },
      61: { label: "Light Rain", icon: "🌧️" },
      63: { label: "Rain", icon: "🌧️" },
      65: { label: "Heavy Rain", icon: "🌧️" },
      71: { label: "Light Snow", icon: "❄️" },
      73: { label: "Snow", icon: "❄️" },
      75: { label: "Heavy Snow", icon: "❄️" },
      80: { label: "Rain Showers", icon: "🌦️" },
      81: { label: "Rain Showers", icon: "🌦️" },
      82: { label: "Heavy Rain Showers", icon: "🌧️" },
      95: { label: "Thunderstorm", icon: "⛈️" },
      96: { label: "Thunderstorm", icon: "⛈️" },
      99: { label: "Thunderstorm", icon: "⛈️" },
    };
    return conditions[code] || { label: "Unknown", icon: "❓" };
  };

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Current Weather Section */}
      <section id="current" className="scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <WiThermometer className="w-7 h-7 text-blue-500" />
          Current Weather
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-2">
              <WiThermometer className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Temperature
              </span>
            </div>
            <p className="text-3xl font-bold">
              {weather.current.temperature}°C
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getWeatherCondition(weather.current.weathercode).label}
            </p>
          </div>

          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-2">
              <WiWindy className="w-8 h-8 text-cyan-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Wind Speed
              </span>
            </div>
            <p className="text-3xl font-bold">
              {weather.current.windspeed} km/h
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Direction: {weather.current.winddirection}°
            </p>
          </div>

          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-2">
              <WiCloudy className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Condition
              </span>
            </div>
            <p className="text-3xl font-bold">
              {getWeatherCondition(weather.current.weathercode).icon}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {weather.current.is_day === 1 ? "Daytime" : "Nighttime"}
            </p>
          </div>

          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-2">
              <FaClock className="w-7 h-7 text-purple-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last Updated
              </span>
            </div>
            <p className="text-lg font-bold">
              {formatTime(weather.current.time)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(weather.current.time).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Hourly Forecast Section */}
      <section id="hourly" className="scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <WiDayCloudy className="w-7 h-7 text-cyan-500" />
          Hourly Forecast
        </h2>

        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {weather.hourly.slice(0, 12).map((hour, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-3 text-center border border-sidebar-border"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {formatTime(hour.time)}
                </p>
                <p className="text-xl font-bold mt-1">
                  {Math.round(hour.temp)}°C
                </p>
                <p className="text-2xl mt-1">
                  {getWeatherCondition(hour.weathercode).icon}
                </p>
                {hour.precipitation > 0 && (
                  <p className="text-xs text-blue-500 mt-1">
                    {hour.precipitation}mm
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Forecast Section */}
      <section id="daily" className="scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <WiCloudy className="w-7 h-7 text-blue-400" />
          Daily Forecast
        </h2>

        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weather.daily.slice(0, 7).map((day, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-4 border border-sidebar-border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getWeatherCondition(day.weathercode).label}
                    </p>
                  </div>
                  <span className="text-3xl">
                    {getWeatherCondition(day.weathercode).icon}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      High
                    </p>
                    <p className="text-lg font-bold text-red-400">
                      {Math.round(day.temp_max)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Low
                    </p>
                    <p className="text-lg font-bold text-blue-400">
                      {Math.round(day.temp_min)}°C
                    </p>
                  </div>
                  {day.precipitation > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rain
                      </p>
                      <p className="text-lg font-bold text-cyan-400">
                        {day.precipitation}mm
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Days Section */}
      <section id="days" className="scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <WiRain className="w-7 h-7 text-blue-600" />
          7-Day Extended Forecast
        </h2>

        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
          <div className="space-y-3">
            {weather.daily.map((day, index) => {
              const condition = getWeatherCondition(day.weathercode);
              return (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 border border-sidebar-border flex items-center justify-between hover:bg-sidebar-bg transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl">{condition.icon}</span>
                    <div>
                      <p className="font-medium">{formatDate(day.date)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {condition.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Min
                      </p>
                      <p className="font-bold text-blue-400">
                        {Math.round(day.temp_min)}°C
                      </p>
                    </div>
                    <div className="w-20 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                        style={{
                          width: `${((day.temp_max - day.temp_min) / 30) * 100}%`,
                          marginLeft: `${(day.temp_min / 30) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Max
                      </p>
                      <p className="font-bold text-red-400">
                        {Math.round(day.temp_max)}°C
                      </p>
                    </div>
                    {day.precipitation > 0 && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Precip
                        </p>
                        <p className="font-bold text-cyan-400">
                          {day.precipitation}mm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          💡 <span className="font-medium">AI Summary:</span> Weather conditions
          are currently clear with moderate temperatures. Expect similar
          conditions over the next few days with minimal precipitation. The
          highest temperature will be around
          {Math.round(weather.daily[0]?.temp_max || 0)}°C with lows of{" "}
          {Math.round(weather.daily[0]?.temp_min || 0)}°C.
        </p>
      </div>
    </div>
  );
}
