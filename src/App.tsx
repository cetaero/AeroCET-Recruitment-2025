import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Gallery from './components/Gallery'; // adjust path if needed
import Weather from './components/Weather';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="content">
        <h1>
          Welcome to <span className="highlight">AeroCET</span> Recruitment 2025
        </h1>
        <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
        <div className="button-group">
          <button onClick={() => navigate('/gallery')}>Gallery</button>
          <button onClick={() => navigate('/weather')}>Weather</button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path='/weather' element={<Weather />}/>
    </Routes>
  );
};

export default App;
