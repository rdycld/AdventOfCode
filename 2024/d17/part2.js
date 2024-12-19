console.time("part2");
//                           [4]/5/6
//                           V  /4: [5],[6] | /5: 2,5,6 | 6:3,6
//                           V V .         2/7
const digits = [ 7,0,2,6,4,2,5,2,3,6,5,1,4,2,7,2].reverse();
// found it manually :>
const offset = ''

let calcInput = (() => {
  let v = 0;

  for (let i = 0; i < digits.length; ++i) {
    v += digits[i] * 8 ** i;
  }

  return v;
})();

let registerA = BigInt(calcInput);
let registerB = BigInt(0);
let registerC = BigInt(0);
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
      registerA = BigInt(registerA / BigInt(BigInt(2) ** BigInt(getCombo(op))));
    },
    1: (op) => {
      registerB ^= BigInt(op);
    },
    2: (op) => {
      registerB = BigInt(getCombo(op) % BigInt(8));
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
      buff += getCombo(op) % BigInt(8);
      buff += ",";
    },
    6: (op) => {
      registerB = BigInt(registerA / BigInt(BigInt(2) ** BigInt(getCombo(op))));
    },
    7: (op) => {
      registerC = BigInt(registerA / BigInt(BigInt(2) ** BigInt(getCombo(op))));
    },
  };

  for (; iP < program.length - 1; iP += 2) {
    let func = program[iP];
    foo[func](program[iP + 1]);
  }

  console.log(offset + buff);
  console.log("2,4,1,1,7,5,4,0,0,3,1,6,5,5,3,0");
  console.log(buff.replaceAll(",", "").length);

console.timeEnd("part2");
