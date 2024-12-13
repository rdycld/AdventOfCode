const fs = require("fs");

// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

/**
 *  mA + nB = C (m=94, n=22, C = 8400)
 *  oA + pB = D (o=34, p,=67, D = 8400)
 *
 *  mA +nB = C
 *
 *  mA = C - nB
 *
 *  A = (C - nB)/m
 *
 *  o(C - nB)/m + pB = D
 *
 *  oC/m - onB/m + pB = D
 *
 * oC - onB + mpB = Dm
 *
 * mpB - onB = Dm - oC
 *
 * B(mp - on) = Dm - oC
 *
 * B = (Dm - oC)/ (mp - on)
 */

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const part1 = input.split("\n\n").reduce((acc, machine) => {
  const [equasionA, equasionB, prize] = machine.split("\n");
  const [,m, n] = equasionA
    .split(/Button A: X\+|\, Y\+/)
  const [,o, p] = equasionB
    .split(/Button B: X\+|\, Y\+/)
  const [,C, D] = prize
    .split(/Prize: X\=|\, Y=/)

  let B = (+D * +m - +n * +C) / (+p * +m - +n * +o);

  if(B % 1 !==0) return acc
  return acc + 3* ((+C - +o * +B) / +m) + B

}, 0);

console.log(part1)
console.timeEnd("part1");
