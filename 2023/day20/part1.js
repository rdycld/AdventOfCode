const input = await Bun.file('./input.txt').text();

const contraptionData = input
  .split('\n')
  .filter(Boolean)
  .sort((a, b) => {
    return a.includes('&')
      ? -1
      : b.includes('&')
        ? 1
        : a.includes('%')
          ? -1
          : b.includes('%')
            ? 1
            : 0;
  });

const contraption = {};

function addThingy(str) {
  const [module, target] = str.split(' -> ');

  if (module === 'broadcaster') {
    const broadcaster = {
      type: 'bc',
      t: [],
    };
    for (let t of target.split(',')) broadcaster.t.push(t.trim());
    contraption['bc'] = broadcaster;
    return;
  }

  const [type, ...name] = module;

  if (type === '%') {
    const ff = {
      type: 'ff',
      s: false,
      t: [],
    };
    for (let t of target.split(',')) {
      ff.t.push(t.trim());

      if (contraption[t.trim()] && contraption[t.trim()].type === 'cj') {
        contraption[t.trim()][name.join('')] = false;
      }
    }
    contraption[name.join('')] = ff;
    return;
  }

  if (type === '&') {
    const cj = {
      type: 'cj',
      t: [],
    };
    for (let t of target.split(',')) cj.t.push(t.trim());
    contraption[name.join('')] = cj;
  }
}

contraptionData.forEach((l) => addThingy(l));

const q = [];

let high = 0;
let low = 0;
for (let i = 0; i < 1000; ++i) {
  q.push(['bc', false]);

  while (q.length) {
    const [t, pulse, f] = q.shift();
    if (pulse) {
      high += 1;
    } else {
      low += 1;
    }

    const module = contraption[t];
    if (!module) {
      continue;
    }

    const type = module.type;

    if (type === 'ff') {
      if (pulse) {
        if (!q.length && i < 999) {
          ++i;
          q.push(['bc', false]);
        }
        continue;
      }
      if (!module.s && !pulse) {
        module.s = true;

        for (let target of module.t) {
          q.push([target, true, t]);
        }
        continue;
      }
      if (module.s && !pulse) {
        module.s = false;

        for (let target of module.t) {
          q.push([target, false, t]);
        }
        continue;
      }
    }

    if (type === 'cj') {
      module[f] = pulse;
      const { type, t: _, ...rest } = module;

      if (Object.values(rest).every(Boolean)) {
        for (let target of module.t) {
          q.push([target, false, t]);
        }
      } else {
        for (let target of module.t) {
          q.push([target, true, t]);
        }
      }
      continue;
    }

    if (type === 'bc') {
      for (let target of module.t) {
        q.push([target, pulse]);
      }
    }
  }
}

console.log(high * low);
