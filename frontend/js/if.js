"use strict";

function checkWithoutIf(id) {
  const obj = hash[id];
  return obj;
}

function checkWithIf(id) {
  const obj = hash[id];
  if (obj.randomFlag) return obj;
  else return null;
}

const checkIterations = 5;

qs("#checkWithoutIf").addEventListener("click", function () {
  const t0 = now();
  for (let c = 0; c < checkIterations; c++)
    for (let i = 1; i < idCount; i++) checkWithoutIf(i);

  const tz = now() - t0;
  print("Sin if demoró", tz.toFixed(3));
  print(" ");
});

qs("#checkWithIf").addEventListener("click", function () {
  const t0 = now();
  for (let c = 0; c < checkIterations; c++)
    for (let i = 1; i < idCount; i++) checkWithIf(i);

  const tz = now() - t0;
  print("Con if demoró", tz.toFixed(3));
  print(" ");
});
