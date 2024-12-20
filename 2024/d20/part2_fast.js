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
    if (racetrack[y][x] === "S") s = [y, x];
    else if (racetrack[y][x] === "E") e = [y, x];

let q = [];

q.push(s);

let seen = new Set();
const seenKey = (y, x) => 1000 * y + x;
let fullPath = [];

let shortcuts = 0;

while (true) {
  const [y, x] = q.pop();

  if (y === e[0] && x === e[1]) {
    break;
  }

  for (let [ndy, ndx] of directions) {
    if (racetrack[y + ndy][x + ndx] === "#") continue;
    if (seen.has(seenKey(y + ndy, x + ndx))) continue;

    seen.add(seenKey(y + ndy, x + ndx));
    fullPath.push([y + ndy, x + ndx]);
    q.push([y + ndy, x + ndx]);

    for (let i = 0; i < fullPath.length - 100; ++i) {
      const [ay, ax] = fullPath[i];

      const dy = Math.abs(ay - (y + ndy));
      const dx = Math.abs(ax - (x + ndx));

      if (dy + dx > 20) continue;

      const di = -i + (fullPath.length - 1);

      if (dy + dx >= di) continue;

      if (di - (dy + dx) >= 100) shortcuts += 1;
    }
  }
}

console.log(shortcuts);
console.timeEnd("part2");
