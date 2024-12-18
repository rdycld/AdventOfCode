const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" }).split("\n");

let corruptedCount = 1024;
let size = 71;

const maze = Array.from({ length: size }, () => new Uint8Array(size));

for (let i = 0; i < corruptedCount; ++i) {
  if (!input[i]) break;

  let [x, y] = input[i].split(",");

  maze[y][x] = 1;
}

const directions = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

let e = [size - 1, size - 1];

let start = [0, 0, 0];

const seenKey = (y, x) => 100 * y + x;
const seen = new Set();

let q = [];

q.push(start);

while (q.length) {
  let path = q.shift();
  const [y, x, len] = path;

  if (y === e[0] && x === e[1]) {
    console.log(len);
    break;
  }

  for (let [ndy, ndx] of directions) {
    if (seen.has(seenKey(y + ndy, x + ndx))) continue;
    if (0 > y + ndy || y + ndy === maze.length) continue;
    if (0 > x + ndx || x + ndx === maze[0].length) continue;
    if (maze[y + ndy][x + ndx] === 1) continue;

    seen.add(seenKey(y + ndy, x + ndx));
    q.push([y + ndy, x + ndx, len + 1]);
  }
}

console.timeEnd("part1");
