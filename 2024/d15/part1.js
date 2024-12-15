const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

let [grid, instructions] = [
  input
    .split("\n\n")[0]
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

let position;
for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "@") position = [y, x];


for (let i = 0; i < instructions.length; ++i) {
  let [y,x]= position
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

    let fy = ny;
    let fx = nx;
    while (true) {
      fy += dy;
      fx += dx;
      let following = grid[fy][fx];

      if (following === "O") continue;
      if (following === "#") break mainLookAhead;

      grid[fy][fx] = "O";
      grid[ny][nx] = "@";
      grid[y][x]='.'
      position = [ny,nx];
      break mainLookAhead;
    }
  }

  // console.log(instruction)
  // console.log(grid.map(l => l.join('')).join('\n'))
  // console.log('\n')
}


let sum = 0;

for (let y = 0; y < grid.length; ++y)
  for (let x = 0; x < grid[0].length; ++x)
    if (grid[y][x] === "O") sum+= 100*y+x

console.log(sum)
console.timeEnd("part1");
