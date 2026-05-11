const API_KEY = "8b9f06dd814832998c42f9e9ed23a5f4";
const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  originals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
};

const trendingContainer = document.getElementById("trending");
const originalsContainer = document.getElementById("originals");
const searchInput = document.getElementById("searchInput");

let allMovies = [];


// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("solid-nav");
  } else {
    navbar.classList.remove("solid-nav");
  }
});


// FETCH MOVIES
async function fetchMovies(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results;

  } catch (error) {
    console.error(error);
    return [];
  }
}


// CREATE MOVIE ROW
function createMovieRow(movies, container) {

  container.innerHTML = "";

  movies.forEach(movie => {

    const img = document.createElement("img");

    img.className =
      "movie-card min-w-[220px] h-[320px] object-cover rounded-lg transition duration-300 cursor-pointer";

    img.dataset.src =
      `${IMAGE_BASE}${movie.poster_path}`;

    img.alt = movie.title || movie.name;

    observer.observe(img);

    container.appendChild(img);
  });
}


// LAZY LOADING
const observer = new IntersectionObserver((entries, obs) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const img = entry.target;

      img.src = img.dataset.src;

      obs.unobserve(img);
    }
  });

}, {
  threshold: 0.1
});


// LOAD DATA
async function loadContent() {

  const trendingMovies =
    await fetchMovies(requests.trending);

  const originalsMovies =
    await fetchMovies(requests.originals);

  allMovies = [...trendingMovies, ...originalsMovies];

  createMovieRow(trendingMovies, trendingContainer);

  createMovieRow(originalsMovies, originalsContainer);
}


// SEARCH FUNCTIONALITY
searchInput.addEventListener("input", e => {

  const query = e.target.value.toLowerCase();

  const filteredMovies = allMovies.filter(movie => {

    const title = movie.title || movie.name || "";

    return title.toLowerCase().includes(query);
  });

  createMovieRow(filteredMovies, trendingContainer);
});


// INIT
loadContent();