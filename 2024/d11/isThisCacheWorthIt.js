const fs = require("fs");
const { Cache } = require("../utils/cache");

console.time("day11");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split(" ").map(Number);

const SOLVE_PART_2 = true;

function split(value) {
  let asStr = value.toString();
  let middle = asStr.length / 2;
  return [+asStr.substring(0, middle), +asStr.substring(middle)];
}

const cache = new Cache("-");

function calc(value, depth) {

  if (depth === 0) 
    return cache.withCache(1, value, depth);

  let nextDepth = depth - 1

  if (value === 0) 
    return cache.withCache(calc, 1, nextDepth);
  
  let asStr = value.toString();

  if (asStr.length % 2 === 0) {
    const [left, right] = split(value);

    return (
      cache.withCache(calc, left, nextDepth) +
      cache.withCache(calc, right, nextDepth)
    );
  }

  return cache.withCache(calc, value *2024, nextDepth)
}

let sum = 0;

for (let stone of data) {
  sum += calc(stone, SOLVE_PART_2 ? 75 : 25);
}

console.log(data, "depth: ", SOLVE_PART_2 ? 75 : 25);
console.log(sum);
console.timeEnd("day11");

