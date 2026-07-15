"use client";

import { WiDayCloudy } from "react-icons/wi";
import { formatTime, getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";
import Link from "next/link";

interface HourlyWeatherProps {
  weather: WeatherData;
}

const HourlyWeather = ({ weather }: HourlyWeatherProps) => {
  return (
    <section id="hourly" className="scroll-mt-16">
      <h2 className="md:text-4xl sm:text-2xl  font-bold mb-6 flex justify-between items-center md:gap-4 sm:gap-2 ">
        <div className="flex items-center gap-2">
          <WiDayCloudy className="w-7 h-7 text-cyan-500" />
        <span className="bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent">Hourly Forecast</span>
        </div>
        <Link href="/analysis">
        <span className="bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent text-xl underline">View Charts</span>
        </Link>

      </h2>

      <div className="rounded-xl p-6 ">
        {/* Mobile/Tablet: Horizontal Scroll - Hidden scrollbar */}
        <div className="block lg:hidden overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-4 w-max">
            {weather.hourly.slice(0, 12).map((hour, index) => (
              <div
                key={index}
                className="bg-primary/15 rounded-lg p-10 text-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(12,210,255,0.12)] hover:border-primary/50 transition-colors"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
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

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 ">
          {weather.hourly.slice(0, 8).map((hour, index) => (
            <div
              key={index}
              className="bg-primary/15 rounded-lg p-10 text-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(12,210,255,0.12)] hover:border-primary/50 transition-colors"
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
                <p className="text-xs text-muted mt-1">
                  {hour.precipitation}mm
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HourlyWeather;