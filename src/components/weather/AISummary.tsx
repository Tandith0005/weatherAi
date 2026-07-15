"use client";

import { getWeatherCondition } from "@/src/lib/weatherConstants";
import { WeatherData } from "../interface/weatherInterface";

interface AISummaryProps {
  weather: WeatherData;
}

const AISummary = ({ weather }: AISummaryProps) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        💡 <span className="font-medium">AI Summary:</span> Weather conditions
        are currently {getWeatherCondition(weather.current.weathercode).label.toLowerCase()} with 
        temperatures around {Math.round(weather.current.temperature)}°C. Expect similar 
        conditions over the next few days with minimal precipitation. The highest temperature 
        will be around {Math.round(weather.daily[0]?.temp_max || 0)}°C with lows of{" "}
        {Math.round(weather.daily[0]?.temp_min || 0)}°C.
      </p>
    </div>
  );
};

export default AISummary;