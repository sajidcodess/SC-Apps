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
