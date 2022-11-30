"use strict";

const log = console.log;
const now = () => performance.now();
const qs = (s) => document.querySelector(s);
const newEl = (s) => document.createElement(s);

const _console = qs("#console");

const print = function () {
  let argsString = "";
  for (let i = 0; i < arguments.length; i++) {
    argsString += arguments[i] + " ";
  }
  log(argsString);

  const div = newEl("div");
  for (let i = 0; i < arguments.length; i++) {
    const span = newEl("span");
    span.innerText = arguments[i] + " ";
    div.appendChild(span);
    log(arguments[i]);
  }
  _console.appendChild(div);
};
