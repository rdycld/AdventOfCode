const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const graph = {};

for (const line of data) {
  const [from, to] = line.split(': ');

  graph[from] = new Set(to.split(' '));
}

const cache = new Map();

function calcPaths(from, to) {
  if (from === to) return 1;

  const cacheHit = cache.get(`${from}-${to}`);
  if (cacheHit !== undefined) return cacheHit;

  const nextNodes = graph[from];

  if (!nextNodes) return 0;

  const paths = [];

  for (const nextNode of nextNodes.values())
    paths.push(calcPaths(nextNode, to));

  const answ = paths.reduce((a, b) => a + b);

  cache.set(`${from}-${to}`, answ);

  return answ;
}

const a =
  calcPaths('svr', 'fft') * calcPaths('fft', 'dac') * calcPaths('dac', 'out');

console.log(a + b);

