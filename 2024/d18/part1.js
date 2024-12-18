const fs = require("fs");
import { Queue } from "../utils/queue";
import { PriorityQueue } from "../utils/priorityQueue";

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" }).split("\n");

let corruptedCount = 1024;
let size = 71;

const maze = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => ".")
);

for (let i = 0; i < corruptedCount; ++i) {
  if (!input[i]) break;

  let [x, y] = input[i].split(",");

  if (i + 1 === corruptedCount) {
    console.log(input[i]);
  }

  maze[y][x] = "#";
}
console.log(maze.map((l) => l.join("")).join("\n"));

const directions = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

let e = [size - 1, size - 1];

let start = [0, 0, 0];

const seenKey = (y, x) => `${y}-${x}`;
const seen = new Set();

let q = new Queue();

let answ = [];

q.add(start);

while (q.length) {
  let path = q.pop();
  if (!path) {
    console.log("dupa");
    break;
  }
  const [y, x, len] = path;

  if (y === e[0] && x === e[1]) {
    console.log(y, x, len);
    break;
  }

  seen.add(seenKey(y, x));
  for (let [ndy, ndx] of directions) {
    if (seen.has(seenKey(y + ndy, x + ndx))) continue;
    if (0 > y + ndy || y + ndy >= maze.length) continue;
    if (0 > x + ndx || x + ndx >= maze[0].length) continue;
    if (maze[y + ndy][x + ndx] === "#") continue;

    seen.add(seenKey(y + ndy, x + ndx));
    let next = [y + ndy, x + ndx, len + 1];
    q.add(next);
  }
}

console.log(answ);

console.timeEnd("part1");
