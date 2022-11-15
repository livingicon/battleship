import Ship from './ship.js';

const gunboat = new Ship(4, 2);
const submarine = new Ship(3, 3);
console.log(gunboat.isSunk()); // false
console.log(submarine.isSunk()); // true
