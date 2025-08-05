import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Gallery from './components/Gallery';
import Weather from './components/Weather';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="content">
        <h1>
          Welcome to <span className="highlight">Gallery &</span> Weather 
        </h1>
        
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
