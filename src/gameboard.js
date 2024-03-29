import Ship from "./ship.js";
import gameModule from "./gameUI.js";
import GameLoop from "./index.js";

// GAMEBOARD FACTORY.js
class Gameboard {
  constructor() {
    this.totalHits = 0;
    this.waterGrid = [];
  }
  
  createGameboard() {
    for (let i = 1; i <= 100; i++) {
      this.waterGrid.push({cell: i, hit: 0, miss: 0})
    }
    return this.waterGrid;
  }

  placeShip(id, side, name, location, hits=0) {
    let newShip;
    side === 0 ? newShip = new Ship(id, 0, name, location, hits) : newShip = 
    new Ship(id, 1, name, location, hits);
    gameModule.logFleet(side, newShip);
  }

  receiveAttack(num, grid) {
    let fleet;
    grid === GameLoop.playerGrid ? fleet = gameModule.playerFleet : fleet = gameModule.enemyFleet;
    for(let i=0; i<fleet.length; i++) {
      for(let j=0; j<fleet[i].location.length; j++) {
        if(num === fleet[i].location[j]) {
          grid.waterGrid[num-1].hit = 1;
          fleet[i].hit();
          fleet[i].isSunk(grid);
          grid.allSunk(grid);
          if (fleet === gameModule.playerFleet) {
            gameModule.loggedHitAI = []; // only clear if hit
            gameModule.loggedHitAI.push(grid.waterGrid[num-1].cell);
          }
        }
      }
    }
    if (grid.waterGrid[num-1].hit === 0){
      grid.waterGrid[num-1].miss = 1; 

    }
    gameModule.hitOrMiss(grid);
  }

  allSunk(grid) {
    for(let i=0; i<100; i++) { 
      if(grid.waterGrid[i].hit === 1) {
        grid.totalHits++;
      }
    }
    if(grid.totalHits === 17) {
      gameModule.removeListeners(GameLoop.human);
      gameModule.gameOver(grid);
    } else if (grid.totalHits !== 17) {
      grid.totalHits = 0;
    }
  }
};

export default Gameboard;