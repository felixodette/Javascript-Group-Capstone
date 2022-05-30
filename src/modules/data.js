const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=c7aa7fee798829f3624f83b8919fe2b9&language=en-US&page=1`;

export default class Movie {
  constructor(arrMovies) {
    this.arrMovies = arrMovies || [];
  };

  addMoviesData = (data) => {
    for (let i = 0; i < data.results.length; i++) {
      const title = data.results[i].title;
      const description = data.results[i].overview;
      const id = data.results[i].id;
      this.arrMovies.push({
        title,
        description,
        id,
      });
    };
  };

  getData = async () => {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    this.addMoviesData(data);
    return this.arrMovies;
  };
};
