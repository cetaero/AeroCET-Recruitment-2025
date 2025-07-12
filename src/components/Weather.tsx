import React, { useState } from 'react';
import { fetchWeather } from '../api/weather';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Weather.css';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchWeather(city);
      setData(weatherData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <motion.h2
        className="weather-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🌤️ Weather Checker
      </motion.h2>

      <motion.button
        className="home-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Home
      </motion.button>

      <motion.div
        className="search-box"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </motion.div>

      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {data && !loading && (
        <motion.div
          className="weather-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3>{data.location.name},{data.location.country}</h3>
          <p>{data.current.condition.text}</p>
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          />
          <p>🌡 {data.current.temp_c} °C</p>
        </motion.div>
      )}
    </div>
  );
};

export default Weather;
