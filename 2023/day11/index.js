let observable = (await Bun.file('./input.txt').text())
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function transpose(mat) {
  const tMat = Array.from(Array(mat[0].length)).map(() => Array(mat[0].length));

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[i].length; ++j) tMat[j][i] = mat[i][j];

  return tMat;
}

function expand(mat) {
  return mat.map((line) =>
    line.every((el) => ['.', '-'].includes(el)) ? Array(line.length).fill('-') : line,
  );
}

function calcDistance(a, b, mat, mul) {
  const [iA, jA] = a;
  const [iB, jB] = b;

  const horStart = Math.min(jA, jB);
  const horEnd = Math.max(jA, jB);

  let horizontalPath = mat[iA].slice(horStart, horEnd);

  const verStart = Math.min(iA, iB);
  const verEnd = Math.max(iA, iB);

  let verticalPath = [];
  for (let i = verStart; i < verEnd; ++i) verticalPath.push(mat[i][horEnd]);

  return [...verticalPath, ...horizontalPath].reduce((s, v) => s + (v === '-' ? mul : 1), 0);
}

let expanded = expand(transpose(expand(observable)));

// [i,j] coords of every galaxy
let galaxies = expanded.flatMap((l, i) =>
  l.map((g, j) => (g === '#' ? [i, j] : undefined)).filter(Boolean),
);

let sky = galaxies.reduce(
  (s, g, i, a) => a.slice(i + 1).reduce((s, g_) => s + calcDistance(g, g_, expanded, 1_000_000), s),
  0,
);
console.log(sky);
