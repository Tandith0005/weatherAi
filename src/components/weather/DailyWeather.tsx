"use client";

import { WiCloudy, WiRain, WiThermometer } from "react-icons/wi";
import { FaCalendarAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { formatDate, getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";
import Link from "next/link";

interface DailyForecastProps {
  weather: WeatherData;
}

const DailyForecast = ({ weather }: DailyForecastProps) => {
  // Get unique days (remove duplicates)
  const uniqueDays = weather.daily.reduce(
    (acc, day) => {
      const date = day.date;
      if (!acc.some((d) => d.date === date)) {
        acc.push(day);
      }
      return acc;
    },
    [] as typeof weather.daily,
  );

  return (
    <section id="daily" className="scroll-mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-4xl sm:text-2xl  font-bold mb-6 flex items-center md:gap-4 sm:gap-2 md:mt-10 mt-2">
          <WiCloudy className="w-7 h-7 text-cyan-500" />
          <span className="bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent">
            7 Day Forecast
          </span>
        </h2>
        <Link href="/analysis">
        <span className="bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent text-xl underline">View Charts</span>
        </Link>
      </div>

      <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border shadow-lg">
        {/* Desktop View - Premium Table Layout */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="text-left text-xs text-muted border-b border-sidebar-border">
                  <th className="pb-3 font-medium">Day</th>
                  <th className="pb-3 font-medium">Condition</th>
                  <th className="pb-3 font-medium text-center">
                    Precipitation
                  </th>
                  <th className="pb-3 font-medium text-center">Min / Max</th>
                  <th className="pb-3 font-medium text-center">
                    Temperature Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {uniqueDays.map((day, index) => {
                  const condition = getWeatherCondition(day.weathercode);
                  const isToday = index === 0;
                  const tempRange = day.temp_max - day.temp_min;
                  const minPercent = (day.temp_min / 40) * 100;
                  const rangePercent = (tempRange / 40) * 100;

                  return (
                    <tr
                      key={index}
                      className={`border-b border-sidebar-border/50 last:border-0 hover:bg-background/30 transition-colors ${
                        isToday ? "bg-primary/5" : ""
                      }`}
                    >
                      {/* Day */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{condition.icon}</span>
                          <div>
                            <p
                              className={`font-semibold ${isToday ? "text-primary" : ""}`}
                            >
                              {isToday ? "Today" : formatDate(day.date)}
                            </p>
                            <p className="text-xs text-muted">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Condition */}
                      <td className="py-4 pr-4">
                        <span className="text-sm font-medium">
                          {condition.label}
                        </span>
                      </td>

                      {/* Precipitation */}
                      <td className="py-4 pr-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <WiRain className="w-5 h-5 text-cyan-400" />
                          <span className="font-medium">
                            {day.precipitation > 0
                              ? `${day.precipitation}mm`
                              : "0.0mm"}
                          </span>
                        </div>
                      </td>

                      {/* Min/Max */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1">
                            <FaArrowDown className="w-3 h-3 text-blue-400" />
                            <span className="font-semibold text-blue-400">
                              {Math.round(day.temp_min)}°
                            </span>
                          </div>
                          <span className="text-muted">/</span>
                          <div className="flex items-center gap-1">
                            <FaArrowUp className="w-3 h-3 text-red-400" />
                            <span className="font-semibold text-red-400">
                              {Math.round(day.temp_max)}°
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Temperature Range Bar */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted w-8">
                            {Math.round(day.temp_min)}°
                          </span>
                          <div className="flex-1 h-2 bg-sidebar-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full transition-all duration-500"
                              style={{
                                width: `${rangePercent}%`,
                                marginLeft: `${minPercent}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted w-8 text-right">
                            {Math.round(day.temp_max)}°
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet View - Card Layout */}
        <div className="lg:hidden space-y-4">
          {uniqueDays.map((day, index) => {
            const condition = getWeatherCondition(day.weathercode);
            const isToday = index === 0;

            return (
              <div
                key={index}
                className={`bg-background rounded-xl p-4 border transition-all ${
                  isToday
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "border-sidebar-border hover:border-primary/30"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{condition.icon}</span>
                    <div>
                      <p
                        className={`font-semibold ${isToday ? "text-primary" : ""}`}
                      >
                        {isToday ? "Today" : formatDate(day.date)}
                      </p>
                      <p className="text-xs text-muted">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{condition.label}</p>
                    {day.precipitation > 0 && (
                      <p className="text-xs text-cyan-400 flex items-center justify-end gap-1">
                        <WiRain className="w-4 h-4" />
                        {day.precipitation}mm
                      </p>
                    )}
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-sidebar-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <FaArrowDown className="w-3 h-3 text-blue-400" />
                      <span className="font-semibold text-blue-400">
                        {Math.round(day.temp_min)}°C
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaArrowUp className="w-3 h-3 text-red-400" />
                      <span className="font-semibold text-red-400">
                        {Math.round(day.temp_max)}°C
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full"
                        style={{
                          width: `${((day.temp_max - day.temp_min) / 30) * 100}%`,
                          marginLeft: `${(day.temp_min / 30) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <WiThermometer className="w-4 h-4" />
                    <span>
                      {Math.round((day.temp_max + day.temp_min) / 2)}°C
                    </span>
                  </div>
                </div>

                {/* Today Badge */}
                {isToday && (
                  <div className="mt-3 pt-2 border-t border-sidebar-border/50">
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                      Current Forecast
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-sidebar-border grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted">Average High</p>
            <p className="text-lg font-bold text-red-400">
              {Math.round(
                uniqueDays.reduce((acc, day) => acc + day.temp_max, 0) /
                  uniqueDays.length,
              )}
              °C
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">Average Low</p>
            <p className="text-lg font-bold text-blue-400">
              {Math.round(
                uniqueDays.reduce((acc, day) => acc + day.temp_min, 0) /
                  uniqueDays.length,
              )}
              °C
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">Total Precipitation</p>
            <p className="text-lg font-bold text-cyan-400">
              {uniqueDays
                .reduce((acc, day) => acc + day.precipitation, 0)
                .toFixed(1)}
              mm
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">Forecast Days</p>
            <p className="text-lg font-bold text-primary">
              {uniqueDays.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyForecast;
