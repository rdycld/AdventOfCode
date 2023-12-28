const input = await Bun.file('./input.txt').text();

//
//  Px = sx + t*dx
//  Py = sy + d*dy
//
//  t*dx = Px-sx -> t = (Px - sx)/dx
//  t*dy = Py-sy -> t = (Py - sy)/dy
//
//  (Px - sx)/dx = (Py - sy)/dy -> dy(Px - sx) = dx(Py - sy) -> dy*Px - dy*sx = dx*Py - dx*sy ->
// -> dy*Px - dx*Py = dy*sx - dx*sx
//
const hailstones = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(', ').map(Number));

function getIntersection(a, b) {
  const [ax, ay, az, avx, avy, avz] = a;
  const [bx, by, bz, bvx, bvy, bvz] = b;

  const aA = avy;
  const aB = -avx;
  const aC = avy * ax - avx * ay;

  const bA = bvy;
  const bB = -bvx;
  const bC = bvy * bx - bvx * by;

  if (aA * bB === bA * aB) return 0;

  const X = (aC * bB - bC * aB) / (aA * bB - bA * aB);
  const Y = (bC * aA - aC * bA) / (aA * bB - bA * aB);

  if (200000000000000 <= X && 200000000000000 <= Y && X <= 400000000000000 && Y <= 400000000000000)
    if ((X - ax) * avx >= 0 && (Y - ay) * avy >= 0 && (X - bx) * bvx >= 0 && (Y - by) * bvy >= 0)
      return 1;
  return 0;
}

let total = 0;

for (let i = 0; i < hailstones.length; ++i)
  for (let j = 0; j < i; ++j) total += getIntersection(hailstones[i], hailstones[j]);

console.log(total);
