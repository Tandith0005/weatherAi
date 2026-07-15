"use client";

import { WiRain } from "react-icons/wi";
import { formatDate, getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";

interface ExtendedDaysWeatherProps {
  weather: WeatherData;
}

const ExtendedDaysWeather = ({ weather }: ExtendedDaysWeatherProps) => {
  return (
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
                className="bg-background rounded-lg p-4 border border-sidebar-border flex items-center justify-between hover:bg-sidebar-bg transition-colors flex-wrap gap-3"
              >
                <div className="flex items-center gap-4 flex-1 min-w-[120px]">
                  <span className="text-2xl">{condition.icon}</span>
                  <div>
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {condition.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Min
                    </p>
                    <p className="font-bold text-blue-400">
                      {Math.round(day.temp_min)}°C
                    </p>
                  </div>
                  <div className="hidden sm:block w-20 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
  );
};

export default ExtendedDaysWeather;