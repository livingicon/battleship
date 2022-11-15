import Ship from '../ship.js';
import gunboat from '../index.js';

// test('Create ship', () => {

// });

test('Ship is sunk', () => { //working (requires gunboat though)
  expect(gunboat.isSunk()).toBe(false);
});