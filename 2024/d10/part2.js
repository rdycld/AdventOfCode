const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

console.time("part2");
const data = input.split("\n").map((l) => l.split("").map(Number));

function inBounds(y, x) {
  return 0 <= y && y < data.length && 0 <= x && x < data[0].length;
}

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function checkAround(y, x, v) {
  let valid = [];

  for (let [dy, dx] of dirs) {
    let ny = y + dy;
    let nx = x + dx;

    if (!inBounds(ny, nx)) continue;

    if (data[ny][nx] === v + 1) {
      valid.push([ny, nx]);
    }
  }

  return valid;
}

const queue = [];

data.forEach((ly, y) =>
  ly.forEach((lx, x) => {
    if (lx === 0) queue.push([y, x]);
  })
);

let paths = 0;

while (queue.length) {
  let [y, x] = queue.pop();

  let v = data[y][x];

  if (v === 9) {
    paths += 1;
    continue;
  }

  queue.push(...checkAround(y, x, v));
}

console.log(paths);
console.timeEnd("part2");
