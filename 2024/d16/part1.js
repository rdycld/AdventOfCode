const fs = require("fs");

const { PriorityQueue } = require("../utils/priorityQueue");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const maze = input.split("\n").map((l) => l.split(""));
const directions = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

let s;
let e;
for (let y = 0; y < maze.length; ++y)
  for (let x = 0; x < maze[0].length; ++x)
    if (maze[y][x] === "S") s = [y, x];
    else if (maze[y][x] === "E") e = [y, x];

let start = [...s, 0, 0, 0, 0];

const seenKey = (y, x, dy, dx) => `${y}-${x}-${dy}-${dx}`;
const seen = new Set();

let pq = new PriorityQueue();

let answ;

pq.push(start, 0);

while (pq.length) {
  let path = pq.pop();
  const [y, x, dy, dx, turns, cost] = path;

  seen.add(seenKey(y, x, dy, dx));

  if (y === e[0] && x === e[1]) {
    answ = path;
    break;
  }

  for (let [ndy, ndx] of directions) {
    if (seen.has(seenKey(y + ndy, x + ndx, ndy, ndx))) continue;
    if (ndy === -dy && ndx === -dx) continue;
    if (maze[y + ndy][x + ndx] === "#") continue;
    if (ndy === dy && ndx === dx) {
      let next = [y + dy, x + dx, dy, dx, turns, cost + 1];
      pq.push(next, 1000 * turns + cost + 1);
      continue;
    }
    let next = [y + ndy, x + ndx, ndy, ndx, turns + 1, cost + 1];
    pq.push(next, 1000 + 1000 * turns + cost + 1);
  }
}

console.log(1000 * answ[4] + answ[5]);
console.timeEnd("part1");
