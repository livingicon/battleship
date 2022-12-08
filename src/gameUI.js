import GameLoop from "./index.js";

const gameModule = (() => {

  const gameBoards = document.getElementById('gameBoards');
  let loggedHitAI = [];
  let smartHits = [];
  const playerFleet = [];
  const enemyFleet = [];
  const directionBtn = document.getElementById('directionBtn');
  const player = document.getElementById('player');
  let shipInfo = [];

  const changeDirection = () => {
    const dragShip = document.querySelectorAll('.dragShip');
    const carrier = document.getElementById('Carrier');
    const battleship = document.getElementById('Battleship');
    const cruiser = document.getElementById('Cruiser');
    const submarine = document.getElementById('Submarine');
    const destroyer = document.getElementById('Destroyer');
    if(fleet.style.display === '') {
      const fleet = document.getElementById('fleet');
      fleet.style.display = 'flex';
      dragShip.forEach(ship => {
        ship.style.display = 'block';
      })
      if(carrier) {
        let measure = carrier.getAttribute('data-measure');
        carrier.style.width = `${measure}`;
        carrier.style.height = `${parseInt(measure)*5}px`;
        carrier.style.marginRight = "0px";
      }
      if(battleship) {
        let measure = battleship.getAttribute('data-measure');
        battleship.style.width = `${measure}`;
        battleship.style.height = `${parseInt(measure)*4}px`;
        battleship.style.marginRight = "0px";
      }
      if(cruiser) {
        let measure = cruiser.getAttribute('data-measure');
        cruiser.style.width = `${measure}`;
        cruiser.style.height = `${parseInt(measure)*3}px`;
        cruiser.style.marginRight = "0px";
      }
      if(submarine) {
        let measure = submarine.getAttribute('data-measure');
        submarine.style.width = `${measure}`;
        submarine.style.height = `${parseInt(measure)*3}px`;
        submarine.style.marginRight = "0px";
      }
      if(destroyer) {
        let measure = destroyer.getAttribute('data-measure');
        destroyer.style.width = `${measure}`;
        destroyer.style.height = `${parseInt(measure)*2}px`;
        destroyer.style.marginRight = "0px";
      }
    } else if (fleet.style.display = 'block') {
      const fleet = document.getElementById('fleet');
      fleet.style.display = '';
      dragShip.forEach(ship => {
        ship.style.display = 'flex';
      })
      if(carrier) {
        let measure = carrier.getAttribute('data-measure');
        carrier.style.width = `${parseInt(measure)*5}px`;
        carrier.style.height = `${measure}`;
      }
      if(battleship) {
        let measure = battleship.getAttribute('data-measure');
        battleship.style.width = `${parseInt(measure)*4}px`;
        battleship.style.height = `${measure}`;
      }
      if(cruiser) {
        let measure = cruiser.getAttribute('data-measure');
        cruiser.style.width = `${parseInt(measure)*3}px`
        cruiser.style.height = `${measure}`;
      }
      if(submarine) {
        let measure = submarine.getAttribute('data-measure');
        submarine.style.width = `${parseInt(measure)*3}px`
        submarine.style.height = `${measure}`;
      }
      if(destroyer) {
        let measure = destroyer.getAttribute('data-measure');
        destroyer.style.width = `${parseInt(measure)*2}px`
        destroyer.style.height = `${measure}`;
      }
    }
  };

  directionBtn.addEventListener('click', changeDirection);
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
      const shipStyle = getComputedStyle(ship);
      const shipHeight = shipStyle.height;
      ship.setAttribute('data-measure', shipHeight);
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
      instructions.innerHTML = "Attack the enemy fleet by clicking on their waters. You can see the status of both fleets under their waters.";
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
      GameLoop.playerGrid.placeShip(id, side, name, location);
      shipInfo = [];
      shipColor();
      beginGame();
    } else {
      shipInfo = [];
      shipColor();
    }
  };

  const logFleet = (side, newShip) => {
    let fleet;
    side === 0 ? fleet = playerFleet : fleet = enemyFleet;
    if(fleet.length === 0) {
      fleet.push(newShip);
    } else if(fleet.length !== 0) {
      fleet.push(newShip);
      fleet.sort(function(a,b){return a.id-b.id});
    }
  }

  const checkOverlap = (location, side) => {
    let fleet;
    side === 0 ? fleet = playerFleet : fleet = enemyFleet;
    for(let i=0; i<fleet.length; i++) {
      for(let j=0; j<fleet[i].location.length; j++) {
        if(location.indexOf(fleet[i].location[j]) !== -1) {
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
  
  const checkSmartHits = (smartHits) => {
    if (loggedHitAI[0] % 10 === 0) { // split board
      smartHits.splice(2, 1);
    }
    if (loggedHitAI[0] % 10 === 1) { // split board
      smartHits.splice(1, 1);
    }
    for(let i = smartHits.length - 1; i >= 0; i--) { // reverse order for loop (for splice)
      if(smartHits[i]<=0 || smartHits[i]>100 || GameLoop.playerGrid.waterGrid[smartHits[i]-1].hit 
        === 1 || GameLoop.playerGrid.waterGrid[smartHits[i]-1].miss === 1) {
        smartHits.splice(smartHits.indexOf(smartHits[i]), 1);
      }
    }
  };

  const addListeners = (human) => {
    const listeners = document.querySelectorAll('.compCell');
    listeners.forEach(cell => {
      cell.addEventListener('click', human.playerAttack)
    })
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
    }
  };
  
  const removeListeners = () => {
    const listeners = document.querySelectorAll('.compCell');
    listeners.forEach(cell => {
      cell.removeEventListener('click', GameLoop.human.playerAttack)
    })
  };
  
  const placeComputerShip = (computerGrid) => {
    const computerShips = [[0,'Carrier',4],[1,'Battleship',3],[2,'Cruiser',2],
    [3,'Submarine',2],[4,'Destroyer',1]];
    for(let i=0;i<computerShips.length;i++) {
      let id = i; 
      let side = 1;
      let name = computerShips[i][1]; 
      let location = [];
      let grid = computerGrid;
      const randomAxis = Math.floor(Math.random() * 2) + 1;
      const randomLaunchCell = Math.floor(Math.random() * 100) + 1; // 1-100
      location.push(randomLaunchCell);
      if(randomAxis === 1) {
        for(let j=1;j<=computerShips[i][2];j++) {
          location.push(randomLaunchCell+j);
        }
        recurse(randomAxis, id, name, location, grid);
      }
      if(randomAxis === 2) {
        for(let j=1;j<=computerShips[i][2];j++) {
          location.push(randomLaunchCell+(j*10));
        }
        recurse(randomAxis, id, name, location, grid);
      }
    }
  };
  
  const recurse = (randomAxis, id, name, location, grid) => {
    if(checkCompOffBoard(randomAxis, location) !== true && 
    checkOverlap(location, 1) !== true) {
      grid.placeShip(id, 1, name, location);
    } else {
      if(randomAxis === 1) {
        let num = location.length;
        let random = Math.floor(Math.random() * 100) + 1;
        location = [random];
        for(let k=1;k<num;k++) {
          location.push(random+k);
        }
        recurse(randomAxis, id, name, location, grid);
      }
      if(randomAxis === 2) {
        let num = location.length;
        let random = Math.floor(Math.random() * 100) + 1;
        location = [random];
        for(let k=1;k<num;k++) {
          location.push(random+(k*10));
        }
        recurse(randomAxis, id, name, location, grid);
      }
    }
  };
  
  const checkCompOffBoard = (randomAxis, location) => {
    if(randomAxis === 2) {
      if(Math.max(...location) > 100) {
        return true; // off board
      }
    }
    if(randomAxis === 1) {
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
    grid === GameLoop.playerGrid ? gridData = "playcell" : gridData = "compcell";
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
    for(let i=0; i<playerFleet.length; i++) {
      for(let j=0; j<playerFleet[i].location.length; j++) {
        let ship = document.querySelector(`[data-playcell='${playerFleet[i].location[j]}']`);
        ship.classList.add('ship');
      }
    }
  };
  
  const sunk = (name, grid) => {
    let id;
    grid === GameLoop.computerGrid ? id = "comp" : id = "play";
    const sunkShip = document.getElementById(`${id}${name}`);
    sunkShip.classList.add('sunk');
  }
  
  const gameOver = (grid) => {
    const info = document.getElementById('info');
    const instructions = document.getElementById('instructions');
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = "PLAY AGAIN";
    resetBtn.setAttribute('id', 'resetBtn');
    resetBtn.addEventListener('click', reset);
    info.removeChild(instructions);
    info.appendChild(resetBtn);
    if (grid === GameLoop.playerGrid) {
      const enemyStatus = document.getElementById('enemyStatus');
      enemyStatus.innerHTML = "VICTORY";
      enemyStatus.style.color = "#d31414";
      const playerStatus = document.getElementById('playerStatus');
      playerStatus.innerHTML = "DEFEAT";
      playerStatus.style.color = "#d31414";
    } else {
      const playerStatus = document.getElementById('playerStatus');
      playerStatus.innerHTML = "VICTORY";
      playerStatus.style.color = "#d31414";
      const enemyStatus = document.getElementById('enemyStatus');
      enemyStatus.innerHTML = "DEFEAT";
      enemyStatus.style.color = "#d31414";
    }
  };

  const reset = () => location.reload();

  return { renderGrids, gameOver, sunk, checkSmartHits, placeComputerShip, addDragListeners, logFleet, addListeners, removeListeners, hitOrMiss, playerFleet, enemyFleet, loggedHitAI, smartHits };
})();

export default gameModule;