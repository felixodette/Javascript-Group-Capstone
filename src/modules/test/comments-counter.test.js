import { calculateComments } from '../counters/comments-counter.js';

const arrMovie = [
  { user: 1, comment: 'comment1' },
  { user: 2, comment: 'comment2' },
  { user: 3, comment: 'comment3' },
  { user: 4, comment: 'comment4' }];

test('Add function', () => {
  const result = calculateComments(arrMovie);
  expect(result).toBe(4);
});
