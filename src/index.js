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
  gameModule.placeComputerShip(computerGrid);
  gameModule.addDragListeners();
  gameModule.renderGrids();
  gameModule.addListeners(human);

  return { human, computer, playerGrid, computerGrid };
})();

export default GameLoop;