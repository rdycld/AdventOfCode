const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const data = input.split("").map(Number);

const disc = [];

for (let i = 0; i < data.length; ++i) 
  disc.push([i % 2 === 0 ? i / 2 : ".", data[i], i]);

for (let i = disc.length - 1; i > 0; --i) {
  //   [id, size, idx]
  const file = disc[i];
  if (file[0] === ".") continue;

  for (let j = 0; j < i; ++j) {
    // [id, freeSpace, idx]
    const space = disc[j];
    if (space[0] !== ".") continue;

    if (file[1] <= space[1]) {
      disc.push([".", file[1], file[2]]);
      file[2] = space[2];
      space[1] -= file[1];

      for (let k = 0; k < disc.length; ++k) {
        let v = disc[k];
        if (k === i) continue;

        if (v[2] >= file[2]) 
          v[2] += 1;
      }

      break;
    }
  }
}

const p2 = disc
  .toSorted((a, b) => a[2] - b[2])
  .flatMap((el) => {
    let v = [];
    for (let x = 0; x < el[1]; x++) {
      v.push(el[0]);
    }
    return v;
  })
  .reduce((p, v, i) => (v === "." ? p : p + v * i));

console.log(p2);
