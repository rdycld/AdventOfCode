const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split("").map(Number);

console.time("part1");
const disc = [];

for (let i = 0; i < data.length; ++i)
  for (let c = data[i]; c > 0; --c) disc.push(i % 2 === 0 ? i / 2 : ".");

let sum = 0;

let l = 0;
let r = disc.length - 1;

main: while (true) {
  if (l === r) {
    sum += l * disc[l];
    break;
  }

  while (true) {
    let v = disc[l];
    if (v === ".") break;
    sum += v * l;
    if (l === r) break main;
    l++;
  }

  let v = disc[r];
  r--;

  if (v === ".")  continue ;
  sum += l * v;
  if (l === r)  break main; 
  l++;
}

console.log(sum);
console.timeEnd("part1");
