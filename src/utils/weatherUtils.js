export const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Haze':
      return 'images/drizzle.png';
    case 'Clear':
      return 'images/clear.png';
    case 'Clouds':
      return 'images/clouds.png';
    case 'Mist':
      return 'images/mist.png';
    case 'Rain':
      return 'images/rain.png';
    case 'Snow':
      return 'images/snow.png';
    default:
      return 'images/clear.png';
  }
};