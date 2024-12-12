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
const starters = new Set();

for (let y = 0; y < garden.length; ++y) {
  for (let x = 0; x < garden[0].length; ++x) {
    let plantKey = `${y}-${x}`;
    starters.add(plantKey);
  }
}

for (let y = 0; y < garden.length; ++y) {
  for (let x = 0; x < garden[0].length; ++x) {
    let plantKey = `${y}-${x}`;
    let plant = garden[y][x];

    if (!starters.has(plantKey)) continue;
    starters.delete(plantKey);

    let region = {
      perimeter: 0,
      plants: [],
      plant,
    };

    let queue = [[y, x]];

    while (queue.length) {
      let [_y, _x] = queue.pop();
      let key = `${_y}-${_x}`;
      if (region.plants.includes(key)) continue;

      starters.delete(key);
      region.plants.push(key);

      let sameAdujstentPlants = 0;

      for (let [dy, dx] of dirs) {
        if (garden[_y + dy]?.[_x + dx] === plant) {
          sameAdujstentPlants += 1;
          if (!region.plants.includes(`${_y + dy}-${_x + dx}`))
            queue.push([_y + dy, _x + dx]);
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