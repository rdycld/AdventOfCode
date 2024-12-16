const fs = require("fs");

const { PriorityQueue } = require("../utils/priorityQueue");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const maze = input.split("\n").map((l) => l.split(""));
const getLocalSeenKey = (y, x) => `${y}-${x}`;
const getSeenKey = (a, b, c, d) => `${a}-${b}-${c}-${d}`;

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

// .        y, x, dy, dx, turns, seen
let start = [...s, 0, 0, 0, new Set()];

const seen = new Set();

let pq = new PriorityQueue();

let answ = [];

pq.push(start, 0);

while (pq.length) {
  let tile = pq.pop();
  const [y, x, dy, dx, turns, lSeen] = tile;

  seen.add(getSeenKey(y, x, dy, dx));
  lSeen.add(getLocalSeenKey(y, x));

  if (y === e[0] && x === e[1]) {
    answ.push(tile);
  }

  for (let [ndy, ndx] of directions) {
    if (seen.has(getSeenKey(y + ndy, x + ndx, ndy, ndx))) continue;
    if (ndy === -dy && ndx === -dx) continue;
    if (maze[y + ndy][x + ndx] === "#") continue;
    if (ndy === dy && ndx === dx) {
      let next = [y + dy, x + dx, dy, dx, turns, new Set(lSeen)];
      pq.push(next, 1000 * turns + lSeen.size + 1);
      continue;
    }

    let next = [y + ndy, x + ndx, ndy, ndx, turns + 1, new Set(lSeen)];
    pq.push(next, 1000 * turns + 1000 + lSeen.size);
    continue;
  }
}

let p2 = answ
  .sort((a, b) => 1000 * a[4] + a[5] - (1000 * b[4] + b[5]))
  .map((l) => [1000 * l[4] + l[5].size + -1, l[5]]);

let lowCost = p2[0][0];

let a = new Set();

for (let i = 0; i < p2.length; ++i) {
  let [cost, visited] = p2[i];

  if (cost === lowCost) {
    a = a.union(visited);
  }
}

console.log(a.size);

// for (let s of a.values()) {
//   let [y, x] = s.split("-");

//   maze[y][x] = "0";
// }
// console.log(maze.map((l) => l.join("")).join("\n"));

console.timeEnd("part2");
