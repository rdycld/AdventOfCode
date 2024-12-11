const fs = require("fs");

console.time("day11");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split(" ").map(Number);

const SOLVE_PART_2 = true;

const keyGen = (v, d) => `${v}-${d}`;
const cache = {};

function calc(value, depth) {
  const key = keyGen(value, depth);

  if (key in cache) return cache[key];

  if (depth === 0) {
    cache[key] = 1;
    return 1;
  }

  if (value === 0) {
    const result = calc(1, depth - 1);
    cache[key] = result;
    return result;
  }

  let asStr = value.toString();
  let middle = asStr.length / 2;
  if (asStr.length % 2 === 0) {
    const result =
      calc(+asStr.substring(0, middle), depth - 1) +
      calc(+asStr.substring(middle), depth - 1);

    cache[key] = result;

    return result;
  }
  const result = calc(value * 2024, depth - 1);

  cache[key] = result;

  return result;
}

console.log(data, "depth: ", SOLVE_PART_2 ? 75 : 25);
let sum = 0;

for (let stone of data) {
  sum += calc(stone, SOLVE_PART_2 ? 75 : 25);
}

console.log(sum);
console.timeEnd("day11");
