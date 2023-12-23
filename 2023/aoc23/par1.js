const input = await Bun.file('./input2.txt').text();

const grid = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function key([y, x]) {
  return `${y},${x}`;
}

const sx = grid[0].indexOf('.');
const ex = grid[grid.length - 1].indexOf('.');

//               y  x  dy dx, set of seen tiles
const starter = [0, sx, 1, 0, new Set()];

const q = [starter];

const answ = [];

while (q.length) {
  const tile = q.pop();
  const [y, x, dy, dx, cache] = tile;

  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) break;

  if (y === grid.length - 1 && x === ex) {
    answ.push(cache.size);
    continue;
  }
  let k = key(tile);

  if (cache.has(k)) continue;
  cache.add(k);

  let ny = y;
  let nx = x;

  while (true) {
    for (let [ndy, ndx] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      if (ndy === dy && ndx === dx) continue;
      if (ndy === dy && ndx === -dx) continue;
      if (ndy === -dy && ndx === dx) continue;
      if (ny + ndy < 0 || ny + ndy >= grid.length) continue;
      if (nx + ndx < 0 || nx + ndx >= grid[0].length) continue;
      if (grid[ny + ndy][nx + ndx] === '#') continue;
      if (ndx === -1 && grid[ny + ndy][nx + ndx] === '>') continue;
      if (ndy === -1 && grid[ny + ndy][nx + ndx] === 'v') continue;
      if (cache.has(key([ny + ndy, nx + ndx]))) continue;
      q.push([ny + ndy, nx + ndx, ndy, ndx, new Set(cache)]);
    }

    ny += dy;
    nx += dx;

    if (dy === -1 && grid[ny][nx] !== '.') break;
    if (dx === -1 && grid[ny][nx] !== '.') break;
    if (nx < 0 || nx >= grid[0].length) {
      cache.add(key([ny, nx]));
      answ.push(cache.size);
      break;
    }
    if (ny < 0 || ny >= grid.length) {
      cache.add(key([ny, nx]));
      answ.push(cache.size);
      break;
    }
    if (grid[ny][nx] === '#') break;

    cache.add(key([ny, nx]));
  }
}

answ.sort((a, b) => b - a);

console.log('part1:', answ[0]);
