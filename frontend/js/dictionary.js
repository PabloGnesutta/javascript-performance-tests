"use strict";

const dictBtn1 = qs("#iterateDictionaryLookup");
dictBtn1.addEventListener("click", iterateDictionaryLookup);

var objsArrLookupAgg = 0;
var idsArrLookupAgg = 0;
var buffIdsArrLookupAgg = 0;
var hashLookupAgg = 0;

function lookupObjsArray(_id) {
  const t0 = now();
  // {
  //   const obj = objs.find((o) => o.id === _id);
  //   objsArrLookupAgg += now() - t0;
  //   return obj;
  // }
  {
    // más rápido que objs.find():
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
}

function lookupIdsArray(_id) {
  const t0 = now();
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

// function lookupArrayBuffer(_id) {
//   const t0 = now();
//   for (let i = 0; i < idCount; i++) {
//     const id = idsBuff[i];
//     if (id === _id) {
//       const obj = objs[i];
//       buffIdsArrLookupAgg += now() - t0;
//       return obj;
//     }
//   }
//   console.warn("idx not found");
//   return null;
// }

function lookupHash(_id) {
  const t0 = now();
  const obj = hash[_id];
  hashLookupAgg += now() - t0;
  return obj;
}

function iterateDictionaryLookup() {
  dictBtn1.classList.add("active");
  setTimeout(() => {
    const t0 = now();
    log(" ");
    log(" ", numIterations, "iteraciones con", idCount, "objetos");
    objsArrLookupAgg = 0;
    idsArrLookupAgg = 0;
    buffIdsArrLookupAgg = 0;
    hashLookupAgg = 0;

    for (var i = 0; i < numIterations; i++) {
      const id = Math.floor(Math.random() * idCount) + 1;
      log(`${i + 1}/${numIterations}`, "id", id);
      lookupObjsArray(id);
      lookupIdsArray(id);
      // lookupArrayBuffer(id);
      lookupHash(id);
    }

    const objAvg = (objsArrLookupAgg / numIterations).toFixed(3);
    const idxAvg = (idsArrLookupAgg / numIterations).toFixed(3);
    // const buffIdxAvg = (buffIdsArrLookupAgg / numIterations).toFixed(3);
    const hashAvg = (hashLookupAgg / numIterations).toFixed(3);
    print("resultado diccionario:");
    print(numIterations, "iteraciones");
    print(idCount, "objetos");
    print(" - obj avg", objAvg);
    print(" - idx avg", idxAvg);
    print(" - hash avg", hashAvg);
    log("  - demoró ", now() - t0);
    print(" ");
    dictBtn1.classList.remove("active");
  }, 0);
}
