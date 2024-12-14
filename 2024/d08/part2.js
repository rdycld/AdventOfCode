const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

function inBound(y, x, tab) {
  return y >= 0 && y < tab.length && x >= 0 && x < tab[0].length;
}

const data = input.split("\n").map((l) => l.split(""));

const antennas = {};
const antinodes = new Set();

for (let y = 0; y < data.length; ++y) {
  for (let x = 0; x < data[0].length; ++x) {
    let point = data[y][x];

    if (point === ".") continue;

    if (point in antennas) {
      for (const [py, px] of antennas[point]) {
        let dy = py - y;
        let dx = px - x;

        let vy = 0;
        let vx = 0;

        let outOfBoundariesA = false;
        let outOfBoundariesB = false;
        while (true) {
          if (inBound(py + vy, px + vx, data))
            antinodes.add([py + vy, px + vx]);
          else outOfBoundariesA = true;

          if (inBound(y - vy, x - vx, data)) antinodes.add([y - vy, x - vx]);
          else outOfBoundariesB = true;

          if (outOfBoundariesA && outOfBoundariesB) break;
          vy += dy;
          vx += dx;
        }
      }

      antennas[point].push([y, x]);
    } else {
      antennas[point] = [[y, x]];
    }
  }
}

const p2 = new Set(
  [...antinodes]
    .filter(([y, x]) => inBound(y, x, data))
    .map((x) => x.toString())
);

console.log(p2.size);
