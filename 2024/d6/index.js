const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const tab = input.split("\n").map((l) => l.split(""));

const lineLenght = input.indexOf("\n");
const startIdx = input.indexOf("^");
const sy = Math.floor(startIdx / (lineLenght + 1));
const sx = startIdx % (lineLenght + 1);

// vecs [dy, dx]
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function visit(y, x) {
  tab[y][x] = "X";
}

function nextDir(dir) {
  return (dir + 1) % dirs.length;
}

let pos = [sy, sx];
let dir = 0;

visit(sy, sx);

while (true) {
  let [y, x] = pos;
  let [dy, dx] = dirs[dir];
  let [ny, nx] = [y + dy, x + dx];

  if (ny === tab.length || ny < 0 || nx === tab[0].length || nx < 0) break;

  let next = tab[ny][nx];

  if (next !== "#") {
    visit(ny, nx);
    pos = [ny, nx];
    continue;
  }
  dir = nextDir(dir);
}

const p1 = tab.flatMap((l) => l).filter((x) => x === "X").length;
console.log(p1);

const tab2 = input.split("\n").map((l) => l.split(""));