const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

/**
 * Button A: X+94, Y+34
   Button B: X+22, Y+67
   Prize: X=8400, Y=5400

   mA + oB = C (m = 94, o = 22, C = 8400)
   nA + pB = D (n = 34, p = 67, D = 5400);

   mA = c - oB --> A = (C - oB)/m

   n(C - oB)/m + pB = D --> nC/m - noB/m + pB = D --> nC - noB + mpB = Dm

   mpB + noB = Dm - nC --> B(mp + no)= Dm - nC --> B = (Dm - nC)/ (mp + no)
 */

const part1 = input.split("\n\n").reduce((acc, machine) => {
  const [, m, n, o, p, C, D] = machine.split(/\D+/).map(Number);
  let B = (D * m - n * C) / (p * m - n * o);
  if (B % 1 !== 0) return acc;
  return acc + 3 * ((C - o * B) / m) + B;
}, 0);

console.log(part1);
console.timeEnd("part1");
