const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const dirs = [
  [-1, -1], //top left
  [-1, 0], // top
  [-1, 1], //top right
  [0, 1], // right
  [1, 1], //bottom right
  [1, 0], //bottom
  [1, -1], // bottom left
  [0, -1], // left
];

let sum = 0;

const copy = [...data.map((l) => [...l])];

const runForklift = () => {
  for (let y = 0; y < data.length; ++y) {
    for (let x = 0; x < data[0].length; ++x) {
      if (data[y][x] === '.') continue;

      const tl = data[y + dirs[0][0]]?.[x + dirs[0][1]] === '@';
      const t = data[y + dirs[1][0]]?.[x + dirs[1][1]] === '@';
      const tr = data[y + dirs[2][0]]?.[x + dirs[2][1]] === '@';
      const r = data[y + dirs[3][0]]?.[x + dirs[3][1]] === '@';
      const br = data[y + dirs[4][0]]?.[x + dirs[4][1]] === '@';
      const b = data[y + dirs[5][0]]?.[x + dirs[5][1]] === '@';
      const bl = data[y + dirs[6][0]]?.[x + dirs[6][1]] === '@';
      const l = data[y + dirs[7][0]]?.[x + dirs[7][1]] === '@';

      const adjustencntRolls = [tl, t, tr, r, br, b, bl, l].reduce(
        (a, b) => a + b,
        0
      );

      if (adjustencntRolls < 4) {
        sum += 1;
        data[y][x] = '.';
      }
    }
  }
};

let tmp;
do {
  tmp = sum;
  runForklift();
} while (sum > tmp);

console.log(sum);

