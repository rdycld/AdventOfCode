const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const graph = {};

for (const line of data) {
  const [from, to] = line.split(': ');

  graph[from] = new Set(to.split(' '));
}

const queue = [['you', new Set(['you'])]];

const fondPats = [];

let path;
while ((path = queue.pop())) {
  const [node, visited] = path;

  const nextNodes = graph[node];

  for (const nextNode of nextNodes) {
    if (visited.has(nextNode)) continue;

    if (nextNode === 'out') {
      fondPats.push(new Set([...visited, node, 'out']));
      continue;
    }

    queue.push([nextNode, new Set([...visited, node])]);
  }
}

console.log(fondPats.length);

