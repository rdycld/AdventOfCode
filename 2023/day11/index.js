let observable = (await Bun.file('./input.txt').text())
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function transpose(mat) {
  const tMat = Array.from(Array(mat[0].length)).map(() => Array(mat[0].length));

  for (let y = 0; y < mat.length; ++y)
    for (let x = 0; x < mat[y].length; ++x) tMat[x][y] = mat[y][x];

  return tMat;
}

function expand(mat) {
  return mat.map((line) =>
    line.every((el) => ['.', '-'].includes(el)) ? Array(line.length).fill('-') : line,
  );
}

function calcDistance(a, b, mat, mul) {
  const [yA, xA] = a;
  const [yB, xB] = b;

  const horStart = Math.min(xA, xB);
  const horEnd = Math.max(xA, xB);

  let horizontalPath = mat[yA].slice(horStart, horEnd);

  const verStart = Math.min(yA, yB);
  const verEnd = Math.max(yA, yB);

  let verticalPath = [];
  for (let i = verStart; i < verEnd; ++i) verticalPath.push(mat[i][horEnd]);

  return [...verticalPath, ...horizontalPath].reduce((s, v) => s + (v === '-' ? mul : 1), 0);
}

let expanded = expand(transpose(expand(observable)));

let galaxies = expanded.flatMap((l, y) =>
  l.map((g, x) => (g === '#' ? [y, x] : undefined)).filter(Boolean),
);

let sky = galaxies.reduce(
  (s, g, i, a) => a.slice(i + 1).reduce((s, g_) => s + calcDistance(g, g_, expanded, 1_000_000), s),
  0,
);

console.log(sky);
