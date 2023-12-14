const raw = await Bun.file('./input.txt').text();

const formatted = raw.split('\n\n').map((l) => l.split('\n').filter(Boolean));

function transpose(raw) {
  const mat = split(raw);
  const tMat = Array.from(Array(mat[0].length)).map(() => Array(mat[0].length));

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[i].length; ++j) tMat[j][i] = mat[i][j];

  return join(tMat);
}

function split(mat) {
  return mat.map((l) => l.split(''));
}

function join(mat) {
  return mat.map((l) => l.join(''));
}

function compareWithSmudge(first, next) {
  if (!next) return false;
  let smudges = 0;
  for (let i = 0; i < first.length; ++i) {
    if (first[i] !== next[i]) smudges += 1;
  }

  return smudges === 1;
}

function rowReflections(table) {
  let reflections = [];

  let scoer = 0;

  for (let i = 0; i < table.length; ++i) {
    if (table[i] === table[i + 1]) reflections.push([i, i + 1]);
    if (compareWithSmudge(table[i], table[i + 1])) {
      reflections.push([i, i + 1]);
    }
  }

  for (let reflection of reflections) {
    let equal = true;
    let allowForSmudge = true;

    if (reflection[1] <= (table.length - 1) / 2 || reflection[1] === table.length / 2) {
      for (let i = reflection[0], j = reflection[1]; i >= 0; --i, ++j) {
        if (allowForSmudge && compareWithSmudge(table[i], table[j])) {
          allowForSmudge = false;
          continue;
        }
        if (table[i] !== table[j]) {
          equal = false;
          break;
        }
      }
    } else if (reflection[0] >= (table.length - 1) / 2) {
      for (let i = reflection[0], j = reflection[1]; j < table.length; --i, ++j) {
        if (allowForSmudge && compareWithSmudge(table[i], table[j])) {
          allowForSmudge = false;
          continue;
        }
        if (table[i] !== table[j]) {
          equal = false;
          break;
        }
      }
    }
    if (equal && !allowForSmudge) scoer += reflection[1];
  }

  return scoer;
}

function score(input) {
  let scr = rowReflections(input) * 100;
  if (scr === 0) {
    scr = rowReflections(transpose(input));
  }
  return scr;
}

let final = 0;

formatted.forEach((input, i) => {
  final += score(input, i);
});

console.log(final);
