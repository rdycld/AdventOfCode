const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

const cache = new Map();

const [p1,p2] = input
  .split("\n\n")
  .flatMap((l) => l.split("\n"))
  .reduce((acc, val) => {
    if (val.includes("|")) {
      cache.set(val, -1);
      cache.set(val.split("|").reverse().join("|"), 1);
      return acc
    }

   const sorted = [...val.split(',')].sort((a,b)=>cache.get(`${a}|${b}`));
   const middle = sorted[Math.floor(sorted.length/2)];

   acc[Number(sorted.toString() !== val.toString())]+=+middle

   return acc
  }, [0,0]);

console.log('p1: ',p1,'p2: ',p2);
