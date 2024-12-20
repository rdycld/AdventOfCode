const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const racetrack = input.split("\n").map((l) => l.split(""));
const directions = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

let s;
let e;
for (let y = 0; y < racetrack.length; ++y)
  for (let x = 0; x < racetrack[0].length; ++x)
    if (racetrack[y][x] === "S") s = [y, x, [[y,x]]];
    else if (racetrack[y][x] === "E") e = [y, x];

let q = [];

q.push(s);

let seen = new Set();
const seenKey = (y, x) => `${y}-${x}`;
let fullPath;

while (q.length) {
  let path = q.shift();
  const [y, x, visited] = path;

  if (y === e[0] && x === e[1]) {
    fullPath = visited;
    break;
  }

  for (let [ndy, ndx] of directions) {
    if (seen.has(seenKey(y + ndy, x + ndx))) continue;
    if (0 > y + ndy || y + ndy === racetrack.length) continue;
    if (0 > x + ndx || x + ndx === racetrack[0].length) continue;
    if (racetrack[y + ndy][x + ndx] === "#") continue;

    seen.add(seenKey(y + ndy, x + ndx));
    q.push([y + ndy, x + ndx, [...visited, [y + ndy, x + ndx]]]);
  }
}

let shortcuts = {};

for (let i = 0; i < fullPath.length; ++i) {
  for (let j = i + 1; j < fullPath.length; ++j) {
    const [ay, ax] = fullPath[i];
    const [by, bx] = fullPath[j];

    const dy = Math.abs(ay - by);
    const dx = Math.abs(ax - bx);
    const di = j - i;

    if (dy + dx > 20) continue;
    if (dy + dx > di) continue;

    shortcuts[`${ay},${ax}-${by},${bx}`] = di - (dy + dx);
  }
}
console.log(">=100", Object.values(shortcuts).filter((v) => v >= 100).length);
console.timeEnd("part2");
