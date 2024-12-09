const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split("").map(Number);

console.time('part1')
const disc = [];

for (let i = 0; i < data.length; ++i) 
  for (let c = data[i]; c > 0; --c) disc.push(i % 2 === 0 ? i / 2 : ".");

while (disc.includes(".")) {
  disc[disc.indexOf(".")] = disc.pop();

  while (disc[disc.length - 1] === ".") disc.pop();
}

const p1 = disc.reduce((p, v, i) => p + v * i);

console.log(p1);
console.timeEnd('part1')


