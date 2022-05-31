const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=c7aa7fee798829f3624f83b8919fe2b9&language=en-US&page=1';

export default class Movie {
  constructor(arrMovies) {
    this.arrMovies = arrMovies || [];
  }

  addMoviesData = (data) => {
    for (let i = 0; i < data.results.length; i += 1) {
      const { title } = data.results[i];
      const description = data.results[i].overview;
      const { id } = data.results[i];
      const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.results[i].poster_path}`;
      // const popularity = data.result[i].popularity;
      const releaseDate = data.results[i].release_date;
      this.arrMovies.push({
        title,
        description,
        id,
        poster,
        // popularity,
        releaseDate,
      });
    }
  };

  getData = async () => {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    this.addMoviesData(data);
    return this.arrMovies;
  };
}
