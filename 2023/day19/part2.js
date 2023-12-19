const input = await Bun.file('./input.txt').text();

function last(arr) {
  return arr[arr.length - 1];
}

function swap(letter) {
  return letter === '<' ? '>=' : '<=';
}

const [workflows] = input.split('\n\n');

const system = {};

for (let wf of workflows.split('\n').filter(Boolean)) {
  const [name, rest] = wf.split('{');
  const conditions = rest.slice(0, -1).split(',');

  const set = {};
  const carryOver = [];

  for (let i = 0; i < conditions.length; ++i) {
    const cond = conditions[i];
    if (i === conditions.length - 1) {
      let newName = cond;
      while (set[newName]) newName += '-';

      set[newName] = [...carryOver.map((l) => l.replaceAll(/[<|>]/g, swap))];

      break;
    }

    const [casee, target] = cond.split(':');
    carryOver.push(casee);

    let newName = target;
    while (set[newName]) newName += '-';

    set[newName] = [
      ...carryOver.slice(0, -1).map((l) => l.replaceAll(/[<|>]/g, swap)),
      last(carryOver),
    ];
  }
  system[name] = set;
}

const paths = [];
const pathsArr = ['in'];
console.log(system['mn']);

while (pathsArr.length) {
  const path = pathsArr.pop();
  const steps = path.split('.');
  const nextSteps = Object.keys(system[steps.slice(-1)]);

  for (let step of nextSteps) {
    if (step.includes('A')) {
      paths.push(path + '.' + step);
    } else if (step.includes('R')) {
      //do nothing
    } else {
      pathsArr.push(path + '.' + step);
    }
  }
}

// console.log(paths);
const conditions = [];
for (let i = 0; i < paths.length; ++i) {
  const steps = paths[i].split('.');
  const requirements = [];

  for (let j = 0; j < steps.length - 1; ++j) {
    requirements.push(...system[steps[j]][steps[j + 1]]);
  }
  conditions.push(requirements);
}

const possibilites = [];
for (let wf of conditions) {
  const init = {
    s: {
      l: 1,
      u: 4000,
    },
    x: {
      l: 1,
      u: 4000,
    },
    m: {
      l: 1,
      u: 4000,
    },
    a: {
      l: 1,
      u: 4000,
    },
  };
  wf.forEach((condition) => {
    let target = '';
    let token = '';
    let threshold = '';

    for (let char of condition) {
      if (['s', 'x', 'm', 'a'].includes(char)) {
        target += char;
      } else if (['>', '<', '='].includes(char)) {
        token += char;
      } else {
        threshold += char;
      }
    }
    switch (token) {
      case '<':
        init[target]['u'] = +threshold - 1;
        break;
      case '>':
        init[target]['l'] = +threshold + 1;
        break;
      case '>=':
        init[target]['l'] = +threshold;
        break;
      case '<=':
        init[target]['u'] = +threshold;
        break;
    }
  });
  possibilites.push(
    Object.keys(init)
      .map((key) => 1 + (init[key]['u'] - init[key]['l']))
      .reduce((s, v) => s * v, 1),
  );
}

console.log(possibilites.reduce((s, v) => s + v));
