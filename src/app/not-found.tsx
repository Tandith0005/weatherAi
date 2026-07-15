'use client';
import Link from 'next/link';
import { WiDaySunny } from 'react-icons/wi';
import { FaHome, FaCompass } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Animated Weather Icon */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <WiDaySunny className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 text-[#ec9a52] mx-auto drop-shadow-[0_0_20px_rgba(236,154,82,0.7)] animate-pulse" />
        </div>

        {/* 404 Error Code */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-b from-[#ec9a52] via-primary to-secondary bg-clip-text text-transparent font-mono leading-tight">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 md:mt-4 text-foreground">
          Weather Forecast Not Found
        </h2>

        <p className="text-muted text-sm sm:text-base md:text-lg mt-2 sm:mt-3 md:mt-4 max-w-md mx-auto">
          Oops! The weather data you&apos;re looking for might have been blown away by the wind.
        </p>

        {/* Fun Weather Fact */}
        <div className="mt-4 sm:mt-5 md:mt-6 p-3 sm:p-4 bg-sidebar-bg border border-sidebar-border rounded-xl max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            ☁️ <span className="font-medium">Fun Fact:</span> The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California, on July 10, 1913.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25 text-sm sm:text-base w-full sm:w-auto"
          >
            <FaHome className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            href="/tree-analyse"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-sidebar-bg border border-sidebar-border text-foreground font-medium rounded-lg hover:bg-sidebar-border transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <FaCompass className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <span>Explore Tree Analysis</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-sidebar-border">
          <p className="text-xs sm:text-sm text-muted mb-2 sm:mb-3">You might be looking for:</p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Link href="/#current" className="text-xs sm:text-sm text-primary hover:underline transition-colors">
              Current Weather
            </Link>
            <span className="text-sidebar-border text-xs sm:text-sm hidden xs:inline">|</span>
            <Link href="/#hourly" className="text-xs sm:text-sm text-primary hover:underline transition-colors">
              Hourly Forecast
            </Link>
            <span className="text-sidebar-border text-xs sm:text-sm hidden xs:inline">|</span>
            <Link href="/#daily" className="text-xs sm:text-sm text-primary hover:underline transition-colors">
              Daily Forecast
            </Link>
            <span className="text-sidebar-border text-xs sm:text-sm hidden xs:inline">|</span>
            <Link href="/tree-analyse" className="text-xs sm:text-sm text-primary hover:underline transition-colors">
              Tree Analysis
            </Link>
          </div>
        </div>

        {/* Weather Emoji Animation */}
        <div className="mt-5 sm:mt-6 md:mt-8 text-2xl sm:text-3xl md:text-4xl opacity-20 select-none">
          🌤️ ⛅ 🌧️ ❄️ ⛈️ 
        </div>
      </div>
    </div>
  );
}