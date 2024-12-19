const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
let towels = input.split("\n\n")[0].split(", ");
let patterns = input.split("\n\n")[1].split("\n");

let cache = {};

function calcPossibilities(part, pattern) {
  if (part === pattern) return 1;

  if (cache[part]) return cache[part];

  let next = [];

  for (let towel of towels) {
    let n = part + towel;
    if (pattern.startsWith(n)) {
      next.push(n);
    }
  }

  let result = next.reduce(
    (sum, val) => sum + calcPossibilities(val, pattern),
    0
  );
  cache[part] = result;

  return result;
}

let sum = 0;

for (let pattern of patterns) {
  let combinations = calcPossibilities("", pattern);
  sum += combinations;

  cache = {};
}

console.log(sum);

console.timeEnd("part2");
