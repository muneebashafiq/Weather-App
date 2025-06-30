import React from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';

const WeatherDisplay = ({ weatherData, forecastData, isDarkMode }) => {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleTimeString('en-US', options).replace(/(:\d{2})\s*[AP]M/i, '$1');
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const forecastDays = [3, 10, 18, 26, 34].map((index) => ({
        date: formatDate(forecastData.list[index].dt),
        temp: Math.round(forecastData.list[index].main.temp),
        icon: getWeatherIcon(forecastData.list[index].weather[0].main),
    }));

    const hourlyForecast = [0, 1, 2, 3, 4].map((index) => ({
        time: formatTime(forecastData.list[index].dt),
        temp: Math.round(forecastData.list[index].main.temp),
        wind: Math.round(forecastData.list[index].wind.speed * 10) / 10,
        icon: getWeatherIcon(forecastData.list[index].weather[0].main),
    }));

    return (
        <main>
            <div className={isDarkMode ? 'loc-time' : 'loc-time body-light'}>
                <p className="loc">{weatherData.name}, {weatherData.sys.country}</p>
                <div className="date-time">
                    <p className="main-time">{formatTime(weatherData.dt)}</p>
                    <p className="main-date">{formatDate(weatherData.dt)}</p>
                </div>
            </div>
            <div className={isDarkMode ? 'weather-details' : 'weather-details body-light'}>
                <div className="main-details">
                    <div className="temperature">
                        <p className="temp">{Math.round(weatherData.main.temp)}&deg;C</p>
                        <div>
                            <p>Feels like: </p>
                            <p className="feels">{Math.round(weatherData.main.feers_like)}&deg;C</p>
                        </div>
                    </div>
                    <div className="sunrise">
                        <img src="images/sunrise-white 1.png" alt="sunrise" className={isDarkMode ? '' : 'dark-icon'} />
                        <div>
                            <h3>Sunrise</h3>
                            <p className="time">{formatTime(weatherData.sys.sunrise)}</p>
                        </div>
                    </div>
                    <div className="sunset">
                        <img src="images/sunset-white 1.png" alt="sunset" className={isDarkMode ? '' : 'dark-icon'} />
                        <div>
                            <h3>Sunset</h3>
                            <p className="time">{formatTime(weatherData.sys.sunset)}</p>
                        </div>
                    </div>
                </div>
                <div className="icon-and-weather">
                    <img
                        src={getWeatherIcon(weatherData.weather[0].main)}
                        alt="weather icon"
                        className="weather-icon"
                    />
                    <p className="weather-condition">{weatherData.weather[0].main}</p>
                </div>
                <div className="extra-details">
                    <div className="humidity-detail">
                        <img src="images/humidity.png" alt="humidity" className={isDarkMode ? '' : 'dark-icon'} />
                        <h3>Humidity</h3>
                        <p className="humidity">{weatherData.main.humidity}%</p>
                    </div>
                    <div className="wind-detail">
                        <img src="images/wind.png" alt="wind" className={isDarkMode ? '' : 'dark-icon'} />
                        <h3>Wind Speed</h3>
                        <p className="wind">{Math.round(weatherData.wind.speed * 10) / 10}km/h</p>
                    </div>
                    <div className="pressure-detail">
                        <img src="images/pressure-white 1.png" alt="pressure" className={isDarkMode ? '' : 'dark-icon'} />
                        <h3>Pressure</h3>
                        <p className="pressure">{weatherData.main.pressure}hPa</p>
                    </div>
                    <div className="UV-detail">
                        <img src="images/uv-white 1.png" alt="uv" className={isDarkMode ? '' : 'dark-icon'} />
                        <h3>UV</h3>
                        <p className="UV">8</p>
                    </div>
                </div>
            </div>
            <div className={isDarkMode ? 'forecast' : 'forecast body-light'}>
                <h3>5 Days Forecast:</h3>
                {forecastDays.map((day, index) => (
                    <div key={index}>
                        <img src={day.icon} alt="forecast icon" className={`forecast-icon${index + 1}`} />
                        <p className={`temp${index + 1}`}>{day.temp}&deg;C</p>
                        <p className={`date${index + 1}`}>{day.date}</p>
                    </div>
                ))}
            </div>
            <div className={isDarkMode ? 'hourly-forecast' : 'hourly-forecast body-light'}>
                <h3>3 Hours Forecast</h3>
                <div className="hours">
                    {hourlyForecast.map((hour, index) => (
                        <div key={index} className={`fr${index + 1}`}>
                            <p className="fr-time">{hour.time}</p>
                            <img src={hour.icon} alt="weather icon" className="weather-cond-icon" />
                            <p className="fr-temp">{hour.temp}&deg;C</p>
                            <p className="fr-wind">{hour.wind}km/h</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default WeatherDisplay;