"use client";

import { WiCloudy } from "react-icons/wi";
import { formatDate, getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";

interface DailyWeatherProps {
  weather: WeatherData;
}

const DailyWeather = ({ weather }: DailyWeatherProps) => {
  return (
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
              className="bg-background rounded-lg p-4 border border-sidebar-border hover:border-primary/50 transition-colors"
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
  );
};

export default DailyWeather;