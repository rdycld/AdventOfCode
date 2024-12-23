const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

function calcBinomial(size) {
  let fac = 1;
  let nmk;
  for (let i = 2; i <= size; ++i) {
    fac *= i;

    if (i + 2 === size) {
      nmk = fac;
    }
  }

  return fac / (2 * nmk);
}

let lan = {};

for (let connection of input.split("\n")) {
  const [a, b] = connection.split("-");

  if (a in lan) {
    lan[a].add(b);
  } else {
    lan[a] = new Set();
    lan[a].add(a);
    lan[a].add(b);
  }
  if (b in lan) {
    lan[b].add(a);
  } else {
    lan[b] = new Set();
    lan[b].add(a);
    lan[b].add(b);
  }
}

let parties = [];
let connections = Object.values(lan);
let partyOccurencies = {};

for (let i = 0; i < connections.length; ++i)
  for (let j = i + 1; j < connections.length; ++j) {
    let a = connections[i];
    let b = connections[j];
    let intersection = a.intersection(b);

    if (intersection.size > 2) parties.push(intersection);
  }

for (let party of parties) {
  let key = Array.from(party).sort().toString();

  if (key in partyOccurencies) {
    partyOccurencies[key] += 1;
  } else {
    partyOccurencies[key] = 1;
  }
}

for (let [k, v] of Object.entries(partyOccurencies)) {
  if (!(v === calcBinomial(k.split(",").length))) delete partyOccurencies[k];
}

console.log(partyOccurencies);

console.timeEnd("part2");
