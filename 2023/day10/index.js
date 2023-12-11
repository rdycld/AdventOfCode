const input = await Bun.file('./input.txt').text();
const example = await Bun.file('./example.txt').text();

const init = {
  '|': 's',
  '-': 'e',
  L: 'e',
  J: 'w',
  7: 'w',
  F: 'e',
};

const s = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

const step = {
  n: [-1, 0],
  e: [0, 1],
  s: [1, 0],
  w: [0, -1],
};

const directions = {
  'n|': 'n',
  n7: 'w',
  nF: 'e',
  'e-': 'e',
  eJ: 'n',
  e7: 's',
  's|': 's',
  sL: 'e',
  sJ: 'w',
  'w-': 'w',
  wL: 'n',
  wF: 's',
};

function getNextPos(pos, direction) {
  const vec = step[direction];
  return [pos[0] + vec[0], pos[1] + vec[1]];
}

function comparePos(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

const pathCoords = [];
function navigate(coords) {
  let pipe = s[coords[1]][coords[0]];
  let dir = init[pipe];
  let pos = coords;
  let advance = true;
  let path = pipe;

  do {
    pathCoords.push(pos);
    const nextPos = getNextPos(pos, dir);
    const finished = comparePos(coords, nextPos);
    if (finished) break;
    const nextPipe = s[nextPos[0]][nextPos[1]];
    const nextDir = directions[dir + nextPipe];

    pos = nextPos;
    pipe = nextPipe;
    dir = nextDir;
    path += pipe;
  } while (advance);

  return path.length / 2;
}
const part1 = navigate([102, 118]);

for (let i = 0; i < s.length; ++i)
  for (let j = 0; j < s[i].length; ++j) {
    const has = pathCoords.find((el) => el[0] === i && el[1] === j);
    if (!has) {
      s[i][j] = '.';
    }
  }

let inside = 0;
for (let i = 0; i < s.length; ++i)
  for (let j = 0; j < s[i].length; ++j) {
    let leDot = s[i][j];
    if (leDot !== '.') continue;

    let edges = 0;
    for (let l = j; l < s[i].length; ++l) {
      const h = s[i][l];
      if (h === '|' || h === '7' || h === 'F') edges += 1;
    }

    if (edges % 2 === 1) inside += 1;
  }

console.log('part1: ', part1);
console.log('part2: ', inside);

// //code below is part of a joke but it turned out peoplea actually used that method
//
const enlarged = [];

for (let i = 0; i < s.length; ++i) {
  enlarged.push([]);
  enlarged.push([]);
  enlarged.push([]);
  for (let j = 0; j < s[i].length; ++j) {
    let char = s[i][j];
    const l = enlarged.length;

    if (char === '.') {
      enlarged[l - 3].push('   ');
      enlarged[l - 2].push(' . ');
      enlarged[l - 1].push('   ');
    }
    if (char === 'L') {
      enlarged[l - 3].push(' | ');
      enlarged[l - 2].push(' ┗-');
      enlarged[l - 1].push('   ');
    }
    if (char === 'J') {
      enlarged[l - 3].push(' | ');
      enlarged[l - 2].push('-┛ ');
      enlarged[l - 1].push('   ');
    }
    if (char === '7') {
      enlarged[l - 3].push('   ');
      enlarged[l - 2].push('-┓ ');
      enlarged[l - 1].push(' | ');
    }
    if (char === 'F') {
      enlarged[l - 3].push('   ');
      enlarged[l - 2].push(' ┏-');
      enlarged[l - 1].push(' | ');
    }
    if (char === '|') {
      enlarged[l - 3].push(' | ');
      enlarged[l - 2].push(' | ');
      enlarged[l - 1].push(' | ');
    }
    if (char === '-') {
      enlarged[l - 3].push('   ');
      enlarged[l - 2].push('---');
      enlarged[l - 1].push('   ');
    }
    if (char === 'y') {
      enlarged[l - 3].push('   ');
      enlarged[l - 2].push('   ');
      enlarged[l - 1].push('   ');
    }
  }
}
Bun.write('enlarged.txt', enlarged.map((l) => l.join('')).join('\n'));
