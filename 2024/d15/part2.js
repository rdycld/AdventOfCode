const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./smolExample.txt", { encoding: "utf8" });

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

console.log(grid.map((l) => l.join("")).join("\n"));

let seen = new Set();

function lookUp(y, x) {
  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let topA = grid[y - 1][x];
  let topB = grid[y - 1][bx];

  seen.add(`${y}-${x}`);
  seen.add(`${y}-${bx}`);

  if (topA === "#" || topB === "#") return false;
  if (topA === "." && topB === ".") {
    seen.add(`${y - 1}-${x}`);
    seen.add(`${y - 1}-${bx}`);
    return true;
  }


  if (topA === ".") {
    seen.add(`${y - 1}-${x}`);
    return lookUp(y - 1, bx);
  }
  if (topB === ".") {
    seen.add(`${y - 1}-${bx}`);
    return lookUp(y - 1, x);
  }

  return lookUp(y - 1, bx) && lookUp(y - 1, x);
}

let directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
  v: [1, 0],
};

function lookDown(y, x) {
  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let topA = grid[y + 1][x];
  let topB = grid[y + 1][bx];

  seen.add(`${y}-${x}`);
  seen.add(`${y}-${bx}`);

  if (topA === "#" || topB === "#") return false;
  if (topA === "." && topB === ".") {
    seen.add(`${y + 1}-${x}`);
    seen.add(`${y + 1}-${bx}`);
    return true;
  }

  if (topA === ".") {
    seen.add(`${y + 1}-${x}`);
    return lookDown(y + 1, bx);
  }
  if (topB === ".") {
    seen.add(`${y + 1}-${bx}`);
    return lookDown(y + 1, x);
  }

  return lookDown(y + 1, bx) && lookDown(y + 1, x);
}

let position;
for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "@") position = [y, x];

let screens = [];

for (let i = 0; i < instructions.length; ++i) {
  let [y, x] = position;
  let instruction = instructions[i];
  let [dy, dx] = directions[instruction];

  let [ny, nx] = [y + dy, x + dx];

  mainLookAhead: while (true) {
    let next = grid[ny][nx];

    if (next === ".") {
      grid[y][x] = ".";
      grid[ny][nx] = "@";
      position = [ny, nx];
      break;
    }

    if (next === "#") break;

    if (instruction === "<" || instruction === ">") {
      let fy = ny;
      let fx = nx;

      while (true) {
        fy += dy;
        fx += dx;
        let following = grid[fy][fx];

        if (following === "[" || following === "]") continue;
        if (following === "#") break mainLookAhead;

        let slice = grid[y].slice(
          Math.min(x, fx - dx),
          Math.max(x, fx - dx) + 1
        );
        if (instruction === "<") slice.push(".");
        else slice.unshift(".");

        grid[y].splice(Math.min(x, fx), slice.length, ...slice);
        position = [ny, nx];
        break mainLookAhead;
      }
    }

    if (instruction === "^") {
      if (lookUp(y - 1, x)) {
        const points = {};

        for (let dup of seen.values()) {
          let [y, x] = dup.split("-");
          if (points[x]) {
            points[+x].push([+y, +x]);
          } else {
            points[+x] = [[+y, +x]];
          }
        }

        for (let v of Object.values(points)) {
          let sorted = v.toSorted((a, b) => a[0] - b[0]);

          for (let i = 0; i < sorted.length - 1; ++i) {
            let [y, x] = sorted[i];
            grid[y][x] = grid[y + 1][x];
          }

          let [ly, lx] = sorted[sorted.length - 1];
          grid[ly][lx] = ".";
        }
        grid[ny][nx] = "@";
        position = [ny, nx];
        grid[y][x] = ".";
      }
      seen = new Set();

      break mainLookAhead;
    }

    if (instruction === "v") {
      if (lookDown(y + 1, x)) {
        const points = {};

        for (let dup of seen.values()) {
          let [y, x] = dup.split("-");
          if (points[x]) {
            points[+x].push([+y, +x]);
          } else {
            points[+x] = [[+y, +x]];
          }
        }

        for (let v of Object.values(points)) {
          let sorted = v.toSorted((a, b) => b[0] - a[0]);

          for (let i = 0; i < sorted.length - 1; ++i) {
            let [y, x] = sorted[i];
            grid[y][x] = grid[y - 1][x];
          }

          let [ly, lx] = sorted[sorted.length - 1];
          grid[ly][lx] = ".";
        }
        seen = new Set();
        grid[ny][nx] = "@";
        grid[y][x] = ".";
        position = [ny, nx];
      }
      seen.clear();

      break mainLookAhead;
    }
  }

  screens.push(grid.map((l) => l.join("")).join("\n"));
}

let sum = 0;

for (let i = 0; i < screens.length; ++i) {
  setTimeout(() => {
    console.clear();
    console.log(screens[i]);
  }, i * 100);
}

for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "[") sum += 100 * y + x;

console.log(sum);
console.timeEnd("part1");
