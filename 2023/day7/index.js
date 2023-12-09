const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const cards2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

function getScore(hand, part2) {
  const cards = {};

  hand[0].split('').forEach((card) => {
    if (!cards[card]) {
      cards[card] = 1;
    } else {
      cards[card] += 1;
    }
  });

  const keys = Object.keys(cards);
  const values = Object.values(cards);

  if (keys.length === 1) return [...hand, 6];

  const jokers = part2 ? cards['J'] : false;

  if (keys.length === 2 && values.includes(4)) return [...hand, jokers ? 6 : 5];

  if (keys.length === 2) return [...hand, jokers ? 6 : 4];

  if (keys.length === 3 && values.includes(3)) return [...hand, jokers ? 5 : 3];

  if (keys.length === 3)
    return jokers === 2 ? [...hand, 5] : jokers === 1 ? [...hand, 4] : [...hand, 2];

  if (keys.length === 4) return [...hand, jokers ? 3 : 1];

  return [...hand, jokers ? 1 : 0];
}

function sortHands([handA, , scoreA], [handB, , scoreB], part2) {
  if (scoreA !== scoreB) return scoreA - scoreB;

  let i = 0;

  while (i < 5) {
    const cardA = handA[i];
    const cardB = handB[i];

    if (cardA === cardB) {
      ++i;
    } else {
      return part2
        ? cards2.indexOf(cardA) - cards2.indexOf(cardB)
        : cards.indexOf(cardA) - cards.indexOf(cardB);
    }
  }
  return 0;
}
const input = await Bun.file('./input.txt').text();

const part2 = true;

const hands = input
  .split('\n')
  .map((hand) => [...hand.split(' ')])
  .filter((x) => x.length > 1)
  .map((x) => getScore(x, part2))
  .toSorted((a, b) => sortHands(a, b, part2))
  .reduce((s, v, i) => s + +v[1] * (i + 1), 0);

console.log(hands);
