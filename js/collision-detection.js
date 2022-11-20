document
  .querySelector("#collisionObj")
  .addEventListener("click", checkCollisionObj);
document
  .querySelector("#iterateCollision")
  .addEventListener("click", iterateCollision);

function checkCollisionObj() {
  let t0 = performance.now();
  const a = objs[0];
  const collisions = [];
  const x = a.x;
  const y = a.y;
  const xZ = a.xZ;
  const yZ = a.yZ;
  for (let i = 1; i < arrayId; i++) {
    const b = objs[i];
    if (xZ > b.x && x < b.xZ && yZ > b.y && y < b.yZ) {
      collisions.push(b.id);
    }
  }

  let tz = performance.now() - t0;
  objCollisionAgg += tz;
  //   log("  obj took", tz);
  return collisions;
}

function checkCollisionIdxLoc() {
  let t0 = performance.now();
  const a = 0;
  const collisions = [];
  const _locA = _loc[a];
  const x = _locA[0];
  const y = _locA[1];
  const xZ = _locA[2];
  const yZ = _locA[3];
  for (let b = 1; b < arrayId; b++) {
    const _locB = _loc[b];
    if (xZ > _locB[0] && x < _locB[2] && yZ > _locB[1] && y < _locB[3]) {
      collisions.push(ids[b]);
    }
  }

  let tz = performance.now() - t0;
  _locCollisionAgg += tz;
  return collisions;
}

function checkCollisionIdxLoc2() {
  let t0 = performance.now();
  const a = 0;
  const collisions = [];
  const offsetA = 4 * a;
  const x = _loc2[offsetA];
  const y = _loc2[offsetA + 1];
  const xZ = _loc2[offsetA + 2];
  const yZ = _loc2[offsetA + 3];
  for (let b = 1; b < arrayId; b++) {
    const offsetB = 4 * b;
    // log(offsetB, offsetB + 1, offsetB + 2, offsetB + 3);
    if (
      xZ > _loc2[offsetB] &&
      x < _loc2[offsetB + 2] &&
      yZ > _loc2[offsetB + 1] &&
      y < _loc2[offsetB + 3]
    ) {
      collisions.push(ids[b]);
    }
  }

  let tz = performance.now() - t0;
  _loc2CollisionAgg += tz;
  return collisions;
}

var collisionCurrentIteration = 0;
var objCollisionAgg = 0;
var _locCollisionAgg = 0;
var _loc2CollisionAgg = 0;

function iterateCollision() {
  collisionCurrentIteration++;
  objCollisionAgg = 0;
  _locCollisionAgg = 0;
  _loc2CollisionAgg = 0;

  log("collision against", arrayId, "objects", numIterations, "times");
  for (let i = 0; i < numIterations; i++) {
    const resultObj = checkCollisionObj();
    const resultLoc = checkCollisionIdxLoc();
    const resultLoc2 = checkCollisionIdxLoc2();
    log(
      `${i + 1}/${numIterations}`,
      resultLoc.length == resultObj.length &&
        resultLoc.length == resultLoc2.length
    );
  }
  log("   - TOTAL obj avg", objCollisionAgg / numIterations);
  log("   - TOTAL loc avg", _locCollisionAgg / numIterations);
  log("   - TOTAL loc2 avg", _loc2CollisionAgg / numIterations);
  log(" ");
}

// iterateCollision();
