import React, { useState } from 'react'


const Weather: React.FC =()=>{
    const [weatherdata,setWeatherdata]=useState<any>(null)
    const [city,setCity]=useState<string>('')
    const fetchWeather = async (city: string)=>{
        try{
            if(!city) return
             const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e56032aa10b058c80ad74c94142d2f6c&units=metric`
    );
        
            const data=await response.json()
            setWeatherdata(data)
            console.log(data)
        }
        catch(error){
            
        console.log(error)
    }
    }
    
    return (
        <div>
        <p className='weatherheading'>Weather</p>
        <div className='weathercontainer'>
            <input type="text" placeholder='enter city' className='searchbar' onChange={(e)=>setCity(e.target.value)} />
            <button className='searchbutton' onClick={()=>fetchWeather(city)}>Search</button>
        </div>
        
             {weatherdata && (
                <div className='weatherinfo'>
                    <div className="weather-card">
                        <h2 className="city-name">{weatherdata.name}, {weatherdata.sys.country}</h2>
                        <div className="weather-data">
                            <div className="data-item">
                                <span className="label">Temperature:</span>
                                <span className="value">{Math.round(weatherdata.main.temp)}°C</span>
                            </div>
                            <div className="data-item">
                                <span className="label">Wind Speed:</span>
                                <span className="value">{weatherdata.wind.speed} m/s</span>
                            </div>
                            <div className="data-item">
                                <span className="label">Humidity:</span>
                                <span className="value">{weatherdata.main.humidity}%</span>
                            </div>
                            <div className="data-item">
                                <span className="label">Condition:</span>
                                <span className="value">
                                    {weatherdata.weather[0].main} ({weatherdata.weather[0].description})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}
export default Weather