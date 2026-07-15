interface LocationData {
  city: string;
  country: string;
  displayName: string;
}

export const fetchLocationByCoords = async (lat: number, lon: number): Promise<LocationData> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&addressdetails=1`
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