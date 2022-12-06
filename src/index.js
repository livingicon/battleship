import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";

// // SHIP FACTORY.js
// class Ship {
//   constructor(id, side, name, location, hits=0) {
//     this.id = id;
//     this.side = side;
//     this.name = name;
//     this.location = location;
//     this.length = location.length;
//     this.hits = hits; 
//   }
//   hit() {
//     this.hits++;
//   }
//   isSunk(grid) { 
//     if (this.length === this.hits) {
//         sunk(this.name, grid);
//     }
//   }
// };

// // GAMEBOARD FACTORY.js
// class Gameboard {
//   constructor() {
//     this.totalHits = 0;
//     this.waterGrid = [];
//   }
//   createGameboard() {
//     for (let i = 1; i <= 100; i++) {
//       this.waterGrid.push({cell: i, hit: 0, miss: 0})
//     }
//     return this.waterGrid;
//   }
//   placeShip(id, side, name, location, hits=0) {
//     let newShip;
//     side === 0 ? newShip = new Ship(id, 0, name, location, hits) : newShip = 
//     new Ship(id, 1, name, location, hits);
//     logFleet(side, newShip);
//   }
//   receiveAttack(num, grid) {
//     let fleet;
//     grid === playerGrid ? fleet = playerFleet : fleet = enemyFleet;
//     for(let i=0; i<fleet.length; i++) {
//       for(let j=0; j<fleet[i].location.length; j++) {
//         if(num === fleet[i].location[j]) {
//           grid.waterGrid[num-1].hit = 1;
//           fleet[i].hit();
//           fleet[i].isSunk(grid);
//           grid.allSunk(grid);
//           if (fleet === playerFleet) {
//             loggedHitAI = []; // only clear if hit
//             loggedHitAI.push(grid.waterGrid[num-1].cell);
//           }
//         }
//       }
//     }
//     if (grid.waterGrid[num-1].hit === 0){
//       grid.waterGrid[num-1].miss = 1; 
//     }
//     hitOrMiss(grid);
//   }
//   allSunk(grid) {
//     for(let i=0; i<100; i++) { 
//       if(grid.waterGrid[i].hit === 1) {
//         grid.totalHits++;
//       }
//     }
//     if(grid.totalHits === 17) {
//       removeListeners();
//       gameOver(grid);
//     } else if (grid.totalHits !== 17) {
//       grid.totalHits = 0;
//     }
//   }
// };

// // PLAYER FACTORY.js
// class Player {
//   constructor(name) {
//     this.player = name;
//   };
//   playerAttack(e) {
//     let num = Number(e.target.getAttribute('data-compcell'));
//     if(computerGrid.waterGrid[num-1].hit === 1 || computerGrid.waterGrid[num-1].miss 
//       === 1) { // already attacked
//     } else {
//       computerGrid.receiveAttack(num, computerGrid);
//       if (computerGrid.totalHits === 0) {
//         computer.computerAttack(playerGrid);
//       }
//     }
//   }
//   computerAttack(grid) {
//     const randomCell = Math.floor(Math.random() * 100) + 1; // 1-100 (auto fires)
//     if(loggedHitAI.length === 1) {
//       smartHits.push(loggedHitAI[0]-10, loggedHitAI[0]-1, loggedHitAI[0]+1, loggedHitAI[0]+10);
//       checkSmartHits(smartHits);
//       if (smartHits.length === 0) {
//         loggedHitAI = [];
//         computer.computerAttack(playerGrid); //
//       } else {
//         const randomSmartCell = smartHits[Math.floor(Math.random() * smartHits.length)];
//         smartHits = []; // clear smartHits
//         grid.receiveAttack(randomSmartCell, grid); // Here
//       }
//     } else if(grid.waterGrid[randomCell-1].hit === 1 || grid.waterGrid[randomCell-1].miss 
//         === 1) { // already attacked
//         computer.computerAttack(playerGrid);
//     } else {
//         grid.receiveAttack(randomCell, grid);
//     }
//   }
// };

// DOM.js (UI)
const gameBoards = document.getElementById('gameBoards');
let loggedHitAI = [];
let smartHits = [];

const checkSmartHits = (smartHits) => {
  if (loggedHitAI[0] % 10 === 0) { // split board
    smartHits.splice(2, 1);
  }
  if (loggedHitAI[0] % 10 === 1) { // split board
    smartHits.splice(1, 1);
  }
  for(let i = smartHits.length - 1; i >= 0; i--) { // reverse order for loop (for splice)
    if(smartHits[i]<=0 || smartHits[i]>100 || playerGrid.waterGrid[smartHits[i]-1].hit 
      === 1 || playerGrid.waterGrid[smartHits[i]-1].miss === 1) {
      smartHits.splice(smartHits.indexOf(smartHits[i]), 1);
    }
  }
};

const renderGrids = () => { 
  const player = document.getElementById('player');
  const computer = document.getElementById('computer');
  for(let i=1; i<=100; i++) {
    const playCell = document.createElement('div');
    playCell.classList.add('playCell');
    playCell.setAttribute('data-playcell', i);
    player.appendChild(playCell);

    const compCell = document.createElement('div');
    compCell.classList.add('compCell');
    compCell.setAttribute('data-compcell', i);
    computer.appendChild(compCell);
    addListeners();
  }
};

const addListeners = () => {
  const listeners = document.querySelectorAll('.compCell');
  listeners.forEach(cell => {
    cell.addEventListener('click', human.playerAttack)
  })
};

const removeListeners = () => {
  const listeners = document.querySelectorAll('.compCell');
  listeners.forEach(cell => {
    cell.removeEventListener('click', human.playerAttack)
  })
};

const placeComputerShip = () => {
  const computerShips = [[0,'Carrier',4],[1,'Battleship',3],[2,'Cruiser',2],
  [3,'Submarine',2],[4,'Destroyer',1]];
  for(let i=0;i<computerShips.length;i++) {
    let id = i;
    let side = 1;
    let name = computerShips[i][1];
    let location = [];
    const randomAxis = Math.floor(Math.random() * 2) + 1;
    const randomLaunchCell = Math.floor(Math.random() * 100) + 1; // 1-100
    location.push(randomLaunchCell);
    if(randomAxis === 1) {
      for(let j=1;j<=computerShips[i][2];j++) {
        location.push(randomLaunchCell+j);
      }
      recurse(randomAxis, id, name, location);
    }
    if(randomAxis === 2) {
      for(let j=1;j<=computerShips[i][2];j++) {
        location.push(randomLaunchCell+(j*10));
      }
      recurse(randomAxis, id, name, location);
    }
  }
};

const recurse = (randomAxis, id, name, location) => {
  if(checkCompOffBoard(randomAxis, location) !== true && 
  checkOverlap(location, 1) !== true) {
    computerGrid.placeShip(id, 1, name, location);
  } else {
    if(randomAxis === 1) {
      let num = location.length;
      let random = Math.floor(Math.random() * 100) + 1;
      location = [random];
      for(let k=1;k<num;k++) {
        location.push(random+k);
      }
      recurse(randomAxis, id, name, location);
    }
    if(randomAxis === 2) {
      let num = location.length;
      let random = Math.floor(Math.random() * 100) + 1;
      location = [random];
      for(let k=1;k<num;k++) {
        location.push(random+(k*10));
      }
      recurse(randomAxis, id, name, location);
    }
  }
};

const checkCompOffBoard = (randomAxis, location) => {
  if(randomAxis === 2) {
    if(Math.max(...location) > 100) {
      return true; // off board
    }
  }
  if(randomAxis === 1) { // could do this with % 10 and 11 === 0
    if(location.includes(10) && location.includes(11) ||
    location.includes(20) && location.includes(21) ||
    location.includes(30) && location.includes(31) ||
    location.includes(40) && location.includes(41) ||
    location.includes(50) && location.includes(51) ||
    location.includes(60) && location.includes(61) ||
    location.includes(70) && location.includes(71) ||
    location.includes(80) && location.includes(81) ||
    location.includes(90) && location.includes(91) || location.includes(101)) {
      return true; // off the board
    }
  }
};

const hitOrMiss = (grid) => {
  let gridData;
  grid === playerGrid ? gridData = "playcell" : gridData = "compcell";
  for(let i=0; i<100; i++) {
    if(grid.waterGrid[i].hit === 1) {
      let cell = document.querySelector(`[data-${gridData}='${i+1}']`);
      cell.classList.add('hit');
    }
    if(grid.waterGrid[i].miss === 1) {
      let cell = document.querySelector(`[data-${gridData}='${i+1}']`);
      cell.classList.add('miss');
    }
  }
};

const shipColor = () => {
  for(i=0; i<playerFleet.length; i++) {
    for(let j=0; j<playerFleet[i].location.length; j++) {
      let ship = document.querySelector(`[data-playcell='${playerFleet[i].location[j]}']`);
      ship.classList.add('ship');
    }
  }
};

const sunk = (name, grid) => {
  let id;
  grid === computerGrid ? id = "comp" : id = "play";
  const sunkShip = document.getElementById(`${id}${name}`);
  sunkShip.classList.add('sunk');
}

const gameOver = (grid) => {
  const info = document.getElementById('info');
  const instructions = document.getElementById('instructions');
  const resetBtn = document.createElement('button');
  resetBtn.innerHTML = "RESET";
  resetBtn.addEventListener('click', reset);
  info.removeChild(instructions);
  info.appendChild(resetBtn);
  if (grid === playerGrid) {
    const enemyStatus = document.getElementById('enemyStatus');
    enemyStatus.innerHTML = "ENEMY STATUS: You are VICTORIOUS!";
    const playerStatus = document.getElementById('playerStatus');
    playerStatus.innerHTML = "PLAYER STATUS: Your Fleet Lies in RUIN!";
  } else {
    const playerStatus = document.getElementById('playerStatus');
    playerStatus.innerHTML = "PLAYER STATUS: You are VICTORIOUS!";
    const enemyStatus = document.getElementById('enemyStatus');
    enemyStatus.innerHTML = "ENEMY STATUS: Your Fleet Lies in RUIN!";
  }
};
const reset = () => location.reload();

// DRAG.js
let shipInfo = [];
const directionBtn = document.getElementById('directionBtn');
directionBtn.addEventListener('click', changeDirection);
const player = document.getElementById('player');
player.addEventListener('dragover', onDragOver);
player.addEventListener('dragenter', onDragEnter);
player.addEventListener('drop', onDrop);

const addDragListeners = () => {
  const dragCell = document.querySelectorAll('.dragCell');
  dragCell.forEach(cell => {
    cell.addEventListener('mousedown', logShipCell)
  })
  const dragShip = document.querySelectorAll('.dragShip');
  dragShip.forEach(ship => {
    ship.addEventListener('dragstart', onDragStart)
  })
};

const onDragStart = (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
};
function onDragOver(e) {
  e.preventDefault();
};
function onDragEnter(e) {
  e.preventDefault();
};

function onDrop(e) {
  if(shipInfo.length > 1) {
    for(let i=shipInfo.length-2;i>=0;i--) {
      shipInfo.splice(shipInfo.indexOf(shipInfo[i]),1);
    }
  }
  const shipName = e.dataTransfer.getData('text');
  const dropArea = e.target;
  shipInfo.push(dropArea.getAttribute('data-playcell'));
  shipInfo.push(shipName);
  getPlayerShipLocation(shipName);
};

const logShipCell = (e) => {
  shipInfo.push(e.target.getAttribute('data-cell'));
};

const beginGame = () => {
  const playerBattle = document.getElementById('playerBattle');
  const computerArea = document.getElementById('computerArea');
  const instructions = document.getElementById('instructions');
  const harbor = document.getElementById('harbor');
  const directionBtn = document.getElementById('directionBtn');
  const key = document.getElementById('key');
  if(playerFleet.length === 5) {
    playerBattle.style.display = 'block';
    computerArea.style.display = 'block';
    key.style.display = 'block';
    instructions.innerHTML = "Attack the enemy fleet by clicking on their waters.";
    harbor.style.display = 'none';
    directionBtn.style.display = 'none';
  }
};

const getPlayerShipLocation = (shipName) => {
  const fleet = document.getElementById('fleet');
  let id;
  let side = 0;
  let length;
  let name = shipInfo[2];
  let location = [Number(shipInfo[1])];
  if(shipInfo[2] === "Carrier") {
    id = 0;
    length = 5;
  }
  if(shipInfo[2] === "Battleship") {
    id = 1;
    length = 4;
  }
  if(shipInfo[2] === "Cruiser") {
    id = 2;
    length = 3;
  }
  if(shipInfo[2] === "Submarine") {
    id = 3;
    length = 3;
  }
  if(shipInfo[2] === "Destroyer") {
    id = 4;
    length = 2;
  }
  if(fleet.style.display === '') {
    let right = length-shipInfo[0];
    let left = shipInfo[0]-1;
    for(let i=1; i<=right; i++) {
      location.push(Number(shipInfo[1])+i);
    }
    for(let i=1; i<=left; i++) {
      location.unshift(Number(shipInfo[1])-i);
    }
  } else if(fleet.style.display === 'flex') {
    let top = shipInfo[0]-1;
    let bottom = length-shipInfo[0];
    for(let i=1; i<=top; i++) {
      location.unshift(Number(shipInfo[1])-(i*10));
    }
    for(let i=1; i<=bottom; i++) {
      location.push(Number(shipInfo[1])+(i*10));
    }
  }
  if(checkOffBoard(location) && checkOverlap(location, side) !== true) {
    const draggedShip = document.getElementById(shipName);
    draggedShip.remove();
    playerGrid.placeShip(id, side, name, location); // move this elsewhere
    shipInfo = [];
    shipColor();
    beginGame();
  } else {
    shipInfo = [];
    shipColor();
  }
};

const checkOverlap = (location, side) => {
  let fleetSide;
  side === 0 ? fleetSide = playerFleet : fleetSide = enemyFleet;
  for(i=0; i<fleetSide.length; i++) {
    for(let j=0; j<fleetSide[i].location.length; j++) {
      if(location.indexOf(fleetSide[i].location[j]) !== -1) {
        return true; // overlapping
      }
    }
  }
};

const checkOffBoard = (location, grid) => {
  const fleet = document.getElementById('fleet');
  if(fleet.style.display === '') {
    if(location.includes(0) || location.includes(10) && location.includes(11) ||
    location.includes(20) && location.includes(21) ||
    location.includes(30) && location.includes(31) ||
    location.includes(40) && location.includes(41) ||
    location.includes(50) && location.includes(51) ||
    location.includes(60) && location.includes(61) ||
    location.includes(70) && location.includes(71) ||
    location.includes(80) && location.includes(81) ||
    location.includes(90) && location.includes(91) || location.includes(101)) {
      return false;
    } else {
      return true;
    }
  } else if (fleet.style.display === 'flex') {
    if(Math.min(...location) < 1 || Math.max(...location) > 100) {
      return false;
    } else {
      return true;
    }
  } 
};

function changeDirection() { // change to const later? In module?
  const dragShip = document.querySelectorAll('.dragShip');
  const carrier = document.getElementById('Carrier');
  const carrierStyle = getComputedStyle(carrier);
  const carrierHeight = carrierStyle.height;
  const changeMeasure = carrierHeight;
  const battleship = document.getElementById('Battleship');
  const cruiser = document.getElementById('Cruiser');
  const submarine = document.getElementById('Submarine');
  const destroyer = document.getElementById('Destroyer');
  if(fleet.style.display === '') {
    const fleet = document.getElementById('fleet');
    fleet.style.display = 'flex';
    dragShip.forEach(ship => {
      ship.style.display = 'block';
      ship.setAttribute('data-measure', changeMeasure);
    })
    if(carrier) {
      let measure = carrier.getAttribute('data-measure');
      carrier.style.width = `${measure}`;
      carrier.style.height = `${parseInt(measure)*5}px`;
    }
    if(battleship) {
      let measure = battleship.getAttribute('data-measure');
      battleship.style.width = `${measure}`;
      battleship.style.height = `${parseInt(measure)*4}px`;
    }
    if(cruiser) {
      let measure = cruiser.getAttribute('data-measure');
      cruiser.style.width = `${measure}`;
      cruiser.style.height = `${parseInt(measure)*3}px`;
    }
    if(submarine) {
      let measure = submarine.getAttribute('data-measure');
      submarine.style.width = `${measure}`;
      submarine.style.height = `${parseInt(measure)*3}px`;
    }
    if(destroyer) {
      let measure = destroyer.getAttribute('data-measure');
      destroyer.style.width = `${measure}`;
      destroyer.style.height = `${parseInt(measure)*2}px`;
    }
  } else if (fleet.style.display = 'block') {
    const fleet = document.getElementById('fleet');
    fleet.style.display = '';
    dragShip.forEach(ship => {
      ship.style.display = 'flex';
      ship.setAttribute('data-measure', changeMeasure);
    })
    if(carrier) {
      let measure = carrier.getAttribute('data-measure');
      carrier.style.width = `${measure}`;
      carrier.style.height = `${parseInt(measure)/5}px`;
    }
    if(battleship) {
      let measure = battleship.getAttribute('data-measure');
      battleship.style.width = `${parseInt(measure)/5*4}px`;
      battleship.style.height = `${parseInt(measure)/5}px`;
    }
    if(cruiser) {
      let measure = cruiser.getAttribute('data-measure');
      cruiser.style.width = `${parseInt(measure)/5*3}px`
      cruiser.style.height = `${parseInt(measure)/5}px`;
    }
    if(submarine) {
      let measure = submarine.getAttribute('data-measure');
      submarine.style.width = `${parseInt(measure)/5*3}px`
      submarine.style.height = `${parseInt(measure)/5}px`;
    }
    if(destroyer) {
      let measure = destroyer.getAttribute('data-measure');
      destroyer.style.width = `${parseInt(measure)/5*2}px`
      destroyer.style.height = `${parseInt(measure)/5}px`;
    }
  }
};



// index.js (Game Loop?)
const playerFleet = [];
const enemyFleet = [];

const logFleet = (side, newShip) => { // move elsewhere?
  let fleet;
  side === 0 ? fleet = playerFleet : fleet = enemyFleet;
  if(fleet.length === 0) {
    fleet.push(newShip);
  } else if(fleet.length !== 0) {
    fleet.push(newShip);
    fleet.sort(function(a,b){return a.id-b.id});
  }
}

const human = new Player();
const computer = new Player();
const playerGrid = new Gameboard();
const computerGrid = new Gameboard();
playerGrid.createGameboard();
computerGrid.createGameboard();
placeComputerShip();
addDragListeners();
renderGrids(); // move somewhere else?