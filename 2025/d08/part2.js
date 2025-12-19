const fs = require('fs');

console.time('p1');
const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(',').map(Number));

function calcDist(a, b) {
  const [aX, aY, aZ] = a;
  const [bX, bY, bZ] = b;

  return ((aX - bX) ** 2 + (aY - bY) ** 2 + (aZ - bZ) ** 2) ** 0.5;
}

const distances = new Map();

for (const distA of d)
  for (const distB of d)
    if (distA === distB) continue;
    else
      distances.set(
        `${distA.join(',')}-${distB.join(',')}`,
        calcDist(distA, distB)
      );

const circuts = new Set(d.map((el) => new Set([el.join(',')])));

while (true) {
  let min = Infinity;
  let minKey;
  for (const [key, value] of distances.entries()) {
    if (value < min) {
      min = value;
      minKey = key;
    }
  }

  distances.delete(minKey);
  distances.delete(minKey.split('-').toReversed().join('-'));

  const [a, b] = minKey.split('-');

  let circutsToJoin = [];
  for (const c of circuts) if (c.has(a) || c.has(b)) circutsToJoin.push(c);
  for (const circut of circutsToJoin) circuts.delete(circut);

  if (circutsToJoin.length === 2 && circuts.size === 0) {
    const [ax] = a.split(',');
    const [bx] = b.split(',');

    console.log('answ', ax * bx);
    break;
  }

  circuts.add(circutsToJoin.reduce((a, b) => a.union(b), new Set()));
}

console.timeEnd('p1');

