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

const withOutIfBtn = qs("#checkWithoutIf");
withOutIfBtn.addEventListener("click", function () {
  withOutIfBtn.classList.add("active");
  setTimeout(() => {
    const t0 = now();
    for (let c = 0; c < checkIterations; c++)
      for (let i = 1; i < idCount; i++) checkWithoutIf(i);

    const tz = now() - t0;
    print("Sin if demoró", tz.toFixed(3));
    print(" ");
    withOutIfBtn.classList.remove("active");
  }, 0);
});

const withIfBtn = qs("#checkWithIf");
withIfBtn.addEventListener("click", function () {
  withIfBtn.classList.add("active");
  setTimeout(() => {
    const t0 = now();
    for (let c = 0; c < checkIterations; c++)
      for (let i = 1; i < idCount; i++) checkWithIf(i);

    const tz = now() - t0;
    print("Con if demoró", tz.toFixed(3));
    print(" ");
    withIfBtn.classList.remove("active");
  }, 10);
});
