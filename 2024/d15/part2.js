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

let dupa = new Set()
function lookUp(y, x) {
  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let topA = grid[y - 1][x];
  let topB = grid[y - 1][bx];

  dupa.add(`${y}-${x}`)
  dupa.add(`${y}-${bx}`)

  if (topA === "#" || topB === "#") return false;
  if (topA === "." && topB === ".") return true;

  if (topA === ".") return lookUp(y - 1, bx);
  if (topB === ".") return lookUp(y - 1, x);

  return lookUp(y - 1, bx) && lookUp(y - 1, x);
}

let seen = new Set();

function replaceUpWith(y, x, replaceWith, init = false) {
  let val = grid[y][x];
  let bx = val === "[" ? x + 1 : x - 1;
  let bVal = grid[y][bx];

  console.log(y,x,replaceWith,init, seen.has(`${y}-${x}`))

  if (val !== "." && init) {
    replaceUpWith(y, bx, bVal);
  }

  if (seen.has(`${y}-${x}`)) return;
  seen.add(`${y}-${x}`);

  if (val !== ".") replaceUpWith(y - 1, x, val, true);

  grid[y][x]= replaceWith 

}

function lookDown(y, x) {
  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let topA = grid[y + 1][x];
  let topB = grid[y + 1][bx];

  if (topA === "#" || topB === "#") return false;
  if (topA === "." && topB === ".") return true;

  if (topA === ".") return lookDown(y + 1, bx);
  if (topB === ".") return lookDown(y + 1, x);

  return lookDown(y + 1, bx) && lookDown(y + 1, x);
}

function replaceDownWith(y, x, z = ".", end = false) {
  if (end) return;

  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;
  let b = grid[y][bx];

  let topA = grid[y + 1][x];
  let topB = grid[y + 1][bx];

  replaceDownWith(y + 1, x, topA, topA === ".");
  replaceDownWith(y + 1, bx, topB, topB === ".");
  grid[y + 1][x] = a;
  grid[y + 1][bx] = b;
  grid[y][x] = z;
  grid[y][bx] = ".";
}

let directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
  v: [1, 0],
};

let position;
for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "@") position = [y, x];

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
      if (lookUp(y, x)) {
        console.log(dupa)
        replaceUpWith(ny, nx, "@", true);
        grid[y][x] = ".";
        console.log(...seen.values());
        seen = new Set();
        position = [ny, nx];
      }

      break mainLookAhead;
    }

    if (instruction === "v") {
      if (lookDown(y, x)) {
        replaceDownWith(ny, nx);
        grid[ny][nx] = "@";
        grid[y][x] = ".";
        position = [ny, nx];
      }

      break mainLookAhead;
    }
  }

  console.log(instruction);
  console.log(grid.map((l) => l.join("")).join("\n"));
  console.log("\n");
}

let sum = 0;

for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "O") sum += 100 * y + x;

console.log(sum);
console.timeEnd("part1");
