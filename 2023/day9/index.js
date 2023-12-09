const input = await Bun.file('./input.txt').text();

const data = input
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split(' '));
//for part2 add .reverse() here ^

let part1 = 0;

for (const line of data) {
  const g = [line];

  do {
    const last = g[g.length - 1];
    g.push([]);
    for (let i = last.length - 1; i > 0; --i) {
      g[g.length - 1].unshift(g[g.length - 2][i] - g[g.length - 2][i - 1]);
    }
  } while (g[g.length - 1].reduce((s, v) => s + v, 0) !== 0);
  sum += g.reduce((s, v) => s + +v[v.length - 1], 0);
}

console.log('part1: ', part1);

