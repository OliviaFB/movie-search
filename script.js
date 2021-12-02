let apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e7acf5f5ff6e612540dc025371bc8999&page=1";
let imgPath = "https://image.tmdb.org/t/p/w1280";
let SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=e7acf5f5ff6e612540dc025371bc8999&query=";

let main = document.getElementById("main");
let form = document.getElementById("form");
let search = document.getElementById("search");

let getMovies = async (url) => {
  let resp = await fetch(url);
  let response = await resp.json();

  console.log(response);

  showMovies(response.results);
};

let showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    let { poster_path, title, vote_average, overview } = movie;

    let movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img
        src="${imgPath + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        ${overview}
      <div>`;
    main.appendChild(movieEl);
  });
};

getMovies(apiUrl);

let getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
