const fs = require('fs');

const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const startY = 0;
const startX = d[0].indexOf('S');

let beams = [`${startY},${startX}`];
const splitters = new Set();

let beam;
while ((beam = beams.pop())) {
  const [y, x] = beam.split(',').map(Number);
  console.log(beams.length, y);

  if (y + 1 === d.length) continue;

  let next = d[y + 1][x];

  if (next === '.') {
    if (!beams.includes(`${y + 1},${x}`)) beams.push(`${y + 1},${x}`);
    continue;
  }

  if (next === '^') {
    splitters.add(`${y + 1}-${x}`);
    if (!beams.includes(`${y + 1},${x - 1}`)) beams.push(`${y + 1},${x - 1}`);
    if (!beams.includes(`${y + 1},${x + 1}`)) beams.push(`${y + 1},${x + 1}`);
    continue;
  }
}

console.log(splitters, splitters.size);
//idk, maybe it will execute in finite time