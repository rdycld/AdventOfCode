
const input = await Bun.file('./input2.txt').text();

const data = input.split('\n').filter(Boolean);

const tower = [];

for (let l of data) {
  const [s, e] = l.split('~');
  const [sx, sy, sz] = s.split(',').map((x) => +x);
  const [ex, ey, ez] = e.split(',').map((x) => +x);

  tower.push([sx, sy, sz, ex, ey, ez]);
}

tower.sort((a, b) => a[2] - b[2]);

for (let i = 0; i < tower.length; ++i) {
  let maxZ = 1;
  let brick = tower[i];

  for (let prev of tower.slice(0, i)) {
    if (overlap(brick, prev)) {
      maxZ = Math.max(maxZ, prev[5] + 1);
    }
  }

  brick[5] -= brick[2] - maxZ;
  brick[2] = maxZ;
}

tower.sort((a, b) => a[2] - b[2]);
const supports = {};
const supportedBy = {};

for (let i = 0; i < tower.length; ++i) {
  supports[i] = new Set();
  supportedBy[i] = new Set();
  const brick = tower[i];
  for (let j = 0; j < i; ++j) {
    const prev = tower[j];
    if (overlap(brick, prev) && brick[2] === prev[5] + 1) {
      supports[j].add(i);
      supportedBy[i].add(j);
    }
  }
}

let canBeRemoved = 0;

for (let i in tower) {
  let support = supports[i];

  if ([...support].every((idx) => supportedBy[idx].size >= 2)) canBeRemoved += 1;
}
console.log('part1: ', canBeRemoved);

function overlap(a, b) {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  );
}
