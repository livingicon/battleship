import Ship from './ship.js';
import Gameboard from './gameboard.js';

const gunboat = new Ship(4, 2);
const submarine = new Ship(3, 3);
console.log(gunboat.isSunk()); // false
console.log(submarine.isSunk()); // true

export default gunboat;
