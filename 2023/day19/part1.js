const input = await Bun.file('./input.txt').text();

const [workflows, moviesRaw] = input.split('\n\n');

const comparator = {
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
};

const system = {};
const movies = [];
const accepted = [];

for (let wf of workflows.split('\n').filter(Boolean)) {
  const [name, rest] = wf.split('{');
  const conditions = rest.slice(0, -1).split(',');

  const set = [];

  for (let i = 0; i < conditions.length; ++i) {
    const cond = conditions[i];
    if (i === conditions.length - 1) {
      set.push([cond]);
      break;
    }

    set.push([cond[0], cond[1], ...cond.slice(2).split(':')]);
  }
  system[name] = set;
}

for (let movie of moviesRaw.split('\n').filter(Boolean)) {
  let tMovie = {};
  movie
    .slice(1, -1)
    .split(',')
    .map((prop) => {
      const [key, val] = prop.split('=');
      tMovie[key] = +val;
    });
  let sum = Object.values(tMovie).reduce((s, v) => s + v);
  tMovie['sum'] = sum;
  movies.push(tMovie);
}

movies.forEach((movie) => {
  let finished = false;
  let workflow = system['in'];
  let dest = 'in';

  while (!finished) {
    if (dest === 'R' || dest === 'A') {
      finished = true;
      if (dest === 'A') {
        accepted.push(movie);
      }
      break;
    }
    workflow = system[dest];
    for (let i = 0; i < workflow.length; ++i) {
      const cond = workflow[i];
      if (i === workflow.length - 1) {
        dest = cond[0];
        continue;
      }
      //threshold is still as tring
      const [key, token, threshold, newDest] = cond;

      const hasPassed = comparator[token](movie[key], +threshold);
      if (hasPassed) {
        dest = newDest;
        break;
      }
    }
  }
});
const sum = accepted.reduce((s, { sum }) => s + sum, 0);
console.log(sum);
