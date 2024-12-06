const fs = require("fs");

const input = fs.readFileSync("./d4.txt", { encoding: "utf8" });

const table = input.split("\n").map((l) => l.split(""));

function check(sx, sy, dx = 0, dy = 0, tab) {
  const x = tab[sx][sy];
  const m = tab[sx + dx]?.[sy + dy];
  const a = tab[sx + 2 * dx]?.[sy + 2 * dy];
  const s = tab[sx + 3 * dx]?.[sy + 3 * dy];

  return +(`${x}${m}${a}${s}` === "XMAS");
}

const dirs = [
  [0, 1], // down
  [-1, 1], // down left
  [-1, 0], // left
  [-1, -1], // up left
  [0, -1], // up
  [1, -1], // up right
  [1, 0], // right
  [1, 1], // down right
];

let p1 = 0;
for (let i = 0; i < table.length; i++) {
  for (let j = 0; j < table[0].length; j++) {
    for (let dir of dirs) {
      p1 += check(j, i, ...dir, table);
    }
  }
}

console.log(p1);

function check2(sx, sy, tab) {
  const isA = tab[sy][sx] === "A";
  if (!isA) return 0;

  const ul = tab[sy - 1][sx - 1];
  const ur = tab[sy - 1][sx + 1];
  const bl = tab[sy + 1][sx - 1];
  const br = tab[sy + 1][sx + 1];

  return +["MMSS", "MSSM", "SSMM", "SMMS"].includes(`${ul}${ur}${br}${bl}`);
}

let p2 = 0;
for (let i = 1; i < table.length -1; i++) {
  for (let j = 1; j < table[0].length -1; j++) {
    p2 += check2(j, i, table);
  }
}

console.log(p2);




