const fs = require('fs');

console.time('p1');
const d = fs
  .readFileSync('./example.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(',').map(Number));

const sortedX = [...new Set(d.map(([x]) => x).sort((a, b) => a - b))];
const sortedY = [...new Set(d.map(([, y]) => y).sort((a, b) => a - b))];

const row = {};
const column = {};

for (let i = 0; i < sortedX.length; ++i) {
  row[2 * i] = 1;
  if (i + 1 === sortedX.length) continue;
  row[2 * i + 1] = sortedX[i + 1] - sortedX[i] - 1;
}

for (let i = 0; i < sortedY.length; ++i) {
  column[2 * i] = 1;
  if (i + 1 === sortedY.length) continue;
  column[2 * i + 1] = sortedY[i + 1] - sortedY[i] - 1;
}

const grid = Array.from({ length: Object.keys(column).length }, () =>
  Array.from({ length: Object.keys(row).length }, () => ' ')
);

const loop = [...d, d[0]];

for (let i = 0; i < loop.length - 1; ++i) {
  const [ax, ay] = loop[i];
  const [bx, by] = loop[i + 1];

  const isHorizontal = ay === by;
  const start = isHorizontal ? Math.min(ax, bx) : Math.min(ay, by);
  const end = isHorizontal ? Math.max(ax, bx) : Math.max(ay, by);

  const gridStartIndex = 2 * (isHorizontal ? sortedX : sortedY).indexOf(start);
  const gridEndIndex = 2 * (isHorizontal ? sortedX : sortedY).indexOf(end);
  const otherDimension =
    2 * (isHorizontal ? sortedY : sortedX).indexOf(isHorizontal ? ay : ax);

  for (let i = gridStartIndex; i <= gridEndIndex; ++i) {
    if (isHorizontal) grid[otherDimension][i] = 1;
    else grid[i][otherDimension] = 1;
  }
}

// const fillStartY = 34;
// const fillStartX = 247;

const fillStartY = 3;
const fillStartX = 3;

const q = [[fillStartY, fillStartX]];
const visited = new Set();

let point;

while ((point = q.pop())) {
  const [cy, cx] = point;

  for (const [dy, dx] of [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const ny = cy + dy;
    const nx = cx + dx;

    if (visited.has(`${ny},${nx}`)) continue;
    if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) continue;
    if (grid[ny][nx] === 1) continue;

    visited.add(`${ny},${nx}`);
    grid[ny][nx] = 1;
    q.push([ny, nx]);
  }
}

for (let i = 0; i < grid.length; ++i)
  for (let j = 0; j < grid[0].length; ++j) {
    const p = grid[i][j];

    if (p === ' ') grid[i][j] = 0;
  }

const m = grid.map((l) => l.join('')).join('\n');
console.log(m);

fs.writeFileSync('foo2.txt', m, { encoding: 'utf-8' });

