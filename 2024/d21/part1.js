const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const numpadMoves = {
  "A-0": "<A",
  "0-2": "^A",
  "2-9": "^^>A",
  "9-A": "vvvA",

  "A-9": "^^^A",
  "9-8": "<A",
  "8-0": "vvvA",
  "0-A": ">A",

  "A-1": "^<<A",
  "1-7": "^^A",
  "7-9": ">>A",

  "A-4": "^^<<A",
  "4-5": ">A",
  "5-6": ">A",
  "6-A": "vvA",

  "A-3": "^A",
  "3-7": "<<^^A",

  //INPUT

  "A-5": "<^^A",
  "5-4": "<A",
  "4-0": ">vvA",

  "5-8": "^A",
  "8-2": "vvA",
  "2-A": "v>A", // >v even higher

  "1-6": ">>^A", // ^>> no change
  "6-9": "^A",

  "5-9": ">^A", // ^> no change
  "9-3": "vvA",
  "3-A": "vA",

  "5-7": "<^A", // ^< to high
};

const directionMoves = {
  "A-^": "<A",
  "A-<": "v<<A",
  "A-v": "<vA",
  "A->": "vA",
  "A-A": "A",
  "^-^": "A",
  "^-<": "v<A",
  "^-v": "vA",
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
  "v-^": "^A",
  "v-<": "<A",
  "v-v": "A",
  "v->": ">A",
  "v-A": ">^A",
};

let cache = {};
const key = (p, d) => `${p}-${d}`;

function getSequenceLen(path, depth) {
  let k = key(path, depth);
  if (k in cache) return cache[k];

  cache[k] = path.length;
  if (depth === 0) return path.length;

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

console.log('input: ')
console.log(firstLayer.map(([path, v]) => v * getSequenceLen(path, 2)).reduce((a,b)=> a+b));





console.timeEnd("part1");