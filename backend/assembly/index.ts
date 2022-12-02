// The entry file of your WebAssembly module.

export function preloadArr(len: i32): i16[] {
  return new Array<i16>(len);
}

export function checkCollisionAsm(arr: i16[], idCount: i16, ids: i16[]): i16[] {
  const a: i16 = 0;
  const collisions: i16[] = [];
  const offsetA: i16 = 6 * a;
  const x: i16 = arr[offsetA];
  const y: i16 = arr[offsetA + 1];
  const xZ: i16 = arr[offsetA + 2];
  const yZ: i16 = arr[offsetA + 3];
  for (let b = 1; b < idCount; b++) {
    const offsetB: i32 = 6 * b;
    if (
      xZ > arr[offsetB] &&
      x < arr[offsetB + 2] &&
      yZ > arr[offsetB + 1] &&
      y < arr[offsetB + 3]
      ) {
      collisions.push(ids[b]);
    }
  }
  return collisions;
}