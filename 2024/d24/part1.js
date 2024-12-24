const fs = require("fs");

console.time("part2");
const input = fs
  .readFileSync("./input.txt", { encoding: "utf8" })
  .split("\n\n");

const wires = {};

for (let wire of input[0].split("\n")) {
  let [name, value] = wire.split(": ");

  wires[name] = +value;
}

let q = [];

for (let gate of input[1].split("\n")) {
  const [left, type, right, , outTo] = gate.split(" ");
  q.push({
    inAFrom: left,
    inBFrom: right,
    inA: undefined,
    inB: undefined,
    type,
    outTo,
    out: undefined,
  });
}

let system = {};

while (q.length) {
  let gate = q.shift();

  if (gate.inA === undefined && gate.inAFrom in wires) {
    gate.inA = wires[gate.inAFrom];
  }

  if (gate.inB === undefined && gate.inBFrom in wires) {
    gate.inB = wires[gate.inBFrom];
  }

  if (typeof gate.inA === "number" && typeof gate.inB === "number") {
    switch (gate.type) {
      case "OR":
        gate.out = gate.inA | gate.inB;
        break;
      case "AND":
        gate.out = gate.inA & gate.inB;
        break;
      case "XOR":
        gate.out = gate.inA ^ gate.inB;
        break;
    }

    system[gate.outTo] = gate.out;
    continue;
  }

  if (gate.inA === undefined && gate.inAFrom in system) {
    gate.inA = system[gate.inAFrom];
  }
  if (gate.inB === undefined && gate.inBFrom in system) {
    gate.inB = system[gate.inBFrom];
  }

  q.push(gate);
}
console.log(
  Object.entries(system)
    .filter((el) => el[0].includes("z"))
    .sort()
    .reverse()
    .map((el) => el[1])
    .join("")
);

console.timeEnd("part2");
