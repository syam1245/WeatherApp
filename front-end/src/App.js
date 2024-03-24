import React, { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather.js";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ).then(res => res.json());

      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ).then(res => res.json());

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
