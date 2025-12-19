const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((l) => l.split(': '));

console.log(data);
let canFit = 0;

for (const line of data) {
  const [box, qtys] = line;
  const [x, y] = box.split('x');
  const xThrees = Math.floor(+x / 3);
  const yThrees = Math.floor(+y / 3);
  const capacity = xThrees * yThrees;
  const presents = qtys
    .split(' ')
    .map(Number)
    .reduce((a, b) => a + b);

  console.log(capacity, presents);
  if (capacity >= presents) canFit += 1;
}

console.log(canFit);

