class Gameboard {
  
  constructor() {

  };

  placeShip() {
    // place ships at specific coordinates by
    // calling the ship factory function
  };
  
  receiveAttack(coordA, coordB) {
    // 1. take coordinates
    // 2. determine if attack hit a ship
    // 3. send hit function to correct ship or 
    // records coordinates of missed shot (must keep track ot missed
    // shots to display them properly)
  };

  allSunk() {
    // report when all gameboards ships are sunk
  };

}

export default Gameboard;