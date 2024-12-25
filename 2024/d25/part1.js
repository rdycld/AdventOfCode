const fs = require("fs");

const { transpose } = require("../utils/matrix");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
let locks = [];
let keys = [];

for (let part of input.split("\n\n")) {
  let isLock = part[0] === "#";

  let grid = transpose(part.split("\n").map((l) => l.split("")));
  let v = [];

  for (let col of grid) {
    if (isLock) v.push(col.lastIndexOf("#"));
    else v.push(col.indexOf("#"));
  }
  if (isLock) locks.push(v);
  else {
    keys.push(v);
  }
}

let counter = 0;

for (let lock of locks)
  for (let key of keys) counter += key.every((v, i) => v > lock[i]);

console.log(counter);
console.timeEnd("part2");
