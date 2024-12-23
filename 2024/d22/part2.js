const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

function getNextSecret(num) {
  //step 1
  let multiplied = num << 6;
  let mixed = multiplied ^ num;
  let pruned = mixed & ((1 << 24) - 1);
  // step 2
  let dividedAndFloored = pruned >> 5;
  let secondMixed = dividedAndFloored ^ mixed;
  let secondPruned = secondMixed & ((1 << 24) - 1);
  // step 3
  let thirdMultiplied = secondPruned << 11;
  let thirdMixed = thirdMultiplied ^ secondMixed;
  let thirdPruned = thirdMixed & ((1 << 24) - 1);

  return thirdPruned;
}

let sequencies = {};

function getSequencies(num) {
  let seen = new Set();
  let diffs = [];
  let secret = num;

  for (let i = 0; i < 2000; ++i) {
    let nextSecret = getNextSecret(secret);
    diffs.push((nextSecret % 10) - (secret % 10));
    secret = nextSecret;

    if (i >= 3) {
      let val = nextSecret % 10;
      let key = diffs.slice(-4).toString();

      if (seen.has(key)) continue;
      seen.add(key);
      
      if (key in sequencies) {
        sequencies[key] += val;
      } else {
        sequencies[key] = val;
      }
    }
  }
}

for (let v of input.split("\n")) {
  getSequencies(+v);
}

console.log(Math.max(...Object.values(sequencies)));

console.timeEnd("part2");
