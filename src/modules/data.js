const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=c7aa7fee798829f3624f83b8919fe2b9&language=en-US&page=1';
const apiUrlForLikes = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/X3LACiofRMQXf8LGL8qW/likes/';

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

  getMovie = async (movieId) => {
    const movie = await this.arrMovies.filter((arrMovie) => arrMovie.id === parseInt(movieId, 10));
    return movie[0];
  };
}
