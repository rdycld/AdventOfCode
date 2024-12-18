console.time("part1");

// const program = [0, 1, 5, 4, 3, 0];

// let registerA = 729;
let registerA = 30899381;
let registerB = 0;
let registerC = 0;
const program = [2, 4, 1, 1, 7, 5, 4, 0, 0, 3, 1, 6, 5, 5, 3, 0];

const getCombo = (operand) => {
  if (operand < 4) return operand;
  if (operand === 4) return registerA;
  if (operand === 5) return registerB;
  if (operand === 6) return registerC;

  throw "dupa";
};

let buff = "";

let iP = 0;
const foo = {
  0: (op) => {
    registerA = Math.trunc(registerA / 2 ** getCombo(op));
  },
  1: (op) => {
    registerB ^= op;
  },
  2: (op) => {
    registerB = getCombo(op) % 8;
  },
  3: (op) => {
    if (registerA) {
      iP = op - 2;
    }
  },
  4: () => {
    registerB ^= registerC;
  },
  5: (op) => {
    buff += getCombo(op) % 8 
    buff += ',' 
  },
  6: (op) => {
    registerB = Math.trunc(registerA / 2 ** getCombo(op));
  },
  7: (op) => {
    registerC = Math.trunc(registerA / 2 ** getCombo(op));
  },
};

for (; iP < program.length - 1; iP += 2) {
  let func = program[iP];
  foo[func](program[iP + 1]);
}

console.log(buff)

console.timeEnd("part1");
