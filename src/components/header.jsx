import React from 'react';

const Header = ({ isDarkMode, toggleMode, city, setCity, fetchWeather }) => {
  return (
    <header>
      <div className="mode">
       <div className={isDarkMode ? 'slider' : 'slider body-light'} onClick={toggleMode}>
          <div className="slide"></div>
        </div>
        <p className="mode-text">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
      </div>
    <div className={isDarkMode ? 'search-bar' : 'search-bar body-light'}>
        <input
          type="text"
          className="input"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={() => fetchWeather(city)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="location">
        <i className="fa-solid fa-location-dot"></i>
        <p>Current Location</p>
      </div>
    </header>
  );
};

export default Header;