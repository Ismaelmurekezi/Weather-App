
async function fetchWeatherData(location) {
    const apiKey = '6bcc6348b27e4f7c9f3142345233007'; // Replace with your WeatherAPI.com API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
  
  function processWeatherData(data) {
    if (!data || !data.current) {
      weatherInfo.innerHTML = `<p class="error-message">Weather data not available for the entered location.</p>`;

    }
  
    return {
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      windSpeed: data.current.wind_kph,
      humidity: data.current.humidity,
    };
  }


function getWeatherIcon(condition) {
    
    const weatherIcons = {
      'Clear': './Images/sunny.jpg',
      'Partly cloudy': './Images/partly cloudy.jpg',
      'Cloudy': './Images/cloudy.jpg',
      'Rainy': './Images/rainy.jpg',
      'Sunny': './Images/sunny.jpg',
      'Wind speed': './Images/wind speed.jpg',
      'Overcast': './Images/overcast.jpg',
      'Drizzle': './Images/drizzle.jpg',
      'Temperature': './Images/temp.jpg',
      'Showers': './Images/showers.jpg',
      'Humidity': './Images/humidity.png',

      'default': './Images/partly cloudy.jpg', // Default icon for unknown conditions
    };
  
    return weatherIcons[condition] || weatherIcons['default'];
  }
  
  function displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
      <h2>Weather in ${data.location}</h2>
      <div class="weather-info-item">
        <img src="${getWeatherIcon(data.description)}" class="weather-icon" id="weather-detail"alt="Weather Icon">
        <p>Description: ${data.description}</p>
      </div>
      <div class="weather-info-item">
        <img src="${getWeatherIcon('Temperature')}" class="weather-icon"  alt="Temperature Icon">
        <p>Temperature: ${data.temperature} &#8451;</p>
      </div>
      <div class="weather-info-item">
        <img src="${getWeatherIcon('Wind speed')}" class="weather-icon" alt="Wind Speed Icon">
        <p>Wind Speed: ${data.windSpeed} km/h</p>
      </div>
      <div class="weather-info-item">
        <img src="${getWeatherIcon('Humidity')}" class="weather-icon" alt="Humidity Icon">
        <p>Humidity: ${data.humidity}%</p>
      </div>
      
    `;
  }
  
  

  
  async function getDefaultWeather() {
    const defaultLocation = 'Kigali, Rwanda'; // Default location
    const defaultWeatherData = await fetchWeatherData(defaultLocation);
    const processedDefaultData = processWeatherData(defaultWeatherData);
    if (processedDefaultData) {
      processedDefaultData.location = defaultLocation;
      displayWeatherInfo(processedDefaultData);
    } else {
      console.error('Default weather data not available.');
    }
  }
  
  const weatherForm = document.getElementById('weatherForm');
  const locationInput = document.getElementById('locationInput');
  
  weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const location = locationInput.value;
    const weatherData = await fetchWeatherData(location);
    const processedData = processWeatherData(weatherData);
  
    if (processedData) {
      processedData.location = location;
      displayWeatherInfo(processedData);
    } else {
      console.error('Weather data not available for the entered location.');
    }
  });
  
  // Display default weather on page load
  getDefaultWeather();
  
  