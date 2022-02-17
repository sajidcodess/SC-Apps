const weatherMain = document.querySelector(".weather_main_content");
const weatherStats = document.querySelector(".weather_stats");
const weatherInput = document.querySelector(".weather_main_form input");
const weatherForm = document.querySelector(".weather_main_form");

const handleWeatherSubmit = async (e) => {
  e && e.preventDefault();
  let cityName = "dubai";
  if (weatherInput.value) cityName = weatherInput.value;

  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1c378d9838833e61cc4974ccc7b04fc5`;

  console.log(cityName);

  try {
    const response = await fetch(weatherAPI);
    const data = await response.json();
    const { name, main, weather, clouds, sys, wind } = data;
    const weatherMarkup = `<div class="weather_main_logo">
                <img class="weather_main_icon" src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="" />
                <h2 class="weather_main_main">${weather[0].main}</h2>
                </div>
                <h2 class="weather_main_name">${name} <small><sup>${sys.country}</sup</small></h2>
                <p class="weather_main_description">${weather[0].description}</p>`;
    let celciusTemp = main.temp - 273.15;
    const weatherStatsmarkup = `<div class="weather_stats_temp">Temperature: ${Math.round(
      celciusTemp
    )}C<sup>o</sup></div>
                <div class="weather_stats_pressure">Pressure: ${
                  main.pressure
                }hPa</div>
                <div class="weather_stats_humidity">Humidity: ${
                  main.humidity
                }%</div>
                <div class="weather_stats_wind">Wind Speed: ${
                  wind.speed
                }m/s</div>`;

    weatherMain.innerHTML = weatherMarkup;
    weatherStats.innerHTML = weatherStatsmarkup;
  } catch (err) {
    weatherMain.textContent = "please Enter correct City Name";
  }

  weatherInput.value = "";
  weatherInput.focus();
};

window.onload = handleWeatherSubmit();
weatherForm.addEventListener("submit", handleWeatherSubmit);
