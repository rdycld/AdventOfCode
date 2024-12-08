const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split("\n").map((l) => l.split(""));

const antennas = {};
const antinodes = new Set();

for (let y = 0; y < data.length; ++y) {
  for (let x = 0; x < data[0].length; ++x) {
    let point = data[y][x];

    if (point === ".") continue;

    if (point in antennas) {
      for (const [pY, pX] of antennas[point]) {
        let dy = (pY - y);
        let dx = (pX - x);

        antinodes.add([y-dy,x-dx])
        antinodes.add([pY+dy,pX+dx])
      }

      antennas[point].push([y, x]);
    } else {
      antennas[point] = [[y, x]];
    }
  }
}

const p1 = new Set([...antinodes]
  .filter(([y, x]) => y >= 0 && y < data.length && x >= 0 && x < data[0].length)
  .map((x) => x.toString()))

console.log(p1.size);
