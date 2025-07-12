
const API_KEY = 'cf0bb6d5323546bd8cd61909251207';

export const fetchWeather = async (city: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || 'Failed to fetch weather');
  }
  return res.json();
};