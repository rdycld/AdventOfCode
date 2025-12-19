const fs = require('fs');
console.time('p2');

const d = fs
  .readFileSync('./input_parsed.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const cache = new Map();

const calcPossibilities = (y, x) => {
  const cacheHit = cache.get(`${y},${x}`);

  if (cacheHit) return cacheHit;
  if (y + 1 === d.length) return 1;

  let v;
  if (d[y + 1][x] === '.') v = calcPossibilities(y + 1, x);
  else v = calcPossibilities(y + 1, x - 1) + calcPossibilities(y + 1, x + 1);
  return cache.set(`${y},${x}`, v).get(`${y},${x}`);
};

console.log(calcPossibilities(0, d[0].indexOf('S')));
console.timeEnd('p2');

