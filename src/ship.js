// SHIP FACTORY
class Ship {
  
  constructor(length, hits) {
    this.length = length;
    this.hits = hits; // []; // current hit total
  };

  hit() {
    this.hits.push(1);
  };

  isSunk() {
    // tracks if they have been sunk
    return this.hits === this.length; // hits added right?
  };

}

export default Ship;