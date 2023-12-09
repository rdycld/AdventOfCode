const input = (await Bun.file('./input.txt').text()).split('\n').filter(Boolean);

function lcm(a, b) {
  let hcf = 1;
  for (let i = 2; i <= a && i <= b; i++) {
    if (a % i == 0 && b % i == 0) hcf = i;
  }
  return (a * b) / hcf;
}

const steps = input[0];

const graph = {};

for (let i = 1; i < input.length; ++i) {
  const [key, , , L, , R] = input[i].split(/[,|(|)| ]/);
  graph[key] = { L, R };
}

function part1(n, c) {
  let i = 0;
  let a = true;
  let node = n;

  while (a) {
    for (const next of steps) {
      node = graph[node][next];
      ++i;
      if (node.endsWith(c)) {
        a = false;
        break;
      }
    }
  }

  return i;
}

function part2() {
  return Object.keys(graph)
    .filter((k) => k.endsWith('A'))
    .map((n) => part1(n, 'Z'))
    .reduce(lcm);
}

console.log('part1: ', part1('AAA','ZZZ'));
console.log('part2: ', part2());
