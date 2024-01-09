const input = (await Bun.file('./input.txt').text()).split('\n').filter(Boolean);

const currInput = input;

function part1() {
  const sum = (a, b) => +a + +b;

  const table = currInput;

  const values = [];

  for (let i = 0; i < table.length; ++i) {
    for (let j = 0; j < table[i].length; ++j) {
      let char = table[i][j];
      let val = '';
      let isValid = false;
      let isNum = char && char.match(/[0-9]/);

      while (isNum) {
        val += char;

        for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, table.length - 1); ++k) {
          for (let m = Math.max(j - 1, 0); m < Math.min(j + 2, table[i].length - 1); ++m) {
            if (table[k][m].match(/[^0-9.]/)) isValid = true;
          }
        }
        isNum = table[i]?.[j + 1] && table[i][j + 1].match(/[0-9]/);

        if (isNum) {
          ++j;
          char = table[i][j];
        }
      }
      if (isValid) values.push(val);
    }
  }

  console.log(values.reduce(sum));
}

function part2() {
  const table = currInput;

  const values = [];

  for (let i = 0; i < table.length; ++i) {
    for (let j = 0; j < table[i].length; ++j) {
      let char = table[i][j];
      let val = '';
      let star = '';
      let isValid = false;
      let isNum = char && char.match(/[0-9]/);

      while (isNum) {
        val += char;

        for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, table.length - 1); ++k) {
          for (let m = Math.max(j - 1, 0); m < Math.min(j + 2, table[i].length - 1); ++m) {
            if (table[k][m].match(/[*]/)) {
              isValid = true;
              star = k + ' ' + m;
            }
          }
        }
        isNum = table[i]?.[j + 1] && table[i][j + 1].match(/[0-9]/);

        if (isNum) {
          ++j;
          char = table[i][j];
        }
      }
      if (isValid) values.push({ val, star });
    }
  }

  function sort({ star: starA }, { star: starB }) {
    const [a, b] = starA.split(' ');
    const [a1, b1] = starB.split(' ');

    return a === a1 ? +b - +b1 : +a - +a1;
  }

  function sum(s, v, i, a) {
    return s + (a[i + 1] ? (v.star === a[i + 1].star ? v.val * a[i + 1].val : 0) : 0);
  }

  console.log(values.toSorted(sort).reduce(sum, 0));
}
part1();
part2();
