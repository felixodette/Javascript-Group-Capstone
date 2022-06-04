import { calculateReservations } from '../counters/reservationsCounter.js';

const arrMovie = [
  { user: 1, start_date: '...', end_date: '...' },
  { user: 2, start_date: '...', end_date: '...' },
  { user: 3, start_date: '...', end_date: '...' },
  { user: 4, start_date: '...', end_date: '...' },
  { user: 5, start_date: '...', end_date: '...' },
  { user: 6, start_date: '...', end_date: '...' }];

test('Add function', () => {
  const result = calculateReservations(arrMovie);
  expect(result).toBe(6);
});