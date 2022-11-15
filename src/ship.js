class Ship {
  
  constructor(length, hits = 0) {
    this.length = length;
    this.hits = hits; // []
  };

  hits() {
    // tracks how many times they've been hit
  };

  isSunk() {
    // tracks if they have been sunk
    return this.hits === this.length;
  };

}

export default Ship;