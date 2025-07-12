import React from 'react'
import Gallery from './components/Gallery'
import Weather from './components/Weather'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>

    </div>
  )
}

export default App