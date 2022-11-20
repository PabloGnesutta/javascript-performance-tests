qs("#loadArray").addEventListener("click", loadArray);
qs("#loadHash").addEventListener("click", loadHash);

const numIterations = 30;
const chunkSize = 10000000;
var arrayId = 0;
var hashId = 0;

var idsBuff = new Int32Array(chunkSize);
var ids = [];
var objs = [];
var _loc = [];
var _loc2 = [];

var hash = {};

function newObj(id) {
  const x = Math.floor(Math.random() * 400);
  const y = Math.floor(Math.random() * 600);
  const returnObj = {
    id,
    x,
    y,
    w: 20,
    h: 30,
    xZ: x + 20,
    yZ: y + 30,
    name: "name-" + id,
    _w: 20,
    _h: 30,
    _xZ: x + 20,
    _yZ: y + 30,
    _name: "name-" + id,
    __w: 20,
    __h: 30,
    __xZ: x + 20,
    __yZ: y + 30,
    __name: "name-" + id,
  };
  if (x > 200) returnObj.randomFlag = true;
  return returnObj;
}

function loadArray() {
  log(" loadArray");
  const t0 = performance.now();
  // en este caso el buffer no mejora performance
  // probablemente el js runtime determina que ids es un array de ints
  // checkear firefox
  for (let i = 0; i < chunkSize; i++) {
    arrayId++;
    const obj = newObj(arrayId);
    objs.push(obj);
    ids.push(arrayId);
    idsBuff[i] = arrayId;
    _loc.push([obj.x, obj.y, obj.xZ, obj.yZ]);
    // const offset = i * 4;
    // _loc2[offset] = obj.x;
    // _loc2[offset + 1] = obj.y;
    // _loc2[offset + 2] = obj.xZ;
    // _loc2[offset + 3] = obj.yZ;
    _loc2.push(obj.x, obj.y, obj.xZ, obj.yZ);
  }
  log("  -arrayId", arrayId);
  log("  -took", performance.now() - t0);
}

function loadHash() {
  log(" loadHash");
  const t0 = performance.now();
  for (let i = 0; i < chunkSize; i++) {
    hashId++;
    const obj = newObj(hashId);
    hash[hashId] = obj;
  }
  log("  -hashId", hashId);
  log("  -took", performance.now() - t0);
}

loadArray();
// loadArray();
// loadArray();
// loadHash();
