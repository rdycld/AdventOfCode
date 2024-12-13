const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const machines = input.split("\n\n").map((machine) => {
  const [equasionA, equasionB, prize] = machine.split("\n");
  const [m, n] = equasionA
    .split(/Button A: X\+|\, Y\+/)
    .filter(Boolean)
    .map(Number);
  const [o, p] = equasionB
    .split(/Button B: X\+|\, Y\+/)
    .filter(Boolean)
    .map(Number);
  const [C, D] = prize
    .split(/Prize: X\=|\, Y=/)
    .filter(Boolean)
    .map(Number);

  return { m, n, o, p, C: C + 10000000000000, D: D + 10000000000000 };
});


let sum = 0;
for (let { m, n, o, p, C, D } of machines) {

  let B = (D * m - n * C) / (p * m - n * o);

  let A = (C - o * B) / m;

  if (A % 1 === 0 && B % 1 === 0) sum += 3 * A + B;
}

console.log(sum);

console.timeEnd("part2");
