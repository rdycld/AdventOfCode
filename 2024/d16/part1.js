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

let start = [...s, 0, 0, 0];

const seenKey = (y, x, dy, dx) => `${y}-${x}-${dy}-${dx}`;
const seen = new Set();

let pq = new PriorityQueue();

let answ;

pq.push(start, 0);

while (pq.length) {
  let path = pq.pop();
  const [y, x, dy, dx, cost] = path;

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
      let next = [y + dy, x + dx, dy, dx, cost + 1];
      pq.push(next, cost + 1);
      continue;
    }
    let next = [y + ndy, x + ndx, ndy, ndx, cost + 1001];
    pq.push(next, cost + 1001);
  }
}

console.log(answ[4]);
console.timeEnd("part1");
