const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const part1 = input.split("\n\n").reduce((acc, machine) => {
  const [, m, n, o, p, C, D] = machine.split(/\D+/).map(Number);
  let B = (D * m - n * C) / (p * m - n * o);
  if (B % 1 !== 0) return acc;
  return acc + 3 * ((C - o * B) / m) + B;
}, 0);

console.log(part1);
console.timeEnd("part1");
