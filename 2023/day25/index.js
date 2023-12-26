const input = await Bun.file('./input.txt').text();
const data = input.split('\n').filter(Boolean);

const graph = {};

for (let line of data) {
  const [from, to] = line.split(': ');
  if (!(from in graph)) graph[from] = {};

  for (let t of to.split(' ')) {
    if (!(t in graph)) graph[t] = {};
    graph[t][from] = from;
    graph[from][t] = t;
  }
}

const nodes = Object.keys(graph);

const paths = [];

const cache = {};

function bfs() {
  const [s, e] = get2RandomNodes().sort();
  let str = nodes[s];
  let end = nodes[e];

  const q = [[str, new Set([str])]];

  while (q.length) {
    const pt = q.shift();

    if (pt[0] === end) {
      paths.push([...pt[1]].join('-'));
      break;
    }

    for (let key of Object.keys(graph[pt[0]])) {
      if (pt[1].has(key)) {
        continue;
      }
      q.push([key, new Set([...pt[1], key])]);
    }
  }
}

for (let i = 0; i < 1000; ++i) {
  console.log(`${i / 10}%`);
  bfs();
}

const occurances = {};

paths.forEach((path) => {
  const nodes = path.split('-');

  for (let i = 0; i < nodes.length - 1; ++i) {
    const p = [nodes[i], nodes[i + 1]].sort();
    const k = p.join('-');
    if (!(k in occurances)) {
      occurances[k] = 1;
    } else {
      occurances[k] += 1;
    }
  }
});

const top3 = Object.values(occurances)
  .sort((a, b) => b - a)
  .slice(0, 3);
console.log(
  Object.values(occurances)
    .sort((a, b) => b - a)
    .slice(0, 4),
);

const mostCommon = [];

Object.entries(occurances).forEach(([k, v]) => {
  if (top3.includes(v)) mostCommon.push(k);
});

let left = '';
let right = '';
for (let cut of mostCommon) {
  const [l, r] = cut.split('-');
  delete graph[l][r];
  delete graph[r][l];
  left = l;
  right = r;
}

console.log('part2: ', countNodes(left) * countNodes(right));
//well it works XD i guess

function countNodes(pt) {
  const q = [pt];
  const seen = new Set();

  while (q.length) {
    const node = q.shift();
    for (let key of Object.keys(graph[node])) {
      if (!seen.has(key)) {
        seen.add(key);
        q.push(key);
      }
    }
  }
  return seen.size;
}

function get2RandomNodes() {
  let a = getRandomInt(0, nodes.length);
  let b = getRandomInt(0, nodes.length);
  while (a === b) {
    b = getRandomInt(0, nodes.length);
  }

  return [a, b];
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
