import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";
import gameModule from "./gameUI.js";

// dragUI.js
const dragModule = (() => {
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

  return {};
})();

export default dragModule;