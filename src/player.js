import gameModule from "./gameUI.js";
import GameLoop from "./index.js";

// PLAYER FACTORY.js
class Player {
  constructor(name) {
    this.player = name;
  };

  playerAttack(e) {
    let num = Number(e.target.getAttribute('data-compcell'));
    if(GameLoop.computerGrid.waterGrid[num-1].hit === 1 || GameLoop.computerGrid.waterGrid[num-1].miss 
      === 1) { // already attacked
    } else {
      GameLoop.computerGrid.receiveAttack(num, GameLoop.computerGrid);
      if (GameLoop.computerGrid.totalHits === 0) {
        GameLoop.computer.computerAttack(GameLoop.playerGrid);
      }
    }
  }

  computerAttack(grid) {
    const randomCell = Math.floor(Math.random() * 100) + 1; // 1-100 (auto fires)
    if(gameModule.loggedHitAI.length === 1) {
      gameModule.smartHits.push(gameModule.loggedHitAI[0]-10, gameModule.loggedHitAI[0]-1, gameModule.loggedHitAI[0]+1, gameModule.loggedHitAI[0]+10);
      gameModule.checkSmartHits(gameModule.smartHits);
      if (gameModule.smartHits.length === 0) {
        gameModule.loggedHitAI = [];
        GameLoop.computer.computerAttack(GameLoop.playerGrid); //
      } else {
        const randomSmartCell = gameModule.smartHits[Math.floor(Math.random() * gameModule.smartHits.length)];
        gameModule.smartHits = []; // clear smartHits
        grid.receiveAttack(randomSmartCell, grid); // Here
      }
    } else if(grid.waterGrid[randomCell-1].hit === 1 || grid.waterGrid[randomCell-1].miss 
        === 1) { // already attacked
        GameLoop.computer.computerAttack(GameLoop.playerGrid);
    } else {
        grid.receiveAttack(randomCell, grid);
    }
  }
};

export default Player;