const input = await Bun.file('./p2Input.txt').text();

const data = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(' '))
  .map(([a, b]) => [a, +b]);

let x = 0;
let y = 0;

const ranges = [];
const areas = [];

const turns = { RD: 'r', DL: 'r', LU: 'r', UR: 'r', LD: 'l', DR: 'l', RU: 'l', UL: 'l' };

const offsets = { rr: 1, rl: 0, lr: 0, ll: -1 };

data.forEach(([dir, val]) => {
  ranges.push({
    dir,
    val: ['L', 'U'].includes(dir) ? -val : val,
  });
});

ranges.forEach((range, idx, arr) => {
  const { dir, val } = range;
  const prev = arr[idx === 0 ? arr.length - 1 : idx - 1];
  const next = arr[(idx + 1) % arr.length];

  const prevTurn = turns[`${prev.dir}${dir}`];
  const nextTurn = turns[`${dir}${next.dir}`];
  const offset = offsets[`${prevTurn}${nextTurn}`];

  const xMove = ['R', 'L'].includes(dir);
  const yMove = ['D', 'U'].includes(dir);

  const yOffset = dir === 'U' ? -offset : dir === 'D' ? offset : 0;
  const xOffset = dir === 'L' ? -offset : dir === 'R' ? offset : 0;

  const x1 = x;
  const y1 = y;
  x = xMove ? x + val + xOffset : x;
  y = yMove ? y + val + yOffset : y;

  const area = x1 * y - x * y1;
  areas.push(area);
});

const sum = areas.reduce((s, v) => s + v, 0);

console.log(Math.abs(sum / 2));
