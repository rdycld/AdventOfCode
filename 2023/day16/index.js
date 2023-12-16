const input = await Bun.file('./input.txt').text();

const data = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

/**
 * tuple of [x,y] vectors
 */
const vec = {
  n: [0, -1],
  e: [-1, 0],
  s: [0, 1],
  w: [1, 0],
};

const collision = {
  'n\\': ['e'],
  'e\\': ['n'],
  's\\': ['w'],
  'w\\': ['s'],
  'n/': ['w'],
  'e/': ['s'],
  's/': ['e'],
  'w/': ['n'],
  'n|': ['n'],
  'e|': ['n', 's'],
  's|': ['s'],
  'w|': ['n', 's'],
  'n-': ['e', 'w'],
  'e-': ['e'],
  's-': ['e', 'w'],
  'w-': ['w'],
};

function keyGen(path) {
  const [start, direction] = path;
  return `${start[0]}-${start[1]}-${direction}`;
}

function checkBoundaries([y,x]) {
  return y < 0 || y >= data.length || x < 0 || x >= data[0].length
}

const paths = [];
let cache = {};
const energized = new Set();

function resolvePath(path, starter = false) {
  const [start, direction] = path;
  let pos = start;
  let resolved = false;
  let val = data[pos[0]][pos[1]];
  let overflow = false;
  energized.add(`${pos[0]}-${pos[1]}`);

  if (starter && val !== '.') {
    resolved = true;
  }

  while (!resolved) {
    const next = vec[direction]
    pos = [pos[0] + next[1], pos[1] + next[0]]
    if (checkBoundaries(pos)) {
      resolved = true;
      overflow = true;
      break;
    }
    val = data[pos[0]][pos[1]];
    energized.add(`${pos[0]}-${pos[1]}`);

    if (val === '.') continue;
    resolved = true;
  }
  const key = keyGen(path);
  cache[key] = key;

  if (overflow) {
    return;
  }

  const next = collision[direction + val];

  for (let n of next) {
    const p = [pos, n];
    const pathKey = keyGen(p);
    if (cache[pathKey]) continue;

    paths.push(p);
  }
}

function part1() {
  let starter = [[0, 0], 'w'];
  paths.push(starter);
  let first = true;
  while (paths.length) {
    if (first) {
      resolvePath(paths.pop(), true);
      first = false;
    } else {
      resolvePath(paths.pop());
    }
  }
  cache = {};
  console.log('part1: ', energized.size);
  energized.clear();
}

function part2() {
  const starters = [];
  for (let i = 0; i < data.length; ++i) {
    starters.push([[0, i], 's']);
  }
  for (let i = 0; i < data.length; ++i) {
    starters.push([[data.length - 1, i], 'n']);
  }
  for (let i = 0; i < data[0].length; ++i) {
    starters.push([[i, 0], 'w']);
  }
  for (let i = 0; i < data[0].length; ++i) {
    starters.push([[i, data[0].length - 1], 'e']);
  }

  let finals = [];
  starters.forEach((starter) => {
    paths.push(starter);
    let first = true;
    while (paths.length) {
      if (first) {
        resolvePath(paths.pop(), true);
        first = false;
      } else {
        resolvePath(paths.pop());
      }
    }
    cache = {};
    finals.push(energized.size);
    energized.clear();
  });
  console.log('part2: ', Math.max(...finals));
}

part1();
part2();
