/* eslint-disable-line import/prefer-default-export */

import Movie from './modules/data.js';
import './style.css';
import { calculateIteme } from './modules/counters/moviesCounter.js';
import { addPopUpToMoviesDiv } from './modules/popUp.js';
import { calculateComments } from './modules/counters/commentsCounter.js';
import { calculateReservations } from './modules/counters/reservationsCounter.js';

const moviesObject = new Movie();

const addDataToArrMovies = async () => moviesObject.getData();
const topRatedMoviesPart = document.getElementById('topRatedMovies');

const displayTopRatedMovies = async () => {
  const topRatedMovies = await addDataToArrMovies();
  topRatedMovies.forEach((movie) => {
    const movieInfo = `
      <a id="div${movie.id}" class="top-rated-movie darker-background d-flex flex-column align-items-center p-4 m-3 col-sm-8 col-md-3 col-lg-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-comments>
        <img class="top-rated-movie-poster" alt="Movie Poster" id="poster${movie.id}" src="${movie.poster}"/>
        <h2 class="top-rated-movie-title light-color h5 text-center p-3 w-100" id="title${movie.id}">${movie.title}</h2>
        <p class="top-rated-movie-release-date light-color h6" id="releaseDate${movie.id}">${movie.releaseDate}</p>
        <div class="like-comment d-flex justify-content-between align-items-center">
          <p class="text-danger h6 show-likes-part p-1 m-0" id="showLikes${movie.id}">${movie.like}</p>
          <i class="fa-regular fa-heart light-color" id="like${movie.id}"></i>
          <i class="fa-regular fa-comment light-color" id="comment${movie.id}"></i>
          <i class="fa-regular fa-calendar light-color" id="reservation${movie.id}"></i>
        </div>
      </a>`;
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
  addPopUpToMoviesDiv();

  topRatedMoviesPart.addEventListener('click', async (e) => {
    const eventId = e.target.id;
    let popupOpen = false;
    let movieId = '';

    const popUpMovieImage = document.getElementById('popUpPoster');
    const popUpMovieId = document.getElementById('popUpMovieId');
    const popUpMovieTitle = document.getElementById('popUpMovieTitle');
    const popUpMovieDescription = document.getElementById('popUpMovieDescription');
    const popUpUserInfo = document.getElementById('popUpMovieDetail');
    const movieDetailCounter = document.getElementById('movieDetailCounter');
    const userCommentDiv = document.getElementById('userCommentDiv');
    const popUpDescription = document.getElementById('popUpMovieDescription');
    const reservationEndDateDiv = document.getElementById('reservationEndDateDiv');
    const reservationStartDateDiv = document.getElementById('reservationStartDateDiv');

    if (eventId.includes('like')) {
      movieId = eventId.replace('like', '');
      const likesPart = document.getElementById(`showLikes${movieId}`);
      moviesObject.addLikeToMovie(movieId).then(() => {
        likesPart.innerHTML = parseInt(likesPart.innerHTML, 10) + 1;
      });
    }

    if (eventId.includes('div')) {
      movieId = eventId.replace('div', '');
      popupOpen = true;
    } else if (eventId.includes('poster')) {
      movieId = eventId.replace('poster', '');
      popupOpen = true;
    } else if (eventId.includes('title')) {
      movieId = eventId.replace('title', '');
      popupOpen = true;
    } else if (eventId.includes('releaseDate')) {
      movieId = eventId.replace('releaseDate', '');
      popupOpen = true;
    } else if (eventId.includes('poster')) {
      movieId = eventId.replace('poster', '');
      popupOpen = true;
    } else if (eventId.includes('comment')) {
      movieId = eventId.replace('comment', '');
      popupOpen = true;
    }

    if (popupOpen) {
      const movieObj = await moviesObject.getMovie(movieId);
      const arrMovieComments = await moviesObject.getMoviesComments(movieId);
      const movieCommentsCount = calculateComments(arrMovieComments);
      popUpDescription.classList.remove('d-none');
      userCommentDiv.classList.remove('d-none');
      reservationStartDateDiv.classList.add('d-none');
      reservationEndDateDiv.classList.add('d-none');
      movieDetailCounter.innerHTML = '';
      popUpMovieId.innerHTML = '';
      popUpMovieTitle.innerHTML = '';
      popUpMovieImage.innerHTML = '';
      popUpUserInfo.innerHTML = '';
      movieDetailCounter.innerHTML = `${movieCommentsCount} Comments`;
      popUpMovieId.innerHTML = movieObj.id;
      popUpMovieImage.innerHTML = `<img class="w-100" src="${movieObj.poster}" alt="pop-up-poster">`;
      popUpMovieTitle.innerHTML = movieObj.title;
      popUpMovieDescription.innerHTML = movieObj.description;
      arrMovieComments.forEach((comment) => {
        const movieComments = `<div class="user-detail p-4">
            <h3 class="m-0 h5">User Name: ${comment.username}</h3>
            <p class="m-0">User review: ${comment.comment}</p>
            <p class="m-0">Creation date: ${comment.creation_date}
          </div>`;
        popUpUserInfo.insertAdjacentHTML('beforeend', movieComments);
      });
    }

    if (eventId.includes('reservation')) {
      movieId = eventId.replace('reservation', '');
      popUpMovieId.innerHTML = '';
      popUpMovieTitle.innerHTML = '';
      popUpMovieImage.innerHTML = '';
      popUpUserInfo.innerHTML = '';
      movieDetailCounter.innerHTML = '';
      const movieObj = await moviesObject.getMovie(movieId);
      popUpMovieId.innerHTML = movieObj.id;
      popUpMovieTitle.innerHTML = movieObj.title;
      popUpMovieImage.innerHTML = `<img class="w-100" src="${movieObj.poster}" alt="pop-up-poster">`;
      popUpDescription.classList.add('d-none');
      userCommentDiv.classList.add('d-none');
      reservationStartDateDiv.classList.remove('d-none');
      reservationEndDateDiv.classList.remove('d-none');
      const arrMovieReservation = await moviesObject.getMovieReservation(movieId);
      const movieReservationCount = calculateReservations(arrMovieReservation);
      movieDetailCounter.innerHTML = `${movieReservationCount} Reservations`;
      arrMovieReservation.forEach((reservation) => {
        const movieReservation = `<div class="user-detail p-3">
            <h3 class="m-0 h5">User Name: ${reservation.username}</h3>
            <p class="m-0">Date start: ${reservation.date_start}</p>
            <p class="m-0">Date end: ${reservation.date_end}</p>
          </div>`;
        popUpUserInfo.insertAdjacentHTML('beforeend', movieReservation);
      });
    }
  });

  const popUpForm = document.getElementById('popUpForm');
  popUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('user-name');
    const userComment = document.getElementById('user-comment');
    const movieIdPart = document.getElementById('popUpMovieId');
    const reservationEndDateString = document.getElementById('reservationEndDate');
    const reservationStartDateString = document.getElementById('reservationStartDate');
    const movieIdString = movieIdPart.innerText;
    const movieId = parseInt(movieIdString, 10);
    const commentObject = {
      item_id: movieId,
      username: userName.value,
      comment: userComment.value,
    };
    const reservationObject = {
      item_id: movieId,
      username: userName.value,
      date_start: reservationStartDateString.value,
      date_end: reservationEndDateString.value,
    };
    await moviesObject.addCommentToMovie(commentObject);
    await moviesObject.addReservationToMovie(reservationObject);
    userName.value = '';
    userComment.value = '';
    reservationStartDateString.value = '';
    reservationEndDateString.value = '';
  });
});