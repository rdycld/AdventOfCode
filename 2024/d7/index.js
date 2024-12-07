const fs = require("fs");

const example = fs.readFileSync("./example.txt", { encoding: "utf8" });
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function concat(a,b){
  return +`${a}${b}`
}

const data = input
  .split("\n")
  .map((l) => [+l.split(": ")[0], l.split(": ")[1].split(" ").map(Number)]);

const operands = [add, multiply, concat];

const valid = [];

for (let line of data) {
  const [value, numbers] = line;

  const queue = [numbers.shift()];

  while (true) {
    if (!numbers.length) break;

    let qLength = queue.length;
    let right = numbers.shift();

    for (let i = 0; i < qLength; i++) {
      let left = queue.shift();

      for (let calc of operands) {
        queue.push(calc(left, right));
      }
    }

    if (!numbers.length) {
      if (queue.includes(value)) valid.push(value);
      break;
    }
  }
}
console.log(valid.reduce((a,b)=> a+b));
