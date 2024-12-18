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
let min = Infinity;

pq.add(start, 0);

while (pq.length) {
  let tile = pq.pop();
  const [y, x, dy, dx, turns, lSeen] = tile;

  seen.add(getSeenKey(y, x, dy, dx));
  lSeen.add(getLocalSeenKey(y, x));

  if(turns *1000 + lSeen.size > min)break

  if (y === e[0] && x === e[1]) {
    answ.push(tile);
    min = turns * 1000 + lSeen.size;
  }

  for (let [ndy, ndx] of directions) {
    if (seen.has(getSeenKey(y + ndy, x + ndx, ndy, ndx))) continue;
    if (ndy === -dy && ndx === -dx) continue;
    if (maze[y + ndy][x + ndx] === "#") continue;
    if (ndy === dy && ndx === dx) {
      let next = [y + dy, x + dx, dy, dx, turns, new Set(lSeen)];
      pq.add(next, 1000 * turns + lSeen.size + 1);
      continue;
    }

    let next = [y + ndy, x + ndx, ndy, ndx, turns + 1, new Set(lSeen)];
    pq.add(next, 1000 * turns + 1000 + lSeen.size);
    continue;
  }
}

let p2 = answ
  .map((l) =>  l[5]);


let a = new Set();

for (let i = 0; i < p2.length; ++i) {
  let visited = p2[i];

    a = a.union(visited);
}

console.log(a.size);


console.timeEnd("part2");
