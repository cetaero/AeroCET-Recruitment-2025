import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div className="app">
      <div className="content">
        <h1>Welcome to <span className="highlight">AeroCET</span> Recruitment 2025</h1>
        <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
        <div className="button-group">
          <button onClick={()=>{navigate('/gallery')}}>Gallery</button>
          <button>Task 2 [Weather]</button>
        </div>
      </div>
    </div>
  );
}

export default Home