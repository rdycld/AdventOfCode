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

function cycle(data) {
  let cycled = data;
  for (let i = 0; i < 4; ++i) {
    cycled = transpose(cycled)
      .map((l) => l.split('#'))
      .map((l) => l.map((ll) => ll.split('').sort().reverse().join('')).join('#'))
      .map((l) => l.split('').reverse().join(''));
  }

  return cycled;
}

function rollNorth(data) {
  return transpose(
    transpose(data)
      .map((l) => l.split('#'))
      .map((l) => l.map((ll) => ll.split('').sort().reverse().join('')).join('#')),
  );
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

function part1() {
  const answ = sum(rollNorth(data));

  console.log(answ);
}

function part2() {
  const cache = {};
  const cacheArr = [data];

  let iter = 0;
  let rolled = data;

  while (true) {
    const key = rolled.join('\n');
    if (cache[key]) {
      break;
    }
    rolled = cycle(rolled);
    cache[key] = rolled;
    cacheArr.push(rolled.join('\n'));
    iter += 1;
  }

  const first = cacheArr.indexOf(rolled.join('\n'));
  const idx = ((1_000_000_000 - iter) % (iter - first)) + first;
  const answ = sum(cacheArr[idx].split('\n'));

  console.log(answ);
}
part1();
part2();
