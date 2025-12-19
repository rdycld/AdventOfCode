const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const getDiagramValue = (diagram) =>
  parseInt(diagram.slice(1, -1).replaceAll('.', '0').replaceAll('#', 1), 2);

const getButtonValue = (button, length) => {
  const arr = Array.from({ length }, () => 0);
  const b = button.slice(1, -1).split(',');
  for (const key of b) arr[key] = 1;
  return parseInt(arr.join(''), 2);
};

let globalSum = 0;

for (const machine of data) {
  const config = machine.split(' ');

  const [diagram] = config.splice(0, 1);
  const buttons = config.slice(0, -1);

  const diagramValue = getDiagramValue(diagram);

  const buttonValues = [];

  for (const button of buttons)
    buttonValues.push(getButtonValue(button, diagram.length - 2));

  const scenarios = new Map();

  let minFound = Infinity;
  for (const buttonValue of buttonValues) {
    if (scenarios.size === 0) {
      if (buttonValue === diagramValue) minFound = 1;

      scenarios.set(`${buttonValue}`, [buttonValue, 1]);
      scenarios.set(`_`, [0, 0]);
      continue;
    }

    for (const [key, [scenarioValue, buttonsClicked]] of [
      ...scenarios.entries(),
    ]) {
      const nextValue = scenarioValue ^ buttonValue;

      if (nextValue === diagramValue && buttonsClicked < minFound)
        minFound = buttonsClicked + 1;

      if (buttonsClicked < minFound) {
        scenarios.set(`${key},${buttonValue}`, [nextValue, buttonsClicked + 1]);
        scenarios.set(`${key},_`, [scenarioValue, buttonsClicked]);
      }
    }
  }
  globalSum += minFound;
}
console.log(globalSum);

