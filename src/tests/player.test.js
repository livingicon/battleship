import Player from '../player.js';

// PLAYER TESTS
test('player created', () => {
  const newPlayer = new Player();
  expect(newPlayer).toEqual({ name: "newPlayer" });
});