(()=>{"use strict";const t=new class{constructor(t,s=0){this.length=t,this.hits=s}hit(){this.hits++}isSunk(){return this.hits===this.length}}(4,2);t.hit(),console.log(t)})();