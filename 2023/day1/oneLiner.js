const input = await Bun.file('./input.txt').text();

const p1 = input
  .split('\n')
  .filter(Boolean)
  .map((x) => x.split('').map(Number).filter(Boolean))
  .map((x) => Number('' + x[0] + x[x.length - 1]))
  .reduce((s, n) => s + n, 0);

const p2 = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.replaceAll('one', 'o1e'))
  .map((l) => l.replaceAll('two', 't2o'))
  .map((l) => l.replaceAll('three', 'th3ee'))
  .map((l) => l.replaceAll('four', 'fo4r'))
  .map((l) => l.replaceAll('five', 'fi5e'))
  .map((l) => l.replaceAll('six', '6ix'))
  .map((l) => l.replaceAll('seven', 'se7en'))
  .map((l) => l.replaceAll('eight', 'ei8ht'))
  .map((l) => l.replaceAll('nine', 'n9ne'))
  .map((x) => x.split('').map(Number).filter(Boolean))
  .map((x) => Number('' + x[0] + x[x.length - 1]))
  .reduce((s, n) => s + n, 0);

console.log('part1: ', p1);
console.log('part2: ', p2);
