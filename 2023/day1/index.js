const input = await Bun.file('./input.txt').text();

const sum = input
  .split('\n')
  .filter(Boolean)
  .map((x) => x.split('').map(Number).filter(Boolean))
  .map((x) => Number('' + x[0] + x[x.length - 1]))
  .reduce((s, n) => s + n, 0);

const values = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const maxLen = 5;

const sum2 = input
  .split('\n')
  .filter(Boolean)
  .map((x) => {
    let idx = 0;
    let first = '';
    let len = 1;

    while (!first) {
      for (; len <= maxLen; len++) {
        const word = x.slice(idx, idx + len);

        if (values.includes(word)) {
          len = 1;
          first = word;
          break;
        }
      }
      ++idx;
      len = 1;
    }

    idx = x.length;
    let last = '';

    while (!last) {
      for (; len <= maxLen; len++) {
        const word = x.slice(idx - len, idx);

        if (values.includes(word)) {
          len = 1;
          last = word;
          break;
        }
      }
      --idx;
      len = 1;
    }

    const firstDigit = +first ? first : values.indexOf(first) - 8;
    const lastDigit = +last ? last : values.indexOf(last) - 8;
    return '' + firstDigit + lastDigit;
  })
  .reduce((s, v) => s + +v, 0);

console.log('part1: ', sum);
console.log('part2: ', sum2);
