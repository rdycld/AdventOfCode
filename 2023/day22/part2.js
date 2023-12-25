const input = await Bun.file('./input2.txt').text();

function overlap(a, b) {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  );
}

function sort(arr) {
  arr.sort((a, b) => a[2] - b[2]);
}

const data = input.split('\n').filter(Boolean);

const tower = [];

for (let l of data) {
  const [s, e] = l.split('~');
  const [sx, sy, sz] = s.split(',').map((x) => +x);
  const [ex, ey, ez] = e.split(',').map((x) => +x);

  tower.push([sx, sy, sz, ex, ey, ez]);
}

sort(tower);

for (let i = 0; i < tower.length; ++i) {
  let maxZ = 1;
  let brick = tower[i];

  for (let prev of tower.slice(0, i)) if (overlap(brick, prev)) maxZ = Math.max(maxZ, prev[5] + 1);

  brick[5] -= brick[2] - maxZ;
  brick[2] = maxZ;
}

sort(tower);

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

function part2() {
  let totalFalling = 0;

  for (let i = 0; i < tower.length; ++i) {
    let q = [];
    for (let j of supports[i]) if (supportedBy[j].size === 1) q.push(j);

    let willFall = new Set(q);
    willFall.add(i);

    while (q.length) {
      let s = q.shift();

      for (let x of [...supports[s]].filter((el) => !willFall.has(el)))
        if ([...supportedBy[x]].every((el) => willFall.has(el))) {
          q.push(x);
          willFall.add(x);
        }
    }
    totalFalling += willFall.size - 1;
  }
  console.log(totalFalling);
}

part2();
