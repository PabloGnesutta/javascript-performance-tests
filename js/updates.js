"use strict";

qs("#iterateUpdates").addEventListener("click", iterateUpdates);

var updateObjsAgg = 0;
var externalFunctionAgg = 0;
var updateCoordsAgg = 0;
var updateHashAgg = 0;

function externalUpdate(obj) {
  obj.x++;
  obj.y++;
  obj.xZ = obj.x + obj.w;
  obj.yZ = obj.y + obj.h;
}

function updateObjs() {
  const t0 = now();
  for (let i = 0; i < idCount; i++) objs[i].update();
  updateObjsAgg += now() - t0;
}

function callExternalFunction() {
  t0 = now();
  for (let i = 0; i < idCount; i++) externalUpdate(objs[i]);
  externalFunctionAgg += now() - t0;
}

function updateCoords() {
  t0 = now();
  for (let i = 0; i < idCount; i++) {
    const offset = 6 * i;
    const newX = coords2[offset] + 1;
    const newY = coords2[offset + 1] + 1;
    coords2[offset] = newX;
    coords2[offset + 1] = newY;
    coords2[offset + 2] = newX + coords2[offset + 4];
    coords2[offset + 3] = newY + coords2[offset + 5];
  }
  updateCoordsAgg += now() - t0;
}

function updateHash() {
  const t0 = now();
  for (let i = 1; i <= idCount; i++) hash[i].update();
  updateHashAgg += now() - t0;
}

function iterateUpdates() {
  const t0 = now();
  log(" ");
  log(" perform", numIterations, "iterations with", idCount, "objects");
  updateObjsAgg = 0;
  externalFunctionAgg = 0;
  updateCoordsAgg = 0;
  updateHashAgg = 0;

  for (var i = 0; i < numIterations; i++) {
    log(`${i + 1}/${numIterations}`);
    updateObjs();
    callExternalFunction();
    updateCoords();
    updateHash();
  }

  const objAvg = updateObjsAgg / numIterations;
  const extAvg = externalFunctionAgg / numIterations;
  const coordsAvg = updateCoordsAgg / numIterations;
  const hashAvg = updateHashAgg / numIterations;
  log(" updates iteration finished results:");
  log("  - obj avg", objAvg);
  log("  - external avg", extAvg);
  log("  - coords avg", coordsAvg);
  log("  - hash avg", hashAvg);
  log("   - Time elapsed ", now() - t0);
}
