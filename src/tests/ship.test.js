import Ship from '../ship.js';

// SHIP TESTS
test('ship created', () => {
  const newShip = new Ship(1, 0, "Carrier", [1,2,3,4], 2);
  expect(newShip).toEqual({ id: 1, side: 0, name: "Carrier", location: [1,2,3,4], length: 4, hits: 2 });
});

test('ship hits increased', () => {
  const newShip = new Ship(1, 0, "Carrier", [1,2,3,4], 2);
  newShip.hit();
  expect(newShip).toEqual({ id: 1, side: 0, name: "Carrier", location: [1,2,3,4], length: 4, hits: 3 });
});

test('ship sunk', () => {
  const newShip = new Ship(1, 0, "Carrier", [1,2,3,4], 4);
  expect(newShip.isSunk()).toBe(true);
});

test('final hit sinks', () => {
  const newShip = new Ship(1, 0, "Carrier", [1,2,3,4], 3);
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});