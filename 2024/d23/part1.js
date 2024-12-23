const fs = require("fs");

console.time("part1");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

let lan = {};

for (let connection of input.split("\n")) {
  const [a, b] = connection.split("-");

  if (a in lan) {
    lan[a].push(b);
  } else {
    lan[a] = [b];
  }
  if (b in lan) {
    lan[b].push(a);
  } else {
    lan[b] = [a];
  }
}

let parties = new Set();

for (let [host, connections] of Object.entries(lan)) {
  if (!host.startsWith("t")) continue;



  for (let i = 0; i < connections.length; ++i)
    for (let j = i + 1; j < connections.length; ++j) {
      let a = connections[i];
      let b = connections[j];

      if(lan[a].includes(b))
      parties.add([host,a,b].sort().join())

  }
}

console.log(parties.size)

console.timeEnd("part1");
