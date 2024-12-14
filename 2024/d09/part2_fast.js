const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split("").map(Number);

console.time("part2_fast");

const files = new Array();
const blanks = new Array();

let idx = 0;
for (let i = 0; i < data.length; ++i) {
  if (i % 2 === 0) {
    files.push([i / 2, data[i], idx]);
  } else {
    blanks.push([data[i], idx]);
  }
  idx += data[i];
}

for (let i = files.length - 1; i >= 0; --i) {
  let file = files[i];

  let j = 0;
  while (true) {
    const blank = blanks[j];

    if (file[1] <= blank[0]) {
      file[2] = blank[1];
      blank[1] += file[1];
      blank[0] -= file[1];
      break;
    }

    if (++j === blanks.length - 1 || j >= i) break;
  }
}

console.log(
  files.reduce(
    (acc, [id, size, idx]) =>
      idx * size * id + id * ((size * (size - 1)) / 2) + acc,
    0
  )
);

console.timeEnd("part2_fast");
