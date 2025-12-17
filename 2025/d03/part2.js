const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((el) => el.split('').map(Number));

let s = 0;
for (const bo of data) {
  let o = -11;
  const b0 = bo.slice(0, o++);
  const m0 = Math.max(...b0);
  const b1 = bo.slice(bo.indexOf(m0) + 1);
  const m1 = Math.max(...b1.slice(0, o++));
  const b2 = b1.slice(b1.indexOf(m1) + 1);
  const m2 = Math.max(...b2.slice(0, o++));
  const b3 = b2.slice(b2.indexOf(m2) + 1);
  const m3 = Math.max(...b3.slice(0, o++));
  const b4 = b3.slice(b3.indexOf(m3) + 1);
  const m4 = Math.max(...b4.slice(0, o++));
  const b5 = b4.slice(b4.indexOf(m4) + 1);
  const m5 = Math.max(...b5.slice(0, o++));
  const b6 = b5.slice(b5.indexOf(m5) + 1);
  const m6 = Math.max(...b6.slice(0, o++));
  const b7 = b6.slice(b6.indexOf(m6) + 1);
  const m7 = Math.max(...b7.slice(0, o++));
  const b8 = b7.slice(b7.indexOf(m7) + 1);
  const m8 = Math.max(...b8.slice(0, o++));
  const b9 = b8.slice(b8.indexOf(m8) + 1);
  const m9 = Math.max(...b9.slice(0, o++));
  const ba = b9.slice(b9.indexOf(m9) + 1);
  const ma = Math.max(...ba.slice(0, o++));
  const bb = ba.slice(ba.indexOf(ma) + 1);
  const mb = Math.max(...bb);
  s += +`${m0}${m1}${m2}${m3}${m4}${m5}${m6}${m7}${m8}${m9}${ma}${mb}`;
}
console.log(s);

