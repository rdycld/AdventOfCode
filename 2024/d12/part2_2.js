const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const garden = input.split("\n").map((l) => l.split(""));

let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
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
      plants: [],
      corners: 0,
      plant,
    };

    let queue = [[y, x]];

    while (queue.length) {
      let [_y, _x] = queue.pop();
      let key = `${_y}-${_x}`;
      if (region.plants.includes(key)) continue;

      starters.delete(key);
      region.plants.push(key);

      let n = false;
      let e = false;
      let s = false;
      let w = false;
      let nw = false;
      let se = false;
      let sw = false;
      let ne = false;

      for (let [dy, dx] of dirs) {
        if (garden[_y + dy]?.[_x + dx] === plant) {
          if (dy === -1 && dx === 0) n = true;
          if (dy === 0 && dx === 1) e = true;
          if (dy === 1 && dx === 0) s = true;
          if (dy === 0 && dx === -1) w = true;
          if (dy === -1 && dx === -1) nw = true;
          if (dy === 1 && dx === 1) se = true;
          if (dy === 1 && dx === -1) sw = true;
          if (dy === -1 && dx === 1) ne = true;

          if (
            !region.plants.includes(`${_y + dy}-${_x + dx}`) &&
            Math.abs(dy + dx) === 1
          )
            queue.push([_y + dy, _x + dx]);
        }
      }

      if (!n && !w) region.corners += 1;
      if (!n && !e) region.corners += 1;
      if (!s && !e) region.corners += 1;
      if (!s && !w) region.corners += 1;
      if (n && e && !ne) region.corners += 1;
      if (n && w && !nw) region.corners += 1;
      if (s && e && !se) region.corners += 1;
      if (s && w && !sw) region.corners += 1;
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
