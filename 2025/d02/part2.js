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

    let areSame = false;
    for (let d = 1; d < stringifed.length; ++d) {
      const reminder = stringifed.length % d;

      if (reminder !== 0) continue;

      const reference = stringifed.slice(0, d);

      let _areSame = true;
      for (let i = 1; i * d < stringifed.length; ++i) {
        const nextPart = stringifed.slice(i * d, (i + 1) * d);

        if (nextPart !== reference) {
          _areSame = false;
          break;
        }
      }

      if (_areSame) {
        areSame = true;
        break;
      }
    }

    if (areSame) sum += i;
  }
}

console.log(sum);

