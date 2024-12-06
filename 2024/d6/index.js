const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const tab = input.split("\n").map((l) => l.split(""));

const lineLenght = input.indexOf("\n")+1
const startIdx = input.indexOf("^");
const sy = Math.floor(startIdx / lineLenght);
const sx = startIdx % lineLenght;

// vecs [dy, dx]
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function nextDir(dir) {
  return (dir + 1) % dirs.length;
}

let pos = [sy, sx];
let dir = 0;

const route = {};

tab[sy][sx] = "X";

while (true) {
  let [y, x] = pos;
  let [dy, dx] = dirs[dir];
  let [ny, nx] = [y + dy, x + dx];

  if (ny === tab.length || ny < 0 || nx === tab[0].length || nx < 0) break;

  let next = tab[ny][nx];

  if (next !== "#") {
    tab[ny][nx] = "X";
    route[`${ny}-${nx}`] = true;
    pos = [ny, nx];
    continue;
  }
  dir = nextDir(dir);
}

const p1 = tab.flatMap((l) => l).filter((x) => x === "X").length;
console.log(p1);

let cycles = 0;

for (let point of Object.keys(route)) {
  let tab = input.split("\n").map((l) => l.split(""));
  const [y, x] = point.split("-");

  tab[y][x] = "#";

  let pos = [sy, sx];
  let dir = 0;
  let cache = {};

  while (true) {
    let [y, x] = pos;
    let [dy, dx] = dirs[dir];
    let [ny, nx] = [y + dy, x + dx];

    if (ny === tab.length || ny < 0 || nx === tab[0].length || nx < 0) break;

    let next = tab[ny][nx];
    let key = `${ny}-${nx}-${dir}`;

    if (cache[key]) {
      cycles++;
      break;
    }

    if (next !== "#") {
      cache[key] = true;
      pos = [ny, nx];
      continue;
    }

    dir = nextDir(dir);
  }
}

console.log(cycles)