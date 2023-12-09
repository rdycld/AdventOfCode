const input = (await Bun.file('./input.txt').text()).split('\n').filter(Boolean);

const times = input[0]
  ?.split(/[ \t]+/)
  .filter(Number)
  .map(Number);
const records = input[1]
  ?.split(/[ \t]+/)
  .filter(Number)
  .map(Number);

const wins = [];

for (let i = 0; i < times?.length; ++i) {
  const time = times[i];

  let hold = Math.round(time / 2);
  let dist = hold * (time - hold);
  let acc = 0;

  while (dist > records[i]) {
    ++acc;
    --hold;

    dist = hold * (time - hold);
  }

  if (time % 2 === 1) {
    wins.push(2 * --acc);
  } else {
    wins.push(2 * --acc + 1);
  }
}

console.log(wins.reduce((s, v) => s * v, 1));
