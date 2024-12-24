const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const numpadMoves = {
  "9-A": "vvvA",
  "0-A": ">A",

  "A-1": "^<<A",
  "7-9": ">>A",
  "A-5": "<^^A",
  "5-4": "<A",
  "4-0": ">vvA",

  "5-8": "^A",
  "8-2": "vvA",
  "2-A": "v>A",

  "1-6": "^>>A",
  "6-9": "^A",
  "5-9": "^>A",
  "9-3": "vvA",
  "3-A": "vA",
  "5-7": "<^A",
};

const directionMoves = {
  "A-^": "<A",
  "A-<": "v<<A",
  "A-v": "<vA",
  "A->": "vA",
  "A-A": "A",
  "^-^": "A",
  "^-<": "v<A",
  // "^-v": "vA",
  "^->": "v>A",
  "^-A": ">A",
  "<-^": ">^A",
  "<-<": "A",
  "<-v": ">A",
  "<->": ">>A",
  "<-A": ">>^A",
  ">-^": "<^A",
  ">-<": "<<A",
  ">-v": "<A",
  ">->": "A",
  ">-A": "^A",
  // "v-^": "^A",
  "v-<": "<A",
  "v-v": "A",
  "v->": ">A",
  "v-A": "^>A",
};

let cache = {};
const key = (p, d) => `${p}-${d}`;

function getSequenceLen(path, depth) {
  let k = key(path, depth);
  if (k in cache) return cache[k];

  if (depth === 0) {
    cache[k] = path.length;
    return path.length;
  }

  let sum = 0;

  let dirPos = "A";

  for (let i = 0; i < path.length; ++i) {
    let nextDirPos = path[i];
    let dirMove = directionMoves[`${dirPos}-${nextDirPos}`];
    sum += getSequenceLen(dirMove, depth - 1);
    dirPos = nextDirPos;
  }

  cache[k] = sum;
  return sum;
}

let firstLayer = input.split("\n").map((el) => {
  let dirPos = "A";
  let k = "";

  for (let i = 0; i < el.length; ++i) {
    let nextDirPos = el[i];
    let dirMove = numpadMoves[`${dirPos}-${nextDirPos}`];
    k += dirMove;
    dirPos = nextDirPos;
  }
  return [k, parseInt(el)];
});

console.log("input: ");
console.log(
  firstLayer
    .map(([path, v]) => v * getSequenceLen(path, 25))
    .reduce((a, b) => a + b,0)
);

console.timeEnd("part1");
