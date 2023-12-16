const input = await Bun.file('./input.txt').text();


const p1 = Math.max(...input.split('\n\n').map(l => l.split('\n').reduce((s,v)=> s + +v,0)))
const p2 = input.split('\n\n').map(l => l.split('\n').reduce((s,v)=> s + +v,0)).sort((a,b) => b-a).slice(0,3).reduce((s,v)=>s+v)
console.log('part1: ', p1)
console.log('part2: ',p2)




