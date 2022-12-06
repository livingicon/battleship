(()=>{"use strict";const e=class{constructor(){this.totalHits=0,this.waterGrid=[]}createGameboard(){for(let e=1;e<=100;e++)this.waterGrid.push({cell:e,hit:0,miss:0});return this.waterGrid}placeShip(e,t,l,i,s=0){let r;r=new class{constructor(e,t,l,i,s=0){this.id=e,this.side=t,this.name=l,this.location=i,this.length=i.length,this.hits=s}hit(){this.hits++}isSunk(e){this.length===this.hits&&sunk(this.name,e)}}(e,0===t?0:1,l,i,s),logFleet(t,r)}receiveAttack(e,t){let l;l=t===playerGrid?playerFleet:enemyFleet;for(let i=0;i<l.length;i++)for(let s=0;s<l[i].location.length;s++)e===l[i].location[s]&&(t.waterGrid[e-1].hit=1,l[i].hit(),l[i].isSunk(t),t.allSunk(t),l===playerFleet&&(loggedHitAI=[],loggedHitAI.push(t.waterGrid[e-1].cell)));0===t.waterGrid[e-1].hit&&(t.waterGrid[e-1].miss=1),hitOrMiss(t)}allSunk(e){for(let t=0;t<100;t++)1===e.waterGrid[t].hit&&e.totalHits++;17===e.totalHits?(removeListeners(),gameOver(e)):17!==e.totalHits&&(e.totalHits=0)}},t=class{constructor(e){this.player=e}playerAttack(e){let t=Number(e.target.getAttribute("data-compcell"));1===computerGrid.waterGrid[t-1].hit||1===computerGrid.waterGrid[t-1].miss||(computerGrid.receiveAttack(t,computerGrid),0===computerGrid.totalHits&&computer.computerAttack(playerGrid))}computerAttack(e){const t=Math.floor(100*Math.random())+1;if(1===loggedHitAI.length)if(smartHits.push(loggedHitAI[0]-10,loggedHitAI[0]-1,loggedHitAI[0]+1,loggedHitAI[0]+10),checkSmartHits(smartHits),0===smartHits.length)loggedHitAI=[],computer.computerAttack(playerGrid);else{const t=smartHits[Math.floor(Math.random()*smartHits.length)];smartHits=[],e.receiveAttack(t,e)}else 1===e.waterGrid[t-1].hit||1===e.waterGrid[t-1].miss?computer.computerAttack(playerGrid):e.receiveAttack(t,e)}};document.getElementById("gameBoards");const l=(e,t,i,r)=>{if(!0!==s(e,r)&&!0!==u(r,1))f.placeShip(t,1,i,r);else{if(1===e){let s=r.length,a=Math.floor(100*Math.random())+1;r=[a];for(let e=1;e<s;e++)r.push(a+e);l(e,t,i,r)}if(2===e){let s=r.length,a=Math.floor(100*Math.random())+1;r=[a];for(let e=1;e<s;e++)r.push(a+10*e);l(e,t,i,r)}}},s=(e,t)=>2===e&&Math.max(...t)>100||!(1!==e||!(t.includes(10)&&t.includes(11)||t.includes(20)&&t.includes(21)||t.includes(30)&&t.includes(31)||t.includes(40)&&t.includes(41)||t.includes(50)&&t.includes(51)||t.includes(60)&&t.includes(61)||t.includes(70)&&t.includes(71)||t.includes(80)&&t.includes(81)||t.includes(90)&&t.includes(91)||t.includes(101)))||void 0,r=()=>{for(i=0;i<m.length;i++)for(let e=0;e<m[i].location.length;e++)document.querySelector(`[data-playcell='${m[i].location[e]}']`).classList.add("ship")};let a=[];document.getElementById("directionBtn").addEventListener("click",(function(){const e=document.querySelectorAll(".dragShip"),t=document.getElementById("Carrier"),l=getComputedStyle(t).height,i=document.getElementById("Battleship"),s=document.getElementById("Cruiser"),r=document.getElementById("Submarine"),a=document.getElementById("Destroyer");if(""===fleet.style.display){if(document.getElementById("fleet").style.display="flex",e.forEach((e=>{e.style.display="block",e.setAttribute("data-measure",l)})),t){let e=t.getAttribute("data-measure");t.style.width=`${e}`,t.style.height=5*parseInt(e)+"px"}if(i){let e=i.getAttribute("data-measure");i.style.width=`${e}`,i.style.height=4*parseInt(e)+"px"}if(s){let e=s.getAttribute("data-measure");s.style.width=`${e}`,s.style.height=3*parseInt(e)+"px"}if(r){let e=r.getAttribute("data-measure");r.style.width=`${e}`,r.style.height=3*parseInt(e)+"px"}if(a){let e=a.getAttribute("data-measure");a.style.width=`${e}`,a.style.height=2*parseInt(e)+"px"}}else if(fleet.style.display="block"){if(document.getElementById("fleet").style.display="",e.forEach((e=>{e.style.display="flex",e.setAttribute("data-measure",l)})),t){let e=t.getAttribute("data-measure");t.style.width=`${e}`,t.style.height=parseInt(e)/5+"px"}if(i){let e=i.getAttribute("data-measure");i.style.width=parseInt(e)/5*4+"px",i.style.height=parseInt(e)/5+"px"}if(s){let e=s.getAttribute("data-measure");s.style.width=parseInt(e)/5*3+"px",s.style.height=parseInt(e)/5+"px"}if(r){let e=r.getAttribute("data-measure");r.style.width=parseInt(e)/5*3+"px",r.style.height=parseInt(e)/5+"px"}if(a){let e=a.getAttribute("data-measure");a.style.width=parseInt(e)/5*2+"px",a.style.height=parseInt(e)/5+"px"}}}));const n=document.getElementById("player");n.addEventListener("dragover",(function(e){e.preventDefault()})),n.addEventListener("dragenter",(function(e){e.preventDefault()})),n.addEventListener("drop",(function(e){if(a.length>1)for(let e=a.length-2;e>=0;e--)a.splice(a.indexOf(a[e]),1);const t=e.dataTransfer.getData("text"),l=e.target;a.push(l.getAttribute("data-playcell")),a.push(t),o(t)}));const d=e=>{e.dataTransfer.setData("text/plain",e.target.id)},c=e=>{a.push(e.target.getAttribute("data-cell"))},o=e=>{const t=document.getElementById("fleet");let l,i,s=a[2],n=[Number(a[1])];if("Carrier"===a[2]&&(l=0,i=5),"Battleship"===a[2]&&(l=1,i=4),"Cruiser"===a[2]&&(l=2,i=3),"Submarine"===a[2]&&(l=3,i=3),"Destroyer"===a[2]&&(l=4,i=2),""===t.style.display){let e=i-a[0],t=a[0]-1;for(let t=1;t<=e;t++)n.push(Number(a[1])+t);for(let e=1;e<=t;e++)n.unshift(Number(a[1])-e)}else if("flex"===t.style.display){let e=a[0]-1,t=i-a[0];for(let t=1;t<=e;t++)n.unshift(Number(a[1])-10*t);for(let e=1;e<=t;e++)n.push(Number(a[1])+10*e)}h(n)&&!0!==u(n,0)?(document.getElementById(e).remove(),g.placeShip(l,0,s,n),a=[],r(),(()=>{const e=document.getElementById("playerBattle"),t=document.getElementById("computerArea"),l=document.getElementById("instructions"),i=document.getElementById("harbor"),s=document.getElementById("directionBtn"),r=document.getElementById("key");5===m.length&&(e.style.display="block",t.style.display="block",r.style.display="block",l.innerHTML="Attack the enemy fleet by clicking on their waters.",i.style.display="none",s.style.display="none")})()):(a=[],r())},u=(e,t)=>{let l;for(l=0===t?m:p,i=0;i<l.length;i++)for(let t=0;t<l[i].location.length;t++)if(-1!==e.indexOf(l[i].location[t]))return!0},h=(e,t)=>{const l=document.getElementById("fleet");return""===l.style.display?!(e.includes(0)||e.includes(10)&&e.includes(11)||e.includes(20)&&e.includes(21)||e.includes(30)&&e.includes(31)||e.includes(40)&&e.includes(41)||e.includes(50)&&e.includes(51)||e.includes(60)&&e.includes(61)||e.includes(70)&&e.includes(71)||e.includes(80)&&e.includes(81)||e.includes(90)&&e.includes(91)||e.includes(101)):"flex"===l.style.display?!(Math.min(...e)<1||Math.max(...e)>100):void 0},m=[],p=[],y=new t,g=(new t,new e),f=new e;g.createGameboard(),f.createGameboard(),(()=>{const e=[[0,"Carrier",4],[1,"Battleship",3],[2,"Cruiser",2],[3,"Submarine",2],[4,"Destroyer",1]];for(let t=0;t<e.length;t++){let i=t,s=e[t][1],r=[];const a=Math.floor(2*Math.random())+1,n=Math.floor(100*Math.random())+1;if(r.push(n),1===a){for(let l=1;l<=e[t][2];l++)r.push(n+l);l(a,i,s,r)}if(2===a){for(let l=1;l<=e[t][2];l++)r.push(n+10*l);l(a,i,s,r)}}})(),document.querySelectorAll(".dragCell").forEach((e=>{e.addEventListener("mousedown",c)})),document.querySelectorAll(".dragShip").forEach((e=>{e.addEventListener("dragstart",d)})),(()=>{const e=document.getElementById("player"),t=document.getElementById("computer");for(let l=1;l<=100;l++){const i=document.createElement("div");i.classList.add("playCell"),i.setAttribute("data-playcell",l),e.appendChild(i);const s=document.createElement("div");s.classList.add("compCell"),s.setAttribute("data-compcell",l),t.appendChild(s),document.querySelectorAll(".compCell").forEach((e=>{e.addEventListener("click",y.playerAttack)}))}})()})();