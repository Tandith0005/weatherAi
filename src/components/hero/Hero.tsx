"use client";

import { WiThermometer, WiWindy, WiCloudy } from "react-icons/wi";
import { FaClock } from "react-icons/fa";
import {
  formatFullDate,
  formatTime,
  getWeatherCondition,
  getWeatherGradient,
} from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";

interface HeroProps {
  weather: WeatherData;
}

const Hero = ({ weather }: HeroProps) => {
  const condition = getWeatherCondition(weather.current.weathercode);
  const gradient = getWeatherGradient(
    weather.current.weathercode,
    weather.current.is_day,
  );

  const isDay = weather.current.is_day === 1;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-sidebar-bg border border-sidebar-border">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative p-6 sm:p-8 md:p-10">
        {/* Header - Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Left: City, Country and Date */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#D8E2FF] to-[#3B82F6] bg-clip-text text-transparent">
              Nairobi, Kenya
            </h1>
            <p className="text-muted text-sm sm:text-base mt-1">
              {formatFullDate(weather?.current?.time)}
            </p>
          </div>

          {/* Right: Day/Night Badge with Weather Condition */}
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2.5 rounded-full border border-sidebar-border">
            <span className="text-2xl">{isDay ? "☀️" : "🌙"}</span>
            <span className="text-md font-medium bg-linear-to-b from-[#00cff3] to-[#00d9ff] bg-clip-text text-transparent">
              {isDay ? "Day" : "Night"}
            </span>
          </div>
        </div>

        {/* Middle Section - Temperature and Condition */}
        <div className="mb-8">
          {/* Mobile Layout (hidden on sm and up) */}
          <div className="sm:hidden flex flex-col items-center gap-4">
            {/* Temperature */}
            <div className="flex items-start">
              <span className="text-7xl font-bold bg-linear-to-t from-[#D8E2FF] to-[#00d9ff] bg-clip-text text-transparent">
                {Math.round(weather.current.temperature)}°
              </span>
              <span className="text-4xl font-light text-muted ml-1 mt-2">
                C
              </span>
            </div>

            {/* Condition below temperature */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{condition.icon}</span>
                <span className="text-xl font-medium text-foreground">
                  {condition.label}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted">High:</span>
                  <span className="font-bold text-red-400">
                    {Math.round(weather.daily[0]?.temp_max || 0)}°C
                  </span>
                </div>

                <span className="text-muted">|</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-muted">Low:</span>
                  <span className="font-bold text-blue-400">
                    {Math.round(weather.daily[0]?.temp_min || 0)}°C
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout (hidden on mobile) */}
          <div className="hidden sm:grid sm:grid-cols-5 items-center">
            {/* Empty Space */}
            <div></div>
            <div></div>

            {/* Temperature */}
            <div className="flex justify-center">
              <div className="flex items-start">
                <span className="text-7xl sm:text-8xl md:text-9xl font-bold bg-linear-to-t from-[#D8E2FF] to-[#00d9ff] bg-clip-text text-transparent">
                  {Math.round(weather.current.temperature)}°
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-light text-muted ml-1 mt-2">
                  C
                </span>
              </div>
            </div>

            {/* Condition */}
            <div className="flex justify-start">
              <div className="flex flex-col gap-2 border-l border-sidebar-border pl-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{condition.icon}</span>
                  <span className="text-xl sm:text-2xl font-medium text-foreground">
                    {condition.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">High:</span>
                    <span className="font-bold text-red-400">
                      {Math.round(weather.daily[0]?.temp_max || 0)}°C
                    </span>
                  </div>

                  <span className="text-muted">|</span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">Low:</span>
                    <span className="font-bold text-blue-400">
                      {Math.round(weather.daily[0]?.temp_min || 0)}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty Space */}
            <div></div>
          </div>
        </div>

        {/* Bottom Section - Wind Speed, Direction, and Weather Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sidebar-border">
          <div className="bg-background/30 backdrop-blur-sm rounded-xl p-4 border border-sidebar-border hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <WiWindy className="w-5 h-5 text-cyan-500" />
              <span className="text-xs text-muted">Wind Speed</span>
            </div>
            <p className="text-2xl font-bold">
              {Math.round(weather.current.windspeed)}{" "}
              <span className="text-sm font-normal text-muted">km/h</span>
            </p>
          </div>

          <div className="bg-background/30 backdrop-blur-sm rounded-xl p-4 border border-sidebar-border hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <FaClock className="w-5 h-5 text-purple-500" />
              <span className="text-xs text-muted">Wind Direction</span>
            </div>
            <p className="text-2xl font-bold">
              {weather.current.winddirection}°{" "}
              <span className="text-sm font-normal text-muted">degrees</span>
            </p>
          </div>

          <div className="bg-background/30 backdrop-blur-sm rounded-xl p-4 border border-sidebar-border hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <WiCloudy className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-muted">Weather Code</span>
            </div>
            <p className="text-2xl font-bold">
              {weather.current.weathercode}{" "}
              <span className="text-sm font-normal text-muted">WMO</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;