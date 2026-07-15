/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import toast from 'react-hot-toast';
import { searchCities } from '@/src/lib/geocoding'; // Import from geocoding

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

interface CitySearchProps {
  onCitySelect: (lat: number, lon: number, cityName: string) => void;
  onUseCurrentLocation: () => void;
  isLoading?: boolean;
  defaultCity?: string;
}

const CitySearch = ({ 
  onCitySelect, 
  onUseCurrentLocation, 
  isLoading = false,
  defaultCity = ''
}: CitySearchProps) => {
  const [query, setQuery] = useState(defaultCity);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search - using imported searchCities function
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query && query.length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchCities(query);
          setSuggestions(results);
        } catch (error) {
          console.error('Error searching cities:', error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onCitySelect(city.lat, city.lon, `${city.name}, ${city.country}`);
    toast.success(`📍 Weather loaded for ${city.name}, ${city.country}`);
  };

  const handleUseCurrentLocation = async () => {
    setIsLocating(true);
    try {
      await onUseCurrentLocation();
    } finally {
      setIsLocating(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto" ref={searchRef}>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-muted w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-sidebar-border bg-sidebar-bg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <FaSpinner className="w-4 h-4 text-primary animate-spin" />
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-sidebar-bg border border-sidebar-border rounded-xl shadow-xl max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-3 border-b border-sidebar-border/50 last:border-0"
                >
                  <WiDaySunny className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{city.name}</p>
                    <p className="text-xs text-muted truncate">
                      {city.state ? `${city.state}, ` : ''}{city.country}
                    </p>
                  </div>
                  <span className="text-xs text-muted flex-shrink-0">
                    {city.lat.toFixed(4)}, {city.lon.toFixed(4)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isLocating || isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-200 border border-primary/20 hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLocating ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              Locating...
            </>
          ) : (
            <>
              <FaMapMarkerAlt className="w-4 h-4" />
              Use Current Location
            </>
          )}
        </button>
      </div>

      {/* Quick Info */}
      <p className="text-xs text-muted mt-2 text-center mt-7">
        🌍 Search for any city worldwide or use your current location
      </p>
    </div>
  );
};

export default CitySearch;