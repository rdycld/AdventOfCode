const input = await Bun.file('./input.txt').text();

class PriorityQ {
  q = [];

  // constructor(val) {
  //   this.q.push(val);
  // }

  add(val) {
    let idx = 0;
    if (!this.q.length) {
      this.q.push(val);
      return;
    }
    for (; idx < this.q.length; ++idx) {
      if (this.q[idx][0] >= val[0]) break;
    }
    this.q.splice(idx, 0, val);
  }

  pop() {
    return this.q.shift();
  }

  get length() {
    return this.q.length;
  }
}

function keygen([, r, c, dr, dc, n]) {
  return `${r},${c},${dr},${dc},${n}`;
}

const grid = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split('').map((x) => +x));

const width = grid[0].length;
const height = grid.length;

const seen = new Set();
const pq = new PriorityQ();

pq.add([0, 0, 0, 0, 0, 0]);

while (pq.length) {
  const slot = pq.pop();

  const [hl, r, c, dr, dc, n] = slot;

  if (r + 1 === height && c + 1 === width && n >= 4) {
    console.log(hl);
    break;
  }

  const key = keygen(slot);

  if (seen.has(key)) continue;

  seen.add(key);

  if (n < 10 && (dc !== 0 || dr !== 0)) {
    let nr = r + dr;
    let nc = c + dc;

    if (0 <= nr && nr < height && 0 <= nc && nc < width)
      pq.add([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
  }

  if (n >= 4 || dr + dc === 0)
    for (let [ndr, ndc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      if (!(ndr === dr && ndc === dc) && !(ndr === -dr && ndc === -dc)) {
        let nr = r + ndr;
        let nc = c + ndc;

        if (0 <= nr && nr < height && 0 <= nc && nc < width)
          pq.add([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
      }
    }
}
