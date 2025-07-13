import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Gallery from "./pages/Gallery"; 

import Weather from "./pages/Weather"; 

const App: React.FC = () => {
  const handleTask = (task: string) => {
    alert(`You selected ${task}`);
  };

  
  const openGalleryInNewTab = () => {
    const galleryUrl = '/gallery';
    window.open(galleryUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Router>
      <div className="app">
        <div className="content">
          <h1>Welcome to <span className="highlight">AeroCET</span> Recruitment 2025</h1>
          <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
          <div className="button-group">
           
            <button onClick={openGalleryInNewTab}>Gallery</button>
            <Link to="/weather">
              <button>Weather</button>
            </Link>

           
          </div>
        </div>

        
        <Routes>
           
          <Route path="/gallery" element={<Gallery />} />

         
          <Route path="/weather" element={<Weather />} />

         
          <Route path="/" element={<HomePageContent />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePageContent: React.FC = () => {
  return (
    <div>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2em', color: '#555' }}>
        Explore our projects or learn about our recruitment process!
      </p>
    </div>
  );
};

export default App;
