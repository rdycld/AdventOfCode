const d = await Bun.file('./input.txt').text();

const i = d.split(/\n|,/).filter(Boolean);

function c1(v, p = false) {
  let h = 0;

  let i = v.split(/-|=/);

  for (let l of p ? i[0] : v) {
    h += l.charCodeAt(0);
    h *= 17;
    h %= 256;
  }

  return p ? [i, h, v.includes('=')] : h;
}

let bs = Array.from({ length: 256 }, () => Array(0));

i.forEach((val) => {
  let [l, bI, sa] = c1(val, true);
  let b = bs[bI];
  let e = b.findIndex((el) => el[0] === l[0]);

  let op = e !== -1;
  b[sa && !op ? 'push' : 'splice'](...(sa ? (!op ? [l] : [e, 1, l]) : [e, +op]));
});

let p1 = i.reduce((s, v) => s + c1(v), 0);
let p2 = bs.reduce((s, a, i) => s + a.reduce((s, v, ii) => s + +v[1] * (ii + 1) * (i + 1), 0), 0);
console.log(p1);
console.log(p2);
