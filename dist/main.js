const time = document.querySelector(".notify__time");

setInterval(() => {
  let localTime = new Date().toLocaleTimeString();
  time.textContent = localTime;
}, 1000);

// ==================================
const allApps = document.querySelectorAll("main>*");
const allIcons = document.querySelectorAll(".apps>*");

allIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    allApps.forEach((app, idx) => {
      app.classList.remove("active");
      if (e.target.classList.contains(app.classList[0])) {
        app.classList.add("active");
      }
    });
  });
});



let moviesForm = document.querySelector(".movies_app_form");
let moviesInput = document.querySelector(".movies_app_input");
let moviesGrid = document.querySelector(".movies_grid");

moviesForm.addEventListener("submit", fetchMovies);

async function fetchMovies(e) {
  e && e.preventDefault();
  let defaultMovieName = "john wick";
  let movieName = moviesInput.value;
  movieName ? (defaultMovieName = movieName) : defaultMovieName;

  const moviesAPI = `http://www.omdbapi.com/?t=${defaultMovieName}&apikey=cff050d4`;
  let resp = await fetch(moviesAPI);
  let data = await resp.json();

  const { Poster, Title, Plot, Genre, Released, imdbRating, Response } = data;
  let moviesMarkup = ``;
  moviesMarkup = `
                       <div class="movies_grid_img">
                       <img src="${Poster}" alt="poster">
                       </div>
                       <h2 class=movies_grid_title>${Title}  (<small>${Genre}</small>)</h2>
                       <p class=movies_grid_plot>${Plot}</p>
                       <div class=movies_grid_flex>
                         <div class=movies_grid_release>Released: ${Released}</div>
                         <div class=movies_grid_rating>Ratings: ${imdbRating}<div>
                      </div>
            `;
  moviesGrid.innerHTML = moviesMarkup;

  moviesInput.value = "";
}

window.onload = fetchMovies();

const todoList = document.querySelector(".todo_list");
const todoForm = document.querySelector(".todo_app_form");
const todoinput = document.querySelector(".todo_app_input");

todoForm.addEventListener("submit", handleTodoSubmit);

function handleTodoSubmit(e) {
  e.preventDefault();
  const todoArr = [];

  let todoText = todoinput.value;
  todoArr.push(todoText);

  todoinput.value && todoMarkup(todoArr);

  todoinput.value = "";
}

function todoMarkup(storedList) {
  storedList.map((listItem) => {
    let todoElm = document.createElement("li");
    todoElm.classList.add("todo_list_item");
    let todoCheckbox = document.createElement("input");
    todoCheckbox.classList.add("todo_list_checkbox");
    todoCheckbox.type = "checkbox";
    let todoText = document.createElement("p");
    todoText.classList.add("todo_list_text");
    todoText.textContent = listItem;
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");

    deleteIcon.onclick = (e) => deleteListItem(e);
    todoCheckbox.onclick = () =>
      todoCheckbox.checked
        ? (todoText.style.color = "hsl(225, 14%, 43%)")
        : (todoText.style.color = "white");
    todoElm.append(todoCheckbox);
    todoElm.append(todoText);
    todoElm.append(deleteIcon);

    todoList.append(todoElm);
  });
}

function deleteListItem(e) {
  e.target.parentElement.remove();
}

const weatherMain = document.querySelector(".weather_main_content");
const weatherStats = document.querySelector(".weather_stats");
const weatherInput = document.querySelector(".weather_main_form input");
const weatherForm = document.querySelector(".weather_main_form");

const handleWeatherSubmit = async (e) => {
  e && e.preventDefault();
  let cityName = "dubai";
  if (weatherInput.value) cityName = weatherInput.value;

  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1c378d9838833e61cc4974ccc7b04fc5`;

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
