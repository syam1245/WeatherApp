import "./Current-weather.css";

const WeatherDetails = ({ label, value }) => (
  <div className="parameter-row">
    <span className="parameter-label">{label}</span>
    <span className="parameter-value">{value}</span>
  </div>
);

const CurrentWeather = ({ data: { city, weather, main, wind } }) => {
  const details = [
    { label: "Feels like", value: `${Math.round(main.feels_like)}°C` },
    { label: "Wind", value: `${wind.speed} m/s` },
    { label: "Humidity", value: `${Math.round(main.humidity)}%` },
    { label: "Pressure", value: `${main.pressure} hPa` },
  ];

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{city}</p>
          <p className="weather-description">{weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(main.temp)}°C</p>
        <div className="details">
          {details.map((detail, index) => (
            <WeatherDetails key={index} label={detail.label} value={detail.value} />
          ))}
          {details.length > 0 && <WeatherDetails label="Details" value="" />}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
