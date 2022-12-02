"use strict";

// import { checkCollisionAsm } from "/asm-build/release.js";

const collBtn1 = qs("#iterateCollision");
collBtn1.addEventListener("click", iterateCollision);

var asmCollisionAgg = 0;
var objCollisionAgg = 0;
var coordsCollisionAgg = 0;
var coords2CollisionAgg = 0;
var hashCollisionAgg = 0;

function _checkCollisionAsm() {
  let t0 = now();
  const collision = checkCollisionAsm(asmCoords, idCount, ids);
  let tz = now() - t0;
  asmCollisionAgg += tz;
  return collision;
}

function checkCollisionObj() {
  let t0 = now();
  const a = objs[0];
  const collisions = [];
  const x = a.x;
  const y = a.y;
  const xZ = a.xZ;
  const yZ = a.yZ;
  for (let i = 1; i < idCount; i++) {
    const b = objs[i];
    if (xZ > b.x && x < b.xZ && yZ > b.y && y < b.yZ) {
      collisions.push(b.id);
    }
  }

  let tz = now() - t0;
  objCollisionAgg += tz;
  return collisions;
}

function checkCollisionIdxLoc() {
  let t0 = now();
  const a = 0;
  const collisions = [];
  const coordsA = coords[a];
  const x = coordsA[0];
  const y = coordsA[1];
  const xZ = coordsA[2];
  const yZ = coordsA[3];
  for (let b = 1; b < idCount; b++) {
    const coordsB = coords[b];
    if (
      xZ > coordsB[0] &&
      x < coordsB[2] &&
      yZ > coordsB[1] &&
      y < coordsB[3]
    ) {
      collisions.push(ids[b]);
    }
  }

  let tz = now() - t0;
  coordsCollisionAgg += tz;
  return collisions;
}

function checkCollisionIdxLoc2() {
  let t0 = now();
  const a = 0;
  const collisions = [];
  const offsetA = 6 * a;
  const x = coords2[offsetA];
  const y = coords2[offsetA + 1];
  const xZ = coords2[offsetA + 2];
  const yZ = coords2[offsetA + 3];
  for (let b = 1; b < idCount; b++) {
    const offsetB = 6 * b;
    if (
      xZ > coords2[offsetB] &&
      x < coords2[offsetB + 2] &&
      yZ > coords2[offsetB + 1] &&
      y < coords2[offsetB + 3]
    ) {
      collisions.push(ids[b]);
    }
  }

  let tz = now() - t0;
  coords2CollisionAgg += tz;
  return collisions;
}

function checkCollisionHash() {
  const t0 = now();
  const a = hash[1];
  const collisions = [];
  const x = a.x;
  const y = a.y;
  const xZ = a.xZ;
  const yZ = a.yZ;
  for (let i = 2; i <= idCount; i++) {
    const b = hash[i];
    if (xZ > b.x && x < b.xZ && yZ > b.y && y < b.yZ) {
      collisions.push(b.id);
    }
  }

  const tz = now() - t0;
  hashCollisionAgg += tz;
  return collisions;
}

function iterateCollision() {
  collBtn1.classList.add("active");
  setTimeout(() => {
    asmCollisionAgg = 0;
    objCollisionAgg = 0;
    coordsCollisionAgg = 0;
    coords2CollisionAgg = 0;
    hashCollisionAgg = 0;

    print("resultado colisiones:");
    print(numIterations, "iteraciones");
    print(idCount, "objetos");
    for (let i = 0; i < numIterations; i++) {
      const resultObj = checkCollisionObj();
      const resultCoords = checkCollisionIdxLoc();
      const resultCoords2 = checkCollisionIdxLoc2();
      const resultHash = checkCollisionHash();
      // const resultAsm = _checkCollisionAsm();
      log(
        `${i + 1}/${numIterations}`,
        resultCoords.length == resultObj.length &&
          resultCoords.length == resultCoords2.length &&
          resultCoords.length == resultHash.length &&
          // resultCoords.length == resultAsm.length &&
          true
      );
    }
    print(" - obj avg", (objCollisionAgg / numIterations).toFixed(3));
    print(" - coords avg", (coordsCollisionAgg / numIterations).toFixed(3));
    print(" - coords2 avg", (coords2CollisionAgg / numIterations).toFixed(3));
    print(" - hash avg", (hashCollisionAgg / numIterations).toFixed(3));
    print(" - asm avg", (asmCollisionAgg / numIterations).toFixed(3));
    print(" ");
    collBtn1.classList.remove("active");
  }, 10);
}
