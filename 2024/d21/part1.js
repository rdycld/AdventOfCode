const fs = require("fs");

console.time("part2");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

/**
 *
 * +---+---+---+
 * | 7 | 8 | 9 |
 * +---+---+---+
 * | 4 | 5 | 6 |
 * +---+---+---+
 * | 1 | 2 | 3 |
 * +---+---+---+
 *     | 0 | A |
 *     +---+---+
 *
 *
 *     +---+---+
 *     | ^ | A |
 * +---+---+---+
 * | < | v | > |
 * +---+---+---+
 * 029A; 
 */

/*
540A
582A
169A
593A
579A

*/


const numpadMoves = {
  'A-0':'<',
  '0-2':'^',
  '2-9':'>^^',
  '9-A':'vvv'

  // 'A-5':'uul',
  // '5-4':'l',
  // '4-0':'rdd',
  // '0-A':'r'
}

const directionMoves = {
  'A-^':'<',
  'A-<':'v<<',
  'A-v':'<v',
  'A->':'v',
  'A-A':'',
  '^-^':'',
  '^-<':'v<',
  '^-v':'v',
  '^->':'v>',
  '^-A':'>',
  '<-^':'>^',
  '<-<':'',
  '<-v':'>',
  '<->':'>>',
  '<-A':'>>^',
  '>-^':'<^',
  '>-<':'<<',
  '>-v':'<',
  '>->':'',
  '>-A':'^',
  'v-^':'^',
  'v-<':'<',
  'v-v':'',
  'v->':'>',
  'v-A':'>^',
}


let key = '029A';
let newKey='';

let numPos='A';
let dirPos='A';

for(let i = 0; i < key.length;++i){
  let nextNumPos = key[i]
  let numMove = numpadMoves[`${numPos}-${nextNumPos}`];
  newKey+= numMove +'A'

  numPos = nextNumPos;
}
key=''
console.log(newKey)

for(let i = 0; i < newKey.length; ++i){
  let nextDirPos = newKey[i]
  let dirMove = directionMoves[`${dirPos}-${nextDirPos}`];
  key+= dirMove +'A'

  dirPos = nextDirPos;
}
console.log(key)
newKey='';
dirPos='A';

for(let i = 0; i < key.length; ++i){
  let nextDirPos = key[i]
  let dirMove = directionMoves[`${dirPos}-${nextDirPos}`];
  newKey+= dirMove +'A'

  dirPos = nextDirPos;
}

key=''
console.log(newKey)












console.timeEnd("part2");
