const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split(',')
  .map((el) => el.split('-').map(Number));

let sum = 0;


for (const range of data) {
  const [start, end] = range;

  for (let i = start; i <= end; ++i) {
    const stringifed = i.toString();

    if (stringifed.length % 2 !== 0) continue;

    const left = stringifed.slice(0, stringifed.length / 2);
    const right = stringifed.slice(stringifed.length / 2);
    if(left === right){
      sum+=i
    }
  }
}

console.log(sum)
