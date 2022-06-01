import Movie from './modules/data.js';
import './style.css';
import { calculateIteme } from './modules/counters/moviesCounter.js';

const moviesObject = new Movie();

const addDataToArrMovies = async () => {
  const arrTopMovies = await moviesObject.getData();
  return arrTopMovies;
};

const topRatedMoviesPart = document.getElementById('topRatedMovies');

const displayTopRatedMovies = async () => {
  const topRatedMovies = await addDataToArrMovies();
  topRatedMovies.forEach((movie) => {
    const movieInfo = `<div class="top-rated-movie darker-background d-flex flex-column align-items-center p-4 m-3 col-sm-8 col-md-3 col-lg-2">
    <img class="top-rated-movie-poster" src="${movie.poster}"></img>
    <h2 class="top-rated-movie-title light-color h5 text-center p-3 w-100">${movie.title}</h2>
    <p class="top-rated-movie-release-date light-color h6">${movie.releaseDate}</p>
    <div class="like-comment d-flex justify-content-between align-items-center">
    <p class="text-danger h6 show-likes-part p-1 m-0" id="showLikes${movie.id}">${movie.like}</p><i class="fa-regular fa-heart light-color" id="like${movie.id}">
    </i><i class="fa-regular fa-comment light-color" id="comment${movie.id}"></i><i class="fa-regular fa-calendar light-color" id="reservation${movie.id}"></i>
    </div>
    </div>`;
    topRatedMoviesPart.insertAdjacentHTML('beforeend', movieInfo);
  });
};


const countMovies = async () => {
  const arrMovies = await addDataToArrMovies();
  const result = calculateIteme(arrMovies);
  const counter = document.getElementById('counterForMovies');
  counter.innerHTML = `${result} Movies`;
};

window.addEventListener('DOMContentLoaded', async () => {
  await displayTopRatedMovies();
  await countMovies();

  topRatedMoviesPart.addEventListener('click', async (e) => {
    const eventId = e.target.id;
    if (eventId.includes('like')) {
      const movieId = eventId.replace('like', '');
      const likesPart = document.getElementById(`showLikes${movieId}`);
      moviesObject.addLikeToMovie(movieId).then(() => {
        likesPart.innerHTML = parseInt(likesPart.innerHTML, 10) + 1;
      });
    }
  });
});
