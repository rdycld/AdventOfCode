const fs = require("fs");

const i = fs.readFileSync("./input.txt", "utf8");

const c = new Map();

const [a, b] = i
  .split("\n\n")
  .flatMap((a) => a.split("\n"))
  .reduce(
    (a, b) => {
      if (b.includes("|")) c.set(b, -1);
      else {
        let d = b.split(",").toSorted((a, b) => c.get(a+'|'+b));
        a[+(d+''!==b+'')]+=+d[d.length>>1]
      }

      return a;
    },
    [0, 0]
  );

console.log("p1: ", a, "p2: ", b);

const xddd= i
  .split("\n\n")
  .flatMap((a) => a.split("\n"))
  .reduce((acc,val,_,arr)=> val.includes('|') ? acc : (val.split(',').toSorted((a,b)=> arr.includes(a+'|'+b)?-1:1)+'' === val+'') ?
    [acc[0]+ +val.split(',').toSorted((a,b)=> arr.includes(a+'|'+b)?-1:1)[val.split(',').length>>1] , acc[1]]
  : 
    [acc[0],acc[1]+ +val.split(',').toSorted((a,b)=> arr.includes(a+'|'+b)?-1:1)[val.split(',').length>>1]]
  ,[0,0])


  console.log(xddd)
