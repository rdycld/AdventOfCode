const rawInput = await Bun.file('./example.txt').text();

const dir = ['R', 'D', 'L', 'U'];
const parsed = rawInput
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(' '))
  .map(([_, __, rawColor]) => {
    let color = rawColor.slice(2, -1);
    let range = parseInt(color.slice(0, 5), 16);
    let d = parseInt(color.slice(-1), 16);
    let output = `${dir[d]} ${range}`;
    return output;
  });

Bun.write('p2example.txt', parsed.join('\n'));
