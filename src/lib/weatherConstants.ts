// Weather code to condition mapping
export const getWeatherCondition = (code: number) => {
  const conditions: { [key: number]: { label: string; icon: string } } = {
    0: { label: "Clear", icon: "☀️" },
    1: { label: "Mostly Clear", icon: "🌤️" },
    2: { label: "Partly Cloudy", icon: "⛅" },
    3: { label: "Cloudy", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Fog", icon: "🌫️" },
    51: { label: "Light Drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌧️" },
    55: { label: "Heavy Drizzle", icon: "🌧️" },
    61: { label: "Light Rain", icon: "🌧️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy Rain", icon: "🌧️" },
    71: { label: "Light Snow", icon: "❄️" },
    73: { label: "Snow", icon: "❄️" },
    75: { label: "Heavy Snow", icon: "❄️" },
    80: { label: "Rain Showers", icon: "🌦️" },
    81: { label: "Rain Showers", icon: "🌦️" },
    82: { label: "Heavy Rain Showers", icon: "🌧️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm", icon: "⛈️" },
    99: { label: "Thunderstorm", icon: "⛈️" },
  };
  return conditions[code] || { label: "Unknown", icon: "❓" };
};

// Format time helper
export const formatTime = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format date helper
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Format full date
export const formatFullDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} | ${formattedTime}`;
};

// (DEPRECATED)---------- SINCE WE USED REACT BITS WE DON'T NEED IT FOR NOW BUT KEEPING IT FOR REFRENCE IF NEEDED IN FUTURE--------------------------------
// Get weather background gradient 
export const getWeatherGradient = (code: number, isDay: number) => {
  if (isDay === 0) {
    // Night gradients
    const nightGradients: { [key: number]: string } = {
      0: "from-[#0c0e1a] via-[#1a1f3a] to-[#2d1b4e]", // Clear night - deep indigo
      1: "from-[#0c0e1a] via-[#1a1f3a] to-[#2d1b4e]", // Mostly clear
      2: "from-[#0a0e1a] via-[#151a2e] to-[#1a1a2e]", // Partly cloudy
      3: "from-[#0a0a12] via-[#12121e] to-[#1a1a28]", // Cloudy
      45: "from-[#08080e] via-[#12121e] to-[#1a1a28]", // Fog
      48: "from-[#08080e] via-[#12121e] to-[#1a1a28]", // Fog
      51: "from-[#080e1a] via-[#0f1a2a] to-[#1a1a2e]", // Light drizzle
      53: "from-[#080e1a] via-[#0f1a2a] to-[#1a1a2e]", // Drizzle
      55: "from-[#080e1a] via-[#0f1a2a] to-[#1a1a2e]", // Heavy drizzle
      61: "from-[#060c18] via-[#0d1828] to-[#182028]", // Light rain
      63: "from-[#060c18] via-[#0d1828] to-[#182028]", // Rain
      65: "from-[#060c18] via-[#0d1828] to-[#182028]", // Heavy rain
      71: "from-[#0a0e1a] via-[#1a2a3a] to-[#2a1a2a]", // Light snow
      73: "from-[#0a0e1a] via-[#1a2a3a] to-[#2a1a2a]", // Snow
      75: "from-[#0a0e1a] via-[#1a2a3a] to-[#2a1a2a]", // Heavy snow
      80: "from-[#060c18] via-[#0d1828] to-[#182028]", // Rain showers
      81: "from-[#060c18] via-[#0d1828] to-[#182028]", // Rain showers
      82: "from-[#060c18] via-[#0d1828] to-[#182028]", // Heavy rain showers
      95: "from-[#0a0a0f] via-[#1a0a1a] to-[#2a0a2a]", // Thunderstorm
      96: "from-[#0a0a0f] via-[#1a0a1a] to-[#2a0a2a]", // Thunderstorm
      99: "from-[#0a0a0f] via-[#1a0a1a] to-[#2a0a2a]", // Thunderstorm
    };
    return nightGradients[code] || "from-[#0c0e1a] via-[#1a1f3a] to-[#2d1b4e]";
  }

  // Day gradients - more vibrant and modern
  const dayGradients: { [key: number]: string } = {
    0: "from-[#4facfe] via-[#00f2fe] to-[#43e97b]", // Clear - sunny vibrant
    1: "from-[#4facfe] via-[#00f2fe] to-[#a8edea]", // Mostly clear - soft
    2: "from-[#a8c0ff] via-[#3f2b96] to-[#6a82fb]", // Partly cloudy - purple dream
    3: "from-[#b8c6db] via-[#f5f7fa] to-[#d4d9e0]", // Cloudy - soft gray
    45: "from-[#c9d6ff] via-[#e2e2e2] to-[#d4d9e0]", // Fog - ethereal
    48: "from-[#c9d6ff] via-[#e2e2e2] to-[#d4d9e0]", // Fog
    51: "from-[#2193b0] via-[#6dd5ed] to-[#56ab2f]", // Light drizzle - teal to green
    53: "from-[#2193b0] via-[#6dd5ed] to-[#56ab2f]", // Drizzle
    55: "from-[#2193b0] via-[#6dd5ed] to-[#56ab2f]", // Heavy drizzle
    61: "from-[#2c3e50] via-[#3498db] to-[#2980b9]", // Light rain - deep blue
    63: "from-[#2c3e50] via-[#3498db] to-[#2980b9]", // Rain
    65: "from-[#1a2a3a] via-[#2980b9] to-[#1a5276]", // Heavy rain
    71: "from-[#e6dada] via-[#bdc3c7] to-[#95a5a6]", // Light snow - silver
    73: "from-[#e6dada] via-[#bdc3c7] to-[#95a5a6]", // Snow
    75: "from-[#d5dee7] via-[#b8c6db] to-[#8a9ba8]", // Heavy snow
    80: "from-[#2c3e50] via-[#3498db] to-[#2980b9]", // Rain showers
    81: "from-[#2c3e50] via-[#3498db] to-[#2980b9]", // Rain showers
    82: "from-[#1a2a3a] via-[#2980b9] to-[#1a5276]", // Heavy rain showers
    95: "from-[#2d1b3d] via-[#1a0a1a] to-[#0a0a0f]", // Thunderstorm - dramatic
    96: "from-[#2d1b3d] via-[#1a0a1a] to-[#0a0a0f]", // Thunderstorm
    99: "from-[#2d1b3d] via-[#1a0a1a] to-[#0a0a0f]", // Thunderstorm
  };
  return dayGradients[code] || "from-[#4facfe] via-[#00f2fe] to-[#43e97b]";
};
