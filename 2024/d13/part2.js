const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const part2 = input.split("\n\n").reduce((acc, machine) => {
  const [, m, n, o, p, C, D] = machine.split(/\D+/).map(Number);
  let nC = C + 10000000000000;
  let nD = D + 10000000000000;

  let B = (nD * m - n * nC) / (p * m - n * o);
  let A = (nC - o * B) / m;

  if (A % 1 === 0 && B % 1 === 0) return acc + (3 * A + B);
  else return acc;

},0);

console.log(part2)

console.timeEnd("part2");
