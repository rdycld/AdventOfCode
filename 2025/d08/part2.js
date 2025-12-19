const fs = require('fs');

console.time('p2');
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

const sortedDistances = [...distances.entries()]
  .sort((a, b) => b[1] - a[1])
  .map((el) => el[0])
  .filter((_, i) => i % 2 === 0);

while (true) {
  const minKey = sortedDistances.pop();

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

console.timeEnd('p2');

