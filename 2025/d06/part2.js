const fs = require('fs');

const d = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(''));

const transpose = (m) => {
  const transpsoed = Array.from({ length: m[0].length }, () =>
    Array.from({ length: m.length })
  );
  for (let y = 0; y < m.length; ++y)
    for (let x = 0; x < m[0].length; ++x) transpsoed[x][y] = m[y][x].split('');

  return transpsoed;
};

const tPosed = transpose(d);

const split = [];

let acc = [];

let pierwszy = true;
for (const line of tPosed) {
  const flattened = line.flatMap((l) => l).filter((el) => el !== ' ');

  if (pierwszy) {
    const op = flattened.pop();
    acc.push(op);
    pierwszy = false;
  }

  const liczba = +flattened.join('');

  const pusty = flattened.length === 0;

  if (pusty) {
    split.push(acc);
    acc = [];
    pierwszy = true;
  } else {
    acc.unshift(liczba);
  }
}
split.push(acc);

let counter = 0;

const fns = { '*': (a, b) => a * b, '+': (a, b) => a + b };

for (const line of split) {
  const op = line.pop();
  counter += line.reduce(fns[op]);
}

console.log(counter);

