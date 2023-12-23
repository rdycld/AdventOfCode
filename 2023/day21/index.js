const input = await Bun.file('./input.txt').text();

const grid = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function keygen([y, x]) {
  return `${y},${x}`;
}

function fill(sy, sx, steps) {
  const seen = new Set();

  seen.add(keygen([sy, sx]));

  const ans = [];

  const q = [[sy, sx, steps]];

  while (q.length) {
    let next = q.shift();
    let [y, x, s] = next;

    if (s % 2 === 0) ans.push([y, x]);
    if (s === 0) continue;

    for (let [ny, nx] of [
      [y + 1, x],
      [y, x + 1],
      [y - 1, x],
      [y, x - 1],
    ])
      if (
        0 <= ny &&
        ny < grid.length &&
        0 <= nx &&
        nx < grid[ny].length &&
        grid[ny][nx] !== '#' &&
        !seen.has(keygen([ny, nx]))
      ) {
        seen.add(keygen([ny, nx]));
        q.push([ny, nx, s - 1]);
      }
  }

  return ans.length;
}

const part1 = fill(65,65,64)

// grid length = 131
// grid width = 131
// S = 65,65 - exact center    [0-64] 65 [66-131]
// N.o. steps = 26501365
// (26501365 - 65) / 131 = 202300
//
//
//
//                                     last fully filled↓
//                             1  2  3  4  ......   202299 202300
//             [O][E][O][E][S][E][O][E][O]           [E]   [edge]
//

//
//
//         .|.
//        .*E*.
//       .*EOE*.
//      .*EOEOE*.
//     .*EOEOEOE*.
//    .*EOEOEOEOE*.
//   .*EOEOEOEOEOE*.
//  .*EOEOEOEOEOEOE*.
// --EOEOEOESEOEOEOE--
//  .*EOEOEOEOEOEOE*.
//   .*EOEOEOEOEOE*.
//    .*EOEOEOEOE*.
//     .*EOEOEOE*.
//      .*EOEOE*.
//       .*EOE*.
//        .*E*.
//         .|.
//      7
//    7 S 7
//      7
//
//
//
//    For length N where  N is odd number there are:
//
//      there are (N+1)**2 even filled gardens
//      and         N**2 odd filled gardens
//
//
//
//    1 Righ Corner garden (65, 0, 130)
//    N top right almost filled gardens (130, 0, 195)
//    N+1 top right barely filled gardens (130, 0, 64)
//
//    1 Bottom Corner garden (0, 65, 130)
//    N bottom right almost filled gardens (0, 0, 195)
//    N+1 top right barely filled gardens (0, 0, 64)
//
//    1 Left Corner garden (65, 130, 130)
//    N bottom left almost filled gardens (130, 0, 195)
//    N+1 bottom left barely filled gardens (130, 0, 64)
//
//    1 Top Corner garden (0, 65, 130)
//    N top left almost filled gardens (130, 130, 195)
//    N+1 top left barely filled gardens (130, 130, 64)
//

const n = 202299;
const oddFilled = fill(65, 65, 195);
const evenFilled = fill(65, 65, 196);
const allOdd = n ** 2 * oddFilled;
const allEven = (n + 1) ** 2 * evenFilled;

const topCorner = fill(130, 65, 130);
const rightCorner = fill(65, 0, 130);
const leftCorner = fill(65, 130, 130);
const bottomCorner = fill(0, 65, 130);
const allCorners = topCorner + rightCorner + leftCorner + bottomCorner;

const trs = fill(130, 0, 64);
const trb = fill(130, 0, 195);

const brb = fill(0, 0, 195);
const brs = fill(0, 0, 64);

const blb = fill(0, 130, 195);
const bls = fill(0, 130, 64);

const tlb = fill(130, 130, 195);
const tls = fill(130, 130, 64);

const allSmall = (n + 1) * (trs + brs + bls + tls);
const allBig = n * (trb + brb + blb + tlb);

console.log('part1: ', part1)
console.log('part2: ', allEven + allOdd + allSmall + allBig + allCorners);
