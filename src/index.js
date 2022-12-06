import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import gameModule from "./gameUI.js";

const human = new Player();
const computer = new Player();
const playerGrid = new Gameboard();
const computerGrid = new Gameboard();
playerGrid.createGameboard();
computerGrid.createGameboard();
gameModule.addListeners();

gameModule.placeComputerShip(computerGrid);
gameModule.addDragListeners();
gameModule.renderGrids(); // move somewhere else?