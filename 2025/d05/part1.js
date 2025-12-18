const fs = require('fs');

const [ranges, ids] = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n\n');

const przedzialy = [];

for (const range of ranges.split('\n')) {
  const [start, end] = range.split('-').map(Number);

  przedzialy.push([start, end]);
}

let counter = 0;

for (const id of ids.split('\n').map(Number)) {
  for (let [start, end] of przedzialy) {
    if (id <= end && id >= start) {
      counter += 1;
      break;
    }
  }
}

console.log(counter);

