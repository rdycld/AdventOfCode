const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const robots = input.split("\n").map((robot) => {
  let [sx, sy, vx, vy] = robot
    .split(/,|=|[a-z]+/)
    .filter(Boolean)
    .map(Number);

  return {
    sx,
    sy,
    vx,
    vy,
  };
});


let height = 103;
let width = 101;
let t = 100;


  let topRight = 0;
  let topLeft = 0;
  let botRight = 0;
  let botLeft = 0;
  for (let r of robots) {
    let x = (r.sx + t * r.vx) % width;
    let y = (r.sy + t * r.vy) % height;

    let _x = x < 0 ? width + x : x;
    let _y = y < 0 ? height + y : y;

    if (_y < Math.floor(height / 2) && _x < Math.floor(width / 2)) topLeft += 1;
    if (_y > Math.floor(height / 2) && _x < Math.floor(width / 2)) botLeft += 1;
    if (_y < Math.floor(height / 2) && _x > Math.floor(width / 2))
      topRight += 1;
    if (_y > Math.floor(height / 2) && _x > Math.floor(width / 2))
      botRight += 1;
  }

  let v = topRight * topLeft * botRight * botLeft;
console.log(v);
