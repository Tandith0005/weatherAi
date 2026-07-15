export interface WeatherData {
  lat: number;
  lon: number;
  units: string;
  days: number;
  current: {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  daily: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    precipitation: number;
    weathercode: number;
  }>;
  hourly: Array<{
    time: string;
    temp: number;
    precipitation: number;
    weathercode: number;
  }>;
}
