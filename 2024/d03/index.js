const fs = require("fs");

const input = fs
  .readFileSync("./d3.txt", { encoding: "utf8" })

function mul(a,b){
    return a*b
}


const muls = [];

let p1 = input

while(true){
    let s = p1.search(/mul\([0-9]{1,3},[0-9]{1,3}\)/);
    if(s===-1) break;
    let e = p1.indexOf(')',s);
    muls.push(p1.slice(s,e+1));
    p1 = p1.slice(e+1)
}

const result1 = muls.reduce((acc,val)=> acc+ eval(val),0);

console.log(result1)

let p2 = input
const muls2 = []

while(true){
    let s = p2.search(/(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/);
    if(s===-1) break;
    let e = p2.indexOf(')',s);
    muls2.push(p2.slice(s,e+1));
    p2 = p2.slice(e+1)
}

let enabled = true
const result2 = muls2.reduce((acc,val)=>{
  if(val === 'do()') {
    enabled = true
    return acc
  }
  if(val === "don't()"){
    enabled = false;
    return acc
  }
  return acc + eval(val) * Number(enabled)
},0)

console.log(result2)




