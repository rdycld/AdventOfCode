const input = await Bun.file('./input.txt').text();

function split(mat) {
  return mat.map((l) => l.split(''));
}

function join(mat) {
  return mat.map((l) => l.join(''));
}

function transpose(raw) {
  const mat = split(raw);
  const tMat = Array.from(Array(mat[0].length)).map(() => Array(mat[0].length));

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[i].length; ++j) tMat[j][i] = mat[i][j];

  return join(tMat);
}

function rollWest(data) {
  return data
    .map((l) => l.split('#'))
    .map((l) => l.map((ll) => ll.split('').sort().reverse().join('')).join('#'));
}

function rollNorth(data) {
  return transpose(
    transpose(data)
      .map((l) => l.split('#'))
      .map((l) => l.map((ll) => ll.split('').sort().reverse().join('')).join('#')),
  );
}

function rollEast(data) {
  return data
    .map((l) => l.split('#'))
    .map((l) => l.map((ll) => ll.split('').sort().join('')).join('#'));
}

function rollSouth(data) {
  return transpose(
    transpose(data)
      .map((l) => l.split('#'))
      .map((l) => l.map((ll) => ll.split('').sort().join('')).join('#')),
  );
}

function cycle(data) {
  return rollEast(rollSouth(rollWest(rollNorth(data))));
}

function sum(data) {
  let val = 0;
  data.forEach((l, i) => {
    let os = 0;
    for (let letter of l) {
      if (letter === 'O') ++os;
    }
    val += os * (data.length - i);
  });
  return val;
}

const data = input.split('\n').filter(Boolean);

const cache = {};
const cacheArr = [data.join('\n')];

let iter = 0;
let rolled = data;

while (true) {
  const key = rolled.join('');
  if (cache[key]) {
    break;
  }
  rolled = cycle(rolled);
  cache[key] = rolled;
  cacheArr.push(rolled.join('\n'));
  iter += 1;
}

let final = data;
const first = cacheArr.indexOf(rolled.join('\n'));

for (let i = 0; i < ((1_000_000_000 - first) % (first - iter)) + iter; ++i) {
  final = cycle(final);
}
console.log(iter - first, first);

console.log(sum(final));
