import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import gameModule from "./gameUI.js";

// PLAYER FACTORY.js
class Player {
  constructor(name) {
    this.player = name;
  };

  playerAttack(e) {
    let num = Number(e.target.getAttribute('data-compcell'));
    if(computerGrid.waterGrid[num-1].hit === 1 || computerGrid.waterGrid[num-1].miss 
      === 1) { // already attacked
    } else {
      computerGrid.receiveAttack(num, computerGrid);
      if (computerGrid.totalHits === 0) {
        computer.computerAttack(playerGrid);
      }
    }
  }

  computerAttack(grid) {
    const randomCell = Math.floor(Math.random() * 100) + 1; // 1-100 (auto fires)
    if(loggedHitAI.length === 1) {
      smartHits.push(loggedHitAI[0]-10, loggedHitAI[0]-1, loggedHitAI[0]+1, loggedHitAI[0]+10);
      checkSmartHits(smartHits);
      if (smartHits.length === 0) {
        loggedHitAI = [];
        computer.computerAttack(playerGrid); //
      } else {
        const randomSmartCell = smartHits[Math.floor(Math.random() * smartHits.length)];
        smartHits = []; // clear smartHits
        grid.receiveAttack(randomSmartCell, grid); // Here
      }
    } else if(grid.waterGrid[randomCell-1].hit === 1 || grid.waterGrid[randomCell-1].miss 
        === 1) { // already attacked
        computer.computerAttack(playerGrid);
    } else {
        grid.receiveAttack(randomCell, grid);
    }
  }
};

export default Player;