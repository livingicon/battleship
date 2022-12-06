import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";
import dragModule from "./dragUI.js";

const gameModule = (() => {

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

  return {};
})();

export default gameModule;