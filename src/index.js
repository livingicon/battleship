import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import gameModule from "./gameUI.js";

const GameLoop = (() => {

  const human = new Player();
  const computer = new Player();
  const playerGrid = new Gameboard();
  const computerGrid = new Gameboard();
  playerGrid.createGameboard();
  computerGrid.createGameboard();
  // gameModule.addListeners(); // not adding the listeners

  gameModule.placeComputerShip(computerGrid);
  gameModule.addDragListeners();
  gameModule.renderGrids();
  gameModule.addListeners(human); // not adding the listeners

  return { human, computer, playerGrid, computerGrid };
})();

export default GameLoop;