import gameModule from "./gameUI.js";


// SHIP FACTORY.js
class Ship {
  constructor(id, side, name, location, hits=0) {
    this.id = id;
    this.side = side;
    this.name = name;
    this.location = location;
    this.length = location.length;
    this.hits = hits; 
  }
  hit() {
    this.hits++;
  }
  isSunk(grid) { 
    if (this.length === this.hits) {
      gameModule.sunk(this.name, grid);
    }
  }
};

export default Ship;