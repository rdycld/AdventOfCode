const fs = require('fs');

console.time('x');
const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const startY = 0;
const startX = d[0].indexOf('S');

let beams = [`${startY},${startX}`];
const splitters = new Set();
const banned = new Set();

let beam;
while ((beam = beams.pop())) {
  const [y, x] = beam.split(',').map(Number);

  if (banned.has(beam)) continue;
  if (y + 1 === d.length) continue;

  let next = d[y + 1][x];

  if (next === '.') {
    beams.push(`${y + 1},${x}`);
    continue;
  }

  banned.add(beam);
  splitters.add(`${y + 1}-${x}`);
  beams.push(`${y + 1},${x - 1}`);
  beams.push(`${y + 1},${x + 1}`);
}

console.timeEnd('x');
console.log(splitters.size);

