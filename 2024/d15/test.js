
const fs = require("fs");

const input = fs.readFileSync("./rdycld.txt", { encoding: "utf8" });
const input2 = fs.readFileSync("./xpapla.txt", { encoding: "utf8" });

let a = input.replaceAll('[','.').replaceAll(']','.').replaceAll('@','.')
let b = input2.replaceAll('[','.').replaceAll(']','.').replaceAll('@','.')

console.log(a === b)


