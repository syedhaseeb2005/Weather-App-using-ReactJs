// import BgVideo from '../src/Assets/ '
import ClearImg from './Assets/Clear.jpg'
import CloudyImg from './Assets/pexels-photo-3941855.webp'
import HazeImg from './Assets/haze.jpeg'
import RainyImg from './Assets/free-photo-of-cold-glass-rainy-windshield.jpeg'
import snowImg from './Assets/snow.jpg'
import stormyImg from './Assets/pexels-photo-557782.webp'
import SunnyImg from './Assets/Sunny.jpg'
import './App.css';
import {useEffect, useState } from 'react'

function WeatherApp() {
  const [city , setcity] = useState();
  const [search , setsearch] = useState('karachi')
  const [image , setImage] = useState()
  useEffect(()=>{
    async function weather(){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
        // if (!res.ok) {
        //   throw new Error('City not found');
        // }
        const data = await res.json()
        console.log(data);
        setcity(data.main)
        if (data.weather && data.weather.length > 0) {
          setWeatherImage(data.weather[0].main);
        }
    }
    weather()
  },[search])

  const setWeatherImage = (weatherConditions) => {
    let ImageString = weatherConditions;
    if (ImageString.toLowerCase().includes('clear')) {
      setImage(ClearImg);
    } else if (ImageString.toLowerCase().includes('clouds')) {
      setImage(CloudyImg);
    } else if (ImageString.toLowerCase().includes('snow')) {
      setImage(snowImg);
    } else if (ImageString.toLowerCase().includes('sunny')) {
      setImage(SunnyImg);
    } else if (ImageString.toLowerCase().includes('rain')) {
      setImage(RainyImg);
    } else if (ImageString.toLowerCase().includes('haze')) {
      setImage(HazeImg);
    } else if (ImageString.toLowerCase().includes('storm')) {
      setImage(stormyImg);
    }

}

  return (
    <div className='container' style={{backgroundImage:`url(${image})`}} >
      <div className='video-wrapper'>
        {/* <video autoPlay loop muted playsInline className='back-video'>
          <source src={BgVideo} type='video/mp4' />
        </video> */}
      </div>
      <div className='top-bar'>
        <input value={search} type='text' className='InputCity' placeholder='Enter city name...' onChange={(event)=>{ setsearch(event.target.value) }} />
      </div>
      {!city ? (
        // <p className='para'>OPPS! No Data Found</p>
        // <div class="loader"></div>
        <figure>
          <div className="dot white"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </figure>
      ) : (
        <>
          <div className='Weather-temp'>{Math.round(city.temp)}°C</div>
            <div className='Weather-Location'>{search}</div>
              <div className='data-container'>
                <div className='element'>
                  {/* <img src={humidityImg}  className='icon' alt='humidity' /> */}
                    <div className='data'>
                      <div className='humidity-percent'>{city.humidity}%</div>
                        <div className='text'>Humidity</div>
                      <div className='tem-min'>{Math.round(city.temp_min)}°C</div>
                        <div className='text'>Temp_min</div>
                </div>
              </div>
        <div className='element'>
          {/* <img src={windImg} alt='wind' /> */}
          <div className='data'>
            <div className='wind-percent'>{Math.round(city.feels_like)}°C</div>
            <div className='text'>Feels_like</div>
            <div className='temp-max'>{Math.round(city.temp_max)}°C</div>
            <div className='text'>Temp_min</div>
          </div>
        </div>
      </div>
      </>
    )}
    </div>
  );
}

export default WeatherApp;
