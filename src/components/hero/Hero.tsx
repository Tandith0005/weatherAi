"use client";

import { WiWindy, WiCloudy } from "react-icons/wi";
import { FaClock, FaCompass } from "react-icons/fa";
import {
  formatFullDate,
  getWeatherCondition,
  getWeatherGradient,
} from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import { useEffect, useState } from "react";
import { fetchLocationByCoords } from "@/src/lib/geocoding";

interface HeroProps {
  weather: WeatherData;
}

interface LocationInfo {
  city: string;
  country: string;
  displayName: string;
}

const Hero = ({ weather }: HeroProps) => {
  const [location, setLocation] = useState<LocationInfo>({
    city: 'Loading...',
    country: '',
    displayName: 'Loading location...',
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const condition = getWeatherCondition(weather.current.weathercode);
  const gradient = getWeatherGradient(
    weather.current.weathercode,
    weather.current.is_day,
  );

  const isDay = weather.current.is_day === 1;

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoadingLocation(true);
        const locationData = await fetchLocationByCoords(weather.lat, weather.lon);
        setLocation(locationData);
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation({
          city: 'Unknown City',
          country: 'Unknown Country',
          displayName: 'Unknown Location',
        });
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, [weather.lat, weather.lon]);

  return (
    <section id="current" className="relative overflow-hidden rounded-2xl bg-sidebar-bg border border-sidebar-border lg:min-h-[600px] xl:min-h-[650px] 2xl:min-h-[700px] flex flex-col">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative p-6 sm:p-8 md:p-10 w-full flex-1 flex flex-col">
        {/* Header - Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-12">
          {/* Left: City, Country and Date */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r dark:from-[#D8E2FF] dark:to-[#3B82F6] from-[#2653d8] to-[#3B82F6] bg-clip-text text-transparent">
              {isLoadingLocation ? (
                <span className="inline-flex items-center gap-2">
                  Loading...
                  <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                </span>
              ) : (
                `${location.city}, ${location.country}`
              )}
            </h1>
            <p className="text-muted text-sm sm:text-base lg:text-lg mt-1">
              {formatFullDate(weather?.current?.time)}
            </p>
          </div>

          {/* Right: Day/Night Badge with Weather Condition */}
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2.5 rounded-full border border-sidebar-border">
            <span className="text-2xl lg:text-3xl">{isDay ? "☀️" : "🌙"}</span>
            <span className="text-md lg:text-lg font-medium bg-linear-to-b from-[#00cff3] to-[#00d9ff] bg-clip-text text-transparent">
              {isDay ? "Day" : "Night"}
            </span>
          </div>
        </div>

        {/* Middle Section - Temperature and Condition*/}
        <div className="flex-1 flex items-center justify-center mb-8 lg:mb-12">
          {/* Mobile Layout (hidden on sm and up) */}
          <div className="sm:hidden flex flex-col items-center gap-4">
            {/* Temperature */}
            <div className="flex items-start">
              <span className="text-7xl font-bold bg-linear-to-t dark:from-[#D8E2FF] dark:to-[#00d9ff] from-[#58617c] to-[#00d9ff] bg-clip-text text-transparent">
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
                  <span className="text-muted">
                    <LuArrowUpWideNarrow className="w-6 h-6 text-[#FF516A]" />
                  </span>
                  <span className="font-bold text-red-400">
                    {Math.round(weather.daily[0]?.temp_max || 0)}°C
                  </span>
                </div>

                <span className="text-muted">|</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-muted">
                    <LuArrowDownWideNarrow className="w-6 h-6 text-[#81AAFF]" />
                  </span>
                  <span className="font-bold text-blue-400">
                    {Math.round(weather.daily[0]?.temp_min || 0)}°C
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout (hidden on mobile) */}
          <div className="hidden sm:grid sm:grid-cols-5 items-center lg:gap-4 w-full">
            {/* Empty Space */}
            <div></div>
            <div></div>

            {/* Temperature */}
            <div className="flex justify-center">
              <div className="flex items-start">
                <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] xl:text-[140px] 2xl:text-[160px] font-bold bg-linear-to-t dark:from-[#D8E2FF] dark:to-[#00d9ff] from-[#58617c] to-[#00d9ff] bg-clip-text text-transparent leading-none">
                  {Math.round(weather.current.temperature)}°
                </span>
                <span className="text-4xl sm:text-5xl md:text-2xl lg:text-3xl font-light text-muted ml-1 mt-2">
                  C
                </span>
              </div>
            </div>

            {/* Condition */}
            <div className="flex justify-start">
              <div className="flex flex-col gap-2 pl-6 lg:pl-12">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl lg:text-4xl">{condition.icon}</span>
                  <span className="text-xl sm:text-2xl lg:text-2xl font-medium text-foreground">
                    {condition.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm lg:text-base font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">
                      <LuArrowUpWideNarrow className="w-6 h-6 lg:w-7 lg:h-7 text-[#FF516A]" />
                    </span>
                    <span className="font-bold text-[#f84762] text-lg lg:text-xl">
                      {Math.round(weather.daily[0]?.temp_max || 0)}°C
                    </span>
                  </div>

                  <span className="text-muted">|</span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted">
                      <LuArrowDownWideNarrow className="w-6 h-6 lg:w-7 lg:h-7 text-[#81AAFF]" />
                    </span>
                    <span className="font-bold text-blue-400 text-lg lg:text-xl">
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

        {/* Bottom Section - Wind Speed, Direction, and Weather Code - Sticks to bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 lg:pt-8 border-t border-sidebar-border text-center mt-auto">
          {/* Wind Speed */}
          <div className="flex justify-center items-center gap-4">
            <div className="p-3 lg:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <WiWindy className="w-6 h-6 lg:w-7 lg:h-7 text-cyan-500" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-muted font-medium">Wind Speed</p>
              <p className="text-xl lg:text-2xl font-bold">
                {Math.round(weather.current.windspeed)}{" "}
                <span className="text-sm lg:text-base font-normal text-muted">km/h</span>
              </p>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="flex justify-center items-center gap-4">
            <div className="p-3 lg:p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <FaCompass className="w-6 h-6 lg:w-7 lg:h-7 text-purple-500" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-muted font-medium">Wind Direction</p>
              <p className="text-xl lg:text-2xl font-bold">
                {weather.current.winddirection}°{" "}
                <span className="text-sm lg:text-base font-normal text-muted">degrees</span>
              </p>
            </div>
          </div>

          {/* Units */}
          <div className="flex justify-center items-center gap-4">
            <div className="p-3 lg:p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <WiCloudy className="w-6 h-6 lg:w-7 lg:h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-muted font-medium">Units</p>
              <p className="text-xl lg:text-2xl font-bold">
                {weather.units === "metric" ? "Metric" : "Imperial"}{" "}
                <span className="text-sm lg:text-base font-normal text-muted">
                  {weather.units === "metric" ? "(°C)" : "(°F)"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;