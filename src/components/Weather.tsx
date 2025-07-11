import React, { useState } from 'react';
import './Weather.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const Weather: React.FC = () => {
  const navigate =useNavigate();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c406b72d09c1e1b33093c1f70eff6002&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found');
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <button className="gallery-home-button" onClick={() => navigate('/')}>🏠 Home</button>

      <h2>Weather Forecast</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city (e.g., London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading">Loading weather data...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <div className="weather-details">
            <p>🌡 Temperature: {weather.main.temp}°C</p>
            <p>🌤 Feels like: {weather.main.feels_like}°C</p>
            <p>☁ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
            <p>⏱ Pressure: {weather.main.pressure} hPa</p>
          </div>

          <div className="map-container">
            <MapContainer
              center={[weather.coord.lat, weather.coord.lon]}
              zoom={10}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[weather.coord.lat, weather.coord.lon]}>
                <Popup>{weather.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;