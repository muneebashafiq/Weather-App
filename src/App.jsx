import React, { useState, useEffect } from 'react';
import Header from './components/header';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const API_KEY = '2d4eb6a9c30424daae79b51b5e1db288';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}${cityName}&appid=${API_KEY}`);
      const data = await response.json();
      if (data.cod === '404') {
        alert('City not found');
        return;
      }
      setWeatherData(data);

      const forecastResponse = await fetch(
        `${FORECAST_API_URL}lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather('Muzaffarabad');
  }, []);

  return (
    <div className={isDarkMode ? 'body' : 'body-light'}>
      <Header
        isDarkMode={isDarkMode}
        toggleMode={toggleMode}
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
      />
      {weatherData && forecastData && (
        <WeatherDisplay weatherData={weatherData} forecastData={forecastData} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}

export default App;