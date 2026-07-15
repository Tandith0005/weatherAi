"use client";

import { getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";
import { 
  FaBrain, 
  FaCloudSun, 
  FaTemperatureHigh, 
  FaTint,
  FaWind,
  FaCalendarAlt,
  FaClock
} from "react-icons/fa";
import { WiWindy, WiRain, WiHumidity } from "react-icons/wi";
import Link from "next/link";

interface AISummaryProps {
  weather: WeatherData;
}

const AISummary = ({ weather }: AISummaryProps) => {
  // Generate fallback summary
  const generateFallbackSummary = () => {
    const condition = getWeatherCondition(weather.current.weathercode);
    const avgTemp = Math.round(weather.current.temperature);
    const highTemp = Math.round(weather.daily[0]?.temp_max || 0);
    const lowTemp = Math.round(weather.daily[0]?.temp_min || 0);
    const windSpeed = Math.round(weather.current.windspeed);
    const precipitation = weather.daily.reduce(
      (acc, day) => acc + day.precipitation,
      0,
    );

    return (
      `Weather conditions are currently ${condition.label.toLowerCase()} with temperatures around ${avgTemp}°C. ` +
      `The wind is blowing at ${windSpeed} km/h. ` +
      `Today's high will reach ${highTemp}°C with a low of ${lowTemp}°C. ` +
      `Total precipitation over the next few days is expected to be ${precipitation.toFixed(1)}mm.`
    );
  };

  // Check if AI summary exists and is not null/undefined/empty
  const hasAISummary =
    weather.ai_summary &&
    weather.ai_summary.trim() !== "" &&
    weather.ai_summary !== "null";

  const summaryText = hasAISummary
    ? weather.ai_summary
    : generateFallbackSummary();
  const isAIGenerated = hasAISummary;

  // Get unique days count
  const uniqueDays = weather.daily.reduce((acc, day) => {
    const date = day.date;
    if (!acc.some(d => d.date === date)) {
      acc.push(day);
    }
    return acc;
  }, [] as typeof weather.daily);

  return (
    <section id="summary" className="scroll-mt-16 min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
                <h2 className="md:text-4xl sm:text-2xl  font-bold mb-6 flex items-center md:gap-4 sm:gap-2 md:mt-10 mt-2">
                  <span className="bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent">
                    AI Generated Summary
                  </span>
                </h2>
                <span className="text-xs md:block hidden text-muted bg-sidebar-bg px-3 py-1 rounded-full border border-sidebar-border">
                Ai Can Make Mistakes, Check <Link href="#current" className="text-primary underline"> Current</Link> for Accurate Weather Condition
                  
                </span>
              </div>
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div
              className={`p-3 rounded-xl ${
                isAIGenerated
                  ? "bg-purple-500/20 border border-purple-500/30"
                  : "bg-blue-500/20 border border-blue-500/30"
              }`}
            >
              {isAIGenerated ? (
                <FaBrain className="w-6 h-6 text-purple-400" />
              ) : (
                <FaCloudSun className="w-6 h-6 text-blue-400" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-sm font-semibold">
                {isAIGenerated ? "🤖 AI Generated Summary" : "📊 Weather Summary"}
              </span>
              {isAIGenerated && (
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-medium animate-pulse">
                  Powered by AI
                </span>
              )}
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                Updated: {new Date(weather.current.time).toLocaleTimeString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {summaryText}
            </p>

            {/* Quick Stats Grid - More detailed */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                <div className="flex justify-center items-center gap-2">
                  <FaTemperatureHigh className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs text-muted">Temperature</span>
                </div>
                <p className="text-lg flex justify-center font-bold mt-1">
                  {Math.round(weather.current.temperature)}°C
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                <div className="flex justify-center items-center gap-2">
                  <WiWindy className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-muted">Wind Speed</span>
                </div>
                <p className="text-lg flex justify-center font-bold mt-1">
                  {Math.round(weather.current.windspeed)} km/h
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                <div className="flex justify-center items-center gap-2">
                  <FaTint className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-muted">Precipitation</span>
                </div>
                <p className="text-lg flex justify-center font-bold mt-1">
                  {weather.daily
                    .reduce((acc, day) => acc + day.precipitation, 0)
                    .toFixed(1)} mm
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-sidebar-border">
                <div className="flex justify-center items-center gap-2">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted">Forecast Days</span>
                </div>
                <p className="text-lg flex justify-center font-bold mt-1">
                  {uniqueDays.length} Days
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <span className="text-red-400 font-medium">↑</span>
                <span>High: {Math.round(weather.daily[0]?.temp_max || 0)}°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400 font-medium">↓</span>
                <span>Low: {Math.round(weather.daily[0]?.temp_min || 0)}°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <WiRain className="w-4 h-4 text-cyan-400" />
                <span>Rain: {weather.daily[0]?.precipitation || 0}mm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaClock className="w-3.5 h-3.5 text-purple-400" />
                <span>Updated: {new Date(weather.current.time).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISummary;