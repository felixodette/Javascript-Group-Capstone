import Movie from './modules/data.js';

const moviesObject = new Movie;

const addDataToArrMovies = async () => {
  const result = await moviesObject.getData()
  console.log(result);
  return result;
}

window.addEventListener('DOMContentLoaded', async () => {
  addDataToArrMovies();
});
