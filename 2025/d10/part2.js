const fs = require('fs');

const data = fs.readFileSync('./example.txt', { encoding: 'utf8' }).split('\n');

const getJoltageArr = (joltage) => joltage.slice(1, -1).split(',').map(Number);

const getButtonArr = (button, length) => {
  const arr = Array.from({ length }, () => 0);
  const b = button.slice(1, -1).split(',');

  const buttonIndicies = new Set();
  for (const key of b) {
    buttonIndicies.add(+key);
    arr[key] = -1;
  }

  return [arr, buttonIndicies];
};

let buttonArrs = [];

const cache = new Map();

const cacheKeyGen = (node, button) => {
  return `${node.value.join('_')}-${button.join('_')}`;
};

let counter = 0;
console.time('elapsed');
class Node {
  depth;
  value;
  children = [];
  parent;
  isLeaf;
  isRoot;
  isSolution;
  lowestSolutionFound = Infinity;
  solvedIndicies = new Set();
  key;

  constructor(parent, button = []) {
    // we are at root
    const [buttonArray] = button;
    if (!buttonArray && !(parent instanceof Node)) {
      this.depth = 0;
      this.value = parent;
      this.isRoot = true;
      this.parent = null;
    } else {
      // we are not at root
      counter += 1;
      console.log(counter)
      this.lowestSolutionFound = parent.lowestSolutionFound;
      this.depth = parent.depth + 1;
      this.isRoot = false;
      this.parent = parent;

      this.key = cacheKeyGen(parent, buttonArray);

      const cacheHit = cache.get(this.key);

      if (cacheHit && cacheHit <= this.depth) {
        return;
      }
      cache.set(this.key, this.depth);

      if (this.depth + 1 >= this.lowestSolutionFound) {
        return;
      }

      const optimisticScenario = Math.max(...this.parent.value);
      if (optimisticScenario + this.depth >= this.lowestSolutionFound) {
        return;
      }

      const [afterPressValue, afterPressState] = this.pressButton(
        parent.value,
        buttonArray
      );

      afterPressValue.forEach((v, i) => {
        if (v === 0) this.solvedIndicies.add(i);
      });

      this.value = afterPressValue;

      if (afterPressState === 'overflow') {
        this.isLeaf = true;
        this.depth = Infinity;
        return;
      }

      if (afterPressState === 'solution') {
        this.isLeaf = true;
        this.isSolution = true;

        this.propagateSolution(this.depth);

        return;
      }
    }

    for (const btn of buttonArrs) {
      const [, buttonIndicies] = btn;
      const areDisjoined = this.solvedIndicies.isDisjointFrom(buttonIndicies);

      if (!areDisjoined) continue;

      this.children.push(new Node(this, btn));
    }
  }

  propagateSolution = (solutionDepth) => {
    if (solutionDepth < this.lowestSolutionFound) {
      this.lowestSolutionFound = solutionDepth;

      if (this.parent) this.parent.propagateSolution(solutionDepth);

      this.children.forEach((child) => child.propagateSolution(solutionDepth));
    }
  };

  pressButton = (arrA, arrB) => {
    const summedArr = [];
    let oveflow = false;
    let allZeros = true;

    for (let i = 0; i < arrA.length; ++i) {
      const sum = arrA[i] + arrB[i];
      if (sum < 0) oveflow = true;
      if (sum > 0) allZeros = false;
      summedArr[i] = sum;
    }

    if (oveflow) return [summedArr, 'overflow'];

    if (allZeros) return [summedArr, 'solution'];

    return [summedArr, 'progress'];
  };
}

const answs = [];
for (const machine of data) {
  cache.clear();
  const config = machine.split(' ');

  const buttons = config.slice(1, -1);
  const [joltage] = config.slice(-1);

  const joltageArr = getJoltageArr(joltage);

  buttonArrs = [];
  for (const button of buttons) {
    buttonArrs.push(getButtonArr(button, joltageArr.length));
  }

  const tree = new Node(joltageArr);

  answs.push(tree.lowestSolutionFound);
  console.log(counter);
  counter = 0;
}

console.log(
  answs,
  answs.reduce((a, b) => a + b)
);

console.timeEnd('elapsed');

