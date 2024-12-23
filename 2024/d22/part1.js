const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
const cache = {};

function getNextSecret(num, depth) {
  if (num in cache) {
    if (depth === 1) return cache[num];

    return getNextSecret(cache[num], depth - 1);
  }
  //step 1
  let multiplied = num << 6;
  let mixed = multiplied ^ num;
  let pruned = mixed & (1 << 24) - 1;
  // step 2
  let dividedAndFloored = pruned >> 5;
  let secondMixed = dividedAndFloored ^ mixed;
  let secondPruned = secondMixed & (1 << 24) - 1;
  // step 3
  let thirdMultiplied = secondPruned << 11;
  let thirdMixed = thirdMultiplied ^ secondMixed;
  let thirdPruned = thirdMixed & (1 << 24) - 1;
  cache[num] = thirdPruned;

  if(depth === 1)
    return thirdPruned

  return getNextSecret(thirdPruned, depth-1)
}

console.log(input.split('\n').reduce((acc,val)=> acc + getNextSecret(+val,2000),0))

console.timeEnd("part2");
