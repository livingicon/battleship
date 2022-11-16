import Ship from '../ship.js';

// SHIP TESTS (only test methods and properties used outside of ship object)

test('ship created', () => {
  const newShip = new Ship(3, 2);
  expect(newShip).toEqual({ length: 3, hits: 2 });
});

// test('each hit adds to hits total', () => {
//   expect(gunboat.isSunk()).toBe(false);
// });

test('ship is sunk', () => {
  const newShip = new Ship(3, 3)
  expect(newShip.isSunk()).toBe(true);
});