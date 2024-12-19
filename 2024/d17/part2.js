console.time("part2");
//                           [4]/5/6
//                           V  /4: [5],[6] | /5: 2,5,6 | 6:3,6
//                           V V              V-2/7
// const digits = [ 7,0,2,6,4,2,5,2,3,6,5,1,4,2,7,2].reverse();
// found it manually :>

let octArrToDec = (digits) => {
  let d = digits.toReversed();
  let v = 0;
  for (let i = 0; i < d.length; ++i) {
    v += d[i] * 8 ** i;
  }
  return BigInt(v);
};

let registerA = 0n;
let registerB = 0n;
let registerC = 0n;
const program = [2, 4, 1, 1, 7, 5, 4, 0, 0, 3, 1, 6, 5, 5, 3, 0];

const getCombo = (operand) => {
  if (operand < 4) return BigInt(operand);
  if (operand === 4) return registerA;
  if (operand === 5) return registerB;
  if (operand === 6) return registerC;

  throw "err";
};

let buffer = "";

let iP = 0;
const functions = {
  0: (op) => {
    registerA /= 2n ** getCombo(op);
  },
  1: (op) => {
    registerB ^= BigInt(op);
  },
  2: (op) => {
    registerB = getCombo(op) % 8n;
  },
  3: (op) => {
    if (registerA) iP = op - 2;
  },
  4: () => {
    registerB ^= registerC;
  },
  5: (op) => {
    buffer += getCombo(op) % 8n;
  },
  6: (op) => {
    registerB = registerA / 2n ** getCombo(op);
  },
  7: (op) => {
    registerC = registerA / 2n ** getCombo(op);
  },
};

function run() {
  for (iP = 0; iP < program.length - 1; iP += 2)
    functions[program[iP]](program[iP + 1]);

  let b = buffer;
  buffer = "";
  return b;
}

let digits = [];
let desiredOutput = program.join("");

main: while (true) {
  digits.push(-1);

  while (true) {
    digits[digits.length - 1] += 1;

    if (digits[digits.length - 1] === 8) {
      digits.pop();
      continue;
    }

    registerA = octArrToDec(digits);

    let output = run();

    if (desiredOutput === output) {
      console.log(digits);
      console.log("found: ", octArrToDec(digits));
      break main;
    }

    console.log(digits);
    if (output.length && desiredOutput.endsWith(output)) break;
  }
}

console.timeEnd("part2");
