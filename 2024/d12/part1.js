const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const garden = input.split("\n").map((l) => l.split(""));

let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const regions = [];
const seen = new Set();

for (let y = 0; y < garden.length; ++y) {
  for (let x = 0; x < garden[0].length; ++x) {
    let plantKey = `${y}-${x}`;
    let plant = garden[y][x];

    if (seen.has(plantKey)) continue;
    seen.add(plantKey);

    let region = {
      perimeter: 0,
      plants: [],
      plant,
    };

    let queue = [[y, x]];

    while (queue.length) {
      let [y, x] = queue.pop();
      let key = `${y}-${x}`;
      if (region.plants.includes(key)) continue;

      seen.add(key);
      region.plants.push(key);

      let sameAdujstentPlants = 0;

      for (let [dy, dx] of dirs) {
        let ny = y + dy;
        let nx = x + dx;
        if (garden[ny]?.[nx] === plant) {
          sameAdujstentPlants += 1;
          if (!region.plants.includes(`${ny}-${nx}`)) queue.push([ny, nx]);
        }
      }
      region.perimeter += 4 - sameAdujstentPlants;
    }
    regions.push(region);
  }
}

console.log(
  "part:1",
  regions.reduce((acc, val) => {
    return acc + val.plants.length * val.perimeter;
  }, 0)
);

console.timeEnd("part1");
