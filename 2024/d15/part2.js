const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

let [grid, instructions] = [
  input
    .split("\n\n")[0]
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replace("@", "@.")
    .split("\n")
    .map((l) => l.split("")),
  input.split("\n\n")[1].split("\n").join(""),
];

let directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
  v: [1, 0],
};

let y;
let x;
for (let _y = 0; _y < grid.length; ++_y)
  for (let _x = 0; _x < grid[0].length; ++_x)
    if (grid[_y][_x] === "@") {
      y = _y;
      x = _x;
    }

function keyGen(y, x) {
  return `${y}-${x}`;
}

let seen = new Set();

function lookAhead(y, x, dir) {
  let halfA = grid[y][x];
  let halfBX = x + (halfA === "]" ? -1 : +1);

  seen.add(keyGen(y, x));
  seen.add(keyGen(y, halfBX));

  let upA = grid[y + dir][x];
  let upB = grid[y + dir][halfBX];

  if (upA === "." && upB === ".") {
    seen.add(keyGen(y + dir, x));
    seen.add(keyGen(y + dir, halfBX));
    return true;
  }
  if (upA === "#" || upB === "#") return false;

  if (upA === ".") {
    seen.add(keyGen(y + dir, x));

    return lookAhead(y + dir, halfBX, dir);
  }

  if (upB === ".") {
    seen.add(keyGen(y + dir, halfBX));
    return lookAhead(y + dir, x, dir);
  }

  return lookAhead(y + dir, x, dir) && lookAhead(y + dir, halfBX, dir);
}

for (let i of instructions) {
  let [dy, dx] = directions[i];
  let ny = y + dy;
  let nx = x + dx;

  let next = grid[ny][nx];

  if (next === ".") {
    grid[y][x] = ".";
    grid[ny][nx] = "@";
    y = ny;
    x = nx;
    continue;
  }

  if (next === "#") continue;

  if (i === "<" || i === ">") {
    let fy = ny;
    let fx = nx;

    while (true) {
      fy += dy;
      fx += dx;
      let following = grid[fy][fx];

      if (following === "[" || following === "]") continue;
      if (following === "#") break;

      let slice = grid[y].slice(Math.min(x, fx - dx), Math.max(x, fx - dx) + 1);
      if (i === "<") slice.push(".");
      else slice.unshift(".");

      grid[y].splice(Math.min(x, fx), slice.length, ...slice);
      y = ny;
      x = nx;
      break;
    }
  }

  if ((i === "^" || i === "v") && lookAhead(ny, nx, dy)) {
    let points = Array.from(seen).sort((a, b) => {
      let [yA] = a.split("-").map(Number);
      let [yB] = b.split("-").map(Number);

      return dy * (yB - yA);
    });

    for (let point of points) {
      let [y, x] = point.split("-").map(Number);

      let isNextInSeen = seen.has(keyGen(y - dy, x));

      grid[y][x] = isNextInSeen ? grid[y - dy][x] : ".";
    }

    grid[ny][nx] = "@";
    grid[y][x] = ".";
    y = ny;
    x = nx;
  }
  seen.clear();
}

let sum = grid
  .flatMap((x) => x)
  .reduce((a, v, i) => (v === "[" ? a + i : a), 0);

console.log(sum);
console.timeEnd("part2");
