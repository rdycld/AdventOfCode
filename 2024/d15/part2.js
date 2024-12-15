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
  // Check if we've already visited this cell in the current recursion
  if (seen.has(`${y}-${x}`)) {
    return false; // We've hit a previously visited cell, avoid infinite loop
  }

  seen.add(`${y}-${x}`);

  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let topA = grid[y - 1][x];
  let topB = grid[y - 1][bx];

  if (topA === "#" || topB === "#") return false;
  if (topA === "." && topB === ".") {
    seen.add(`${y - 1}-${x}`);
    seen.add(`${y - 1}-${bx}`);
    return true;
  }

  if (topA === "." && topB !== ".") {
    seen.add(`${y - 1}-${x}`);
    return lookUp(y - 1, bx);
  }
  if (topB === "." && topA !== ".") {
    seen.add(`${y - 1}-${bx}`);
    return lookUp(y - 1, x);
  }

  // If both topA and topB are parts of boxes, we need to push them both
  return lookUp(y - 1, bx) && lookUp(y - 1, x);
}

function lookDown(y, x) {
  // Check if we've already visited this cell in the current recursion
  if (seen.has(`${y}-${x}`)) {
    return false; // We've hit a previously visited cell, avoid infinite loop
  }

  seen.add(`${y}-${x}`);

  let a = grid[y][x];
  let bx = a === "[" ? x + 1 : x - 1;

  let bottomA = grid[y + 1][x];
  let bottomB = grid[y + 1][bx];

  if (bottomA === "#" || bottomB === "#") return false;
  if (bottomA === "." && bottomB === ".") {
    seen.add(`${y + 1}-${x}`);
    seen.add(`${y + 1}-${bx}`);
    return true;
  }

  if (bottomA === "." && bottomB !== ".") {
    seen.add(`${y + 1}-${x}`);
    return lookDown(y + 1, bx);
  }
  if (bottomB === "." && bottomA !== ".") {
    seen.add(`${y + 1}-${bx}`);
    return lookDown(y + 1, x);
  }

  // If both bottomA and bottomB are boxes, push both down
  return lookDown(y + 1, bx) && lookDown(y + 1, x);
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
      // Horizontal pushing logic (not fully rewritten, but should at least handle no infinite loops)
      let fy = ny;
      let fx = nx;
      let boxCells = [];
      // Collect all box cells until we find '.' or '#'
      while (true) {
        fy += dy;
        fx += dx;
        let following = grid[fy][fx];
        if (following === "#") break mainLookAhead;
        if (following === ".") {
          // We found a spot to push into. Shift all boxes one step horizontally.
          // This is a simplified approach: move each collected box cell one step in direction
          for (let [by, bx] of boxCells) {
            grid[by + dy][bx + dx] = grid[by][bx]; // Move box part forward
            grid[by][bx] = "."; // Old spot now empty
          }
          // Move robot
          grid[y][x] = ".";
          grid[ny][nx] = "@";
          position = [ny, nx];
          break mainLookAhead;
        }
        if (following === "[" || following === "]") {
          boxCells.push([fy, fx]);
          continue;
        }
        // If something unexpected, break
        break mainLookAhead;
      }
    }

    if (instruction === "^") {
      if (lookUp(y - 1, x)) {
        const points = {};
        for (let dup of seen.values()) {
          let [Y, X] = dup.split("-");
          if (points[X]) {
            points[X].push([+Y, +X]);
          } else {
            points[X] = [[+Y, +X]];
          }
        }

        for (let v of Object.values(points)) {
          let sorted = v.sort((a, b) => a[0] - b[0]);
          for (let i = 0; i < sorted.length - 1; ++i) {
            let [Y, X] = sorted[i];
            grid[Y][X] = grid[Y + 1][X];
          }
          let [ly, lx] = sorted[sorted.length - 1];
          grid[ly][lx] = ".";
        }
        grid[ny][nx] = "@";
        position = [ny, nx];
        grid[y][x] = ".";
      }
      seen.clear();
      break mainLookAhead;
    }

    if (instruction === "v") {
      if (lookDown(y + 1, x)) {
        const points = {};

        for (let dup of seen.values()) {
          let [Y, X] = dup.split("-");
          if (points[X]) {
            points[X].push([+Y, +X]);
          } else {
            points[X] = [[+Y, +X]];
          }
        }

        for (let v of Object.values(points)) {
          let sorted = v.sort((a, b) => b[0] - a[0]);
          for (let i = 0; i < sorted.length - 1; ++i) {
            let [Y, X] = sorted[i];
            grid[Y][X] = grid[Y - 1][X];
          }

          let [ly, lx] = sorted[sorted.length - 1];
          grid[ly][lx] = ".";
        }

        seen.clear();
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
for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "[") sum += 100 * y + x;

console.log(sum);
console.timeEnd("part2");
