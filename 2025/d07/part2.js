const fs = require('fs');

console.time('p2');
const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const startY = 0;
const startX = d[0].indexOf('S');

const cache = new Map();

const calcPossibilities = (y, x) => {
  const cacheHit = cache.get(`${y},${x}`);

  if (cacheHit) return cacheHit;

  if (y + 1 === d.length) {
    cache.set(`${y},${x}`, 1);
    return 1;
  }

  let next = d[y + 1][x];

  let v;
  if (next === '.') {
    v = calcPossibilities(y + 1, x);
  } else {
    v = calcPossibilities(y + 1, x - 1) + calcPossibilities(y + 1, x + 1);
  }

  cache.set(`${y},${x}`, v);
  return v;
};

console.log(calcPossibilities(startY, startX));

console.timeEnd('p2');

