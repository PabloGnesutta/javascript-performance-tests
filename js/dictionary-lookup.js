"use strict";

qs("#iterateDictionaryLookup").addEventListener(
  "click",
  function doIterateDictionaryLookup() {
    iterateDictionaryLookup();
  }
);

var objsArrLookupAgg = 0;
var idsArrLookupAgg = 0;
var buffIdsArrLookupAgg = 0;
var hashLookupAgg = 0;

function lookupObjsArray(_id) {
  const t0 = now();
  {
    // much faster:
    for (let i = 0; i < idCount; i++) {
      const obj = objs[i];
      if (obj.id === _id) {
        objsArrLookupAgg += now() - t0;
        return obj;
      }
    }
    log("obj not found");
    return null;
  }
  // {
  //   const obj = objs.find((o) => o.id === _id);
  //   const tz = now() - t0;
  //   objsArrLookupAgg += now() - t0;
  //   return obj;
  // }
}

function lookupIdsArray(_id) {
  t0 = now();
  for (let i = 0; i < idCount; i++) {
    const id = ids[i];
    if (id === _id) {
      const obj = objs[i];
      idsArrLookupAgg += now() - t0;
      return obj;
    }
  }
  console.warn("idx not found");
  return null;
}

function lookupArrayBuffer(_id) {
  t0 = now();
  for (let i = 0; i < idCount; i++) {
    const id = idsBuff[i];
    if (id === _id) {
      const obj = objs[i];
      buffIdsArrLookupAgg += now() - t0;
      return obj;
    }
  }
  console.warn("idx not found");
  return null;
}

function lookupHash(_id) {
  const t0 = now();
  const obj = hash[_id];
  hashLookupAgg += now() - t0;
  return obj;
}

function iterateDictionaryLookup() {
  const t0 = now();
  log(" ");
  log(" perform", numIterations, "iterations with", idCount, "objects");
  objsArrLookupAgg = 0;
  idsArrLookupAgg = 0;
  buffIdsArrLookupAgg = 0;
  hashLookupAgg = 0;

  for (var i = 0; i < numIterations; i++) {
    const id = Math.floor(Math.random() * idCount) + 1;
    log(`${i + 1}/${numIterations}`, "id:", id);
    lookupObjsArray(id);
    lookupIdsArray(id);
    lookupArrayBuffer(id);
    lookupHash(id);
  }

  const objAvg = objsArrLookupAgg / numIterations;
  const idxAvg = idsArrLookupAgg / numIterations;
  const buffIdxAvg = buffIdsArrLookupAgg / numIterations;
  const hashAvg = hashLookupAgg / numIterations;
  log(" iteration finished, dictionary lookup results:");
  log("  - obj avg/total", objAvg, objsArrLookupAgg);
  log("  - idx avg/total", idxAvg, idsArrLookupAgg);
  log("  - buff idx avg/total", buffIdxAvg, buffIdsArrLookupAgg);
  log("  - hash avg/total", hashAvg, hashLookupAgg);
  log("   - Time elapsed ", now() - t0);
}
