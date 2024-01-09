const input = await Bun.file('./input.txt').text();

const foo = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(/:|\|/))
  .map(([, w, d]) => [w, d].map((x) => x.trim().split(/[ \t]+/)))
  .map(([w, d]) => d.reduce((s, v) => s + w.includes(v), 0))
  .reduce((s, v) => s + (v && 1 << --v), 0);

console.log('part1: ', foo.length);

const helper = Array.from({ length: 214 }, () => 1);

const foo2 = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(/:|\|/))
  .map(([, w, d]) => [w, d].map((x) => x.trim().split(/[ \t]+/)))
  .map(([w, d]) => d.reduce((s, v) => s + w.includes(v), 0))
  .map((x, i) => {
    for (let j = 1; j <= x; ++j) {
      helper[i + j] += helper[i];
    }
    return x;
  });

console.log(
  foo2,
  helper.reduce((s, v) => s + v),
);
