const fs = require('fs');

console.time('p1');
const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(',').map(Number));

let max = 0;

for (const nodeA of d)
  for (const nodeB of d) {
    if (nodeA === nodeB) continue;
    const [ax, ay] = nodeA;
    const [bx, by] = nodeB;

    const area = (1 + Math.abs(ax - bx)) * (1 + Math.abs(ay - by));

    if (area > max) max = area;
  }

console.log(max);
console.timeEnd('p1');

