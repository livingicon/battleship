import Ship from '../ship.js';
import gunboat from '../index.js';

// SHIP TESTS (only test methods and properties used outside of ship object)

test("ship created", () => {
  const newShip = new Ship(3, 2);
  expect(newShip).toEqual({ length: 3, hits: 2 });
});



// test('Create ship', () => {

// });



// test('Ship is sunk', () => { //working (requires gunboat though)
//   expect(gunboat.isSunk()).toBe(false);
// });