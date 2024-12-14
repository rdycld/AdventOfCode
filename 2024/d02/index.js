const fs = require("fs");

const data = fs.readFileSync("./d2.txt", { encoding: "utf8" }).split("\n");
const p1 = data.reduce((acc, val) => {
  //todo :>



}, 0);

console.log(p1);

const p2 = data.reduce((acc, val) => {
  const inputs = val.split(" ");

  let safe = 1;
  for (let i = 0; i < inputs.length; i++) {
    safe = 1;
    let sliced = [...inputs.slice(0, i), ...inputs.slice(i + 1)];

    let increasing = +sliced[0] < +sliced[1];

    for (let j = 0; j < sliced.length - 1; j++) {
      const diff = Math.abs(sliced[j] - sliced[j + 1]);
      const _increasing = +sliced[j] < +sliced[j + 1];

      if (diff === 0 || diff > 3 || increasing !== _increasing) {
        safe = 0;
      }
    }
    if (safe) {
      break;
    }
  }
  return acc + safe;
}, 0);

console.log(p2);
