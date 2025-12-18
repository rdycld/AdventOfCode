const fs = require('fs');

const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.trim().split(/\s+/));

const transpose = (m) => {
  const transpsoed = Array.from({ length: m[0].length }, () =>
    Array.from({ length: m.length })
  );
  for (let y = 0; y < m.length; ++y)
    for (let x = 0; x < m[0].length; ++x)
      transpsoed[x][y] = Object.is(parseInt(m[y][x]), NaN)
        ? m[y][x]
        : parseInt(m[y][x]);

  return transpsoed;
};

const tPosed = transpose(d);

let counter = 0;

const fns = { '*': (a, b) => a * b, '+': (a, b) => a + b };

for (const line of tPosed) {
  const op = line.pop();
  counter += line.reduce(fns[op]);
}

console.log(counter);
