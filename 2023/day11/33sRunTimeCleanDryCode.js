let o = (await Bun.file('./input.txt').text())
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function t(mat) {
  const tMat = Array.from(Array(mat[0].length)).map(() => Array(mat[0].length));

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[i].length; ++j) tMat[j][i] = mat[i][j];

  return tMat;
}

function e(mat) {
  return mat.map((line) => (/^[.-]+$/.test(line.join('')) ? Array(line.length).fill('-') : line));
}

function c([iA, jA], [iB, jB], mat, mul) {
  return [
    ...mat[iA].slice(...[jA, jB].sort((a, b) => a - b)),
    ...t(mat)[jA].slice(...[iA, iB].sort((a, b) => a - b)),
  ].reduce((s, v) => s + (v === '-' ? mul : 1), 0);
}

let galaxies = e(t(e(o)))
  .flatMap((l, i) => l.map((g, j) => (g === '#' ? [i, j] : void 0)).filter(Boolean))
  .reduce(
    (s, g, i, a) => a.slice(i + 1).reduce((s, g_) => s + c(g, g_, e(t(e(o))), 1_000_000), s),
    0,
  );
console.log(galaxies);
