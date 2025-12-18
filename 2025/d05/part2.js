const fs = require('fs');

const [ranges] = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n\n');

let przedzialy = [];

const areRangesIntersecting = (a, b) => {
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;

  if (bStart <= aStart && aStart <= bEnd) return true;
  if (aStart <= bStart && bStart <= aEnd) return true;
  return false;
};

const addRanges = (a, b) => {
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;

  return [Math.min(aStart, bStart), Math.max(aEnd, bEnd)];
};

for (const range of ranges.split('\n')) {
  const [start, end] = range.split('-').map(Number);

  przedzialy.push([start, end]);
}

let visitedCounter = 0;
let initDlugosc = przedzialy.length;
while (true) {
  let range = przedzialy.pop();
  visitedCounter++;

  let somtingChanged = false;

  przedzialy = przedzialy.filter((el) => {
    if (areRangesIntersecting(range, el)) {
      somtingChanged = true;
      range = addRanges(range, el);
      return false;
    }
    return true;
  });
  przedzialy.unshift(range);

  if (!somtingChanged && visitedCounter >= initDlugosc) break;
}

console.log(przedzialy.reduce((a, [aa, aaa]) => a + (aaa - aa) + 1, 0));

