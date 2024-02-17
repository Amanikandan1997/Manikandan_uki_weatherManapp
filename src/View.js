import React, { useEffect, useState } from 'react'
import SearchIcon from "./assets/search.png"
import Sun from "./assets/sunny.png"
import Humidity1 from "./assets/humidity.png"
import rain from "./assets/rainy.png"
import snow from './assets/snow.png'
import winter from "./assets/winter.png"
import cloud from "./assets/cloud.png"
import cloud1 from "./assets/cloud1.png"
import moon from "./assets/moon.png"
import dayrain from "./assets/mrgrain.png"
import ni8rain from "./assets/nightrain.png"
import thunder from "./assets/thunder1.png"
import "./App.css"


// Weather Details  Props setting
const WeatherDetails = ({icon ,temp ,city,country,log,lat,humidity,wind}) =>{
  return(
    <>
    <div className="image">
      <img src={icon} alt='image'/>
  
    </div>
    <div className="temp">{temp}&deg;c</div>
    <div className="Location">{city}</div>
    <div className="country">{country}</div>
    <div className="card">
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={Humidity1}alt='huminty icon' className='icon' height={30} width={30} />
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={winter}alt='huminty icon' className='icon' height={30} width={30} />
        <div className="data">
          <div className="humidity-percent">{wind} km/hr</div>
          <div className="text">wind speed</div>
        </div>
      </div>
    </div>
    </>
  )
  
}

// weather View Design
function View() {
  const[icon,setIcon] =useState(Sun);
   const[text,setText]=useState("Marthandam");
  const[Temp,setTemp] =useState(0);
  const[city,setcity] =useState("");
  const [country, setCountry]=useState('India');
  const[log,setlog]=useState(0);
  const[lat,setlat]=useState(0);
  const [wind,setwind]=useState(0)
  const[humidity,sethumidity]=useState(0)

  const [cityNotFound,setCityNotFound]=useState(false)
   const[loading,setLoading]=useState(false);
    const [error,seterror]=useState(null);
  const weatherIcoMap ={
    "01d":Sun,
    "01n":moon,
    "02d":cloud,
    "02n":moon,
    "03d":cloud,
    "03n":moon,
    "04d":cloud,
    "04n":moon,
    "09d":dayrain,
    "09n":ni8rain,
    "10n":thunder,
    "10d":thunder,
    '13d':snow,
    '13n':snow,
    '50d':wind,
     '50n':wind
        
  };

  const search=async ()=>{
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=7613c504095b0c87b22d50c15fcce721&units=metric`
    try{
      let res =await fetch(url);
      let data =await res.json();
      console.log(data);
      if(data.cod === '404'){
        console.error(data.message);
        setCityNotFound(true);
        setLoading(false)
        return;
      }
      sethumidity(data.main.humidity);
      setwind(data.wind.speed);
      setTemp(Math.floor(data.main.temp))
      setcity(data.name );
      setCountry(data.sys.country);
      setlat(data.coord.lat)
      setlog(data.coord.lon)
      const weatherIconcode =data.weather[0].icon;
       setIcon(weatherIcoMap[weatherIconcode] || Sun );
       setCityNotFound(false);
    }
    
    catch(error){
     console.error("An error occurred:",error.message);
     seterror("An occured  while trying to connect to the server");
    } finally{
        setLoading(false);
    }
  }
   const handlecity =(e)=>{
     setText(e.target.value);
   }
   const handleKeyDown =(e)=>{
    if (e.key === "Enter"){
      search();
    }
  };
  useEffect(function(){
    search();
  },[]);

  return (
    <>
    <div className='container'>
      
      <h2  class="animate-charcter">Marthandam WeatherMan</h2>
      <div className="input-container">
        <input type="text" className="cityInput" placeholder='search city' onChange={handlecity} value={text} onKeyDown={handleKeyDown} />
        <div className="search-icon">
          <img src={SearchIcon} alt='search' onClick={()=>search()}/>
        </div>
  
        </div>
                      {loading && <div className='loading-message'>Loading...</div>}
                       { error && <div className="error-message">{error}</div>}
                     {cityNotFound &&  <div className="citynotfound">City Not Found</div>}
                     {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={Temp} 
                      city={city} country={country}
                      lat={lat} log={log}
                       humidity={humidity} wind={wind}/>}   
    <h2 class="animate-charcter" >Manikandan U K I @ {(new Date().getFullYear())}  <span></span></h2>
 
    </div>
    </>
    
  )
}

export default View