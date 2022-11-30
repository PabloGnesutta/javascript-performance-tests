"use strict";

const loadBtn1 = qs("#loadData");
loadBtn1.addEventListener("click", loadData);

const chunkSize = 1000000;
const numIterations = 20;

var idCount = 0;

var objs = [];
var hash = {};
var ids = [];
// var idsBuff = new Int32Array(chunkSize);
var coords = [];
var coords2 = [];

function newObj(id) {
  const x = Math.floor(Math.random() * 400);
  const y = Math.floor(Math.random() * 600);
  const returnObj = {
    id,
    x,
    y,
    xZ: x + 20,
    yZ: y + 30,
    w: 20,
    h: 30,
    randomFlag: false,
    name: "name-" + id,
    _xZ: x + 20,
    _yZ: y + 30,
    _w: 20,
    _h: 30,
    _name: "name-" + id,
    __xZ: x + 20,
    __yZ: y + 30,
    __w: 20,
    __h: 30,
    __name: "name-" + id,
    ___xZ: x + 20,
    ___yZ: y + 30,
    ___w: 20,
    ___h: 30,
    ___name: "name-" + id,
    update() {
      this.x++;
      this.y++;
      this.xZ = this.x + this.w;
      this.yZ = this.y + this.h;
    },
  };
  if (x > 200) returnObj.randomFlag = true;
  return returnObj;
}

function loadData() {
  loadBtn1.classList.add("active");
  setTimeout(() => {
    print(" loadData");
    const t0 = now();
    for (let i = 0; i < chunkSize; i++) {
      idCount++;
      const obj = newObj(idCount);
      objs.push(obj);
      ids.push(idCount);
      hash[idCount] = obj;
      // idsBuff[i] = idCount;
      coords.push([obj.x, obj.y, obj.xZ, obj.yZ]);
      coords2.push(obj.x, obj.y, obj.xZ, obj.yZ, obj.w, obj.h);
    }
    print(" - idCount", idCount);
    print(" - demoró", (now() - t0).toFixed(3));
    print(" ");
    loadBtn1.classList.remove("active");
  }, 0);
}

loadData();

// log(objs);
// log(ids);
// log(hash);
// log(coords);
// log(coords2);
