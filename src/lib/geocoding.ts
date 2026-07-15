/* eslint-disable @typescript-eslint/no-explicit-any */

interface LocationData {
  city: string;
  country: string;
  displayName: string;
}

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
  displayName?: string;
}

export const searchCities = async (query: string): Promise<City[]> => {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=5&addressdetails=1&featureclass=P&featurecode=PPL`,
      {
        headers: {
          'User-Agent': 'WeatherAI-App/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }

    const data = await response.json();

    return data.map((item: any) => ({
      name: item.address?.city || 
            item.address?.town || 
            item.address?.village || 
            item.display_name?.split(',')[0] || 
            'Unknown',
      country: item.address?.country || 'Unknown',
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      state: item.address?.state,
      displayName: item.display_name,
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const fetchLocationByCoords = async (lat: number, lon: number): Promise<LocationData> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'WeatherAI-App/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }

    const data = await response.json();
    
    // Extract city and country from the response
    const address = data.address || {};
    const city = address.city || address.town || address.village || address.hamlet || 'Unknown City';
    const country = address.country || 'Unknown Country';
    const displayName = data.display_name || `${city}, ${country}`;

    return {
      city,
      country,
      displayName,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    // Return fallback values
    return {
      city: 'Unknown City',
      country: 'Unknown Country',
      displayName: 'Unknown Location',
    };
  }
};