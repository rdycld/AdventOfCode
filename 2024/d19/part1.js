const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
let towels = input.split("\n\n")[0].split(", ");
let patterns = input.split("\n\n")[1].split("\n");

const valid = [];

for (let pattern of patterns) {
  let queue = [pattern];

  let cache = new Set();
  match: while (queue.length) {
    let p = queue.pop();

    if (cache.has(p)) continue;

    for (let towel of towels) {
      if (p.endsWith(towel)) {
        let sliced = p.slice(0, -towel.length);

        if (sliced.length === 0) {
          valid.push(pattern);
          break match;
        }

        queue.push(sliced);
      } else {
        cache.add(p);
      }
    }
  }
}
console.log(valid.length);

console.timeEnd("part1");
