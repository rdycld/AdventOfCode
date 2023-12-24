
// input got altered: replaced '>' and 'v' with '.'
const input = await Bun.file('./input3.txt').text();

const grid = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function key(y, x) {
  return `${y},${x}`;
}

function getDirs([t, r, b, l]) {
  const top = [-1, 0];
  const right = [0, 1];
  const bottom = [1, 0];
  const left = [0, -1];
  const dirs = [];

  if (t) dirs.push(top);
  if (r) dirs.push(right);
  if (b) dirs.push(bottom);
  if (l) dirs.push(left);

  return dirs;
}

let nodes = [];
const sx = grid[0].indexOf('.');
const ex = grid[grid.length - 1].indexOf('.');

nodes.push([0, sx, key(0, sx), false, false, true, false]);

for (let i = 1; i < grid.length - 1; ++i)
  for (let j = 1; j < grid[0].length - 1; ++j) {
    const c = grid[i][j];
    if (c === '#') continue;
    const t = grid[i - 1][j] === '.';
    const r = grid[i][j + 1] === '.';
    const b = grid[i + 1][j] === '.';
    const l = grid[i][j - 1] === '.';
    if (t + r + b + l >= 3) nodes.push([i, j, key(i, j), t, r, b, l]);
  }
nodes.push([grid.length - 1, ex, key(grid.length - 1, ex), true, false, false, false]);

const graph = {};

for (let i = 0; i < nodes.length; ++i) {
  let [sy, sx, k, ...rest] = nodes[i];
  const dirs = getDirs(rest);
  const node = {};

  for (let [sdy, sdx] of dirs) {
    let seen = new Set();
    let y = sy;
    let x = sx;
    let dy = sdy;
    let dx = sdx;
    let found = false;
    seen.add(key(y, x));

    while (true) {
      let ny = y + dy;
      let nx = x + dx;

      for (let n = 0; n < nodes.length; ++n) {
        if (nodes[n][2] === key(ny, nx) && key(ny, nx) !== k) {
          node[nodes[n][2]] = seen.size;
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }

      if (grid[ny][nx] === '#') {
        for (let [ndy, ndx] of [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]) {
          if (grid[y + ndy][x + ndx] !== '.' || seen.has(key(y + ndy, x + ndx))) continue;

          dy = ndy;
          dx = ndx;
          ny = y + dy;
          nx = x + dx;

          for (let n = 0; n < nodes.length; ++n) {
            if (nodes[n][2] === key(ny, nx) && key(ny, nx) !== k) {
              node[nodes[n][2]] = seen.size;
              found = true;
              break;
            }
          }
        }
      }

      y = ny;
      x = nx;
      seen.add(key(y, x));
    }
    graph[k] = node;
  }
}

// graph traversal is really slow XD 30sec runtime, large room for improvement
const start = `${0},${sx}`;

const paths = [[start, 0, new Set()]];
paths[0][2].add(start);
const answ = [];

while (paths.length) {
  let [node, length, seen] = paths.pop();
  if (node === `${grid.length - 1},${ex}`) {
    answ.push(length);
  }

  for (let v in graph[node]) {
    if (seen.has(v)) {
      continue;
    }
    let newCache = new Set(seen);
    newCache.add(v);

    paths.push([v, length + graph[node][v], new Set(newCache)]);
  }
}
console.log(answ.sort((a, b) => b - a)[0]);
