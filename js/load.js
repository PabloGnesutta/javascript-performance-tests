"use strict";

qs("#loadArray").addEventListener("click", loadArray);

const numIterations = 20;
const chunkSize = 3000000;

var idCount = 0;

var idsBuff = new Int32Array(chunkSize);
var ids = [];
var objs = [];
var coords = [];
var coords2 = [];

var hash = {};

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
    name: "name-" + id,
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

function loadArray() {
  log(" loadArray");
  const t0 = now();
  // en este caso el buffer no mejora performance
  // probablemente el js runtime determina que ids es un array de ints
  for (let i = 0; i < chunkSize; i++) {
    idCount++;
    const obj = newObj(idCount);
    objs.push(obj);
    ids.push(idCount);
    idsBuff[i] = idCount;
    coords.push([obj.x, obj.y, obj.xZ, obj.yZ]);
    coords2.push(obj.x, obj.y, obj.xZ, obj.yZ, obj.w, obj.h);
    hash[idCount] = obj;
  }
  log("  -idCount", idCount);
  log("  -took", now() - t0);
}

loadArray();
