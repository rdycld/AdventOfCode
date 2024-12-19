const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
let towels = input.split("\n\n")[0].split(", ");
let patterns = input.split("\n\n")[1].split("\n");

let cache = {};

function calcPossibilities(part, pattern) {
  if (part === pattern) return 1;

  if (part in cache) return cache[part];

  cache[part] = towels.reduce(
    (sum, towel) =>
      pattern.startsWith(part + towel)
        ? sum + calcPossibilities(part + towel, pattern)
        : sum,
    0
  );

  return cache[part];
}

let sum = 0;

for (let pattern of patterns) {
  sum += calcPossibilities("", pattern);
  cache = {};
}

console.log(sum);

console.timeEnd("part2");
