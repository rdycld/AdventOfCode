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

let min = 999_999_999_999;
let minT = 0;
let max = 0;
let maxT = 0;


for (let t = 0; t < 100_00; t++) {
let bitMap = new Uint8ClampedArray(height*width);
    // let grid = Array.from({ length: height }, () =>
    //   Array.from({ length: width }, () => " ")
    // );

    let topRight = 0;
    let topLeft = 0;
    let botRight = 0;
    let botLeft = 0;
    for (let r of robots) {
      let x = (r.sx + t * r.vx) % width;
      let y = (r.sy + t * r.vy) % height;

      let _x = x < 0 ? width + x : x;
      let _y = y < 0 ? height + y : y;

      let pixel = _y*width + _x;

      bitMap[pixel]=1;
      bitMap[pixel+1]=1;
      bitMap[pixel+2]=1;
    }
}