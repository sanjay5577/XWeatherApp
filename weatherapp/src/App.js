
import './App.css';
import { useState } from 'react';
import axios from "axios"

function App() {

  const[input , setInput] = useState("");
  const[weather , setWeather] = useState([]);
  const[isloading , setIsLoading] = useState(false);

  const handleChange=(e)=>{
     setInput(e.target.value)
  }

  const handleSearch= async()=>{
    setIsLoading(true)
   try{
    const apidata = await axios.get(`https://api.weatherapi.com/v1/current.json?key=389ba337d739475ca58132950243101&q=${input}`);
    if(apidata ){
      console.log(apidata.data.current);
      setWeather(apidata.data.current)
      setIsLoading(false)
    }
    

   }
   catch(e){
        alert("Failed to fetch weather data")
   }
    
  }

console.log(weather);

  return (
    <div className="App">
      <div>
      <input 
        type="text"  
        name="weathersearch" 
        value={input} 
        onChange={handleChange}
        />
    
    <button onClick={handleSearch}>Search</button>
    </div>
    {isloading ?<p>Loading data…</p> : (Object.keys(weather).length >0 && <div className='cardsdiv'>
      <div className='weather-card'>
        <h4>Temperatue</h4>
        <p>{weather.temp_c}°C</p>
      </div>
      <div className='weather-card'>
        <h4>Humitidy</h4>
        <p>{weather.humidity}%</p>
      </div>
      <div className='weather-card'>
        <h4>Condition</h4>
        <p>{weather.condition.text}</p>
      </div>
      <div className='weather-card'>
        <h4>Wind Speed</h4>
        <p>{weather.wind_kph} kph</p>
      </div>
    </div>)}
    </div>
    
  );
}

export default App;
