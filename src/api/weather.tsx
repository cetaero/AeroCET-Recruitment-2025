import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);

  const handleSearch = () => {
    if (!city) return alert('Enter city name');
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      .then(r => r.json())
      .then(res => {
        const { latitude, longitude, name, country } = res.results[0];
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      })
      .then(r => r.json())
      .then(w => setData(w.current_weather))
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <div className="weather-box">
      <h2>Check Weather</h2>
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
      <button onClick={handleSearch}>🔍</button>
      {data && (
        <div className="weather-info">
          <p>Temp: {data.temperature}°C</p>
          <p>Wind: {data.windspeed} m/s</p>
          <p>Time: {new Date(data.time).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
