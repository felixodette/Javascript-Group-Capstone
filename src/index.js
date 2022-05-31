import Movie from './modules/data.js';
import './style.css';

const moviesObject = new Movie();

const addDataToArrMovies = async () => {
  const arrTopMovies = await moviesObject.getData();
  return arrTopMovies;
};

const displayTopRatedMovies = async () => {
  const topRatedMovies = await addDataToArrMovies();
  const topRatedMoviesPart = document.getElementById('topRatedMovies');
  topRatedMovies.forEach((movie) => {
    const movieInfo = `<div class="top-rated-movie darker-background d-flex flex-column align-items-center p-4 m-3 col-sm-8 col-md-3 col-lg-2">
    <img class="top-rated-movie-poster" src="${movie.poster}"></img>
    <h2 class="top-rated-movie-title light-color h5 text-center p-3 w-100">${movie.title}</h2>
    <p class="top-rated-movie-release-date light-color h6">${movie.releaseDate}</p>
    <div class="like-comment d-flex justify-content-between"><i class="fa-regular fa-heart light-color" id="like${movie.id}"></i><i class="fa-regular fa-comment light-color" id="comment${movie.id}"></i><a id="reservations" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-regular fa-calendar light-color" id="reservation${movie.id}"></i></a></div>
    </div>

    <!-- Modal -->
    <div class="modal fade modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-center" id="staticBackdropLabel">${movie.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="img-div"><img class="top-rated-movie-poster-modal" src="${movie.poster}" alt=""></div>
            <article class="text-center">Release Date: ${movie.releaseDate} ID: ${movie.id}</article>
            <div class="form-section text-dark">
              <form class="form-floating">
                <input type="text" class="form-control" id="floatingInputInvalid" placeholder="name@example.com" value="" data-name>
                <label for="floatingInputInvalid">Name</label>
              </form>
              <form class="form-floating">
                <input type="text" class="form-control" placeholder="name@example.com" value="" data-start>
                <label for="floatingInputInvalid">Start</label>
              </form>
              <form class="form-floating">
                <input type="text" class="form-control" placeholder="name@example.com" value="" data-end>
                <label for="floatingInputInvalid">End</label>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Reserve</button>
          </div>
        </div>
      </div>
    </div>`;
    topRatedMoviesPart.insertAdjacentHTML('beforeend', movieInfo);
  });
};

window.addEventListener('DOMContentLoaded', async () => {
  await displayTopRatedMovies();
});
