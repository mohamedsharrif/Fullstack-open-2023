import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = "c1000c3b3c81ae66c826479e241d853d";

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [selectedCountry, apiKey]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handlechange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  };
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };
  const getWeatherIcon = () => {
    if (!weather) return null;
    const weatherCode = weather.weather[0].id;
    if (weatherCode >= 200 && weatherCode < 300) {
      return "⛈️"; // Thunderstorm
    } else if (weatherCode >= 300 && weatherCode < 400) {
      return "🌧️"; // Drizzle
    } else if (weatherCode >= 500 && weatherCode < 600) {
      return "🌧️"; // Rain
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return "🌨️"; // Snow
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return "🌫️"; // Atmosphere (mist, fog, etc.)
    } else if (weatherCode === 800) {
      return "☀️"; // Clear
    } else if (weatherCode > 800 && weatherCode < 900) {
      return "☁️"; // Clouds
    } else {
      return null;
    }
  };

  return (
    <div>
      find countries <input onChange={handlechange} value={filter}></input>
      {selectedCountry ? (
  <div>
    <h2>{selectedCountry.name.common}</h2> 
    <p>Capital: {selectedCountry.capital}</p> 
    <p>Area: {selectedCountry.area} km²</p> 
    <h3>Languages: </h3>
    <ul>
      {Object.values(selectedCountry.languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}
    </ul>
    <img
      src={selectedCountry.flags.svg}
      width={"20%"}
      alt="Country Flag"
    />
    {weather && (
      <div>
        <h3>Weather in {selectedCountry.capital}</h3>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>{getWeatherIcon()}</p>
        <p>{weather.weather[0].description}</p>
      </div>
    )}
  </div>
) : filteredCountries.length > 10 ? (
  <p>Too many matches, specify another filter.</p>
) : (
  filteredCountries.map((country, index) => (
    <div key={index}>
      {country.name.common}{" "}
      <button onClick={() => handleCountrySelect(country)}>Show</button>
    </div>
  ))
)}

    </div>
  );
}

export default App;

