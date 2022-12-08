import Gameboard from '../gameboard.js';

// PLAYER TESTS
test('gameboard created', () => {
  const newGameboard = new Gameboard();
  expect(newGameboard).toEqual({ totalHits: 0, watergrid: [] });
});