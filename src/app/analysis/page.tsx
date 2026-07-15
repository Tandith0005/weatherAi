"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import {
  WiThermometer,
  WiWindy,
  WiRain,
  WiDaySunny,
  WiCloudy,
} from "react-icons/wi";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { WeatherData } from "@/src/components/interface/weatherInterface";
import { demoResponse } from "@/src/components/constants/demoResponse";
import { formatDate, getWeatherCondition } from "@/src/lib/weatherConstants";

// Proper types for Recharts Tooltip
interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((p, index) => (
          <p key={index} className="text-sm text-muted">
            {p.name}: {p.value}°C
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Wind tooltip
const WindTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((p, index) => (
          <p key={index} className="text-sm text-muted">
            {p.name}: {p.value} km/h
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Precipitation tooltip
const PrecipitationTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((p, index) => (
          <p key={index} className="text-sm text-muted">
            {p.name}: {p.value}mm
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const WeatherAnalysis = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState<"temperature" | "wind">("temperature");

  useEffect(() => {
    setTimeout(() => {
      setWeather(demoResponse);
      setLoading(false);
    }, 500);
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

  // Prepare data for charts
  const hourlyData = weather.hourly.slice(0, 24).map((hour) => ({
    time: new Date(hour.time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: Math.round(hour.temp),
    precipitation: hour.precipitation,
    weathercode: hour.weathercode,
    condition: getWeatherCondition(hour.weathercode).label,
    icon: getWeatherCondition(hour.weathercode).icon,
  }));

  // Wind data - using deterministic values without Math.random()
  const windData = weather.hourly.slice(0, 24).map((hour, index) => {
    const hourOfDay = new Date(hour.time).getHours();
    // Create realistic wind patterns (higher during day, lower at night)
    const baseWind = 5 + Math.sin((hourOfDay - 6) * Math.PI / 12) * 8; // Peak at noon
    // Use index to create slight variations without Math.random()
    const variation = (index % 5) - 2; // Gives values: -2, -1, 0, 1, 2
    const windSpeed = Math.max(2, Math.round(baseWind + variation));
    const windDirection = Math.round((hourOfDay * 15) % 360);
    
    return {
      time: new Date(hour.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      windSpeed: windSpeed,
      windDirection: windDirection,
    };
  });

  const dailyData = weather.daily.map((day) => ({
    date: formatDate(day.date),
    fullDate: day.date,
    temp_max: Math.round(day.temp_max),
    temp_min: Math.round(day.temp_min),
    precipitation: day.precipitation,
    weathercode: day.weathercode,
    condition: getWeatherCondition(day.weathercode).label,
    icon: getWeatherCondition(day.weathercode).icon,
    avgTemp: Math.round((day.temp_max + day.temp_min) / 2),
  }));

  // Statistics
  const stats = {
    avgTemp: Math.round(
      weather.hourly.reduce((acc, h) => acc + h.temp, 0) / weather.hourly.length
    ),
    maxTemp: Math.round(Math.max(...weather.hourly.map((h) => h.temp))),
    minTemp: Math.round(Math.min(...weather.hourly.map((h) => h.temp))),
    totalPrecipitation: weather.daily.reduce(
      (acc, d) => acc + d.precipitation,
      0
    ),
    avgWindSpeed: Math.round(weather.current.windspeed),
    maxWindSpeed: Math.round(weather.current.windspeed + 8),
    minWindSpeed: Math.round(Math.max(0, weather.current.windspeed - 3)),
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Weather Analytics
          </h1>
          <p className="text-muted text-sm mt-1">
            Detailed weather analysis with interactive charts
          </p>
        </div>
        <div className="flex items-center gap-2 bg-sidebar-bg px-4 py-2 rounded-lg border border-sidebar-border">
          <WiDaySunny className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {new Date(weather.current.time).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-sidebar-bg rounded-xl p-4 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <FaTemperatureHigh className="w-4 h-4 text-red-400" />
            <span className="text-xs text-muted">Avg Temperature</span>
          </div>
          <p className="text-2xl font-bold">{stats.avgTemp}°C</p>
        </div>
        <div className="bg-sidebar-bg rounded-xl p-4 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <WiThermometer className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-muted">Max / Min</span>
          </div>
          <p className="text-2xl font-bold">
            <span className="text-red-400">{stats.maxTemp}°</span>
            <span className="text-muted mx-1">/</span>
            <span className="text-blue-400">{stats.minTemp}°</span>
          </p>
        </div>
        <div className="bg-sidebar-bg rounded-xl p-4 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <FaTint className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-muted">Total Precipitation</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalPrecipitation.toFixed(1)} mm</p>
        </div>
        <div className="bg-sidebar-bg rounded-xl p-4 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <WiWindy className="w-4 h-4 text-cyan-500" />
            <span className="text-xs text-muted">Wind Speed</span>
          </div>
          <p className="text-2xl font-bold">{stats.avgWindSpeed} km/h</p>
        </div>
      </div>

      {/* Chart Type Selector - Only Temperature and Wind */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveChart("temperature")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeChart === "temperature"
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-sidebar-bg border border-sidebar-border hover:border-primary/50"
          }`}
        >
          🌡️ Temperature Analysis
        </button>
        <button
          onClick={() => setActiveChart("wind")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeChart === "wind"
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-sidebar-bg border border-sidebar-border hover:border-primary/50"
          }`}
        >
          💨 Wind Analysis
        </button>
      </div>

      {/* Temperature Charts */}
      {activeChart === "temperature" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Overview */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <WiThermometer className="w-6 h-6 text-primary" />
              Temperature Overview
            </h3>
            <div className="h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hourlyData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="#06B6D4"
                    fill="url(#tempGradient)"
                    name="Temperature (°C)"
                  />
                  <Bar dataKey="precipitation" fill="#0EA5E9" name="Precipitation (mm)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Temperature Range */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaTemperatureHigh className="w-5 h-5 text-red-400" />
              Daily Temperature Range
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="temp_max" fill="#F87171" name="Max Temp (°C)" />
                  <Bar dataKey="temp_min" fill="#60A5FA" name="Min Temp (°C)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Precipitation Forecast - KEPT */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <WiRain className="w-6 h-6 text-cyan-400" />
              Precipitation Forecast
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<PrecipitationTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="precipitation" 
                    fill="#06B6D4" 
                    name="Precipitation (mm)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Temperature Trend Line */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📈 Temperature Trend (24 Hours)
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#06B6D4", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Wind Analysis Charts */}
      {activeChart === "wind" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wind Speed Overview */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <WiWindy className="w-6 h-6 text-cyan-500" />
              Wind Speed Overview
            </h3>
            <div className="h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={windData}>
                  <defs>
                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<WindTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="windSpeed"
                    stroke="#06B6D4"
                    fill="url(#windGradient)"
                    name="Wind Speed (km/h)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🧭 Wind Direction (24 Hours)
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={windData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 360]} />
                  <Tooltip content={<WindTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="windDirection"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6", r: 3 }}
                    name="Wind Direction (°)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wind Speed Stats */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📊 Wind Statistics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                  <p className="text-xs text-muted">Average Wind Speed</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.avgWindSpeed} km/h</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                  <p className="text-xs text-muted">Max Wind Speed</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.maxWindSpeed} km/h</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                  <p className="text-xs text-muted">Min Wind Speed</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.minWindSpeed} km/h</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                  <p className="text-xs text-muted">Current Direction</p>
                  <p className="text-2xl font-bold text-purple-400">{weather.current.winddirection}°</p>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                <p className="text-xs text-muted">Wind Gust</p>
                <p className="text-xl font-bold text-cyan-500">
                  {Math.round(weather.current.windspeed + 5)} km/h
                </p>
              </div>
            </div>
          </div>

          {/* Wind Speed Bar Chart */}
          <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📊 Wind Speed Distribution
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={windData.slice(0, 12)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.1} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<WindTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="windSpeed" 
                    fill="#06B6D4" 
                    name="Wind Speed (km/h)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          📊 Weather Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted">Average Temperature</p>
            <p className="text-lg font-bold">{stats.avgTemp}°C</p>
          </div>
          <div>
            <p className="text-xs text-muted">Highest Temperature</p>
            <p className="text-lg font-bold text-red-400">{stats.maxTemp}°C</p>
          </div>
          <div>
            <p className="text-xs text-muted">Lowest Temperature</p>
            <p className="text-lg font-bold text-blue-400">{stats.minTemp}°C</p>
          </div>
          <div>
            <p className="text-xs text-muted">Total Precipitation</p>
            <p className="text-lg font-bold text-cyan-400">{stats.totalPrecipitation.toFixed(1)} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAnalysis;