import React, { useState } from 'react'
import './styles/Global.scss'
import './App.scss'
import Rainy from './asserts/rain.png'
import Clear from './asserts/clear.png'
import Clouds from './asserts/clouds.png'
import Drizzle from './asserts/drizzle.png'
import Mist from './asserts/mist.png'
import Snow from './asserts/snow.png'

const App = () => {

  const apiKey = "836b677c8968be1533dea0ddb3127e3f"

  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const search = async (event) => {

    event.preventDefault();
    if (!query) {
      alert("Enter city name.");
      return;
    }

    const city = query;
    try {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      let response = await fetch(URL).then(res => res.json());
      setWeatherData(response)
    } catch (error) {
      console.error(error)
    }

  }

  const getImage = () => {
    if (weatherData) {
      if (weatherData.clouds?.all < 10) {
        return Drizzle;
      }
      else if (weatherData.clouds?.all > 30) {
        return Clouds;
      } else if (weatherData.clouds?.all > 50) {
        return Rainy;
      }
      else if (weatherData.main?.temp < 10) {
        return Snow
      }
      return Clear
    }
  }

  return (
    <div className='app'>
      <div className="conatiner">
        <form className="searchBar" onSubmit={search}>
          <input type="text" placeholder='enter city name' className='searchInput'
            onChange={(event) => {
              setQuery(event.target.value)
            }} />
          <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className="invalid">
          <p>Invalid City Name</p>
        </div>
        <div className={`weather ${weatherData ? "show" : "hide"}`}>
          <div className="imgContainer">
            <img src={getImage()} alt="" className='weatherIcon' />
          </div>
          <div className="weatherDetails">
            <p className="temper">{Math.floor(weatherData?.main?.temp)}°C</p>
            <p className="cityName">{weatherData?.name}</p>
            <div className="moreInfo">
              <div className="wind">
                <p>Wind-Speed</p>
                <h2 className='windSpeed'>{weatherData?.wind.speed}km/h</h2>
              </div>
              <div className="humidity">
                <p>Humidity</p>
                <h2 className="humidityValue">{weatherData?.main.humidity}%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
