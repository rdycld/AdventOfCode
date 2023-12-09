
const input = (await Bun.file('./input.txt').text()).split('\n').filter(Boolean);

function mapToTuple(map) {
  return map.split(' ').map(Number);
}

function getSeeds(input) {
  return input.split(':')[1].trim().split(' ').map(Number);
}

function isToken(val) {
  return tokens.includes(val);
}

function mapValue(value, ranges) {
  let destination = value;

  for (let i = 0; i < ranges.length; ++i) {
    const [dest, source, range] = ranges[i];

    if (value >= source && value <= source + range) {
      destination = dest - source + value;

      return destination;
    }
  }

  return destination;
}
function mapValueReverse(value, ranges) {
  for (let i = 0; i < ranges.length; ++i) {
    const [dest, source, range] = ranges[i];

    const sourceVal = value + source - dest;

    if (sourceVal >= source && sourceVal < source + range) {
      return sourceVal;
    }
  }

  return value;
}

function advance() {
  i += 1;
}

const tokens = [
  'seed-to-soil map:',
  'soil-to-fertilizer map:',
  'fertilizer-to-water map:',
  'water-to-light map:',
  'light-to-temperature map:',
  'temperature-to-humidity map:',
  'humidity-to-location map:',
];

const seedToSoilMap = [];
const soilToFertilizerMap = [];
const fertilizerToWaterMap = [];
const waterToLineMap = [];
const lightToTemperatureMap = [];
const temperatureToHumidityMap = [];
const humidityToLocationMap = [];

const tokensDict = {
  'seed-to-soil map:': seedToSoilMap,
  'soil-to-fertilizer map:': soilToFertilizerMap,
  'fertilizer-to-water map:': fertilizerToWaterMap,
  'water-to-light map:': waterToLineMap,
  'light-to-temperature map:': lightToTemperatureMap,
  'temperature-to-humidity map:': temperatureToHumidityMap,
  'humidity-to-location map:': humidityToLocationMap,
};

console.time();

const currInput = input;

const seeds = getSeeds(currInput[0]);

let i = 1;

while (i < currInput.length) {
  const line = currInput[i];
  assert(line);

  if (isToken(line)) advance();

  while (i < currInput.length) {
    const value = currInput[i];
    if (!isToken(value)) {
      tokensDict[line].push(mapToTuple(value));
      advance();
    } else {
      break;
    }
  }
}

const ranges = [];

for (let j = 0; j < seeds.length; ++j) {
  ranges.push([seeds[j], seeds[j] + seeds[++j]]);
}

i = 0;
while (true) {
  let temp = i;
  let leave = false;

  Object.values(tokensDict)
    .reverse()
    .forEach((map) => {
      temp = mapValueReverse(temp, map);
    });

  for (let j = 0; j < ranges.length; ++j) {
    const [currMin, currMax] = ranges[j];

    if (temp <= currMax && temp >= currMin) {
      console.log('out: ', temp, 'in: ', i);
      leave = true;
      break;
    }
  }

  advance();

  if (leave) break;
}

console.timeEnd();
