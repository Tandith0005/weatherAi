"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { FaTree, FaSeedling, FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("current");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to update active section (only on home page)
  useEffect(() => {
    if (!mounted || !isHomePage) return;

    const handleScroll = () => {
      const sections = ["current", "hourly", "daily", "summary"];
      let current = "current";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 80) {
            current = section;
          }
        }
      }

      // Special handling for the last section (AI Summary)
      const summaryElement = document.getElementById("summary");
      if (summaryElement) {
        const summaryRect = summaryElement.getBoundingClientRect();
        if (summaryRect.top <= 250) {
          current = "summary";
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, isHomePage]);

  const navItems = [
    { name: "Current", icon: "🌡️", href: "#current" },
    { name: "Hourly", icon: "🌤️", href: "#hourly" },
    { name: "7 Days", icon: "🌥️", href: "#daily" },
    { name: "AI Summary", icon: "🤖", href: "#summary" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-sidebar-bg/95 backdrop-blur-sm border border-sidebar-border text-foreground hover:bg-sidebar-border transition-all duration-200 shadow-lg"
        aria-label="Toggle menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-[280px] sm:w-64 bg-sidebar-bg border-r border-sidebar-border 
          flex flex-col transition-all duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Logo */}
        <Link href="/">
          <div className="p-4 sm:p-5 md:p-6 pb-3 sm:pb-4 text-center flex-shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00cff3] to-[#00d9ff] bg-clip-text text-transparent">
              WeatherAI
            </h1>
            <span className="text-[10px] sm:text-[11px] md:text-[12px] text-gray-500 dark:text-gray-400 block mt-0.5">
              AI Powered Weather
            </span>
          </div>
        </Link>

        <hr className="border-sidebar-border mx-3 sm:mx-4 flex-shrink-0" />

        {/* Theme Toggle */}
        <div className="p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
          <span className="text-sm sm:text-base md:text-lg text-primary dark:text-primary font-medium">
            Theme
          </span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FaSun className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400" />
            ) : (
              <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
            )}
          </button>
        </div>

        <hr className="border-sidebar-border mx-3 sm:mx-4 flex-shrink-0" />

        {/* Conditional Content: Nav Links or Go Back */}
        {isHomePage ? (
          // Home Page - Show Navigation Links (Your original code)
          <>
            <nav className="flex-1 p-3 sm:p-4 overflow-y-auto min-h-0">
              <ul className="space-y-1.5 sm:space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`
                          flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 
                          rounded-lg transition-all duration-200 group cursor-pointer
                          text-sm sm:text-base
                          ${
                            isActive
                              ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_20px_rgba(12,210,255,0.15)]"
                              : "hover:bg-primary/8 hover:text-primary"
                          }
                        `}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium truncate">{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <hr className="border-sidebar-border mx-3 sm:mx-4 flex-shrink-0" />

            {/* Weather Analytics & Tree Analysis Section (Your original code) */}
            <div className="p-3 sm:p-4 pb-6 flex-shrink-0 space-y-8 mt-5">
              {/* Weather Analytics Button */}
              <Link
                href="/analysis"
                className="relative flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full"
              >
                <span className="absolute -top-2 -right-1 flex">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-70"></span>
                  <span className="relative uppercase rounded-full bg-blue-400 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold text-black shadow-lg">
                    Charts
                  </span>
                </span>
                <span className="text-xl">📊</span>
                <span className="font-medium truncate">Weather Analytics</span>
              </Link>

              {/* Tree Analysis Button */}
              <Link
                href="/tree-analyse"
                className="relative flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full"
              >
                <FaTree className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Tree Analysis</span>
                <FaSeedling className="ml-auto h-3 w-3 sm:h-4 sm:w-4 transition group-hover:rotate-12 flex-shrink-0" />
                <span className="absolute -top-2 -right-2 flex">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-70"></span>
                  <span className="relative rounded-full bg-yellow-400 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold text-black shadow-lg">
                    NEW
                  </span>
                </span>
              </Link>
            </div>
          </>
        ) : (
          // Other Pages - Show only Go Back Button with your existing analytics buttons
          <>
            {/* Go Back Button */}
            <div className="flex-1 flex items-start justify-center p-4 pt-8">
              <Link
                href="/"
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full justify-center group"
              >
                <FaArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Go Back Home</span>
              </Link>
            </div>

            <hr className="border-sidebar-border mx-3 sm:mx-4 flex-shrink-0" />

            {/* Weather Analytics & Tree Analysis Section (Your original code but without the space-y-8 mt-5) */}
            <div className="p-3 sm:p-4 pb-6 flex-shrink-0 space-y-3">
              {/* Weather Analytics Button */}
              <Link
                href="/analysis"
                className="relative flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full"
              >
                <span className="absolute -top-2 -right-1 flex">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-70"></span>
                  <span className="relative uppercase rounded-full bg-blue-400 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold text-black shadow-lg">
                    Charts
                  </span>
                </span>
                <span className="text-xl">📊</span>
                <span className="font-medium truncate">Weather Analytics</span>
              </Link>

              {/* Tree Analysis Button */}
              <Link
                href="/tree-analyse"
                className="relative flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-3 sm:px-4 py-2.5 sm:py-3 text-white transition hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full"
              >
                <FaTree className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Tree Analysis</span>
                <FaSeedling className="ml-auto h-3 w-3 sm:h-4 sm:w-4 transition group-hover:rotate-12 flex-shrink-0" />
                <span className="absolute -top-2 -right-2 flex">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-70"></span>
                  <span className="relative rounded-full bg-yellow-400 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold text-black shadow-lg">
                    NEW
                  </span>
                </span>
              </Link>
            </div>
          </>
        )}
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;