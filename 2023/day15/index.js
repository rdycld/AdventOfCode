const data = await Bun.file('./input.txt').text();

const input = data.split(/\n|,/).filter(Boolean);

function calcP1(p, val) {
  let hash = 0;

  for (let letter of val) {
    hash += letter.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }

  return p + hash;
}

function calc(val) {
  let hash = 0;

  let info = val.split(/=|-/);

  for (let letter of info[0]) {
    hash += letter.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }

  return [info, hash, val.includes('=')];
}

let boxes = Array.from({ length: 256 }, () => Array(0));

input.forEach((val) => {
  let [lens, boxIdx, shouldAdd] = calc(val);
  let box = boxes[boxIdx];
  let exists = box.findIndex((el) => el[0] === lens[0]);

  let op = exists === -1;
  box[shouldAdd && op ? 'push' : 'splice'](
    ...(shouldAdd ? (op ? [lens] : [exists, 1, lens]) : [op ? 0 : exists, +!op]),
  );
});

let p1 = input.reduce(calcP1, 0);
let p2 = boxes.reduce((s, a, i) => s + a.reduce((s, v, ii) => s + v[1] * ++ii * ++i, 0), 0);

console.log(p1);
console.log(p2);
