"use client";

import Link from "next/link";
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaHeart,
  FaCloudSun,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowUp
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-sidebar-border bg-sidebar-bg">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4" />
        </button>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                <WiDaySunny className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  WeatherAI
                </h2>
                <p className="text-xs text-muted">AI Powered Weather Intelligence</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Real-time weather data with AI-powered insights. Stay ahead of the weather with accurate forecasts and intelligent analysis.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-sidebar-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-sidebar-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-sidebar-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-sidebar-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#current" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  Current Weather
                </Link>
              </li>
              <li>
                <Link href="/#hourly" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  Hourly Forecast
                </Link>
              </li>
              <li>
                <Link href="/#daily" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  Daily Forecast
                </Link>
              </li>
              <li>
                <Link href="/tree-analyse" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  Tree Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="https://weather-ai.co/" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  WeatherAi
                </Link>
              </li>
              <li>
                <Link href="https://weather-ai.co/docs" className="text-sm text-muted hover:text-primary transition-colors duration-200">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted">
                  info@weatherai.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted">
                  +254 700 123 456
                </span>
              </li>
            </ul>

            {/* Weather Status Badge */}
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-muted">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted">
              &copy; {currentYear} WeatherAI. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>Made with</span>
              <FaHeart className="w-3 h-3 text-red-400 animate-pulse" />
              <span>by Sadnan Zaman Tandith</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-xs text-muted hover:text-primary transition-colors duration-200">
                Privacy
              </Link>
              <span className="text-sidebar-border">|</span>
              <Link href="#" className="text-xs text-muted hover:text-primary transition-colors duration-200">
                Terms
              </Link>
              <span className="text-sidebar-border">|</span>
              <Link href="#" className="text-xs text-muted hover:text-primary transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;