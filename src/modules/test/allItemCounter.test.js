import { calculateIteme } from '../counters/moviesCounter.js';

const arrMovie = [{ movie: 1 }, { movie: 2 }, { movie: 3 }, { movie: 4 }, { movie: 5 }];

test('Add function', () => {
  const result = calculateIteme(arrMovie);
  expect(result).toBe(5);
});