import React, { useState } from 'react';
 // Add styles if needed
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Weather: React.FC = () => {
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
      <h2 style={{color:'white',fontWeight:'700'}}>Weather Forecast</h2>
      <input
      style={{width:'150px',height:'25px'}}
        type="text"
        placeholder="Enter city (e.g., London)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button  style={{position:'absolute',left:'10em',top:'4em'}} onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3 style={{color:'white',fontWeight:'700'}}>{weather.name}, {weather.sys.country}</h3>
          <p>🌡 Temperature:  {weather.main.temp}°C</p>
          <p>🌤 Condition:  {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed {weather.wind.speed} m/s</p>

          <MapContainer
            center={[weather.coord.lat, weather.coord.lon]}
            zoom={10}
            style={{ height: '300px', width: '100%', marginTop: '20px' }}
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
      )}
    </div>
  );
};

export default Weather;
