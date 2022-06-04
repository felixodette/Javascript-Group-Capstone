const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=c7aa7fee798829f3624f83b8919fe2b9&language=en-US&page=1';
const apiUrlForLikes = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/X3LACiofRMQXf8LGL8qW/likes/';
const apiUrlForComments = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/X3LACiofRMQXf8LGL8qW/comments/';
const apiUrlForReservations = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/X3LACiofRMQXf8LGL8qW/reservations/';

export default class Movie {
  constructor(arrMovies) {
    this.arrMovies = arrMovies || [];
  }

  filterMovies = (data, likesObject) => {
    const result = [];
    for (let i = 0; i < data.results.length; i += 1) {
      const { title } = data.results[i];
      const description = data.results[i].overview;
      const { id } = data.results[i];
      const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.results[i].poster_path}`;
      const releaseDate = data.results[i].release_date;
      const like = likesObject[id] || 0;
      result.push({
        title,
        description,
        id,
        poster,
        releaseDate,
        like,
      });
    }
    return result;
  };

  getData = async () => {
    const response = await fetch(url, {
      method: 'GET',
    });
    const movies = await response.json();
    const likesObject = await this.getMoviesLike();
    this.arrMovies = this.filterMovies(movies, likesObject);
    return this.arrMovies;
  };

  addLikeToMovie = async (movieId) => {
    const likesObj = {
      item_id: movieId,
    };
    const response = await fetch(apiUrlForLikes, {
      method: 'POST',
      body: JSON.stringify(likesObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 201) {
      throw response;
    }
  };

  getMoviesLike = async () => {
    const response = await fetch(apiUrlForLikes, {
      method: 'GET',
    });
    const moviesLikes = await response.json();
    const likesObject = {};
    moviesLikes.forEach((like) => {
      likesObject[like.item_id] = like.likes;
    });
    return likesObject;
  };

  addCommentToMovie = async (commentObject) => {
    const response = await fetch(apiUrlForComments, {
      method: 'POST',
      body: JSON.stringify(commentObject),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 201) {
      throw response;
    }
  };

  getMoviesComments = async (movieId) => {
    const response = await fetch(`${apiUrlForComments}?item_id=${movieId}`, {
      method: 'GET',
    });
    const moviesComments = await response.json();
    return moviesComments;
  };

  addReservationToMovie = async (reservationObject) => {
    const response = await fetch(apiUrlForReservations, {
      method: 'POST',
      body: JSON.stringify(reservationObject),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 201) {
      throw response;
    }
  };

  getMovieReservation = async (movieId) => {
    const response = await fetch(`${apiUrlForReservations}?item_id=${movieId}`, {
      method: 'GET',
    });
    const movieReservation = await response.json();
    return movieReservation;
  };

  getMovie = async (movieId) => {
    const movie = await this.arrMovies.filter((arrMovie) => arrMovie.id === parseInt(movieId, 10));
    return movie[0];
  };
}