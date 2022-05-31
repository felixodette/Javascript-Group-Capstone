import Movie from './modules/data.js';
import './style.css';

const moviesObject = new Movie;

const addDataToArrMovies = async () => {
  const arrTopMovies = await moviesObject.getData()
  console.log(arrTopMovies);
  return arrTopMovies;
}

const displayTopRatedMovies = async () => {
  const topRatedMovies = await addDataToArrMovies();
  const topRatedMoviesPart = document.getElementById('topRatedMovies');
  topRatedMovies.forEach((movie) => {
    const movieInfo = `<div class="top-rated-movie">
    <img class="top-rated-movie-poster" src="${movie.poster}"></img>
    <div class="top-rated-movie-title">${movie.title}</div>
    <div class="top-rated-movie-release-date">${movie.releaseDate}</div>
    </div>`;
    topRatedMoviesPart.insertAdjacentHTML('beforeend', movieInfo);
  });
};

window.addEventListener('DOMContentLoaded', async () => {
  await displayTopRatedMovies();
});
