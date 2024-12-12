const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const garden = input.split("\n").map((l) => l.split(""));

let cardinalDirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let diagonalDirs = [
  [-1, -1], //up left
  [1, 1], // down right
  [1, -1], // down left
  [-1, 1], // up right
];

/**
 * convex corners
 *
 * up, right are different
 * up, left are different
 * down, right are different
 * down, left are different
 */

/**
 * concave coreners
 *
 * up, right are the same ordinal up-right is different
 * up, left are the same ordinal up-left is different
 * down, left are the same, oridnal down-left is different
 * down, right are the same, ordinal down-right is different
 */

const regions = [];
const seen = new Set();

for (let y = 0; y < garden.length; ++y) {
  for (let x = 0; x < garden[0].length; ++x) {
    let plantKey = `${y}-${x}`;
    let plant = garden[y][x];

    if (seen.has(plantKey)) continue;
    seen.add(plantKey);

    let region = {
      plants: [],
      corners: 0,
      plant,
    };

    let queue = [[y, x]];

    while (queue.length) {
      let [y, x] = queue.pop();
      let key = `${y}-${x}`;
      if (region.plants.includes(key)) continue;

      seen.add(key);
      region.plants.push(key);

      let sameCardinal = {
        up: 0,
        right: 0,
        down: 0,
        left: 0,
      };

      let differentDiagonal = {
        upLeft: 0,
        downRight: 0,
        downLeft: 0,
        upRight: 0,
      };

      for (let [dy, dx] of cardinalDirs) {
        if (garden[y + dy]?.[x + dx] === plant) {
          if (dy === 1) sameCardinal.down = 1;
          if (dy === -1) sameCardinal.up = 1;
          if (dx === 1) sameCardinal.right = 1;
          if (dx === -1) sameCardinal.left = 1;

          if (!region.plants.includes(`${y + dy}-${x + dx}`))
            queue.push([y + dy, x + dx]);
        }
      }
      for (let [dy, dx] of diagonalDirs) {
        if (garden[y + dy]?.[x + dx] !== plant) {
          if (dy === -1 && dx === -1) differentDiagonal.upLeft = 1;
          if (dy === 1 && dx === 1) differentDiagonal.downRight = 1;
          if (dy === 1 && dx === -1) differentDiagonal.downLeft = 1;
          if (dy === -1 && dx === 1) differentDiagonal.upRight = 1;
        }
      }

      if(sameCardinal.up === 0 && sameCardinal.right === 0)region.corners+=1;
      if(sameCardinal.up === 0 && sameCardinal.left === 0)region.corners+=1;
      if(sameCardinal.down === 0 && sameCardinal.left === 0)region.corners+=1;
      if(sameCardinal.down === 0 && sameCardinal.right === 0)region.corners+=1;

      if(sameCardinal.up === 1 && sameCardinal.right === 1 && differentDiagonal.upRight ===1) region.corners +=1;
      if(sameCardinal.up === 1 && sameCardinal.left === 1 && differentDiagonal.upLeft ===1) region.corners +=1;
      if(sameCardinal.down === 1 && sameCardinal.left === 1 && differentDiagonal.downLeft ===1) region.corners +=1;
      if(sameCardinal.down === 1 && sameCardinal.right === 1 && differentDiagonal.downRight ===1) region.corners +=1;
    }
    regions.push(region);
  }
}

console.log(
  "part:2",
  regions.reduce((acc, val) => {
    return acc + val.plants.length * val.corners;
  }, 0)
);

console.timeEnd("part2");
