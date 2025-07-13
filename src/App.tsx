import React from 'react';
import './App.css';

const App: React.FC = () => {
  const handleTask = (task: string) => {
    alert(`You selected ${task}`);
  };

  return (
    <div className="app">
      <div className="content">
        <h1>Welcome to <span className="highlight">AeroCET</span> Recruitment 2025</h1>
        <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
        <div className="button-group">

            <Link to="/gallery">
                    <button>Gallery</button>
                  </Link>
          <button onClick={() => handleTask('Task 2')}>Task 2 [Weather]</button>
        </div>
      </div>
    </div>
  );
};

export default App;

