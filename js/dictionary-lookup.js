qs("#lookupObjWlog").addEventListener("click", lookupObjWlog);
qs("#lookupIdxWLog").addEventListener("click", lookupIdxWLog);
qs("#lookupBuffIdxWLog").addEventListener("click", lookupBuffIdxWLog);
qs("#iterateDictionaryLookup").addEventListener(
  "click",
  function doIterateDictionaryLookup() {
    iterateDictionaryLookup();
  }
);

var objLookupAgg = 0;
var idxLookupAgg = 0;
var buffIdxLookupAgg = 0;

function lookupObj() {
  let rand = Math.floor(Math.random() * arrayId);
  // rand = arrayId;
  const t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const obj = objs[i];
    if (obj.id === rand) {
      const target = obj;
      const tz = performance.now() - t0;
      objLookupAgg += tz;
      return target;
    }
  }
  log("obj not found");
  return null;
}
function lookupIdx() {
  let rand = Math.floor(Math.random() * arrayId);
  // rand = arrayId;
  t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const id = ids[i];
    if (id === rand) {
      const target = objs[id];
      const tz = performance.now() - t0;
      idxLookupAgg += tz;
      return target;
    }
  }
  console.warn("idx not found");
  return null;
}
function lookupBuffIdx(log = false) {
  let rand = Math.floor(Math.random() * arrayId);
  // rand = arrayId;
  t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const id = idsBuff[i];
    if (id === rand) {
      const target = objs[id];
      const tz = performance.now() - t0;
      buffIdxLookupAgg += tz;
      return target;
    }
  }
  console.warn("idx not found");
  return null;
}

function lookupObjWlog() {
  const rand = Math.floor(Math.random() * arrayId);
  const t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const obj = objs[i];
    if (obj.id === rand) {
      const target = obj;
      const tz = performance.now() - t0;
      log("obj lookup took", tz);
      objLookupAgg += tz;
      return target;
    }
  }
  log("obj not found");
  return null;
}
function lookupIdxWLog() {
  const rand = Math.floor(Math.random() * arrayId);
  t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const id = ids[i];
    if (id === rand) {
      const target = objs[id];
      const tz = performance.now() - t0;
      log("index lookup took", tz);
      idxLookupAgg += tz;
      return target;
    }
  }
  console.warn("idx not found");
  return null;
}
function lookupBuffIdxWLog() {
  const rand = Math.floor(Math.random() * arrayId);
  t0 = performance.now();
  for (let i = 0; i < arrayId; i++) {
    const id = idsBuff[i];
    if (id === rand) {
      const target = objs[id];
      const tz = performance.now() - t0;
      log("buff index lookup took", tz);
      buffIdxLookupAgg += tz;
      return target;
    }
  }
  console.warn("buff idx not found");
  return null;
}

function iterateDictionaryLookup() {
  const t0 = performance.now();
  log(" ");
  log(" perform", numIterations, "iterations with", arrayId, "objects");
  objLookupAgg = 0;
  idxLookupAgg = 0;
  buffIdxLookupAgg = 0;

  for (var i = 0; i < numIterations; i++) {
    log(`${i + 1}/${numIterations}`);
    lookupObj();
    lookupIdx();
    lookupBuffIdx();
  }

  const objAvg = objLookupAgg / numIterations;
  const idxAvg = idxLookupAgg / numIterations;
  const buffIdxAvg = buffIdxLookupAgg / numIterations;
  const totalAvg = objAvg + idxAvg / 2;
  log(" iteration finished, dictionary lookup results:");
  log("  - obj avg", objAvg);
  log("  - idx avg", idxAvg);
  log("  - buff idx avg", buffIdxAvg);
  log("   - Time elapsed ", performance.now() - t0);
}
