const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((el) => el.split('').map(Number));

let sum = 0;

for (const bank of data) {
  const base = bank.slice(0, -1);
  const max = Math.max(...base);
  const tail = Math.max(...bank.slice(bank.indexOf(max) + 1));

  sum += 1e1 * max + tail;
}


console.log(sum)